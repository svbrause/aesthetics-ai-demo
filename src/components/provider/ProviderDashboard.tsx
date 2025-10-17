"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useTutorial } from "@/contexts/TutorialContext";
import {
  Users,
  BarChart3,
  Brain,
  Settings,
  Plus,
  TrendingUp,
  Clock,
  Star,
  ArrowRight,
  Activity,
  Target,
  Shield,
  Camera,
  HelpCircle,
  Zap,
} from "lucide-react";

interface ProviderDashboardProps {
  onViewPatients: () => void;
  onViewAnalysisTools: () => void;
  onSelectPatient: (patient: any) => void;
  onNewPatientScan: () => void;
  onQuickAnalysis: () => void;
  onAddPatientDirect: () => void;
}

export function ProviderDashboard({
  onViewPatients,
  onViewAnalysisTools,
  onSelectPatient,
  onNewPatientScan,
  onQuickAnalysis,
  onAddPatientDirect,
}: ProviderDashboardProps) {
  const { startTutorial } = useTutorial();
  const stats = [
    {
      title: "Active Patients",
      value: "24",
      change: "+12%",
      icon: <Users className="w-6 h-6" />,
      color: "blue",
    },
    {
      title: "Analyses Today",
      value: "8",
      change: "+3",
      icon: <Brain className="w-6 h-6" />,
      color: "purple",
    },
    {
      title: "Success Rate",
      value: "94%",
      change: "+2%",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "green",
    },
    {
      title: "Avg. Score",
      value: "78",
      change: "+5",
      icon: <Target className="w-6 h-6" />,
      color: "orange",
    },
  ];

  const recentPatients = [
    {
      id: "1001",
      name: "Sydney Adams",
      age: 28,
      lastAnalysis: "2 hours ago",
      score: 78,
      status: "completed",
      reviewStatus: "patient-reviewed",
      provider: "Dr. Smith",
      frontImage: "/Sydney Adams Front.png",
      sideImage: "/Sydney Adams Side.png",
      findings: [
        "Forehead Wrinkles",
        "Dark Spots",
        "Nasolabial Folds",
        "Marionette Lines",
        "Red Spots",
        "Whiteheads",
        "Temporal Hollow",
        "Under Eye Hollow",
        "Upper Eye Hollow",
        "Lower Eyelid Sag",
        "Mid Cheek Flattening",
        "Crooked Nose",
        "Dorsal Hump",
        "Dry Lips",
        "Excess/Submental Fullness",
        "Prejowl Sulcus",
        "Retruded Chin",
        "Masseter Hypertrophy",
      ],
    },
    {
      id: "1002",
      name: "Chelsea Perry",
      age: 32,
      lastAnalysis: "4 hours ago",
      score: 62,
      status: "in-progress",
      reviewStatus: "provider-only",
      provider: "Dr. Johnson",
      frontImage: "/Chelsea Perry Front.png",
      sideImage: "/Chelsea Perry Side.png",
      findings: [
        "Under Eye Wrinkles",
        "Bunny Lines",
        "Neck Lines",
        "Dark Spots",
        "Red Spots",
        "Nasolabial Folds",
        "Marionette Lines",
        "Temporal Hollow",
        "Brow Asymmetry",
        "Excess Upper Eyelid Skin",
        "Under Eye Hollow",
        "Negative Canthal Tilt",
        "Cheekbone - Not Prominent",
        "Over-Projected",
        "Over-Rotated",
        "Nasal Bone - Too Wide",
        "Nostril Base - Too Wide",
        "Nasal Tip Too Wide",
        "Thin Lips",
        "Long Philtral Column",
        "Dry Lips",
        "Retruded Chin",
        "Jowls",
        "Ill-Defined Jawline",
        "Prejowl Sulcus",
        "Excess/Submental Fullness",
        "Obtuse Cervicomental Angle",
      ],
    },
    {
      id: "1003",
      name: "Jen LePage",
      age: 39,
      lastAnalysis: "1 day ago",
      score: 85,
      status: "completed",
      reviewStatus: "joint-review",
      provider: "Dr. Smith",
      frontImage: "/Jen LePage Front.png",
      sideImage: "/Jen LePage Side.png",
      findings: [
        "Forehead Wrinkles",
        "Crow's Feet Wrinkles",
        "Glabella Wrinkles",
        "Under Eye Wrinkles",
        "Perioral Wrinkles",
        "Neck Lines",
        "Red Spots",
        "Scars",
        "Nasolabial Folds",
        "Marionette Lines",
        "Whiteheads",
        "Blackheads",
        "Temporal Hollow",
        "Under Eye Hollow",
        "Mid Cheek Flattening",
        "Crooked Nose",
        "Thin Lips",
        "Asymmetric Lips",
        "Long Philtral Column",
        "Prejowl Sulcus",
        "Excess/Submental Fullness",
        "Retruded Chin",
      ],
    },
  ];

  const quickActions = [
    {
      title: "New Analysis",
      description: "Start a new patient analysis",
      icon: <Plus className="w-6 h-6" style={{ color: "white" }} />,
      color: "blue",
      onClick: onViewAnalysisTools,
      backgroundColor: "#367588", // Primary blue
    },
    {
      title: "Patient Management",
      description: "View all patients",
      icon: <Users className="w-6 h-6" style={{ color: "white" }} />,
      color: "purple",
      onClick: onViewPatients,
      backgroundColor: "#367588", // Primary blue
    },
    {
      title: "Analytics",
      description: "View detailed reports",
      icon: <BarChart3 className="w-6 h-6" style={{ color: "white" }} />,
      color: "green",
      onClick: () => {},
      backgroundColor: "#367588", // Primary blue
    },
    {
      title: "Settings",
      description: "Configure preferences",
      icon: <Settings className="w-6 h-6" style={{ color: "white" }} />,
      color: "gray",
      onClick: () => {},
      backgroundColor: "#367588", // Primary blue
    },
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return {
          gradient: "from-gray-700 to-gray-800",
          bg: "bg-gray-800/40",
          border: "border-gray-600/50",
          text: "text-gray-200",
        };
      case "purple":
        return {
          gradient: "from-gray-700 to-gray-800",
          bg: "bg-gray-800/40",
          border: "border-gray-600/50",
          text: "text-gray-200",
        };
      case "green":
        return {
          gradient: "from-gray-700 to-gray-800",
          bg: "bg-gray-800/40",
          border: "border-gray-600/50",
          text: "text-gray-200",
        };
      case "orange":
        return {
          gradient: "from-gray-700 to-gray-800",
          bg: "bg-gray-800/40",
          border: "border-gray-600/50",
          text: "text-gray-200",
        };
      default:
        return {
          gradient: "from-gray-700 to-gray-800",
          bg: "bg-gray-800/40",
          border: "border-gray-600/50",
          text: "text-gray-200",
        };
    }
  };

  return (
    <div
      className="flex flex-col h-screen overflow-hidden"
      style={{
        height: "100vh",
        minHeight: "100vh",
        maxHeight: "100vh",
        backgroundColor: "#F8F9FA",
        color: "#1F2937",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-4"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">
              Provider Dashboard
            </h1>
            <p className="text-gray-600 text-sm">Welcome back, Dr. Smith</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => startTutorial("provider-dashboard")}
              variant="secondary"
              size="sm"
              className="flex items-center gap-2 text-gray-700"
              style={{ backgroundColor: "#f3f4f6" }}
            >
              <HelpCircle className="w-4 h-4" style={{ color: "#367588" }} />
              Tutorial
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" />
              <span className="text-sm text-gray-400">Online</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Recent Patients - Moved to Top */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-black">
              Recent Patients
            </h2>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={onNewPatientScan}
                className="text-xs flex items-center gap-2 text-gray-700"
                style={{ backgroundColor: "#f3f4f6" }}
              >
                <Camera className="w-3 h-3" style={{ color: "#367588" }} />
                New Patient Scan
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={onQuickAnalysis}
                className="text-xs flex items-center gap-2 text-gray-700"
                style={{ backgroundColor: "#f3f4f6" }}
              >
                <Zap className="w-3 h-3" style={{ color: "#367588" }} />
                Quick Analysis
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={onAddPatientDirect}
                className="text-xs flex items-center gap-2 text-gray-700"
                style={{ backgroundColor: "#f3f4f6" }}
              >
                <Plus className="w-3 h-3" style={{ color: "#367588" }} />
                Add Patient Direct
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={onViewPatients}
                className="text-xs text-white"
                style={{ backgroundColor: "#367588" }}
              >
                View All
                <ArrowRight className="w-3 h-3 ml-1 text-white" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPatients.map((patient, index) => {
              const getReviewStatusColor = (status: string) => {
                switch (status) {
                  case "patient-reviewed":
                    return "text-white border-transparent";
                  case "provider-only":
                    return "text-white border-transparent";
                  case "joint-review":
                    return "text-white border-transparent";
                  default:
                    return "text-white border-transparent";
                }
              };

              const getReviewStatusText = (status: string) => {
                switch (status) {
                  case "patient-reviewed":
                    return "Patient Reviewed";
                  case "provider-only":
                    return "Provider Only";
                  case "joint-review":
                    return "Joint Review";
                  default:
                    return "Unknown";
                }
              };

              return (
                <motion.div
                  key={patient.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card
                    className="p-6 cursor-pointer transition-all duration-300"
                    style={{ backgroundColor: "#f3f4f6" }}
                    onClick={() => onSelectPatient(patient)}
                  >
                    {/* Patient Photo - Single Front View */}
                    <div className="flex justify-center mb-6">
                      <div className="relative w-40 h-40 rounded-lg overflow-hidden group">
                        <img
                          src={patient.frontImage}
                          alt={`${patient.name} front view`}
                          className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-300"
                        />
                        <div
                          className="absolute inset-0 border-2 rounded-lg"
                          style={{ borderColor: "#367588" }}
                        />
                        <div
                          className="absolute top-2 right-2 w-4 h-4 rounded-full animate-pulse"
                          style={{ backgroundColor: "#367588" }}
                        />
                      </div>
                    </div>

                    {/* Patient Info */}
                    <div className="text-center mb-4">
                      <h3 className="font-semibold text-gray-900 text-xl mb-1">
                        {patient.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {patient.age}y • {patient.lastAnalysis}
                      </p>
                    </div>

                    {/* Review Status and Provider */}
                    <div className="space-y-2 mb-4">
                      <div className="flex justify-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs border ${getReviewStatusColor(
                            patient.reviewStatus
                          )}`}
                          style={{ backgroundColor: "#367588" }}
                        >
                          {getReviewStatusText(patient.reviewStatus)}
                        </span>
                      </div>
                      <div className="text-center">
                        <span className="text-xs text-gray-600">
                          Provider:{" "}
                        </span>
                        <span className="text-xs text-gray-900 font-medium">
                          {patient.provider}
                        </span>
                      </div>
                    </div>

                    {/* Key Findings - Less Prominent */}
                    <div className="text-center">
                      <button
                        className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Show all findings in a modal or expand
                        }}
                      >
                        {patient.findings.length} findings • View Details
                      </button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((stat, index) => {
            const colorClasses = getColorClasses(stat.color);
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  delay: 0.4 + index * 0.1,
                  duration: 0.5,
                  type: "spring",
                  stiffness: 200,
                }}
                whileHover={{
                  scale: 1.05,
                  y: -2,
                  transition: { duration: 0.2 },
                }}
              >
                <Card className="p-4" style={{ backgroundColor: "#f3f4f6" }}>
                  <div className="flex items-center justify-between mb-2">
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: "#f3f4f6" }}
                    >
                      <div style={{ color: "#367588" }}>{stat.icon}</div>
                    </div>
                    <span className="text-sm font-medium text-gray-600">
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600">{stat.title}</div>
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <h2 className="text-lg font-semibold text-black mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const colorClasses = getColorClasses(action.color);
              return (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.6 + index * 0.1,
                    duration: 0.5,
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -3,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Card
                    className="p-4 cursor-pointer transition-all duration-300"
                    style={{ backgroundColor: "#f3f4f6" }}
                    onClick={action.onClick}
                  >
                    <div className="text-center">
                      <div
                        className="inline-flex items-center justify-center w-12 h-12 rounded-xl mb-3"
                        style={{ backgroundColor: action.backgroundColor }}
                      >
                        <div className="text-white" style={{ color: "white" }}>
                          {action.icon}
                        </div>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {action.title}
                      </h3>
                      <p className="text-xs text-gray-600">
                        {action.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
