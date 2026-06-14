import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

export async function POST(req: Request) {
  try {
    const { type, payload } = await req.json();

    if (!type || !payload) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let prompt = "";
    if (type === "summary") {
      const { fullName, skills, title } = payload;
      prompt = `Generate a captivating, modern, and professional executive resume summary (around 3 to 4 lines, maximum 50–60 words) for a professional seeking a role as "${title || 'Job Seeker'}".
      Candidate Name: ${fullName || 'Professional'}
      Key Skills / Technologies: ${skills || 'Relevant skills'}
      Use active, high-impact verbs. Keep it elegant, compact, and tailored for ATS keyword scanners. Do not write markdown, do not put quotes around the summary. Return just the summary text itself.`;
    } else if (type === "experience") {
      const { position, company, description } = payload;
      prompt = `Optimize this work experience description for a resume. Transform it into 3 bullet points, each starting with an impactful action verb. Use the STAR methodology (Situation, Task, Action, Result) where possible, highlighting quantifiable results and specific achievements.
      Position: ${position || 'Role'}
      Company: ${company || 'Company'}
      Current Description/Notes: ${description || 'Responsibility'}
      Return just the polished, action-oriented lines, each on a new line starting with a bullet character "• ". Do not wrap in markdown or headers. Just return the bullet points.`;
    } else if (type === "project") {
      const { name, description } = payload;
      prompt = `Improve the following resume project description to be professional, technical, and high-impact. Write 2 structured, ATS-optimized bullet points showcasing technologies, challenges, and solutions.
      Project Name: ${name || 'Project'}
      Current description/notes: ${description || 'Details'}
      Return just the optimized bullet points, each on a new line starting with "• ". Overwrite any casual messaging with strong phrasing.`;
    } else if (type === "skills") {
      const { title, currentSkills } = payload;
      prompt = `Suggest a comma-separated list of 10 modern, industry-standard, and highly searchable technical and soft skills for a resume.
      Target Role: ${title || 'Professional'}
      Current entered skills (if any): ${currentSkills || ''}
      Return ONLY the final skills as a flat, comma-separated list (e.g. "React, TypeScript, Node.js, REST APIs, Agile, Git"). Do not wrap in markdown or write introductory or concluding sentences. Just return the comma-separated list.`;
    } else {
      return NextResponse.json({ error: "Invalid suggestion type" }, { status: 400 });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        temperature: 0.7,
      }
    });

    const text = response.text?.trim() || "";
    return NextResponse.json({ text });
  } catch (error: any) {
    console.error("AI Suggest Error:", error);
    return NextResponse.json({ error: error.message || "Failed to generate AI suggestion." }, { status: 500 });
  }
}
