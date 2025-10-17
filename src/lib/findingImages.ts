/**
 * Utility function to get the image path for a specific finding
 * Maps finding names to their corresponding image files in the public/Images/Findings folder
 */

export const getFindingImage = (findingName: string): string => {
  // Clean the finding name to match the file naming convention
  // Convert to the format "Finding=[finding_name].png"
  const cleanName = findingName
    .replace(/[^a-zA-Z0-9\s-]/g, "") // Remove special characters except spaces and hyphens
    .replace(/\s+/g, " ") // Normalize spaces
    .trim();

  // Encode the finding name for URL safety
  const encodedName = encodeURIComponent(`Finding=${cleanName}.png`);

  return `/Images/Findings/${encodedName}`;
};

/**
 * Get a fallback image for findings that don't have specific images
 */
export const getFallbackFindingImage = (): string => {
  return "/Images/Findings/Finding=General.png"; // You might want to add a general fallback image
};

/**
 * Check if a finding image exists by attempting to load it
 * This is useful for error handling in components
 */
export const checkFindingImageExists = async (
  findingName: string
): Promise<boolean> => {
  try {
    const imagePath = getFindingImage(findingName);
    const response = await fetch(imagePath, { method: "HEAD" });
    return response.ok;
  } catch {
    return false;
  }
};

/**
 * List of all available finding images based on the files in the folder
 * This can be used for validation or to get all available findings
 */
export const AVAILABLE_FINDING_IMAGES = [
  "A-Frame Deformity",
  "Acne",
  "Alar Hang",
  "Alar Retraction",
  "Asymmetric Chin",
  "Asymmetric Jawline",
  "Asymmetric Nostril Base",
  "Asymmetric",
  "Blackheads",
  "Brow Asymmetry",
  "Brow Ptosis",
  "Bunny Lines",
  "Cheekbone - Not Prominent",
  "Cheilosis",
  "Columellar Hang",
  "Columellar Retraction",
  "Crepey",
  "Crooked",
  "Crow's Feet Wrinkles",
  "Dark Circles",
  "Dark Spots:Melasma",
  "Deep Labiomental Groove",
  "Deep Radix",
  "Dorsal Hump",
  "Droopy Tip",
  "Dry Lips",
  "Dry",
  "Excess Skin - Lower Eyelid",
  "Excess Skin - Neck",
  "Excess Skin - Upper Eyelid",
  "Excess:Submental Fullness",
  "Eyelid Bags",
  "Eyelid Droop:Ptosis",
  "Flat Forehead",
  "Forehead Wrinkles",
  "Glabella Wrinkles",
  "Gummy Smile",
  "JawlineIllDefined",
  "Jowls",
  "Lacking Philtral Column",
  "Lateral Cheek - Too Full",
  "Lips Thinning When Smiling",
  "Long Philtral Column",
  "Lower Cheek - Over-Fill",
  "Lower Cheek - Volume Depletion",
  "Lower Eyelid Sag",
  "Marionette Lines",
  "Masseter Hypertrophy",
  "Mid Cheek - Flattened",
  "Narrow Jawline",
  "Nasal Bone - Too Narrow",
  "Nasal Bone - Too Wide",
  "Nasal Fat Pad",
  "Nasal Tip Too Narrow",
  "Nasal Tip Too Wide",
  "Nasolabial Folds",
  "Neck Lines",
  "Negative Canthal Tilt",
  "Nostril Base - Too Narrow",
  "Nostril Base - Too Wide",
  "Obtuse Cervicomental Angle",
  "Oily",
  "Over-Projected Chin",
  "Over-Projected",
  "Over-Rotated",
  "Perioral Wrinkles",
  "Platysmal Bands",
  "Prejowl Sulcus",
  "Red Spots",
  "Retruded Chin",
  "Rosacea",
  "Scars",
  "Shallow Labiomental Groove",
  "Shallow Radix",
  "Temporal Hollow",
  "Thin",
  "Tip Droop When Smiling",
  "Under Eye Hollow",
  "Under Eye Wrinkles",
  "Under-Projected",
  "Under-Rotated",
  "Upper Eye Hollow",
  "Whiteheads",
  "Wide Chin",
  "Wide Jawline",
] as const;
