import { Storage } from "@google-cloud/storage";

// Initialize Google Cloud Storage
const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID?.trim(),
  credentials: {
    client_email: process.env.GOOGLE_CLOUD_CLIENT_EMAIL?.trim(),
    private_key: process.env.GOOGLE_CLOUD_PRIVATE_KEY?.replace(
      /\\n/g,
      "\n"
    ).trim(),
  },
});

const bucketName = "test-deploy-august25"; // Using your existing bucket
const bucket = storage.bucket(bucketName);

export interface UploadResult {
  success: boolean;
  url?: string;
  error?: string;
}

export async function uploadPhotoToGCS(
  file: File,
  fileName: string,
  folder: string = "demo-form"
): Promise<UploadResult> {
  const uploadStartTime = Date.now();
  try {
    console.log(`📤 Starting upload for ${fileName}:`, {
      name: file.name,
      size: file.size,
      type: file.type,
      sizeMB: (file.size / (1024 * 1024)).toFixed(2) + " MB",
    });

    // Check if file is too large for memory - Vercel limits
    const maxBufferSize = 25 * 1024 * 1024; // 25MB (Vercel function limit)
    if (file.size > maxBufferSize) {
      console.error(
        `❌ File too large: ${file.size} bytes (max ${maxBufferSize})`
      );
      return {
        success: false,
        error: `File too large: ${(file.size / (1024 * 1024)).toFixed(
          2
        )}MB (max 25MB)`,
      };
    }

    // Convert File to Buffer with progress logging
    console.log(`📤 Converting file to buffer...`);
    const buffer = Buffer.from(await file.arrayBuffer());
    console.log(`📤 Buffer created, size: ${buffer.length} bytes`);

    // Create a unique filename with timestamp
    const timestamp = Date.now();
    const fileExtension = fileName.split(".").pop();
    const uniqueFileName = `${folder}/${timestamp}-${fileName}`;

    console.log(`📤 Uploading to GCS: ${uniqueFileName}`);

    // Upload to Google Cloud Storage with streaming for large files
    const fileUpload = bucket.file(uniqueFileName);

    // Set different cache control for videos vs images
    const isVideo = file.type.startsWith("video/");
    const cacheControl = isVideo
      ? "public, max-age=86400" // 1 day for videos
      : "public, max-age=31536000"; // 1 year for images

    // Use streaming upload for better memory management
    const stream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.type,
        cacheControl: cacheControl,
      },
      resumable: true, // Enable resumable uploads for large files
    });

    return new Promise((resolve) => {
      stream.on("error", (error) => {
        console.error(`❌ Stream error for ${fileName}:`, error);
        resolve({
          success: false,
          error: error.message || "Stream upload failed",
        });
      });

      stream.on("finish", () => {
        const uploadDuration = Date.now() - uploadStartTime;
        console.log(
          `✅ Upload completed for ${fileName} in ${uploadDuration}ms`
        );

        // Get the public URL
        const publicUrl = `https://storage.googleapis.com/${bucketName}/${uniqueFileName}`;

        resolve({
          success: true,
          url: publicUrl,
        });
      });

      // Write the buffer to the stream
      stream.end(buffer);
    });
  } catch (error) {
    const uploadDuration = Date.now() - uploadStartTime;
    console.error(
      `❌ Error uploading ${fileName} to Google Cloud Storage after ${uploadDuration}ms:`,
      error
    );
    console.error(`❌ Error details:`, {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      code: (error as any)?.code,
      status: (error as any)?.status,
      name: (error as any)?.name,
    });
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

export async function uploadMultiplePhotosToGCS(
  photos: { file: File; name: string; type: string }[],
  folder: string = "demo-form"
): Promise<{ [key: string]: UploadResult }> {
  const results: { [key: string]: UploadResult } = {};

  // Upload photos in parallel
  const uploadPromises = photos.map(async (photo) => {
    const result = await uploadPhotoToGCS(photo.file, photo.name, folder);
    return { key: photo.type, result };
  });

  const uploadResults = await Promise.all(uploadPromises);

  uploadResults.forEach(({ key, result }) => {
    results[key] = result;
  });

  return results;
}

// Helper function to check if we can access Google Cloud Storage
export async function ensureBucketExists(): Promise<boolean> {
  try {
    console.log("🔍 Testing Google Cloud Storage access...");

    // Check if we have the required environment variables
    const projectId = process.env.GOOGLE_CLOUD_PROJECT_ID?.trim();
    const clientEmail = process.env.GOOGLE_CLOUD_CLIENT_EMAIL?.trim();
    const privateKey = process.env.GOOGLE_CLOUD_PRIVATE_KEY?.trim();

    if (!projectId) {
      console.error("❌ GOOGLE_CLOUD_PROJECT_ID not set");
      return false;
    }
    if (!clientEmail) {
      console.error("❌ GOOGLE_CLOUD_CLIENT_EMAIL not set");
      return false;
    }
    if (!privateKey) {
      console.error("❌ GOOGLE_CLOUD_PRIVATE_KEY not set");
      return false;
    }

    console.log("✅ All Google Cloud environment variables present");

    // Try to check if the bucket exists and is accessible
    try {
      const [exists] = await bucket.exists();
      console.log(`🔍 Bucket ${bucketName} exists:`, exists);

      if (exists) {
        console.log(`✅ Target bucket ${bucketName} is accessible`);
        return true;
      } else {
        console.log(`❌ Target bucket ${bucketName} does not exist`);
        return false;
      }
    } catch (bucketError) {
      console.error("❌ Error checking bucket:", bucketError);
      console.error("❌ Bucket error details:", {
        message:
          bucketError instanceof Error ? bucketError.message : "Unknown error",
        code: (bucketError as any)?.code,
        status: (bucketError as any)?.status,
      });
      return false;
    }
  } catch (error) {
    console.error("❌ Error testing Google Cloud Storage:", error);
    console.error("❌ Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
    });
    return false;
  }
}
