export interface AirtablePhoto {
  id: string;
  fields: {
    Photo?: Array<{
      id: string;
      url: string;
      filename: string;
      size: number;
      type: string;
      thumbnails?: {
        small: { url: string; width: number; height: number };
        large: { url: string; width: number; height: number };
        full: { url: string; width: number; height: number };
      };
    }>;
    Treatment?: string;
    Issues?: string[];
    StoryTitle?: string;
    StoryDetailed?: string;
    Source?: string;
  };
}

export interface AirtablePhotosResponse {
  records: AirtablePhoto[];
  offset?: string;
}

// Cache for photos to avoid repeated API calls
let photosCache: AirtablePhoto[] | null = null;
let cacheTimestamp: number = 0;
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export async function fetchAirtablePhotos(): Promise<AirtablePhoto[]> {
  // Check cache first
  const now = Date.now();
  if (photosCache && now - cacheTimestamp < CACHE_DURATION) {
    return photosCache;
  }

  try {
    const response = await fetch("/api/airtable-photos");
    if (!response.ok) {
      throw new Error(`Failed to fetch photos: ${response.status}`);
    }

    const data: AirtablePhotosResponse = await response.json();
    photosCache = data.records;
    cacheTimestamp = now;
    return data.records;
  } catch (error) {
    console.error("Error fetching Airtable photos:", error);
    return [];
  }
}

export async function fetchAirtablePhotoByName(
  photoName: string
): Promise<AirtablePhoto | null> {
  try {
    const response = await fetch(
      `/api/airtable-photos?filterByFormula=${encodeURIComponent(
        `{Name} = "${photoName}"`
      )}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch photo by name: ${response.status}`);
    }

    const data: AirtablePhotosResponse = await response.json();
    return data.records.length > 0 ? data.records[0] : null;
  } catch (error) {
    console.error(
      `Error fetching Airtable photo by name "${photoName}":`,
      error
    );
    return null;
  }
}

// Helper function to find the best photo for a treatment based on its serves array
export function findBestPhotoForTreatment(
  photos: AirtablePhoto[],
  treatmentServes: string[],
  treatmentName?: string
): string | null {
  if (!photos.length || !treatmentServes.length) {
    return null;
  }

  let bestPhoto = null;
  let bestScore = 0;

  for (const photo of photos) {
    if (!photo.fields.Photo?.[0]?.url) continue;

    let score = 0;

    // 1. Exact treatment name match (highest priority)
    if (treatmentName && photo.fields.Treatment) {
      if (
        photo.fields.Treatment.toLowerCase() === treatmentName.toLowerCase()
      ) {
        score += 50; // Much higher score for exact treatment match
      } else if (
        photo.fields.Treatment.toLowerCase().includes(
          treatmentName.toLowerCase()
        ) ||
        treatmentName
          .toLowerCase()
          .includes(photo.fields.Treatment.toLowerCase())
      ) {
        score += 25; // High score for partial treatment match
      }
    }

    // 2. Treatment category matching
    if (treatmentName && photo.fields.Treatment) {
      const treatmentCategory = getTreatmentCategory(treatmentName);
      const photoCategory = getTreatmentCategory(photo.fields.Treatment);
      if (treatmentCategory === photoCategory) {
        score += 10; // Good score for same category
      }
    }

    // 3. Issues matching (existing logic)
    if (photo.fields.Issues) {
      for (const serves of treatmentServes) {
        for (const issue of photo.fields.Issues) {
          // Exact issue match
          if (issue.toLowerCase() === serves.toLowerCase()) {
            score += 10;
          }
          // Partial issue match
          else if (
            issue.toLowerCase().includes(serves.toLowerCase()) ||
            serves.toLowerCase().includes(issue.toLowerCase())
          ) {
            score += 5;
          }
          // Word-level match
          else {
            const servesWords = serves.toLowerCase().split(/\s+/);
            const issueWords = issue.toLowerCase().split(/\s+/);
            const wordMatches = servesWords.filter((word: string) =>
              issueWords.some(
                (issueWord: string) =>
                  issueWord.includes(word) || word.includes(issueWord)
              )
            );
            score += wordMatches.length;
          }
        }
      }
    }

    // 4. Story title matching (bonus points)
    if (treatmentName && photo.fields.StoryTitle) {
      const storyWords = photo.fields.StoryTitle.toLowerCase().split(/\s+/);
      const treatmentWords = treatmentName.toLowerCase().split(/\s+/);
      const storyMatches = treatmentWords.filter((word: string) =>
        storyWords.some(
          (storyWord: string) =>
            storyWord.includes(word) || word.includes(storyWord)
        )
      );
      score += storyMatches.length * 2; // Bonus for story title matches
    }

    if (score > bestScore) {
      bestScore = score;
      bestPhoto = photo.fields.Photo[0].url;
    }
  }

  return bestPhoto;
}

// Helper function to extract treatment category from treatment name
function getTreatmentCategory(treatmentName: string): string {
  const name = treatmentName.toLowerCase();

  if (
    name.includes("filler") ||
    name.includes("voluma") ||
    name.includes("juvederm") ||
    name.includes("sculptra") ||
    name.includes("temporal") ||
    name.includes("nasolabial") ||
    name.includes("marionette") ||
    name.includes("jawline") ||
    name.includes("chin") ||
    name.includes("lip") ||
    name.includes("prejowl")
  ) {
    return "filler";
  }

  if (
    name.includes("botox") ||
    name.includes("neurotoxin") ||
    name.includes("neck")
  ) {
    return "botox";
  }

  if (name.includes("peel") || name.includes("chemical")) {
    return "peel";
  }

  if (
    name.includes("blepharoplasty") ||
    name.includes("brow") ||
    name.includes("lift") ||
    name.includes("surgical")
  ) {
    return "surgical";
  }

  if (
    name.includes("prp") ||
    name.includes("skincare") ||
    name.includes("regenerative")
  ) {
    return "skincare";
  }

  if (name.includes("thread") || name.includes("lifting")) {
    return "thread";
  }

  return "other";
}

