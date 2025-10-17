"use client";

import { ProviderDashboardGold } from "@/components/provider/ProviderDashboardGold";
import { TutorialOverlay } from "@/components/TutorialOverlay";
import { useRouter } from "next/navigation";
import { useGoldTheme } from "@/hooks/useGoldTheme";

export default function ProviderGoldPage() {
  const router = useRouter();

  // Apply gold theme
  useGoldTheme();

  const handleViewPatients = () => {
    router.push("/provider-gold/patients");
  };

  const handleViewAnalysisTools = () => {
    router.push("/provider-gold/analysis-tools");
  };

  const handleSelectPatient = (patient: any) => {
    // Always use patient ID for HIPAA compliance
    if (patient.id) {
      router.push(`/provider-gold/patient/${patient.id}`);
    } else {
      console.error("Patient ID not found for patient:", patient);
      // Fallback to patients list if no ID
      router.push("/provider-gold/patients");
    }
  };

  const handleNewPatientScan = () => {
    router.push("/provider-gold/upload");
  };

  const handleQuickAnalysis = () => {
    router.push("/provider-gold/quick-analysis");
  };

  const handleAddPatientDirect = () => {
    router.push("/provider-gold/add-patient-direct");
  };

  return (
    <div className="gold-theme">
      <ProviderDashboardGold
        onViewPatients={handleViewPatients}
        onViewAnalysisTools={handleViewAnalysisTools}
        onSelectPatient={handleSelectPatient}
        onNewPatientScan={handleNewPatientScan}
        onQuickAnalysis={handleQuickAnalysis}
        onAddPatientDirect={handleAddPatientDirect}
      />
      <TutorialOverlay />
    </div>
  );
}
