"use client";

import { useState, useEffect } from "react";
import type { Subject } from "@/types/subjects";
import { addUserSubject } from "@/lib/subjects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuthStore } from "@/hooks/auth_hook";

interface SubjectSelectorProps {
  onSubjectAdded: () => void;
  enrolledSubjectIds: number[];
}

export function SubjectSelector({
  onSubjectAdded,
  enrolledSubjectIds,
}: SubjectSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [filteredSubjects, setFilteredSubjects] = useState<Subject[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const { user } = useAuthStore();

  useEffect(() => {
    if (isOpen && user?.uid) {
      setIsLoading(true);
      const params = new URLSearchParams();
      if (user.studyField) params.append("studyField", user.studyField);
      if (user.enrolledClasses && user.enrolledClasses.length > 0) {
        params.append("enrolledClasses", user.enrolledClasses.join(","));
      }

      fetch(`/api/webuntis/subjects?${params.toString()}`)
        .then((res) => res.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setSubjects(data);
            setFilteredSubjects(data);
          }
        })
        .catch((err) => console.error("Error fetching subjects:", err))
        .finally(() => setIsLoading(false));
    }
  }, [isOpen, user?.uid, user?.studyField, user?.enrolledClasses]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const results = subjects.filter(
        (s) =>
          (s.name && s.name.toLowerCase().includes(query)) ||
          (s.longName && s.longName.toLowerCase().includes(query)) ||
          (s.alternateName && s.alternateName.toLowerCase().includes(query))
      );
      setFilteredSubjects(results);
    } else {
      setFilteredSubjects(subjects);
    }
  }, [searchQuery, subjects]);

  const handleAddSubject = async (subject: Subject) => {
    setIsLoading(true);
    try {
      await addUserSubject(subject, user!.uid);
      onSubjectAdded();
      setIsOpen(false);
      setSearchQuery("");
    } catch (error) {
      console.error("Failed to add subject:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const availableSubjects = filteredSubjects.filter(
    (subject) => !enrolledSubjectIds.includes(subject.id)
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Add Subject
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle>Add Subject</DialogTitle>
          <DialogDescription>
            Search and select subjects to add to your curriculum
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search subjects by name or code..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="overflow-y-auto max-h-[50vh] space-y-2">
            {isLoading && subjects.length === 0 ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : availableSubjects.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                {searchQuery
                  ? "No subjects found matching your search."
                  : "No available subjects."}
              </div>
            ) : (
              availableSubjects.map((subject) => (
                <Card
                  key={subject.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge
                            variant="secondary"
                            style={{
                              backgroundColor: subject.backColor || "#f1f5f9",
                              color: subject.foreColor || "#0f172a",
                            }}
                          >
                            {subject.name}
                          </Badge>
                        </div>
                        <h4 className="font-medium">{subject.longName}</h4>
                        {subject.alternateName && (
                          <p className="text-sm text-muted-foreground">
                            {subject.alternateName}
                          </p>
                        )}
                      </div>
                      <Button
                        onClick={() => handleAddSubject(subject)}
                        disabled={isLoading}
                        size="sm"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
