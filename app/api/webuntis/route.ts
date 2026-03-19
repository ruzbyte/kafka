import { webuntisApi } from "@/lib/webuntis_api";

export async function POST(request: Request) {
  try {
    await webuntisApi.login();
    const {
      subjects,
      schoolYear: schoolYearName,
      studyField,
      enrolledClasses,
      startDate: startDateStr,
      endDate: endDateStr,
    } = await request.json();

    const schoolYear = schoolYearName
      ? await webuntisApi.getSchoolYearByName(schoolYearName)
      : await webuntisApi.getCurrentSchoolYear();

    let lessons;
    if (startDateStr && endDateStr) {
      lessons = await webuntisApi.getLessonsForRange(
        new Date(startDateStr),
        new Date(endDateStr),
        studyField,
        enrolledClasses,
      );
    } else {
      lessons = await webuntisApi.getAllLessonsForSchoolYear(
        schoolYear,
        studyField,
        enrolledClasses,
      );
    }

    const subjectIds = new Set(subjects.map((s: { id: number }) => s.id));
    const uniqueLessonsMap = new Map();

    for (const lesson of lessons) {
      if (
        lesson.su &&
        lesson.su.some((su: { id: number }) => subjectIds.has(su.id))
      ) {
        uniqueLessonsMap.set(lesson.id, lesson);
      }
    }

    const uniqueLessons = Array.from(uniqueLessonsMap.values());

    return new Response(JSON.stringify(uniqueLessons), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in WebUntis API handler:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
