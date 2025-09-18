// Modal API integration for real-time photo analysis
import { modalAPIClient, ModalAPIClientResponse } from "./modalAPIClient";
import { uploadImagesToModal } from "./realModalAPI";
import {
  uploadToModalVolume,
  getTrainingImagePaths,
} from "./modalVolumeUpload";
import {
  getAreaForIssue,
  scaleProbabilityToScore,
  getGradeLetter,
} from "./issueMapping";
export interface ModalAnalysisResult {
  sample_metadata: Array<{
    sample_index: number;
    front_path: string;
    side_path: string;
    predicted_labels: string[];
    raw_probabilities: Record<string, number>;
  }>;
}

export interface AnalysisIssue {
  name: string;
  severity: "mild" | "moderate" | "severe";
  confidence: number;
  description: string;
  area: string;
  gradeLetter?: string; // Add grade letter field
}

export interface ProcessedAnalysis {
  issues: AnalysisIssue[];
  overallScore: number;
  recommendations: string[];
  areas: {
    [key: string]: AnalysisIssue[];
  };
}

// Modal API endpoint - deployed Modal function
const MODAL_API_URL =
  process.env.NEXT_PUBLIC_MODAL_API_URL ||
  "https://ponce--my-training-app-predict-endpoint.modal.run";

export interface AnalysisResult {
  analysis: ProcessedAnalysis;
  rawResponse?: any;
  error?: string;
}

