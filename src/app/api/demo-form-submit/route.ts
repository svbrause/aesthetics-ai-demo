import { NextRequest, NextResponse } from "next/server";
import {
  uploadMultiplePhotosToGCS,
  ensureBucketExists,
} from "@/lib/googleCloudStorage";

// Force dynamic rendering for this route
export const dynamic = "force-dynamic";

// Increase timeout for video uploads
export const maxDuration = 60; // 60 seconds for Pro plans
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  try {
    console.log("🚀 Demo form submission started at", new Date().toISOString());
    console.log("🌍 Environment:", process.env.NODE_ENV);
    console.log("🌍 Vercel region:", process.env.VERCEL_REGION);
    console.log("🌍 Function timeout:", process.env.VERCEL_FUNCTION_TIMEOUT);
    console.log("📱 User-Agent:", request.headers.get("user-agent"));
    console.log("📱 Content-Type:", request.headers.get("content-type"));
    console.log("📱 Content-Length:", request.headers.get("content-length"));

    const formData = await request.formData();
    console.log("📝 Form data received");
    console.log(
      "📝 Form data entries:",
      Array.from(formData.entries()).map(([key, value]) => [
        key,
        value instanceof File
          ? `File: ${value.name} (${value.size} bytes)`
          : value,
      ])
    );

    // Extract the form data
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;
    const dateOfBirth = formData.get("dateOfBirth") as string;

    // Safely parse JSON fields
    let previousProcedures = [];
    let goals = [];
    let regions = [];

    try {
      const previousProceduresStr = formData.get(
        "previousProcedures"
      ) as string;
      if (previousProceduresStr) {
        previousProcedures = JSON.parse(previousProceduresStr);
      }
    } catch (e) {
      console.warn("Failed to parse previousProcedures:", e);
    }

    try {
      const goalsStr = formData.get("goals") as string;
      if (goalsStr) {
        goals = JSON.parse(goalsStr);
      }
    } catch (e) {
      console.warn("Failed to parse goals:", e);
    }

    try {
      const regionsStr = formData.get("regions") as string;
      if (regionsStr) {
        regions = JSON.parse(regionsStr);
      }
    } catch (e) {
      console.warn("Failed to parse regions:", e);
    }

    const frontPhoto = formData.get("frontPhoto") as File | null;
    const leftSidePhoto = formData.get("leftSidePhoto") as File | null;
    const rightSidePhoto = formData.get("rightSidePhoto") as File | null;
    const expressions = formData.get("expressions") as File | null;

    // Log detailed file information
    const logFileInfo = (file: File | null, name: string) => {
      if (file) {
        console.log(`📁 ${name}:`, {
          name: file.name,
          size: file.size,
          type: file.type,
          lastModified: file.lastModified,
          sizeMB: (file.size / (1024 * 1024)).toFixed(2) + " MB",
        });
      } else {
        console.log(`📁 ${name}: null`);
      }
    };

    logFileInfo(frontPhoto, "Front Photo");
    logFileInfo(leftSidePhoto, "Left Side Photo");
    logFileInfo(rightSidePhoto, "Right Side Photo");
    logFileInfo(expressions, "Expressions File");

    console.log("📊 Form data extracted:", {
      firstName,
      lastName,
      email,
      phone,
      dateOfBirth,
      hasFrontPhoto: !!frontPhoto,
      hasLeftPhoto: !!leftSidePhoto,
      hasRightPhoto: !!rightSidePhoto,
      hasExpressions: !!expressions,
    });

    // Check environment variables
    console.log("🔧 Environment check:", {
      hasProjectId: !!process.env.GOOGLE_CLOUD_PROJECT_ID,
      hasClientEmail: !!process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
      hasPrivateKey: !!process.env.GOOGLE_CLOUD_PRIVATE_KEY,
      hasAirtableBaseId: !!process.env.AIRTABLE_BASE_ID,
      hasAirtableApiKey: !!process.env.AIRTABLE_API_KEY,
    });

    // Log memory usage
    const memUsage = process.memoryUsage();
    console.log("🧠 Memory usage:", {
      rss: Math.round(memUsage.rss / 1024 / 1024) + " MB",
      heapTotal: Math.round(memUsage.heapTotal / 1024 / 1024) + " MB",
      heapUsed: Math.round(memUsage.heapUsed / 1024 / 1024) + " MB",
      external: Math.round(memUsage.external / 1024 / 1024) + " MB",
    });

    // Try Google Cloud Storage, but don't fail if it doesn't work
    console.log("🪣 Checking Google Cloud Storage bucket...");
    const bucketExists = await ensureBucketExists("aesthetics-ai-photos");
    if (!bucketExists) {
      console.warn(
        "⚠️ Google Cloud Storage not available, continuing without photo uploads"
      );
    } else {
      console.log("✅ Google Cloud Storage bucket ready");
    }

    // Validate file sizes and types - Increased limits for better user experience
    const MAX_FILE_SIZE = 25 * 1024 * 1024; // 25MB for images (increased from 10MB)
    const MAX_VIDEO_SIZE = 50 * 1024 * 1024; // 50MB for videos (increased from 25MB)
    const ALLOWED_IMAGE_TYPES = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/webp",
    ];
    const ALLOWED_VIDEO_TYPES = [
      "video/mp4",
      "video/quicktime",
      "video/x-msvideo",
      "video/webm",
    ];

    const validateFile = (file: File, name: string) => {
      const errors = [];

      // Different size limits for videos vs images
      const maxSize = name === "expressions" ? MAX_VIDEO_SIZE : MAX_FILE_SIZE;
      const maxSizeLabel = name === "expressions" ? "25MB" : "10MB";

      if (file.size > maxSize) {
        errors.push(
          `File too large: ${(file.size / (1024 * 1024)).toFixed(
            2
          )}MB (max ${maxSizeLabel})`
        );
      }

      if (name === "expressions") {
        // Expressions can be either image or video
        if (
          !ALLOWED_IMAGE_TYPES.includes(file.type) &&
          !ALLOWED_VIDEO_TYPES.includes(file.type)
        ) {
          errors.push(
            `Invalid file type: ${
              file.type
            }. Allowed: images (${ALLOWED_IMAGE_TYPES.join(
              ", "
            )}) or videos (${ALLOWED_VIDEO_TYPES.join(", ")})`
          );
        }
      } else {
        // Other files should be images only
        if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
          errors.push(
            `Invalid file type: ${
              file.type
            }. Allowed: ${ALLOWED_IMAGE_TYPES.join(", ")}`
          );
        }
      }

      if (errors.length > 0) {
        console.error(`❌ File validation failed for ${name}:`, errors);
        return { valid: false, errors };
      }

      return { valid: true, errors: [] };
    };

    // Upload photos to Google Cloud Storage
    const photosToUpload = [];
    const fileValidationErrors = [];

    if (frontPhoto) {
      const validation = validateFile(frontPhoto, "frontPhoto");
      if (validation.valid) {
        photosToUpload.push({
          file: frontPhoto,
          name: `front-${Date.now()}.${frontPhoto.name.split(".").pop()}`,
          type: "frontPhoto",
        });
      } else {
        fileValidationErrors.push(...validation.errors);
      }
    }
    if (leftSidePhoto) {
      const validation = validateFile(leftSidePhoto, "leftSidePhoto");
      if (validation.valid) {
        photosToUpload.push({
          file: leftSidePhoto,
          name: `left-${Date.now()}.${leftSidePhoto.name.split(".").pop()}`,
          type: "leftSidePhoto",
        });
      } else {
        fileValidationErrors.push(...validation.errors);
      }
    }
    if (rightSidePhoto) {
      const validation = validateFile(rightSidePhoto, "rightSidePhoto");
      if (validation.valid) {
        photosToUpload.push({
          file: rightSidePhoto,
          name: `right-${Date.now()}.${rightSidePhoto.name.split(".").pop()}`,
          type: "rightSidePhoto",
        });
      } else {
        fileValidationErrors.push(...validation.errors);
      }
    }
    if (expressions) {
      const validation = validateFile(expressions, "expressions");
      if (validation.valid) {
        photosToUpload.push({
          file: expressions,
          name: `expressions-${Date.now()}.${expressions.name
            .split(".")
            .pop()}`,
          type: "expressions",
        });
      } else {
        fileValidationErrors.push(...validation.errors);
      }
    }

    // If there are validation errors, return them
    if (fileValidationErrors.length > 0) {
      console.error("❌ File validation errors:", fileValidationErrors);
      return NextResponse.json(
        {
          success: false,
          error: "File validation failed",
          details: fileValidationErrors,
        },
        { status: 400 }
      );
    }

    // Upload all photos to Google Cloud Storage (if available)
    let photoUploadResults: {
      [key: string]: { success: boolean; error?: string; url?: string };
    } = {};
    if (photosToUpload.length > 0 && bucketExists) {
      console.log(
        `📸 Uploading ${photosToUpload.length} files to Google Cloud Storage...`
      );
      console.log(
        "📸 Files to upload:",
        photosToUpload.map((p) => ({
          type: p.type,
          name: p.name,
          size: p.file.size,
          sizeMB: (p.file.size / (1024 * 1024)).toFixed(2) + " MB",
        }))
      );

      const uploadStartTime = Date.now();
      try {
        photoUploadResults = await uploadMultiplePhotosToGCS(
          photosToUpload.map(p => p.file),
          "demo-form"
        );
        const uploadDuration = Date.now() - uploadStartTime;
        console.log(`📸 Upload completed in ${uploadDuration}ms`);
        console.log("📸 Photo upload results:", photoUploadResults);
      } catch (uploadError) {
        console.error("❌ Upload error:", uploadError);
        // Set all photos as failed
        photosToUpload.forEach((photo) => {
          photoUploadResults[photo.type] = {
            success: false,
            error:
              uploadError instanceof Error
                ? uploadError.message
                : "Upload failed",
          };
        });
      }
    } else if (photosToUpload.length > 0) {
      console.log(
        "📸 Skipping photo uploads - Google Cloud Storage not available"
      );
      // Set all photos as failed
      photosToUpload.forEach((photo) => {
        photoUploadResults[photo.type] = {
          success: false,
          error: "Google Cloud Storage not available",
        };
      });
    }

    // Generate a unique submission ID
    const submissionId = `DEMO-${Date.now()}-${Math.random()
      .toString(36)
      .substr(2, 9)}`;

    // Prepare photo URLs for Airtable
    const photoUrls = {
      frontPhoto: photoUploadResults.frontPhoto?.success
        ? photoUploadResults.frontPhoto.url
        : null,
      leftSidePhoto: photoUploadResults.leftSidePhoto?.success
        ? photoUploadResults.leftSidePhoto.url
        : null,
      rightSidePhoto: photoUploadResults.rightSidePhoto?.success
        ? photoUploadResults.rightSidePhoto.url
        : null,
      expressions: photoUploadResults.expressions?.success
        ? photoUploadResults.expressions.url
        : null,
    };

    // Prepare data for Airtable - start with minimal required fields
    const airtableFields: any = {
      Name: `${firstName} ${lastName}`,
      Email: email,
      "Phone Number": phone,
      Birthday: dateOfBirth ? new Date(dateOfBirth).toISOString() : null,
      "Submission Date": new Date().toISOString(),
      "Form Name": "V3 Demo Facial Analysis Intake",
      "Submission ID": submissionId,
      "Approval Status": "Waiting for Analysis",
      "Source (from Jotform)": "LeadValue",
    };

    // Add optional fields only if they have values
    if (previousProcedures && previousProcedures.length > 0) {
      airtableFields["Have you had any aesthetic procedures?"] =
        previousProcedures;
    }
    if (goals && goals.length > 0) {
      airtableFields["What would you like to improve?"] = goals;
    }

    // Only add photo fields if we have photos
    if (photoUrls.frontPhoto) {
      airtableFields["Front Photo"] = [
        {
          url: photoUrls.frontPhoto,
          filename: `front-${Date.now()}.jpg`,
        },
      ];
    }
    if (photoUrls.rightSidePhoto) {
      airtableFields["Side Photo"] = [
        {
          url: photoUrls.rightSidePhoto,
          filename: `side-${Date.now()}.jpg`,
        },
      ];
    }
    if (photoUrls.leftSidePhoto) {
      airtableFields["Left Side Photo"] = [
        {
          url: photoUrls.leftSidePhoto,
          filename: `left-${Date.now()}.jpg`,
        },
      ];
    }
    if (photoUrls.expressions) {
      airtableFields["Animation"] = [
        {
          url: photoUrls.expressions,
          filename: `expressions-${Date.now()}.mp4`,
        },
      ];
    }

    // Note: Photo upload status removed as the field doesn't exist in Airtable

    const airtableData = {
      fields: airtableFields,
    };

    // Submit to Airtable
    console.log("📋 Submitting to Airtable...");
    console.log("📋 Airtable data:", JSON.stringify(airtableData, null, 2));

    // Check if we have the required Airtable credentials
    const airtableApiKey = process.env.AIRTABLE_API_KEY;
    const airtableBaseId = process.env.AIRTABLE_BASE_ID || "appXblSpAMBQskgzB";

    if (!airtableBaseId || !airtableApiKey) {
      console.warn(
        "⚠️ Airtable credentials not available, skipping Airtable submission"
      );
      return NextResponse.json({
        success: true,
        message: "Form submitted successfully (without Airtable)",
        warning: "Airtable submission skipped - credentials not available",
      });
    }

    const airtableResponse = await fetch(
      `https://api.airtable.com/v0/${airtableBaseId}/Form%20Submissions?typecast=true`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${airtableApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(airtableData),
      }
    );

    console.log("📋 Airtable response status:", airtableResponse.status);

    if (!airtableResponse.ok) {
      const errorText = await airtableResponse.text();
      console.error("❌ Airtable API error:", errorText);
      console.error("❌ Airtable response status:", airtableResponse.status);
      console.error(
        "❌ Airtable response headers:",
        Object.fromEntries(airtableResponse.headers.entries())
      );

      // Don't fail the entire submission if Airtable fails
      console.warn(
        "⚠️ Airtable submission failed, but continuing with success response"
      );
      return NextResponse.json({
        success: true,
        message: "Form submitted successfully (Airtable submission failed)",
        warning: `Airtable error: ${airtableResponse.status} - ${errorText}`,
      });
    }

    const airtableResult = await airtableResponse.json();
    console.log("Successfully submitted to Airtable:", airtableResult);

    const totalDuration = Date.now() - startTime;
    console.log(
      `✅ Form submission completed successfully in ${totalDuration}ms`
    );

    return NextResponse.json({
      success: true,
      message: "Form submitted successfully",
      airtableId: airtableResult.id,
      duration: totalDuration,
    });
  } catch (error) {
    const totalDuration = Date.now() - startTime;
    console.error(`❌ Form submission error after ${totalDuration}ms:`, error);
    console.error("❌ Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      stack: error instanceof Error ? error.stack : undefined,
      name: (error as any)?.name,
      code: (error as any)?.code,
      status: (error as any)?.status,
    });

    // Check for specific production errors
    let errorMessage = "Failed to submit form";
    let statusCode = 500;

    if (error instanceof Error) {
      if (
        error.message.includes("timeout") ||
        error.message.includes("TIMEOUT")
      ) {
        errorMessage = "Request timed out. Please try with a smaller file.";
        statusCode = 408;
      } else if (
        error.message.includes("memory") ||
        error.message.includes("MEMORY")
      ) {
        errorMessage = "File too large. Please try with a smaller file.";
        statusCode = 413;
      } else if (
        error.message.includes("permission") ||
        error.message.includes("PERMISSION")
      ) {
        errorMessage =
          "Permission denied. Please check your Google Cloud Storage configuration.";
        statusCode = 403;
      } else if (
        error.message.includes("network") ||
        error.message.includes("NETWORK")
      ) {
        errorMessage =
          "Network error. Please check your internet connection and try again.";
        statusCode = 503;
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
        details: error instanceof Error ? error.message : "Unknown error",
        duration: totalDuration,
      },
      { status: statusCode }
    );
  }
}
