import "server-only";

import { env } from "../env";

type GeminiJsonSchema = Record<string, unknown>;

type GeminiJsonRequest = {
  systemInstruction: string;
  userContent: string;
  responseSchema: GeminiJsonSchema;
};

export async function generateGeminiJson({
  systemInstruction,
  userContent,
  responseSchema,
}: GeminiJsonRequest): Promise<unknown> {
  if (!env.GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY is not configured");
  }

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${env.GEMINI_MODEL}:generateContent?key=${env.GEMINI_API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemInstruction }] },
        contents: [{ role: "user", parts: [{ text: userContent }] }],
        generationConfig: {
          responseMimeType: "application/json",
          responseSchema,
        },
      }),
    },
  );

  if (!response.ok) {
    throw new Error(`Gemini request failed with status ${response.status}`);
  }

  const payload = (await response.json()) as {
    candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
  };
  const content = payload.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!content) {
    throw new Error("Gemini returned no qualification content");
  }

  return JSON.parse(content);
}
