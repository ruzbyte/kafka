import { webuntisApi } from "@/lib/webuntis_api";
import { writeFileSync } from "fs";

type ResponseData = {
  message: string;
};

export async function POST(request: Request) {
  try {
    const { subjects, schoolYear: schoolYearName } = await request.json();

    const schoolYear = schoolYearName
      ? await webuntisApi.getSchoolYearByName(schoolYearName)
      : await webuntisApi.getCurrentSchoolYear();

    const allLessons = await webuntisApi.getAllLessonsForSchoolYear(schoolYear);

    const lessons = allLessons.filter((lesson) =>
      subjects.some(
        (subject: { id: number }) => subject.id === lesson.su[0]?.id
      )
    );

    const uniqueLessons = Array.from(
      new Map(lessons.map((lesson) => [lesson.id, lesson])).values()
    );

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
