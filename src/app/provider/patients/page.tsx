"use client";

import { PatientManagementScreen } from "@/components/provider/PatientManagementScreen";
import { useRouter } from "next/navigation";

export default function ProviderPatientsPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/provider");
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

  return (
    <PatientManagementScreen
      onBack={handleBack}
      onSelectPatient={handleSelectPatient}
    />
  );
}
