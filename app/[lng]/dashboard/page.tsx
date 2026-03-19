"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Calendar,
  Clock,
  BookOpen,
  Plus,
  ChevronRight,
  ExternalLink,
  GraduationCap,
  FileText,
  Users,
  MapPin,
  CreditCard,
  Mail,
  Loader2,
  LayoutGrid,
  ClipboardList,
  Bell,
  Sparkles,
  Search,
  Settings,
} from "lucide-react";
import { useAuthStore } from "@/hooks/auth_hook";
import { getEnrolledAndUncompletedSubjects } from "@/lib/subjects";
import { getSubjectNotes } from "@/lib/notes";
import type { UserSubject } from "@/types/subjects";
import type { SubjectNote } from "@/types/types";

export default function Dashboard() {
  const { user, loading: authLoading } = useAuthStore();
  const [currentTime] = useState(new Date());
  const [subjects, setSubjects] = useState<UserSubject[]>([]);
  const [todayClasses, setTodayClasses] = useState<any[]>([]);
  const [recentNotes, setRecentNotes] = useState<
    (SubjectNote & { subjectName: string; subjectColor?: string })[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      if (!user) return;

      try {
        setLoading(true);
        // 1. Fetch enrolled subjects
        const enrolledSubjects = await getEnrolledAndUncompletedSubjects(
          user.uid,
        );
        setSubjects(enrolledSubjects);

        // 2. Fetch today's classes from WebUntis API
        if (enrolledSubjects.length > 0) {
          // Optimized: Fetch only for today
          const start = new Date(currentTime);
          start.setHours(0, 0, 0, 0);
          const end = new Date(currentTime);
          end.setHours(23, 59, 59, 999);

          const response = await fetch("/api/webuntis", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              subjects: enrolledSubjects,
              schoolYear: user.defaultSchoolYear || "2025/2026",
              studyField: user.studyField,
              enrolledClasses: user.enrolledClasses,
              startDate: start.toISOString(),
              endDate: end.toISOString(),
            }),
          });

          if (response.ok) {
            const lessons = await response.json();
            const year = currentTime.getFullYear();
            const month = String(currentTime.getMonth() + 1).padStart(2, "0");
            const day = String(currentTime.getDate()).padStart(2, "0");
            const todayStr = `${year}${month}${day}`;

            const filtered = lessons.filter(
              (l: any) => l.date.toString() === todayStr,
            );
            setTodayClasses(
              filtered.sort((a: any, b: any) => a.startTime - b.startTime),
            );
          }
        }

        // 3. Fetch recent notes across all subjects
        const notesPromises = enrolledSubjects.map(async (subject) => {
          const notes = await getSubjectNotes(user.uid, subject.id.toString());
          return notes.map((n) => ({
            ...n,
            subjectName: subject.longName,
            subjectColor: subject.backColor
              ? `#${subject.backColor}`
              : undefined,
          }));
        });

        const allNotesResults = await Promise.all(notesPromises);
        const flattenedNotes = allNotesResults.flat();
        const sortedNotes = flattenedNotes
          .sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
          )
          .slice(0, 5);

        setRecentNotes(sortedNotes);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      fetchData();
    }
  }, [user, currentTime]);

  const institutionalLinks = [
    {
      category: "Akademisch",
      links: [
        {
          name: "Ilias",
          url: "https://elearning.hs-albsig.de/",
          icon: GraduationCap,
          description: "Lernplattform",
        },
        {
          name: "WebUntis",
          url: "https://hepta.webuntis.com/WebUntis/?school=HS-Albstadt#/basic/timetablePublic",
          icon: Calendar,
          description: "Vorlesungszeiten",
        },
        {
          name: "HS-In-One",
          url: "https://hisinone.hs-albsig.de/",
          icon: FileText,
          description: "Hochschulportal",
        },
        {
          name: "Bibliothek",
          url: "https://bsz.ibs-bw.de/aDISWeb/app?service=direct/0/Home/$DirectLink&sp=SOPAC08",
          icon: BookOpen,
          description: "Katalog & Reservierung",
        },
      ],
    },
    {
      category: "Services",
      links: [
        {
          name: "Studierendenwerk",
          url: "#",
          icon: Users,
          description: "BAföG & Beratung",
        },
        {
          name: "Campus Navigator",
          url: "#",
          icon: MapPin,
          description: "Gebäude & Räume",
        },
        {
          name: "Semesterticket",
          url: "#",
          icon: CreditCard,
          description: "ÖPNV Berechtigung",
        },
        {
          name: "IT-Services",
          url: "#",
          icon: Mail,
          description: "E-Mail & WLAN",
        },
      ],
    },
  ];

  const formatTime = (time: number) => {
    const timeStr = time.toString().padStart(4, "0");
    return `${timeStr.slice(0, 2)}:${timeStr.slice(2)}`;
  };

  if (authLoading || (loading && !user)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background dark text-foreground">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="w-12 h-12 animate-spin text-primary" />
          <p className="text-muted-foreground animate-pulse">
            Lade dein Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b border-border/40">
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
                <BreadcrumbPage>Übersicht</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <div className="flex flex-1 flex-col md:flex-row min-h-0 overflow-hidden">
        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="max-w-6xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end md:justify-between space-y-4 md:space-y-0">
              <div className="space-y-1">
                <h1 className="text-3xl font-extrabold text-foreground flex items-center gap-2">
                  Hallo {user?.displayName || "Student"}{" "}
                  <Sparkles className="w-6 h-6 text-primary" />
                </h1>
                <p className="text-muted-foreground">
                  Heute ist{" "}
                  {currentTime.toLocaleDateString("de-DE", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden sm:flex border-border bg-muted/20"
                >
                  <Search className="w-4 h-4 mr-2" />
                  Suchen
                </Button>
                <Link href="/dashboard/account">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-border bg-muted/20"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Einstellungen
                  </Button>
                </Link>
              </div>
            </div>

            {/* Dashboard Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Today's Schedule - Full width on mobile/tablet, 2/3 on desktop */}
              <Card className="lg:col-span-2 bg-card border-border shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-border/40">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg font-bold">
                      Heutiger Stundenplan
                    </CardTitle>
                  </div>
                  <Link
                    href="/dashboard/calendar"
                    className="text-xs text-primary hover:underline"
                  >
                    Ganze Woche anzeigen
                  </Link>
                </CardHeader>
                <CardContent className="pt-4">
                  {loading ? (
                    <div className="flex justify-center py-10">
                      <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                    </div>
                  ) : todayClasses.length === 0 ? (
                    <div className="flex flex-col items-center justify-center space-y-4 py-8">
                      <div className="relative">
                        <Image
                          src="/kurukuru.gif"
                          alt="Freizeit"
                          width={120}
                          height={120}
                          className="rounded-full opacity-80"
                        />
                        <div className="absolute -top-1 -right-1 bg-green-500 rounded-full p-1 shadow-lg">
                          <Sparkles className="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-foreground font-semibold">
                          Keine Vorlesungen heute!
                        </p>
                        <p className="text-muted-foreground text-sm">
                          Zeit für eine kleine Pause oder ein bisschen
                          Selbststudium.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {todayClasses.map((classItem) => (
                        <div
                          key={classItem.id}
                          className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50 hover:bg-muted/50 transition-all hover:translate-x-1 cursor-pointer"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="flex flex-col items-center justify-center min-w-[60px] p-2 rounded-lg bg-background border border-border/40 shadow-sm">
                              <span className="text-xs font-bold">
                                {formatTime(classItem.startTime)}
                              </span>
                              <div className="w-full h-[1px] bg-border/40 my-1" />
                              <span className="text-[10px] text-muted-foreground">
                                {formatTime(classItem.endTime)}
                              </span>
                            </div>
                            <div>
                              <p className="font-bold text-foreground">
                                {classItem.su?.[0]?.longname ||
                                  classItem.su?.[0]?.name ||
                                  "Fach"}
                              </p>
                              <div className="flex items-center text-xs text-muted-foreground space-x-3 mt-1">
                                <span className="flex items-center">
                                  <MapPin className="w-3 h-3 mr-1" />{" "}
                                  {classItem.ro?.[0]?.name || "K.A."}
                                </span>
                                <span className="flex items-center">
                                  <Users className="w-3 h-3 mr-1" />{" "}
                                  {classItem.cl?.[0]?.name || "Modul"}
                                </span>
                              </div>
                            </div>
                          </div>
                          {classItem.code === "cancelled" ? (
                            <Badge
                              variant="destructive"
                              className="uppercase text-[10px] font-bold"
                            >
                              Ausfall
                            </Badge>
                          ) : (
                            <ChevronRight className="h-4 w-4 text-muted-foreground/50" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Enhanced Quick Actions */}
              <Card className="bg-card border-border shadow-sm">
                <CardHeader className="pb-3 border-b border-border/40">
                  <div className="flex items-center space-x-2">
                    <LayoutGrid className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg font-bold">
                      Schnellzugriff
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-4 px-4">
                  <div className="grid grid-cols-2 gap-3">
                    <Link href="/dashboard/notes">
                      <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 hover:border-primary/50 transition-all cursor-pointer group space-y-2">
                        <div className="p-3 rounded-full bg-orange-500/10 text-orange-500 group-hover:scale-110 transition-transform shadow-inner">
                          <Plus className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-semibold">
                          Neue Notiz
                        </span>
                      </div>
                    </Link>
                    <Link href="/dashboard/classes">
                      <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 hover:border-primary/50 transition-all cursor-pointer group space-y-2">
                        <div className="p-3 rounded-full bg-blue-500/10 text-blue-500 group-hover:scale-110 transition-transform shadow-inner">
                          <GraduationCap className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-semibold">
                          Meine Fächer
                        </span>
                      </div>
                    </Link>
                    <Link href="/dashboard/calendar">
                      <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 hover:border-primary/50 transition-all cursor-pointer group space-y-2">
                        <div className="p-3 rounded-full bg-green-500/10 text-green-500 group-hover:scale-110 transition-transform shadow-inner">
                          <Calendar className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-semibold">Kalender</span>
                      </div>
                    </Link>
                    <Link href="/dashboard/notes">
                      <div className="flex flex-col items-center justify-center p-4 rounded-xl border border-border/60 bg-muted/20 hover:bg-muted/40 hover:border-primary/50 transition-all cursor-pointer group space-y-2">
                        <div className="p-3 rounded-full bg-purple-500/10 text-purple-500 group-hover:scale-110 transition-transform shadow-inner">
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-semibold">Prüfungen</span>
                      </div>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Enhanced Recent Notes */}
              <Card className="bg-card border-border shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-border/40">
                  <div className="flex items-center space-x-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg font-bold">
                      Letzte Notizen
                    </CardTitle>
                  </div>
                  <Link
                    href="/dashboard/notes"
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                  >
                    Alle anzeigen
                  </Link>
                </CardHeader>
                <CardContent className="pt-4 px-3">
                  {loading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                    </div>
                  ) : recentNotes.length === 0 ? (
                    <div className="text-center py-8 px-4">
                      <p className="text-xs text-muted-foreground italic">
                        Du hast noch keine Notizen erstellt.
                      </p>
                      <Button
                        variant="link"
                        size="sm"
                        className="text-primary mt-1 h-auto p-0"
                      >
                        Jetzt erste Notiz erstellen
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {recentNotes.map((note) => (
                        <Link key={note.id} href="/dashboard/notes">
                          <div className="relative flex items-center justify-between p-3 rounded-lg border border-border/50 bg-muted/20 hover:bg-muted/40 transition-all cursor-pointer group">
                            {note.subjectColor && (
                              <div
                                className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-3/4 rounded-r-full"
                                style={{ backgroundColor: note.subjectColor }}
                              />
                            )}
                            <div className="flex-1 overflow-hidden ml-2">
                              <p className="font-semibold text-foreground text-xs truncate group-hover:text-primary transition-colors">
                                {note.title}
                              </p>
                              <div className="flex items-center text-[10px] text-muted-foreground mt-0.5 space-x-2">
                                <span className="truncate max-w-[120px]">
                                  {note.subjectName}
                                </span>
                                <span>•</span>
                                <span>
                                  {new Date(note.updatedAt).toLocaleDateString(
                                    "de-DE",
                                    { day: "2-digit", month: "2-digit" },
                                  )}
                                </span>
                              </div>
                            </div>
                            <ChevronRight className="h-3 w-3 text-muted-foreground/40 group-hover:text-primary transition-colors" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Current Subjects Summary */}
              <Card className="lg:col-span-2 bg-card border-border shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-border/40">
                  <div className="flex items-center space-x-2">
                    <ClipboardList className="h-5 w-5 text-primary" />
                    <CardTitle className="text-lg font-bold">
                      Aktuelle Module
                    </CardTitle>
                  </div>
                  <Link
                    href="/dashboard/classes"
                    className="text-xs text-primary hover:underline"
                  >
                    Verwalten
                  </Link>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {subjects.length > 0 ? (
                      subjects.slice(0, 6).map((subject) => (
                        <div
                          key={subject.id}
                          className="relative p-3 rounded-xl bg-muted/30 border border-border/40 hover:bg-muted/50 transition-colors group"
                        >
                          {subject.backColor && (
                            <div
                              className="absolute top-2 right-2 w-2 h-2 rounded-full ring-1 ring-border/50"
                              style={{
                                backgroundColor: `#${subject.backColor}`,
                              }}
                            />
                          )}
                          <p className="font-bold text-xs text-foreground truncate">
                            {subject.longName}
                          </p>
                          <p className="text-[10px] text-muted-foreground mt-1 font-mono">
                            {subject.name}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="col-span-full py-6 text-center">
                        <p className="text-sm text-muted-foreground">
                          Keine aktiven Module gefunden.
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Right Sidebar Area */}
        <div className="w-80 bg-card/50 border-l border-border hidden xl:flex flex-col overflow-y-auto">
          <div className="p-8 space-y-8">
            <div>
              <h2 className="text-lg font-bold text-foreground">
                Hochschul-Services
              </h2>
              <p className="text-xs text-muted-foreground mt-1">
                Wichtige Portale im Schnellzugriff
              </p>
            </div>

            {institutionalLinks.map((category) => (
              <div key={category.category} className="space-y-3">
                <h3 className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest border-b border-border/50 pb-2">
                  {category.category}
                </h3>
                <div className="space-y-2">
                  {category.links.map((link) => (
                    <a
                      key={link.name}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-3 rounded-xl bg-background/50 border border-border/40 hover:bg-primary/5 hover:border-primary/30 transition-all group cursor-pointer"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                          <link.icon className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-bold text-foreground text-xs leading-tight">
                            {link.name}
                          </p>
                          <p className="text-[10px] text-muted-foreground">
                            {link.description}
                          </p>
                        </div>
                      </div>
                      <ExternalLink className="h-3 w-3 text-muted-foreground/50 group-hover:text-primary transition-colors" />
                    </a>
                  ))}
                </div>
              </div>
            ))}

            {/* Help & Support Card */}
            <Card className="bg-primary/5 border-primary/20 shadow-none border-dashed">
              <CardHeader className="pb-2">
                <CardTitle className="text-xs font-bold text-primary uppercase tracking-wider flex items-center gap-2">
                  <Bell className="w-3 h-3" />
                  Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 pt-1">
                <div className="flex flex-col space-y-3">
                  <div className="space-y-1">
                    <p className="text-[10px] text-muted-foreground uppercase font-semibold">
                      Studierendenservice
                    </p>
                    <p className="text-xs font-bold text-foreground">
                      +49 7431 132-0
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[10px] text-muted-foreground uppercase font-semibold">
                      IT-Helpdesk
                    </p>
                    <p className="text-xs font-bold text-foreground truncate">
                      it-support@hs-albsig.de
                    </p>
                  </div>
                  <div className="pt-2">
                    <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-center">
                      <p className="text-[10px] font-black text-red-600 uppercase tracking-tighter">
                        Campus Notfall
                      </p>
                      <p className="text-sm font-black text-red-700">
                        +49 7431 132-112
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
