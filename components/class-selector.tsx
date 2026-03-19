"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Check, Settings2 } from "lucide-react";
import { useAuthStore } from "@/hooks/auth_hook";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";

export function ClassSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [availableClasses, setAvailableClasses] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user, setUser } = useAuthStore();
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);

  useEffect(() => {
    if (user?.enrolledClasses) {
      setSelectedClasses(user.enrolledClasses);
    }
  }, [user?.enrolledClasses]);

  useEffect(() => {
    if (isOpen && user?.studyField) {
      setIsLoading(true);
      fetch(
        `/api/webuntis/classes?studyField=${encodeURIComponent(user.studyField)}`,
      )
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setAvailableClasses(data);
          }
        })
        .catch((err) => console.error("Error fetching classes:", err))
        .finally(() => setIsLoading(false));
    }
  }, [isOpen, user?.studyField]);

  const handleToggleClass = (className: string) => {
    setSelectedClasses((prev) =>
      prev.includes(className)
        ? prev.filter((c) => c !== className)
        : [...prev, className],
    );
  };

  const handleSave = async () => {
    if (!user?.uid) return;
    setIsLoading(true);
    try {
      await updateDoc(doc(db, "users", user.uid), {
        enrolledClasses: selectedClasses,
        updatedAt: new Date().toISOString(),
      });

      setUser({
        ...user,
        enrolledClasses: selectedClasses,
      });

      toast.success("Your classes have been updated");
      setIsOpen(false);
    } catch (error) {
      console.error("Error updating classes:", error);
      toast.error("Failed to update classes");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          <Settings2 className="mr-2 h-4 w-4" />
          Manage Semesters
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Manage Semesters</DialogTitle>
          <DialogDescription>
            Select the classes/semesters you are currently attending. This
            affects which subjects are available to add.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {isLoading && availableClasses.length === 0 ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto p-1">
              {availableClasses.map((c) => (
                <button
                  key={c.id}
                  onClick={() => handleToggleClass(c.name)}
                  className={`flex items-center justify-between p-3 rounded-lg border text-sm transition-all ${
                    selectedClasses.includes(c.name)
                      ? "border-primary bg-primary/5 text-primary"
                      : "border-gray-200 hover:border-primary/30"
                  }`}
                >
                  <span className="truncate">{c.name}</span>
                  {selectedClasses.includes(c.name) && (
                    <Check className="h-4 w-4" />
                  )}
                </button>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {selectedClasses.map((c) => (
              <Badge key={c} variant="secondary">
                {c}
              </Badge>
            ))}
          </div>

          <Button
            onClick={handleSave}
            className="w-full"
            disabled={isLoading || selectedClasses.length === 0}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
