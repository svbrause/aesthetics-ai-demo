import { NextRequest, NextResponse } from "next/server";
import { extractFindingsFromAirtable } from "@/lib/airtableIssuesHelper";

export const dynamic = "force-dynamic";

export async function GET(
  request: NextRequest,
  { params }: { params: { patient_id: string } }
) {
  try {
    const patientId = params.patient_id;
    const url = new URL(request.url);
    const providerCode = url.searchParams.get("providerCode");
    const debug = url.searchParams.get("debug") === "true";

    if (!providerCode) {
      return NextResponse.json(
        { error: "Provider code is required" },
        { status: 400 }
      );
    }

    if (debug) {
      console.log(
        "🔍 DEBUG: Fetching patient:",
        patientId,
        "for provider:",
        providerCode
      );
    }

    // Airtable API configuration
    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    
    if (!airtableApiKey) {
      return NextResponse.json(
        { error: "Airtable API key not configured" },
        { status: 500 }
      );
    }
    const airtableBaseId = "appXblSpAMBQskgzB";

    // First, get all patients for this provider to find the specific one
    const airtableUrl = `https://api.airtable.com/v0/${airtableBaseId}/Patients?filterByFormula={Code (from Providers)}='${providerCode}'`;

    if (debug) {
      console.log("🔍 DEBUG: Airtable URL:", airtableUrl);
    }

    const response = await fetch(airtableUrl, {
      headers: {
        Authorization: `Bearer ${airtableApiKey}`,
      },
    });

    if (debug) {
      console.log("🔍 DEBUG: Response status:", response.status);
    }

    if (!response.ok) {
      const errorText = await response.text();
      if (debug) {
        console.log("🔍 DEBUG: Error response:", errorText);
      }
      return NextResponse.json(
        { error: `Airtable API error: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    const records = data.records;

    if (debug) {
      console.log("🔍 DEBUG: Found", records.length, "patients for provider");
    }

    // Find the specific patient by ID
    const patientRecord = records.find(
      (record: any) => record.id === patientId
    );

    if (!patientRecord) {
      return NextResponse.json(
        { error: "Patient not found in your patient list" },
        { status: 404 }
      );
    }

    // Transform the patient data
    const fields = patientRecord.fields;

    // Extract photo URLs
    const frontPhotoUrl = fields["Front Photo"]?.[0]?.url || null;
    const sidePhotoUrl = fields["Side Photo"]?.[0]?.url || null;

    // Extract findings from Airtable using helper function
    const findings = extractFindingsFromAirtable(fields);

    // Calculate a mock score based on findings count
    const score = Math.max(60, 100 - findings.length * 2);

    const patient = {
      id: patientRecord.id,
      name: fields.Name || "Unknown Patient",
      age: fields.Age || 30,
      email: fields.Email || "",
      phone: fields.Phone || "",
      lastVisit: fields["Last Visit"] || new Date().toISOString().split("T")[0],
      score: fields.Score || score,
      findings: findings,
      frontImage: frontPhotoUrl || "/Sydney Adams Front.png",
      sideImage: sidePhotoUrl || "/Sydney Adams Side.png",
      scanDate: fields["Created"]
        ? new Date(fields["Created"]).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })
        : new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
      airtableRecordId: patientRecord.id,
      provider: fields.Provider || providerCode,
      status: fields.Status || "completed",
      reviewStatus: fields["Review Status"] || "provider-only",
    };

    const responseData = {
      success: true,
      patient: patient,
    };

    if (debug) {
      console.log(
        "🔍 DEBUG: Patient data:",
        JSON.stringify(responseData, null, 2)
      );
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching provider patient:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch patient",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
