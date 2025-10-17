import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const patientId = request.nextUrl.searchParams.get("patientId");
    const issueId = request.nextUrl.searchParams.get("issueId");

    if (!airtableApiKey) {
      return NextResponse.json(
        { error: "Airtable API key not configured" },
        { status: 500 }
      );
    }

    // Build the filter formula based on provided parameters
    let filterFormula = "";
    const filterConditions = [];

    if (patientId) {
      // Try different possible field names for patient ID
      const patientFieldNames = [
        "Patient ID",
        "PatientId",
        "patient_id",
        "Patient",
        "patientId",
        "PATIENT RECORD ID",
        "Patient Record ID",
      ];

      // For now, let's fetch all records to see the structure
      // In production, you would filter by patient ID once the field is properly set up
    }

    if (issueId) {
      // Try different possible field names for issue ID
      const issueFieldNames = [
        "Issue ID",
        "IssueId",
        "issue_id",
        "Issue",
        "issueId",
        "Finding ID",
        "FindingId",
      ];
    }

    // For now, let's fetch all records to see the structure
    const response = await fetch(
      `https://api.airtable.com/v0/appXblSpAMBQskgzB/Severity%20Mappings?maxRecords=20`,
      {
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

    const data = await response.json();

    // Transform the Airtable records to match our severity mapping format
    const transformedRecords = data.records.map((record: any) => ({
      id: record.id,
      patientId:
        record.fields["Patient ID"] ||
        record.fields["PatientId"] ||
        record.fields["patient_id"] ||
        record.fields["Patient"] ||
        record.fields["patientId"] ||
        record.fields["PATIENT RECORD ID"] ||
        "",
      issueId:
        record.fields["Issue ID"] ||
        record.fields["IssueId"] ||
        record.fields["issue_id"] ||
        record.fields["Issue"] ||
        record.fields["issueId"] ||
        record.fields["Finding ID"] ||
        record.fields["FindingId"] ||
        "",
      issueName:
        record.fields["Issue Name"] ||
        record.fields["IssueName"] ||
        record.fields["issue_name"] ||
        record.fields["Finding Name"] ||
        record.fields["FindingName"] ||
        "",
      airtableSeverityScore:
        record.fields["Severity Score"] ||
        record.fields["SeverityScore"] ||
        record.fields["severity_score"] ||
        record.fields["Score"] ||
        record.fields["score"] ||
        0,
      airtableSeverityLevel:
        record.fields["Severity Level"] ||
        record.fields["SeverityLevel"] ||
        record.fields["severity_level"] ||
        record.fields["Severity"] ||
        record.fields["severity"] ||
        "moderate",
      uiSeverityScore:
        record.fields["UI Severity Score"] ||
        record.fields["UISeverityScore"] ||
        record.fields["ui_severity_score"] ||
        null,
      uiSeverityLevel:
        record.fields["UI Severity Level"] ||
        record.fields["UISeverityLevel"] ||
        record.fields["ui_severity_level"] ||
        null,
      scalingFactor:
        record.fields["Scaling Factor"] ||
        record.fields["ScalingFactor"] ||
        record.fields["scaling_factor"] ||
        1.0,
      notes: record.fields["Notes"] || record.fields["notes"] || "",
      dateCreated: record.fields["Created"] || new Date().toISOString(),
      dateModified: record.fields["Last Modified"] || new Date().toISOString(),
    }));

    return NextResponse.json({
      records: transformedRecords,
      debug: {
        totalRecords: data.records.length,
        sampleRecord: data.records[0] || null,
      },
    });
  } catch (error) {
    console.error("Error fetching severity mappings:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch severity mappings",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const airtableApiKey = process.env.AIRTABLE_API_KEY;

    if (!airtableApiKey) {
      return NextResponse.json(
        { error: "Airtable API key not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const {
      patientId,
      issueId,
      issueName,
      airtableSeverityScore,
      airtableSeverityLevel,
      uiSeverityScore,
      uiSeverityLevel,
      scalingFactor,
      notes,
    } = body;

    // Create a new record in Airtable
    const response = await fetch(
      `https://api.airtable.com/v0/appXblSpAMBQskgzB/Severity%20Mappings`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            "Patient ID": parseInt(patientId) || patientId,
            "Issue Name": issueName,
            "Severity Score": airtableSeverityScore,
            Type: "Severity Score",
            Explanation: notes || `Severity mapping for ${issueName}`,
            "Treatment Priority": "Medium",
            "Data Source": "Manual Entry",
            "Model Version": "v1-manual",
            "Age Normalized": 0.5,
            "Score ID": `${issueName}_${patientId}_${Date.now()}`,
            "Patient Record ID": issueId || "",
            "Issue Record ID": issueId || "",
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        {
          error: `Failed to create severity mapping: ${response.status}`,
          details: errorText,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      id: data.id,
      success: true,
      message: "Severity mapping created successfully",
    });
  } catch (error) {
    console.error("Error creating severity mapping:", error);
    return NextResponse.json(
      {
        error: "Failed to create severity mapping",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const recordId = request.nextUrl.searchParams.get("recordId");

    if (!airtableApiKey) {
      return NextResponse.json(
        { error: "Airtable API key not configured" },
        { status: 500 }
      );
    }

    if (!recordId) {
      return NextResponse.json(
        { error: "Record ID is required for updates" },
        { status: 400 }
      );
    }

    const body = await request.json();
    const { fields } = body;

    // Update the record in Airtable
    const response = await fetch(
      `https://api.airtable.com/v0/appXblSpAMBQskgzB/Severity%20Mappings/${recordId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields,
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        {
          error: `Failed to update severity mapping: ${response.status}`,
          details: errorText,
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json({
      id: data.id,
      success: true,
      message: "Severity mapping updated successfully",
    });
  } catch (error) {
    console.error("Error updating severity mapping:", error);
    return NextResponse.json(
      {
        error: "Failed to update severity mapping",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const recordId = request.nextUrl.searchParams.get("recordId");

    if (!airtableApiKey) {
      return NextResponse.json(
        { error: "Airtable API key not configured" },
        { status: 500 }
      );
    }

    if (!recordId) {
      return NextResponse.json(
        { error: "Record ID is required for deletion" },
        { status: 400 }
      );
    }

    // Delete the record from Airtable
    const response = await fetch(
      `https://api.airtable.com/v0/appXblSpAMBQskgzB/Severity%20Mappings/${recordId}`,
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
        {
          error: `Failed to delete severity mapping: ${response.status}`,
          details: errorText,
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Severity mapping deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting severity mapping:", error);
    return NextResponse.json(
      {
        error: "Failed to delete severity mapping",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
