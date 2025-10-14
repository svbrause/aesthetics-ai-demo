import { ReactNode } from "react";

export interface Patient {
  id: string;
  name: string;
  age: number;
  email?: string;
  phone?: string;
  dateOfBirth?: string;
  frontImage: string;
  sideImage: string;
  findings: any[];
  score: number;
  scanDate: string;
  hiddenFindings?: string[];
}

export interface AnalysisArea {
  id: string;
  name: string;
  icon: ReactNode;
  color: string;
  findings: Finding[];
}

export interface Finding {
  name: string;
  score: number;
  severity: "mild" | "moderate" | "severe";
  description: string;
  commonality: number;
  ageGroup: string;
  causes: string[];
  symptoms: string[];
  beforeAfter: BeforeAfter[];
  treatments: string[];
  educational: string;
  area?: string;
}

export interface BeforeAfter {
  before: string;
  after: string;
  label: string;
}

export interface Treatment {
  id: number;
  name: string;
  category: string;
  area: string;
  goal: string;
  price: number;
  duration: string;
  downtime: string;
  invasiveness: "Minimal" | "Moderate" | "High";
  description: string;
  image: string;
  beforeAfter?: BeforeAfter[];
  benefits: string[];
  risks: string[];
  serves: string[];
}

export interface TreatmentPlanItem {
  id: string;
  name: string;
  notes: string;
  areas: string[];
  quantity: string;
  unit: string;
  price: string;
  duration: string;
  serves?: string[];
  downtime: string;
  invasiveness: string;
  timeline?: "short-term" | "long-term";
  targetedFindings?: string[];
}

export type ViewMode = "analysis" | "treatments" | "treatment-plan";

export interface PatientDetailScreenV2Props {
  patient: Patient;
  onBack: () => void;
  onOpenAreaAnalysis: (area: string) => void;
}
