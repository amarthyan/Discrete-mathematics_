
import { GoogleGenAI, Type } from "@google/genai";
import { Category, MathSolution } from "../types";

export const solveMathProblem = async (
  category: Category,
  input: string,
  eli5: boolean = false
): Promise<MathSolution> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `Solve the following Discrete Mathematics problem in the category of ${category}:
  Problem: ${input}
  
  Please provide a structured response. If it's a Graph Theory problem with an adjacency matrix, include nodes and links in the graphData. If it's a Logic problem, include a truthTable. 
  ${eli5 ? "Also include an 'Explain Like I'm 5' summary." : ""}
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-pro-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          answer: { type: Type.STRING, description: "The final concise answer" },
          steps: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Step-by-step reasoning"
          },
          formulas: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: "Formulas used in LaTeX format"
          },
          eli5: { type: Type.STRING, description: "A simple explanation" },
          graphData: {
            type: Type.OBJECT,
            properties: {
              nodes: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: { id: { type: Type.STRING } }
                }
              },
              links: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    source: { type: Type.STRING },
                    target: { type: Type.STRING }
                  }
                }
              }
            }
          },
          truthTable: {
            type: Type.ARRAY,
            items: { type: Type.OBJECT, description: "Key-value pairs for each row" }
          }
        },
        required: ["answer", "steps", "formulas"]
      }
    }
  });

  try {
    const result = JSON.parse(response.text);
    return result as MathSolution;
  } catch (err) {
    console.error("Failed to parse AI response", err);
    throw new Error("Invalid response format from AI");
  }
};

export const generateQuiz = async (category: Category): Promise<any[]> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Generate 3 practice multiple-choice questions for Discrete Math category: ${category}.`;
  
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: { type: Type.STRING },
            options: { type: Type.ARRAY, items: { type: Type.STRING } },
            correctIndex: { type: Type.INTEGER }
          },
          required: ["question", "options", "correctIndex"]
        }
      }
    }
  });

  return JSON.parse(response.text);
};
