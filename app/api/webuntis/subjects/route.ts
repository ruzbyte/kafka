import { webuntisApi } from "@/lib/webuntis_api";
import { studyFieldType } from "@/types/types";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const studyField = searchParams.get("studyField") as studyFieldType;
  const enrolledClassesStr = searchParams.get("enrolledClasses");
  const enrolledClasses = enrolledClassesStr
    ? enrolledClassesStr.split(",")
    : undefined;

  try {
    await webuntisApi.login();
    const subjects = await webuntisApi.getSubjectsFiltered(
      studyField || undefined,
      enrolledClasses,
    );

    return NextResponse.json(subjects);
  } catch (error) {
    console.error("Error fetching subjects:", error);
    return NextResponse.json(
      { error: "Failed to fetch subjects" },
      { status: 500 },
    );
  }
}
