import { GoogleGenerativeAI } from "@google/generative-ai";
import * as webllm from "@mlc-ai/web-llm";

// Retrieve key ensuring Vite compatibility without needing restart
const getGeminiKey = () => import.meta.env.GEMINI_API_KEY || import.meta.env.VITE_GEMINI_API_KEY;

// Keep WebLLM engine singleton
let webLlmEngine = null;

/**
 * Core generation wrapper implementing the Fallback Chain:
 * 1. window.ai (Chrome Built-in)
 * 2. Gemini API (via Vercel/Vite ENV config)
 * 3. WebLLM (In-Browser download)
 */
async function coreGenerate(prompt, systemPrompt = null) {
  // 1. Try Chrome Built-in AI
  if ("ai" in window && window.ai?.languageModel) {
    try {
      const caps = await window.ai.languageModel.capabilities();
      if (caps.available !== 'no') {
        const options = systemPrompt ? { systemPrompt } : {};
        const session = await window.ai.languageModel.create(options);
        return await session.prompt(prompt);
      }
    } catch (e) {
      console.warn("Chrome Built-in AI failed, falling back...", e);
    }
  }

  // 2. Try Gemini (if API Key is not just a placeholder)
  const geminiKey = getGeminiKey();
  if (geminiKey && geminiKey.length > 20) {
    try {
      const genAI = new GoogleGenerativeAI(geminiKey);
      const options = { model: "gemini-1.5-flash" };
      if (systemPrompt) options.systemInstruction = systemPrompt;
      
      const model = genAI.getGenerativeModel(options);
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (e) {
      console.warn("Gemini API failed, falling back...", e);
    }
  }

  // 3. Fall back to WebLLM (Downloads model on first run)
  try {
    if (!webLlmEngine) {
      console.log("Initializing WebLLM... downloading model to browser cache.");
      webLlmEngine = await webllm.CreateMLCEngine("Llama-3.2-1B-Instruct-q4f32_1-MLC", {
        initProgressCallback: (p) => console.log('Downloading Model:', Math.round(p.progress * 100) + '% - ' + p.text)
      });
    }
    
    const messages = [];
    if (systemPrompt) messages.push({ role: "system", content: systemPrompt });
    messages.push({ role: "user", content: prompt });
    
    const reply = await webLlmEngine.chat.completions.create({ messages });
    return reply.choices[0].message.content;
  } catch(e) {
    console.error("All AI generation methods failed.", e);
    return null;
  }
}

// ==================================
// EXPORTED FEATURE FUNCTIONS
// ==================================

export const askRIA = async (prompt) => {
  const systemInstruction = `You are RIA, the AI assistant for ResourceRIA.
You have access to academic resources organized by year, branch, and semester.
Your primary goal is to help students, but you are specifically authorized to answer ALL questions, including general knowledge, coding, life advice, and casual conversation.
Be extremely helpful, friendly, and provide clear, simple explanations.`;

  const result = await coreGenerate(prompt, systemInstruction);
  if (!result) return "Sorry, my neural pathways are congested right now! You might need to check your connection or try a desktop browser.";
  return result;
};

export const generateQuiz = async (subject, difficulty) => {
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

  const text = await coreGenerate(prompt);
  if (!text) return null;
  
  try {
    const cleanJson = text.replace(/^```json/g, "").replace(/^```/g, "").replace(/```$/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Failed to parse JSON for quiz.");
    return null;
  }
};

export const generateCustomRoadmap = async (goal, skillLevel, timeWeeks, learningStyle) => {
  if (typeof goal !== 'string' || typeof skillLevel !== 'string' || typeof learningStyle !== 'string' || typeof timeWeeks !== 'number') {
    return null;
  }
  
  const sanitizedGoal = goal.trim().substring(0, 200);
  const sanitizedSkillLevel = skillLevel.trim().substring(0, 50);
  const sanitizedLearningStyle = learningStyle.trim().substring(0, 100);
  
  const prompt = `Create a personalized week-by-week learning roadmap for a student.
Goal: ${sanitizedGoal}
Current Skill Level: ${sanitizedSkillLevel}
Time Available: ${timeWeeks} weeks
Preferred Learning Style: ${sanitizedLearningStyle}

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

  const text = await coreGenerate(prompt);
  if (!text) return null;

  try {
    const cleanJson = text.replace(/^```json/g, "").replace(/^```/g, "").replace(/```$/g, "").trim();
    return JSON.parse(cleanJson);
  } catch (error) {
    console.error("Failed to parse JSON for roadmap.");
    return null;
  }
};

export const analyzePYQ = async (question) => {
  if (!question || typeof question !== 'string' || question.length > 2000) {
    return "Invalid input: question must be a string under 2000 characters.";
  }
  
  const sanitizedQuestion = question.trim().replace(/[^\w\s.,!?-]/g, '');
  const prompt = `Analyze the following Past Year Question (PYQ) for a college exam:

"${sanitizedQuestion}"

Provide a detailed response in Markdown format with the following headings:
### 🎯 Core Concept Tested
(What topic is this question evaluating?)

### 📝 Step-by-Step Approach
(How should a student formulate their answer?)

### ⚠️ Common Mistakes to Avoid
(What do students usually get wrong here?)

### 🔗 Related Topics to Revise
(What else should they study related to this?)`;

  const text = await coreGenerate(prompt);
  if (!text) return "Error occurred while analyzing the question. Please try again.";
  return text;
};

export const summarizeNotes = async (notes) => {
  const MAX_INPUT_SIZE = 5000;
  if (!notes || typeof notes !== 'string' || notes.length > MAX_INPUT_SIZE) {
    return `Invalid input: notes must be a string under ${MAX_INPUT_SIZE} characters.`;
  }
  
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

  const text = await coreGenerate(prompt);
  if (!text) return "Error occurred while summarizing notes. Please try again.";
  return text;
};
