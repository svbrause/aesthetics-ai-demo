import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    // Check if we have the required Airtable credentials
    if (!process.env.AIRTABLE_API_KEY) {
      return NextResponse.json(
        { error: "Airtable API key not configured" },
        { status: 500 }
      );
    }

    // Get filterByFormula from query parameters
    const { searchParams } = new URL(request.url);
    const filterByFormula = searchParams.get("filterByFormula");

    // Build the Airtable URL with optional filter
    let airtableUrl = "https://api.airtable.com/v0/appXblSpAMBQskgzB/Photos";
    if (filterByFormula) {
      airtableUrl += `?filterByFormula=${encodeURIComponent(filterByFormula)}`;
    }

    const response = await fetch(airtableUrl, {
      headers: {
        Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
      },
    });

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
