import { Target, Eye, Heart, Zap, Shield, Star } from "lucide-react";

export const analysisAreas = [
  {
    id: "forehead",
    name: "Forehead",
    score: 75,
    description:
      "Forehead area analysis including temporal hollows and brow positioning",
    icon: Target,
    color: "blue",
    subcategories: [],
    findings: [
      {
        name: "Temporal Hollow",
        score: 68,
        severity: "moderate" as const,
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
        severity: "moderate" as const,
        description:
          "Asymmetric brow positioning affecting facial balance and expression",
        commonality: 45,
        ageGroup: "30-45",
        causes: ["Muscle imbalance", "Bone asymmetry", "Previous trauma"],
        symptoms: ["Uneven brows", "Asymmetric expression", "Facial imbalance"],
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
        severity: "mild" as const,
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
        severity: "moderate" as const,
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
      {
        name: "Forehead Wrinkles",
        score: 75,
        severity: "moderate" as const,
        description:
          "Horizontal lines across the forehead affecting facial appearance",
        commonality: 80,
        ageGroup: "25-50",
        causes: ["Facial expressions", "Aging", "Sun damage"],
        symptoms: ["Horizontal lines", "Aged appearance", "Expression lines"],
        beforeAfter: [
          {
            before: "/Sydney Adams Front.png",
            after: "/Sydney Adams Side.png",
            label: "Botox",
          },
        ],
        treatments: ["Botox", "Dermal fillers", "Microneedling"],
        educational:
          "Forehead wrinkles affect 80% of people aged 25-50. These are caused by repeated facial expressions and natural aging.",
      },
      {
        name: "Glabella Lines",
        score: 68,
        severity: "moderate" as const,
        description:
          "Vertical lines between the eyebrows creating a frowning appearance",
        commonality: 70,
        ageGroup: "25-45",
        causes: ["Frowning", "Muscle tension", "Aging"],
        symptoms: ["Vertical lines", "Frowning appearance", "Tension lines"],
        beforeAfter: [
          {
            before: "/Sydney Adams Front.png",
            after: "/Sydney Adams Side.png",
            label: "Botox",
          },
        ],
        treatments: ["Botox", "Dermal fillers", "Microneedling"],
        educational:
          "Glabella lines affect 70% of people aged 25-45. These are caused by repeated frowning and muscle tension.",
      },
    ],
  },
  {
    id: "eyes",
    name: "Eyes",
    score: 70,
    description:
      "Eye area analysis including under-eye concerns and eyelid issues",
    icon: Eye,
    color: "blue",
    subcategories: [],
    findings: [
      {
        name: "Under Eye Dark Circles",
        score: 75,
        severity: "mild" as const,
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
        severity: "mild" as const,
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
        severity: "moderate" as const,
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
            label: "Thread Lift",
          },
        ],
        treatments: ["Upper blepharoplasty", "Thread lift", "Botox"],
        educational:
          "Excess upper eyelid skin affects 60% of people aged 40-60. This is a natural part of aging as the skin loses elasticity.",
      },
      {
        name: "Crow's Feet",
        score: 72,
        severity: "moderate" as const,
        description: "Fine lines radiating from the outer corners of the eyes",
        commonality: 85,
        ageGroup: "25-50",
        causes: ["Smiling", "Squinting", "Aging"],
        symptoms: ["Fine lines", "Expression lines", "Aged appearance"],
        beforeAfter: [
          {
            before: "/Sydney Adams Front.png",
            after: "/Sydney Adams Side.png",
            label: "Botox",
          },
        ],
        treatments: ["Botox", "Dermal fillers", "Microneedling"],
        educational:
          "Crow's feet affect 85% of people aged 25-50. These are caused by repeated smiling and squinting.",
      },
      {
        name: "Under Eye Wrinkles",
        score: 65,
        severity: "mild" as const,
        description: "Fine lines under the eyes affecting appearance",
        commonality: 70,
        ageGroup: "25-45",
        causes: ["Aging", "Sun damage", "Genetics"],
        symptoms: ["Fine lines", "Tired appearance", "Aged look"],
        beforeAfter: [
          {
            before: "/Sydney Adams Front.png",
            after: "/Sydney Adams Side.png",
            label: "Botox",
          },
        ],
        treatments: ["Botox", "Dermal fillers", "Microneedling"],
        educational:
          "Under eye wrinkles affect 70% of people aged 25-45. These are often genetic and can be exacerbated by sun damage.",
      },
    ],
  },
  {
    id: "nose",
    name: "Nose",
    score: 65,
    description: "Nose area analysis including nasal structure and symmetry",
    icon: Target,
    color: "purple",
    subcategories: [],
    findings: [
      {
        name: "Crooked Nose",
        score: 65,
        severity: "mild" as const,
        description: "Nasal deviation affecting facial symmetry and profile",
        commonality: 40,
        ageGroup: "All ages",
        causes: ["Genetics", "Trauma", "Birth defects"],
        symptoms: [
          "Nasal deviation",
          "Asymmetric appearance",
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
        treatments: ["Rhinoplasty", "Non-surgical rhinoplasty", "Nasal filler"],
        educational:
          "Crooked nose affects 40% of people across all age groups. This can be genetic or due to trauma.",
      },
      {
        name: "Dorsal Hump",
        score: 70,
        severity: "moderate" as const,
        description: "Bony prominence on the nasal bridge affecting profile",
        commonality: 35,
        ageGroup: "All ages",
        causes: ["Genetics", "Bone structure", "Ethnicity"],
        symptoms: ["Bony prominence", "Profile imbalance", "Nasal asymmetry"],
        beforeAfter: [
          {
            before: "/Sydney Adams Front.png",
            after: "/Sydney Adams Side.png",
            label: "Rhinoplasty",
          },
        ],
        treatments: ["Rhinoplasty", "Non-surgical rhinoplasty", "Nasal filler"],
        educational:
          "Dorsal hump affects 35% of people across all age groups. This is often genetic.",
      },
      {
        name: "Over-Projected",
        score: 60,
        severity: "mild" as const,
        description:
          "Nose extends too far from the face affecting facial balance",
        commonality: 25,
        ageGroup: "All ages",
        causes: ["Genetics", "Bone structure"],
        symptoms: ["Over-projection", "Facial imbalance", "Profile issues"],
        beforeAfter: [
          {
            before: "/Sydney Adams Front.png",
            after: "/Sydney Adams Side.png",
            label: "Rhinoplasty",
          },
        ],
        treatments: ["Rhinoplasty", "Non-surgical rhinoplasty"],
        educational:
          "Over-projection affects 25% of people across all age groups. This is typically genetic.",
      },
      {
        name: "Over-Rotated",
        score: 55,
        severity: "mild" as const,
        description: "Nasal tip points upward affecting facial harmony",
        commonality: 30,
        ageGroup: "All ages",
        causes: ["Genetics", "Cartilage structure"],
        symptoms: ["Upward rotation", "Visible nostrils", "Facial imbalance"],
        beforeAfter: [
          {
            before: "/Sydney Adams Front.png",
            after: "/Sydney Adams Side.png",
            label: "Rhinoplasty",
          },
        ],
        treatments: ["Rhinoplasty", "Non-surgical rhinoplasty"],
        educational:
          "Over-rotation affects 30% of people across all age groups. This is typically genetic.",
      },
      {
        name: "Nasal Bone - Too Wide",
        score: 65,
        severity: "mild" as const,
        description: "Wide nasal bones affecting facial proportions",
        commonality: 45,
        ageGroup: "All ages",
        causes: ["Genetics", "Ethnicity", "Bone structure"],
        symptoms: ["Wide nose", "Facial imbalance", "Proportional issues"],
        beforeAfter: [
          {
            before: "/Sydney Adams Front.png",
            after: "/Sydney Adams Side.png",
            label: "Rhinoplasty",
          },
        ],
        treatments: ["Rhinoplasty", "Non-surgical rhinoplasty"],
        educational:
          "Wide nasal bones affect 45% of people across all age groups. This is often genetic.",
      },
      {
        name: "Nostril Base - Too Wide",
        score: 60,
        severity: "mild" as const,
        description: "Wide nostril base affecting facial symmetry",
        commonality: 40,
        ageGroup: "All ages",
        causes: ["Genetics", "Cartilage structure"],
        symptoms: ["Wide nostrils", "Facial asymmetry", "Proportional issues"],
        beforeAfter: [
          {
            before: "/Sydney Adams Front.png",
            after: "/Sydney Adams Side.png",
            label: "Rhinoplasty",
          },
        ],
        treatments: ["Rhinoplasty", "Non-surgical rhinoplasty"],
        educational:
          "Wide nostril base affects 40% of people across all age groups. This is typically genetic.",
      },
      {
        name: "Nasal Tip Too Wide",
        score: 70,
        severity: "moderate" as const,
        description: "Wide nasal tip affecting facial proportions",
        commonality: 35,
        ageGroup: "All ages",
        causes: ["Genetics", "Cartilage structure"],
        symptoms: ["Wide tip", "Facial imbalance", "Proportional issues"],
        beforeAfter: [
          {
            before: "/Sydney Adams Front.png",
            after: "/Sydney Adams Side.png",
            label: "Rhinoplasty",
          },
        ],
        treatments: ["Rhinoplasty", "Non-surgical rhinoplasty"],
        educational:
          "Wide nasal tip affects 35% of people across all age groups. This is typically genetic.",
      },
    ],
  },
  {
    id: "cheeks",
    name: "Cheeks",
    score: 80,
    description: "Cheek area analysis including volume and contour",
    icon: Heart,
    color: "pink",
    subcategories: [],
    findings: [
      {
        name: "Mid Cheek Flattening",
        score: 80,
        severity: "moderate" as const,
        description:
          "Loss of mid-cheek volume affecting facial contour and youthful appearance",
        commonality: 70,
        ageGroup: "30-50",
        causes: ["Volume loss", "Fat pad descent", "Bone resorption"],
        symptoms: ["Flattened cheeks", "Aged appearance", "Loss of definition"],
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
        treatments: ["Cheek filler", "Fat grafting", "Sculptra"],
        educational:
          "Mid cheek flattening affects 70% of people aged 30-50. This is one of the most common signs of aging in the mid-face region.",
      },
      {
        name: "Nasolabial Folds",
        score: 78,
        severity: "moderate" as const,
        description: "Lines running from the nose to the corners of the mouth",
        commonality: 75,
        ageGroup: "30-55",
        causes: ["Aging", "Volume loss", "Facial expressions"],
        symptoms: ["Deep lines", "Aged appearance", "Expression lines"],
        beforeAfter: [
          {
            before: "/Sydney Adams Front.png",
            after: "/Sydney Adams Side.png",
            label: "Dermal Filler",
          },
        ],
        treatments: ["Dermal fillers", "Fat grafting", "Thread lift"],
        educational:
          "Nasolabial folds affect 75% of people aged 30-55. These are caused by volume loss and repeated facial expressions.",
      },
      {
        name: "Marionette Lines",
        score: 70,
        severity: "moderate" as const,
        description: "Lines running from the corners of the mouth downward",
        commonality: 65,
        ageGroup: "35-60",
        causes: ["Aging", "Volume loss", "Gravity"],
        symptoms: ["Vertical lines", "Aged appearance", "Sad expression"],
        beforeAfter: [
          {
            before: "/Sydney Adams Front.png",
            after: "/Sydney Adams Side.png",
            label: "Dermal Filler",
          },
        ],
        treatments: ["Dermal fillers", "Fat grafting", "Thread lift"],
        educational:
          "Marionette lines affect 65% of people aged 35-60. These are caused by volume loss and gravity.",
      },
    ],
  },
  {
    id: "lips",
    name: "Lips",
    score: 70,
    description: "Lip area analysis including volume and symmetry",
    icon: Zap,
    color: "red",
    subcategories: [],
    findings: [
      {
        name: "Lip Volume Loss",
        score: 65,
        severity: "mild" as const,
        description:
          "Reduction in lip volume affecting facial balance and expression",
        commonality: 60,
        ageGroup: "25-45",
        causes: ["Aging", "Volume loss", "Sun damage"],
        symptoms: ["Thin lips", "Loss of definition", "Aged appearance"],
        beforeAfter: [
          {
            before: "/Sydney Adams Front.png",
            after: "/Sydney Adams Side.png",
            label: "Lip Filler",
          },
          {
            before: "/Chelsea Perry Front.png",
            after: "/Chelsea Perry Side.png",
            label: "Lip Enhancement",
          },
        ],
        treatments: ["Lip filler", "Lip enhancement", "PRP"],
        educational:
          "Lip volume loss affects 60% of people aged 25-45. This is a natural part of aging as the lips lose volume and definition.",
      },
      {
        name: "Perioral Wrinkles",
        score: 68,
        severity: "moderate" as const,
        description: "Fine lines around the mouth area",
        commonality: 70,
        ageGroup: "30-55",
        causes: ["Aging", "Smoking", "Sun damage"],
        symptoms: ["Fine lines", "Aged appearance", "Expression lines"],
        beforeAfter: [
          {
            before: "/Sydney Adams Front.png",
            after: "/Sydney Adams Side.png",
            label: "Dermal Filler",
          },
        ],
        treatments: ["Dermal fillers", "Microneedling", "Laser resurfacing"],
        educational:
          "Perioral wrinkles affect 70% of people aged 30-55. These are often caused by smoking and sun damage.",
      },
      {
        name: "Thin Lips",
        score: 72,
        severity: "mild" as const,
        description: "Naturally thin lips affecting facial balance",
        commonality: 50,
        ageGroup: "All ages",
        causes: ["Genetics", "Aging", "Volume loss"],
        symptoms: ["Thin appearance", "Lack of definition", "Imbalanced face"],
        beforeAfter: [
          {
            before: "/Sydney Adams Front.png",
            after: "/Sydney Adams Side.png",
            label: "Lip Filler",
          },
        ],
        treatments: ["Lip filler", "Lip enhancement", "Fat grafting"],
        educational:
          "Thin lips affect 50% of people across all age groups. This can be genetic or due to natural aging.",
      },
    ],
  },
  {
    id: "jawline",
    name: "Jawline",
    score: 75,
    description: "Jawline area analysis including definition and contour",
    icon: Shield,
    color: "gray",
    subcategories: [],
    findings: [
      {
        name: "Jawline Definition Loss",
        score: 70,
        severity: "moderate" as const,
        description:
          "Loss of jawline definition affecting facial contour and profile",
        commonality: 65,
        ageGroup: "35-55",
        causes: ["Volume loss", "Skin laxity", "Bone changes"],
        symptoms: ["Soft jawline", "Loss of definition", "Aged appearance"],
        beforeAfter: [
          {
            before: "/Sydney Adams Front.png",
            after: "/Sydney Adams Side.png",
            label: "Jawline Filler",
          },
          {
            before: "/Chelsea Perry Front.png",
            after: "/Chelsea Perry Side.png",
            label: "Thread Lift",
          },
        ],
        treatments: ["Jawline filler", "Thread lift", "Sculptra"],
        educational:
          "Jawline definition loss affects 65% of people aged 35-55. This is a common concern as the face loses structural support.",
      },
      {
        name: "Jowls",
        score: 75,
        severity: "moderate" as const,
        description:
          "Sagging skin along the jawline creating a droopy appearance",
        commonality: 70,
        ageGroup: "40-65",
        causes: ["Aging", "Gravity", "Skin laxity"],
        symptoms: ["Sagging skin", "Droopy appearance", "Loss of definition"],
        beforeAfter: [
          {
            before: "/Sydney Adams Front.png",
            after: "/Sydney Adams Side.png",
            label: "Thread Lift",
          },
        ],
        treatments: ["Thread lift", "Facelift", "Ultherapy"],
        educational:
          "Jowls affect 70% of people aged 40-65. These are caused by aging and gravity affecting skin elasticity.",
      },
      {
        name: "Double Chin",
        score: 68,
        severity: "moderate" as const,
        description: "Excess fat under the chin affecting profile",
        commonality: 60,
        ageGroup: "25-55",
        causes: ["Genetics", "Weight gain", "Aging"],
        symptoms: ["Excess fat", "Poor profile", "Aged appearance"],
        beforeAfter: [
          {
            before: "/Sydney Adams Front.png",
            after: "/Sydney Adams Side.png",
            label: "CoolSculpting",
          },
        ],
        treatments: ["CoolSculpting", "Liposuction", "Kybella"],
        educational:
          "Double chin affects 60% of people aged 25-55. This can be genetic or due to weight gain and aging.",
      },
    ],
  },
  {
    id: "neck",
    name: "Neck",
    score: 60,
    description: "Neck area analysis including skin quality and definition",
    icon: Star,
    color: "purple",
    subcategories: [],
    findings: [
      {
        name: "Neck Lines",
        score: 60,
        severity: "mild" as const,
        description:
          "Horizontal lines on the neck affecting appearance and creating an aged look",
        commonality: 50,
        ageGroup: "40-60",
        causes: ["Aging", "Sun damage", "Repetitive movement"],
        symptoms: ["Neck lines", "Aged appearance", "Loss of smoothness"],
        beforeAfter: [
          {
            before: "/Sydney Adams Front.png",
            after: "/Sydney Adams Side.png",
            label: "Neck Treatment",
          },
          {
            before: "/Chelsea Perry Front.png",
            after: "/Chelsea Perry Side.png",
            label: "Skin Tightening",
          },
        ],
        treatments: ["Neck treatment", "Skin tightening", "Botox"],
        educational:
          "Neck lines affect 50% of people aged 40-60. These are often caused by sun damage and repetitive neck movements.",
      },
      {
        name: "Turkey Neck",
        score: 72,
        severity: "moderate" as const,
        description:
          "Loose, sagging skin on the neck creating a turkey-like appearance",
        commonality: 65,
        ageGroup: "45-70",
        causes: ["Aging", "Gravity", "Weight loss"],
        symptoms: ["Loose skin", "Sagging appearance", "Aged look"],
        beforeAfter: [
          {
            before: "/Sydney Adams Front.png",
            after: "/Sydney Adams Side.png",
            label: "Neck Lift",
          },
        ],
        treatments: ["Neck lift", "Ultherapy", "Thread lift"],
        educational:
          "Turkey neck affects 65% of people aged 45-70. This is caused by aging and gravity affecting skin elasticity.",
      },
      {
        name: "Horizontal Neck Bands",
        score: 68,
        severity: "moderate" as const,
        description: "Horizontal bands across the neck affecting appearance",
        commonality: 55,
        ageGroup: "40-65",
        causes: ["Aging", "Muscle tension", "Genetics"],
        symptoms: ["Horizontal lines", "Aged appearance", "Muscle bands"],
        beforeAfter: [
          {
            before: "/Sydney Adams Front.png",
            after: "/Sydney Adams Side.png",
            label: "Botox",
          },
        ],
        treatments: ["Botox", "Neck lift", "Ultherapy"],
        educational:
          "Horizontal neck bands affect 55% of people aged 40-65. These are caused by aging and muscle tension.",
      },
    ],
  },
  {
    id: "skin",
    name: "Skin",
    score: 85,
    description: "Skin quality analysis including texture and tone",
    icon: Star,
    color: "yellow",
    subcategories: [],
    findings: [
      {
        name: "Dark Spots",
        score: 75,
        severity: "mild" as const,
        description: "Hyperpigmentation affecting skin tone and appearance",
        commonality: 80,
        ageGroup: "25-55",
        causes: ["Sun damage", "Hormones", "Aging", "Acne scarring"],
        symptoms: ["Dark spots", "Uneven skin tone", "Aged appearance"],
        beforeAfter: [
          {
            before: "/Sydney Adams Front.png",
            after: "/Sydney Adams Side.png",
            label: "Laser Treatment",
          },
          {
            before: "/Chelsea Perry Front.png",
            after: "/Chelsea Perry Side.png",
            label: "Chemical Peel",
          },
        ],
        treatments: [
          "Laser treatment",
          "Chemical peels",
          "Microneedling",
          "Topical treatments",
        ],
        educational:
          "Dark spots affect 80% of people aged 25-55. These are primarily caused by sun damage and hormonal changes.",
      },
      {
        name: "Red Spots",
        score: 70,
        severity: "mild" as const,
        description: "Erythema and vascular lesions affecting skin appearance",
        commonality: 60,
        ageGroup: "20-50",
        causes: ["Sun damage", "Genetics", "Rosacea", "Vascular issues"],
        symptoms: ["Red spots", "Vascular lesions", "Skin redness"],
        beforeAfter: [
          {
            before: "/Sydney Adams Front.png",
            after: "/Sydney Adams Side.png",
            label: "Laser Treatment",
          },
        ],
        treatments: ["Laser treatment", "IPL", "Topical treatments"],
        educational:
          "Red spots affect 60% of people aged 20-50. These can be caused by sun damage or vascular issues.",
      },
      {
        name: "Whiteheads",
        score: 65,
        severity: "mild" as const,
        description: "Closed comedones affecting skin texture and appearance",
        commonality: 70,
        ageGroup: "15-35",
        causes: ["Hormones", "Genetics", "Skincare", "Diet"],
        symptoms: ["White bumps", "Clogged pores", "Skin texture issues"],
        beforeAfter: [
          {
            before: "/Sydney Adams Front.png",
            after: "/Sydney Adams Side.png",
            label: "Extraction",
          },
        ],
        treatments: [
          "Extraction",
          "Chemical peels",
          "Microneedling",
          "Skincare",
        ],
        educational:
          "Whiteheads affect 70% of people aged 15-35. These are common during hormonal changes.",
      },
      {
        name: "Blackheads",
        score: 60,
        severity: "mild" as const,
        description: "Open comedones affecting skin appearance and texture",
        commonality: 75,
        ageGroup: "15-35",
        causes: ["Hormones", "Genetics", "Skincare", "Oil production"],
        symptoms: ["Black spots", "Clogged pores", "Skin texture issues"],
        beforeAfter: [
          {
            before: "/Sydney Adams Front.png",
            after: "/Sydney Adams Side.png",
            label: "Extraction",
          },
        ],
        treatments: [
          "Extraction",
          "Chemical peels",
          "Microneedling",
          "Skincare",
        ],
        educational:
          "Blackheads affect 75% of people aged 15-35. These are caused by clogged pores and oil production.",
      },
      {
        name: "Scars",
        score: 80,
        severity: "moderate" as const,
        description: "Tissue damage affecting skin texture and appearance",
        commonality: 50,
        ageGroup: "All ages",
        causes: ["Acne", "Trauma", "Surgery", "Burns"],
        symptoms: ["Textured skin", "Discoloration", "Skin irregularities"],
        beforeAfter: [
          {
            before: "/Sydney Adams Front.png",
            after: "/Sydney Adams Side.png",
            label: "Microneedling",
          },
          {
            before: "/Chelsea Perry Front.png",
            after: "/Chelsea Perry Side.png",
            label: "Laser Treatment",
          },
        ],
        treatments: [
          "Microneedling",
          "Laser treatment",
          "Chemical peels",
          "Dermal fillers",
        ],
        educational:
          "Scars affect 50% of people across all age groups. These can result from acne, trauma, or surgery.",
      },
      {
        name: "Fine Lines",
        score: 70,
        severity: "mild" as const,
        description: "Early signs of aging affecting skin texture",
        commonality: 85,
        ageGroup: "25-45",
        causes: ["Aging", "Sun damage", "Genetics", "Facial expressions"],
        symptoms: ["Fine lines", "Skin texture changes", "Aged appearance"],
        beforeAfter: [
          {
            before: "/Sydney Adams Front.png",
            after: "/Sydney Adams Side.png",
            label: "Botox",
          },
        ],
        treatments: ["Botox", "Dermal fillers", "Microneedling", "Skincare"],
        educational:
          "Fine lines affect 85% of people aged 25-45. These are early signs of aging and sun damage.",
      },
      {
        name: "Skin Texture",
        score: 75,
        severity: "mild" as const,
        description: "Overall skin texture and smoothness affecting appearance",
        commonality: 90,
        ageGroup: "20-50",
        causes: ["Aging", "Sun damage", "Genetics", "Skincare"],
        symptoms: ["Rough texture", "Uneven surface", "Skin irregularities"],
        beforeAfter: [
          {
            before: "/Sydney Adams Front.png",
            after: "/Sydney Adams Side.png",
            label: "Microneedling",
          },
        ],
        treatments: [
          "Microneedling",
          "Chemical peels",
          "Laser treatment",
          "Skincare",
        ],
        educational:
          "Skin texture issues affect 90% of people aged 20-50. These are common with aging and sun exposure.",
      },
    ],
  },
];
