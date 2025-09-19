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

interface PatientManagementScreenProps {
  onSelectPatient: (patient: any) => void;
  onBack: () => void;
}

export function PatientManagementScreen({
  onSelectPatient,
  onBack,
}: PatientManagementScreenProps) {
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
      treatments: ["Filler", "Botox"],
      notes: "Conservative approach preferred",
      frontImage: "/Sydney Adams Front.png",
      sideImage: "/Sydney Adams Side.png",
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
      treatments: ["Facelift consultation", "Filler"],
      notes: "Comprehensive rejuvenation candidate",
      frontImage: "/Chelsea Perry Front.png",
      sideImage: "/Chelsea Perry Side.png",
    },
    {
      id: "1003",
      name: "Jen LePage",
      age: 39,
      email: "jen.lepage@email.com",
      phone: "(555) 345-6789",
      lastVisit: "2024-01-20",
      nextAppointment: "2024-03-20",
      status: "follow-up",
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
      treatments: ["Chemical peel", "Microneedling"],
      notes: "Excellent candidate for preventive care",
      frontImage: "/Jen LePage Front.png",
      sideImage: "/Jen LePage Side.png",
    },
    {
      id: "1004",
      name: "Stephanie Enrietti",
      age: 40,
      email: "stephanie.enrietti@email.com",
      phone: "(555) 456-7890",
      lastVisit: "2023-12-15",
      nextAppointment: null,
      status: "inactive",
      score: 72,
      findings: [
        "Forehead Wrinkles",
        "Glabella Wrinkles",
        "Bunny Lines",
        "Crow's Feet Wrinkles",
        "Under Eye Wrinkles",
        "Perioral Wrinkles",
        "Neck Lines",
        "Dark Spots",
        "Red Spots",
        "Whiteheads",
        "Nasolabial Folds",
        "Marionette Lines",
        "Temporal Hollow",
        "Under Eye Hollow",
        "Lower Eyelid Bags",
        "Mid Cheek Flattening",
        "Crooked Nose",
        "Dorsal Hump",
        "Thin Lips",
        "Asymmetric Lips",
        "Dry Lips",
        "Prejowl Sulcus",
        "Loose Neck Skin",
        "Excess/Submental Fullness",
      ],
      treatments: ["Botox"],
      notes: "Completed treatment series",
      frontImage: "/Chelsea Perry Front.png",
      sideImage: "/Chelsea Perry Side.png",
    },
  ];

  const filteredPatients = patients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" || patient.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/50";
      case "follow-up":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
      case "inactive":
        return "bg-gray-500/20 text-gray-400 border-gray-500/50";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/50";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div
      className="bg-gradient-to-br from-black via-gray-900 to-black flex flex-col h-screen overflow-hidden"
      style={{
        height: "100vh",
        minHeight: "100vh",
        maxHeight: "100vh",
      }}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-4 border-b border-gray-200 dark:border-gray-800"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={onBack}
              className="p-2"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent dark:text-white dark:from-white dark:to-gray-300">
                Patient Management
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {filteredPatients.length} patients found
              </p>
            </div>
          </div>
          <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
            <Plus className="w-4 h-4 mr-2" />
            New Patient
          </Button>
        </div>

        {/* Search and Filter */}
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="follow-up">Follow-up</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </motion.div>

      {/* Patient List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {filteredPatients.map((patient, index) => (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className="p-4 bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-all duration-300 cursor-pointer hover:bg-gray-800/70"
                onClick={() => onSelectPatient(patient)}
              >
                <div className="flex items-start justify-between">
                  {/* Patient Info */}
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Patient Photo - Single Front View */}
                    <div className="relative w-24 h-24 rounded-lg overflow-hidden group">
                      <img
                        src={patient.frontImage}
                        alt={`${patient.name} front view`}
                        className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-300"
                      />
                      <div className="absolute inset-0 border-2 border-blue-400 rounded-lg" />
                      <div className="absolute top-1 right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                    </div>

                    {/* Patient Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-white truncate">
                          {patient.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                              patient.status
                            )}`}
                          >
                            {patient.status.replace("-", " ")}
                          </span>
                          <div className="text-right">
                            <div className="text-sm text-gray-400">
                              {patient.findings.length} findings
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Contact</p>
                          <p className="text-sm text-white">{patient.email}</p>
                          <p className="text-sm text-gray-300">
                            {patient.phone}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400 mb-1">Provider</p>
                          <p className="text-sm text-white">Dr. Smith</p>
                          <p className="text-sm text-gray-300">
                            Last analysis: {patient.lastVisit}
                          </p>
                        </div>
                      </div>

                      {/* Concerns and Treatments */}
                      <div className="mb-3">
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
                        <div className="flex flex-wrap gap-1">
                          {patient.treatments.map(
                            (treatment, treatmentIndex) => (
                              <span
                                key={treatmentIndex}
                                className="px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded border border-blue-500/30"
                              >
                                {treatment}
                              </span>
                            )
                          )}
                        </div>
                      </div>

                      {/* Notes */}
                      {patient.notes && (
                        <p className="text-sm text-gray-300 italic">
                          "{patient.notes}"
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 ml-4">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => onSelectPatient(patient)}
                      className="p-2"
                      title="View patient details and analysis"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="p-2"
                      title="Edit patient information and notes"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      className="p-2 text-red-400 hover:text-red-300"
                      title="Archive patient (soft delete)"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredPatients.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              No patients found
            </h3>
            <p className="text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
