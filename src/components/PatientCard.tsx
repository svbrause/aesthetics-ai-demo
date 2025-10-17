import React from "react";
import { Patient, PatientColor, PatientStatus } from "../types/patientTypes";
import {
  Calendar,
  Phone,
  Mail,
  Star,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";

interface PatientCardProps {
  patient: Patient;
  onClick?: () => void;
  variant?: "default" | "compact" | "detailed";
  showActions?: boolean;
  onEdit?: (patient: Patient) => void;
  onDelete?: (patientId: string) => void;
  className?: string;
}

const colorVariants: Record<PatientColor, string> = {
  blue: "from-blue-500 to-blue-600",
  purple: "from-purple-500 to-purple-600",
  green: "from-green-500 to-green-600",
  red: "from-red-500 to-red-600",
  yellow: "from-yellow-500 to-yellow-600",
};

const statusIcons: Record<PatientStatus, React.ReactNode> = {
  active: <CheckCircle className="w-4 h-4 text-green-500" />,
  inactive: <AlertCircle className="w-4 h-4 text-gray-400" />,
  pending: <Clock className="w-4 h-4 text-yellow-500" />,
};

const statusColors: Record<PatientStatus, string> = {
  active: "bg-green-100 text-green-800 border-green-200",
  inactive: "bg-gray-100 text-gray-800 border-gray-200",
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
};

export function PatientCard({
  patient,
  onClick,
  variant = "default",
  showActions = false,
  onEdit,
  onDelete,
  className = "",
}: PatientCardProps) {
  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return "bg-green-100";
    if (score >= 60) return "bg-yellow-100";
    return "bg-red-100";
  };

  if (variant === "compact") {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`bg-white rounded-lg border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-all duration-200 ${className}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div
              className={`w-12 h-12 rounded-full bg-gradient-to-r ${
                colorVariants[patient.color]
              } flex items-center justify-center text-white font-semibold`}
            >
              {patient.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{patient.name}</h3>
              <p className="text-sm text-gray-500">Score: {patient.score}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {statusIcons[patient.status]}
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium border ${
                statusColors[patient.status]
              }`}
            >
              {patient.status}
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  if (variant === "detailed") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`bg-white rounded-xl border border-gray-200 p-6 cursor-pointer hover:shadow-lg transition-all duration-300 ${className}`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div
              className={`w-16 h-16 rounded-full bg-gradient-to-r ${
                colorVariants[patient.color]
              } flex items-center justify-center text-white font-bold text-lg`}
            >
              {patient.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {patient.name}
              </h3>
              <p className="text-gray-600">{patient.profession || "Patient"}</p>
              <p className="text-sm text-gray-500">Age {patient.age}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {statusIcons[patient.status]}
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium border ${
                statusColors[patient.status]
              }`}
            >
              {patient.status}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center space-x-2 text-gray-600">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">
              Last visit: {patient.lastVisit || "N/A"}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-gray-600">
            <Phone className="w-4 h-4" />
            <span className="text-sm">{patient.phone || "N/A"}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 text-yellow-500" />
            <span className="font-semibold text-gray-900">Overall Score</span>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-sm font-bold ${getScoreBackground(
              patient.score
            )} ${getScoreColor(patient.score)}`}
          >
            {patient.score}/100
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">
            Key Findings
          </h4>
          <div className="flex flex-wrap gap-1">
            {patient.findings.slice(0, 3).map((finding, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {typeof finding === "string" ? finding : finding.name}
              </span>
            ))}
            {patient.findings.length > 3 && (
              <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">
                +{patient.findings.length - 3} more
              </span>
            )}
          </div>
        </div>

        {showActions && (
          <div className="flex space-x-2 pt-4 border-t border-gray-200">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(patient);
              }}
              className="flex-1 px-3 py-2 bg-blue-500 text-white text-sm font-medium rounded-lg hover:bg-blue-600 transition-colors"
            >
              Edit
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(patient.id);
              }}
              className="flex-1 px-3 py-2 bg-red-500 text-white text-sm font-medium rounded-lg hover:bg-red-600 transition-colors"
            >
              Delete
            </button>
          </div>
        )}
      </motion.div>
    );
  }

  // Default variant
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`bg-white rounded-lg border border-gray-200 p-4 cursor-pointer hover:shadow-md transition-all duration-200 ${className}`}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div
            className={`w-12 h-12 rounded-full bg-gradient-to-r ${
              colorVariants[patient.color]
            } flex items-center justify-center text-white font-semibold`}
          >
            {patient.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{patient.name}</h3>
            <p className="text-sm text-gray-500">Age {patient.age}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {statusIcons[patient.status]}
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium border ${
              statusColors[patient.status]
            }`}
          >
            {patient.status}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Star className="w-4 h-4 text-yellow-500" />
          <span className="text-sm font-medium text-gray-700">Score</span>
        </div>
        <div
          className={`px-2 py-1 rounded-full text-sm font-bold ${getScoreBackground(
            patient.score
          )} ${getScoreColor(patient.score)}`}
        >
          {patient.score}/100
        </div>
      </div>

      <div className="flex items-center justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-1">
          <Calendar className="w-3 h-3" />
          <span>{patient.lastVisit || "No visits"}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Phone className="w-3 h-3" />
          <span>{patient.phone || "N/A"}</span>
        </div>
      </div>
    </motion.div>
  );
}

