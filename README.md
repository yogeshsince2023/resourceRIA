# ResourceRIA - Academic Hub 🎓✨

ResourceRIA is a blazing-fast, strictly-typed, heavily-animated academic hub designed for students to access resources, track performance, forge learning roadmaps, and instantly get AI-powered tutoring on any subject. 

Built on **Vite + React (SPA)** with a **Cyber/Neon Dark Glassmorphism** aesthetic.

## 🚀 Core Features & Pages

- **Subject Resource Engine**: Access 70+ categorized subjects mapped strictly across Years, Branches, and specific Semesters. Resources are visually tagged using color-coded glow badges (`Notes`, `PYQs`, `Videos`).
- **Global Command Search Bar**: An omnipresent `Cmd+K` / `Ctrl+K` fuzzy-indexed command palette overlay. Instantly routing users to any subject, language, roadmap, or tool across the application with zero-latency.
- **Interactive GPA Calculator**: A complex, purely client-side CGPA/SGPA calculator dynamically generating data entry grids to compute precise academic margins.
- **Interactive Bunk Calculator**: A responsive, 3-state logic attendance engine computing exactly how many classes a student can safely miss, or must consecutively attend to clear minimum university threshold requirements (e.g., 75%).
- **Roadmap.sh Hybrid Engine**: Directly integrates local scalable JSON arrays to populate beautifully mapped visual "Programming Languages" and "Tech Roadmaps" leveraging official deep-linked paths.
- **Web Audio Engine**: Features completely procedural interface sounds generated natively from the Web Audio API for buttons and hovers, ensuring ultra-light bandwidth payload without compromising on the futuristic UX.

## 🤖 RIA - The AI Assistant (Powered by Gemini)

The entire platform is integrated with an onboard Google Gemini (`genai` SDK) intelligence suite relying on highly structured JSON schema instructions:

1. **Context-Aware Topic Explainer**: Accessible magically from any subject card via an "**Ask RIA ✨**" slide-over module. Explains concepts, outlines real-world analogies, and answers questions using exact context of the active subject pane without requiring students to type parameters.
2. **Smart Quiz Generator (`/quiz`)**: Forges dynamic 10-question MCQ tests targeted to any subject query and difficulty tier. Features interactive real-time grading, deep markdown explanations for right/wrong metrics, and persistent history logging inside `localStorage`.
3. **Custom Roadmap Engineer (`/roadmap-generator`)**: Input your dream career, current skill parameter, and available time limit. RIA synthesizes a beautifully mapped, vertically rendered week-by-week timeline of exactly what you must study.
4. **PYQ Analyzer (`/pyq-analyzer`)**: Pass in Past Year Questions to instantly dismantle complex queries into Core Concepts, Actionable Step-by-Step grading rubrics, and explicit outlines of Common Mistakes to Avoid.
5. **Notes Summarizer & Flashcards (`/notes-summarizer`)**: Automatically converts massive blocks of unformatted text or lecture transcripts into instantly actionable TL;DR study guides, Interactive Q&A Flashcards, and statistical Exam Topic Predictions.

## 🛠️ Tech Stack & Architecture

- **Frontend Configuration**: React 18, Vite buildpack
- **Routing Module**: `react-router-dom` Client-Side SPA Configuration
- **Motion & Structural Transitions**: `framer-motion` `<AnimatePresence>` Stateful Page Wrappers
- **AI Interoperability**: `@google/generative-ai` SDK
- **Analytics Processing**: Vercel `@vercel/analytics/react` instance
- **Iconography**: `lucide-react` & `react-icons/fa`
- **CSS Strategy**: Pure localized CSS relying on root variable interpolation for maximum performance efficiency. Minimum framework dependence.
