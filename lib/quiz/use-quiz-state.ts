"use client";

import { useQueryState, parseAsInteger, parseAsString } from "nuqs";
import { useCallback, useState, useEffect } from "react";
import type { QuizAnswers, Gender, AnswerValue } from "@/types";
import { getQuestionByStep, getTotalSteps } from "@/config/questions";

const ANSWERS_STORAGE_KEY = "glp-quiz-answers";

function loadAnswersFromStorage(): QuizAnswers {
  if (typeof window === "undefined") return {};
  try {
    const stored = localStorage.getItem(ANSWERS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  } catch {
    return {};
  }
}

function saveAnswersToStorage(answers: QuizAnswers): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(ANSWERS_STORAGE_KEY, JSON.stringify(answers));
  } catch {
    // Storage might be full or disabled
  }
}

/**
 * Custom hook for managing quiz state with URL persistence
 */
export function useQuizState() {
  // URL-persisted state
  const [step, setStep] = useQueryState(
    "step",
    parseAsInteger.withDefault(1)
  );
  const [submissionId, setSubmissionId] = useQueryState(
    "id",
    parseAsString.withDefault("")
  );
  const [genderParam, setGenderParam] = useQueryState(
    "gender",
    parseAsString.withDefault("")
  );

  // Local state for answers - initialized from localStorage
  const [answers, setAnswers] = useState<QuizAnswers>(() => loadAnswersFromStorage());
  const [isLoading, setIsLoading] = useState(false);

  // Derive gender from URL or answers (normalize to lowercase for comparison)
  const rawGender = genderParam || (answers.gender as string) || "";
  const gender: Gender =
    rawGender.toLowerCase() === "female" ? "female" : "male";

  // Total steps for current gender
  const totalSteps = getTotalSteps(gender);

  // Get current question for this step/gender
  const currentQuestion = getQuestionByStep(step, gender);

  // Get current answer for the active question
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : null;

  /**
   * Set answer for current question
   */
  const setAnswer = useCallback(
    (value: AnswerValue) => {
      if (!currentQuestion) return;

      setAnswers((prev) => {
        const updated = {
          ...prev,
          [currentQuestion.id]: value,
        };
        saveAnswersToStorage(updated);
        return updated;
      });
    },
    [currentQuestion]
  );

  /**
   * Go to next step
   * Allow going to step totalSteps + 1 for email capture
   */
  const nextStep = useCallback(() => {
    if (step <= totalSteps) {
      setStep(step + 1);
    }
  }, [step, totalSteps, setStep]);

  /**
   * Go to previous step
   */
  const prevStep = useCallback(() => {
    if (step > 1) {
      setStep(step - 1);
    }
  }, [step, setStep]);

  /**
   * Go to specific step
   */
  const goToStep = useCallback(
    (targetStep: number) => {
      if (targetStep >= 1 && targetStep <= totalSteps) {
        setStep(targetStep);
      }
    },
    [totalSteps, setStep]
  );

  /**
   * Set gender (from landing page selection)
   */
  const setGender = useCallback(
    (newGender: Gender) => {
      setGenderParam(newGender);
      setAnswers((prev) => {
        const updated = { ...prev, gender: newGender };
        saveAnswersToStorage(updated);
        return updated;
      });
    },
    [setGenderParam]
  );

  /**
   * Initialize submission
   */
  const initializeSubmission = useCallback(async () => {
    // In production, this would call the Supabase createSubmission function
    // For now, generate a simple ID
    if (!submissionId) {
      const newId =
        typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2, 11)}`;
      setSubmissionId(newId);
    }
  }, [submissionId, setSubmissionId]);

  /**
   * Check if quiz is complete
   */
  const isComplete = step >= totalSteps;

  /**
   * Check if on loading step
   */
  const isLoadingStep = currentQuestion?.type === "loading";

  /**
   * Get progress percentage
   */
  const progressPercentage = (step / totalSteps) * 100;

  // Initialize on mount - sync gender from URL to answers
  useEffect(() => {
    if (genderParam && !answers.gender) {
      setAnswers((prev) => {
        const updated = { ...prev, gender: genderParam };
        saveAnswersToStorage(updated);
        return updated;
      });
    }
  }, [genderParam, answers.gender]);

  // Load answers from localStorage on mount (client-side only)
  useEffect(() => {
    const stored = loadAnswersFromStorage();
    if (Object.keys(stored).length > 0) {
      setAnswers(stored);
    }
  }, []);

  return {
    // State
    step,
    submissionId,
    gender,
    answers,
    currentQuestion,
    currentAnswer,
    isLoading,
    isComplete,
    isLoadingStep,
    progressPercentage,
    totalSteps,

    // Actions
    setStep: goToStep,
    setAnswer,
    setGender,
    nextStep,
    prevStep,
    setIsLoading,
    initializeSubmission,
    setSubmissionId,
  };
}
