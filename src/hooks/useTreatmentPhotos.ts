import { useState, useEffect } from "react";
import {
  fetchAirtablePhotos,
  fetchAirtablePhotoByName,
  findBestPhotoForTreatment,
  findUniquePhotosForTreatments,
} from "@/lib/airtablePhotos";
import {
  getBestPhotoForTreatment as getLocalPhoto,
  getLocalPhotoMappingData,
} from "@/data/photoMappings";

interface TreatmentPhotoMap {
  [treatmentId: string]: string;
}

interface TreatmentPhotoMetadata {
  [treatmentId: string]: {
    url: string;
    name?: string;
    treatment?: string;
    issues?: string[];
    storyTitle?: string;
  };
}

export function useTreatmentPhotos(treatments: any[]) {
  const [photoMap, setPhotoMap] = useState<TreatmentPhotoMap>({});
  const [photoMetadata, setPhotoMetadata] = useState<TreatmentPhotoMetadata>(
    {}
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPhotos() {
      try {
        setLoading(true);
        setError(null);

        let newPhotoMap: TreatmentPhotoMap = {};
        let newPhotoMetadata: TreatmentPhotoMetadata = {};

        // Use local photo mappings directly since we have all photos locally
        treatments.forEach((treatment) => {
          if (treatment.serves && treatment.serves.length > 0) {
            const mappingData = getLocalPhotoMappingData(
              treatment.name,
              treatment.serves
            );
            if (mappingData) {
              newPhotoMap[treatment.id] = mappingData.photo;
              newPhotoMetadata[treatment.id] = {
                url: mappingData.photo,
                name: mappingData.name,
                treatment: mappingData.treatment,
                issues: mappingData.issues,
                storyTitle: mappingData.storyTitle,
              };
              console.log(
                `Using local photo for treatment ${treatment.name} with name "${mappingData.name}":`,
                mappingData.photo
              );
            } else {
              // Fallback to treatment's default image
              newPhotoMap[treatment.id] =
                treatment.image || "/treatment-photos/fillers/filler.jpg";
              newPhotoMetadata[treatment.id] = {
                url: treatment.image || "/treatment-photos/fillers/filler.jpg",
                name: "Default Photo",
                treatment: treatment.name,
                issues: treatment.serves || [],
                storyTitle: "Default Treatment Image",
              };
            }
          }
        });

        // Log the results for debugging
        Object.entries(newPhotoMap).forEach(([treatmentId, photoUrl]) => {
          const treatment = treatments.find(
            (t) => t.id.toString() === treatmentId
          );
          if (treatment) {
            console.log(
              `Final photo for treatment ${treatment.name}:`,
              photoUrl
            );
          }
        });

        setPhotoMap(newPhotoMap);
        setPhotoMetadata(newPhotoMetadata);
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
    // First try the photo map (Airtable or local photos)
    if (photoMap[treatmentId]) {
      return photoMap[treatmentId];
    }

    // If no photo in map, try to find a local photo for this treatment
    const treatment = treatments.find((t) => t.id.toString() === treatmentId);
    if (treatment && treatment.serves && treatment.serves.length > 0) {
      const localPhoto = getLocalPhoto(treatment.name, treatment.serves);
      if (localPhoto) {
        return localPhoto;
      }
    }

    // Final fallback to the provided fallback URL or default treatment image
    return (
      fallbackUrl || treatment?.image || "/treatment-photos/fillers/filler.jpg"
    );
  };

  const getTreatmentPhotoMetadata = (treatmentId: string) => {
    if (photoMetadata[treatmentId]) {
      return photoMetadata[treatmentId];
    }

    // Fallback metadata for local photos
    const treatment = treatments.find((t) => t.id.toString() === treatmentId);
    if (treatment) {
      const photoUrl = getTreatmentPhoto(treatmentId, treatment.image);

      // Try to get mapping data for better debugging
      const mappingData =
        treatment.serves && treatment.serves.length > 0
          ? getLocalPhotoMappingData(treatment.name, treatment.serves)
          : null;

      return {
        url: photoUrl,
        name: mappingData?.name || "Fallback Photo",
        treatment: mappingData?.treatment || treatment.name,
        issues: mappingData?.issues || treatment.serves || [],
        storyTitle: mappingData?.storyTitle || "Fallback Image",
      };
    }

    return {
      url: "/treatment-photos/fillers/filler.jpg",
      name: "Default Photo",
      treatment: "Unknown",
      issues: [],
      storyTitle: "Default Fallback",
    };
  };

  return {
    photoMap,
    getTreatmentPhoto,
    getTreatmentPhotoMetadata,
    loading,
    error,
  };
}
