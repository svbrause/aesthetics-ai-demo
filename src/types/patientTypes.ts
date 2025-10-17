// Comprehensive type definitions for the Aesthetics AI Demo application

export interface Patient {
  id: string;
  name: string;
  age: number;
  email?: string;
  phone?: string;
  profession?: string;
  profile?: string;
  description?: string;
  lastVisit?: string;
  nextAppointment?: string;
  status: "active" | "inactive" | "pending";
  score: number;
  color: "blue" | "purple" | "green" | "red" | "yellow";
  frontImage: string;
  sideImage: string;
  findings: Finding[];
  treatments?: string[];
  notes?: string;
  analysis?: PatientAnalysis;
}

export interface Finding {
  name: string;
  score?: number;
  severity?: "mild" | "moderate" | "severe";
  area?: string;
  description?: string;
  treatmentRecommendations?: string[];
}

export interface PatientAnalysis {
  facialStructure: number;
  skinQuality: number;
  preventativeCare: number;
  overallScore?: number;
}

export interface AnalysisArea {
  id: string;
  name: string;
  score: number;
  description: string;
  icon: React.ReactNode;
  color: string;
  subcategories: AnalysisSubcategory[];
  findings: Finding[];
}

export interface AnalysisSubcategory {
  id: string;
  name: string;
  findings: Finding[];
  score?: number;
}

export interface TreatmentRecommendation {
  id: string;
  name: string;
  category: string;
  description: string;
  cost?: number;
  duration?: string;
  effectiveness: number;
  riskLevel: "low" | "medium" | "high";
  beforeAfterImages?: string[];
  isHearted?: boolean;
}

export interface AnalysisCategory {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  findings: Finding[];
}

export interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  background: string;
  text: string;
  border: string;
  gradient: string;
  progressBar: string;
}

export interface PatientManagementProps {
  onSelectPatient: (patient: Patient) => void;
  onBack: () => void;
}

export interface PatientDetailProps {
  patient: Patient | null;
  onBack: () => void;
  onOpenAreaAnalysis: (area: string) => void;
}

export interface AreaAnalysisProps {
  area: AnalysisArea;
  patient: Patient;
  onClose: () => void;
}

export interface AnalysisResultsProps {
  photoUrl: string;
  onComplete: () => void;
  filteredCategories: AnalysisCategory[];
  heartedTreatments: string[];
  onToggleHeart: (treatmentId: string) => void;
}

export interface ModalAnalysisResultsProps {
  analysis: ProcessedAnalysis;
  frontPhoto: string;
  sidePhoto: string;
  rawModalResponse?: any;
  modalError?: string;
  onBack: () => void;
  onSaveDraft?: (patientName: string, analysis: ProcessedAnalysis) => void;
}

export interface ProcessedAnalysis {
  findings: Finding[];
  recommendations: TreatmentRecommendation[];
  overallScore: number;
  areas: AnalysisArea[];
  patientName?: string;
  timestamp?: string;
}

export interface ThemeContextType {
  theme: "light" | "dark" | "gold" | "medspa";
  hipaaMode: boolean;
  toggleTheme: () => void;
  toggleHipaaMode: () => void;
}

export interface ProviderContextType {
  currentPatient: Patient | null;
  setCurrentPatient: (patient: Patient | null) => void;
  patients: Patient[];
  setPatients: (patients: Patient[]) => void;
  isProviderMode: boolean;
  setIsProviderMode: (isProvider: boolean) => void;
}

export interface TutorialContextType {
  isTutorialActive: boolean;
  currentStep: number;
  totalSteps: number;
  startTutorial: () => void;
  nextStep: () => void;
  prevStep: () => void;
  endTutorial: () => void;
  skipTutorial: () => void;
}

// Utility types for better type safety
export type PatientId = string;
export type FindingName = string;
export type TreatmentId = string;
export type AreaId = string;

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PatientApiResponse extends ApiResponse<Patient[]> {}
export interface AnalysisApiResponse extends ApiResponse<ProcessedAnalysis> {}

// Form types
export interface PatientFormData {
  name: string;
  age: number;
  email: string;
  phone: string;
  profession?: string;
  notes?: string;
}

export interface AnalysisFormData {
  patientId: string;
  findings: Finding[];
  recommendations: TreatmentRecommendation[];
  notes?: string;
}

// Filter and search types
export interface PatientFilters {
  status?: "active" | "inactive" | "pending";
  ageRange?: [number, number];
  scoreRange?: [number, number];
  hasAppointment?: boolean;
}

export interface SearchFilters {
  query: string;
  filters: PatientFilters;
  sortBy: "name" | "age" | "score" | "lastVisit";
  sortOrder: "asc" | "desc";
}

// Component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

export interface InteractiveComponentProps extends BaseComponentProps {
  onClick?: () => void;
  onHover?: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export interface DataDisplayProps<T> extends BaseComponentProps {
  data: T;
  loading?: boolean;
  error?: string;
  emptyMessage?: string;
}

// Hook return types
export interface UsePatientReturn {
  patients: Patient[];
  currentPatient: Patient | null;
  loading: boolean;
  error: string | null;
  selectPatient: (patient: Patient) => void;
  updatePatient: (patient: Patient) => void;
  deletePatient: (patientId: string) => void;
  addPatient: (patient: Omit<Patient, "id">) => void;
}

export interface UseAnalysisReturn {
  analysis: ProcessedAnalysis | null;
  loading: boolean;
  error: string | null;
  runAnalysis: (patient: Patient) => Promise<void>;
  saveAnalysis: (analysis: ProcessedAnalysis) => Promise<void>;
  clearAnalysis: () => void;
}

export interface UseThemeReturn {
  theme: "light" | "dark" | "gold" | "medspa";
  hipaaMode: boolean;
  toggleTheme: () => void;
  toggleHipaaMode: () => void;
  applyTheme: (theme: string) => void;
}

// Event handler types
export type PatientSelectHandler = (patient: Patient) => void;
export type AreaAnalysisHandler = (area: string) => void;
export type TreatmentToggleHandler = (treatmentId: string) => void;
export type BackHandler = () => void;
export type CloseHandler = () => void;

// Configuration types
export interface AppConfig {
  apiBaseUrl: string;
  theme: "light" | "dark" | "gold" | "medspa";
  enableHipaaMode: boolean;
  enableTutorial: boolean;
  maxFileSize: number;
  allowedFileTypes: string[];
}

export interface FeatureFlags {
  enablePatientManagement: boolean;
  enableAnalysis: boolean;
  enableTreatmentPlanning: boolean;
  enableReporting: boolean;
  enableTutorial: boolean;
}

// Constants for type safety
export const PATIENT_STATUSES = ["active", "inactive", "pending"] as const;
export const PATIENT_COLORS = [
  "blue",
  "purple",
  "green",
  "red",
  "yellow",
] as const;
export const SEVERITY_LEVELS = ["mild", "moderate", "severe"] as const;
export const RISK_LEVELS = ["low", "medium", "high"] as const;
export const THEMES = ["light", "dark", "gold", "medspa"] as const;

export type PatientStatus = (typeof PATIENT_STATUSES)[number];
export type PatientColor = (typeof PATIENT_COLORS)[number];
export type SeverityLevel = (typeof SEVERITY_LEVELS)[number];
export type RiskLevel = (typeof RISK_LEVELS)[number];
export type Theme = (typeof THEMES)[number];
