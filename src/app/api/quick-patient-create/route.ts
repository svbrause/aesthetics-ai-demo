import { NextRequest, NextResponse } from "next/server";
import {
  analyzePhotos,
  AnalysisResult,
  ProcessedAnalysis,
} from "@/lib/modalService";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const { airtableRecordId, frontPhotoBase64, sidePhotoBase64, patientName } =
      await request.json();

    if (!airtableRecordId || !frontPhotoBase64 || !sidePhotoBase64) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: airtableRecordId, frontPhotoBase64, sidePhotoBase64",
        },
        { status: 400 }
      );
    }

    // Check if we have the required Airtable credentials
    const airtableApiKey = process.env.AIRTABLE_API_KEY;

    if (!airtableApiKey) {
      return NextResponse.json(
        { error: "Airtable API key not configured" },
        { status: 500 }
      );
    }

    // Fetch patient data from Airtable in parallel with photo analysis
    const [airtableResponse, analysisResult] = await Promise.all([
      fetch(
        `https://api.airtable.com/v0/appXblSpAMBQskgzB/Patients/${airtableRecordId}`,
        {
          headers: {
            Authorization: `Bearer ${airtableApiKey}`,
          },
        }
      ),
      analyzePhotosFromBase64(frontPhotoBase64, sidePhotoBase64),
    ]);

    if (!airtableResponse.ok) {
      const errorText = await airtableResponse.text();
      return NextResponse.json(
        {
          error: `Airtable API error: ${airtableResponse.status}`,
          details: errorText,
        },
        { status: airtableResponse.status }
      );
    }

    const airtableData = await airtableResponse.json();
    const patientFields = airtableData.fields;

    // Generate a new patient ID (increment from existing mock patients)
    const newPatientId = "1005"; // Camille will be patient 1005

    // Extract photo URLs from Airtable data
    const frontPhotoUrl = patientFields["Front Photo"]?.[0]?.url || null;
    const sidePhotoUrl = patientFields["Side Photo"]?.[0]?.url || null;

    // Extract findings from Airtable "Name (from All Issues) (from Analyses)" field
    const airtableFindings =
      patientFields["Name (from All Issues) (from Analyses)"] || [];
    const rawFindings = Array.isArray(airtableFindings) ? airtableFindings : [];

    // Filter out deprecated items and clean up findings to match interface requirements
    const findings = rawFindings
      .filter((finding) => !finding.includes("[DEPRECATED]"))
      .map((finding) => finding.trim())
      .filter((finding) => {
        // Only include findings that are actually in Airtable data
        const validFindings = [
          "Forehead Wrinkles",
          "Glabella Wrinkles",
          "Dark Spots",
          "Red Spots",
          "Marionette Lines",
          "Temporal Hollow",
          "Brow Asymmetry",
          "Crooked Nose",
          "Dorsal Hump",
          "Over-Rotated",
          "Nasal Tip Too Wide",
          "Thin Lips",
          "Lacking Philtral Column",
          "Long Philtral Column",
          "Dry Lips",
          "Lip Thinning When Smiling",
          "Retruded Chin",
        ];
        return validFindings.includes(finding);
      });

    // Create patient record with analysis results
    const patientRecord = {
      id: newPatientId,
      name: patientName || patientFields.Name || "Camille Fassett",
      age: patientFields.Age || 35,
      email: patientFields.Email || "camille.fassett@email.com",
      phone: patientFields.Phone || "(555) 234-5678",
      lastVisit: new Date().toISOString().split("T")[0],
      score: analysisResult.overallScore,
      findings:
        findings.length > 0
          ? findings
          : analysisResult.issues.map((issue) => issue.name),
      frontImage: frontPhotoUrl || "/Camille Fassett Front.png", // Use Airtable photo or fallback
      sideImage: sidePhotoUrl || "/Camille Fassett Side.png", // Use Airtable photo or fallback
      scanDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      airtableRecordId: airtableRecordId,
      // Add analysis details for the interface
      analysisDetails: {
        issues: analysisResult.issues,
        areas: analysisResult.areas,
        recommendations: analysisResult.recommendations,
      },
      // Store uploaded photos as base64 for backup
      uploadedPhotos: {
        front: frontPhotoBase64,
        side: sidePhotoBase64,
      },
    };

    return NextResponse.json({
      success: true,
      patient: patientRecord,
      analysisResult: analysisResult,
    });
  } catch (error) {
    console.error("Error in quick patient creation:", error);
    return NextResponse.json(
      {
        error: "Failed to create patient record",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Helper function to analyze photos from base64 strings
async function analyzePhotosFromBase64(
  frontBase64: string,
  sideBase64: string
): Promise<ProcessedAnalysis> {
  try {
    // Convert base64 to File objects
    const frontFile = base64ToFile(frontBase64, "front-photo.jpg");
    const sideFile = base64ToFile(sideBase64, "side-photo.jpg");

    // Use the existing analyzePhotos function
    const result = await analyzePhotos(frontFile, sideFile);
    return result.analysis;
  } catch (error) {
    console.error("Error analyzing photos:", error);
    // Return a default analysis result if analysis fails
    return {
      issues: [
        {
          name: "Forehead Wrinkles",
          severity: "moderate",
          confidence: 75,
          description: "Light to moderate forehead lines",
          area: "Forehead",
          gradeLetter: "B",
        },
        {
          name: "Nasolabial Folds",
          severity: "mild",
          confidence: 68,
          description: "Subtle nasolabial lines",
          area: "Mid Face",
          gradeLetter: "B+",
        },
      ],
      overallScore: 78,
      recommendations: [
        "Consider Botox for forehead lines",
        "Dermal fillers for nasolabial folds",
      ],
      areas: {
        Forehead: [
          {
            name: "Forehead Wrinkles",
            severity: "moderate",
            confidence: 75,
            description: "Light to moderate forehead lines",
            area: "Forehead",
            gradeLetter: "B",
          },
        ],
        "Mid Face": [
          {
            name: "Nasolabial Folds",
            severity: "mild",
            confidence: 68,
            description: "Subtle nasolabial lines",
            area: "Mid Face",
            gradeLetter: "B+",
          },
        ],
      },
    };
  }
}

// Helper function to convert base64 to File
function base64ToFile(base64String: string, filename: string): File {
  const arr = base64String.split(",");
  const mime = arr[0].match(/:(.*?);/)?.[1] || "image/jpeg";
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}
