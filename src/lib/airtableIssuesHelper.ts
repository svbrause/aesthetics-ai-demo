/**
 * Helper functions for working with Airtable issues data
 */

/**
 * Converts an array of issues to a comma-separated string
 * @param issues Array of issue names
 * @returns Comma-separated string of issues
 */
export function issuesArrayToString(issues: string[]): string {
  if (!Array.isArray(issues) || issues.length === 0) {
    return "";
  }

  return issues
    .filter((issue) => issue && !issue.includes("[DEPRECATED]"))
    .join(", ");
}

/**
 * Converts a comma-separated string of issues to an array
 * @param issuesString Comma-separated string of issues
 * @returns Array of issue names
 */
export function issuesStringToArray(issuesString: string): string[] {
  if (!issuesString || typeof issuesString !== "string") {
    return [];
  }

  return issuesString
    .split(",")
    .map((issue) => issue.trim())
    .filter((issue) => issue && !issue.includes("[DEPRECATED]"));
}

/**
 * Extracts findings from Airtable fields with fallback logic
 * @param fields Airtable record fields
 * @returns Array of issue names
 */
export function extractFindingsFromAirtable(fields: any): string[] {
  // First try the new "Issues String" field if it exists
  if (
    fields[
      "Issues String (from Patient-Issue/Suggestion Mapping) (from Interest Items)"
    ]
  ) {
    const issuesString =
      fields[
        "Issues String (from Patient-Issue/Suggestion Mapping) (from Interest Items)"
      ];
    return issuesStringToArray(issuesString);
  }

  // Fallback to the existing array field
  const airtableFindings =
    fields["Name (from All Issues) (from Analyses)"] || [];
  if (Array.isArray(airtableFindings)) {
    return airtableFindings.filter(
      (finding: string) => finding && !finding.includes("[DEPRECATED]")
    );
  }

  return [];
}

/**
 * Creates a summary of findings for display
 * @param findings Array of issue names
 * @returns Object with findings summary
 */
export function createFindingsSummary(findings: string[]): {
  total: number;
  byCategory: { [category: string]: string[] };
  summary: string;
} {
  const categories = {
    Forehead: ["Forehead Wrinkles", "Glabella Wrinkles", "Bunny Lines"],
    Eyes: [
      "Crow's Feet Wrinkles",
      "Under Eye Wrinkles",
      "Under Eye Hollow",
      "Upper Eye Hollow",
      "Lower Eyelid Bags",
      "Excess Upper Eyelid Skin",
    ],
    Cheeks: ["Mid Cheek Flattening", "Temporal Hollow"],
    Nose: [
      "Crooked Nose",
      "Dorsal Hump",
      "Over-Projected",
      "Over-Rotated",
      "Nasal Bone - Too Wide",
      "Nostril Base - Too Wide",
      "Nasal Tip Too Wide",
    ],
    Lips: ["Thin Lips", "Asymmetric Lips", "Dry Lips", "Long Philtral Column"],
    Jawline: [
      "Prejowl Sulcus",
      "Retruded Chin",
      "Asymmetric Chin",
      "Ill-Defined Jawline",
      "Jowls",
    ],
    Neck: [
      "Neck Lines",
      "Turkey Neck",
      "Horizontal Neck Bands",
      "Loose Neck Skin",
      "Excess/Submental Fullness",
    ],
    Skin: [
      "Dark Spots",
      "Red Spots",
      "Whiteheads",
      "Blackheads",
      "Scars",
      "Fine Lines",
      "Skin Texture",
    ],
  };

  const byCategory: { [category: string]: string[] } = {};
  let total = 0;

  // Initialize categories
  Object.keys(categories).forEach((category) => {
    byCategory[category] = [];
  });

  // Categorize findings
  findings.forEach((finding) => {
    total++;
    let categorized = false;

    Object.entries(categories).forEach(([category, keywords]) => {
      if (keywords.some((keyword) => finding.includes(keyword))) {
        byCategory[category].push(finding);
        categorized = true;
      }
    });

    // If not categorized, add to "Other"
    if (!categorized) {
      if (!byCategory["Other"]) {
        byCategory["Other"] = [];
      }
      byCategory["Other"].push(finding);
    }
  });

  // Create summary string
  const summaryParts: string[] = [];
  Object.entries(byCategory).forEach(([category, issues]) => {
    if (issues.length > 0) {
      summaryParts.push(
        `${category}: ${issues.length} issue${issues.length > 1 ? "s" : ""}`
      );
    }
  });

  return {
    total,
    byCategory,
    summary: summaryParts.join(", "),
  };
}
