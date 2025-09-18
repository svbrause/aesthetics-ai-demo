"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { CustomSelect } from "@/components/ui/CustomSelect";
import { TreatmentPlanPopup } from "./TreatmentPlanPopup";
import {
  ArrowLeft,
  Eye,
  Target,
  Sparkles,
  Shield,
  RotateCcw,
  Filter,
  Search,
  Star,
  Plus,
  Heart,
  X,
  Calendar,
  DollarSign,
  Clock,
  Zap,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  Sliders,
  Grid,
  List,
  Bookmark,
  Bed,
  Activity,
  FileText,
  Send,
  Download,
  Share,
  Edit,
  Play,
  Pause,
  RefreshCw,
} from "lucide-react";
import { getFindingImage, getFallbackFindingImage } from "@/lib/findingImages";

interface PatientDetailScreenV2Props {
  patient: any;
  onBack: () => void;
  onOpenAreaAnalysis: (area: string) => void;
}

type ViewMode = "analysis" | "treatments" | "treatment-plan";

export function PatientDetailScreenV2({
  patient,
  onBack,
  onOpenAreaAnalysis,
}: PatientDetailScreenV2Props) {
  const [isSideView, setIsSideView] = useState(false);
  const [currentView, setCurrentView] = useState<ViewMode>("analysis");
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedGoal, setSelectedGoal] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [modality, setModality] = useState("");
  const [shortlist, setShortlist] = useState<any[]>([]);
  const [treatmentPlan, setTreatmentPlan] = useState<any[]>(() => {
    // Default treatment plans for demo patients
    const defaultPlans: Record<string, any[]> = {
      "Sydney Adams": [
        {
          id: "botox-forehead",
          name: "Botox",
          notes: "40 units for forehead and glabella lines",
          areas: ["Forehead"],
          quantity: "40",
          unit: "units",
          price: "400-600",
          duration: "3-4 months",
          downtime: "None",
          invasiveness: "Minimal",
        },
        {
          id: "juvederm-voluma",
          name: "Juvederm Voluma",
          notes: "2.5ml for mid cheek enhancement and jawline definition",
          areas: ["Cheeks", "Jawline"],
          quantity: "2.5",
          unit: "ml",
          price: "1200-1500",
          duration: "12-18 months",
          downtime: "1-2 days",
          invasiveness: "Moderate",
        },
      ],
      "Chelsea Perry": [
        {
          id: "botox-comprehensive",
          name: "Botox",
          notes: "50 units for comprehensive facial rejuvenation",
          areas: ["Forehead", "Eyes", "Lips"],
          quantity: "50",
          unit: "units",
          price: "500-750",
          duration: "3-4 months",
          downtime: "None",
          invasiveness: "Minimal",
        },
        {
          id: "restylane-lips",
          name: "Restylane",
          notes: "1ml for lip enhancement and philtral column definition",
          areas: ["Lips"],
          quantity: "1",
          unit: "ml",
          price: "600-800",
          duration: "6-9 months",
          downtime: "1-2 days",
          invasiveness: "Minimal",
        },
      ],
    };
    return defaultPlans[patient?.name] || [];
  });
  const [showFilters, setShowFilters] = useState(true);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [addedToPlan, setAddedToPlan] = useState<Set<string>>(new Set());
  const [showTreatmentPopup, setShowTreatmentPopup] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState<any>(null);
  const [showAllAreas, setShowAllAreas] = useState(false);
  const [showAllAnalysisAreas, setShowAllAnalysisAreas] = useState(false);
  const [showOnlyInterestedAreas, setShowOnlyInterestedAreas] = useState(true);
  const [expandedInterestItems, setExpandedInterestItems] = useState<
    Set<string>
  >(new Set());
  const [expandedTreatmentItems, setExpandedTreatmentItems] = useState<
    Set<string>
  >(new Set());

  if (!patient) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-gray-400">No patient selected</p>
      </div>
    );
  }

  const analysisAreas = [
    {
      id: "forehead",
      name: "Forehead",
      icon: <Target className="w-5 h-5" />,
      color: "blue",
      findings: [
        {
          name: "Temporal Hollow",
          score: 68,
          severity: "moderate",
          description:
            "Volume loss in temporal region affecting facial contour and creating a sunken appearance",
          commonality: 72,
          ageGroup: "30-40",
          causes: ["Natural aging", "Volume loss", "Bone resorption"],
          symptoms: [
            "Sunken temples",
            "Prominent cheekbones",
            "Facial asymmetry",
          ],
          beforeAfter: [
            {
              before: "/Sydney Adams Front.png",
              after: "/Sydney Adams Side.png",
              label: "Temporal Filler",
            },
            {
              before: "/Chelsea Perry Front.png",
              after: "/Chelsea Perry Side.png",
              label: "Fat Grafting",
            },
          ],
          treatments: ["Temporal filler", "Fat grafting", "Sculptra"],
          educational:
            "Temporal hollowing is very common in your age group, affecting approximately 72% of people aged 30-40. This occurs due to natural volume loss and bone resorption that begins in the late 20s.",
        },
        {
          name: "Brow Asymmetry",
          score: 72,
          severity: "moderate",
          description:
            "Asymmetric brow positioning affecting facial balance and expression",
          commonality: 45,
          ageGroup: "30-45",
          causes: ["Muscle imbalance", "Bone asymmetry", "Previous trauma"],
          symptoms: [
            "Uneven brows",
            "Asymmetric expression",
            "Facial imbalance",
          ],
          beforeAfter: [
            {
              before: "/Sydney Adams Front.png",
              after: "/Sydney Adams Side.png",
              label: "Botox Brow Lift",
            },
            {
              before: "/Chelsea Perry Front.png",
              after: "/Chelsea Perry Side.png",
              label: "Thread Lift",
            },
          ],
          treatments: ["Botox brow lift", "Thread lift", "Brow surgery"],
          educational:
            "Brow asymmetry affects about 45% of people aged 30-45. This can be caused by muscle imbalances or natural facial asymmetry.",
        },
        {
          name: "Flat Forehead",
          score: 65,
          severity: "mild",
          description:
            "Lack of forehead projection affecting facial profile and balance",
          commonality: 40,
          ageGroup: "25-40",
          causes: ["Genetic factors", "Bone structure", "Volume loss"],
          symptoms: [
            "Flat appearance",
            "Lack of definition",
            "Profile imbalance",
          ],
          beforeAfter: [
            {
              before: "/Sydney Adams Front.png",
              after: "/Sydney Adams Side.png",
              label: "Forehead Filler",
            },
            {
              before: "/Chelsea Perry Front.png",
              after: "/Chelsea Perry Side.png",
              label: "Fat Grafting",
            },
          ],
          treatments: ["Forehead filler", "Fat grafting", "Bone augmentation"],
          educational:
            "About 40% of people aged 25-40 have a flatter forehead. This can be genetic or due to natural bone structure.",
        },
        {
          name: "Brow Ptosis",
          score: 70,
          severity: "moderate",
          description:
            "Drooping eyebrows affecting eye appearance and facial expression",
          commonality: 55,
          ageGroup: "35-50",
          causes: ["Aging", "Muscle weakness", "Skin laxity"],
          symptoms: ["Drooping brows", "Tired appearance", "Heavy eyelids"],
          beforeAfter: [
            {
              before: "/Sydney Adams Front.png",
              after: "/Sydney Adams Side.png",
              label: "Brow Lift",
            },
            {
              before: "/Chelsea Perry Front.png",
              after: "/Chelsea Perry Side.png",
              label: "Thread Lift",
            },
          ],
          treatments: ["Brow lift", "Thread lift", "Botox"],
          educational:
            "Brow ptosis affects 55% of people aged 35-50. This is a natural part of aging as the brow muscles weaken over time.",
        },
      ],
    },
    {
      id: "eyes",
      name: "Eyes",
      icon: <Eye className="w-5 h-5" />,
      color: "blue",
      findings: [
        {
          name: "Under Eye Dark Circles",
          score: 75,
          severity: "mild",
          description:
            "Dark pigmentation under the eyes affecting appearance and creating a tired look",
          commonality: 85,
          ageGroup: "25-45",
          causes: ["Genetics", "Thin skin", "Fatigue", "Allergies"],
          symptoms: ["Dark circles", "Tired appearance", "Hollowed look"],
          beforeAfter: [
            {
              before: "/Sydney Adams Front.png",
              after: "/Sydney Adams Side.png",
              label: "Tear Trough Filler",
            },
            {
              before: "/Chelsea Perry Front.png",
              after: "/Chelsea Perry Side.png",
              label: "Lower Blepharoplasty",
            },
          ],
          treatments: ["Tear trough filler", "Lower blepharoplasty", "PRP"],
          educational:
            "Under eye dark circles affect 85% of people aged 25-45. This can be genetic or due to thin skin and visible blood vessels.",
        },
        {
          name: "Under Eye Hollow",
          score: 75,
          severity: "mild",
          description:
            "Grade 2 severity requiring structural support and volume restoration",
          commonality: 85,
          ageGroup: "25-35",
          causes: ["Fat pad descent", "Volume loss", "Bone changes"],
          symptoms: ["Dark circles", "Tired appearance", "Hollowed appearance"],
          beforeAfter: [
            {
              before: "/Sydney Adams Front.png",
              after: "/Sydney Adams Side.png",
              label: "Tear Trough Filler",
            },
            {
              before: "/Chelsea Perry Front.png",
              after: "/Chelsea Perry Side.png",
              label: "Lower Blepharoplasty",
            },
          ],
          treatments: [
            "Tear trough filler",
            "Lower blepharoplasty",
            "Fat repositioning",
          ],
          educational:
            "Under eye hollowing affects 85% of people in your age group (25-35). This is one of the most common concerns and can significantly impact your overall appearance.",
        },
        {
          name: "Excess Upper Eyelid Skin",
          score: 70,
          severity: "moderate",
          description:
            "Excess skin on upper eyelids affecting eye appearance and vision",
          commonality: 60,
          ageGroup: "40-60",
          causes: ["Aging", "Skin laxity", "Gravity"],
          symptoms: ["Heavy eyelids", "Tired appearance", "Vision obstruction"],
          beforeAfter: [
            {
              before: "/Sydney Adams Front.png",
              after: "/Sydney Adams Side.png",
              label: "Upper Blepharoplasty",
            },
            {
              before: "/Chelsea Perry Front.png",
              after: "/Chelsea Perry Side.png",
              label: "Laser Resurfacing",
            },
          ],
          treatments: [
            "Upper blepharoplasty",
            "Laser resurfacing",
            "Thread lift",
          ],
          educational:
            "Excess upper eyelid skin affects 60% of people aged 40-60. This is a natural part of aging as the skin loses elasticity.",
        },
        {
          name: "Lower Eyelid Bags",
          score: 65,
          severity: "moderate",
          description: "Puffiness and bags under the eyes affecting appearance",
          commonality: 70,
          ageGroup: "30-50",
          causes: ["Fat herniation", "Aging", "Genetics"],
          symptoms: ["Puffy eyes", "Tired appearance", "Aging look"],
          beforeAfter: [
            {
              before: "/Sydney Adams Front.png",
              after: "/Sydney Adams Side.png",
              label: "Lower Blepharoplasty",
            },
            {
              before: "/Chelsea Perry Front.png",
              after: "/Chelsea Perry Side.png",
              label: "Fat Repositioning",
            },
          ],
          treatments: [
            "Lower blepharoplasty",
            "Fat repositioning",
            "Laser treatment",
          ],
          educational:
            "Lower eyelid bags affect 70% of people aged 30-50. This is often due to fat herniation and can be effectively treated with surgery.",
        },
      ],
    },
    {
      id: "nose",
      name: "Nose",
      icon: <Target className="w-5 h-5" />,
      color: "purple",
      findings: [
        {
          name: "Crooked Nose",
          score: 60,
          severity: "moderate",
          description: "Nasal deviation affecting facial symmetry and profile",
          commonality: 30,
          ageGroup: "All ages",
          causes: ["Genetics", "Trauma", "Birth defects"],
          symptoms: [
            "Asymmetric nose",
            "Profile imbalance",
            "Breathing issues",
          ],
          beforeAfter: [
            {
              before: "/Sydney Adams Front.png",
              after: "/Sydney Adams Side.png",
              label: "Rhinoplasty",
            },
            {
              before: "/Chelsea Perry Front.png",
              after: "/Chelsea Perry Side.png",
              label: "Non-surgical Rhinoplasty",
            },
          ],
          treatments: ["Rhinoplasty", "Non-surgical rhinoplasty", "Filler"],
          educational:
            "Crooked nose affects 30% of people. This can be genetic or due to trauma and may affect both appearance and breathing.",
        },
        {
          name: "Droopy Tip",
          score: 55,
          severity: "mild",
          description:
            "Nasal tip that points downward affecting profile and appearance",
          commonality: 40,
          ageGroup: "25-50",
          causes: ["Aging", "Genetics", "Cartilage weakness"],
          symptoms: [
            "Downward pointing tip",
            "Aging appearance",
            "Profile imbalance",
          ],
          beforeAfter: [
            {
              before: "/Sydney Adams Front.png",
              after: "/Sydney Adams Side.png",
              label: "Tip Rhinoplasty",
            },
            {
              before: "/Chelsea Perry Front.png",
              after: "/Chelsea Perry Side.png",
              label: "Thread Lift",
            },
          ],
          treatments: ["Tip rhinoplasty", "Thread lift", "Filler"],
          educational:
            "Droopy tip affects 40% of people aged 25-50. This can be genetic or develop with age as cartilage weakens.",
        },
        {
          name: "Dorsal Hump",
          score: 65,
          severity: "moderate",
          description:
            "Bump on the nasal bridge affecting profile and appearance",
          commonality: 35,
          ageGroup: "All ages",
          causes: ["Genetics", "Trauma", "Bone structure"],
          symptoms: [
            "Nasal bump",
            "Profile imbalance",
            "Asymmetric appearance",
          ],
          beforeAfter: [
            {
              before: "/Sydney Adams Front.png",
              after: "/Sydney Adams Side.png",
              label: "Rhinoplasty",
            },
            {
              before: "/Chelsea Perry Front.png",
              after: "/Chelsea Perry Side.png",
              label: "Non-surgical Correction",
            },
          ],
          treatments: ["Rhinoplasty", "Non-surgical correction", "Filler"],
          educational:
            "Dorsal hump affects 35% of people. This is often genetic and can be corrected with surgical or non-surgical methods.",
        },
      ],
    },
    {
      id: "cheeks",
      name: "Cheeks",
      icon: <Target className="w-5 h-5" />,
      color: "purple",
      findings: [
        {
          name: "Mid Cheek Flattening",
          score: 72,
          severity: "moderate",
          description:
            "Anterior malar fat pad descent causing loss of cheek volume and definition",
          commonality: 68,
          ageGroup: "30-45",
          causes: ["Fat pad descent", "Volume loss", "Gravity effects"],
          symptoms: [
            "Flattened cheeks",
            "Loss of definition",
            "Aging appearance",
          ],
          beforeAfter: [
            {
              before: "/Sydney Adams Front.png",
              after: "/Sydney Adams Side.png",
              label: "Cheek Filler",
            },
            {
              before: "/Chelsea Perry Front.png",
              after: "/Chelsea Perry Side.png",
              label: "Fat Grafting",
            },
          ],
          treatments: ["Cheek filler", "Fat grafting", "Thread lift"],
          educational:
            "Mid cheek flattening affects 68% of people aged 30-45. This is a natural part of aging as the malar fat pad descends over time.",
        },
        {
          name: "Cheekbone - Not Prominent",
          score: 65,
          severity: "moderate",
          description:
            "Lack of cheekbone definition affecting facial structure and contour",
          commonality: 55,
          ageGroup: "25-40",
          causes: ["Genetic factors", "Bone structure", "Volume loss"],
          symptoms: [
            "Flat cheekbones",
            "Lack of definition",
            "Less defined face",
          ],
          beforeAfter: [
            {
              before: "/Sydney Adams Front.png",
              after: "/Sydney Adams Side.png",
              label: "Cheekbone Filler",
            },
            {
              before: "/Chelsea Perry Front.png",
              after: "/Chelsea Perry Side.png",
              label: "Cheek Implants",
            },
          ],
          treatments: ["Cheekbone filler", "Cheek implants", "Fat grafting"],
          educational:
            "About 55% of people aged 25-40 have less prominent cheekbones. This can be genetic or due to volume loss over time.",
        },
        {
          name: "Heavy Lateral Cheek",
          score: 60,
          severity: "mild",
          description:
            "Excess fullness in the lateral cheek area affecting facial contour",
          commonality: 45,
          ageGroup: "30-50",
          causes: ["Genetics", "Weight gain", "Aging"],
          symptoms: ["Full cheeks", "Round face", "Lack of definition"],
          beforeAfter: [
            {
              before: "/Sydney Adams Front.png",
              after: "/Sydney Adams Side.png",
              label: "Buccal Fat Removal",
            },
            {
              before: "/Chelsea Perry Front.png",
              after: "/Chelsea Perry Side.png",
              label: "Masseter Botox",
            },
          ],
          treatments: ["Buccal fat removal", "Masseter Botox", "Thread lift"],
          educational:
            "Heavy lateral cheek affects 45% of people aged 30-50. This can be genetic or due to weight gain and aging.",
        },
      ],
    },
    {
      id: "lips",
      name: "Lips",
      icon: <Sparkles className="w-5 h-5" />,
      color: "pink",
      findings: [
        {
          name: "Thin Lips",
          score: 78,
          severity: "mild",
          description:
            "Reduced lip volume affecting facial proportion and expression",
          commonality: 60,
          ageGroup: "25-50",
          causes: ["Natural aging", "Volume loss", "Genetic factors"],
          symptoms: ["Thin appearance", "Less defined shape", "Aging look"],
          beforeAfter: [
            {
              before: "/Sydney Adams Front.png",
              after: "/Sydney Adams Side.png",
              label: "Lip Filler",
            },
            {
              before: "/Chelsea Perry Front.png",
              after: "/Chelsea Perry Side.png",
              label: "Lip Lift",
            },
          ],
          treatments: ["Lip filler", "Lip lift", "Fat grafting"],
          educational:
            "Thin lips affect about 60% of people aged 25-50. This can be genetic or due to natural volume loss over time.",
        },
        {
          name: "Dry Lips",
          score: 82,
          severity: "minimal",
          description:
            "Dehydration concerns affecting lip texture and appearance",
          commonality: 90,
          ageGroup: "All ages",
          causes: ["Dehydration", "Weather", "Habits"],
          symptoms: ["Chapped lips", "Rough texture", "Discomfort"],
          beforeAfter: [
            {
              before: "/Sydney Adams Front.png",
              after: "/Sydney Adams Side.png",
              label: "Hydration Treatment",
            },
          ],
          treatments: ["Hydration therapy", "Lip masks", "Topical treatments"],
          educational:
            "Dry lips affect 90% of people at some point. This is often due to environmental factors and can be easily treated.",
        },
        {
          name: "Asymmetric Lips",
          score: 70,
          severity: "moderate",
          description:
            "Uneven lip shape affecting facial symmetry and expression",
          commonality: 35,
          ageGroup: "All ages",
          causes: ["Genetics", "Trauma", "Previous procedures"],
          symptoms: ["Uneven lips", "Asymmetric smile", "Facial imbalance"],
          beforeAfter: [
            {
              before: "/Sydney Adams Front.png",
              after: "/Sydney Adams Side.png",
              label: "Lip Filler",
            },
            {
              before: "/Chelsea Perry Front.png",
              after: "/Chelsea Perry Side.png",
              label: "Lip Surgery",
            },
          ],
          treatments: ["Lip filler", "Lip surgery", "Botox"],
          educational:
            "Asymmetric lips affect 35% of people. This can be genetic or due to trauma and can be corrected with various treatments.",
        },
      ],
    },
    {
      id: "jawline",
      name: "Jawline",
      icon: <Target className="w-5 h-5" />,
      color: "green",
      findings: [
        {
          name: "Retruded Chin",
          score: 65,
          severity: "moderate",
          description:
            "Recessed chin affecting facial profile and jawline definition",
          commonality: 50,
          ageGroup: "All ages",
          causes: ["Genetics", "Bone structure", "Aging"],
          symptoms: ["Weak chin", "Profile imbalance", "Jawline definition"],
          beforeAfter: [
            {
              before: "/Sydney Adams Front.png",
              after: "/Sydney Adams Side.png",
              label: "Chin Filler",
            },
            {
              before: "/Chelsea Perry Front.png",
              after: "/Chelsea Perry Side.png",
              label: "Chin Implant",
            },
          ],
          treatments: ["Chin filler", "Chin implant", "Genioplasty"],
          educational:
            "Retruded chin affects 50% of people. This is often genetic and can significantly impact facial profile and jawline definition.",
        },
        {
          name: "Jowls",
          score: 70,
          severity: "moderate",
          description:
            "Sagging skin along the jawline affecting facial contour",
          commonality: 60,
          ageGroup: "40-60",
          causes: ["Aging", "Skin laxity", "Gravity"],
          symptoms: ["Sagging skin", "Loss of definition", "Aging appearance"],
          beforeAfter: [
            {
              before: "/Sydney Adams Front.png",
              after: "/Sydney Adams Side.png",
              label: "Thread Lift",
            },
            {
              before: "/Chelsea Perry Front.png",
              after: "/Chelsea Perry Side.png",
              label: "Facelift",
            },
          ],
          treatments: ["Thread lift", "Facelift", "Ultherapy"],
          educational:
            "Jowls affect 60% of people aged 40-60. This is a natural part of aging as the skin loses elasticity and gravity takes effect.",
        },
        {
          name: "Ill-Defined Jawline",
          score: 60,
          severity: "mild",
          description:
            "Lack of jawline definition affecting facial contour and structure",
          commonality: 45,
          ageGroup: "25-45",
          causes: ["Genetics", "Weight gain", "Aging"],
          symptoms: ["Soft jawline", "Lack of definition", "Round face"],
          beforeAfter: [
            {
              before: "/Sydney Adams Front.png",
              after: "/Sydney Adams Side.png",
              label: "Jawline Filler",
            },
            {
              before: "/Chelsea Perry Front.png",
              after: "/Chelsea Perry Side.png",
              label: "Masseter Botox",
            },
          ],
          treatments: ["Jawline filler", "Masseter Botox", "Thread lift"],
          educational:
            "Ill-defined jawline affects 45% of people aged 25-45. This can be genetic or due to weight gain and can be improved with various treatments.",
        },
        {
          name: "Masseter Hypertrophy",
          score: 55,
          severity: "mild",
          description:
            "Enlarged masseter muscles affecting jawline contour and facial width",
          commonality: 40,
          ageGroup: "20-40",
          causes: ["Genetics", "Teeth grinding", "Stress"],
          symptoms: ["Wide jaw", "Square face", "Muscle tension"],
          beforeAfter: [
            {
              before: "/Sydney Adams Front.png",
              after: "/Sydney Adams Side.png",
              label: "Masseter Botox",
            },
            {
              before: "/Chelsea Perry Front.png",
              after: "/Chelsea Perry Side.png",
              label: "Masseter Reduction",
            },
          ],
          treatments: ["Masseter Botox", "Masseter reduction", "Thread lift"],
          educational:
            "Masseter hypertrophy affects 40% of people aged 20-40. This can be genetic or due to teeth grinding and stress.",
        },
      ],
    },
    {
      id: "neck",
      name: "Neck",
      icon: <Shield className="w-5 h-5" />,
      color: "green",
      findings: [
        {
          name: "Loose Neck Skin",
          score: 70,
          severity: "moderate",
          description:
            "Excess skin on the neck affecting appearance and contour",
          commonality: 65,
          ageGroup: "40-60",
          causes: ["Aging", "Weight loss", "Genetics"],
          symptoms: ["Sagging skin", "Turkey neck", "Aging appearance"],
          beforeAfter: [
            {
              before: "/Sydney Adams Front.png",
              after: "/Sydney Adams Side.png",
              label: "Neck Lift",
            },
            {
              before: "/Chelsea Perry Front.png",
              after: "/Chelsea Perry Side.png",
              label: "Ultherapy",
            },
          ],
          treatments: ["Neck lift", "Ultherapy", "Thread lift"],
          educational:
            "Loose neck skin affects 65% of people aged 40-60. This is a natural part of aging as the skin loses elasticity.",
        },
        {
          name: "Platysmal Bands",
          score: 60,
          severity: "moderate",
          description:
            "Vertical bands on the neck affecting appearance and contour",
          commonality: 55,
          ageGroup: "35-55",
          causes: ["Aging", "Muscle weakness", "Genetics"],
          symptoms: ["Vertical bands", "Neck aging", "Contour issues"],
          beforeAfter: [
            {
              before: "/Sydney Adams Front.png",
              after: "/Sydney Adams Side.png",
              label: "Botox",
            },
            {
              before: "/Chelsea Perry Front.png",
              after: "/Chelsea Perry Side.png",
              label: "Neck Lift",
            },
          ],
          treatments: ["Botox", "Neck lift", "Thread lift"],
          educational:
            "Platysmal bands affect 55% of people aged 35-55. This is due to muscle weakness and can be effectively treated with Botox or surgery.",
        },
        {
          name: "Excess/Submental Fullness",
          score: 65,
          severity: "moderate",
          description:
            "Excess fat under the chin affecting neck contour and profile",
          commonality: 60,
          ageGroup: "30-50",
          causes: ["Genetics", "Weight gain", "Aging"],
          symptoms: ["Double chin", "Neck fullness", "Profile issues"],
          beforeAfter: [
            {
              before: "/Sydney Adams Front.png",
              after: "/Sydney Adams Side.png",
              label: "Kybella",
            },
            {
              before: "/Chelsea Perry Front.png",
              after: "/Chelsea Perry Side.png",
              label: "Liposuction",
            },
          ],
          treatments: ["Kybella", "Liposuction", "CoolSculpting"],
          educational:
            "Submental fullness affects 60% of people aged 30-50. This can be genetic or due to weight gain and can be treated with various methods.",
        },
      ],
    },
    {
      id: "skin",
      name: "Skin",
      icon: <Shield className="w-5 h-5" />,
      color: "green",
      findings: [
        {
          name: "Dark Spots",
          score: 78,
          severity: "mild",
          description:
            "Pigmentation irregularities affecting skin tone and clarity",
          commonality: 75,
          ageGroup: "30-50",
          causes: ["Sun exposure", "Hormonal changes", "Aging"],
          symptoms: ["Uneven skin tone", "Dark patches", "Aging appearance"],
          beforeAfter: [
            {
              before: "/Sydney Adams Front.png",
              after: "/Sydney Adams Side.png",
              label: "IPL Treatment",
            },
            {
              before: "/Chelsea Perry Front.png",
              after: "/Chelsea Perry Side.png",
              label: "Chemical Peel",
            },
          ],
          treatments: ["IPL treatment", "Chemical peels", "Topical treatments"],
          educational:
            "Dark spots affect 75% of people aged 30-50, primarily due to sun exposure and hormonal changes.",
        },
        {
          name: "Wrinkles",
          score: 75,
          severity: "mild",
          description:
            "Fine line development affecting skin smoothness and youthfulness",
          commonality: 80,
          ageGroup: "25-45",
          causes: ["Aging", "Sun exposure", "Facial expressions"],
          symptoms: ["Fine lines", "Crepey skin", "Aging appearance"],
          beforeAfter: [
            {
              before: "/Sydney Adams Front.png",
              after: "/Sydney Adams Side.png",
              label: "Botox",
            },
            {
              before: "/Chelsea Perry Front.png",
              after: "/Chelsea Perry Side.png",
              label: "Microneedling",
            },
          ],
          treatments: ["Botox", "Microneedling", "Laser treatments"],
          educational:
            "Wrinkles affect 80% of people aged 25-45. This is a natural part of aging but can be effectively treated.",
        },
        {
          name: "Red Spots",
          score: 70,
          severity: "mild",
          description: "Vascular concerns affecting skin appearance and tone",
          commonality: 60,
          ageGroup: "25-45",
          causes: ["Genetics", "Sun exposure", "Aging"],
          symptoms: ["Red patches", "Uneven tone", "Vascular issues"],
          beforeAfter: [
            {
              before: "/Sydney Adams Front.png",
              after: "/Sydney Adams Side.png",
              label: "IPL Treatment",
            },
            {
              before: "/Chelsea Perry Front.png",
              after: "/Chelsea Perry Side.png",
              label: "Laser Treatment",
            },
          ],
          treatments: [
            "IPL treatment",
            "Laser treatment",
            "Topical treatments",
          ],
          educational:
            "Red spots affect 60% of people aged 25-45. This is often due to sun exposure and can be effectively treated with light-based therapies.",
        },
      ],
    },
  ];

  // Get interested areas based on patient findings
  const getInterestedAreas = () => {
    const interestedAreas = new Set<string>();
    patient.findings.forEach((finding: string) => {
      const area = analysisAreas.find((area) =>
        area.findings.some((f) => f.name === finding)
      );
      if (area) {
        interestedAreas.add(area.id);
      }
    });
    return Array.from(interestedAreas);
  };

  const allInterestedAreas = getInterestedAreas();

  // Calculate area scores based on findings
  const calculateAreaScore = (area: any) => {
    const areaFindings = area.findings.filter((finding: any) =>
      patient.findings.includes(finding.name)
    );

    if (areaFindings.length === 0) return 100; // Perfect score if no issues

    const totalScore = areaFindings.reduce(
      (sum: number, finding: any) => sum + finding.score,
      0
    );
    const averageScore = totalScore / areaFindings.length;
    return Math.round(averageScore);
  };

  // Calculate overall patient score
  const calculateOverallScore = () => {
    if (!patient.findings || patient.findings.length === 0) return 100;

    const allAreaScores = analysisAreas.map((area) => calculateAreaScore(area));
    const averageScore =
      allAreaScores.reduce((sum, score) => sum + score, 0) /
      allAreaScores.length;
    return Math.round(averageScore);
  };

  const overallScore = patient.score || calculateOverallScore();

  // Show all areas by default, but highlight interested areas
  const interestedAreas = analysisAreas
    .filter((area) => allInterestedAreas.includes(area.id))
    .sort((a, b) => calculateAreaScore(a) - calculateAreaScore(b)) // Sort by score ascending (worst first)
    .map((area) => area.id);

  const areasToShow = showOnlyInterestedAreas
    ? analysisAreas.filter((area) => interestedAreas.includes(area.id))
    : analysisAreas;

  const treatmentGoals = [
    "Volume Restoration",
    "Wrinkle Reduction",
    "Skin Rejuvenation",
    "Contour Enhancement",
    "Hydration Improvement",
    "Pigmentation Correction",
  ];

  const modalities = [
    "Injectable Fillers",
    "Botox & Neurotoxins",
    "Laser Treatments",
    "Chemical Peels",
    "Microneedling",
    "RF Treatments",
  ];

  const treatments = [
    {
      id: 1,
      name: "Juvederm Voluma",
      category: "Injectable Fillers",
      area: "cheeks",
      goal: "Volume Restoration",
      price: 1200,
      duration: "18-24 months",
      downtime: "3-7 days",
      invasiveness: "Minimal",
      description:
        "High-density hyaluronic acid filler for cheek volume restoration",
      beforeAfter: {
        before: "/Sydney Adams Front.png",
        after: "/Sydney Adams Side.png",
      },
      benefits: ["Long-lasting", "Natural lift", "Immediate results"],
      risks: ["Swelling", "Bruising", "Asymmetry risk"],
      serves: ["Mid Cheek Flattening", "Cheekbone - Not Prominent"],
    },
    {
      id: 2,
      name: "Botox for Crow's Feet",
      category: "Botox & Neurotoxins",
      area: "eyes",
      goal: "Wrinkle Reduction",
      price: 400,
      duration: "3-4 months",
      downtime: "None",
      invasiveness: "Minimal",
      description: "Botulinum toxin to reduce crow's feet wrinkles",
      beforeAfter: {
        before: "/Sydney Adams Front.png",
        after: "/Sydney Adams Side.png",
      },
      benefits: ["Prevents new wrinkles", "Quick treatment", "No downtime"],
      risks: ["Temporary weakness", "Headache", "Drooping (rare)"],
      serves: ["Crow's Feet Wrinkles", "Under Eye Wrinkles"],
    },
    {
      id: 3,
      name: "Tear Trough Filler",
      category: "Injectable Fillers",
      area: "eyes",
      goal: "Volume Restoration",
      price: 800,
      duration: "12-18 months",
      downtime: "1-3 days",
      invasiveness: "Minimal",
      description: "Hyaluronic acid filler to restore under-eye volume",
      beforeAfter: {
        before: "/Sydney Adams Front.png",
        after: "/Sydney Adams Side.png",
      },
      benefits: ["Immediate results", "Natural look", "Minimal downtime"],
      risks: ["Bruising", "Swelling", "Rare vascular complications"],
      serves: ["Under Eye Hollow", "Temporal Hollow"],
    },
    {
      id: 4,
      name: "Botox Forehead",
      category: "Botox & Neurotoxins",
      area: "forehead",
      goal: "Wrinkle Reduction",
      price: 350,
      duration: "3-4 months",
      downtime: "None",
      invasiveness: "Minimal",
      description: "Botulinum toxin to smooth forehead lines and wrinkles",
      beforeAfter: {
        before: "/Sydney Adams Front.png",
        after: "/Sydney Adams Side.png",
      },
      benefits: ["Prevents new wrinkles", "Quick treatment", "No downtime"],
      risks: ["Temporary weakness", "Headache", "Drooping (rare)"],
      serves: ["Temporal Hollow", "Brow Asymmetry"],
    },
    {
      id: 5,
      name: "Lip Filler",
      category: "Injectable Fillers",
      area: "lips",
      goal: "Volume Restoration",
      price: 600,
      duration: "6-12 months",
      downtime: "1-2 days",
      invasiveness: "Minimal",
      description: "Hyaluronic acid filler to enhance lip volume and shape",
      beforeAfter: {
        before: "/Sydney Adams Front.png",
        after: "/Sydney Adams Side.png",
      },
      benefits: ["Immediate results", "Natural look", "Reversible"],
      risks: ["Swelling", "Bruising", "Asymmetry risk"],
      serves: ["Lip Volume Loss", "Lip Dehydration"],
    },
    {
      id: 6,
      name: "Chin Filler",
      category: "Injectable Fillers",
      area: "jawline",
      goal: "Volume Restoration",
      price: 700,
      duration: "12-18 months",
      downtime: "2-3 days",
      invasiveness: "Minimal",
      description:
        "Hyaluronic acid filler to enhance chin projection and jawline",
      beforeAfter: {
        before: "/Sydney Adams Front.png",
        after: "/Sydney Adams Side.png",
      },
      benefits: ["Immediate results", "Natural look", "Long-lasting"],
      risks: ["Swelling", "Bruising", "Asymmetry risk"],
      serves: ["Retruded Chin", "Jawline Definition"],
    },
    {
      id: 7,
      name: "Chemical Peel",
      category: "Chemical Peels",
      area: "face",
      goal: "Skin Rejuvenation",
      price: 300,
      duration: "3-6 months",
      downtime: "3-7 days",
      invasiveness: "Minimal",
      description:
        "Medium-depth chemical peel to improve skin texture and tone",
      beforeAfter: {
        before: "/Sydney Adams Front.png",
        after: "/Sydney Adams Side.png",
      },
      benefits: ["Improves texture", "Reduces fine lines", "Even skin tone"],
      risks: ["Peeling", "Redness", "Sun sensitivity"],
      serves: ["General skin concerns", "Texture improvement"],
    },
    {
      id: 8,
      name: "Microneedling",
      category: "Microneedling",
      area: "face",
      goal: "Skin Rejuvenation",
      price: 400,
      duration: "2-3 months",
      downtime: "1-2 days",
      invasiveness: "Minimal",
      description:
        "Collagen induction therapy to improve skin texture and scars",
      beforeAfter: {
        before: "/Sydney Adams Front.png",
        after: "/Sydney Adams Side.png",
      },
      benefits: ["Stimulates collagen", "Improves texture", "Minimal downtime"],
      risks: ["Redness", "Swelling", "Temporary sensitivity"],
      serves: ["Skin texture", "Fine lines", "Scar improvement"],
    },
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: "from-blue-500 to-cyan-500",
      purple: "from-purple-500 to-pink-500",
      pink: "from-pink-500 to-rose-500",
      green: "from-green-500 to-emerald-500",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getScoreColorClasses = (score: number) => {
    // Create a gradient from orange (low scores) to green (high scores)
    // More vibrant colors for better visibility in both light and dark modes
    if (score >= 90)
      return "from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-500";
    if (score >= 80)
      return "from-green-500 to-green-600 dark:from-green-400 dark:to-green-500";
    if (score >= 70)
      return "from-yellow-500 to-green-500 dark:from-yellow-400 dark:to-green-400";
    if (score >= 60)
      return "from-yellow-600 to-yellow-500 dark:from-yellow-500 dark:to-yellow-400";
    if (score >= 50)
      return "from-orange-500 to-yellow-500 dark:from-orange-400 dark:to-yellow-400";
    if (score >= 40)
      return "from-orange-600 to-orange-500 dark:from-orange-500 dark:to-orange-400";
    return "from-red-600 to-orange-600 dark:from-red-500 dark:to-orange-500";
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "minimal":
        return "text-green-400 bg-green-500/20 border-green-500/50";
      case "mild":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500/50";
      case "moderate":
        return "text-orange-400 bg-orange-500/20 border-orange-500/50";
      case "severe":
        return "text-red-400 bg-red-500/20 border-red-500/50";
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-500/50";
    }
  };

  const filteredTreatments = treatments.filter((treatment) => {
    if (selectedArea && treatment.area !== selectedArea) return false;
    if (selectedGoal && treatment.goal !== selectedGoal) return false;
    if (modality && treatment.category !== modality) return false;
    if (priceRange) {
      const price = treatment.price;
      if (priceRange === "under-500" && price >= 500) return false;
      if (priceRange === "500-1000" && (price < 500 || price > 1000))
        return false;
      if (priceRange === "1000-2000" && (price < 1000 || price > 2000))
        return false;
      if (priceRange === "over-2000" && price <= 2000) return false;
    }
    return true;
  });

  const addToShortlist = (treatment: any) => {
    setShortlist((prev) => [...prev, treatment]);
  };

  const addToTreatmentPlan = (treatment: any) => {
    setSelectedTreatment(treatment);
    setShowTreatmentPopup(true);
  };

  const handleAddToTreatmentPlan = (treatmentDetails: any) => {
    const itemId = treatmentDetails.id || treatmentDetails.name;
    setTreatmentPlan((prev) => [
      ...prev,
      { ...treatmentDetails, id: Date.now() },
    ]);
    setAddedToPlan((prev) => new Set([...prev, itemId]));
  };

  const removeFromTreatmentPlan = (id: number) => {
    setTreatmentPlan((prev) => prev.filter((item) => item.id !== id));
  };

  const toggleCardExpansion = (cardId: string) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  return (
    <div className="bg-gradient-to-br from-black via-gray-900 to-black flex flex-col h-screen overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="p-4 border-b border-gray-800/50"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-600 to-gray-900 bg-clip-text text-transparent dark:text-white dark:from-white dark:to-gray-300">
                {patient.name}
              </h1>
              <p className="text-gray-400 text-sm">
                {patient.age} years old • Patient ID #{patient.id}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm">
              <Edit className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Download className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Share className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden flex">
        {/* Left Third - Patient Images */}
        <div className="w-1/3 p-6 flex flex-col items-center justify-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full space-y-6"
          >
            {/* Patient Image */}
            <div className="relative">
              <motion.div
                key={isSideView ? "side" : "front"}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative w-full h-96 rounded-2xl overflow-hidden group"
              >
                <img
                  src={isSideView ? patient.sideImage : patient.frontImage}
                  alt={`${patient.name} ${isSideView ? "side" : "front"} view`}
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
                />

                {/* Subtle border */}
                <div className="absolute inset-0 rounded-2xl border-2 border-white/20" />

                {/* View indicator */}
                <div
                  className={`absolute bottom-4 left-4 px-3 py-1 rounded-full backdrop-blur-md ${
                    isSideView
                      ? "bg-purple-500/30 border border-purple-400/50"
                      : "bg-blue-500/30 border border-blue-400/50"
                  }`}
                >
                  <span className="text-white text-sm font-medium">
                    {isSideView ? "Side" : "Front"}
                  </span>
                </div>
              </motion.div>

              {/* View Toggle */}
              <div className="flex justify-center mt-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsSideView(!isSideView)}
                  className="backdrop-blur-md bg-white/10 border-white/20 hover:bg-white/20 text-white"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  {isSideView ? "Switch to Front View" : "Switch to Side View"}
                </Button>
              </div>

              {/* Patient Summary Card */}
              <Card className="p-4 bg-gray-800/50 border-gray-700 mt-4">
                <h3 className="text-sm font-semibold text-white mb-3">
                  Patient Summary
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Total Findings:</span>
                    <span className="text-white">
                      {patient.findings.length}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Shortlist:</span>
                    <span className="text-pink-400">
                      {shortlist.length} items
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Treatment Plan:</span>
                    <span className="text-green-400">
                      {treatmentPlan.length} items
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Areas of Interest:</span>
                    <span className="text-blue-400">
                      {interestedAreas.length} areas
                    </span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Patient Stats */}
            <div className="grid grid-cols-1 gap-4">
              <Card className="p-4 bg-gradient-to-br from-gray-500/10 to-gray-600/10 border border-gray-500/20 backdrop-blur-md">
                <div className="text-center">
                  <div
                    className={`text-2xl font-bold bg-gradient-to-r ${getScoreColorClasses(
                      overallScore
                    )} bg-clip-text text-transparent mb-1`}
                  >
                    {overallScore}%
                  </div>
                  <div className="text-xs text-gray-400">Overall Score</div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>

        {/* Right Two-Thirds - Content */}
        <div className="w-2/3 p-6 overflow-y-auto">
          {/* View Toggle - Top Level Selectors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-6"
          >
            <div className="flex space-x-1 p-1 bg-gray-800/50 rounded-xl border border-gray-700/50">
              {[
                {
                  id: "analysis",
                  label: "Analysis",
                  icon: <Target className="w-4 h-4" />,
                },
                {
                  id: "treatments",
                  label: "Treatments",
                  icon: <Sparkles className="w-4 h-4" />,
                },
                {
                  id: "treatment-plan",
                  label: "Treatment Plan",
                  icon: <FileText className="w-4 h-4" />,
                },
              ].map((view) => (
                <Button
                  key={view.id}
                  variant="ghost"
                  size="sm"
                  onClick={() => setCurrentView(view.id as ViewMode)}
                  className={`flex-1 transition-all duration-300 ${
                    currentView === view.id
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/25"
                      : "text-gray-400 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {view.icon}
                  <span className="ml-2 font-medium">{view.label}</span>
                </Button>
              ))}
            </div>
          </motion.div>

          {/* Analysis View */}
          <AnimatePresence mode="wait">
            {currentView === "analysis" && (
              <motion.div
                key="analysis"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Area Navigation - Lower Level Selectors */}
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-medium text-gray-400">
                      Filter by Area
                    </h3>
                    <div className="flex items-center space-x-3">
                      <div className="text-xs text-gray-500">
                        {interestedAreas.length} areas of interest (marked with
                        ★)
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          setShowOnlyInterestedAreas(!showOnlyInterestedAreas)
                        }
                        className={`text-xs px-3 py-1 rounded-lg transition-all duration-300 ${
                          showOnlyInterestedAreas
                            ? "bg-blue-600/20 text-blue-400 border border-blue-500/30"
                            : "bg-gray-700/50 text-gray-300 border border-gray-600/50 hover:bg-gray-600/50"
                        }`}
                      >
                        {showOnlyInterestedAreas
                          ? "Show All Areas"
                          : "Show Only Interested"}
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {/* All Areas Button */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedArea("")}
                      className={`px-4 py-3 rounded-xl transition-all duration-300 border-2 focus:outline-none focus:ring-0 active:transform-none ${
                        selectedArea === ""
                          ? "bg-cyan-500/25 text-white border-cyan-400/40 shadow-md backdrop-blur-md"
                          : "bg-gray-800/60 text-gray-300 hover:bg-gray-700/60 hover:text-white border-gray-600/50 hover:border-gray-500/70 hover:shadow-md"
                      }`}
                    >
                      <span className="text-sm">All Areas</span>
                    </Button>

                    {areasToShow
                      .sort(
                        (a, b) => calculateAreaScore(a) - calculateAreaScore(b)
                      )
                      .map((area) => (
                        <Button
                          key={area.id}
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            setSelectedArea(
                              selectedArea === area.id ? "" : area.id
                            )
                          }
                          className={`px-4 py-3 rounded-xl transition-all duration-300 border-2 focus:outline-none focus:ring-0 active:transform-none ${
                            selectedArea === area.id
                              ? "bg-cyan-500/25 text-white border-cyan-400/40 shadow-md backdrop-blur-md"
                              : "bg-gray-800/60 text-gray-300 hover:bg-gray-700/60 hover:text-white border-gray-600/50 hover:border-gray-500/70 hover:shadow-md"
                          }`}
                        >
                          <span className="text-sm">{area.name}</span>
                          <span
                            className={`ml-2 text-xs font-bold px-2 py-1 rounded-full bg-gradient-to-r ${getScoreColorClasses(
                              calculateAreaScore(area)
                            )} text-white border border-transparent`}
                          >
                            {calculateAreaScore(area)}
                          </span>
                          {!showAllAnalysisAreas &&
                            interestedAreas.includes(area.id) && (
                              <span className="ml-1 text-xs text-pink-400">
                                ★
                              </span>
                            )}
                        </Button>
                      ))}
                  </div>
                </div>

                {/* Findings Cards - Show areas based on toggle or selected area */}
                <div className="space-y-6">
                  {areasToShow
                    .filter((area) => !selectedArea || area.id === selectedArea)
                    .sort(
                      (a, b) => calculateAreaScore(a) - calculateAreaScore(b)
                    ) // Sort by score (worst first)
                    .map((area) => (
                      <div key={area.id} className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-semibold text-white">
                            {area.name} Findings
                          </h3>
                          <div className="flex items-center space-x-2">
                            <div
                              className={`px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r ${getScoreColorClasses(
                                calculateAreaScore(area)
                              )} text-white border border-transparent`}
                            >
                              {calculateAreaScore(area)}/100
                            </div>
                            <div className="text-sm text-gray-400">
                              {calculateAreaScore(area) >= 80
                                ? "Strong"
                                : calculateAreaScore(area) >= 60
                                ? "Good"
                                : "Needs Work"}
                            </div>
                            {interestedAreas.includes(area.id) && (
                              <span className="text-xs text-pink-400">★</span>
                            )}
                          </div>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                          {area.findings.filter((finding) =>
                            patient.findings.includes(finding.name)
                          ).length > 0 ? (
                            area.findings
                              .filter((finding) =>
                                patient.findings.includes(finding.name)
                              )
                              .map((finding, index) => {
                                const cardId = `${area.id}-${finding.name}`;
                                const isExpanded = expandedCards.has(cardId);

                                return (
                                  <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                  >
                                    <Card className="p-4 bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-all duration-300 backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/10 group">
                                      {/* Compact Header with Left/Right Layout */}
                                      <div className="flex items-start gap-4 mb-3">
                                        {/* Left Column - Visual Example (Half Width) */}
                                        <div className="w-1/2">
                                          <div className="relative h-64">
                                            <img
                                              src={getFindingImage(
                                                finding.name
                                              )}
                                              alt={`${finding.name} example`}
                                              className="w-full h-full object-contain rounded border border-gray-600/50"
                                              onError={(e) => {
                                                // Fallback to beforeAfter image if available, otherwise use fallback
                                                const target =
                                                  e.target as HTMLImageElement;
                                                if (
                                                  finding.beforeAfter &&
                                                  finding.beforeAfter.length > 0
                                                ) {
                                                  target.src =
                                                    finding.beforeAfter[0].before;
                                                } else {
                                                  target.src =
                                                    getFallbackFindingImage();
                                                }
                                              }}
                                            />
                                            <div className="absolute bottom-0 left-0 right-0">
                                              <div className="bg-black/70 text-white text-xs px-2 py-1 rounded text-center">
                                                {finding.name}
                                              </div>
                                            </div>
                                          </div>
                                        </div>

                                        {/* Right Column - Content (Half Width) */}
                                        <div className="w-1/2 h-64 flex flex-col justify-between">
                                          {/* Title and Description */}
                                          <div className="mb-4">
                                            <h4 className="text-lg font-semibold text-white mb-2">
                                              {finding.name}
                                            </h4>
                                            <p className="text-gray-300 text-sm line-clamp-3">
                                              {finding.description}
                                            </p>
                                          </div>

                                          {/* Score and Severity */}
                                          <div className="flex items-center space-x-3 mb-3">
                                            <span
                                              className={`px-2 py-1 rounded-full text-xs border ${getSeverityColor(
                                                finding.severity
                                              )}`}
                                            >
                                              {finding.severity}
                                            </span>
                                            <div className="flex items-center space-x-1">
                                              <div
                                                className={`text-xl font-bold bg-gradient-to-r ${getScoreColorClasses(
                                                  finding.score
                                                )} bg-clip-text text-transparent`}
                                              >
                                                {finding.score}%
                                              </div>
                                              <div className="text-xs text-gray-400">
                                                Score
                                              </div>
                                            </div>
                                          </div>

                                          {/* Score Bar */}
                                          <div className="mb-3">
                                            <div className="relative h-2 bg-gray-700 rounded-full overflow-hidden">
                                              <motion.div
                                                className={`absolute inset-0 bg-gradient-to-r ${getScoreColorClasses(
                                                  finding.score
                                                )} rounded-full`}
                                                initial={{ width: 0 }}
                                                animate={{
                                                  width: `${finding.score}%`,
                                                }}
                                                transition={{
                                                  duration: 1.5,
                                                  delay: 0.5,
                                                }}
                                              />
                                            </div>
                                          </div>

                                          {/* Combined Commonality and Educational Info */}
                                          <div className="mb-3">
                                            <div className="p-3 bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-500/20 rounded-lg">
                                              <p className="text-sm text-gray-300">
                                                <span className="font-semibold text-blue-400">
                                                  {finding.commonality}%
                                                </span>{" "}
                                                of people in your age group (
                                                {finding.ageGroup}) experience
                                                this.{" "}
                                                {finding.educational
                                                  .split(". ")
                                                  .slice(1)
                                                  .join(". ")}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      </div>

                                      {/* Expandable Content - Full Width */}
                                      <AnimatePresence>
                                        {isExpanded && (
                                          <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{
                                              opacity: 1,
                                              height: "auto",
                                            }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="space-y-4 mt-4"
                                          >
                                            {/* Causes and Symptoms */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                              <div>
                                                <h5 className="font-semibold text-white mb-2 text-sm">
                                                  Common Causes
                                                </h5>
                                                <div className="flex flex-wrap gap-1">
                                                  {finding.causes.map(
                                                    (cause, idx) => (
                                                      <span
                                                        key={idx}
                                                        className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full"
                                                      >
                                                        {cause}
                                                      </span>
                                                    )
                                                  )}
                                                </div>
                                              </div>
                                              <div>
                                                <h5 className="font-semibold text-white mb-2 text-sm">
                                                  Symptoms
                                                </h5>
                                                <div className="flex flex-wrap gap-1">
                                                  {finding.symptoms.map(
                                                    (symptom, idx) => (
                                                      <span
                                                        key={idx}
                                                        className="px-2 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-full"
                                                      >
                                                        {symptom}
                                                      </span>
                                                    )
                                                  )}
                                                </div>
                                              </div>
                                            </div>

                                            {/* Treatment Options */}
                                            <div>
                                              <h5 className="font-semibold text-white mb-2 text-sm">
                                                Available Treatments
                                              </h5>
                                              <div className="flex flex-wrap gap-2">
                                                {finding.treatments.map(
                                                  (treatment, idx) => (
                                                    <span
                                                      key={idx}
                                                      className="px-2 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-400 text-xs rounded-full"
                                                    >
                                                      {treatment}
                                                    </span>
                                                  )
                                                )}
                                              </div>
                                            </div>
                                          </motion.div>
                                        )}
                                      </AnimatePresence>

                                      {/* Action Buttons */}
                                      <div className="flex items-center justify-between mt-4">
                                        <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={() =>
                                            toggleCardExpansion(cardId)
                                          }
                                          className="text-gray-400 hover:text-white"
                                        >
                                          {isExpanded
                                            ? "Show Less"
                                            : "Learn More"}
                                          <ChevronDown
                                            className={`w-4 h-4 ml-1 transition-transform ${
                                              isExpanded ? "rotate-180" : ""
                                            }`}
                                          />
                                        </Button>

                                        <div className="flex space-x-2">
                                          <Button
                                            size="sm"
                                            onClick={() =>
                                              addToShortlist(finding)
                                            }
                                            disabled={shortlist.some(
                                              (item) =>
                                                item.name === finding.name
                                            )}
                                            className={`transition-all duration-300 ${
                                              shortlist.some(
                                                (item) =>
                                                  item.name === finding.name
                                              )
                                                ? "bg-gradient-to-r from-pink-600 to-purple-600 text-white cursor-not-allowed"
                                                : "bg-gradient-to-r from-pink-600 to-purple-600 text-white hover:from-pink-700 hover:to-purple-700"
                                            }`}
                                          >
                                            {shortlist.some(
                                              (item) =>
                                                item.name === finding.name
                                            ) ? (
                                              <>
                                                <CheckCircle className="w-4 h-4 mr-1" />
                                                Added to Shortlist
                                              </>
                                            ) : (
                                              <>
                                                <Heart className="w-4 h-4 mr-1" />
                                                Add to Shortlist
                                              </>
                                            )}
                                          </Button>
                                        </div>
                                      </div>
                                    </Card>
                                  </motion.div>
                                );
                              })
                          ) : (
                            <div className="text-center py-8">
                              <div className="text-gray-400 text-sm">
                                No findings detected in this area
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              </motion.div>
            )}

            {/* Treatments View */}
            {currentView === "treatments" && (
              <motion.div
                key="treatments"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                {/* Filters */}
                <Card className="p-4 bg-gray-800/50 border-gray-700 relative z-50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-white flex items-center">
                      <Filter className="w-5 h-5 mr-2" />
                      Treatment Filters
                    </h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowFilters(!showFilters)}
                    >
                      <Sliders className="w-4 h-4" />
                    </Button>
                  </div>

                  {showFilters && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="grid grid-cols-2 md:grid-cols-4 gap-4"
                    >
                      <div>
                        <label className="text-sm text-gray-400 mb-2 block">
                          Area
                        </label>
                        <CustomSelect
                          options={[
                            { value: "", label: "All Areas" },
                            ...analysisAreas.map((area) => ({
                              value: area.id,
                              label: area.name,
                            })),
                          ]}
                          value={selectedArea}
                          onChange={setSelectedArea}
                          placeholder="All Areas"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 mb-2 block">
                          Goal
                        </label>
                        <CustomSelect
                          options={[
                            { value: "", label: "All Goals" },
                            ...treatmentGoals.map((goal) => ({
                              value: goal,
                              label: goal,
                            })),
                          ]}
                          value={selectedGoal}
                          onChange={setSelectedGoal}
                          placeholder="All Goals"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 mb-2 block">
                          Price Range
                        </label>
                        <CustomSelect
                          options={[
                            { value: "", label: "Any Price" },
                            { value: "under-500", label: "Under $500" },
                            { value: "500-1000", label: "$500 - $1,000" },
                            { value: "1000-2000", label: "$1,000 - $2,000" },
                            { value: "over-2000", label: "Over $2,000" },
                          ]}
                          value={priceRange}
                          onChange={setPriceRange}
                          placeholder="Any Price"
                        />
                      </div>
                      <div>
                        <label className="text-sm text-gray-400 mb-2 block">
                          Modality
                        </label>
                        <CustomSelect
                          options={[
                            { value: "", label: "All Modalities" },
                            ...modalities.map((mod) => ({
                              value: mod,
                              label: mod,
                            })),
                          ]}
                          value={modality}
                          onChange={setModality}
                          placeholder="All Modalities"
                        />
                      </div>
                    </motion.div>
                  )}
                </Card>

                {/* Treatment Cards */}
                {filteredTreatments.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredTreatments.map((treatment, index) => (
                      <motion.div
                        key={treatment.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="p-4 bg-gray-800/50 border-gray-700 hover:border-gray-600 transition-all duration-300 backdrop-blur-sm hover:shadow-xl hover:shadow-purple-500/10 group">
                          {/* Before/After Images */}
                          <div className="mb-4">
                            <div className="grid grid-cols-2 gap-2">
                              {/* Before Image */}
                              <div className="relative w-full h-40 rounded-xl overflow-hidden bg-gray-700/30">
                                <img
                                  src={treatment.beforeAfter.before}
                                  alt={`${treatment.name} before`}
                                  className="w-full h-full object-contain"
                                />
                                <div className="absolute top-2 left-2">
                                  <div className="bg-red-500/60 text-white/80 text-xs px-2 py-1 rounded-full font-normal">
                                    Before
                                  </div>
                                </div>
                              </div>
                              {/* After Image */}
                              <div className="relative w-full h-40 rounded-xl overflow-hidden bg-gray-700/30">
                                <img
                                  src={treatment.beforeAfter.after}
                                  alt={`${treatment.name} after`}
                                  className="w-full h-full object-contain"
                                />
                                <div className="absolute top-2 left-2">
                                  <div className="bg-green-500/60 text-white/80 text-xs px-2 py-1 rounded-full font-normal">
                                    After
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Treatment Info */}
                          <div className="mb-4">
                            <h4 className="text-lg font-semibold text-white mb-2">
                              {treatment.name}
                            </h4>
                            <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                              {treatment.description}
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {treatment.serves.map((issue, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 bg-blue-500/20 text-blue-400 text-xs rounded-full"
                                >
                                  {issue}
                                </span>
                              ))}
                            </div>
                          </div>

                          {/* Treatment Details - Compact */}
                          <div className="grid grid-cols-4 gap-2 mb-4">
                            <div className="text-center p-2 bg-green-500/10 border border-green-500/20 rounded-lg">
                              <DollarSign className="w-4 h-4 text-white mx-auto mb-1" />
                              <div className="text-xs text-gray-400">Price</div>
                              <div className="text-xs font-medium text-white">
                                ${treatment.price}
                              </div>
                            </div>
                            <div className="text-center p-2 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                              <Clock className="w-4 h-4 text-white mx-auto mb-1" />
                              <div className="text-xs text-gray-400">
                                Duration
                              </div>
                              <div className="text-xs font-medium text-white">
                                {treatment.duration}
                              </div>
                            </div>
                            <div className="text-center p-2 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                              <Bed className="w-4 h-4 text-white mx-auto mb-1" />
                              <div className="text-xs text-gray-400">
                                Downtime
                              </div>
                              <div className="text-xs font-medium text-white">
                                {treatment.downtime}
                              </div>
                            </div>
                            <div className="text-center p-2 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                              <Activity className="w-4 h-4 text-white mx-auto mb-1" />
                              <div className="text-xs text-gray-400">
                                Invasiveness
                              </div>
                              <div className="text-xs font-medium text-white">
                                {treatment.invasiveness}
                              </div>
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="flex justify-center">
                            <Button
                              size="sm"
                              onClick={() => addToTreatmentPlan(treatment)}
                              disabled={addedToPlan.has(
                                treatment.id.toString()
                              )}
                              className={`w-full transition-all duration-300 ${
                                addedToPlan.has(treatment.id.toString())
                                  ? "bg-gradient-to-r from-green-600 to-emerald-600 text-white cursor-not-allowed"
                                  : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25"
                              }`}
                            >
                              {addedToPlan.has(treatment.id.toString()) ? (
                                <>
                                  <CheckCircle className="w-4 h-4 mr-2" />
                                  Added to Plan
                                </>
                              ) : (
                                <>
                                  <Plus className="w-4 h-4 mr-2" />
                                  Add to Treatment Plan
                                </>
                              )}
                            </Button>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <Card className="p-8 bg-gray-800/50 border-gray-700 text-center">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center">
                        <Search className="w-8 h-8 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                          No treatments found
                        </h3>
                        <p className="text-gray-400 mb-4">
                          No treatments match your current filters. Try
                          adjusting your search criteria.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <Button
                            variant="ghost"
                            onClick={() => {
                              setSelectedArea("");
                              setSelectedGoal("");
                              setPriceRange("");
                              setModality("");
                            }}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 shadow-lg shadow-blue-500/25 px-6 py-2"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Clear All Filters
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() => setShowAllAreas(true)}
                            className="backdrop-blur-md bg-white/10 border-white/20 hover:bg-white/20 text-white px-6 py-2"
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View All Areas
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                )}
              </motion.div>
            )}

            {/* Treatment Plan View */}
            {currentView === "treatment-plan" && (
              <motion.div
                key="treatment-plan"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-6"
              >
                <Card className="p-6 bg-gradient-to-r from-green-600/10 to-blue-600/10 border border-green-500/30">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">
                      Treatment Plan ({treatmentPlan.length} items)
                    </h3>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-green-600 to-blue-600"
                      >
                        <Send className="w-4 h-4 mr-2" />
                        Export to EMR
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="backdrop-blur-md bg-white/10 border-white/20 hover:bg-white/20 text-white"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>
                  </div>

                  {treatmentPlan.length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400">
                        No treatments added to plan yet
                      </p>
                      <p className="text-sm text-gray-500">
                        Add treatments from the Treatments tab
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {treatmentPlan.map((item, index) => {
                        const itemId = `treatment-${item.id}`;
                        const isExpanded = expandedTreatmentItems.has(itemId);

                        return (
                          <motion.div
                            key={item.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="p-4 bg-gray-700/30 rounded-lg border border-gray-600"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="font-medium text-white">
                                  {item.name}
                                </div>
                                <div className="text-sm text-gray-400">
                                  ${item.price} • {item.duration} •{" "}
                                  {item.downtime}
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  Serves:{" "}
                                  {item.serves
                                    ? item.serves.join(", ")
                                    : "Various concerns"}
                                </div>

                                {/* Expandable Content */}
                                {isExpanded && (
                                  <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="mt-4 pt-4 border-t border-gray-600/50"
                                  >
                                    <div className="space-y-3">
                                      {item.notes && (
                                        <div>
                                          <h5 className="text-sm font-medium text-white mb-2">
                                            Notes:
                                          </h5>
                                          <p className="text-sm text-gray-300">
                                            {item.notes}
                                          </p>
                                        </div>
                                      )}

                                      {item.areas && item.areas.length > 0 && (
                                        <div>
                                          <h5 className="text-sm font-medium text-white mb-2">
                                            Treatment Areas:
                                          </h5>
                                          <div className="flex flex-wrap gap-2">
                                            {item.areas.map(
                                              (area: string, idx: number) => (
                                                <span
                                                  key={idx}
                                                  className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded border border-green-500/30"
                                                >
                                                  {area}
                                                </span>
                                              )
                                            )}
                                          </div>
                                        </div>
                                      )}

                                      {item.quantity && item.unit && (
                                        <div>
                                          <h5 className="text-sm font-medium text-white mb-2">
                                            Dosage:
                                          </h5>
                                          <p className="text-sm text-gray-300">
                                            {item.quantity} {item.unit}
                                          </p>
                                        </div>
                                      )}

                                      <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                          <span className="text-gray-400">
                                            Price:
                                          </span>
                                          <span className="text-white ml-2">
                                            ${item.price}
                                          </span>
                                        </div>
                                        <div>
                                          <span className="text-gray-400">
                                            Duration:
                                          </span>
                                          <span className="text-white ml-2">
                                            {item.duration}
                                          </span>
                                        </div>
                                        <div>
                                          <span className="text-gray-400">
                                            Downtime:
                                          </span>
                                          <span className="text-white ml-2">
                                            {item.downtime}
                                          </span>
                                        </div>
                                        <div>
                                          <span className="text-gray-400">
                                            Invasiveness:
                                          </span>
                                          <span className="text-white ml-2">
                                            {item.invasiveness}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </motion.div>
                                )}
                              </div>

                              <div className="flex items-center space-x-2 ml-4">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setExpandedTreatmentItems((prev) => {
                                      const newSet = new Set(prev);
                                      if (newSet.has(itemId)) {
                                        newSet.delete(itemId);
                                      } else {
                                        newSet.add(itemId);
                                      }
                                      return newSet;
                                    });
                                  }}
                                  className="text-gray-400 hover:text-white"
                                >
                                  {isExpanded ? (
                                    <ChevronDown className="w-4 h-4 rotate-180" />
                                  ) : (
                                    <ChevronDown className="w-4 h-4" />
                                  )}
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    removeFromTreatmentPlan(item.id)
                                  }
                                  className="text-red-400 hover:text-red-300"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </Card>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Treatment Plan Popup */}
      <TreatmentPlanPopup
        isOpen={showTreatmentPopup}
        onClose={() => setShowTreatmentPopup(false)}
        onAdd={handleAddToTreatmentPlan}
        treatment={selectedTreatment}
      />
    </div>
  );
}
