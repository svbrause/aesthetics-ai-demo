import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { providerCode } = await request.json();

    if (!providerCode) {
      return NextResponse.json(
        { error: "Provider code is required" },
        { status: 400 }
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

    // Fetch providers from Airtable
    const response = await fetch(
      `https://api.airtable.com/v0/${airtableBaseId}/Providers?filterByFormula={Code}='${providerCode}'`,
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
    const records = data.records;

    if (records.length === 0) {
      return NextResponse.json(
        { error: "Invalid provider code" },
        { status: 401 }
      );
    }

    const provider = records[0];
    const providerData = {
      id: provider.id,
      name: provider.fields.Name || "Unknown Provider",
      code: provider.fields.Code,
      email: provider.fields.Email || "",
      phone: provider.fields.Phone || "",
      specialty: provider.fields.Specialty || "",
    };

    return NextResponse.json({
      success: true,
      provider: providerData,
    });
  } catch (error) {
    console.error("Error validating provider:", error);
    return NextResponse.json(
      {
        error: "Failed to validate provider",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
