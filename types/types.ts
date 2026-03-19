import { User } from "@/hooks/auth_hook";

export interface OnboardingFlowProps {
  user: User;
}

export const studyFields = [
  "Technische Informatik",
  "Wirtschaftsinformatik",
  "IT-Security",
];

export const FieldMap: { [key: string]: string } = {
  "Technische Informatik": "TI",
  Wirtschaftsinformatik: "WIN",
  "IT-Security": "ITS",
};

export type studyFieldType =
  | "Technische Informatik"
  | "Wirtschaftsinformatik"
  | "IT-Security"
  | "Other";

export interface SubjectNote {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
}

export interface SubjectFile {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
  createdAt: string;
}
