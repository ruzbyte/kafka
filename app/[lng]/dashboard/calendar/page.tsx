"use client";
import { CalendarView } from "@/components/calendar-view";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState, useCallback } from "react";
import {
  CalendarEvent,
  convertWebUntisLessons,
  groupConsecutiveLessons,
} from "@/lib/webuntis-utils";
import { getUserSubjects } from "@/lib/subjects";
import { useAuthStore } from "@/hooks/auth_hook";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { toast } from "sonner";

interface SchoolYear {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
}

export default function CalendarPage() {
  const [lessons, setLessons] = useState<CalendarEvent[] | null>([]);
  const [schoolYears, setSchoolYears] = useState<SchoolYear[]>([]);
  const [selectedSchoolYear, setSelectedSchoolYear] = useState<string>("");
  const [loadingLessons, setLoadingLessons] = useState(false);
  // Track whether the initial year has been set (to avoid overwriting manual selection)
  const [initialYearSet, setInitialYearSet] = useState(false);
  const { user } = useAuthStore();

  // Fetch available school years once on mount
  useEffect(() => {
    fetch("/api/webuntis/school-years")
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((data: SchoolYear[]) => {
        setSchoolYears(data);
      })
      .catch((err) => {
        console.error("Error fetching school years:", err);
      });
  }, []);

  // Set the initial year once both school years and user data are available
  useEffect(() => {
    if (initialYearSet || schoolYears.length === 0) return;

    const defaultYear =
      user?.defaultSchoolYear ||
      (schoolYears.length > 0 ? schoolYears[0].name : "");

    if (defaultYear) {
      setSelectedSchoolYear(defaultYear);
      setInitialYearSet(true);
    }
  }, [schoolYears, user?.defaultSchoolYear, initialYearSet]);

  const fetchLessons = useCallback(
    (yearName: string) => {
      if (!user?.uid || !yearName) return;

      setLoadingLessons(true);
      document.title = `${user?.displayName || "User"} | Kalender - Kafka`;

      getUserSubjects(user.uid).then((subjects) => {
        fetch("/api/webuntis", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ subjects, schoolYear: yearName }),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((data) => {
            const events = convertWebUntisLessons(data);
            const groupedEvents = groupConsecutiveLessons(events);
            setLessons(groupedEvents);
          })
          .catch((error) => {
            console.error("Error fetching lessons:", error);
          })
          .finally(() => setLoadingLessons(false));
      });
    },
    [user?.uid, user?.displayName]
  );

  // Fetch lessons whenever the selected school year or user changes
  useEffect(() => {
    if (selectedSchoolYear) {
      fetchLessons(selectedSchoolYear);
    }
  }, [selectedSchoolYear, fetchLessons]);

  const handleSchoolYearChange = async (yearName: string) => {
    setSelectedSchoolYear(yearName);

    // Persist the selection as the user's default
    if (user?.uid) {
      try {
        await updateDoc(doc(db, "users", user.uid), {
          defaultSchoolYear: yearName,
          updatedAt: new Date().toISOString(),
        });
        toast.success(`Default school year set to ${yearName}`);
      } catch (err) {
        console.error("Failed to save default school year:", err);
        toast.error("Failed to save default school year");
      }
    }
  };

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>Calendar</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto flex items-center gap-2 px-4">
          <span className="text-sm text-muted-foreground hidden sm:block">
            School Year:
          </span>
          <Select
            value={selectedSchoolYear}
            onValueChange={handleSchoolYearChange}
            disabled={schoolYears.length === 0}
          >
            <SelectTrigger className="w-[140px] h-8 text-sm">
              <SelectValue placeholder="Select year…" />
            </SelectTrigger>
            <SelectContent>
              {schoolYears.map((year) => (
                <SelectItem key={year.id} value={year.name}>
                  {year.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </header>

      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <CalendarView
          classes={lessons || []}
          loading={loadingLessons}
        />
      </div>
    </>
  );
}
