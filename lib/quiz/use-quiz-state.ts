"use client";

import { useQueryState, parseAsInteger, parseAsString } from "nuqs";
import { useCallback, useState, useEffect } from "react";
import type { QuizAnswers, Gender, AnswerValue } from "@/types";
import { getQuestionByStep, TOTAL_STEPS } from "@/config/questions";

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

  // Local state for answers (would be persisted to Supabase in production)
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [isLoading, setIsLoading] = useState(false);

  // Derive gender from URL or answers
  const gender: Gender = (genderParam as Gender) || (answers.gender as Gender) || "male";

  // Get current question
  const currentQuestion = getQuestionByStep(step);

  // Get current answer for the active question
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : null;

  /**
   * Set answer for current question
   */
  const setAnswer = useCallback(
    (value: AnswerValue) => {
      if (!currentQuestion) return;

      setAnswers((prev) => ({
        ...prev,
        [currentQuestion.id]: value,
      }));
    },
    [currentQuestion]
  );

  /**
   * Go to next step
   */
  const nextStep = useCallback(() => {
    if (step < TOTAL_STEPS) {
      setStep(step + 1);
    }
  }, [step, setStep]);

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
      if (targetStep >= 1 && targetStep <= TOTAL_STEPS) {
        setStep(targetStep);
      }
    },
    [setStep]
  );

  /**
   * Set gender (from landing page selection)
   */
  const setGender = useCallback(
    (newGender: Gender) => {
      setGenderParam(newGender);
      setAnswers((prev) => ({ ...prev, gender: newGender }));
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
      const newId = crypto.randomUUID();
      setSubmissionId(newId);
    }
  }, [submissionId, setSubmissionId]);

  /**
   * Check if quiz is complete
   */
  const isComplete = step >= TOTAL_STEPS;

  /**
   * Check if on loading step
   */
  const isLoadingStep = currentQuestion?.type === "loading";

  /**
   * Get progress percentage
   */
  const progressPercentage = (step / TOTAL_STEPS) * 100;

  // Initialize on mount
  useEffect(() => {
    if (genderParam && !answers.gender) {
      setAnswers((prev) => ({ ...prev, gender: genderParam }));
    }
  }, [genderParam, answers.gender]);

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
    totalSteps: TOTAL_STEPS,

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
