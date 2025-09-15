"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Question, QuestionOption, UserAnswers } from "@/types";
import {
  Sparkles,
  Eye,
  Heart,
  Bone,
  Star,
  Scale,
  Leaf,
  Gem,
  Search,
  Droplets,
  Syringe,
  Building2,
} from "lucide-react";

interface QuestionnaireProps {
  onComplete: (answers: UserAnswers) => void;
}

const questions: Question[] = [
  {
    key: "focusArea",
    title: "Which area are you most curious to improve?",
    options: [
      {
        value: "Skin",
        icon: <Sparkles className="w-6 h-6" />,
        description: "Texture, tone, and overall skin health",
      },
      {
        value: "Eyes",
        icon: <Eye className="w-6 h-6" />,
        description: "Crow's feet, under-eye area, and brow position",
      },
      {
        value: "Lips",
        icon: <Heart className="w-6 h-6" />,
        description: "Volume, definition, and symmetry",
      },
      {
        value: "Jawline",
        icon: <Bone className="w-6 h-6" />,
        description: "Definition, contour, and lower face structure",
      },
      {
        value: "Neck",
        icon: <Scale className="w-6 h-6" />,
        description: "Contour, structure, and definition",
      },
    ],
  },
  {
    key: "skinConcerns",
    title: "What are your main skin concerns?",
    options: [
      {
        value: "Acne/Redness",
        icon: <Droplets className="w-6 h-6" />,
        description: "Breakouts, inflammation, and redness",
      },
      {
        value: "Sun Damage/Dark Spots",
        icon: <Star className="w-6 h-6" />,
        description: "Hyperpigmentation and sun damage",
      },
      {
        value: "Wrinkles",
        icon: <Eye className="w-6 h-6" />,
        description: "Fine lines and expression lines",
      },
      {
        value: "Laxity",
        icon: <Bone className="w-6 h-6" />,
        description: "Loss of firmness and elasticity",
      },
      {
        value: "Dry",
        icon: <Leaf className="w-6 h-6" />,
        description: "Dehydration and dry patches",
      },
      {
        value: "Oily",
        icon: <Droplets className="w-6 h-6" />,
        description: "Excess oil production and shine",
      },
    ],
  },
  {
    key: "goal",
    title: "What is your overall aesthetic goal?",
    options: [
      {
        value: "Look More Youthful",
        icon: <Star className="w-6 h-6" />,
        description: "Reduce signs of aging and restore vitality",
      },
      {
        value: "Enhance Balance",
        icon: <Scale className="w-6 h-6" />,
        description: "Improve facial harmony and proportions",
      },
      {
        value: "Healthier Skin",
        icon: <Leaf className="w-6 h-6" />,
        description: "Address skin concerns and improve texture",
      },
      {
        value: "Prevention and Maintenance",
        icon: <Gem className="w-6 h-6" />,
        description: "Slow the progression of aging",
      },
      {
        value: "More Defined",
        icon: <Bone className="w-6 h-6" />,
        description: "Create sharper, more sculpted features",
      },
    ],
  },
  {
    key: "journeyStage",
    title: "Where are you in your aesthetics journey?",
    options: [
      {
        value: "Just Exploring",
        icon: <Search className="w-6 h-6" />,
        description: "New to aesthetic treatments and consultations",
      },
      {
        value: "Skincare Only",
        icon: <Droplets className="w-6 h-6" />,
        description: "Familiar with skincare but new to procedures",
      },
      {
        value: "Used Injectables",
        icon: <Syringe className="w-6 h-6" />,
        description: "Have experience with injectable treatments",
      },
      {
        value: "Considered Surgery",
        icon: <Building2 className="w-6 h-6" />,
        description: "Open to surgical and non-surgical options",
      },
    ],
  },
  {
    key: "skincareRegimen",
    title: "What is your current skincare routine?",
    options: [
      {
        value: "Basic Cleanser Only",
        icon: <Droplets className="w-6 h-6" />,
        description: "Just cleanser, no other products",
      },
      {
        value: "Cleanser + Moisturizer",
        icon: <Leaf className="w-6 h-6" />,
        description: "Basic cleanser and moisturizer routine",
      },
      {
        value: "Cleanser + Moisturizer + SPF",
        icon: <Star className="w-6 h-6" />,
        description: "Basic routine with sun protection",
      },
      {
        value: "Anti-Aging Products",
        icon: <Gem className="w-6 h-6" />,
        description: "Includes retinol, vitamin C, or peptides",
      },
      {
        value: "Medical-Grade Skincare",
        icon: <Syringe className="w-6 h-6" />,
        description: "Prescription or professional products",
      },
      {
        value: "No Routine",
        icon: <Search className="w-6 h-6" />,
        description: "No consistent skincare routine",
      },
    ],
  },
];

