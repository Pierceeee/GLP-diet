import type { QuizAnswers, Gender } from "@/types";
import { buildAnalysisPrompt } from "./prompts";
import { openaiGenerate } from "./openai";
import { geminiGenerate } from "./gemini";

export type AIProvider = "openai" | "gemini";

/**
 * Generate personalized GLP diet analysis from quiz answers.
 * Uses OpenAI by default, or Gemini if specified.
 */
export async function generateAnalysis(
  answers: QuizAnswers,
  gender: Gender,
  provider: AIProvider = "openai"
): Promise<string> {
  const userPrompt = buildAnalysisPrompt(answers, gender);

  if (provider === "gemini") {
    return geminiGenerate(userPrompt);
  }

  return openaiGenerate(userPrompt);
}