// Helper function to find unique photos for multiple treatments
export function findUniquePhotosForTreatments(
  photos: AirtablePhoto[],
  treatments: any[]
): { [treatmentId: string]: string } {
  const photoMap: { [treatmentId: string]: string } = {};
  const usedPhotos = new Set<string>();

  console.log(
    `Finding unique photos for ${treatments.length} treatments from ${photos.length} photos`
  );

  // Sort treatments by specificity (more specific issues first)
  const sortedTreatments = [...treatments].sort((a, b) => {
    const aSpecificity = a.serves?.length || 0;
    const bSpecificity = b.serves?.length || 0;
    return bSpecificity - aSpecificity;
  });

  for (const treatment of sortedTreatments) {
    if (!treatment.serves || treatment.serves.length === 0) continue;

    let bestPhoto = null;
    let bestScore = 0;
    let bestPhotoDetails: {
      issues: string[];
      treatment: string;
      storyTitle?: string;
    } = {
      issues: [],
      treatment: "",
      storyTitle: "",
    };

    // Find the best unused photo for this treatment
    for (const photo of photos) {
      if (!photo.fields.Photo?.[0]?.url) continue;

      const photoUrl = photo.fields.Photo[0].url;
      if (usedPhotos.has(photoUrl)) continue; // Skip already used photos

      let score = 0;

      // 1. Exact treatment name match (highest priority)
      if (photo.fields.Treatment) {
        if (
          photo.fields.Treatment.toLowerCase() === treatment.name.toLowerCase()
        ) {
          score += 50; // Much higher score for exact treatment match
        } else if (
          photo.fields.Treatment.toLowerCase().includes(
            treatment.name.toLowerCase()
          ) ||
          treatment.name
            .toLowerCase()
            .includes(photo.fields.Treatment.toLowerCase())
        ) {
          score += 25; // High score for partial treatment match
        }
      }

      // 2. Treatment category matching
      if (photo.fields.Treatment) {
        const treatmentCategory = getTreatmentCategory(treatment.name);
        const photoCategory = getTreatmentCategory(photo.fields.Treatment);
        if (treatmentCategory === photoCategory) {
          score += 10; // Good score for same category
        }
      }

      // 3. Issues matching
      if (photo.fields.Issues) {
        for (const serves of treatment.serves) {
          for (const issue of photo.fields.Issues) {
            // Exact issue match
            if (issue.toLowerCase() === serves.toLowerCase()) {
              score += 10;
            }
            // Partial issue match
            else if (
              issue.toLowerCase().includes(serves.toLowerCase()) ||
              serves.toLowerCase().includes(issue.toLowerCase())
            ) {
              score += 5;
            }
            // Word-level match
            else {
              const servesWords = serves.toLowerCase().split(/\s+/);
              const issueWords = issue.toLowerCase().split(/\s+/);
              const wordMatches = servesWords.filter((word: string) =>
                issueWords.some(
                  (issueWord: string) =>
                    issueWord.includes(word) || word.includes(issueWord)
                )
              );
              score += wordMatches.length;
            }
          }
        }
      }

      // 4. Story title matching (bonus points)
      if (photo.fields.StoryTitle) {
        const storyWords = photo.fields.StoryTitle.toLowerCase().split(/\s+/);
        const treatmentWords = treatment.name.toLowerCase().split(/\s+/);
        const storyMatches = treatmentWords.filter((word: string) =>
          storyWords.some(
            (storyWord: string) =>
              storyWord.includes(word) || word.includes(storyWord)
          )
        );
        score += storyMatches.length * 2; // Bonus for story title matches
      }

      if (score > bestScore) {
        bestScore = score;
        bestPhoto = photoUrl;
        bestPhotoDetails = {
          issues: photo.fields.Issues || [],
          treatment: photo.fields.Treatment || "",
          storyTitle: photo.fields.StoryTitle || "",
        };
      }
    }

    // If we found a good match, use it and mark as used
    if (bestPhoto) {
      photoMap[treatment.id] = bestPhoto;
      usedPhotos.add(bestPhoto);
      console.log(
        `Treatment ${treatment.name} (serves: ${treatment.serves.join(
          ", "
        )}) -> Photo: ${
          bestPhotoDetails.treatment
        } with issues: ${bestPhotoDetails.issues.join(
          ", "
        )} (score: ${bestScore})`
      );
    } else {
      console.log(
        `No suitable photo found for treatment ${
          treatment.name
        } (serves: ${treatment.serves.join(", ")})`
      );
    }
  }

  console.log(
    `Photo assignment complete. ${
      Object.keys(photoMap).length
    } treatments got photos, ${usedPhotos.size} unique photos used`
  );
  return photoMap;
}

// Helper function to get photos by treatment category
export function getPhotosByTreatment(
  photos: AirtablePhoto[],
  treatmentCategory: string
): AirtablePhoto[] {
  return photos.filter((photo) =>
    photo.fields.Treatment?.toLowerCase().includes(
      treatmentCategory.toLowerCase()
    )
  );
}

// Helper function to get photos by issue
export function getPhotosByIssue(
  photos: AirtablePhoto[],
  issue: string
): AirtablePhoto[] {
  return photos.filter((photo) =>
    photo.fields.Issues?.some(
      (photoIssue) =>
        photoIssue.toLowerCase().includes(issue.toLowerCase()) ||
        issue.toLowerCase().includes(photoIssue.toLowerCase())
    )
  );
}