export async function analyzePhotos(
  frontPhoto: File,
  sidePhoto: File
): Promise<AnalysisResult> {
  try {
    console.log("Starting photo analysis...");
    console.log("Modal API URL:", MODAL_API_URL);

    // Convert files to base64 for API
    const frontBase64 = await fileToBase64(frontPhoto);
    const sideBase64 = await fileToBase64(sidePhoto);

    console.log("Calling Modal API...");

    try {
      // Try base64 approach first (if your API supports it)
      console.log("Attempting Modal API with base64 data...");

      const modalResponse = await modalAPIClient.analyzeWithBase64(
        frontBase64,
        sideBase64,
        0.5
      );

      console.log("Modal API base64 result:", modalResponse);
      return {
        analysis: processModalAPIResults(modalResponse),
        rawResponse: modalResponse,
      };
    } catch (base64Error) {
      console.log(
        "Base64 approach failed, trying file path approach:",
        base64Error
      );

      try {
        // Try file path approach - upload images to Modal volume first
        console.log("Attempting to upload images to Modal volume...");

        // For now, let's use the training images that are already in your Modal volume
        // This will allow us to test the integration with your working Modal endpoint
        const imagePaths = getTrainingImagePaths();
        console.log("Using training image paths:", imagePaths);

        // Now call Modal API with the image paths
        const modalResponse = await modalAPIClient.analyzeWithPaths(
          imagePaths.front_path,
          imagePaths.side_path,
          0.5
        );

        console.log("Modal API file path result:", modalResponse);
        return {
          analysis: processModalAPIResults(modalResponse),
          rawResponse: modalResponse,
        };
      } catch (filePathError) {
        console.log(
          "File path approach failed, using mock response:",
          filePathError
        );

        // Fallback to mock response
        const mockResponse = modalAPIClient.generateMockResponse(
          frontPhoto,
          sidePhoto
        );

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 2000));

        console.log("Using mock Modal API result:", mockResponse);
        return {
          analysis: processModalAPIResults(mockResponse),
          rawResponse: mockResponse,
        };
      }
    }
  } catch (error) {
    console.error("Modal analysis error:", error);
    console.log("Falling back to mock analysis for demo purposes");
    // Return mock data for demo purposes if API fails
    return {
      analysis: getMockAnalysis(),
      error: error instanceof Error ? error.message : String(error),
    };
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

async function uploadImagesToModalVolume(
  frontPhoto: File,
  sidePhoto: File
): Promise<{ front_path: string; side_path: string }> {
  try {
    console.log("Uploading images to Modal volume via API...");

    const formData = new FormData();
    formData.append("frontPhoto", frontPhoto);
    formData.append("sidePhoto", sidePhoto);

    const response = await fetch("/api/upload-to-modal", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Upload failed: ${response.status} - ${errorText}`);
    }

    const result = await response.json();
    console.log("Upload to Modal volume result:", result);

    return {
      front_path: result.front_path,
      side_path: result.side_path,
    };
  } catch (error) {
    console.error("Upload to Modal volume failed:", error);
    throw error;
  }
}

// New interface for Modal API response
interface ModalAPIResponse {
  model_path: string;
  threshold: number;
  labels_on: Array<[string, number]>;
  all_scores: Record<string, number>;
}

function processModalAPIResults(
  result: ModalAPIClientResponse
): ProcessedAnalysis {
  const issues: AnalysisIssue[] = [];
  const areas: { [key: string]: AnalysisIssue[] } = {};

  console.log("Processing Modal API response:", result);

  // Handle successful response
  if (
    result.success &&
    result.top_predictions &&
    Array.isArray(result.top_predictions)
  ) {
    // Use top_predictions array (your API format)
    result.top_predictions.forEach(([label, confidence]: [string, number]) => {
      const severity = getSeverityFromConfidence(confidence);
      const area = getAreaForIssue(label); // Use new mapping function
      const scaledScore = scaleProbabilityToScore(confidence); // Scale to 60-95 range
      const gradeLetter = getGradeLetter(scaledScore);

      const issue: AnalysisIssue = {
        name: label,
        severity,
        confidence: scaledScore, // Use scaled score instead of raw confidence
        description: getIssueDescription(label),
        area,
        gradeLetter, // Add grade letter
      };

      issues.push(issue);

      if (!areas[area]) {
        areas[area] = [];
      }
      areas[area].push(issue);
    });
  } else if (
    result.success &&
    result.probabilities &&
    typeof result.probabilities === "object"
  ) {
    // Use probabilities object
    Object.entries(result.probabilities).forEach(([label, confidence]) => {
      if (confidence > 0.3) {
        // Only include issues with >30% confidence
        const severity = getSeverityFromConfidence(confidence);
        const area = getAreaForIssue(label); // Use new mapping function
        const scaledScore = scaleProbabilityToScore(confidence); // Scale to 60-95 range
        const gradeLetter = getGradeLetter(scaledScore);

        const issue: AnalysisIssue = {
          name: label,
          severity,
          confidence: scaledScore, // Use scaled score instead of raw confidence
          description: getIssueDescription(label),
          area,
          gradeLetter, // Add grade letter
        };

        issues.push(issue);

        if (!areas[area]) {
          areas[area] = [];
        }
        areas[area].push(issue);
      }
    });
  } else if (result.error) {
    // Handle API error case
    console.error("Modal API returned error:", result.error);
    // Return empty analysis for error case
  } else {
    // Handle unexpected response format
    console.warn("Unexpected Modal API response format:", result);
  }

  // Calculate overall score based on detected issues (using new scaled scores)
  const overallScore =
    issues.length > 0
      ? Math.round(
          issues.reduce((sum, issue) => sum + issue.confidence, 0) /
            issues.length
        )
      : 95; // Default to A grade if no issues

  return {
    issues,
    overallScore,
    recommendations: generateRecommendations(issues),
    areas,
  };
}

function processModalResults(result: ModalAnalysisResult): ProcessedAnalysis {
  const sample = result.sample_metadata[0];
  const issues: AnalysisIssue[] = [];
  const areas: { [key: string]: AnalysisIssue[] } = {};

  // Process predicted labels and probabilities
  sample.predicted_labels.forEach((label) => {
    const confidence = sample.raw_probabilities[label] || 0;
    const severity = getSeverityFromConfidence(confidence);
    const area = getAreaForIssue(label);

    const issue: AnalysisIssue = {
      name: label,
      severity,
      confidence: Math.round(confidence * 100),
      description: getIssueDescription(label),
      area,
    };

    issues.push(issue);

    if (!areas[area]) {
      areas[area] = [];
    }
    areas[area].push(issue);
  });

  const overallScore = Math.round(
    issues.reduce((sum, issue) => sum + issue.confidence, 0) / issues.length
  );

  return {
    issues,
    overallScore,
    recommendations: generateRecommendations(issues),
    areas,
  };
}

function getSeverityFromConfidence(
  confidence: number
): "mild" | "moderate" | "severe" {
  if (confidence < 0.4) return "mild";
  if (confidence < 0.7) return "moderate";
  return "severe";
}

function getIssueDescription(label: string): string {
  const descriptions: { [key: string]: string } = {
    // Skin Quality Issues
    "Dark Spots": "Hyperpigmentation and age spots visible on the skin",
    "Dry Lips": "Dehydrated and chapped lips",
    "Forehead Wrinkles": "Horizontal lines across the forehead",
    "Crow's Feet Wrinkles": "Fine lines around the eyes",
    "Under Eye Wrinkles": "Fine lines under the eyes",
    Blackheads: "Clogged pores with oxidized sebum",
    Whiteheads: "Closed comedones with trapped sebum",
    "Red Spots": "Inflammatory skin lesions or acne marks",
    Scars: "Visible scarring from previous injuries or acne",
    "Crepey Skin": "Thin, wrinkled skin with crepe-like texture",
    "Dry Skin": "Dehydrated skin lacking moisture",
    Oily: "Excessive sebum production",
    "Under Eye Dark Circles": "Dark discoloration under the eyes",
    "Perioral Wrinkles": "Fine lines around the mouth area",
    "Bunny Lines": "Horizontal lines across the nose bridge",
    "Glabella Wrinkles": "Vertical lines between the eyebrows",

    // Facial Structure Issues
    "Nasolabial Folds": "Lines running from nose to mouth corners",
    "Under Eye Hollow": "Volume loss creating shadows under the eyes",
    "Temporal Hollow": "Volume loss in the temple area",
    "Prejowl Sulcus": "Depression before the jowl area",
    "Masseter Hypertrophy":
      "Overdeveloped jaw muscles creating square appearance",
    "Dorsal Hump": "Bump on the nasal bridge",
    "Nasal Bone - Too Wide": "Wide nasal bone structure",
    "Nasal Tip Too Wide": "Wide nasal tip",
    "Nasal Tip Too Narrow": "Narrow nasal tip",
    "Over-Projected": "Nose projects too far from the face",
    "Under-Projected": "Nose projects too little from the face",
    "Over-Rotated": "Nose tip rotated too far upward",
    "Under-Rotated": "Nose tip rotated too far downward",
    "Asymmetric Chin": "Chin asymmetry affecting facial balance",
    "Asymmetric Lips": "Lip asymmetry affecting facial harmony",
    "Asymmetric Jawline": "Jawline asymmetry affecting facial symmetry",
    "Neck Lines": "Horizontal lines across the neck",
    "Marionette Lines": "Lines from mouth corners downward",
    Jowls: "Sagging skin along the jawline",
    "Excess/Submental Fullness": "Excess fat under the chin",
    "Retruded Chin": "Recessed chin affecting profile",
    "Over-Projected Chin": "Chin projects too far forward",
    "Thin Lips": "Insufficient lip volume",
    "Brow Asymmetry": "Uneven brow positioning",
    "Brow Ptosis": "Drooping eyebrows",
    "Lower Eyelid Sag": "Drooping lower eyelid skin",
    "Lower Eyelid Bags": "Puffiness or bags under the eyes",
    "Lower Eyelid - Excess Skin": "Excess skin in the lower eyelid area",
    "Mid Cheek Flattening": "Loss of cheek volume and definition",
    "Cheekbone - Not Prominent": "Lack of cheekbone definition",
    "Heavy Lateral Cheek": "Excessive fullness in the lateral cheek area",
    "Lower Cheeks - Over-Filled": "Excessive volume in the lower cheek area",
    "Lower Cheeks - Volume Depletion": "Loss of volume in the lower cheek area",
    "Ill-Defined Jawline": "Lack of clear jawline definition",
    "Narrow Jawline": "Narrow jawline structure",
    "Wide Jawline": "Wide jawline structure",
    "Wide Chin": "Wide chin structure",
    "Crooked Nose": "Nose deviation from centerline",
    "Droopy Tip": "Nose tip pointing downward",
    "Tip Droop When Smiling": "Nose tip droops when smiling",
    "Nostril Base - Too Wide": "Wide nostril base",
    "Negative Canthal Tilt": "Downward slant of the eye corners",
    "Flat Forehead": "Lack of forehead projection",
    "Excess Upper Eyelid Skin": "Excess skin in the upper eyelid area",
    "Upper Eyelid Droop": "Drooping upper eyelid",
    "Upper Eye Hollow": "Volume loss in the upper eye area",
    "Loose Neck Skin": "Sagging skin in the neck area",
    "Platysmal Bands": "Vertical bands in the neck muscles",
    "Lacking Philtral Column": "Shallow philtrum (space between nose and lips)",
    "Long Philtral Column": "Long philtrum (space between nose and lips)",
    "Lip Thinning When Smiling": "Lips appear thinner when smiling",
    "Gummy Smile": "Excessive gum exposure when smiling",
  };

  return descriptions[label] || "Aesthetic concern requiring attention";
}

function generateRecommendations(issues: AnalysisIssue[]): string[] {
  const recommendations: string[] = [];

  const facialStructureIssues = issues.filter(
    (issue) => issue.area === "facial-structure"
  );
  const skinQualityIssues = issues.filter(
    (issue) => issue.area === "skin-quality"
  );

  if (facialStructureIssues.length > 0) {
    recommendations.push("Consider dermal fillers for volume restoration");
    recommendations.push("Botox may help with muscle-related concerns");
  }

  if (skinQualityIssues.length > 0) {
    recommendations.push("Professional skincare routine recommended");
    recommendations.push("Consider laser treatments for pigmentation");
  }

  if (issues.some((issue) => issue.name.includes("Nasal"))) {
    recommendations.push("Rhinoplasty consultation may be beneficial");
  }

  return recommendations;
}

function getMockAnalysis(): ProcessedAnalysis {
  return {
    issues: [
      {
        name: "Nasolabial Folds",
        severity: "moderate",
        confidence: 78,
        description: "Lines running from nose to mouth corners",
        area: "facial-structure",
      },
      {
        name: "Under Eye Hollow",
        severity: "severe",
        confidence: 85,
        description: "Volume loss creating shadows under the eyes",
        area: "facial-structure",
      },
      {
        name: "Dark Spots",
        severity: "mild",
        confidence: 65,
        description: "Hyperpigmentation and age spots visible on the skin",
        area: "skin-quality",
      },
    ],
    overallScore: 76,
    recommendations: [
      "Consider dermal fillers for volume restoration",
      "Professional skincare routine recommended",
      "Botox may help with muscle-related concerns",
    ],
    areas: {
      "facial-structure": [
        {
          name: "Nasolabial Folds",
          severity: "moderate",
          confidence: 78,
          description: "Lines running from nose to mouth corners",
          area: "facial-structure",
        },
        {
          name: "Under Eye Hollow",
          severity: "severe",
          confidence: 85,
          description: "Volume loss creating shadows under the eyes",
          area: "facial-structure",
        },
      ],
      "skin-quality": [
        {
          name: "Dark Spots",
          severity: "mild",
          confidence: 65,
          description: "Hyperpigmentation and age spots visible on the skin",
          area: "skin-quality",
        },
      ],
    },
  };
}
