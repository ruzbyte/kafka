import { webuntisApi } from "@/lib/webuntis_api";
import { FieldMap, studyFieldType } from "@/types/types";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const studyField = searchParams.get("studyField") as studyFieldType;

  try {
    await webuntisApi.login();
    const allClasses = await webuntisApi.getClasses();

    if (!studyField || studyField === "Other") {
      return NextResponse.json(allClasses);
    }

    const class_key = FieldMap[studyField];
    if (!class_key) {
      return NextResponse.json(allClasses);
    }

    const filteredClasses = allClasses.filter((c) =>
      c.name.startsWith(class_key),
    );

    return NextResponse.json(filteredClasses);
  } catch (error) {
    console.error("Error fetching classes:", error);
    return NextResponse.json(
      { error: "Failed to fetch classes" },
      { status: 500 },
    );
  }
}
