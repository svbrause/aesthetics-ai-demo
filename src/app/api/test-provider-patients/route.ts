import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const providerCode = url.searchParams.get("providerCode");

    if (!providerCode) {
      return NextResponse.json(
        { error: "Provider code is required" },
        { status: 400 }
      );
    }

    // Airtable API configuration
    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const airtableBaseId = "appXblSpAMBQskgzB";

    console.log("🔍 TEST: Testing provider code:", providerCode);

    // First, let's test the Providers table to see what's there
    const providersResponse = await fetch(
      `https://api.airtable.com/v0/${airtableBaseId}/Providers`,
      {
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
        },
      }
    );

    if (!providersResponse.ok) {
      const errorText = await providersResponse.text();
      return NextResponse.json(
        {
          error: `Providers API error: ${providersResponse.status}`,
          details: errorText,
        },
        { status: providersResponse.status }
      );
    }

    const providersData = await providersResponse.json();
    console.log(
      "🔍 TEST: All providers:",
      JSON.stringify(providersData, null, 2)
    );

    // Now test the Patients table with different filter approaches
    const testUrls = [
      `https://api.airtable.com/v0/${airtableBaseId}/Patients?maxRecords=3`, // Get first 3 patients to see structure
      `https://api.airtable.com/v0/${airtableBaseId}/Patients?filterByFormula={Code (from Providers)}='${providerCode}'`,
      `https://api.airtable.com/v0/${airtableBaseId}/Patients?filterByFormula={Provider}='${providerCode}'`,
    ];

    const results = [];

    for (const testUrl of testUrls) {
      console.log("🔍 TEST: Testing URL:", testUrl);

      const response = await fetch(testUrl, {
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        results.push({
          url: testUrl,
          status: response.status,
          recordCount: data.records.length,
          sampleRecord: data.records[0] || null,
          allFields: data.records[0]
            ? Object.keys(data.records[0].fields || {})
            : [],
        });
        console.log(
          "🔍 TEST: Response for",
          testUrl,
          ":",
          data.records.length,
          "records"
        );
      } else {
        const errorText = await response.text();
        results.push({
          url: testUrl,
          status: response.status,
          error: errorText,
        });
        console.log(
          "🔍 TEST: Error for",
          testUrl,
          ":",
          response.status,
          errorText
        );
      }
    }

    return NextResponse.json({
      success: true,
      providerCode,
      providers: providersData.records,
      testResults: results,
    });
  } catch (error) {
    console.error("Error in test:", error);
    return NextResponse.json(
      {
        error: "Test failed",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
