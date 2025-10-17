import { NextRequest, NextResponse } from "next/server";
import { analyzePhotos } from "@/lib/modalService";

// Force dynamic rendering for this route
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { frontPhoto, sidePhoto } = await request.json();

    // For demo purposes, we'll return mock data
    // In production, this would call the actual Modal API
    const result = await analyzePhotos(
      new File([frontPhoto], "front.jpg", { type: "image/jpeg" }),
      new File([sidePhoto], "side.jpg", { type: "image/jpeg" })
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Analysis API error:", error);
    return NextResponse.json({ error: "Analysis failed" }, { status: 500 });
  }
}
