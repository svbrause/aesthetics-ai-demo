"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { useProvider } from "@/contexts/ProviderContext";
import {
  Users,
  ArrowLeft,
  Search,
  Filter,
  Plus,
  Camera,
  Zap,
  LogOut,
  User as UserIcon,
  Calendar,
  Star,
  Eye,
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
  email: string;
  phone: string;
  scanDate: string;
}

export default function ProviderPatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [filteredPatients, setFilteredPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const router = useRouter();
  const { provider, logout } = useProvider();

  useEffect(() => {
    if (!provider) {
      router.push("/provider-login");
      return;
    }

    fetchPatients();
  }, [provider, router]);

  useEffect(() => {
    filterPatients();
  }, [patients, searchTerm, filterStatus]);

  const fetchPatients = async (debug = false) => {
    if (!provider) return;

    try {
      const debugParam = debug ? "&debug=true" : "";
      const response = await fetch(
        `/api/provider-patients?providerId=${provider.code}${debugParam}`
      );
      const data = await response.json();

      if (data.success) {
        setPatients(data.patients);
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

  const filterPatients = () => {
    let filtered = patients;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (patient) =>
          patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          patient.phone.includes(searchTerm)
      );
    }

    // Filter by status
    if (filterStatus !== "all") {
      filtered = filtered.filter(
        (patient) => patient.reviewStatus === filterStatus
      );
    }

    setFilteredPatients(filtered);
  };

  const handleLogout = () => {
    logout();
    router.push("/provider-login");
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

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
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
          <span className="text-lg">Loading patients...</span>
        </div>
      </div>
    );
  }

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
        className="p-4 border-b border-gray-800"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => router.push("/provider-login/dashboard")}
              variant="secondary"
              size="sm"
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent dark:text-white dark:from-white dark:to-gray-300">
                My Patients
              </h1>
              <p className="text-gray-400 text-sm">
                {filteredPatients.length} of {patients.length} patients
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <UserIcon className="w-4 h-4" />
              <span>{provider?.code}</span>
            </div>
            <Button
              onClick={() => fetchPatients(true)}
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
          </div>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="p-4 border-b border-gray-800"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                style={{ backgroundColor: "#f3f4f6" }}
                placeholder="Search patients by name, email, or phone..."
              />
            </div>
          </div>

          {/* Filter */}
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{ backgroundColor: "#f3f4f6" }}
            >
              <option value="all">All Status</option>
              <option value="patient-reviewed">Patient Reviewed</option>
              <option value="provider-only">Provider Only</option>
              <option value="joint-review">Joint Review</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              onClick={handleNewPatientScan}
              variant="secondary"
              size="sm"
              className="flex items-center gap-2"
            >
              <Camera className="w-4 h-4" />
              New Scan
            </Button>
            <Button
              onClick={handleQuickAnalysis}
              variant="secondary"
              size="sm"
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
            >
              <Zap className="w-4 h-4" />
              Quick Analysis
            </Button>
            <Button
              onClick={handleAddPatientDirect}
              variant="secondary"
              size="sm"
              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0"
            >
              <Plus className="w-4 h-4" />
              Add Patient
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Patients List */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredPatients.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPatients.map((patient, index) => (
              <motion.div
                key={patient.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.05,
                  duration: 0.5,
                }}
                whileHover={{
                  scale: 1.02,
                  y: -2,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.98 }}
              >
                <Card
                  className="p-6 border-gray-300 hover:border-gray-400 cursor-pointer transition-all duration-300"
                  style={{ backgroundColor: "#f3f4f6" }}
                  onClick={() => handleSelectPatient(patient)}
                >
                  {/* Patient Photo */}
                  <div className="flex justify-center mb-4">
                    <div className="relative w-32 h-32 rounded-lg overflow-hidden group">
                      <img
                        src={patient.frontImage}
                        alt={`${patient.name} front view`}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-300"
                      />
                      <div className="absolute inset-0 border-2 border-blue-400 rounded-lg" />
                    </div>
                  </div>

                  {/* Patient Info */}
                  <div className="text-center mb-4">
                    <h3 className="font-semibold text-gray-900 text-lg mb-1">
                      {patient.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {patient.age}y • {patient.email}
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <span
                        className={`text-sm font-medium ${getScoreColor(
                          patient.score
                        )}`}
                      >
                        Score: {patient.score}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className="text-xs text-gray-400">
                        {patient.findings.length} findings
                      </span>
                    </div>
                  </div>

                  {/* Review Status */}
                  <div className="flex justify-center mb-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs border ${getReviewStatusColor(
                        patient.reviewStatus
                      )}`}
                    >
                      {getReviewStatusText(patient.reviewStatus)}
                    </span>
                  </div>

                  {/* Last Visit */}
                  <div className="text-center text-xs text-gray-600 mb-4">
                    <div className="flex items-center justify-center gap-1">
                      <Calendar className="w-3 h-3" />
                      <span>Last visit: {patient.lastVisit}</span>
                    </div>
                  </div>

                  {/* View Button */}
                  <Button
                    variant="secondary"
                    size="sm"
                    className="w-full text-xs"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectPatient(patient);
                    }}
                  >
                    <Eye className="w-3 h-3 mr-2" />
                    View Details
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-6">
              <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-xl mb-2">
                {searchTerm || filterStatus !== "all"
                  ? "No patients match your search"
                  : "No patients found"}
              </p>
              <p className="text-sm">
                {searchTerm || filterStatus !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "Start by adding a new patient"}
              </p>
            </div>
            {!searchTerm && filterStatus === "all" && (
              <Button
                onClick={handleNewPatientScan}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add First Patient
              </Button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
