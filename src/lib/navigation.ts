import { useRouter } from "next/navigation";

export const useNavigation = () => {
  const router = useRouter();

  // Patient flow navigation
  const navigateToPatientSelection = () => router.push("/patient-selection");
  const navigateToQuestionnaire = () => router.push("/questionnaire");
  const navigateToAnalysis = () => router.push("/analysis");
  const navigateToAnalysisResults = () => router.push("/analysis-results");
  const navigateToAnalysisDetail = (category: string) =>
    router.push(`/analysis-detail?category=${encodeURIComponent(category)}`);
  const navigateToJourney = () => router.push("/journey");
  const navigateToValue = () => router.push("/value");
  const navigateToHome = () => router.push("/");

  // Provider flow navigation
  const navigateToProviderDashboard = () => router.push("/provider");
  const navigateToProviderPatients = () => router.push("/provider/patients");
  const navigateToProviderAnalysisTools = () =>
    router.push("/provider/analysis-tools");
  const navigateToProviderPatient = (patientId: string) =>
    router.push(`/provider/patient/${patientId}`);
  const navigateToProviderUpload = () => router.push("/provider/upload");
  const navigateToProviderResults = () => router.push("/provider/results");

  // Utility functions
  const goBack = () => router.back();
  const replace = (path: string) => router.replace(path);

  return {
    // Patient flow
    navigateToPatientSelection,
    navigateToQuestionnaire,
    navigateToAnalysis,
    navigateToAnalysisResults,
    navigateToAnalysisDetail,
    navigateToJourney,
    navigateToValue,
    navigateToHome,

    // Provider flow
    navigateToProviderDashboard,
    navigateToProviderPatients,
    navigateToProviderAnalysisTools,
    navigateToProviderPatient,
    navigateToProviderUpload,
    navigateToProviderResults,

    // Utilities
    goBack,
    replace,
    router,
  };
};

// Data persistence utilities
export const persistData = {
  setSelectedPatient: (patient: string) =>
    localStorage.setItem("selectedPatient", patient),

  getSelectedPatient: () => localStorage.getItem("selectedPatient"),

  setUserPhoto: (photo: string) => localStorage.setItem("userPhoto", photo),

  getUserPhoto: () => localStorage.getItem("userPhoto"),

  setUserAnswers: (answers: any) =>
    localStorage.setItem("userAnswers", JSON.stringify(answers)),

  getUserAnswers: () => {
    const answers = localStorage.getItem("userAnswers");
    return answers ? JSON.parse(answers) : null;
  },

  setAnalysisResult: (result: any) =>
    localStorage.setItem("analysisResult", JSON.stringify(result)),

  getAnalysisResult: () => {
    const result = localStorage.getItem("analysisResult");
    return result ? JSON.parse(result) : null;
  },

  clearAll: () => {
    localStorage.removeItem("selectedPatient");
    localStorage.removeItem("userPhoto");
    localStorage.removeItem("userAnswers");
    localStorage.removeItem("analysisResult");
    localStorage.removeItem("frontPhoto");
    localStorage.removeItem("sidePhoto");
  },
};
