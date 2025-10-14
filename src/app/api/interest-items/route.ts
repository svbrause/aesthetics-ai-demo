import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// GET - Fetch interest items for a patient
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const patientId = searchParams.get("patientId");

    if (!patientId) {
      return NextResponse.json(
        { error: "Patient ID is required" },
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

    // First, try to get Interest Items from the Interest Items table
    let response = await fetch(
      `https://api.airtable.com/v0/appXblSpAMBQskgzB/Interest%20Items?filterByFormula=FIND(%27${patientId}%27%2C%20%7BPatients%7D)&maxRecords=100`,
      {
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
        },
      }
    );

    let transformedRecords = [];

    if (response.ok) {
      const data = await response.json();
      // Transform Interest Items table records
      transformedRecords = data.records.map((record: any) => ({
        id: record.id,
        name: record.fields["Interest Item Names"] || "Unknown Item",
        severity: "moderate",
        score: 75,
        area: "General",
        notes: "",
        dateAdded: record.fields["Created"] || new Date().toISOString(),
        status: "Active",
        airtableRecordId: record.id,
      }));
    }

    // If no Interest Items found in Interest Items table, check patient's Interest Items field
    if (transformedRecords.length === 0) {
      const patientResponse = await fetch(
        `https://api.airtable.com/v0/appXblSpAMBQskgzB/Patients?filterByFormula=%7BRECORD%20ID%7D%3D%27${patientId}%27&maxRecords=1`,
        {
          headers: {
            Authorization: `Bearer ${airtableApiKey}`,
          },
        }
      );

      if (patientResponse.ok) {
        const patientData = await patientResponse.json();
        if (patientData.records.length > 0) {
          const patientRecord = patientData.records[0];
          const interestItems =
            patientRecord.fields[
              "Issues String (from Patient-Issue/Suggestion Mapping) (from Interest Items)"
            ] || "";

          // Transform patient's Interest Items to shortlist format
          if (interestItems && interestItems.trim()) {
            const items = interestItems
              .split(",")
              .map((item: string) => item.trim())
              .filter(Boolean);
            transformedRecords = items.map(
              (itemName: string, index: number) => ({
                id: `patient-${patientId}-${index}`,
                name: itemName,
                severity: "moderate",
                score: 75,
                area: "General",
                notes: "",
                dateAdded: new Date().toISOString(),
                status: "Active",
                airtableRecordId: null, // Not from Interest Items table
              })
            );
          }
        }
      }
    }

    return NextResponse.json({
      records: transformedRecords,
      total: transformedRecords.length,
      patientId: patientId,
    });
  } catch (error) {
    console.error("Error fetching interest items:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch interest items",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// POST - Add interest item to Airtable
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { patientId, findingName, severity, score, area, notes } = body;

    if (!patientId || !findingName) {
      return NextResponse.json(
        { error: "Patient ID and finding name are required" },
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

    // Create interest item record
    const response = await fetch(
      "https://api.airtable.com/v0/appXblSpAMBQskgzB/Interest%20Items",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            "Patient ID": patientId,
            "Finding Name": findingName,
            Severity: severity || "moderate",
            Score: score || 0,
            Area: area || "General",
            Notes: notes || "",
            "Date Added": new Date().toISOString(),
            Status: "Active",
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Airtable API error: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error creating interest item:", error);
    return NextResponse.json(
      {
        error: "Failed to create interest item",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// DELETE - Remove interest item from Airtable
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const recordId = searchParams.get("recordId");

    if (!recordId) {
      return NextResponse.json(
        { error: "Record ID is required" },
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

    // Delete interest item record
    const response = await fetch(
      `https://api.airtable.com/v0/appXblSpAMBQskgzB/Interest%20Items/${recordId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Airtable API error: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting interest item:", error);
    return NextResponse.json(
      {
        error: "Failed to delete interest item",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
