import { GoogleGenerativeAI } from "@google/generative-ai";
import { resources } from "../data/resources";

// Fallback directly to string so it works even if Vite wasn't restarted after .env creation
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "AIzaSyAVKG7PExs6O_yaXMNeek4io9-rCZ_f6fg";
const genAI = new GoogleGenerativeAI(apiKey);

const systemInstruction = `You are RIA, the AI assistant for ResourceRIA — a college academic platform.
You have access to all resources on this platform combined with user data:
${JSON.stringify(resources)}
Help students find notes, explain topics, and guide their learning.
Always link to relevant resources when available.`;

export const askRIA = async (prompt) => {
  if (!apiKey) return "API Key not configured!";
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      systemInstruction: systemInstruction,
    });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error asking RIA:", error);
    return "Sorry, my neural pathways are congested right now. Please try again later.";
  }
};

export const generateQuiz = async (subject, difficulty) => {
  if (!apiKey) return null;
  const prompt = `Generate a 10-question multiple choice quiz for the college subject "${subject}" at a ${difficulty} difficulty level.
Respond strictly in valid JSON format ONLY, without markdown code block backticks inside the string. Just return the raw JSON array.
The JSON array MUST exactly match this format:
[
  {
    "question": "question text",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": "Exact string of the correct option",
    "explanation": "Brief explanation of why the answer is correct."
  }
]`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    const cleanJson = text.replace(/^```json/g, "").replace(/^```/g, "").replace(/```$/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Error generating quiz:", error);
    return null;
  }
};

export const generateCustomRoadmap = async (goal, skillLevel, timeWeeks, learningStyle) => {
  if (!apiKey) return null;
  const prompt = `Create a personalized week-by-week learning roadmap for a student.
Goal: ${goal}
Current Skill Level: ${skillLevel}
Time Available: ${timeWeeks} weeks
Preferred Learning Style: ${learningStyle}

Respond strictly in valid JSON format ONLY, without markdown code block backticks inside the string. Just return the raw JSON object.
The JSON MUST exactly match this format:
{
  "title": "Custom Roadmap for [Goal]",
  "summary": "Brief encouraging summary of the plan.",
  "weeks": [
    {
      "week": 1,
      "focus": "Main topic for the week",
      "tasks": ["Task 1", "Task 2", "Task 3"]
    }
  ]
}`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();
    const cleanJson = text.replace(/^```json/g, "").replace(/^```/g, "").replace(/```$/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Error generating roadmap:", error);
    return null;
  }
};

export const analyzePYQ = async (question) => {
  if (!apiKey) return "API Key not configured!";
  const prompt = `Analyze the following Past Year Question (PYQ) for a college exam:

"${question}"

Provide a detailed response in Markdown format with the following headings:
### 🎯 Core Concept Tested
(What topic is this question evaluating?)

### 📝 Step-by-Step Approach
(How should a student formulate their answer?)

### ⚠️ Common Mistakes to Avoid
(What do students usually get wrong here?)

### 🔗 Related Topics to Revise
(What else should they study related to this?)`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error analyzing PYQ:", error);
    return "Error occurred while analyzing the question. Please try again.";
  }
};

export const summarizeNotes = async (notes) => {
  if (!apiKey) return "API Key not configured!";
  const prompt = `Analyze the following study notes and provide a structured study guide:

"${notes}"

Provide the response in Markdown format with the following headings:
### 📌 TL;DR Summary
(bullet points of the most important facts)

### 🗂️ Flashcards (Q&A)
(Generate 5-10 question and answer pairs for active recall based on the notes)

### ❓ Likely Exam Questions
(Generate 3 potential exam questions based on this text)

### 📖 Key Terms Glossary
(Define the difficult or important terms)`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error summarizing notes:", error);
    return "Error occurred while summarizing notes. Please try again.";
  }
};
