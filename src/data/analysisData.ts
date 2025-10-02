import { Target, Eye, Heart, Zap, Shield, Star } from "lucide-react";

export const analysisAreas = [
  {
    id: "forehead",
    name: "Forehead",
    icon: Target,
    color: "blue",
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
    icon: Eye,
    color: "blue",
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
    id: "cheeks",
    name: "Cheeks",
    icon: Heart,
    color: "pink",
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
    icon: Zap,
    color: "red",
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
    icon: Shield,
    color: "gray",
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
    icon: Star,
    color: "purple",
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
];
