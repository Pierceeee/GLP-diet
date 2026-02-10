"use server";

import { generateAnalysis } from "@/lib/ai";
import type { QuizAnswers, Gender } from "@/types";

interface AnalyzeResult {
  success: boolean;
  analysis?: string;
  error?: string;
}

/**
 * Server action to generate AI analysis from quiz answers
 */
export async function analyzeQuizAnswers(
  answers: QuizAnswers,
  gender: Gender
): Promise<AnalyzeResult> {
  try {
    // Validate required fields
    if (!answers.height || !answers.weight) {
      return {
        success: false,
        error: "Missing required fields: height and weight",
      };
    }

    // Generate the analysis
    const analysis = await generateAnalysis(answers, gender);

    return {
      success: true,
      analysis,
    };
  } catch (error) {
    console.error("Analysis generation failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Analysis generation failed",
    };
  }
}
