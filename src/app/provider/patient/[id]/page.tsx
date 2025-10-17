"use client";

import { PatientDetailScreenV2Refactored } from "@/components/provider/PatientDetailScreenV2Refactored";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

// Mock patient data - in a real app, this would come from an API
const mockPatients = {
  "1001": {
    id: "1001",
    name: "Sydney Adams",
    age: 28,
    email: "sydney.adams@email.com",
    phone: "(555) 123-4567",
    lastVisit: "2024-01-15",
    status: "active" as const,
    score: 78,
    color: "blue" as const,
    findings: [
      { name: "Forehead Wrinkles", severity: "moderate" as const, score: 70 },
      { name: "Dark Spots", severity: "mild" as const, score: 25 },
      { name: "Nasolabial Folds", severity: "severe" as const, score: 85 },
      { name: "Marionette Lines", severity: "moderate" as const, score: 72 },
      { name: "Red Spots", severity: "mild" as const, score: 30 },
      { name: "Whiteheads", severity: "mild" as const, score: 45 },
      { name: "Temporal Hollow", severity: "severe" as const, score: 88 },
      { name: "Under Eye Hollow", severity: "moderate" as const, score: 70 },
      { name: "Upper Eye Hollow", severity: "mild" as const, score: 35 },
      { name: "Lower Eyelid Sag", severity: "mild" as const, score: 50 },
      { name: "Mid Cheek Flattening", severity: "severe" as const, score: 82 },
      { name: "Crooked Nose", severity: "mild" as const, score: 28 },
      { name: "Dorsal Hump", severity: "mild" as const, score: 40 },
      { name: "Dry Lips", severity: "mild" as const, score: 32 },
      {
        name: "Excess/Submental Fullness",
        severity: "moderate" as const,
        score: 68,
      },
      { name: "Prejowl Sulcus", severity: "severe" as const, score: 90 },
      { name: "Retruded Chin", severity: "moderate" as const, score: 72 },
      { name: "Masseter Hypertrophy", severity: "mild" as const, score: 38 },
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
    status: "active" as const,
    score: 62,
    color: "purple" as const,
    findings: [
      { name: "Under Eye Wrinkles", severity: "moderate" as const, score: 72 },
      { name: "Bunny Lines", severity: "mild" as const, score: 58 },
      { name: "Neck Lines", severity: "moderate" as const, score: 70 },
      { name: "Dark Spots", severity: "moderate" as const, score: 68 },
      { name: "Red Spots", severity: "mild" as const, score: 55 },
      { name: "Nasolabial Folds", severity: "severe" as const, score: 85 },
      { name: "Marionette Lines", severity: "severe" as const, score: 88 },
      { name: "Temporal Hollow", severity: "moderate" as const, score: 70 },
      { name: "Brow Asymmetry", severity: "mild" as const, score: 60 },
      {
        name: "Excess Upper Eyelid Skin",
        severity: "moderate" as const,
        score: 72,
      },
      { name: "Under Eye Hollow", severity: "moderate" as const, score: 72 },
      { name: "Negative Canthal Tilt", severity: "mild" as const, score: 62 },
      {
        name: "Cheekbone - Not Prominent",
        severity: "moderate" as const,
        score: 68,
      },
      { name: "Over-Projected", severity: "mild" as const, score: 58 },
      { name: "Over-Rotated", severity: "mild" as const, score: 60 },
      {
        name: "Nasal Bone - Too Wide",
        severity: "moderate" as const,
        score: 68,
      },
      { name: "Nostril Base - Too Wide", severity: "mild" as const, score: 58 },
      { name: "Nasal Tip Too Wide", severity: "moderate" as const, score: 68 },
      { name: "Thin Lips", severity: "moderate" as const, score: 70 },
      { name: "Long Philtral Column", severity: "mild" as const, score: 58 },
      { name: "Dry Lips", severity: "mild" as const, score: 50 },
      { name: "Retruded Chin", severity: "moderate" as const, score: 72 },
      { name: "Jowls", severity: "severe" as const, score: 85 },
      { name: "Ill-Defined Jawline", severity: "severe" as const, score: 88 },
      { name: "Prejowl Sulcus", severity: "moderate" as const, score: 72 },
      {
        name: "Excess/Submental Fullness",
        severity: "severe" as const,
        score: 82,
      },
      {
        name: "Obtuse Cervicomental Angle",
        severity: "moderate" as const,
        score: 70,
      },
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
    status: "active" as const,
    score: 85,
    color: "green" as const,
    findings: [
      { name: "Forehead Wrinkles", severity: "moderate" as const, score: 70 },
      { name: "Crow's Feet Wrinkles", severity: "mild" as const, score: 60 },
      { name: "Glabella Wrinkles", severity: "moderate" as const, score: 75 },
      { name: "Under Eye Wrinkles", severity: "mild" as const, score: 65 },
      { name: "Perioral Wrinkles", severity: "moderate" as const, score: 70 },
      { name: "Neck Lines", severity: "mild" as const, score: 60 },
      { name: "Red Spots", severity: "mild" as const, score: 55 },
      { name: "Scars", severity: "mild" as const, score: 50 },
      { name: "Nasolabial Folds", severity: "moderate" as const, score: 72 },
      { name: "Marionette Lines", severity: "moderate" as const, score: 70 },
      { name: "Whiteheads", severity: "mild" as const, score: 45 },
      { name: "Blackheads", severity: "mild" as const, score: 40 },
      { name: "Temporal Hollow", severity: "moderate" as const, score: 68 },
      { name: "Under Eye Hollow", severity: "moderate" as const, score: 70 },
      {
        name: "Mid Cheek Flattening",
        severity: "moderate" as const,
        score: 72,
      },
      { name: "Crooked Nose", severity: "mild" as const, score: 58 },
      { name: "Thin Lips", severity: "moderate" as const, score: 70 },
      { name: "Asymmetric Lips", severity: "mild" as const, score: 60 },
      { name: "Long Philtral Column", severity: "mild" as const, score: 58 },
      { name: "Prejowl Sulcus", severity: "moderate" as const, score: 70 },
      {
        name: "Excess/Submental Fullness",
        severity: "moderate" as const,
        score: 68,
      },
      { name: "Retruded Chin", severity: "moderate" as const, score: 72 },
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
    status: "active" as const,
    score: 72,
    color: "red" as const,
    findings: [
      { name: "Forehead Wrinkles", severity: "moderate" as const, score: 70 },
      { name: "Glabella Wrinkles", severity: "moderate" as const, score: 75 },
      { name: "Bunny Lines", severity: "mild" as const, score: 60 },
      {
        name: "Crow's Feet Wrinkles",
        severity: "moderate" as const,
        score: 72,
      },
      { name: "Under Eye Wrinkles", severity: "moderate" as const, score: 70 },
      { name: "Perioral Wrinkles", severity: "moderate" as const, score: 68 },
      { name: "Neck Lines", severity: "moderate" as const, score: 72 },
      { name: "Dark Spots", severity: "mild" as const, score: 60 },
      { name: "Red Spots", severity: "mild" as const, score: 55 },
      { name: "Whiteheads", severity: "mild" as const, score: 50 },
      { name: "Nasolabial Folds", severity: "moderate" as const, score: 72 },
      { name: "Marionette Lines", severity: "moderate" as const, score: 70 },
      { name: "Temporal Hollow", severity: "moderate" as const, score: 68 },
      { name: "Under Eye Hollow", severity: "moderate" as const, score: 70 },
      { name: "Lower Eyelid Bags", severity: "moderate" as const, score: 72 },
      {
        name: "Mid Cheek Flattening",
        severity: "moderate" as const,
        score: 70,
      },
      { name: "Crooked Nose", severity: "mild" as const, score: 58 },
      { name: "Dorsal Hump", severity: "mild" as const, score: 60 },
      { name: "Thin Lips", severity: "moderate" as const, score: 70 },
      { name: "Asymmetric Lips", severity: "mild" as const, score: 60 },
      { name: "Dry Lips", severity: "mild" as const, score: 55 },
      { name: "Prejowl Sulcus", severity: "moderate" as const, score: 70 },
      { name: "Loose Neck Skin", severity: "moderate" as const, score: 72 },
      {
        name: "Excess/Submental Fullness",
        severity: "moderate" as const,
        score: 68,
      },
    ],
    frontImage: "/Chelsea Perry Front.png",
    sideImage: "/Chelsea Perry Side.png",
    scanDate: "December 5, 2024",
  },
  "1005": {
    id: "1005",
    name: "Camille Fassett",
    age: 35,
    email: "camillefassett@gmail.com",
    phone: "(555) 234-5678",
    lastVisit: "2024-01-25",
    status: "active" as const,
    score: 82,
    color: "yellow" as const,
    findings: [
      { name: "Forehead Wrinkles", severity: "moderate" as const, score: 75 },
      { name: "Glabella Wrinkles", severity: "mild" as const, score: 60 },
      { name: "Dark Spots", severity: "mild" as const, score: 65 },
      { name: "Red Spots", severity: "mild" as const, score: 55 },
      { name: "Marionette Lines", severity: "moderate" as const, score: 70 },
      { name: "Temporal Hollow", severity: "moderate" as const, score: 68 },
      { name: "Brow Asymmetry", severity: "mild" as const, score: 62 },
      { name: "Crooked Nose", severity: "moderate" as const, score: 72 },
      { name: "Dorsal Hump", severity: "mild" as const, score: 58 },
      { name: "Over-Rotated", severity: "mild" as const, score: 60 },
      { name: "Nasal Tip Too Wide", severity: "moderate" as const, score: 68 },
      { name: "Thin Lips", severity: "moderate" as const, score: 70 },
      { name: "Lacking Philtral Column", severity: "mild" as const, score: 55 },
      { name: "Long Philtral Column", severity: "mild" as const, score: 58 },
      { name: "Dry Lips", severity: "mild" as const, score: 50 },
      {
        name: "Lip Thinning When Smiling",
        severity: "moderate" as const,
        score: 65,
      },
      { name: "Retruded Chin", severity: "moderate" as const, score: 72 },
    ],
    frontImage:
      "https://v5.airtableusercontent.com/v3/u/45/45/1759442400000/pF9loVTScpX7FC2NF5qNmw/E6j4Fq3k4KzosH_CTm0mmB_ax6i9c5Q1SdsFq3CW07PgPNdAAH7fPd-bWwsiHyOtO1ZwXYN4_mgHSl9uAwiXis_jijW4jlM0MtvDsZYoDAxvOkCeOvCCvjlb6swW7pxq80YPGVcJrsF2RVMEGZMenweRPa8rbn9Kf0egQZxU5W8/-jev0zWWVGmcpK4Se8XLs6UW4383CJh9_PcoSTeJpEY",
    sideImage:
      "https://v5.airtableusercontent.com/v3/u/45/45/1759442400000/duAZ0-ekr98_d4OirMF4dw/xER_SsxH53UdpGafbgo1iNobvaLpKSk25lZ054tHLpqv_W39DH_rI6oFzGZfilvjKCFxVIl8cl5kWVE1cTvjVJNqzG7CjdLuTmrYuAEHvSkcNvvYsK6cW3ZxVFY0iivf-8R-rjpIDtVs-GZ3JMy4i0UNd1tvaZM5pzLmrlERPW8/1VeVxz9vvRJTl5r1NVva8OzBXG5SPi61ZywWzzXuj3U",
    scanDate: "January 25, 2024",
    airtableRecordId: "reczCwQAwWPWCr7Uj",
  },

  "1006": {
    id: "1006",
    name: "Camille Fassett",
    age: 35,
    email: "camillefassett@gmail.com",
    phone: "(555) 234-5678",
    lastVisit: "2024-01-25",
    status: "active" as const,
    score: 82,
    color: "blue" as const,
    findings: [
      { name: "Forehead Wrinkles", severity: "moderate" as const, score: 75 },
      { name: "Glabella Wrinkles", severity: "mild" as const, score: 60 },
      { name: "Dark Spots", severity: "mild" as const, score: 65 },
      { name: "Red Spots", severity: "mild" as const, score: 55 },
      { name: "Marionette Lines", severity: "moderate" as const, score: 70 },
      { name: "Temporal Hollow", severity: "moderate" as const, score: 68 },
      { name: "Brow Asymmetry", severity: "mild" as const, score: 62 },
      { name: "Crooked Nose", severity: "moderate" as const, score: 72 },
      { name: "Dorsal Hump", severity: "mild" as const, score: 58 },
      { name: "Over-Rotated", severity: "mild" as const, score: 60 },
      { name: "Nasal Tip Too Wide", severity: "moderate" as const, score: 68 },
      { name: "Thin Lips", severity: "moderate" as const, score: 70 },
      { name: "Lacking Philtral Column", severity: "mild" as const, score: 55 },
      { name: "Long Philtral Column", severity: "mild" as const, score: 58 },
      { name: "Dry Lips", severity: "mild" as const, score: 50 },
      {
        name: "Lip Thinning When Smiling",
        severity: "moderate" as const,
        score: 65,
      },
      { name: "Retruded Chin", severity: "moderate" as const, score: 72 },
    ],
    frontImage:
      "https://v5.airtableusercontent.com/v3/u/45/45/1759442400000/pF9loVTScpX7FC2NF5qNmw/E6j4Fq3k4KzosH_CTm0mmB_ax6i9c5Q1SdsFq3CW07PgPNdAAH7fPd-bWwsiHyOtO1ZwXYN4_mgHSl9uAwiXis_jijW4jlM0MtvDsZYoDAxvOkCeOvCCvjlb6swW7pxq80YPGVcJrsF2RVMEGZMenweRPa8rbn9Kf0egQZxU5W8/-jev0zWWVGmcpK4Se8XLs6UW4383CJh9_PcoSTeJpEY",
    sideImage:
      "https://v5.airtableusercontent.com/v3/u/45/45/1759442400000/duAZ0-ekr98_d4OirMF4dw/xER_SsxH53UdpGafbgo1iNobvaLpKSk25lZ054tHLpqv_W39DH_rI6oFzGZfilvjKCFxVIl8cl5kWVE1cTvjVJNqzG7CjdLuTmrYuAEHvSkcNvvYsK6cW3ZxVFY0iivf-8R-rjpIDtVs-GZ3JMy4i0UNd1tvaZM5pzLmrlERPW8/1VeVxz9vvRJTl5r1NVva8OzBXG5SPi61ZywWzzXuj3U",
    scanDate: "January 25, 2024",
    airtableRecordId: "reczCwQAwWPWCr7Uj",
  },

  "1007": {
    id: "1007",
    name: "Aman",
    age: 30,
    email: "aman@gmail.com",
    phone: "(507) 234-5678",
    lastVisit: "2024-01-25",
    status: "active" as const,
    score: 82,
    color: "purple" as const,
    findings: [
      // Forehead area findings
      { name: "Forehead Wrinkles", severity: "mild" as const, score: 100 },
      { name: "Glabella Lines", severity: "mild" as const, score: 100 },
      { name: "Temporal Hollow", severity: "mild" as const, score: 80 },
      { name: "Brow Asymmetry", severity: "mild" as const, score: 89 },

      // Eyes area findings
      { name: "Under Eye Wrinkles", severity: "mild" as const, score: 79 },
      { name: "Under Eye Hollow", severity: "moderate" as const, score: 65 },
      { name: "Under Eye Dark Circles", severity: "mild" as const, score: 100 },
      { name: "Crow's Feet", severity: "mild" as const, score: 100 },
      {
        name: "Excess Upper Eyelid Skin",
        severity: "mild" as const,
        score: 100,
      },

      // Cheeks area findings
      { name: "Nasolabial Folds", severity: "mild" as const, score: 82 },
      { name: "Marionette Lines", severity: "mild" as const, score: 100 },
      { name: "Mid Cheek Flattening", severity: "mild" as const, score: 100 },

      // Lips area findings
      { name: "Dry Lips", severity: "moderate" as const, score: 69 },
      { name: "Lip Volume Loss", severity: "mild" as const, score: 100 },
      { name: "Perioral Wrinkles", severity: "mild" as const, score: 100 },
      { name: "Thin Lips", severity: "mild" as const, score: 100 },

      // Jawline area findings
      { name: "Retruded Chin", severity: "moderate" as const, score: 67 },
      { name: "Prejowl Sulcus", severity: "mild" as const, score: 85 },
      {
        name: "Jawline Definition Loss",
        severity: "mild" as const,
        score: 100,
      },
      { name: "Jowls", severity: "mild" as const, score: 100 },
      { name: "Double Chin", severity: "mild" as const, score: 100 },

      // Neck area findings
      { name: "Neck Lines", severity: "mild" as const, score: 75 },
      { name: "Turkey Neck", severity: "mild" as const, score: 100 },
      { name: "Horizontal Neck Bands", severity: "mild" as const, score: 100 },

      // Nose area findings
      { name: "Crooked Nose", severity: "mild" as const, score: 100 },
      { name: "Dorsal Hump", severity: "mild" as const, score: 100 },
      { name: "Over-Projected", severity: "mild" as const, score: 100 },
      { name: "Over-Rotated", severity: "mild" as const, score: 100 },
      { name: "Nasal Bone - Too Wide", severity: "mild" as const, score: 100 },
      {
        name: "Nostril Base - Too Wide",
        severity: "mild" as const,
        score: 100,
      },
      { name: "Nasal Tip Too Wide", severity: "mild" as const, score: 100 },

      // Skin findings
      { name: "Dark Spots", severity: "mild" as const, score: 72 },
      { name: "Whiteheads", severity: "mild" as const, score: 73 },
      { name: "Red Spots", severity: "mild" as const, score: 100 },
      { name: "Blackheads", severity: "mild" as const, score: 100 },
      { name: "Scars", severity: "mild" as const, score: 100 },
      { name: "Fine Lines", severity: "mild" as const, score: 100 },
      { name: "Skin Texture", severity: "mild" as const, score: 100 },
    ],
    frontImage:
      "https://storage.googleapis.com/plasma-matter-469702-s1_cloudbuild/Property%201%3DVariant186Crystal%20Chen%20-%20Front.png",
    sideImage:
      "https://storage.googleapis.com/plasma-matter-469702-s1_cloudbuild/Property%201%3DVariant186Crystal%20Chen%20-%20Side.png",
    scanDate: "January 25, 2024",
    airtableRecordId: "reczCwQAwWPWCr7Uj",
  },
};

export default function ProviderPatientDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { theme } = useTheme();

  // Get patient data directly instead of using useState and useEffect
  const patientId = params.id as string;
  const patient = mockPatients[patientId as keyof typeof mockPatients];

  // Force the new theme for this page
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Remove all existing theme classes
      document.documentElement.classList.remove(
        "light",
        "dark",
        "gold-theme",
        "medspa-theme",
        "medspa-new-theme"
      );
      // Add the new theme class
      document.documentElement.classList.add("medspa-new-theme");

      // Force all area section headers to have the correct background color
      const allHeaders = document.querySelectorAll("h2");
      allHeaders.forEach((header) => {
        if (header.textContent?.includes("Findings")) {
          const headerDiv = header.closest(
            'div[class*="sticky top-0"]'
          ) as HTMLElement;
          if (headerDiv) {
            headerDiv.style.setProperty(
              "background-color",
              "#F3F4F6",
              "important"
            );
          }
        }
      });
    }
  }, []);

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
          <p className="text-gray-600">Patient not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <PatientDetailScreenV2Refactored
        patient={patient}
        onBack={handleBack}
        onOpenAreaAnalysis={handleOpenAreaAnalysis}
      />
    </div>
  );
}
