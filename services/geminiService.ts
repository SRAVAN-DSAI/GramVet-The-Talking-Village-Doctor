
import { GoogleGenAI, Type } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { DiagnosisResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const analyzeImage = async (
  file: File,
  animalType: string,
  languageLabel: string,
  additionalDetails?: string,
  audioBlob?: Blob
): Promise<DiagnosisResponse> => {
  
  const base64Data = await fileToBase64(file);
  const mimeType = file.type;

  const prompt = `
    Target Language: ${languageLabel}
    Selected Animal Category: ${animalType}
    User Observation (Additional Details): ${additionalDetails || "None provided"}
    
    IMPORTANT: The user is an illiterate farmer who DOES NOT speak English. 
    You MUST Output the 'spokenResponse', 'diagnosis', and 'remedies' ENTIRELY in ${languageLabel}.
    Do NOT output English text.
    
    Analyze the attached media (Image and optional Audio). Return the diagnosis, severity, user_note, remedies, and spoken response strictly in JSON format.
  `;

  const parts: any[] = [
      {
        inlineData: {
          mimeType: mimeType,
          data: base64Data
        }
      },
      { text: prompt }
  ];

  if (audioBlob) {
      const audioBase64 = await blobToBase64(audioBlob);
      parts.push({
          inlineData: {
              mimeType: audioBlob.type || 'audio/mp3',
              data: audioBase64
          }
      });
  }

  const response = await ai.models.generateContent({
    model: 'gemini-3-pro-preview',
    contents: {
      parts: parts
    },
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          diagnosis: { type: Type.STRING },
          severity: { type: Type.STRING, enum: ["LOW", "HIGH", "CRITICAL"] },
          user_note: { type: Type.STRING, description: "Transcription of user audio/text in target language" },
          spokenResponse: { type: Type.STRING },
          remedies: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                iconType: { type: Type.STRING, enum: ["HERBAL", "WASH", "ISOLATE", "DOCTOR", "FEED"] },
                instruction: { type: Type.STRING }
              },
              required: ["iconType", "instruction"]
            }
          }
        },
        required: ["diagnosis", "severity", "user_note", "remedies", "spokenResponse"]
      }
    }
  });

  const text = response.text;
  if (!text) {
    throw new Error("No response from Gemini");
  }

  return JSON.parse(text) as DiagnosisResponse;
};
