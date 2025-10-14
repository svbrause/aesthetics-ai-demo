import { NextRequest, NextResponse } from "next/server";
import { convertAirtableAreasToInternal } from "@/lib/areaMapping";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const providerId = url.searchParams.get("providerId");
    const debug = url.searchParams.get("debug") === "true";

    if (!providerId) {
      return NextResponse.json(
        { error: "Provider ID is required" },
        { status: 400 }
      );
    }

    if (debug) {
      console.log("🔍 DEBUG: Fetching patients for provider:", providerId);
    }

    // Airtable API configuration
    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const airtableBaseId = "appXblSpAMBQskgzB";

    // Fetch patients for this provider using the provider code
    const airtableUrl = `https://api.airtable.com/v0/${airtableBaseId}/Patients?filterByFormula={Code (from Providers)}='${providerId}'`;

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
      console.log(
        "🔍 DEBUG: Raw Airtable response:",
        JSON.stringify(data, null, 2)
      );
      console.log("🔍 DEBUG: Number of records found:", records.length);
    }

    // Transform Airtable records to our patient format
    const patients = records.map((record: any) => {
      const fields = record.fields;

      // Extract photo URLs
      const frontPhotoUrl = fields["Front Photo"]?.[0]?.url || null;
      const sidePhotoUrl = fields["Side Photo"]?.[0]?.url || null;

      // Extract findings from Airtable
      const airtableFindings =
        fields["Name (from All Issues) (from Analyses)"] || [];
      const findings = Array.isArray(airtableFindings)
        ? airtableFindings.filter(
            (finding: string) => !finding.includes("[DEPRECATED]")
          )
        : [];

      // Extract areas of interest from Airtable formula field
      const airtableAreasOfInterestString =
        fields["Areas of Interest (from Form Submissions)"] || "";
      const airtableAreasOfInterest = airtableAreasOfInterestString
        ? airtableAreasOfInterestString.split(", ").map((area: string) => area.trim())
        : [];
      const areasOfInterest = convertAirtableAreasToInternal(
        airtableAreasOfInterest
      );

      // Calculate a mock score based on findings count (you can replace this with actual scoring)
      const score = Math.max(60, 100 - findings.length * 2);

      return {
        id: record.id,
        name: fields.Name || "Unknown Patient",
        age: fields.Age || 30,
        email: fields.Email || "",
        phone: fields.Phone || "",
        lastVisit:
          fields["Last Visit"] || new Date().toISOString().split("T")[0],
        score: fields.Score || score,
        findings: findings,
        frontImage: frontPhotoUrl || "/Sydney Adams Front.png", // Fallback image
        sideImage: sidePhotoUrl || "/Sydney Adams Side.png", // Fallback image
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
        airtableRecordId: record.id,
        provider: fields.Provider || providerId,
        status: fields.Status || "completed",
        reviewStatus: fields["Review Status"] || "provider-only",
        areasOfInterest: areasOfInterest,
      };
    });

    const responseData = {
      success: true,
      patients: patients,
    };

    if (debug) {
      console.log(
        "🔍 DEBUG: Final response data:",
        JSON.stringify(responseData, null, 2)
      );
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching provider patients:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch patients",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
