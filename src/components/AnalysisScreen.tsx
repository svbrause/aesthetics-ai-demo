"use client";

import { useState, useEffect } from "react";
import { AnalysisLoadingState } from "./AnalysisLoadingState";
import { AnalysisResultsScreen } from "./AnalysisResultsScreen";
import {
  analysisSteps,
  progressMessages,
  analysisCategories,
} from "@/data/analysisConstants";

interface AnalysisScreenProps {
  photoUrl: string;
  onComplete: () => void;
  onViewJourney: () => void;
  showResults?: boolean;
  selectedCategory?: string;
}

export function AnalysisScreen({
  photoUrl,
  onComplete,
  onViewJourney,
  showResults = false,
  selectedCategory,
}: AnalysisScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [currentMessage, setCurrentMessage] = useState(progressMessages[0]);
  const [isComplete, setIsComplete] = useState(false);
  const [heartedTreatments, setHeartedTreatments] = useState<Set<string>>(
    new Set()
  );

  // Filter categories based on selectedCategory prop
  const filteredCategories = selectedCategory
    ? analysisCategories.filter((cat) => cat.id === selectedCategory)
    : analysisCategories;

  const toggleHeart = (treatmentId: string) => {
    setHeartedTreatments((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(treatmentId)) {
        newSet.delete(treatmentId);
      } else {
        newSet.add(treatmentId);
      }
      return newSet;
    });
  };

  useEffect(() => {
    if (showResults) {
      setIsComplete(true);
      setProgress(100);
      return;
    }

    let stepIndex = 0;
    let messageIndex = 0;
    const totalSteps = analysisSteps.length;
    const totalMessages = progressMessages.length;

    const runAnalysis = () => {
      const step = analysisSteps[stepIndex];
      if (!step) {
        setIsComplete(true);
        setTimeout(() => {
          onComplete();
        }, 1000);
        return;
      }

      setCurrentStep(stepIndex);

      // Update progress message
      const messageInterval = setInterval(() => {
        if (messageIndex < totalMessages - 1) {
          messageIndex++;
          setCurrentMessage(progressMessages[messageIndex]);
        }
      }, step.duration / 3);

      // Update progress bar
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 100 / (step.duration / 100);
          return newProgress >= 100 ? 100 : newProgress;
        });
      }, 100);

      setTimeout(() => {
        clearInterval(messageInterval);
        clearInterval(progressInterval);
        stepIndex++;
        runAnalysis();
      }, step.duration);
    };

    runAnalysis();
  }, [showResults, onComplete]);

  if (!showResults) {
    return (
      <AnalysisLoadingState
        photoUrl={photoUrl}
        currentStep={currentStep}
        progress={progress}
        currentMessage={currentMessage}
        isComplete={isComplete}
      />
    );
  }

  return (
    <AnalysisResultsScreen
      photoUrl={photoUrl}
      onComplete={onComplete}
      filteredCategories={filteredCategories}
      heartedTreatments={heartedTreatments}
      onToggleHeart={toggleHeart}
    />
  );
}
