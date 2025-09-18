"use client";

import { AnalysisToolsScreen } from "@/components/provider/AnalysisToolsScreen";
import { useRouter } from "next/navigation";

export default function ProviderAnalysisToolsPage() {
  const router = useRouter();

  const handleBack = () => {
    router.push("/provider");
  };

  return <AnalysisToolsScreen onBack={handleBack} />;
}
