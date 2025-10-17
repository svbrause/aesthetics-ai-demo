// Issue to Area mapping based on the CSV file
export const ISSUE_AREA_MAPPING: Record<string, string> = {
  "Forehead Wrinkles": "Skin",
  "Crow's Feet Wrinkles": "Skin",
  "Glabella Wrinkles": "Skin",
  "Under Eye Wrinkles": "Skin",
  "Perioral Wrinkles": "Skin",
  "Bunny Lines": "Skin",
  "Neck Lines": "Skin",
  "Dark Spots": "Skin",
  "Red Spots": "Skin",
  Scars: "Skin",
  "Dry Skin": "Skin",
  Whiteheads: "Skin",
  Blackheads: "Skin",
  "Under Eye Dark Circles": "Eyes",
  "Crepey Skin": "Skin",
  "Rosacea [DEPRECATED]": "Skin",
  "Nasolabial Folds": "Skin",
  "Marionette Lines": "Skin",
  "Temporal Hollow": "Forehead",
  "Brow Asymmetry": "Forehead",
  "Flat Forehead": "Forehead",
  "Brow Ptosis": "Forehead",
  "Excess Upper Eyelid Skin": "Eyes",
  "Lower Eyelid - Excess Skin": "Eyes",
  "Upper Eyelid Droop": "Eyes",
  "Lower Eyelid Sag": "Eyes",
  "Lower Eyelid Bags": "Eyes",
  "Under Eye Hollow": "Eyes",
  "Upper Eye Hollow": "Eyes",
  "Mid Cheek Flattening": "Cheeks",
  "Cheekbone - Not Prominent": "Cheeks",
  "Heavy Lateral Cheek": "Cheeks",
  "Crooked Nose": "Nose",
  "Droopy Tip": "Nose",
  "Dorsal Hump": "Nose",
  "Tip Droop When Smiling": "Nose",
  "Thin Lips": "Lips",
  "Lacking Philtral Column": "Lips",
  "Long Philtral Column": "Lips",
  "Gummy Smile": "Lips",
  "Asymmetric Lips": "Lips",
  "Dry Lips": "Lips",
  "Lip Thinning When Smiling": "Lips",
  "Retruded Chin": "Jawline",
  "Over-Projected Chin": "Jawline",
  "Asymmetric Chin": "Jawline",
  Jowls: "Jawline",
  "Lower Cheeks - Volume Depletion": "Jawline",
  "Ill-Defined Jawline": "Jawline",
  "Asymmetric Jawline": "Jawline",
  "Masseter Hypertrophy": "Jawline",
  "Prejowl Sulcus": "Jawline",
  "Loose Neck Skin": "Jawline",
  "Platysmal Bands": "Jawline",
  "Excess/Submental Fullness": "Jawline",
  // Additional mappings for other issues that might appear
  "Over-Projected": "Nose",
  "Over-Rotated": "Nose",
  "Under-Projected": "Nose",
  "Under-Rotated": "Nose",
  "Nasal Bone - Too Wide": "Nose",
  "Nasal Tip Too Wide": "Nose",
  "Nasal Tip Too Narrow": "Nose",
  "Nostril Base - Too Wide": "Nose",
  "Negative Canthal Tilt": "Eyes",
  "Wide Chin": "Jawline",
  "Wide Jawline": "Jawline",
  "Narrow Jawline": "Jawline",
  Oily: "Skin",
  "Acne [DEPRECATED]": "Skin",
  "Alar Hang [DEPRECATED]": "Nose",
  "Alar Retraction [DEPRECATED]": "Nose",
  "Asymmetric Nostril Base [DEPRECATED]": "Nose",
  "Cheilosis [DEPRECATED]": "Lips",
  "Columellar Hang [DEPRECATED]": "Nose",
  "Columellar Retraction [DEPRECATED]": "Nose",
  "Deep Labiomental Groove [DEPRECATED]": "Lips",
  "Deep Radix [DEPRECATED]": "Nose",
  "Shallow Labiomental Groove [DEPRECATED]": "Lips",
  "Shallow Radix [DEPRECATED]": "Nose",
  "Obtuse Cervicomental Angle [DEPRECATED]": "Jawline",
};

// Get area for an issue name
export function getAreaForIssue(issueName: string): string {
  return ISSUE_AREA_MAPPING[issueName] || "Other";
}

// Get all unique areas
export function getAllAreas(): string[] {
  const areas = new Set(Object.values(ISSUE_AREA_MAPPING));
  return Array.from(areas).sort();
}

// Scale probability to grade-like score (60-95 range)
// Higher probability = lower score (like grades: F=60, A=95)
export function scaleProbabilityToScore(probability: number): number {
  // Clamp probability between 0 and 1
  const clampedProb = Math.max(0, Math.min(1, probability));

  // Scale from 0-1 to 60-95 (inverted: higher prob = lower score)
  // Formula: 95 - (probability * 35)
  const score = 95 - clampedProb * 35;

  // Round to nearest integer
  return Math.round(score);
}

// Get grade letter for score
export function getGradeLetter(score: number): string {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

// Get color for score
export function getScoreColor(score: number): string {
  if (score >= 90) return "text-green-400";
  if (score >= 80) return "text-blue-400";
  if (score >= 70) return "text-yellow-400";
  if (score >= 60) return "text-orange-400";
  return "text-red-400";
}

// Get background color for score
export function getScoreBgColor(score: number): string {
  if (score >= 90) return "bg-green-400/20";
  if (score >= 80) return "bg-blue-400/20";
  if (score >= 70) return "bg-yellow-400/20";
  if (score >= 60) return "bg-orange-400/20";
  return "bg-red-400/20";
}
