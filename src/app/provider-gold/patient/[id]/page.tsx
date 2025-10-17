"use client";

import { PatientDetailScreenV2RefactoredGold } from "@/components/provider/PatientDetailScreenV2RefactoredGold";
import { useRouter } from "next/navigation";
import { useGoldTheme } from "@/hooks/useGoldTheme";

// Mock patient data - same as the original
const mockPatient = {
  id: "1001",
  name: "Sydney Adams",
  age: 28,
  email: "sydney.adams@email.com",
  phone: "(555) 123-4567",
  lastVisit: "2024-01-15",
  status: "active" as const,
  score: 78,
  color: "blue" as const,
  findings: [
    { name: "Forehead Wrinkles", severity: "moderate" as const, score: 70 },
    { name: "Dark Spots", severity: "mild" as const, score: 25 },
    { name: "Nasolabial Folds", severity: "severe" as const, score: 85 },
    { name: "Marionette Lines", severity: "moderate" as const, score: 72 },
    { name: "Red Spots", severity: "mild" as const, score: 30 },
    { name: "Whiteheads", severity: "mild" as const, score: 45 },
    { name: "Temporal Hollow", severity: "severe" as const, score: 88 },
    { name: "Under Eye Hollow", severity: "moderate" as const, score: 70 },
    { name: "Upper Eye Hollow", severity: "mild" as const, score: 35 },
    { name: "Lower Eyelid Sag", severity: "mild" as const, score: 50 },
    { name: "Mid Cheek Flattening", severity: "severe" as const, score: 82 },
    { name: "Crooked Nose", severity: "mild" as const, score: 28 },
    { name: "Dorsal Hump", severity: "mild" as const, score: 40 },
    { name: "Dry Lips", severity: "mild" as const, score: 32 },
    {
      name: "Excess/Submental Fullness",
      severity: "moderate" as const,
      score: 68,
    },
    { name: "Prejowl Sulcus", severity: "severe" as const, score: 90 },
    { name: "Retruded Chin", severity: "moderate" as const, score: 72 },
    { name: "Masseter Hypertrophy", severity: "mild" as const, score: 38 },
  ],
  frontImage: "/Sydney Adams Front.png",
  sideImage: "/Sydney Adams Side.png",
  scanDate: "December 15, 2024",
};

export default function ProviderGoldPatientPage() {
  const router = useRouter();

  // Apply gold theme
  useGoldTheme();

  const handleBack = () => {
    router.push("/provider-gold/patients");
  };

  const handleOpenAreaAnalysis = (area: string) => {
    console.log("Open area analysis:", area);
  };

  return (
    <div className="gold-theme">
      <PatientDetailScreenV2RefactoredGold
        patient={mockPatient}
        onBack={handleBack}
        onOpenAreaAnalysis={handleOpenAreaAnalysis}
      />
    </div>
  );
}
