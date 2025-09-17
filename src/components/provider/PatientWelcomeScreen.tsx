"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Eye,
  Star,
  Sparkles,
  Target,
  Play,
  RotateCcw,
  Calendar,
  MessageCircle,
  Download,
  Share,
} from "lucide-react";

interface PatientWelcomeScreenProps {
  patient: any;
  onStartAnalysis: () => void;
  onBack: () => void;
}

export function PatientWelcomeScreen({
  patient,
  onStartAnalysis,
  onBack,
}: PatientWelcomeScreenProps) {
  const [isSideView, setIsSideView] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  if (!patient) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400">No patient selected</p>
      </div>
    );
  }

  const getReviewStatus = () => {
    switch (patient.reviewStatus) {
      case "patient-reviewed":
        return {
          text: "Patient Reviewed",
          color: "text-green-400",
          bg: "bg-green-500/20",
          border: "border-green-500/50",
          icon: <CheckCircle className="w-5 h-5" />,
        };
      case "provider-only":
        return {
          text: "Provider Only",
          color: "text-yellow-400",
          bg: "bg-yellow-500/20",
          border: "border-yellow-500/50",
          icon: <Clock className="w-5 h-5" />,
        };
      case "joint-review":
        return {
          text: "Joint Review",
          color: "text-blue-400",
          bg: "bg-blue-500/20",
          border: "border-blue-500/50",
          icon: <MessageCircle className="w-5 h-5" />,
        };
      default:
        return {
          text: "Pending Review",
          color: "text-gray-400",
          bg: "bg-gray-500/20",
          border: "border-gray-500/50",
          icon: <Clock className="w-5 h-5" />,
        };
    }
  };

  const reviewStatus = getReviewStatus();

  const handleStartAnalysis = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      onStartAnalysis();
    }, 2000);
  };

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black flex flex-col h-screen overflow-hidden">
      {/* Header - Minimal */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-4 border-b border-gray-800/50"
      >
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-gray-400 hover:text-white"
          >
            <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
            Back to Patients
          </Button>
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Download className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Share className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-6xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Patient Images */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Large Patient Image */}
              <div className="relative">
                <motion.div
                  key={isSideView ? "side" : "front"}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full h-96 lg:h-[500px] rounded-3xl overflow-hidden group"
                >
                  <img
                    src={isSideView ? patient.sideImage : patient.frontImage}
                    alt={`${patient.name} ${
                      isSideView ? "side" : "front"
                    } view`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />

                  {/* Glowing border effect */}
                  <div
                    className={`absolute inset-0 rounded-3xl ${
                      isSideView
                        ? "bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20"
                        : "bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-blue-500/20"
                    }`}
                  />

                  {/* View indicator */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className={`absolute bottom-6 left-6 px-4 py-2 rounded-full backdrop-blur-md ${
                      isSideView
                        ? "bg-purple-500/30 border border-purple-400/50"
                        : "bg-blue-500/30 border border-blue-400/50"
                    }`}
                  >
                    <span className="text-white font-medium text-sm">
                      {isSideView ? "Side View" : "Front View"}
                    </span>
                  </motion.div>

                  {/* Analysis indicator */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
                    className="absolute top-6 right-6"
                  >
                    <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50" />
                  </motion.div>
                </motion.div>

                {/* View Toggle Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex justify-center mt-6"
                >
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setIsSideView(!isSideView)}
                    className="backdrop-blur-md bg-white/10 border-white/20 hover:bg-white/20 text-white"
                  >
                    <RotateCcw className="w-5 h-5 mr-2" />
                    Switch to {isSideView ? "Front" : "Side"} View
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Side - Patient Info and Actions */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              {/* Patient Header */}
              <div className="text-center lg:text-left">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-gray-100 to-gray-300 bg-clip-text text-transparent mb-4"
                >
                  {patient.name}
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="space-y-2"
                >
                  <p className="text-xl text-gray-300">
                    {patient.age} years old • Patient ID #{patient.id}
                  </p>
                  <p className="text-lg text-gray-400">
                    Provider: {patient.provider || "Dr. Smith"}
                  </p>
                </motion.div>
              </div>

              {/* Review Status */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex justify-center lg:justify-start"
              >
                <Card
                  className={`p-4 ${reviewStatus.bg} ${reviewStatus.border} border backdrop-blur-md`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={reviewStatus.color}>
                      {reviewStatus.icon}
                    </div>
                    <div>
                      <p className={`font-semibold ${reviewStatus.color}`}>
                        {reviewStatus.text}
                      </p>
                      <p className="text-sm text-gray-400">
                        Last updated: {patient.lastAnalysis || "2 hours ago"}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>

              {/* Analysis Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="grid grid-cols-2 gap-4"
              >
                <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/20 backdrop-blur-md">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">
                      {patient.score}%
                    </div>
                    <div className="text-sm text-gray-400">Overall Score</div>
                  </div>
                </Card>
                <Card className="p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 backdrop-blur-md">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-white mb-1">
                      {patient.findings?.length || 0}
                    </div>
                    <div className="text-sm text-gray-400">Findings</div>
                  </div>
                </Card>
              </motion.div>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="space-y-4"
              >
                <Button
                  size="lg"
                  onClick={handleStartAnalysis}
                  disabled={isAnalyzing}
                  className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white text-lg py-4 rounded-2xl shadow-2xl shadow-blue-500/25"
                >
                  {isAnalyzing ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full mr-3"
                    />
                  ) : (
                    <Play className="w-6 h-6 mr-3" />
                  )}
                  {isAnalyzing ? "Analyzing..." : "Begin Analysis Review"}
                </Button>

                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    className="backdrop-blur-md bg-white/10 border-white/20 hover:bg-white/20 text-white rounded-2xl"
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="backdrop-blur-md bg-white/10 border-white/20 hover:bg-white/20 text-white rounded-2xl"
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Message
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}



