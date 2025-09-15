export interface UserAnswers {
  focusArea: string;
  skinConcerns?: string[];
  goal: string;
  journeyStage: string;
  skincareRegimen?: string[];
}

export interface AnalysisResult {
  id: string;
  title: string;
  category: string;
  score: number;
  description: string;
  reasoning: string;
  annotation: () => string;
}

export interface JourneyStep {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
  pricing: string;
}

export interface Question {
  key: keyof UserAnswers;
  title: string;
  options: QuestionOption[];
}

export interface QuestionOption {
  value: string;
  icon: React.ReactNode;
  description: string;
}

export type SceneType =
  | "welcome"
  | "patient-selection"
  | "photo-upload"
  | "analysis"
  | "questionnaire"
  | "results"
  | "journey"
  | "value";

export type PatientType = "sydney" | "chelsea";

export interface PatientProfile {
  name: string;
  age: number;
  profession: string;
  profile: string;
  description: string;
  concerns: string[];
  score: number;
  color: string;
  frontImage: string;
  sideImage: string;
  analysis: {
    facialStructure: number;
    skinQuality: number;
    preventativeCare: number;
  };
}
