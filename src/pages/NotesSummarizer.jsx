import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { summarizeNotes } from "../lib/gemini";
import "./AI_Tools.css";

const NotesSummarizer = () => {
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState("");

  const handleSummarize = async () => {
    if (!notes.trim()) return;
    setLoading(true);
    setSummary("");
    const result = await summarizeNotes(notes);
    setSummary(result);
    setLoading(false);
  };

  return (
    <div className="ai-tool-page container">
      <div className="tool-header">
        <h1 className="heading-two-tone">RIA <span className="highlight">Notes Summarizer</span></h1>
        <p>Paste your wall of text and get TL;DRs, flashcards, and exam predictions.</p>
      </div>

      <div className="tool-form card">
        <div className="form-group">
          <label>Paste Study Notes or Transcripts</label>
          <textarea 
            rows="8"
            placeholder="Paste your unformatted notes, lecture transcripts, or textbook paragraphs here..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>
        <button className="btn-primary" style={{marginTop: '1.5rem', width: '100%'}} onClick={handleSummarize} disabled={!notes.trim() || loading}>
          {loading ? "Summarizing..." : "Generate Magic ✨"}
        </button>
      </div>

      {loading && (
        <div className="tool-loading">
          <div className="spinner"></div>
          <p>RIA is forging flashcards and summaries...</p>
        </div>
      )}

      {summary && !loading && (
        <div className="card markdown-result" style={{marginTop: '2rem'}}>
          <ReactMarkdown>{summary}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default NotesSummarizer;
