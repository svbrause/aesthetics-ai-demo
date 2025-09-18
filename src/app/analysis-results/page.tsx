"use client";

import { ThreeSlideAnalysisScreen } from "@/components/ThreeSlideAnalysisScreen";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PatientType } from "@/types";

export default function AnalysisResultsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [userPhoto, setUserPhoto] = useState<string>("");
  const [selectedPatient, setSelectedPatient] = useState<PatientType | null>(
    null
  );

  useEffect(() => {
    // Get data from localStorage
    const photo = localStorage.getItem("userPhoto");
    const patient = localStorage.getItem("selectedPatient") as PatientType;

    if (photo) {
      setUserPhoto(photo);
    } else {
      router.push("/patient-selection");
      return;
    }

    if (patient) {
      setSelectedPatient(patient);
    } else {
      router.push("/patient-selection");
      return;
    }
  }, [router]);

  const handleMoreInfo = (category: string) => {
    router.push(`/analysis-detail?category=${encodeURIComponent(category)}`);
  };

  const handleViewJourney = () => {
    router.push("/journey");
  };

  return (
    <ThreeSlideAnalysisScreen
      photoUrl={userPhoto}
      selectedPatient={selectedPatient}
      onMoreInfo={handleMoreInfo}
      onViewJourney={handleViewJourney}
    />
  );
}
