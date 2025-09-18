"use client";

import { PatientSelection } from "@/components/PatientSelection";
import { useRouter } from "next/navigation";
import { PatientType } from "@/types";

export default function PatientSelectionPage() {
  const router = useRouter();

  const handlePatientSelect = (patient: PatientType) => {
    // Store patient selection in localStorage for persistence
    localStorage.setItem("selectedPatient", patient);

    // Set the appropriate photo based on selected patient
    if (patient === "1001") {
      localStorage.setItem("userPhoto", "/Sydney Adams Front.png");
    } else {
      localStorage.setItem("userPhoto", "/Chelsea Perry Front.png");
    }

    router.push("/questionnaire");
  };

  return <PatientSelection onPatientSelect={handlePatientSelect} />;
}
