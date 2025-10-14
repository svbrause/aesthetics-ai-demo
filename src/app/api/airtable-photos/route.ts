import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    // Check if we have the required Airtable credentials
    const airtableApiKey = process.env.AIRTABLE_API_KEY;

    if (!airtableApiKey) {
      return NextResponse.json(
        { error: "Airtable API key not configured" },
        { status: 500 }
      );
    }

    // Fetch photos
    const photosResponse = await fetch(
      "https://api.airtable.com/v0/appXblSpAMBQskgzB/Photos",
      {
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
        },
      }
    );

    if (!photosResponse.ok) {
      const errorText = await photosResponse.text();
      return NextResponse.json(
        {
          error: `Airtable API error: ${photosResponse.status}`,
          details: errorText,
        },
        { status: photosResponse.status }
      );
    }

    const photosData = await photosResponse.json();

    // Fetch Issues table to resolve record IDs
    const issuesResponse = await fetch(
      "https://api.airtable.com/v0/appXblSpAMBQskgzB/Issues",
      {
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
        },
      }
    );

    if (!issuesResponse.ok) {
      const errorText = await issuesResponse.text();
      return NextResponse.json(
        {
          error: `Airtable Issues API error: ${issuesResponse.status}`,
          details: errorText,
        },
        { status: issuesResponse.status }
      );
    }

    const issuesData = await issuesResponse.json();

    // Create a mapping from issue record ID to issue name
    const issueIdToName = issuesData.records.reduce((acc: any, issue: any) => {
      acc[issue.id] = issue.fields.Name;
      return acc;
    }, {});

    // Transform the data to resolve Issues record IDs to names
    const transformedRecords = photosData.records.map((record: any) => ({
      ...record,
      fields: {
        ...record.fields,
        Issues:
          record.fields.Issues?.map(
            (issueId: string) => issueIdToName[issueId] || issueId
          ) || [],
      },
    }));

    return NextResponse.json({
      ...photosData,
      records: transformedRecords,
    });
  } catch (error) {
    console.error("Error fetching Airtable photos:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch photos",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
