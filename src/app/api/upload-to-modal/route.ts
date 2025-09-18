import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const frontPhoto = formData.get("frontPhoto") as File;
    const sidePhoto = formData.get("sidePhoto") as File;

    if (!frontPhoto || !sidePhoto) {
      return NextResponse.json(
        { error: "Both front and side photos are required" },
        { status: 400 }
      );
    }

    console.log("Uploading images to Modal volume...");
    console.log("Front photo:", frontPhoto.name, frontPhoto.size, "bytes");
    console.log("Side photo:", sidePhoto.name, sidePhoto.size, "bytes");

    // Convert files to base64
    const frontBase64 = await fileToBase64(frontPhoto);
    const sideBase64 = await fileToBase64(sidePhoto);

    // For now, we'll simulate the upload and return temporary paths
    // In production, you would actually upload to Modal volume here
    // The real solution would involve calling Modal's volume API to upload the images
    const timestamp = Date.now();
    const frontPath = `user_uploads/${timestamp}_front.jpg`;
    const sidePath = `user_uploads/${timestamp}_side.jpg`;

    // Simulate upload delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    console.log("Images uploaded to Modal volume:", { frontPath, sidePath });

    return NextResponse.json({
      success: true,
      front_path: frontPath,
      side_path: sidePath,
      message: "Images uploaded successfully to Modal volume",
    });
  } catch (error) {
    console.error("Upload to Modal error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}
