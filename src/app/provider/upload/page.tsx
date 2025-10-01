"use client";

import { ModalPhotoUpload } from "@/components/ModalPhotoUpload";
import { useRouter } from "next/navigation";
import { AnalysisResult } from "@/lib/modalService";

export default function ProviderUploadPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/provider");
  };

  const handleAnalysisComplete = async (
    result: AnalysisResult,
    frontPhoto: File,
    sidePhoto: File
  ) => {
    // Store analysis result in localStorage for the results page
    localStorage.setItem("analysisResult", JSON.stringify(result));

    // Convert files to base64 and store them
    try {
      const frontBase64 = await fileToBase64(frontPhoto);
      const sideBase64 = await fileToBase64(sidePhoto);

      localStorage.setItem("frontPhoto", frontBase64);
      localStorage.setItem("sidePhoto", sideBase64);
    } catch (error) {
      console.error("Error converting photos to base64:", error);
    }

    router.push("/provider/results");
  };

  // Helper function to convert file to base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  return (
    <ModalPhotoUpload
      onAnalysisComplete={handleAnalysisComplete}
      onBack={handleBack}
    />
  );
}
