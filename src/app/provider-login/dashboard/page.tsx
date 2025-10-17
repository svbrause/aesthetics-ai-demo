"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useProvider } from "@/contexts/ProviderContext";
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
  LogOut,
  User as UserIcon,
} from "lucide-react";

interface Patient {
  id: string;
  name: string;
  age: number;
  lastVisit: string;
  score: number;
  status: string;
  reviewStatus: string;
  frontImage: string;
  sideImage: string;
  findings: string[];
}

export default function ProviderDashboardPage() {
  const [recentPatients, setRecentPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { provider, logout } = useProvider();

  useEffect(() => {
    if (!provider) {
      router.push("/provider-login");
      return;
    }

    fetchRecentPatients();
  }, [provider, router]);

  const fetchRecentPatients = async (debug = false) => {
    if (!provider) return;

    try {
      const debugParam = debug ? "&debug=true" : "";
      const response = await fetch(
        `/api/provider-patients?providerId=${provider.code}${debugParam}`
      );
      const data = await response.json();

      if (data.success) {
        // Get the 3 most recent patients
        setRecentPatients(data.patients.slice(0, 3));
        if (debug) {
          console.log("🔍 DEBUG: API Response:", data);
        }
      } else {
        console.error("Failed to fetch patients:", data.error);
        if (debug) {
          console.log("🔍 DEBUG: Error details:", data);
        }
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
      if (debug) {
        console.log("🔍 DEBUG: Exception:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/provider-login");
  };

  const handleViewPatients = () => {
    router.push("/provider-login/patients");
  };

  const handleSelectPatient = (patient: Patient) => {
    router.push(`/provider-login/patients/${patient.id}`);
  };

  const handleNewPatientScan = () => {
    router.push("/provider/upload");
  };

  const handleQuickAnalysis = () => {
    router.push("/provider/quick-analysis");
  };

  const handleAddPatientDirect = () => {
    router.push("/provider/add-patient-direct");
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundColor: "var(--background)",
          color: "var(--text-primary)",
        }}
      >
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <span className="text-lg">Loading dashboard...</span>
        </div>
      </div>
    );
  }

  const stats = [
    {
      title: "Active Patients",
      value: recentPatients.length.toString(),
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

  const quickActions = [
    {
      title: "New Analysis",
      description: "Start a new patient analysis",
      icon: <Plus className="w-6 h-6" />,
      color: "blue",
      onClick: handleNewPatientScan,
    },
    {
      title: "Patient Management",
      description: "View all patients",
      icon: <Users className="w-6 h-6" />,
      color: "purple",
      onClick: handleViewPatients,
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
    // Use consistent medspa theme colors for all stats
    return {
      gradient: "from-blue-600 to-blue-700",
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-600",
    };
  };

  return (
    <div
      className="flex flex-col h-screen overflow-hidden medspa-new-theme"
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
        className="p-4 border-b border-gray-200"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Provider Dashboard
            </h1>
            <p className="text-gray-600 text-sm">
              Welcome back, {provider?.name}
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <UserIcon className="w-4 h-4" />
              <span>{provider?.code}</span>
            </div>
            <Button
              onClick={() => fetchRecentPatients(true)}
              variant="secondary"
              size="sm"
              className="flex items-center gap-2 text-xs"
            >
              🔍 Debug API
            </Button>
            <Button
              onClick={handleLogout}
              variant="secondary"
              size="sm"
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-gray-600">Online</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Recent Patients */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Patients
            </h2>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleNewPatientScan}
                className="text-xs flex items-center gap-2"
              >
                <Camera className="w-3 h-3" />
                New Patient Scan
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleQuickAnalysis}
                className="text-xs flex items-center gap-2 medspa-primary-bg medspa-primary-hover text-white border-0"
              >
                <Zap className="w-3 h-3" />
                Quick Analysis
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleAddPatientDirect}
                className="text-xs flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white border-0"
              >
                <Plus className="w-3 h-3" />
                Add Patient Direct
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleViewPatients}
                className="text-xs"
              >
                View All
                <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPatients.length > 0 ? (
              recentPatients.map((patient, index) => {
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
                      className="p-6 bg-white border-gray-200 hover:border-gray-300 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md"
                      onClick={() => handleSelectPatient(patient)}
                    >
                      {/* Patient Photo */}
                      <div className="flex justify-center mb-6">
                        <div className="relative w-40 h-40 rounded-lg overflow-hidden group">
                          <img
                            src={patient.frontImage}
                            alt={`${patient.name} front view`}
                            className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-300"
                          />
                          <div className="absolute inset-0 border-2 border-blue-600 rounded-lg" />
                          <div className="absolute top-2 right-2 w-4 h-4 bg-blue-600 rounded-full animate-pulse" />
                        </div>
                      </div>

                      {/* Patient Info */}
                      <div className="text-center mb-4">
                        <h3 className="font-semibold text-gray-900 text-xl mb-1">
                          {patient.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {patient.age}y • {patient.lastVisit}
                        </p>
                      </div>

                      {/* Review Status */}
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
                      </div>

                      {/* Key Findings */}
                      <div className="text-center">
                        <button
                          className="text-xs text-gray-600 hover:text-gray-900 transition-colors"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          {patient.findings.length} findings • View Details
                        </button>
                      </div>
                    </Card>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">No patients found</p>
                  <p className="text-sm">Start by adding a new patient</p>
                </div>
                <Button
                  onClick={handleNewPatientScan}
                  className="medspa-primary-bg medspa-primary-hover text-white border-0"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add First Patient
                </Button>
              </div>
            )}
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
                <Card className="p-4 bg-white border-gray-200 hover:border-gray-300 transition-all duration-200 shadow-sm hover:shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <div className="p-2 rounded-lg bg-blue-50">
                      <div className="text-blue-600">{stat.icon}</div>
                    </div>
                    <span className="text-sm font-medium text-green-600">
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
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
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
                    className="p-4 bg-white border-gray-200 hover:border-gray-300 cursor-pointer transition-all duration-300 shadow-sm hover:shadow-md"
                    onClick={action.onClick}
                  >
                    <div className="text-center">
                      <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-50 mb-3">
                        <div className="text-blue-600">{action.icon}</div>
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
