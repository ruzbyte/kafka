import {
  getUserSettings,
  getEnrolledAndUncompletedSubjects,
} from "@/lib/subjects";
import { webuntisApi } from "@/lib/webuntis_api";
import ical, { ICalEvent } from "ical-generator";

import { NextRequest } from "next/server";

import {
  convertWebUntisLessons,
  groupConsecutiveLessons,
  WebUntisLesson,
} from "@/lib/webuntis-utils";
import { studyFieldType } from "@/types/types";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const { userId } = await params;

  try {
    await webuntisApi.login();

    // Fetch user data
    const userSettings = await getUserSettings(userId);
    if (!userSettings) {
      return new Response("User not found", { status: 404 });
    }

    const subjects = await getEnrolledAndUncompletedSubjects(userId);
    const studyField = (userSettings.studyField as studyFieldType) || "Other";
    const enrolledClasses = userSettings.enrolledClasses || [];

    const schoolYear = await webuntisApi.getCurrentSchoolYear();

    const allLessons = await webuntisApi.getAllLessonsForSchoolYear(
      schoolYear,
      studyField,
      enrolledClasses,
    );

    // Filter lessons by user's enrolled subjects (consistent with /api/webuntis)
    const subjectIds = new Set(subjects.map((s) => s.id));
    const filteredLessons = allLessons.filter(
      (lesson) =>
        lesson.su &&
        lesson.su.some((su: { id: number }) => subjectIds.has(su.id)),
    );

    const parsedEvents = convertWebUntisLessons(
      filteredLessons as WebUntisLesson[],
    );
    const groupedEvents = groupConsecutiveLessons(parsedEvents);

    const calendar = ical({
      name: `Kafka - ${userSettings.displayName || "User"}`,
      timezone: "Europe/Berlin",
    });

    groupedEvents.forEach((event) => {
      const summary = event.isCancelled
        ? `AUSFALL: ${event.title}`
        : event.title;
      const description = [
        `Dozent: ${event.professor || "N/A"}`,
        `Fach: ${event.title}`,
        event.isCancelled
          ? "\n--- ACHTUNG ---\nDIESE VORLESUNG FÄLLT AUS!"
          : null,
      ]
        .filter(Boolean)
        .join("\n");

      calendar.createEvent({
        start: new Date(event.startTime),
        end: new Date(event.endTime),
        summary: event.isCancelled ? `AUSFALL: ${event.title}` : event.title,
        description,
        location: event.isCancelled
          ? `ENTFÄLLT (ursprünglich: ${event.location})`
          : event.location,
      });
    });

    const calendarData = calendar.toString();

    return new Response(calendarData, {
      status: 200,
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": `attachment; filename="calendar_${userId}.ics"`,
      },
    });
  } catch (error) {
    console.error("Error generating calendar:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
