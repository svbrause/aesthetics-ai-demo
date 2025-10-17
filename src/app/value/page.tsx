"use client";

import { ValueScreen } from "@/components/ValueScreen";
import { useRouter } from "next/navigation";

export default function ValuePage() {
  const router = useRouter();

  const handleRestart = () => {
    // Clear all stored data
    localStorage.removeItem("selectedPatient");
    localStorage.removeItem("userPhoto");
    localStorage.removeItem("userAnswers");
    router.push("/");
  };

  return <ValueScreen onRestart={handleRestart} />;
}
