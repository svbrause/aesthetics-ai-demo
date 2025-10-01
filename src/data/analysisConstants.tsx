import {
  Target,
  MapPin,
  Brain,
  Syringe,
  Droplets,
  Zap,
  Shield,
  Heart,
} from "lucide-react";

export interface AnalysisStep {
  id: string;
  title: string;
  description: string;
  duration: number;
  icon: React.ReactNode;
}

export interface AnalysisCategory {
  id: string;
  title: string;
  description: string;
  score: number;
  icon: React.ReactNode;
  issues: string[];
  suggestedTreatments: {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    priceRange: string;
  }[];
}

export const analysisSteps: AnalysisStep[] = [
  {
    id: "background",
    title: "Background Removal",
    description: "Isolating facial features for precise analysis",
    duration: 2000,
    icon: <Target className="w-4 h-4" />,
  },
  {
    id: "landmarks",
    title: "Facial Mapping",
    description: "Identifying key landmarks and symmetry points",
    duration: 2500,
    icon: <MapPin className="w-4 h-4" />,
  },
  {
    id: "analysis",
    title: "AI Analysis",
    description: "Processing 50+ aesthetic parameters",
    duration: 3000,
    icon: <Brain className="w-4 h-4" />,
  },
];

export const progressMessages = [
  "Processing image and removing background...",
  "Identifying facial landmarks and symmetry points...",
  "Analyzing skin texture and tone variations...",
  "Detecting dynamic expression lines...",
  "Assessing volume and contour changes...",
  "Evaluating facial proportions and asymmetry...",
  "Analyzing photoaging and pigmentation patterns...",
  "Detecting skin concerns and texture issues...",
  "Generating personalized clinical insights...",
  "Analysis complete! Building your comprehensive profile...",
];

export const analysisCategories: AnalysisCategory[] = [
  {
    id: "facial-structure",
    title: "Facial Structure Analysis",
    description: "Comprehensive anatomical assessment and symmetry evaluation",
    score: 78,
    icon: <Target className="w-5 h-5" />,
    issues: [
      "Mid Cheek Flattening (moderate volume loss)",
      "Temporal Hollow (visible volume loss)",
      "Under Eye Hollow (Grade 2 severity)",
      "Nasolabial Folds (Grade 1-2 severity)",
      "Prejowl Sulcus (volume loss requiring structural support)",
      "Brow Asymmetry (mild asymmetry in height and arch positioning)",
    ],
    suggestedTreatments: [
      {
        id: "hyaluronic-fillers",
        name: "Hyaluronic Acid Fillers",
        description:
          "Temporal hollow restoration, under-eye correction, mid-cheek enhancement",
        icon: <Syringe className="w-4 h-4" />,
        priceRange: "$1,400-2,500",
      },
      {
        id: "thread-lift",
        name: "Thread Lifting",
        description:
          "Jawline and midface lifting for skin laxity and contour improvement",
        icon: <Zap className="w-4 h-4" />,
        priceRange: "$2,500-4,000",
      },
      {
        id: "botox-structure",
        name: "Botox for Structure",
        description:
          "Masseter muscle treatment for jawline definition and facial contouring",
        icon: <Droplets className="w-4 h-4" />,
        priceRange: "$600-1,200",
      },
    ],
  },
  {
    id: "skin-quality",
    title: "Skin Quality Assessment",
    description:
      "Advanced skin analysis with facial analysis and clinical evaluation",
    score: 85,
    icon: <Brain className="w-5 h-5" />,
    issues: [
      "Photoaging (visible sun damage and aging signs)",
      "Dark Spots (pigmentation irregularities)",
      "Red Spots (vascular concerns identified)",
      "Dynamic Expression Lines (mild to moderate activity)",
      "Skin Texture (roughness and unevenness)",
      "Whiteheads (minor comedonal acne present)",
    ],
    suggestedTreatments: [
      {
        id: "medical-skincare",
        name: "Medical-Grade Skincare Protocol",
        description:
          "Tretinoin, Vitamin C, Niacinamide, SPF 50+, Hyaluronic Acid",
        icon: <Droplets className="w-4 h-4" />,
        priceRange: "$450-650",
      },
      {
        id: "botox-skin",
        name: "Botox Treatment",
        description: "Forehead, glabella, crow's feet to prevent dynamic lines",
        icon: <Syringe className="w-4 h-4" />,
        priceRange: "$400-800",
      },
      {
        id: "chemical-peels",
        name: "Chemical Peels",
        description:
          "Monthly treatments for dark spots, texture improvement, and skin renewal",
        icon: <Brain className="w-4 h-4" />,
        priceRange: "$300-600",
      },
      {
        id: "microneedling-prp",
        name: "Microneedling with PRP",
        description:
          "Quarterly treatments to stimulate collagen and improve skin quality",
        icon: <Zap className="w-4 h-4" />,
        priceRange: "$600-1,200",
      },
    ],
  },
  {
    id: "preventative-care",
    title: "Preventative Care Strategy",
    description:
      "Evidence-based preventive protocols and long-term maintenance planning",
    score: 72,
    icon: <Shield className="w-5 h-5" />,
    issues: [
      "Early Intervention Opportunity (ideal candidate for preventive protocols)",
      "Lifestyle Factor Integration (professional appearance requirements)",
      "Long-term Aesthetic Preservation Strategy",
      "Skincare Foundation Assessment (current regimen evaluation)",
      "Sun Protection Habits (SPF usage and sun exposure patterns)",
      "Preventive Treatment Readiness (willingness for maintenance)",
    ],
    suggestedTreatments: [
      {
        id: "comprehensive-assessment",
        name: "Comprehensive Clinical Assessment",
        description:
          "60-minute consultation with VISIA imaging, baseline photography, and treatment planning",
        icon: <Target className="w-4 h-4" />,
        priceRange: "$500-800",
      },
      {
        id: "preventive-protocol",
        name: "Preventive Treatment Protocol",
        description:
          "Early intervention with Botox, targeted fillers, and medical skincare",
        icon: <Shield className="w-4 h-4" />,
        priceRange: "$1,400-2,000",
      },
      {
        id: "maintenance-planning",
        name: "Long-term Maintenance Planning",
        description:
          "Annual strategy development and ongoing treatment optimization",
        icon: <Heart className="w-4 h-4" />,
        priceRange: "$300-500",
      },
    ],
  },
];

// Demo patient data mapping
export const getPatientAnalysis = (patientName: string) => {
  const patientData: Record<string, { findings: string[] }> = {
    "Sydney Adams": {
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
    "Chelsea Perry": {
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
  };

  return patientData[patientName] || { findings: [] };
};
