import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const patientData = await request.json();

    // Validate required fields
    if (!patientData.id || !patientData.name) {
      return NextResponse.json(
        { error: "Missing required fields: id and name" },
        { status: 400 }
      );
    }

    // Return the patient data as-is (this will be used to update the mock data)
    return NextResponse.json({
      success: true,
      patient: patientData,
      message: "Patient data ready for integration",
    });
  } catch (error) {
    console.error("Error processing patient data:", error);
    return NextResponse.json(
      {
        error: "Failed to process patient data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
