"use client";

import { AnalysisScreen } from "@/components/AnalysisScreen";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AnalysisPage() {
  const router = useRouter();
  const [userPhoto, setUserPhoto] = useState<string>("");

  useEffect(() => {
    // Get user photo from localStorage
    const photo = localStorage.getItem("userPhoto");
    if (photo) {
      setUserPhoto(photo);
    } else {
      // Redirect to patient selection if no photo
      router.push("/patient-selection");
    }
  }, [router]);

  const handleAnalysisLoadingComplete = () => {
    router.push("/analysis-results");
  };

  const handleViewJourney = () => {
    router.push("/journey");
  };

  return (
    <AnalysisScreen
      photoUrl={userPhoto}
      onComplete={handleAnalysisLoadingComplete}
      onViewJourney={handleViewJourney}
      showResults={false}
    />
  );
}
