"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  ArrowLeft,
  Search,
  Filter,
  Plus,
  MoreVertical,
  Calendar,
  Star,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";

interface PatientManagementScreenMedspaProps {
  onSelectPatient: (patient: any) => void;
  onBack: () => void;
}

export function PatientManagementScreenMedspa({
  onSelectPatient,
  onBack,
}: PatientManagementScreenMedspaProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const patients = [
    {
      id: "1001",
      name: "Sydney Adams",
      age: 28,
      email: "sydney.adams@email.com",
      phone: "(555) 123-4567",
      lastVisit: "2024-01-15",
      nextAppointment: "2024-02-15",
      status: "active",
      score: 78,
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
      frontImage: "/Sydney Adams Front.png",
      sideImage: "/Sydney Adams Side.png",
      provider: "Dr. Smith",
      reviewStatus: "patient-reviewed",
    },
    {
      id: "1002",
      name: "Chelsea Perry",
      age: 32,
      email: "chelsea.perry@email.com",
      phone: "(555) 234-5678",
      lastVisit: "2024-01-10",
      nextAppointment: "2024-02-10",
      status: "active",
      score: 62,
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
      frontImage: "/Chelsea Perry Front.png",
      sideImage: "/Chelsea Perry Side.png",
      provider: "Dr. Johnson",
      reviewStatus: "provider-only",
    },
    {
      id: "1003",
      name: "Jen LePage",
      age: 39,
      email: "jen.lepage@email.com",
      phone: "(555) 345-6789",
      lastVisit: "2024-01-05",
      nextAppointment: "2024-02-05",
      status: "active",
      score: 85,
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
      frontImage: "/Jen LePage Front.png",
      sideImage: "/Jen LePage Side.png",
      provider: "Dr. Smith",
      reviewStatus: "joint-review",
    },
  ];

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch = patient.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || patient.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "inactive":
        return "bg-gray-100 text-gray-800 border-gray-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

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
          <div className="flex items-center space-x-4">
            <Button
              onClick={onBack}
              variant="secondary"
              size="sm"
              className="bg-white/60 border-rose-200 text-gray-700 hover:bg-rose-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-rose-300 to-pink-300 bg-clip-text text-transparent">
                Patient Management
              </h1>
              <p className="text-gray-600 text-sm">
                Manage your patient records and analyses
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="secondary"
              size="sm"
              className="bg-white/60 border-rose-200 text-gray-700 hover:bg-rose-50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Patient
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="p-4 border-b border-rose-200/30"
      >
        <div className="flex items-center space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-rose-200/50 rounded-lg bg-white/60 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-rose-300/50 focus:border-rose-300"
            />
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-rose-200/50 rounded-lg bg-white/60 text-gray-700 focus:outline-none focus:ring-2 focus:ring-rose-300/50 focus:border-rose-300"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
            <Button
              variant="secondary"
              size="sm"
              className="bg-white/60 border-rose-200 text-gray-700 hover:bg-rose-50"
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Patient List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPatients.map((patient, index) => (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.1,
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
                className="p-6 bg-white/60 border-rose-200/50 hover:border-rose-300/50 cursor-pointer transition-all duration-300"
                onClick={() => onSelectPatient(patient)}
              >
                {/* Patient Photo */}
                <div className="flex justify-center mb-4">
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden group">
                    <img
                      src={patient.frontImage}
                      alt={`${patient.name} front view`}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-300"
                    />
                    <div className="absolute inset-0 border-2 border-rose-300/60 rounded-lg" />
                    <div className="absolute top-2 right-2 w-3 h-3 bg-rose-300 rounded-full animate-pulse" />
                  </div>
                </div>

                {/* Patient Info */}
                <div className="text-center mb-4">
                  <h3 className="font-semibold text-gray-800 text-lg mb-1">
                    {patient.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {patient.age}y • {patient.email}
                  </p>
                  <p className="text-xs text-gray-500">{patient.phone}</p>
                </div>

                {/* Status and Score */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs border ${getStatusColor(
                      patient.status
                    )}`}
                  >
                    {patient.status}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-rose-400" />
                    <span className="text-sm font-medium text-gray-700">
                      {patient.score}
                    </span>
                  </div>
                </div>

                {/* Review Status */}
                <div className="mb-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs border ${getReviewStatusColor(
                      patient.reviewStatus
                    )}`}
                  >
                    {getReviewStatusText(patient.reviewStatus)}
                  </span>
                </div>

                {/* Provider and Dates */}
                <div className="space-y-2 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Provider:</span>
                    <span className="font-medium">{patient.provider}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Last Visit:</span>
                    <span className="font-medium">{patient.lastVisit}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Next Appointment:</span>
                    <span className="font-medium">
                      {patient.nextAppointment}
                    </span>
                  </div>
                </div>

                {/* Findings Count */}
                <div className="mt-4 pt-4 border-t border-rose-200/30">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">
                      {patient.findings.length} findings
                    </span>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="p-1 bg-white/60 border-rose-200 text-gray-700 hover:bg-rose-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle view action
                        }}
                      >
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="p-1 bg-white/60 border-rose-200 text-gray-700 hover:bg-rose-50"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Handle edit action
                        }}
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

