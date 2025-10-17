import { NextRequest, NextResponse } from "next/server";
import { uploadPhotoToGCS, ensureBucketExists } from "@/lib/googleCloudStorage";

// Force dynamic rendering for this route
export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    // Ensure bucket exists
    const bucketExists = await ensureBucketExists();
    if (!bucketExists) {
      return NextResponse.json(
        { success: false, error: "Failed to create storage bucket" },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const fileName = formData.get("fileName") as string;
    const folder = (formData.get("folder") as string) || "demo-form";

    if (!file || !fileName) {
      return NextResponse.json(
        { success: false, error: "File and fileName are required" },
        { status: 400 }
      );
    }

    // Upload to Google Cloud Storage
    const result = await uploadPhotoToGCS(file, fileName, folder);

    if (result.success) {
      return NextResponse.json({
        success: true,
        url: result.url,
        fileName: fileName,
      });
    } else {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Photo upload error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to upload photo",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
