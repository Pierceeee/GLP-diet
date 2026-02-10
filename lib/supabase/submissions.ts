"use server";

import { createServerClient } from "./client";
import type { FunnelSubmission, QuizAnswers, Gender, AnswerValue } from "@/types";

/**
 * Create a new submission record
 */
export async function createSubmission(): Promise<FunnelSubmission | null> {
  try {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from("funnel_submissions")
      .insert({
        gender: null,
        current_step: 1,
        answers: {},
        ai_analysis: null,
        status: "started",
        email: null,
        metadata: {},
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating submission:", error);
      return null;
    }

    return data as FunnelSubmission;
  } catch (error) {
    console.error("Error creating submission:", error);
    return null;
  }
}

/**
 * Get a submission by ID
 */
export async function getSubmission(
  id: string
): Promise<FunnelSubmission | null> {
  try {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from("funnel_submissions")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching submission:", error);
      return null;
    }

    return data as FunnelSubmission;
  } catch (error) {
    console.error("Error fetching submission:", error);
    return null;
  }
}

/**
 * Update submission answers and step
 */
export async function updateSubmission(
  id: string,
  updates: {
    answers?: QuizAnswers;
    current_step?: number;
    gender?: Gender;
    email?: string;
    status?: FunnelSubmission["status"];
    ai_analysis?: string;
  }
): Promise<FunnelSubmission | null> {
  try {
    const supabase = createServerClient();

    const { data, error } = await supabase
      .from("funnel_submissions")
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()
      .single();

    if (error) {
      console.error("Error updating submission:", error);
      return null;
    }

    return data as FunnelSubmission;
  } catch (error) {
    console.error("Error updating submission:", error);
    return null;
  }
}

/**
 * Save answer for a specific question
 */
export async function saveAnswer(
  submissionId: string,
  questionId: string,
  answer: AnswerValue,
  currentStep: number
): Promise<boolean> {
  try {
    const submission = await getSubmission(submissionId);
    if (!submission) return false;

    const existingAnswers = (submission.answers || {}) as QuizAnswers;
    const updatedAnswers: QuizAnswers = {
      ...existingAnswers,
      [questionId]: answer,
    };

    const result = await updateSubmission(submissionId, {
      answers: updatedAnswers,
      current_step: currentStep,
    });

    return result !== null;
  } catch (error) {
    console.error("Error saving answer:", error);
    return false;
  }
}

/**
 * Complete the submission and save AI analysis
 */
export async function completeSubmission(
  id: string,
  aiAnalysis: string,
  email?: string
): Promise<FunnelSubmission | null> {
  return updateSubmission(id, {
    status: "completed",
    ai_analysis: aiAnalysis,
    email: email || undefined,
  });
}

/**
 * Mark submission as purchased
 */
export async function markAsPurchased(
  id: string
): Promise<FunnelSubmission | null> {
  return updateSubmission(id, {
    status: "purchased",
  });
}
