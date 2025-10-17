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

interface ProviderDashboardMedspaProps {
  onViewPatients: () => void;
  onViewAnalysisTools: () => void;
  onSelectPatient: (patient: any) => void;
  onNewPatientScan: () => void;
  onQuickAnalysis: () => void;
  onAddPatientDirect: () => void;
}

export function ProviderDashboardMedspa({
  onViewPatients,
  onViewAnalysisTools,
  onSelectPatient,
  onNewPatientScan,
  onQuickAnalysis,
  onAddPatientDirect,
}: ProviderDashboardMedspaProps) {
  const { startTutorial } = useTutorial();
  const stats = [
    {
      title: "Active Patients",
      value: "24",
      change: "+12%",
      icon: <Users className="w-6 h-6" />,
      color: "medspa",
    },
    {
      title: "Analyses Today",
      value: "8",
      change: "+3",
      icon: <Brain className="w-6 h-6" />,
      color: "medspa",
    },
    {
      title: "Success Rate",
      value: "94%",
      change: "+2%",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "medspa",
    },
    {
      title: "Avg. Score",
      value: "78",
      change: "+5",
      icon: <Target className="w-6 h-6" />,
      color: "medspa",
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
      color: "medspa",
      onClick: onViewAnalysisTools,
    },
    {
      title: "Patient Management",
      description: "View all patients",
      icon: <Users className="w-6 h-6" />,
      color: "medspa",
      onClick: onViewPatients,
    },
    {
      title: "Analytics",
      description: "View detailed reports",
      icon: <BarChart3 className="w-6 h-6" />,
      color: "medspa",
      onClick: () => {},
    },
    {
      title: "Settings",
      description: "Configure preferences",
      icon: <Settings className="w-6 h-6" />,
      color: "medspa",
      onClick: () => {},
    },
  ];

  const getMedspaColorClasses = () => {
    return {
      gradient: "from-rose-200 to-pink-200",
      bg: "bg-white/60",
      border: "border-rose-200/50",
      text: "text-gray-700",
      hover: "hover:from-rose-300 hover:to-pink-300",
    };
  };

  return (
    <div
      className="flex flex-col h-screen overflow-hidden medspa-theme"
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
        className="p-4 border-b border-rose-200/30"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-300 to-pink-300 bg-clip-text text-transparent">
              Provider Dashboard
            </h1>
            <p className="text-gray-600 text-sm">Welcome back, Dr. Smith</p>
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={() => startTutorial("provider-dashboard")}
              variant="secondary"
              size="sm"
              className="flex items-center gap-2 bg-white/60 border-rose-200 text-gray-700 hover:bg-rose-50"
            >
              <HelpCircle className="w-4 h-4" />
              Tutorial
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-rose-300 rounded-full animate-pulse" />
              <span className="text-sm text-gray-600">Online</span>
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
            <h2 className="text-xl font-semibold text-gray-800">
              Recent Patients
            </h2>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={onNewPatientScan}
                className="text-xs flex items-center gap-2 bg-white/60 border-rose-200 text-gray-700 hover:bg-rose-50"
              >
                <Camera className="w-3 h-3" />
                New Patient Scan
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={onQuickAnalysis}
                className="text-xs flex items-center gap-2 bg-gradient-to-r from-rose-200 to-pink-200 hover:from-rose-300 hover:to-pink-300 text-gray-700 border-0"
              >
                <Zap className="w-3 h-3" />
                Quick Analysis
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={onAddPatientDirect}
                className="text-xs flex items-center gap-2 bg-gradient-to-r from-rose-200 to-pink-200 hover:from-rose-300 hover:to-pink-300 text-gray-700 border-0"
              >
                <Plus className="w-3 h-3" />
                Add Patient Direct
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={onViewPatients}
                className="text-xs bg-white/60 border-rose-200 text-gray-700 hover:bg-rose-50"
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
                    return "bg-rose-100/50 text-gray-700 border-rose-200/50";
                  case "provider-only":
                    return "bg-rose-100/50 text-gray-700 border-rose-200/50";
                  case "joint-review":
                    return "bg-rose-100/50 text-gray-700 border-rose-200/50";
                  default:
                    return "bg-rose-100/50 text-gray-700 border-rose-200/50";
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
                    className="p-6 bg-white/60 border-rose-200/50 hover:border-rose-300/50 cursor-pointer transition-all duration-300"
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
                        <div className="absolute inset-0 border-2 border-rose-300/60 rounded-lg" />
                        <div className="absolute top-2 right-2 w-4 h-4 bg-rose-300 rounded-full animate-pulse" />
                      </div>
                    </div>

                    {/* Patient Info */}
                    <div className="text-center mb-4">
                      <h3 className="font-semibold text-gray-800 text-xl mb-1">
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
                        >
                          {getReviewStatusText(patient.reviewStatus)}
                        </span>
                      </div>
                      <div className="text-center">
                        <span className="text-xs text-gray-600">
                          Provider:{" "}
                        </span>
                        <span className="text-xs text-gray-800 font-medium">
                          {patient.provider}
                        </span>
                      </div>
                    </div>

                    {/* Key Findings - Less Prominent */}
                    <div className="text-center">
                      <button
                        className="text-xs text-gray-600 hover:text-gray-800 transition-colors"
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
            const medspaClasses = getMedspaColorClasses();
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
                  className={`p-4 ${medspaClasses.bg} ${medspaClasses.border} border`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className={`p-2 rounded-lg ${medspaClasses.bg}`}>
                      <div className={medspaClasses.text}>{stat.icon}</div>
                    </div>
                    <span
                      className={`text-sm font-medium ${medspaClasses.text}`}
                    >
                      {stat.change}
                    </span>
                  </div>
                  <div className="text-2xl font-bold text-rose-400 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-rose-500/80">{stat.title}</div>
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
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => {
              const medspaClasses = getMedspaColorClasses();
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
                    className="p-4 bg-white/60 border-rose-200/50 hover:border-rose-300/50 cursor-pointer transition-all duration-300"
                    onClick={action.onClick}
                  >
                    <div className="text-center">
                      <div
                        className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-r ${medspaClasses.gradient} mb-3`}
                      >
                        <div className="text-gray-700">{action.icon}</div>
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-1">
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
