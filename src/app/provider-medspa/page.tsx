"use client";

import { ProviderDashboardMedspa } from "@/components/provider/ProviderDashboardMedspa";
import { TutorialOverlay } from "@/components/TutorialOverlay";
import { useRouter } from "next/navigation";
import { useMedspaTheme } from "@/hooks/useMedspaTheme";

export default function ProviderMedspaPage() {
  const router = useRouter();

  // Apply medspa theme
  useMedspaTheme();

  const handleViewPatients = () => {
    router.push("/provider-medspa/patients");
  };

  const handleViewAnalysisTools = () => {
    router.push("/provider-medspa/analysis-tools");
  };

  const handleSelectPatient = (patient: any) => {
    // Always use patient ID for HIPAA compliance
    if (patient.id) {
      router.push(`/provider-medspa/patient/${patient.id}`);
    } else {
      console.error("Patient ID not found for patient:", patient);
      // Fallback to patients list if no ID
      router.push("/provider-medspa/patients");
    }
  };

  const handleNewPatientScan = () => {
    router.push("/provider-medspa/upload");
  };

  const handleQuickAnalysis = () => {
    router.push("/provider-medspa/quick-analysis");
  };

  const handleAddPatientDirect = () => {
    router.push("/provider-medspa/add-patient-direct");
  };

  return (
    <div className="medspa-theme">
      <ProviderDashboardMedspa
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

