import { GoogleGenAI, Type } from "@google/genai";
import { LottoSet, GenerationType } from '../types';
import { generateId, pickRandomNumbers, generateRandomLottoSet } from '../utils';

// Initialize Gemini
// NOTE: In a real environment, keys should be proxied, but for this demo standard env is used.
// The prompt assumes the user has set process.env.API_KEY.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateAILuckyNumbers = async (userPrompt: string): Promise<LottoSet[]> => {
  try {
    const prompt = `
      User Input: "${userPrompt}"
      
      Task: Generate 1 set of "Super Lotto" (大乐透) numbers based on the user's input (lucky keywords, dream interpretation, or random feeling).
      
      Rules:
      - Front Zone: 5 unique integers between 1 and 35 (inclusive).
      - Back Zone: 2 unique integers between 1 and 12 (inclusive).
      - Provide a short, fun "reason" in Chinese explaining why these numbers were chosen based on the input (e.g., "Dragon implies number 5...").
      
      If the input is nonsense, just generate a lucky set and say "The stars are aligning for you."
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sets: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  front: {
                    type: Type.ARRAY,
                    items: { type: Type.INTEGER },
                    description: "5 unique numbers from 1-35"
                  },
                  back: {
                    type: Type.ARRAY,
                    items: { type: Type.INTEGER },
                    description: "2 unique numbers from 1-12"
                  },
                  reason: {
                    type: Type.STRING,
                    description: "Short reason in Chinese"
                  }
                },
                required: ["front", "back"]
              }
            }
          }
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No response from AI");

    const data = JSON.parse(jsonText);
    
    // Map response to our internal structure
    return data.sets.map((item: any) => ({
      id: generateId(),
      front: item.front.sort((a: number, b: number) => a - b),
      back: item.back.sort((a: number, b: number) => a - b),
      timestamp: Date.now(),
      source: 'ai',
      reason: item.reason
    }));

  } catch (error) {
    console.error("AI Generation failed:", error);
    // Fallback to random if AI fails, but mark as random source to avoid confusion
    const fallback = {
      ...generateRandomLottoSet(),
      reason: "AI 连接超时，为您随机生成 (AI timeout, random fallback)"
    };
    return [fallback];
  }
};