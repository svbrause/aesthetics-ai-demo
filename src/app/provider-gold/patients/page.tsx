"use client";

import { PatientManagementScreenGold } from "@/components/provider/PatientManagementScreenGold";
import { useRouter } from "next/navigation";
import { useGoldTheme } from "@/hooks/useGoldTheme";

export default function ProviderGoldPatientsPage() {
  const router = useRouter();

  // Apply gold theme
  useGoldTheme();

  const handleBack = () => {
    router.push("/provider-gold");
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

  return (
    <div className="gold-theme">
      <PatientManagementScreenGold
        onBack={handleBack}
        onSelectPatient={handleSelectPatient}
      />
    </div>
  );
}
