"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
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
} from "lucide-react";

interface ProviderDashboardProps {
  onViewPatients: () => void;
  onViewAnalysisTools: () => void;
  onSelectPatient: (patient: any) => void;
  onNewPatientScan: () => void;
}

export function ProviderDashboard({
  onViewPatients,
  onViewAnalysisTools,
  onSelectPatient,
  onNewPatientScan,
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
      icon: <Plus className="w-6 h-6" />,
      color: "blue",
      onClick: onViewAnalysisTools,
    },
    {
      title: "Patient Management",
      description: "View all patients",
      icon: <Users className="w-6 h-6" />,
      color: "purple",
      onClick: onViewPatients,
    },
    {
      title: "Analytics",
      description: "View detailed reports",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "green",
      onClick: () => {},
    },
    {
      title: "Settings",
      description: "Configure preferences",
      icon: <Settings className="w-6 h-6" />,
      color: "gray",
      onClick: () => {},
    },
  ];

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
      case "green":
        return {
          gradient: "from-green-600 to-green-800",
          bg: "bg-green-600/20",
          border: "border-green-500/50",
          text: "text-green-400",
        };
      case "orange":
        return {
          gradient: "from-orange-600 to-orange-800",
          bg: "bg-orange-600/20",
          border: "border-orange-500/50",
          text: "text-orange-400",
        };
      default:
        return {
          gradient: "from-gray-600 to-gray-800",
          bg: "bg-gray-600/20",
          border: "border-gray-500/50",
          text: "text-gray-400",
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
        backgroundColor: "var(--background)",
        color: "var(--text-primary)",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-4 border-b border-gray-800"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent dark:text-white dark:from-white dark:to-gray-300">
              Provider Dashboard
            </h1>
            <p className="text-gray-400 text-sm">Welcome back, Dr. Smith</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => startTutorial("provider-dashboard")}
              variant="primary"
              size="sm"
              className="flex items-center gap-2"
            >
              <HelpCircle className="w-4 h-4" />
              Tutorial
            </Button>
            <ThemeToggle />
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
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
            <h2 className="text-xl font-semibold text-white">
              Recent Patients
            </h2>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={onNewPatientScan}
                className="text-xs flex items-center gap-2"
              >
                <Camera className="w-3 h-3" />
                New Patient Scan
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={onViewPatients}
                className="text-xs"
              >
                View All
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPatients.map((patient, index) => {
              const getReviewStatusColor = (status: string) => {
                switch (status) {
                  case "patient-reviewed":
                    return "bg-green-500/20 text-green-400 border-green-500/50";
                  case "provider-only":
                    return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
                  case "joint-review":
                    return "bg-blue-500/20 text-blue-400 border-blue-500/50";
                  default:
                    return "bg-gray-500/20 text-gray-400 border-gray-500/50";
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
                    className="p-6 bg-gray-800/50 border-gray-700 hover:border-gray-600 cursor-pointer transition-all duration-300"
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
                        <div className="absolute inset-0 border-2 border-blue-400 rounded-lg" />
                        <div className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full animate-pulse" />
                      </div>
                    </div>

                    {/* Patient Info */}
                    <div className="text-center mb-4">
                      <h3 className="font-semibold text-white text-xl mb-1">
                        {patient.name}
                      </h3>
                      <p className="text-sm text-gray-400 mb-3">
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
                        >
                          {getReviewStatusText(patient.reviewStatus)}
                        </span>
                      </div>
                      <div className="text-center">
                        <span className="text-xs text-gray-400">
                          Provider:{" "}
                        </span>
                        <span className="text-xs text-white font-medium">
                          {patient.provider}
                        </span>
                      </div>
                    </div>

                    {/* Key Findings - Less Prominent */}
                    <div className="text-center">
                      <button
                        className="text-xs text-gray-400 hover:text-white transition-colors"
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
                <Card
                  className={`p-4 ${colorClasses.bg} ${colorClasses.border} border`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${colorClasses.bg}`}>
                      <div className={colorClasses.text}>{stat.icon}</div>
                    </div>
                    <span
                      className={`text-sm font-medium ${colorClasses.text}`}
                    >
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">{stat.title}</div>
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
          <h2 className="text-lg font-semibold text-white mb-4">
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
                    className="p-4 bg-gray-800/50 border-gray-700 hover:border-gray-600 cursor-pointer transition-all duration-300"
                    onClick={action.onClick}
                  >
                    <div className="text-center">
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${colorClasses.gradient} mb-3`}
                      >
                        <div className="text-white">{action.icon}</div>
                      </div>
                      <h3 className="font-semibold text-white mb-1">
                        {action.title}
                      </h3>
                      <p className="text-xs text-gray-400">
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
