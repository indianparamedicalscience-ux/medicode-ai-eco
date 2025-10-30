
import { GoogleGenAI, Type } from "@google/genai";
import { MedicalCode } from '../types';

// Ensure the API key is available from environment variables
if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
const model = 'gemini-2.5-flash';

const codeSuggestionSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      code: {
        type: Type.STRING,
        description: 'The medical code, e.g., "J45.909" or "99213".',
      },
      description: {
        type: Type.STRING,
        description: 'The official description of the medical code.',
      },
      type: {
        type: Type.STRING,
        enum: ['ICD-10', 'CPT'],
        description: 'The type of medical code, either ICD-10 or CPT.',
      },
      justification: {
        type: Type.STRING,
        description: 'A brief justification for why this code was suggested based on the clinical notes.',
      },
    },
    required: ['code', 'description', 'type', 'justification'],
  },
};

const codeLookupSchema = {
  type: Type.OBJECT,
  properties: {
    code: {
      type: Type.STRING,
      description: 'The medical code that was looked up.'
    },
    description: {
      type: Type.STRING,
      description: 'The official description of the medical code.',
    },
    type: {
      type: Type.STRING,
      enum: ['ICD-10', 'CPT', 'Unknown'],
      description: 'The type of medical code.',
    },
    details: {
      type: Type.STRING,
      description: 'Additional details or context about the code, such as common usage or related codes.',
    }
  },
  required: ['code', 'description', 'type', 'details'],
};

export const suggestCodes = async (clinicalText: string): Promise<MedicalCode[]> => {
  const prompt = `As an expert medical coder, analyze the following clinical notes and suggest relevant ICD-10 and CPT codes. Provide a justification for each suggestion. Clinical Notes: "${clinicalText}"`;
  
  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: codeSuggestionSchema,
        temperature: 0.2,
      },
    });

    const jsonText = response.text.trim();
    const suggestedCodes: MedicalCode[] = JSON.parse(jsonText);
    return suggestedCodes;
  } catch (error) {
    console.error("Error suggesting codes:", error);
    throw new Error("Failed to get suggestions from AI. Please check the clinical notes and try again.");
  }
};

export const lookupCode = async (code: string): Promise<MedicalCode> => {
    const prompt = `Provide a detailed description for the medical code: ${code}. Specify if it is an ICD-10 or CPT code and give some context about its usage.`;
    
    try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            responseMimeType: "application/json",
            responseSchema: codeLookupSchema,
            temperature: 0.1,
          },
        });

        const jsonText = response.text.trim();
        const foundCode: MedicalCode = JSON.parse(jsonText);
        return foundCode;
    } catch(error) {
        console.error("Error looking up code:", error);
        throw new Error("Failed to look up the code. Please ensure it is a valid code and try again.");
    }
};
