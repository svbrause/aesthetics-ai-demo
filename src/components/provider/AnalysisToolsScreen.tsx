"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import {
  ArrowLeft,
  Upload,
  Camera,
  Brain,
  Target,
  Sparkles,
  Shield,
  Settings,
  Play,
  Pause,
  RotateCcw,
  Download,
  Share,
  Plus,
  Filter,
  Search,
} from "lucide-react";

interface AnalysisToolsScreenProps {
  onBack: () => void;
}

export function AnalysisToolsScreen({ onBack }: AnalysisToolsScreenProps) {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analysisTools = [
    {
      id: "facial-analysis",
      title: "Facial Structure Analysis",
      description:
        "AI-powered analysis of facial structure, symmetry, and volume",
      icon: <Target className="w-8 h-8" />,
      color: "blue",
      features: [
        "3D facial mapping",
        "Symmetry analysis",
        "Volume assessment",
        "Age progression modeling",
      ],
      status: "active",
    },
    {
      id: "skin-analysis",
      title: "Skin Quality Assessment",
      description:
        "Comprehensive skin texture, tone, and aging pattern analysis",
      icon: <Sparkles className="w-8 h-8" />,
      color: "purple",
      features: [
        "Pigmentation analysis",
        "Texture evaluation",
        "Pore assessment",
        "Wrinkle detection",
      ],
      status: "active",
    },
    {
      id: "preventive-care",
      title: "Preventive Care Planning",
      description: "Long-term aesthetic preservation and intervention strategy",
      icon: <Shield className="w-8 h-8" />,
      color: "green",
      features: [
        "Risk assessment",
        "Treatment planning",
        "Progress tracking",
        "Outcome prediction",
      ],
      status: "beta",
    },
    {
      id: "comparative-analysis",
      title: "Comparative Analysis",
      description:
        "Compare patients with similar profiles and treatment outcomes",
      icon: <Brain className="w-8 h-8" />,
      color: "orange",
      features: [
        "Patient matching",
        "Outcome comparison",
        "Treatment effectiveness",
        "Success rate analysis",
      ],
      status: "coming-soon",
    },
  ];

  const recentAnalyses = [
    {
      id: 1,
      patient: "Sydney Adams",
      tool: "Facial Structure Analysis",
      date: "2024-01-15",
      score: 78,
      status: "completed",
    },
    {
      id: 2,
      patient: "Chelsea Perry",
      tool: "Skin Quality Assessment",
      date: "2024-01-14",
      score: 62,
      status: "completed",
    },
    {
      id: 3,
      patient: "Maria Rodriguez",
      tool: "Preventive Care Planning",
      date: "2024-01-13",
      score: 85,
      status: "in-progress",
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/50";
      case "beta":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
      case "coming-soon":
        return "bg-gray-500/20 text-gray-400 border-gray-500/50";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/50";
    }
  };

  const handleStartAnalysis = (toolId: string) => {
    setSelectedTool(toolId);
    setIsAnalyzing(true);

    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false);
      setSelectedTool(null);
    }, 3000);
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
        className="p-4 border-b border-gray-800"
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
              <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Analysis Tools
              </h1>
              <p className="text-gray-400 text-sm">
                AI-powered aesthetic analysis and planning tools
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="secondary" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Plus className="w-4 h-4 mr-2" />
              New Analysis
            </Button>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search tools..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select className="px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
            <option value="all">All Tools</option>
            <option value="active">Active</option>
            <option value="beta">Beta</option>
            <option value="coming-soon">Coming Soon</option>
          </select>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Analysis Tools */}
          {analysisTools.map((tool, index) => {
            const colorClasses = getColorClasses(tool.color);
            const isSelected = selectedTool === tool.id;
            const isDisabled = tool.status === "coming-soon";

            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`p-6 ${colorClasses.bg} ${
                    colorClasses.border
                  } border transition-all duration-300 ${
                    isSelected ? "ring-2 ring-blue-500" : ""
                  } ${
                    isDisabled
                      ? "opacity-50 cursor-not-allowed"
                      : "hover:scale-105 cursor-pointer"
                  }`}
                  onClick={() => !isDisabled && handleStartAnalysis(tool.id)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-r ${colorClasses.gradient}`}
                      >
                        <div className="text-white">{tool.icon}</div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {tool.title}
                        </h3>
                        <p className="text-sm text-gray-400">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`px-2 py-1 rounded text-xs border ${getStatusColor(
                          tool.status
                        )}`}
                      >
                        {tool.status.replace("-", " ")}
                      </span>
                      {isSelected && isAnalyzing && (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    {tool.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center space-x-3 p-2 bg-gray-700/30 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex space-x-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        disabled={isDisabled}
                        className="text-xs"
                      >
                        <Download className="w-3 h-3 mr-1" />
                        Export
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        disabled={isDisabled}
                        className="text-xs"
                      >
                        <Share className="w-3 h-3 mr-1" />
                        Share
                      </Button>
                    </div>
                    <Button
                      className={`bg-gradient-to-r ${colorClasses.gradient} text-xs`}
                      disabled={isDisabled || isAnalyzing}
                    >
                      {isAnalyzing ? (
                        <>
                          <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin mr-2" />
                          Analyzing...
                        </>
                      ) : (
                        <>
                          <Play className="w-3 h-3 mr-1" />
                          Start
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Recent Analyses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <h2 className="text-lg font-semibold text-white mb-4">
            Recent Analyses
          </h2>
          <div className="space-y-3">
            {recentAnalyses.map((analysis, index) => (
              <Card
                key={analysis.id}
                className="p-4 bg-gray-800/50 border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                      <Brain className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">
                        {analysis.patient}
                      </h3>
                      <p className="text-sm text-gray-400">{analysis.tool}</p>
                      <p className="text-xs text-gray-500">{analysis.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <div className="text-lg font-bold text-white">
                        {analysis.score}%
                      </div>
                      <div className="text-xs text-gray-400">Score</div>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        analysis.status === "completed"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {analysis.status.replace("-", " ")}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
