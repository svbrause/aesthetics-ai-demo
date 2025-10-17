"use client";

import { PatientDetailScreenV2Refactored } from "@/components/provider/PatientDetailScreenV2Refactored";
import { LightThemeWrapper } from "@/components/provider/LightThemeWrapper";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

// Mock patient data - in a real app, this would come from an API
const mockPatients = {
  "1001": {
    id: "1001",
    name: "Sydney Adams",
    age: 28,
    email: "sydney.adams@email.com",
    phone: "(555) 123-4567",
    lastVisit: "2024-01-15",
    score: 78,
    findings: [
      { name: "Forehead Wrinkles", severity: "moderate", score: 70 },
      { name: "Dark Spots", severity: "subtle", score: 25 },
      { name: "Nasolabial Folds", severity: "severe", score: 85 },
      { name: "Marionette Lines", severity: "moderate", score: 72 },
      { name: "Red Spots", severity: "subtle", score: 30 },
      { name: "Whiteheads", severity: "mild", score: 45 },
      { name: "Temporal Hollow", severity: "severe", score: 88 },
      { name: "Under Eye Hollow", severity: "moderate", score: 70 },
      { name: "Upper Eye Hollow", severity: "subtle", score: 35 },
      { name: "Lower Eyelid Sag", severity: "mild", score: 50 },
      { name: "Mid Cheek Flattening", severity: "severe", score: 82 },
      { name: "Crooked Nose", severity: "subtle", score: 28 },
      { name: "Dorsal Hump", severity: "mild", score: 40 },
      { name: "Dry Lips", severity: "subtle", score: 32 },
      { name: "Excess/Submental Fullness", severity: "moderate", score: 68 },
      { name: "Prejowl Sulcus", severity: "severe", score: 90 },
      { name: "Retruded Chin", severity: "moderate", score: 72 },
      { name: "Masseter Hypertrophy", severity: "subtle", score: 38 },
    ],
    frontImage: "/Sydney Adams Front.png",
    sideImage: "/Sydney Adams Side.png",
    scanDate: "December 15, 2024",
  },
  // ... other patients
};

export default function ProviderLightModePatientDetailPage() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  // Get patient data
  const patientId = params.id as string;
  const patient = mockPatients[patientId as keyof typeof mockPatients];

  const handleBack = () => {
    // Go back to the light mode patients list if coming from there
    if (searchParams.get('from') === 'light') {
      router.push('/provider-lightmode/patients');
    } else {
      router.push('/provider/patients');
    }
  };

  const handleOpenAreaAnalysis = (area: string) => {
    console.log("Open area analysis:", area);
  };

  if (!patient) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Patient not found</p>
        </div>
      </div>
    );
  }

  return (
    <LightThemeWrapper>
      <PatientDetailScreenV2Refactored
        patient={patient as any}
        onBack={handleBack}
        onOpenAreaAnalysis={handleOpenAreaAnalysis}
      />
    </LightThemeWrapper>
  );
}