export function Questionnaire({ onComplete }: QuestionnaireProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<UserAnswers>({} as UserAnswers);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedMultiple, setSelectedMultiple] = useState<string[]>([]);

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isMultipleChoice =
    currentQuestion.key === "skinConcerns" ||
    currentQuestion.key === "skincareRegimen";

  const handleOptionSelect = (option: QuestionOption) => {
    if (isMultipleChoice) {
      const newSelection = selectedMultiple.includes(option.value)
        ? selectedMultiple.filter((item) => item !== option.value)
        : [...selectedMultiple, option.value];

      setSelectedMultiple(newSelection);

      // Update answers
      const newAnswers = {
        ...answers,
        [currentQuestion.key]: newSelection,
      };
      setAnswers(newAnswers);
    } else {
      setSelectedOption(option.value);

      // Update answers
      const newAnswers = {
        ...answers,
        [currentQuestion.key]: option.value,
      };
      setAnswers(newAnswers);

      // Auto-advance after a short delay
      setTimeout(() => {
        if (isLastQuestion) {
          onComplete(newAnswers);
        } else {
          setCurrentQuestionIndex((prev) => prev + 1);
          setSelectedOption(null);
        }
      }, 500);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      onComplete(answers);
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setSelectedMultiple([]);
    }
  };

  const canProceed = isMultipleChoice
    ? selectedMultiple.length > 0
    : selectedOption !== null;

  return (
    <div
      className="bg-gradient-to-br from-black via-gray-900 to-black flex flex-col h-screen overflow-hidden p-4"
      style={{
        height: "100dvh",
        minHeight: "100dvh",
        maxHeight: "100dvh",
      }}
    >
      {/* Progress Indicator - Mobile Optimized */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-400">
            Question {currentQuestionIndex + 1} of {questions.length}
          </span>
          <span className="text-sm text-gray-400">
            {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
          </span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{
              width: `${
                ((currentQuestionIndex + 1) / questions.length) * 100
              }%`,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </motion.div>

      {/* Question - Mobile Optimized */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="text-center mb-6"
        >
          <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            {currentQuestion.title}
          </h2>
        </motion.div>
      </AnimatePresence>

      {/* Options - Mobile Optimized */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex-1 space-y-3 mb-6"
      >
        {currentQuestion.options.map((option, index) => (
          <motion.div
            key={option.value}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              onClick={() => handleOptionSelect(option)}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-300 text-left ${
                (
                  isMultipleChoice
                    ? selectedMultiple.includes(option.value)
                    : selectedOption === option.value
                )
                  ? "border-blue-500 bg-blue-500/20 shadow-lg shadow-blue-500/25"
                  : "border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:bg-gray-800/70"
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="text-blue-400 flex-shrink-0">{option.icon}</div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {option.value}
                  </h3>
                  <p className="text-gray-400 text-sm">{option.description}</p>
                </div>
                {(isMultipleChoice
                  ? selectedMultiple.includes(option.value)
                  : selectedOption === option.value) && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0"
                  >
                    <svg
                      className="w-4 h-4 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </motion.div>
                )}
              </div>
            </button>
          </motion.div>
        ))}
      </motion.div>

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex justify-center"
      >
        {isMultipleChoice ? (
          <Button
            onClick={handleNext}
            disabled={!canProceed}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50"
          >
            {isLastQuestion ? "Complete Analysis" : "Continue"}
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isLastQuestion ? "Complete Analysis" : "Next Question"}
          </Button>
        )}
      </motion.div>
    </div>
  );
}
