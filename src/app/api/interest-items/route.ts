import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// Mock storage for shortlist items (in a real app, this would be a database)
let shortlistItems: any[] = [];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const patientId = searchParams.get("patientId");

    if (!patientId) {
      return NextResponse.json(
        { error: "Missing patientId parameter" },
        { status: 400 }
      );
    }

    // Filter items by patient ID
    const patientItems = shortlistItems.filter(
      (item) => item.patientId === patientId
    );

    return NextResponse.json({
      records: patientItems.map((item) => ({
        id: item.id,
        fields: {
          "Finding Name": item.findingName,
          Severity: item.severity,
          Score: item.score,
          Area: item.area,
          Notes: item.notes,
          "Date Added": item.dateAdded,
          Status: item.status,
        },
      })),
    });
  } catch (error) {
    console.error("Error fetching shortlist items:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch shortlist items",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { patientId, findingName, severity, score, area, notes } = body;

    // Validate required fields
    if (!patientId || !findingName) {
      return NextResponse.json(
        { error: "Missing required fields: patientId and findingName" },
        { status: 400 }
      );
    }

    // Check if item already exists
    const existingItem = shortlistItems.find(
      (item) => item.patientId === patientId && item.findingName === findingName
    );

    if (existingItem) {
      return NextResponse.json({
        id: existingItem.id,
        success: true,
        message: "Item already in shortlist",
      });
    }

    // Create new item
    const newItem = {
      id: `shortlist_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      patientId,
      findingName,
      severity: severity || "moderate",
      score: score || 0,
      area: area || "General",
      notes: notes || "",
      dateAdded: new Date().toISOString(),
      status: "Active",
    };

    // Add to mock storage
    shortlistItems.push(newItem);

    console.log("Added to shortlist:", newItem);

    return NextResponse.json({
      id: newItem.id,
      success: true,
      message: "Item added to shortlist successfully",
    });
  } catch (error) {
    console.error("Error adding to shortlist:", error);
    return NextResponse.json(
      {
        error: "Failed to add to shortlist",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const itemId = searchParams.get("id") || searchParams.get("recordId");

    if (!itemId) {
      return NextResponse.json(
        { error: "Missing item id parameter" },
        { status: 400 }
      );
    }

    // Remove item from mock storage
    const initialLength = shortlistItems.length;
    shortlistItems = shortlistItems.filter((item) => item.id !== itemId);

    if (shortlistItems.length === initialLength) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Item removed from shortlist successfully",
    });
  } catch (error) {
    console.error("Error removing from shortlist:", error);
    return NextResponse.json(
      {
        error: "Failed to remove from shortlist",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
