import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    console.log("🔍 DEBUG: Form submission started");
    console.log(
      "🔍 DEBUG: Headers:",
      Object.fromEntries(request.headers.entries())
    );

    const formData = await request.formData();
    console.log(
      "🔍 DEBUG: Form data entries:",
      Array.from(formData.entries()).map(([key, value]) => [
        key,
        value instanceof File
          ? `File: ${value.name} (${value.size} bytes, ${value.type})`
          : value,
      ])
    );

    // Log each file in detail
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`🔍 DEBUG: File ${key}:`, {
          name: value.name,
          size: value.size,
          type: value.type,
          lastModified: value.lastModified,
          sizeMB: (value.size / (1024 * 1024)).toFixed(2),
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: "Debug data logged successfully",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("🔍 DEBUG: Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
