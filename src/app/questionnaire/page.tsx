"use client";

import { Questionnaire } from "@/components/Questionnaire";
import { useRouter } from "next/navigation";
import { UserAnswers } from "@/types";

export default function QuestionnairePage() {
  const router = useRouter();

  const handleQuestionnaireComplete = (answers: UserAnswers) => {
    // Store answers in localStorage for persistence
    localStorage.setItem("userAnswers", JSON.stringify(answers));
    router.push("/analysis");
  };

  return <Questionnaire onComplete={handleQuestionnaireComplete} />;
}
