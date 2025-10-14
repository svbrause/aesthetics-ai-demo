// Mapping from Airtable "Which regions of your face do you want to improve?" values to internal area names
export const AIRTABLE_AREA_MAPPING: Record<string, string> = {
  // Primary options from the Airtable question
  Eyebrows: "forehead", // Eyebrows map to forehead area
  Eyes: "eyes",
  Cheeks: "cheeks",
  Nose: "nose",
  Lips: "lips",
  "Face and Neck Aging": "skin", // Map to skin as requested
  "Jawline/chin": "jawline",

  // Additional mappings for edge cases and variations
  "Face and neck aging": "skin", // Alternative casing
  Jawline: "jawline",
  Chin: "jawline",
  Neck: "jawline", // Neck issues often relate to jawline area

  // Legacy mappings for backward compatibility
  Forehead: "forehead",
  Skin: "skin",
  "Skin tone": "skin",
  Ears: "ears",
  "Sides of face": "cheeks",

  // Specific issue mappings
  "Marionette lines": "skin", // These are skin-related
  "Acne scars on back and lower side of thighs": "skin",
  "Face acne, scarring": "skin",
  "Improve scars": "skin",

  // Handle uncertain responses
  Idk: "other",
  "I'm not sure": "other",
  any: "other",
  "While face": "other", // Likely a typo for "whole face"
  "Smile lines?": "skin", // These are typically skin-related
  "My cheeks are sagging, the older I get.": "cheeks",
};

// Get internal area name for an Airtable area value
export function getInternalAreaName(airtableArea: string): string {
  return AIRTABLE_AREA_MAPPING[airtableArea] || "other";
}

// Convert array of Airtable area values to internal area names
export function convertAirtableAreasToInternal(
  airtableAreas: string[]
): string[] {
  if (!Array.isArray(airtableAreas)) {
    return [];
  }

  return airtableAreas.map((area) => getInternalAreaName(area));
}

// Get display name for internal area
export function getAreaDisplayName(internalArea: string): string {
  const displayNames: Record<string, string> = {
    forehead: "Forehead",
    eyes: "Eyes",
    cheeks: "Cheeks",
    nose: "Nose",
    lips: "Lips",
    jawline: "Jawline",
    ears: "Ears",
    skin: "Skin",
    other: "Other",
  };

  return displayNames[internalArea] || internalArea;
}
