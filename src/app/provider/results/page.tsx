"use client";

import { ModalAnalysisResults } from "@/components/ModalAnalysisResults";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AnalysisResult } from "@/lib/modalService";

export default function ProviderResultsPage() {
  const router = useRouter();
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [frontPhoto, setFrontPhoto] = useState<File | null>(null);
  const [sidePhoto, setSidePhoto] = useState<File | null>(null);

  useEffect(() => {
    // Get analysis result from localStorage
    const storedResult = localStorage.getItem("analysisResult");
    if (storedResult) {
      try {
        setAnalysisResult(JSON.parse(storedResult));
      } catch (error) {
        console.error("Error parsing analysis result:", error);
        router.push("/provider/upload");
      }
    } else {
      router.push("/provider/upload");
    }

    // Get uploaded photos from localStorage
    const loadPhotos = () => {
      const storedFrontPhoto = localStorage.getItem("frontPhoto");
      const storedSidePhoto = localStorage.getItem("sidePhoto");

      if (storedFrontPhoto) {
        try {
          // Convert base64 data URL back to File object
          const base64Data = storedFrontPhoto.split(",")[1];
          const byteCharacters = atob(base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const file = new File([byteArray], "front-photo.jpg", {
            type: "image/jpeg",
          });
          setFrontPhoto(file);
        } catch (error) {
          console.error("Error loading front photo:", error);
        }
      }

      if (storedSidePhoto) {
        try {
          // Convert base64 data URL back to File object
          const base64Data = storedSidePhoto.split(",")[1];
          const byteCharacters = atob(base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const file = new File([byteArray], "side-photo.jpg", {
            type: "image/jpeg",
          });
          setSidePhoto(file);
        } catch (error) {
          console.error("Error loading side photo:", error);
        }
      }
    };

    loadPhotos();
  }, [router]);

  const handleBack = () => {
    router.push("/provider");
  };

  const handleViewDetails = (area: string) => {
    // Navigate to detailed analysis for specific area
    console.log("View details for area:", area);
  };

  const handleBackToUpload = () => {
    // Clear stored data and go back to upload
    localStorage.removeItem("analysisResult");
    localStorage.removeItem("frontPhoto");
    localStorage.removeItem("sidePhoto");
    router.push("/provider/upload");
  };

  const handleSaveDraft = async (patientName: string, analysis: any) => {
    // In a real app, this would save to a database
    // For now, we'll just show a success message
    console.log("Saving draft for patient:", patientName, analysis);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Show success message
    alert(`Draft saved successfully for ${patientName}!`);

    // In a real app, you might navigate to the patient list or dashboard
    // router.push("/provider/patients");
  };

  if (!analysisResult) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading results...</p>
        </div>
      </div>
    );
  }

  return (
    <ModalAnalysisResults
      analysis={analysisResult.analysis}
      frontPhoto={frontPhoto}
      sidePhoto={sidePhoto}
      rawModalResponse={analysisResult.rawResponse}
      modalError={analysisResult.error}
      onBack={handleBack}
      onViewDetails={handleViewDetails}
      onSaveDraft={handleSaveDraft}
    />
  );
}
