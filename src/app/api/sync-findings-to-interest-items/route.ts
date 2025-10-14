import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// POST - Sync patient findings to Interest Items table
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { patientId, findings, patientName } = body;

    if (!patientId || !findings || !Array.isArray(findings)) {
      return NextResponse.json(
        { error: "Patient ID and findings array are required" },
        { status: 400 }
      );
    }

    const airtableApiKey = process.env.AIRTABLE_API_KEY;

    if (!airtableApiKey) {
      return NextResponse.json(
        { error: "Airtable API key not configured" },
        { status: 500 }
      );
    }

    // First, get the patient record to find their Airtable record ID
    const patientResponse = await fetch(
      `https://api.airtable.com/v0/appXblSpAMBQskgzB/Patients?filterByFormula=%7BRECORD%20ID%7D%3D%27${patientId}%27&maxRecords=1`,
      {
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
        },
      }
    );

    if (!patientResponse.ok) {
      return NextResponse.json(
        { error: "Failed to find patient record" },
        { status: 404 }
      );
    }

    const patientData = await patientResponse.json();
    if (patientData.records.length === 0) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    const patientRecord = patientData.records[0];
    const patientAirtableId = patientRecord.id;

    // Get existing interest items to avoid duplicates
    const existingItemsResponse = await fetch(
      `https://api.airtable.com/v0/appXblSpAMBQskgzB/Interest%20Items?filterByFormula=%7BPATIENT%20RECORD%20ID%7D%3D%27${patientId}%27`,
      {
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
        },
      }
    );

    let existingItems: string[] = [];
    if (existingItemsResponse.ok) {
      const existingData = await existingItemsResponse.json();
      // Get existing item names to avoid duplicates
      existingItems = existingData.records
        .map((record: any) => record.fields["Interest Item Names"] || "")
        .filter(Boolean);
    }

    // Create new interest items for each finding (only if not already existing)
    const interestItemRecords = [];
    for (const finding of findings) {
      const findingName = typeof finding === "string" ? finding : finding.name;

      // Skip if this item already exists
      if (existingItems.includes(findingName)) {
        console.log(`Skipping existing item: ${findingName}`);
        continue;
      }

      // Map finding to appropriate area
      const areaMapping: Record<string, string> = {
        "Forehead Wrinkles": "Forehead",
        "Brow Asymmetry": "Forehead",
        "Under Eye Dark Circles": "Eyes",
        "Under Eye Hollow": "Eyes",
        "Dorsal Hump": "Nose",
        "Over-Projected": "Nose",
        "Over-Rotated": "Nose",
        "Nasal Tip Too Wide": "Nose",
        "Mid Cheek Flattening": "Cheeks",
        "Thin Lips": "Lips",
        "Dry Lips": "Lips",
        "Retruded Chin": "Jawline",
        "Asymmetric Chin": "Jawline",
        "Ill-Defined Jawline": "Jawline",
        "Prejowl Sulcus": "Jawline",
        "Excess/Submental Fullness": "Jawline",
        "Neck Lines": "Neck",
        "Dark Spots": "Skin",
        "Red Spots": "Skin",
        "Nasolabial Folds": "Skin",
        "Marionette Lines": "Skin",
        Whiteheads: "Skin",
      };

      const area = areaMapping[findingName] || "General";

      const interestItemRecord = {
        fields: {
          Patients: [patientAirtableId],
        },
      };

      interestItemRecords.push(interestItemRecord);
    }

    // Batch create interest items (max 10 per request)
    const batchSize = 10;
    const batches = [];
    for (let i = 0; i < interestItemRecords.length; i += batchSize) {
      batches.push(interestItemRecords.slice(i, i + batchSize));
    }

    let totalCreated = 0;
    for (const batch of batches) {
      const createResponse = await fetch(
        "https://api.airtable.com/v0/appXblSpAMBQskgzB/Interest%20Items",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${airtableApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            records: batch,
          }),
        }
      );

      if (!createResponse.ok) {
        const errorText = await createResponse.text();
        return NextResponse.json(
          {
            error: `Failed to create interest items: ${createResponse.status}`,
            details: errorText,
          },
          { status: createResponse.status }
        );
      }

      const createData = await createResponse.json();
      totalCreated += createData.records.length;
    }

    // Update the patient record to include the new interest items
    const interestItemNames = findings.map((f) =>
      typeof f === "string" ? f : f.name
    );

    const updatePatientResponse = await fetch(
      `https://api.airtable.com/v0/appXblSpAMBQskgzB/Patients/${patientAirtableId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            "Name (from Interest Items)": interestItemNames,
          },
        }),
      }
    );

    if (!updatePatientResponse.ok) {
      console.warn("Failed to update patient's interest items field");
    }

    return NextResponse.json({
      success: true,
      message: `Added ${totalCreated} new findings to Interest Items (${
        findings.length - totalCreated
      } already existed)`,
      createdRecords: totalCreated,
      skippedRecords: findings.length - totalCreated,
      interestItemNames: findings.map((f) =>
        typeof f === "string" ? f : f.name
      ),
    });
  } catch (error) {
    console.error("Error syncing findings to interest items:", error);
    return NextResponse.json(
      {
        error: "Failed to sync findings to interest items",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
