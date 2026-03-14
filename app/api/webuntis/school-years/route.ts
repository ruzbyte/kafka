import { webuntisApi } from "@/lib/webuntis_api";

export async function GET() {
  try {
    await webuntisApi.login();
    const schoolYears = await webuntisApi.getSchoolYears();

    return new Response(JSON.stringify(schoolYears), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching school years:", error);
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
