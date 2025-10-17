"use client";

import { ProviderDashboard } from "@/components/provider/ProviderDashboard";
import { TutorialOverlay } from "@/components/TutorialOverlay";
import { useRouter } from "next/navigation";

export default function ProviderPage() {
  const router = useRouter();

  const handleViewPatients = () => {
    router.push("/provider/patients");
  };

  const handleViewAnalysisTools = () => {
    router.push("/provider/analysis-tools");
  };

  const handleSelectPatient = (patient: any) => {
    // Always use patient ID for HIPAA compliance
    if (patient.id) {
      router.push(`/provider/patient/${patient.id}`);
    } else {
      console.error("Patient ID not found for patient:", patient);
      // Fallback to patients list if no ID
      router.push("/provider/patients");
    }
  };

  const handleNewPatientScan = () => {
    router.push("/provider/upload");
  };

  const handleQuickAnalysis = () => {
    router.push("/provider/quick-analysis");
  };

  const handleAddPatientDirect = () => {
    router.push("/provider/add-patient-direct");
  };

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--text-primary)",
      }}
    >
      <ProviderDashboard
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
