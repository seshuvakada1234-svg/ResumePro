import { GoogleGenAI, Type } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY! });

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "No text provided" }, { status: 400 });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following resume text and extract the candidate's primary role and key skills. 
      Return the result as JSON.
      
      Resume text:
      ${text}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            role: { type: Type.STRING },
            skills: { type: Type.ARRAY, items: { type: Type.STRING } },
          },
          required: ["role", "skills"],
        },
      },
    });

    const textResponse = response.text || "{}";
    const result = JSON.parse(textResponse);
    return NextResponse.json(result);
  } catch (error) {
    console.error("Resume analysis error:", error);
    return NextResponse.json({ 
      role: "Professional", 
      skills: [],
      error: "Failed to analyze resume with AI" 
    }, { status: 200 }); // Return fallback instead of error to keep UI working
  }
}
