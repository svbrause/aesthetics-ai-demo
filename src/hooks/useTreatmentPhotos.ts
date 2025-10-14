import { useState, useEffect } from "react";
import {
  fetchAirtablePhotos,
  findBestPhotoForTreatment,
  findUniquePhotosForTreatments,
} from "@/lib/airtablePhotos";

interface TreatmentPhotoMap {
  [treatmentId: string]: string;
}

export function useTreatmentPhotos(treatments: any[]) {
  const [photoMap, setPhotoMap] = useState<TreatmentPhotoMap>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPhotos() {
      try {
        setLoading(true);
        setError(null);

        const photos = await fetchAirtablePhotos();

        // Use the new function that ensures unique photos for each treatment
        const newPhotoMap = findUniquePhotosForTreatments(photos, treatments);

        setPhotoMap(newPhotoMap);
      } catch (err) {
        console.error("Error loading treatment photos:", err);
        setError(err instanceof Error ? err.message : "Failed to load photos");
      } finally {
        setLoading(false);
      }
    }

    if (treatments.length > 0) {
      loadPhotos();
    }
  }, [treatments]);

  const getTreatmentPhoto = (
    treatmentId: string,
    fallbackUrl: string = "/treatment-photos/fillers/filler.jpg"
  ) => {
    return photoMap[treatmentId] || fallbackUrl;
  };

  return {
    photoMap,
    getTreatmentPhoto,
    loading,
    error,
  };
}
