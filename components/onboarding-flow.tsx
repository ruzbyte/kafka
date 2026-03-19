"use client";

import { studyFields, type OnboardingFlowProps } from "@/types/types";
import { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { User } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { BookOpen, GraduationCap, School, Check } from "lucide-react";
import { useAuthStore } from "@/hooks/auth_hook";
import { useEffect } from "react";
import { Badge } from "@/components/ui/badge";

export type schoolType = "Hochschule Albstadt-Sigmaringen";

export const schools = ["Hochschule Albstadt-Sigmaringen"];

export function OnboardingFlow({ user }: OnboardingFlowProps) {
  const [step, setStep] = useState(1);
  const [schoolName, setSchoolName] = useState("");
  const [studyField, setStudyField] = useState("");
  const [customField, setCustomField] = useState("");
  const [enrolledClasses, setEnrolledClasses] = useState<string[]>([]);
  const [availableClasses, setAvailableClasses] = useState<any[]>([]);
  const [displayName, setDisplayName] = useState(user.displayName || "");
  const [isLoading, setIsLoading] = useState(false);
  const [classesLoading, setClassesLoading] = useState(false);
  const { setUser } = useAuthStore();
  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  useEffect(() => {
    if (step === 3 && studyField) {
      setClassesLoading(true);
      fetch(`/api/webuntis/classes?studyField=${encodeURIComponent(studyField)}`)
        .then((res) => res.json())
        .then((data) => {
          setAvailableClasses(data);
        })
        .catch((err) => console.error("Error fetching classes:", err))
        .finally(() => setClassesLoading(false));
    }
  }, [step, studyField]);

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleToggleClass = (className: string) => {
    setEnrolledClasses((prev) =>
      prev.includes(className)
        ? prev.filter((c) => c !== className)
        : [...prev, className],
    );
  };

  const handleComplete = async () => {
    setIsLoading(true);
    try {
      await updateDoc(doc(db, "users", user.uid), {
        schoolName,
        studyField: studyField === "Other" ? customField : studyField,
        enrolledClasses,
        onboardingCompleted: true,
        updatedAt: new Date().toISOString(),
      });
      setUser({
        ...(user as any),
        enrolledClasses,
      });
      // Redirect to dashboard or show success
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error completing onboarding:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const canProceed = () => {
    if (step === 1) return schoolName.trim().length > 0;
    if (step === 2)
      return (
        studyField && (studyField !== "Other" || customField.trim().length > 0)
      );
    if (step === 3) return enrolledClasses.length > 0;
    if (step === 4) return displayName.trim().length > 0;
    return false;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <BookOpen className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">StudyPlan</span>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl">
              Welcome, {user.displayName || "Student"}!
            </CardTitle>
            <CardDescription>
              Let's set up your profile to personalize your experience
            </CardDescription>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-gray-500">
              <span>
                Step {step} of {totalSteps}
              </span>
              <span>{Math.round(progress)}% complete</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center">
                <School className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  What school do you attend?
                </h3>
                <p className="text-gray-600 text-sm">
                  This helps us customize your experience and connect you with
                  classmates
                </p>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="school"
                  className="text-sm font-medium text-gray-700"
                >
                  School Name
                </label>
                <Select value={schoolName} onValueChange={setSchoolName}>
                  <SelectTrigger className="h-12">
                    <SelectValue placeholder="Select your field of study" />
                  </SelectTrigger>
                  <SelectContent>
                    {schools.map((field) => (
                      <SelectItem key={field} value={field}>
                        {field}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <GraduationCap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  What are you studying?
                </h3>
                <p className="text-gray-600 text-sm">
                  This helps us suggest relevant courses and study materials
                </p>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="study-field"
                    className="text-sm font-medium text-gray-700"
                  >
                    Field of Study
                  </label>
                  <Select value={studyField} onValueChange={setStudyField}>
                    <SelectTrigger className="h-12">
                      <SelectValue placeholder="Select your field of study" />
                    </SelectTrigger>
                    <SelectContent>
                      {studyFields.map((field) => (
                        <SelectItem key={field} value={field}>
                          {field}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {studyField === "Other" && (
                  <div className="space-y-2">
                    <label
                      htmlFor="custom-field"
                      className="text-sm font-medium text-gray-700"
                    >
                      Please specify
                    </label>
                    <Input
                      id="custom-field"
                      type="text"
                      placeholder="Enter your field of study"
                      value={customField}
                      onChange={(e) => setCustomField(e.target.value)}
                      className="h-12"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center">
                <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  Which classes are you in?
                </h3>
                <p className="text-gray-600 text-sm">
                  Select all classes (semesters) you are currently attending.
                  This helps us optimize your calendar.
                </p>
              </div>

              <div className="space-y-4">
                {classesLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-2 max-h-[300px] overflow-y-auto p-1">
                    {availableClasses.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => handleToggleClass(c.name)}
                        className={`flex items-center justify-between p-3 rounded-lg border text-sm transition-all ${
                          enrolledClasses.includes(c.name)
                            ? "border-blue-600 bg-blue-50 text-blue-700"
                            : "border-gray-200 hover:border-blue-300"
                        }`}
                      >
                        <span className="truncate">{c.name}</span>
                        {enrolledClasses.includes(c.name) && (
                          <Check className="h-4 w-4" />
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {enrolledClasses.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {enrolledClasses.map((c) => (
                      <Badge key={c} variant="secondary" className="px-2 py-1">
                        {c}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {step == 4 && (
            <div className="text-center space-y-4">
              <BookOpen className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Set your username</h3>
              <p className="text-gray-600 text-sm">
                This will be your display name in the app
              </p>
              <div className="space-y-2">
                <label
                  htmlFor="display-name"
                  className="text-sm font-medium text-gray-700"
                >
                  Display Name
                </label>
                <Input
                  id="display-name"
                  type="text"
                  placeholder="Enter your display name"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="h-12"
                />
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
              className="px-6 bg-transparent"
            >
              Back
            </Button>

            {step < totalSteps ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="px-6 bg-blue-600 hover:bg-blue-700"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                disabled={!canProceed() || isLoading}
                className="px-6 bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? "Completing..." : "Complete Setup"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
