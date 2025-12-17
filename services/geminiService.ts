
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { ImageSize } from "../types";

export const askMusicQuestion = async (prompt: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: prompt,
    config: {
      systemInstruction: "You are an expert music theory professor. Explain concepts clearly, use analogies, and focus on both classical and jazz theory. Provide concise but helpful answers.",
    },
  });
  return response.text;
};

export const generateMusicImage = async (prompt: string, size: ImageSize) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-image-preview',
    contents: {
      parts: [{ text: `Create a beautiful, artistic, high-quality music theory visualization of: ${prompt}. Style: minimalist, educational, and visually stunning.` }],
    },
    config: {
      imageConfig: {
        aspectRatio: "1:1",
        imageSize: size,
      },
    },
  });

  for (const part of response.candidates?.[0]?.content.parts || []) {
    if (part.inlineData) {
      return `data:image/png;base64,${part.inlineData.data}`;
    }
  }
  return null;
};

// Check for selected API key (specifically for Veo/Image models)
export const checkApiKeySelection = async (): Promise<boolean> => {
  if (typeof (window as any).aistudio?.hasSelectedApiKey === 'function') {
    return await (window as any).aistudio.hasSelectedApiKey();
  }
  return true; // Fallback for environments where this isn't available
};

export const openApiKeySelection = async () => {
  if (typeof (window as any).aistudio?.openSelectKey === 'function') {
    await (window as any).aistudio.openSelectKey();
  }
};
