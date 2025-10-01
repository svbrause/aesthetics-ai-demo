"use client";

import { AnalysisScreen } from "@/components/AnalysisScreen";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function AnalysisDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userPhoto, setUserPhoto] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    // Get user photo from localStorage
    const photo = localStorage.getItem("userPhoto");
    if (photo) {
      setUserPhoto(photo);
    } else {
      router.push("/patient-selection");
      return;
    }

    // Get category from URL params
    const category = searchParams.get("category");
    if (category) {
      setSelectedCategory(category);
    } else {
      router.push("/analysis-results");
      return;
    }
  }, [router, searchParams]);

  const handleDetailedAnalysisBack = () => {
    router.push("/analysis-results");
  };

  const handleViewJourney = () => {
    router.push("/journey");
  };

  return (
    <AnalysisScreen
      photoUrl={userPhoto}
      onComplete={handleDetailedAnalysisBack}
      onViewJourney={handleViewJourney}
      showResults={true}
      selectedCategory={selectedCategory}
    />
  );
}
