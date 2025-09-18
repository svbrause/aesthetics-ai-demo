"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { X, ArrowLeft, ArrowRight } from "lucide-react";

interface PatientQuestionnaireProps {
  isOpen: boolean;
  onClose: () => void;
  patientName: string;
}

interface QuestionnaireAnswers {
  focusArea: string;
  skinConcerns?: string[];
  aestheticGoal: string;
  journeyStage: string;
  skincareRegimen?: string;
}

export function PatientQuestionnaire({
  isOpen,
  onClose,
  patientName,
}: PatientQuestionnaireProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<QuestionnaireAnswers>({
    focusArea: "",
    skinConcerns: [],
    aestheticGoal: "",
    journeyStage: "",
    skincareRegimen: "",
  });

  const totalSteps = 3;

  const focusAreas = [
    "Skin (Texture, tone, overall health)",
    "Eyes (Crow's feet, under-eye, brow position)",
    "Lips (Volume, definition, symmetry)",
    "Jawline (Definition, contour, structure)",
    "Neck (Contour, structure)",
  ];

  const skinConcerns = [
    "Acne/Redness",
    "Sun Damage/Dark Spots",
    "Wrinkles",
    "Laxity",
    "Dry",
    "Oily",
  ];

  const aestheticGoals = [
    "Look More Youthful (Reduce aging signs)",
    "Enhance Balance (Facial harmony)",
    "Healthier Skin (Address concerns)",
    "Prevention and Maintenance (slow the progression of aging)",
    "More Defined (Sculpted features)",
  ];

  const journeyStages = [
    "Just Exploring (New to treatments)",
    "Skincare Only (Familiar with skincare)",
    "Used Injectables (Experience with procedures)",
    "Considered Surgery (Open to all options)",
  ];

  const skincareRegimens = [
    "Basic (Cleanser + Moisturizer)",
    "Moderate (Cleanser + Serum + Moisturizer + SPF)",
    "Advanced (Multiple serums + Treatments + SPF)",
    "Professional (Prescription + Professional treatments)",
    "Minimal (Occasional skincare)",
  ];

  const handleAnswerChange = (
    question: keyof QuestionnaireAnswers,
    value: string
  ) => {
    setAnswers((prev) => ({
      ...prev,
      [question]: value,
    }));
  };

  const handleSkinConcernToggle = (concern: string) => {
    setAnswers((prev) => ({
      ...prev,
      skinConcerns: prev.skinConcerns?.includes(concern)
        ? prev.skinConcerns.filter((c) => c !== concern)
        : [...(prev.skinConcerns || []), concern],
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    } else {
      // Submit questionnaire
      console.log("Questionnaire answers:", answers);
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return (
          answers.focusArea !== "" &&
          (answers.focusArea !== "Skin (Texture, tone, overall health)" ||
            (answers.skinConcerns && answers.skinConcerns.length > 0))
        );
      case 2:
        return answers.aestheticGoal !== "";
      case 3:
        return (
          answers.journeyStage !== "" &&
          (answers.journeyStage === "Just Exploring (New to treatments)" ||
            answers.skincareRegimen !== "")
        );
      default:
        return false;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Patient Questionnaire
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mt-1">
                  {patientName} - Step {currentStep} of {totalSteps}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Progress Bar */}
            <div className="mt-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh]">
            <AnimatePresence mode="wait">
              {/* Step 1: Focus Area */}
              {currentStep === 1 && (
                <motion.div
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Question 1: Focus Area
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      What area would you like to focus on for this patient?
                    </p>

                    <div className="space-y-3">
                      {focusAreas.map((area) => (
                        <Card
                          key={area}
                          className={`p-4 cursor-pointer transition-all duration-200 ${
                            answers.focusArea === area
                              ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20"
                              : "hover:bg-gray-50 dark:hover:bg-gray-800"
                          }`}
                          onClick={() => handleAnswerChange("focusArea", area)}
                        >
                          <div className="flex items-center">
                            <div
                              className={`w-4 h-4 rounded-full border-2 mr-3 ${
                                answers.focusArea === area
                                  ? "border-blue-500 bg-blue-500"
                                  : "border-gray-300 dark:border-gray-600"
                              }`}
                            >
                              {answers.focusArea === area && (
                                <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                              )}
                            </div>
                            <span className="text-gray-900 dark:text-white">
                              {area}
                            </span>
                          </div>
                        </Card>
                      ))}
                    </div>

                    {/* Skin Concerns - only show if Skin is selected */}
                    {answers.focusArea ===
                      "Skin (Texture, tone, overall health)" && (
                      <div className="mt-6">
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                          Question 1a: What are your skin concerns?
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Select all that apply:
                        </p>

                        <div className="grid grid-cols-2 gap-3">
                          {skinConcerns.map((concern) => (
                            <Card
                              key={concern}
                              className={`p-3 cursor-pointer transition-all duration-200 ${
                                answers.skinConcerns?.includes(concern)
                                  ? "ring-2 ring-green-500 bg-green-50 dark:bg-green-900/20"
                                  : "hover:bg-gray-50 dark:hover:bg-gray-800"
                              }`}
                              onClick={() => handleSkinConcernToggle(concern)}
                            >
                              <div className="flex items-center">
                                <div
                                  className={`w-4 h-4 rounded border mr-3 ${
                                    answers.skinConcerns?.includes(concern)
                                      ? "border-green-500 bg-green-500"
                                      : "border-gray-300 dark:border-gray-600"
                                  }`}
                                >
                                  {answers.skinConcerns?.includes(concern) && (
                                    <div className="w-2 h-2 bg-white rounded-sm m-0.5" />
                                  )}
                                </div>
                                <span className="text-sm text-gray-900 dark:text-white">
                                  {concern}
                                </span>
                              </div>
                            </Card>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Aesthetic Goal */}
              {currentStep === 2 && (
                <motion.div
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Question 2: Aesthetic Goal
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      What is the primary aesthetic goal for this patient?
                    </p>

                    <div className="space-y-3">
                      {aestheticGoals.map((goal) => (
                        <Card
                          key={goal}
                          className={`p-4 cursor-pointer transition-all duration-200 ${
                            answers.aestheticGoal === goal
                              ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20"
                              : "hover:bg-gray-50 dark:hover:bg-gray-800"
                          }`}
                          onClick={() =>
                            handleAnswerChange("aestheticGoal", goal)
                          }
                        >
                          <div className="flex items-center">
                            <div
                              className={`w-4 h-4 rounded-full border-2 mr-3 ${
                                answers.aestheticGoal === goal
                                  ? "border-blue-500 bg-blue-500"
                                  : "border-gray-300 dark:border-gray-600"
                              }`}
                            >
                              {answers.aestheticGoal === goal && (
                                <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                              )}
                            </div>
                            <span className="text-gray-900 dark:text-white">
                              {goal}
                            </span>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Journey Stage */}
              {currentStep === 3 && (
                <motion.div
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                      Question 3: Journey Stage
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      What stage is this patient at in their aesthetic journey?
                    </p>

                    <div className="space-y-3">
                      {journeyStages.map((stage) => (
                        <Card
                          key={stage}
                          className={`p-4 cursor-pointer transition-all duration-200 ${
                            answers.journeyStage === stage
                              ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20"
                              : "hover:bg-gray-50 dark:hover:bg-gray-800"
                          }`}
                          onClick={() =>
                            handleAnswerChange("journeyStage", stage)
                          }
                        >
                          <div className="flex items-center">
                            <div
                              className={`w-4 h-4 rounded-full border-2 mr-3 ${
                                answers.journeyStage === stage
                                  ? "border-blue-500 bg-blue-500"
                                  : "border-gray-300 dark:border-gray-600"
                              }`}
                            >
                              {answers.journeyStage === stage && (
                                <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                              )}
                            </div>
                            <span className="text-gray-900 dark:text-white">
                              {stage}
                            </span>
                          </div>
                        </Card>
                      ))}
                    </div>

                    {/* Skincare Regimen - only show if not "Just Exploring" */}
                    {answers.journeyStage &&
                      answers.journeyStage !==
                        "Just Exploring (New to treatments)" && (
                        <div className="mt-6">
                          <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                            Question 3a: What is your skincare regimen?
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 mb-4">
                            Select the option that best describes their current
                            routine:
                          </p>

                          <div className="space-y-3">
                            {skincareRegimens.map((regimen) => (
                              <Card
                                key={regimen}
                                className={`p-4 cursor-pointer transition-all duration-200 ${
                                  answers.skincareRegimen === regimen
                                    ? "ring-2 ring-green-500 bg-green-50 dark:bg-green-900/20"
                                    : "hover:bg-gray-50 dark:hover:bg-gray-800"
                                }`}
                                onClick={() =>
                                  handleAnswerChange("skincareRegimen", regimen)
                                }
                              >
                                <div className="flex items-center">
                                  <div
                                    className={`w-4 h-4 rounded-full border-2 mr-3 ${
                                      answers.skincareRegimen === regimen
                                        ? "border-green-500 bg-green-500"
                                        : "border-gray-300 dark:border-gray-600"
                                    }`}
                                  >
                                    {answers.skincareRegimen === regimen && (
                                      <div className="w-2 h-2 bg-white rounded-full m-0.5" />
                                    )}
                                  </div>
                                  <span className="text-gray-900 dark:text-white">
                                    {regimen}
                                  </span>
                                </div>
                              </Card>
                            ))}
                          </div>
                        </div>
                      )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-between">
            <Button
              variant="ghost"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className="flex items-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>

            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
            >
              {currentStep === totalSteps ? "Complete" : "Next"}
              {currentStep < totalSteps && (
                <ArrowRight className="w-4 h-4 ml-2" />
              )}
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
