// Modal API Client - Handles the actual API calls to your deployed Modal endpoint
// This handles the real integration with your Modal API

export interface ModalAPIClientResponse {
  success: boolean;
  error?: string;
  predictions?: string[];
  probabilities?: Record<string, number>;
  top_predictions?: Array<[string, number]>;
  threshold?: number;
  total_labels?: number;
  front_path?: string;
  side_path?: string;
  timestamp?: number;
}

export class ModalAPIClient {
  private baseURL: string;

  constructor() {
    this.baseURL = "https://ponce--my-training-app-predict-endpoint.modal.run";
  }

  // Method 1: Try to call with actual image data (if your API supports it)
  async analyzeWithBase64(
    frontBase64: string,
    sideBase64: string,
    threshold: number = 0.5
  ): Promise<ModalAPIClientResponse> {
    try {
      console.log("Attempting Modal API call with base64 data...");

      // Remove data URL prefix
      const frontData = frontBase64.split(",")[1];
      const sideData = sideBase64.split(",")[1];

      // Try different base64 parameter names that your Modal endpoint might support
      const response = await fetch(this.baseURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          front_b64: frontData,
          side_b64: sideData,
          threshold: threshold,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log(
          "Base64 approach failed, trying file path approach:",
          errorText
        );
        throw new Error(`Modal API failed: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log("Modal API base64 result:", result);
      return result;
    } catch (error) {
      console.log("Base64 approach failed, trying file path approach:", error);
      throw error;
    }
  }

  // Method 2: Use file paths (your current API format)
  async analyzeWithPaths(
    frontPath: string,
    sidePath: string,
    threshold: number = 0.5
  ): Promise<ModalAPIClientResponse> {
    try {
      console.log("Attempting Modal API call with file paths...");
      console.log("Front path:", frontPath);
      console.log("Side path:", sidePath);

      const url = `${this.baseURL}?front_path=${encodeURIComponent(
        frontPath
      )}&side_path=${encodeURIComponent(sidePath)}&threshold=${threshold}`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Modal API response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Modal API failed: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log("Modal API file path result:", result);
      return result;
    } catch (error) {
      console.error("File path approach failed:", error);
      throw error;
    }
  }

  // Method 3: Generate realistic mock data based on your API format
  generateMockResponse(
    frontPhoto: File,
    sidePhoto: File
  ): ModalAPIClientResponse {
    console.log("Generating mock response for demo purposes...");

    // Generate realistic mock data that matches your API format
    const mockPredictions = [
      "Nasolabial Folds",
      "Under Eye Hollow",
      "Dark Spots",
      "Crow's Feet Wrinkles",
      "Marionette Lines",
      "Jowls",
      "Neck Lines",
      "Temporal Hollow",
      "Prejowl Sulcus",
      "Forehead Wrinkles",
    ];

    const mockProbabilities: Record<string, number> = {};
    const mockTopPredictions: Array<[string, number]> = [];

    // Generate realistic confidence scores
    mockPredictions.forEach((label, index) => {
      const confidence = Math.random() * 0.4 + 0.3; // 0.3 to 0.7 range
      mockProbabilities[label] = confidence;
      if (confidence > 0.5) {
        mockTopPredictions.push([label, confidence]);
      }
    });

    // Sort by confidence
    mockTopPredictions.sort((a, b) => b[1] - a[1]);

    return {
      success: true,
      predictions: mockPredictions.slice(0, 5), // Top 5 predictions
      probabilities: mockProbabilities,
      top_predictions: mockTopPredictions.slice(0, 5),
      threshold: 0.5,
      total_labels: 81,
      front_path: `uploaded_${frontPhoto.name}`,
      side_path: `uploaded_${sidePhoto.name}`,
      timestamp: Math.floor(Date.now() / 1000),
    };
  }
}

// Export a singleton instance
export const modalAPIClient = new ModalAPIClient();
