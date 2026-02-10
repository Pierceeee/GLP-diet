import OpenAI from "openai";
import { SYSTEM_PROMPT } from "./prompts";

/**
 * Generate analysis using OpenAI GPT-4o
 */
export async function openaiGenerate(userPrompt: string): Promise<string> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  const openai = new OpenAI({ apiKey });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userPrompt },
      ],
      temperature: 0.7,
      max_tokens: 1000,
    });

    const content = response.choices[0]?.message?.content;

    if (!content) {
      throw new Error("No response content from OpenAI");
    }

    return content;
  } catch (error) {
    console.error("OpenAI generation error:", error);
    throw error;
  }
}
