"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  ArrowLeft,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Star,
  Target,
  Sparkles,
  Shield,
  Plus,
  Edit,
  Download,
  Share,
  ChevronRight,
  Activity,
  TrendingUp,
  Clock,
  CheckCircle,
  RotateCcw,
  DollarSign,
  Zap,
  Heart,
  AlertTriangle,
  Eye,
  EyeOff,
  ArrowRight,
  X,
  PlusCircle,
  FileText,
  Send,
} from "lucide-react";

interface PatientDetailScreenProps {
  patient: any;
  onBack: () => void;
  onOpenAreaAnalysis: (area: string) => void;
}

export function PatientDetailScreen({
  patient,
  onBack,
  onOpenAreaAnalysis,
}: PatientDetailScreenProps) {
  const [selectedArea, setSelectedArea] = useState("facial-structure");
  const [selectedSubcategory, setSelectedSubcategory] = useState("");
  const [isSideView, setIsSideView] = useState(false);
  const [showTreatmentPlan, setShowTreatmentPlan] = useState(false);
  const [treatmentPlan, setTreatmentPlan] = useState<any[]>([]);

  if (!patient) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400">No patient selected</p>
      </div>
    );
  }

  const analysisAreas = [
    {
      id: "facial-structure",
      title: "Facial Structure",
      score: 78,
      description: "Structural harmony and volume analysis",
      icon: <Target className="w-6 h-6" />,
      color: "blue",
      subcategories: [
        {
          id: "eyes",
          name: "Eyes",
          findings: [
            "Temporal Hollow",
            "Under Eye Hollow",
            "Upper Eye Hollow",
            "Lower Eyelid Sag",
            "Brow Asymmetry",
            "Excess Upper Eyelid Skin",
            "Negative Canthal Tilt",
          ],
        },
        {
          id: "cheeks",
          name: "Cheeks",
          findings: [
            "Mid Cheek Flattening",
            "Cheekbone - Not Prominent",
            "Lower Cheeks - Over-Filled",
          ],
        },
        {
          id: "lips",
          name: "Lips",
          findings: [
            "Thin Lips",
            "Asymmetric Lips",
            "Long Philtral Column",
            "Dry Lips",
            "Lip Thinning When Smiling",
            "Gummy Smile",
            "Lacking Philtral Column",
          ],
        },
        {
          id: "nose",
          name: "Nose",
          findings: [
            "Crooked Nose",
            "Dorsal Hump",
            "Over-Projected",
            "Over-Rotated",
            "Nasal Bone - Too Wide",
            "Nostril Base - Too Wide",
            "Nasal Tip Too Wide",
            "Tip Droop When Smiling",
          ],
        },
        {
          id: "jawline",
          name: "Jawline",
          findings: ["Jowls", "Ill-Defined Jawline", "Prejowl Sulcus"],
        },
        {
          id: "chin",
          name: "Chin",
          findings: [
            "Retruded Chin",
            "Over-Projected Chin",
            "Excess/Submental Fullness",
            "Masseter Hypertrophy",
          ],
        },
        {
          id: "forehead",
          name: "Forehead",
          findings: ["Temporal Hollow", "Brow Asymmetry"],
        },
        {
          id: "neck",
          name: "Neck",
          findings: [
            "Neck Lines",
            "Loose Neck Skin",
            "Obtuse Cervicomental Angle",
            "Platysmal Bands",
          ],
        },
      ],
    },
    {
      id: "skin-quality",
      title: "Skin Quality",
      score: 82,
      description: "Texture, tone, and aging pattern assessment",
      icon: <Sparkles className="w-6 h-6" />,
      color: "purple",
      subcategories: [
        {
          id: "wrinkles",
          name: "Wrinkles",
          findings: [
            "Forehead Wrinkles",
            "Crow's Feet Wrinkles",
            "Glabella Wrinkles",
            "Under Eye Wrinkles",
            "Perioral Wrinkles",
            "Bunny Lines",
          ],
        },
        {
          id: "pigmentation",
          name: "Pigmentation",
          findings: ["Dark Spots", "Red Spots", "Whiteheads", "Blackheads"],
        },
        {
          id: "texture",
          name: "Texture",
          findings: ["Dry Skin", "Crepey Skin", "Scars"],
        },
        {
          id: "hydration",
          name: "Hydration",
          findings: ["Dry Skin", "Dehydrated Skin", "Oiliness"],
        },
      ],
    },
  ];

  const treatments = {
    eyes: [
      {
        name: "Tear Trough Filler",
        price: "$800-1200",
        longevity: "12-18 months",
        downtime: "1-3 days",
        invasiveness: "Minimal",
        description: "Hyaluronic acid filler to restore under-eye volume",
        beforeAfter: {
          before: "/Sydney Adams Front.jpg",
          after: "/Sydney Adams Side.jpg",
        },
        benefits: ["Immediate results", "Natural look", "Minimal downtime"],
        risks: ["Bruising", "Swelling", "Rare vascular complications"],
      },
      {
        name: "Botox for Crow's Feet",
        price: "$300-500",
        longevity: "3-4 months",
        downtime: "None",
        invasiveness: "Minimal",
        description: "Botulinum toxin to reduce crow's feet wrinkles",
        beforeAfter: {
          before: "/Sydney Adams Front.jpg",
          after: "/Sydney Adams Side.jpg",
        },
        benefits: ["Prevents new wrinkles", "Quick treatment", "No downtime"],
        risks: ["Temporary weakness", "Headache", "Drooping (rare)"],
      },
    ],
    cheeks: [
      {
        name: "Cheek Filler (Juvederm Voluma)",
        price: "$1200-2000",
        longevity: "18-24 months",
        downtime: "3-7 days",
        invasiveness: "Minimal",
        description:
          "High-density filler to restore cheek volume and structure",
        beforeAfter: {
          before: "/Sydney Adams Front.jpg",
          after: "/Sydney Adams Side.jpg",
        },
        benefits: ["Long-lasting", "Natural lift", "Immediate results"],
        risks: ["Swelling", "Bruising", "Asymmetry risk"],
      },
    ],
    lips: [
      {
        name: "Lip Filler (Juvederm Ultra)",
        price: "$600-1000",
        longevity: "6-12 months",
        downtime: "2-5 days",
        invasiveness: "Minimal",
        description: "Hyaluronic acid filler to enhance lip volume and shape",
        beforeAfter: {
          before: "/Sydney Adams Front.jpg",
          after: "/Sydney Adams Side.jpg",
        },
        benefits: ["Natural enhancement", "Customizable shape", "Reversible"],
        risks: ["Swelling", "Bruising", "Lumpiness (rare)"],
      },
    ],
  };

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
      default:
        return {
          gradient: "from-gray-600 to-gray-800",
          bg: "bg-gray-600/20",
          border: "border-gray-500/50",
          text: "text-gray-400",
        };
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "minimal":
        return "text-green-400 bg-green-500/20";
      case "mild":
        return "text-yellow-400 bg-yellow-500/20";
      case "moderate":
        return "text-orange-400 bg-orange-500/20";
      case "severe":
        return "text-red-400 bg-red-500/20";
      default:
        return "text-gray-400 bg-gray-500/20";
    }
  };

  const currentArea = analysisAreas.find((area) => area.id === selectedArea);
  const currentSubcategory = currentArea?.subcategories.find(
    (sub) => sub.id === selectedSubcategory
  );
  const currentTreatments = selectedSubcategory
    ? treatments[selectedSubcategory as keyof typeof treatments] || []
    : [];

  const addToTreatmentPlan = (treatment: any) => {
    setTreatmentPlan((prev) => [...prev, { ...treatment, id: Date.now() }]);
  };

  const removeFromTreatmentPlan = (id: number) => {
    setTreatmentPlan((prev) => prev.filter((item) => item.id !== id));
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
      {/* Header - Compact */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-3 border-b border-gray-800"
      >
        <div className="flex items-center justify-between">
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
              <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                {patient.name}
              </h1>
              <p className="text-gray-400 text-sm">
                Patient ID: #{patient.id} • {patient.age} years old
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="secondary" size="sm">
              <Edit className="w-4 h-4 mr-1" />
              Edit
            </Button>
            <Button variant="secondary" size="sm">
              <Download className="w-4 h-4 mr-1" />
              Export
            </Button>
            <Button variant="secondary" size="sm">
              <Share className="w-4 h-4 mr-1" />
              Share
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main Content - Optimized Layout */}
      <div className="flex-1 overflow-hidden flex">
        {/* Left Side - Patient Photos and Info - More Compact */}
        <div className="w-1/4 p-3 flex flex-col items-center justify-start bg-gray-900/50">
          <div className="text-center mb-3">
            <h2 className="text-lg font-bold text-white mb-1">
              {patient.name}
            </h2>
            <p className="text-gray-400 text-sm">
              {patient.age} years old • {patient.profession || "Patient"}
            </p>
          </div>

          {/* Patient Photo with Toggle - Smaller */}
          <div className="relative mb-3">
            <motion.img
              key={isSideView ? "side" : "front"}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              src={isSideView ? patient.sideImage : patient.frontImage}
              alt={`${patient.name} ${isSideView ? "side" : "front"} view`}
              className="w-48 h-60 object-cover rounded-lg shadow-2xl"
            />
            <div
              className={`absolute inset-0 border-2 ${
                isSideView ? "border-purple-400" : "border-blue-400"
              } rounded-lg`}
            />
            <div
              className={`absolute bottom-2 left-2 ${
                isSideView ? "bg-purple-600" : "bg-blue-600"
              } text-white text-xs px-2 py-1 rounded`}
            >
              {isSideView ? "Side View" : "Front View"}
            </div>
          </div>

          {/* Photo Toggle Button - Fixed */}
          <Button
            variant="secondary"
            size="sm"
            className="mb-3"
            onClick={() => setIsSideView(!isSideView)}
          >
            <RotateCcw className="w-4 h-4 mr-1" />
            Switch to {isSideView ? "Front" : "Side"} View
          </Button>

          {/* Patient Info - Compact */}
          <div className="text-center text-sm space-y-2">
            <div className="flex items-center justify-center space-x-4">
              <div className="text-center">
                <div className="text-xs text-gray-400">Provider</div>
                <div className="text-white font-medium">Dr. Smith</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-400">Score</div>
                <div className="text-white font-medium">{patient.score}%</div>
              </div>
            </div>
            <div className="text-center">
              <button
                className="text-xs text-gray-400 hover:text-white transition-colors"
                onClick={() => {
                  // Show all findings in a modal or expand
                }}
              >
                {patient.findings?.length || 0} findings • View All
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Analysis and Treatment - More Space */}
        <div className="w-3/4 p-3 overflow-y-auto">
          {/* Area Selection - Compact */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white mb-3">
              Select Treatment Area
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {analysisAreas.map((area) => {
                const colorClasses = getColorClasses(area.color);
                return (
                  <button
                    key={area.id}
                    onClick={() => {
                      setSelectedArea(area.id);
                      setSelectedSubcategory("");
                    }}
                    className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                      selectedArea === area.id
                        ? `${colorClasses.bg} ${colorClasses.border} border-2`
                        : "bg-gray-800/50 border-gray-700 hover:border-gray-600"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className={`text-xl ${colorClasses.text}`}>
                        {area.icon}
                      </div>
                      <div className="text-left">
                        <span className="text-sm font-medium text-white">
                          {area.title}
                        </span>
                        <div className="text-xs text-gray-400">
                          {area.description}
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Subcategory Selection */}
          {currentArea && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-4"
            >
              <h3 className="text-lg font-semibold text-white mb-3">
                Select Specific Area
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {currentArea.subcategories.map((subcategory) => (
                  <button
                    key={subcategory.id}
                    onClick={() => setSelectedSubcategory(subcategory.id)}
                    className={`p-2 rounded-lg border transition-all duration-300 ${
                      selectedSubcategory === subcategory.id
                        ? "bg-blue-600/20 border-blue-500/50 text-blue-400"
                        : "bg-gray-800/50 border-gray-700 hover:border-gray-600 text-gray-300"
                    }`}
                  >
                    <span className="text-sm font-medium">
                      {subcategory.name}
                    </span>
                    <div className="text-xs text-gray-400 mt-1">
                      {subcategory.findings.length} findings
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Findings and Treatments */}
          {currentSubcategory && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="space-y-4"
            >
              {/* Findings */}
              <Card className="p-4 bg-gray-800/50 border-gray-700">
                <h4 className="text-lg font-semibold text-white mb-3">
                  Findings in {currentSubcategory.name}
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {currentSubcategory.findings.map((finding, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 p-2 bg-gray-700/30 rounded-lg"
                    >
                      <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                      <span className="text-sm text-gray-300">{finding}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Treatment Options */}
              {currentTreatments.length > 0 && (
                <Card className="p-4 bg-gray-800/50 border-gray-700">
                  <h4 className="text-lg font-semibold text-white mb-3">
                    Treatment Options
                  </h4>
                  <div className="space-y-4">
                    {currentTreatments.map((treatment, index) => (
                      <div
                        key={index}
                        className="p-4 bg-gray-700/30 rounded-lg border border-gray-600"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h5 className="text-lg font-semibold text-white mb-2">
                              {treatment.name}
                            </h5>
                            <p className="text-gray-300 text-sm mb-3">
                              {treatment.description}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => addToTreatmentPlan(treatment)}
                            className="ml-4"
                          >
                            <PlusCircle className="w-4 h-4 mr-1" />
                            Add to Plan
                          </Button>
                        </div>

                        {/* Treatment Details Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="text-center">
                            <DollarSign className="w-5 h-5 text-green-400 mx-auto mb-1" />
                            <div className="text-xs text-gray-400">Price</div>
                            <div className="text-sm font-medium text-white">
                              {treatment.price}
                            </div>
                          </div>
                          <div className="text-center">
                            <Clock className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                            <div className="text-xs text-gray-400">
                              Longevity
                            </div>
                            <div className="text-sm font-medium text-white">
                              {treatment.longevity}
                            </div>
                          </div>
                          <div className="text-center">
                            <Zap className="w-5 h-5 text-yellow-400 mx-auto mb-1" />
                            <div className="text-xs text-gray-400">
                              Downtime
                            </div>
                            <div className="text-sm font-medium text-white">
                              {treatment.downtime}
                            </div>
                          </div>
                          <div className="text-center">
                            <AlertTriangle className="w-5 h-5 text-orange-400 mx-auto mb-1" />
                            <div className="text-xs text-gray-400">
                              Invasiveness
                            </div>
                            <div className="text-sm font-medium text-white">
                              {treatment.invasiveness}
                            </div>
                          </div>
                        </div>

                        {/* Before/After Preview */}
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h6 className="text-sm font-medium text-white mb-2">
                              Before
                            </h6>
                            <div className="relative w-full h-24 rounded-lg overflow-hidden">
                              <img
                                src={treatment.beforeAfter.before}
                                alt="Before treatment"
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 border border-red-500/50 rounded-lg" />
                            </div>
                          </div>
                          <div>
                            <h6 className="text-sm font-medium text-white mb-2">
                              After
                            </h6>
                            <div className="relative w-full h-24 rounded-lg overflow-hidden">
                              <img
                                src={treatment.beforeAfter.after}
                                alt="After treatment"
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 border border-green-500/50 rounded-lg" />
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </motion.div>
          )}

          {/* Treatment Plan */}
          {treatmentPlan.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <Card className="p-4 bg-gradient-to-r from-green-600/10 to-blue-600/10 border border-green-500/30">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-lg font-semibold text-white">
                    Treatment Plan ({treatmentPlan.length} items)
                  </h4>
                  <div className="flex space-x-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setShowTreatmentPlan(!showTreatmentPlan)}
                    >
                      <FileText className="w-4 h-4 mr-1" />
                      {showTreatmentPlan ? "Hide" : "View"} Plan
                    </Button>
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-green-600 to-blue-600"
                    >
                      <Send className="w-4 h-4 mr-1" />
                      Export to EMR
                    </Button>
                  </div>
                </div>

                {showTreatmentPlan && (
                  <div className="space-y-2">
                    {treatmentPlan.map((item, index) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="font-medium text-white">
                            {item.name}
                          </div>
                          <div className="text-sm text-gray-400">
                            {item.price} • {item.longevity} • {item.downtime}
                          </div>
                        </div>
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => removeFromTreatmentPlan(item.id)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
