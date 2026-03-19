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
