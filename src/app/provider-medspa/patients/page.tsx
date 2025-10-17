"use client";

import { PatientManagementScreenMedspa } from "@/components/provider/PatientManagementScreenMedspa";
import { useRouter } from "next/navigation";
import { useMedspaTheme } from "@/hooks/useMedspaTheme";

export default function ProviderMedspaPatientsPage() {
  const router = useRouter();

  // Apply medspa theme
  useMedspaTheme();

  const handleBack = () => {
    router.push("/provider-medspa");
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

  return (
    <div className="medspa-theme">
      <PatientManagementScreenMedspa
        onBack={handleBack}
        onSelectPatient={handleSelectPatient}
      />
    </div>
  );
}

