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
        photo.fields.Issues.some((issue) => {
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
