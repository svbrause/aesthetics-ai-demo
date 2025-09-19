"use client";

import { PatientDetailScreenV2Refactored } from "@/components/provider/PatientDetailScreenV2Refactored";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

// Mock patient data - in a real app, this would come from an API
const mockPatients = {
  "1001": {
    id: "1001",
    name: "Sydney Adams",
    age: 28,
    email: "sydney.adams@email.com",
    phone: "(555) 123-4567",
    lastVisit: "2024-01-15",
    score: 78,
    findings: [
      "Forehead Wrinkles",
      "Dark Spots",
      "Nasolabial Folds",
      "Marionette Lines",
      "Red Spots",
      "Whiteheads",
      "Temporal Hollow",
      "Under Eye Hollow",
      "Upper Eye Hollow",
      "Lower Eyelid Sag",
      "Mid Cheek Flattening",
      "Crooked Nose",
      "Dorsal Hump",
      "Dry Lips",
      "Excess/Submental Fullness",
      "Prejowl Sulcus",
      "Retruded Chin",
      "Masseter Hypertrophy",
    ],
    frontImage: "/Sydney Adams Front.png",
    sideImage: "/Sydney Adams Side.png",
    scanDate: "December 15, 2024",
  },
  "1002": {
    id: "1002",
    name: "Chelsea Perry",
    age: 32,
    email: "chelsea.perry@email.com",
    phone: "(555) 987-6543",
    lastVisit: "2024-01-10",
    score: 62,
    findings: [
      "Under Eye Wrinkles",
      "Bunny Lines",
      "Neck Lines",
      "Dark Spots",
      "Red Spots",
      "Nasolabial Folds",
      "Marionette Lines",
      "Temporal Hollow",
      "Brow Asymmetry",
      "Excess Upper Eyelid Skin",
      "Under Eye Hollow",
      "Negative Canthal Tilt",
      "Cheekbone - Not Prominent",
      "Over-Projected",
      "Over-Rotated",
      "Nasal Bone - Too Wide",
      "Nostril Base - Too Wide",
      "Nasal Tip Too Wide",
      "Thin Lips",
      "Long Philtral Column",
      "Dry Lips",
      "Retruded Chin",
      "Jowls",
      "Ill-Defined Jawline",
      "Prejowl Sulcus",
      "Excess/Submental Fullness",
      "Obtuse Cervicomental Angle",
    ],
    frontImage: "/Chelsea Perry Front.png",
    sideImage: "/Chelsea Perry Side.png",
    scanDate: "December 10, 2024",
  },
  "1003": {
    id: "1003",
    name: "Jen LePage",
    age: 39,
    email: "jen.lepage@email.com",
    phone: "(555) 345-6789",
    lastVisit: "2024-01-20",
    score: 85,
    findings: [
      "Forehead Wrinkles",
      "Crow's Feet Wrinkles",
      "Glabella Wrinkles",
      "Under Eye Wrinkles",
      "Perioral Wrinkles",
      "Neck Lines",
      "Red Spots",
      "Scars",
      "Nasolabial Folds",
      "Marionette Lines",
      "Whiteheads",
      "Blackheads",
      "Temporal Hollow",
      "Under Eye Hollow",
      "Mid Cheek Flattening",
      "Crooked Nose",
      "Thin Lips",
      "Asymmetric Lips",
      "Long Philtral Column",
      "Prejowl Sulcus",
      "Excess/Submental Fullness",
      "Retruded Chin",
    ],
    frontImage: "/Jen LePage Front.png",
    sideImage: "/Jen LePage Side.png",
    scanDate: "December 20, 2024",
  },
  "1004": {
    id: "1004",
    name: "Stephanie Enrietti",
    age: 40,
    email: "stephanie.enrietti@email.com",
    phone: "(555) 456-7890",
    lastVisit: "2023-12-15",
    score: 72,
    findings: [
      "Forehead Wrinkles",
      "Glabella Wrinkles",
      "Bunny Lines",
      "Crow's Feet Wrinkles",
      "Under Eye Wrinkles",
      "Perioral Wrinkles",
      "Neck Lines",
      "Dark Spots",
      "Red Spots",
      "Whiteheads",
      "Nasolabial Folds",
      "Marionette Lines",
      "Temporal Hollow",
      "Under Eye Hollow",
      "Lower Eyelid Bags",
      "Mid Cheek Flattening",
      "Crooked Nose",
      "Dorsal Hump",
      "Thin Lips",
      "Asymmetric Lips",
      "Dry Lips",
      "Prejowl Sulcus",
      "Loose Neck Skin",
      "Excess/Submental Fullness",
    ],
    frontImage: "/Chelsea Perry Front.png",
    sideImage: "/Chelsea Perry Side.png",
    scanDate: "December 5, 2024",
  },
};

export default function ProviderPatientDetailPage() {
  const router = useRouter();
  const params = useParams();
  const [patient, setPatient] = useState<any>(null);

  useEffect(() => {
    const patientId = params.id as string;
    const foundPatient = mockPatients[patientId as keyof typeof mockPatients];

    if (foundPatient) {
      setPatient(foundPatient);
    } else {
      // Redirect to patients list if patient not found
      router.push("/provider/patients");
    }
  }, [params.id, router]);

  const handleBack = () => {
    router.push("/provider/patients");
  };

  const handleOpenAreaAnalysis = (area: string) => {
    console.log("Open area analysis:", area);
  };

  if (!patient) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading patient...</p>
        </div>
      </div>
    );
  }

  return (
    <PatientDetailScreenV2Refactored
      patient={patient}
      onBack={handleBack}
      onOpenAreaAnalysis={handleOpenAreaAnalysis}
    />
  );
}
