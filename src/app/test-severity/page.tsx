"use client";

import { AnalysisView } from "@/components/provider/AnalysisView";
import { SeverityScale, SeverityText } from "@/components/ui/SeverityScale";
import { Target } from "lucide-react";

// Mock patient data similar to what's in the patient detail page
const mockPatient = {
  id: "1001",
  name: "Sydney Adams",
  age: 28,
  email: "sydney.adams@email.com",
  phone: "(555) 123-4567",
  lastVisit: "2024-01-15",
  status: "active" as const,
  score: 78,
  color: "blue" as const,
  findings: [
    { name: "Forehead Wrinkles", severity: "moderate" as const, score: 70 },
    { name: "Dark Spots", severity: "mild" as const, score: 60 },
    { name: "Nasolabial Folds", severity: "moderate" as const, score: 75 },
  ],
  frontImage: "/Sydney Adams Front.png",
  sideImage: "/Sydney Adams Side.png",
  scanDate: "December 15, 2024",
};

const mockAnalysisAreas = [
  {
    id: "forehead",
    title: "Forehead",
    name: "Forehead",
    score: 70,
    description: "Forehead area analysis",
    icon: <Target className="w-5 h-5" />,
    color: "blue",
    subcategories: [],
    findings: [
      {
        name: "Forehead Wrinkles",
        severity: "moderate" as const,
        score: 70,
        description: "Horizontal lines across the forehead",
        commonality: 0.7,
        ageGroup: "25-45",
        causes: ["Facial expressions", "Sun damage", "Aging"],
        symptoms: ["Visible lines", "Skin creasing"],
        beforeAfter: [],
        treatments: ["Botox", "Filler", "Laser resurfacing"],
        educational:
          "Forehead wrinkles are common and can be treated effectively",
      },
    ],
  },
];

export default function TestSeverityPage() {
  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">
          Severity Scale Test - AnalysisView Component
        </h1>

        <div className="space-y-6">
          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">
              Direct Severity Scale Test
            </h2>
            <div className="space-y-4">
              <div>
                <span className="text-white">Score: 70%</span>
                <SeverityText score={70} className="ml-4" />
                <SeverityScale score={70} size="sm" showLabels={true} />
              </div>
            </div>
          </div>

          <div className="bg-gray-800 p-6 rounded-lg">
            <h2 className="text-xl font-semibold text-white mb-4">
              AnalysisView Component Test
            </h2>
            <AnalysisView
              analysisAreas={mockAnalysisAreas}
              patient={mockPatient}
              shortlist={[]}
              onAddToShortlist={() => {}}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
