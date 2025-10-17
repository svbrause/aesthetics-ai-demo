// Photo mapping utility based on CSV data
// Maps treatments and issues to relevant photos

export interface PhotoMapping {
  photo: string;
  issues: string[];
  treatment: string;
  storyTitle?: string;
  storyDetailed?: string;
  source?: string;
}

// Parse CSV data and create photo mappings
export function parsePhotoMappings(csvData: string): PhotoMapping[] {
  const lines = csvData.split("\n");
  const headers = lines[0].split(",");

  const mappings: PhotoMapping[] = [];

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;

    // Parse CSV line (handling commas within quoted fields)
    const fields = parseCSVLine(line);

    if (fields.length < 18) continue;

    const photo = fields[2]?.trim();
    const issues =
      fields[15]
        ?.split(",")
        .map((issue) => issue.trim())
        .filter(Boolean) || [];
    const treatment = fields[17]?.trim();
    const storyTitle = fields[3]?.trim();
    const storyDetailed = fields[4]?.trim();
    const source = fields[5]?.trim();

    if (photo && treatment && issues.length > 0) {
      mappings.push({
        photo: extractPhotoUrl(photo),
        issues,
        treatment,
        storyTitle,
        storyDetailed,
        source,
      });
    }
  }

  return mappings;
}

// Helper function to parse CSV line handling quoted fields
function parseCSVLine(line: string): string[] {
  const fields: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === "," && !inQuotes) {
      fields.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  fields.push(current);
  return fields;
}

// Extract photo URL from the CSV photo field
function extractPhotoUrl(photoField: string): string {
  // Handle cases where photo field contains URL in parentheses
  const urlMatch = photoField.match(/\(https?:\/\/[^)]+\)/);
  if (urlMatch) {
    return urlMatch[0].slice(1, -1); // Remove parentheses
  }

  // Handle cases where it's just a filename
  const filenameMatch = photoField.match(/([^,]+\.(jpg|jpeg|png|webp))/i);
  if (filenameMatch) {
    return filenameMatch[1];
  }

  return photoField;
}

// Find photos for a specific treatment and issues
export function findPhotosForTreatment(
  mappings: PhotoMapping[],
  treatmentName: string,
  issues: string[]
): PhotoMapping[] {
  return mappings.filter((mapping) => {
    // Check if treatment matches
    const treatmentMatch =
      mapping.treatment.toLowerCase().includes(treatmentName.toLowerCase()) ||
      treatmentName.toLowerCase().includes(mapping.treatment.toLowerCase());

    // Check if any issues match
    const issueMatch = issues.some((issue) =>
      mapping.issues.some(
        (mappingIssue) =>
          mappingIssue.toLowerCase().includes(issue.toLowerCase()) ||
          issue.toLowerCase().includes(mappingIssue.toLowerCase())
      )
    );

    return treatmentMatch && issueMatch;
  });
}

// Get the best photo for a treatment based on issue overlap
export function getBestPhotoForTreatment(
  mappings: PhotoMapping[],
  treatmentName: string,
  issues: string[]
): string | null {
  const relevantPhotos = findPhotosForTreatment(
    mappings,
    treatmentName,
    issues
  );

  if (relevantPhotos.length === 0) {
    return null;
  }

  // Sort by number of matching issues (most relevant first)
  relevantPhotos.sort((a, b) => {
    const aMatches = countMatchingIssues(a.issues, issues);
    const bMatches = countMatchingIssues(b.issues, issues);
    return bMatches - aMatches;
  });

  return relevantPhotos[0].photo;
}

// Count how many issues match between two arrays
function countMatchingIssues(issues1: string[], issues2: string[]): number {
  return issues1.filter((issue1) =>
    issues2.some(
      (issue2) =>
        issue1.toLowerCase().includes(issue2.toLowerCase()) ||
        issue2.toLowerCase().includes(issue1.toLowerCase())
    )
  ).length;
}

// Get all unique treatments from mappings
export function getAllTreatments(mappings: PhotoMapping[]): string[] {
  const treatments = new Set<string>();
  mappings.forEach((mapping) => treatments.add(mapping.treatment));
  return Array.from(treatments);
}

// Get all unique issues from mappings
export function getAllIssues(mappings: PhotoMapping[]): string[] {
  const issues = new Set<string>();
  mappings.forEach((mapping) => {
    mapping.issues.forEach((issue) => issues.add(issue));
  });
  return Array.from(issues);
}
