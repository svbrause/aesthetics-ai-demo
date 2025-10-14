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

// Helper function to find the best photo for a treatment based on its serves array
export function findBestPhotoForTreatment(
  photos: AirtablePhoto[],
  treatmentServes: string[]
): string | null {
  if (!photos.length || !treatmentServes.length) {
    return null;
  }

  // First, try to find exact matches
  for (const photo of photos) {
    if (photo.fields.Issues && photo.fields.Photo?.[0]?.url) {
      const hasExactMatch = treatmentServes.some((serves) =>
        photo.fields.Issues?.some(
          (issue) =>
            issue.toLowerCase().includes(serves.toLowerCase()) ||
            serves.toLowerCase().includes(issue.toLowerCase())
        )
      );
      if (hasExactMatch) {
        return photo.fields.Photo[0].url;
      }
    }
  }

  // If no exact match, try partial matches
  for (const photo of photos) {
    if (photo.fields.Issues && photo.fields.Photo?.[0]?.url) {
      const hasPartialMatch = treatmentServes.some((serves) =>
        photo.fields.Issues?.some((issue) => {
          const servesWords = serves.toLowerCase().split(/\s+/);
          const issueWords = issue.toLowerCase().split(/\s+/);
          return servesWords.some((word) =>
            issueWords.some(
              (issueWord) =>
                issueWord.includes(word) || word.includes(issueWord)
            )
          );
        })
      );
      if (hasPartialMatch) {
        return photo.fields.Photo[0].url;
      }
    }
  }

  // If still no match, return the first available photo
  const firstPhoto = photos.find((photo) => photo.fields.Photo?.[0]?.url);
  return firstPhoto?.fields.Photo?.[0]?.url || null;
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
    let bestPhotoIssues: string[] = [];

    // Find the best unused photo for this treatment
    for (const photo of photos) {
      if (!photo.fields.Issues || !photo.fields.Photo?.[0]?.url) continue;

      const photoUrl = photo.fields.Photo[0].url;
      if (usedPhotos.has(photoUrl)) continue; // Skip already used photos

      // Calculate match score
      let score = 0;
      for (const serves of treatment.serves) {
        for (const issue of photo.fields.Issues) {
          // Exact match gets highest score
          if (issue.toLowerCase() === serves.toLowerCase()) {
            score += 10;
          }
          // Partial match gets medium score
          else if (
            issue.toLowerCase().includes(serves.toLowerCase()) ||
            serves.toLowerCase().includes(issue.toLowerCase())
          ) {
            score += 5;
          }
          // Word-level match gets lower score
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

      if (score > bestScore) {
        bestScore = score;
        bestPhoto = photoUrl;
        bestPhotoIssues = photo.fields.Issues || [];
      }
    }

    // If we found a good match, use it and mark as used
    if (bestPhoto) {
      photoMap[treatment.id] = bestPhoto;
      usedPhotos.add(bestPhoto);
      console.log(
        `Treatment ${treatment.name} (serves: ${treatment.serves.join(
          ", "
        )}) -> Photo with issues: ${bestPhotoIssues.join(
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
