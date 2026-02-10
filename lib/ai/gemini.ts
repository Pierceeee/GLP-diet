import { GoogleGenerativeAI } from "@google/generative-ai";
import { SYSTEM_PROMPT } from "./prompts";

/**
 * Generate analysis using Google Gemini 1.5 Pro
 */
export async function geminiGenerate(userPrompt: string): Promise<string> {
  const apiKey = process.env.GOOGLE_AI_API_KEY;

  if (!apiKey) {
    throw new Error("GOOGLE_AI_API_KEY is not configured");
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  try {
    // Combine system prompt and user prompt for Gemini
    const fullPrompt = `${SYSTEM_PROMPT}\n\n---\n\n${userPrompt}`;

    const result = await model.generateContent(fullPrompt);
    const response = result.response;
    const content = response.text();

    if (!content) {
      throw new Error("No response content from Gemini");
    }

    return content;
  } catch (error) {
    console.error("Gemini generation error:", error);
    throw error;
  }
}
