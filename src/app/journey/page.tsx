"use client";

import { JourneyScreen } from "@/components/JourneyScreen";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserAnswers } from "@/types";

export default function JourneyPage() {
  const router = useRouter();
  const [userAnswers, setUserAnswers] = useState<UserAnswers>(
    {} as UserAnswers
  );

  useEffect(() => {
    // Get user answers from localStorage
    const answers = localStorage.getItem("userAnswers");
    if (answers) {
      try {
        setUserAnswers(JSON.parse(answers));
      } catch (error) {
        console.error("Error parsing user answers:", error);
        router.push("/questionnaire");
      }
    } else {
      router.push("/questionnaire");
    }
  }, [router]);

  const handleViewValue = () => {
    router.push("/value");
  };

  return (
    <JourneyScreen userAnswers={userAnswers} onViewValue={handleViewValue} />
  );
}
