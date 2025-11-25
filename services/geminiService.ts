import { GoogleGenAI } from "@google/genai";
import { Property } from '../types';

let aiClient: GoogleGenAI | null = null;

const getAiClient = () => {
  if (!aiClient) {
    // Ensure API Key is available
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.warn("API_KEY is not set in process.env");
      return null;
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
};

export const generatePropertyInsights = async (property: Property): Promise<string> => {
  const client = getAiClient();

  if (!client) {
    // Fallback if API key is missing, for demonstration purposes without crashing
    return `**Note:** AI insights are currently unavailable due to missing configuration.\n\nPlease contact the administrator to enable Gemini AI features.`;
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      You are a senior real estate investment analyst for Lornell Real Estate. 
      Analyze the following commercial real estate asset and provide a concise, high-impact executive summary for a potential investor.
      
      Property Details:
      - Address: ${property.address}, ${property.city}
      - Type: ${property.type} ${property.subtype ? `(${property.subtype})` : ''}
      - Size: ${property.size}
      - Price: ${property.price}
      - Description: ${property.description || 'Standard commercial listing.'}
      - Key Tenants/Features: ${property.details?.anchor || property.details?.loading || 'N/A'}

      Output Guidelines:
      1.  Create a section "**Investment Highlights:**" with 3 bullet points focusing on cash flow, location, or value-add potential.
      2.  Create a final "**AI Verdict:**" which is a one-sentence punchy summary.
      3.  Use professional, persuasive, Wall Street-style language.
      4.  Do not include introductory fluff.
    `;

    const response = await client.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        temperature: 0.7,
        maxOutputTokens: 400,
      }
    });

    return response.text || "Analysis unavailable.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to generate real-time insights. Please try again later.";
  }
};