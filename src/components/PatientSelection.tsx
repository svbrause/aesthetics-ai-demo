"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ArrowRight, User, Star, Shield, Target } from "lucide-react";

interface PatientSelectionProps {
  onPatientSelect: (patient: "sydney" | "chelsea") => void;
}

const patients = {
  sydney: {
    name: "Sydney Adams",
    age: 32,
    profession: "Marketing Professional",
    profile: "Conservative Explorer",
    description:
      "Early intervention candidate focused on preventive care and natural enhancement",
    concerns: [
      "Mid cheek flattening",
      "Temporal hollow",
      "Under-eye hollow",
      "Dark spots",
    ],
    score: 78,
    color: "blue",
    frontImage: "/Sydney Adams Front.jpg",
    sideImage: "/Sydney Adams Side.jpg",
    analysis: {
      facialStructure: 78,
      skinQuality: 82,
      preventativeCare: 75,
    },
  },
  chelsea: {
    name: "Chelsea Perry",
    age: 42,
    profession: "Executive",
    profile: "Experienced Optimizer",
    description:
      "Comprehensive rejuvenation candidate seeking dramatic improvement",
    concerns: [
      "Jowls",
      "Ill-defined jawline",
      "Excess submental fullness",
      "Advanced aging",
    ],
    score: 62,
    color: "purple",
    frontImage: "/Chelsea Perry Front.jpg",
    sideImage: "/Chelsea Perry Side.jpg",
    analysis: {
      facialStructure: 62,
      skinQuality: 68,
      preventativeCare: 55,
    },
  },
};

export function PatientSelection({ onPatientSelect }: PatientSelectionProps) {
  const [selectedPatient, setSelectedPatient] = useState<
    "sydney" | "chelsea" | null
  >(null);

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return {
          gradient: "from-blue-600 to-blue-800",
          bg: "bg-blue-600/20",
          border: "border-blue-500/50",
          text: "text-blue-400",
        };
      case "purple":
        return {
          gradient: "from-purple-600 to-purple-800",
          bg: "bg-purple-600/20",
          border: "border-purple-500/50",
          text: "text-purple-400",
        };
      default:
        return {
          gradient: "from-blue-600 to-blue-800",
          bg: "bg-blue-600/20",
          border: "border-blue-500/50",
          text: "text-blue-400",
        };
    }
  };

  const handleSelect = (patient: "sydney" | "chelsea") => {
    setSelectedPatient(patient);
    setTimeout(() => {
      onPatientSelect(patient);
    }, 500);
  };

  return (
    <div
      className="bg-gradient-to-br from-black via-gray-900 to-black flex flex-col h-screen overflow-hidden"
      style={{
        height: "100dvh",
        minHeight: "100dvh",
        maxHeight: "100dvh",
      }}
    >
      {/* Header - Compact */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center p-4 pb-2"
      >
        <h1 className="text-2xl font-bold mb-1 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Select Your Demo Patient
        </h1>
        <p className="text-gray-400 text-xs">
          Choose a patient profile to experience our AI analysis
        </p>
      </motion.div>

      {/* Patient Cards - Horizontal Layout */}
      <div className="flex-1 flex flex-col gap-3 px-4 overflow-y-auto">
        {Object.entries(patients).map(([key, patient]) => {
          const colorClasses = getColorClasses(patient.color);
          const isSelected = selectedPatient === key;

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: key === "sydney" ? 0.1 : 0.2 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <Card
                className={`p-4 cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? `${colorClasses.bg} ${colorClasses.border} border-2 shadow-lg`
                    : "bg-gray-800/50 border-gray-700 hover:border-gray-600"
                }`}
                onClick={() => handleSelect(key as "sydney" | "chelsea")}
              >
                <div className="flex items-center space-x-3">
                  {/* Patient Photos - Smaller */}
                  <div className="flex space-x-1.5">
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                      <img
                        src={patient.frontImage}
                        alt={`${patient.name} front view`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 border border-white/20 rounded-lg" />
                    </div>
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden">
                      <img
                        src={patient.sideImage}
                        alt={`${patient.name} side view`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 border border-white/20 rounded-lg" />
                    </div>
                  </div>

                  {/* Patient Info - Compact */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-bold text-white truncate">
                        {patient.name}
                      </h3>
                      <div className="text-right flex-shrink-0 ml-2">
                        <div
                          className={`text-xl font-bold ${colorClasses.text}`}
                        >
                          {patient.score}%
                        </div>
                        <div className="text-xs text-gray-400">Score</div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-xs text-gray-400">
                        {patient.age}y • {patient.profession}
                      </span>
                    </div>

                    <div className="mb-2">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${colorClasses.bg} ${colorClasses.text}`}
                      >
                        {patient.profile}
                      </span>
                    </div>

                    <p className="text-gray-300 text-xs mb-2 line-clamp-2">
                      {patient.description}
                    </p>

                    {/* Key Concerns - Compact */}
                    <div className="mb-2">
                      <div className="flex flex-wrap gap-1">
                        {patient.concerns.slice(0, 3).map((concern, index) => (
                          <span
                            key={index}
                            className="px-1.5 py-0.5 bg-gray-700/50 text-gray-300 text-xs rounded"
                          >
                            {concern}
                          </span>
                        ))}
                        {patient.concerns.length > 3 && (
                          <span className="px-1.5 py-0.5 bg-gray-700/50 text-gray-300 text-xs rounded">
                            +{patient.concerns.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Analysis Breakdown - Compact */}
                    <div className="grid grid-cols-3 gap-1 text-center">
                      <div>
                        <div className="text-xs text-gray-400 mb-0.5">
                          Structure
                        </div>
                        <div
                          className={`text-sm font-bold ${colorClasses.text}`}
                        >
                          {patient.analysis.facialStructure}%
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-0.5">Skin</div>
                        <div
                          className={`text-sm font-bold ${colorClasses.text}`}
                        >
                          {patient.analysis.skinQuality}%
                        </div>
                      </div>
                      <div>
                        <div className="text-xs text-gray-400 mb-0.5">Care</div>
                        <div
                          className={`text-sm font-bold ${colorClasses.text}`}
                        >
                          {patient.analysis.preventativeCare}%
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Selection Indicator */}
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0"
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
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Continue Button - Fixed at bottom */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="p-4 pt-2"
      >
        <Button
          onClick={() => selectedPatient && onPatientSelect(selectedPatient)}
          disabled={!selectedPatient}
          size="lg"
          className="group bg-white text-black hover:bg-gray-100 text-sm px-6 py-2.5 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed w-full"
        >
          <span className="flex items-center justify-center gap-2">
            Continue with{" "}
            {selectedPatient ? patients[selectedPatient].name : "Patient"}
            <motion.div className="group-hover:translate-x-1 transition-transform duration-300">
              <ArrowRight className="w-4 h-4" />
            </motion.div>
          </span>
        </Button>
      </motion.div>
    </div>
  );
}
