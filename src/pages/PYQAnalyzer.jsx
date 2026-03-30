import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { analyzePYQ } from "../lib/gemini";
import "./AI_Tools.css";

const PYQAnalyzer = () => {
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState("");

  const handleAnalyze = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setAnalysis("");
    try {
      const result = await analyzePYQ(question);
      setAnalysis(result);
    } catch (error) {
      console.error("Analyze error:", error);
      setAnalysis("An error occurred while analyzing. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ai-tool-page container">
      <div className="tool-header">
        <h1 className="heading-two-tone">RIA <span className="highlight">PYQ Analyzer</span></h1>
        <p>Paste a Past Year Question to instantly get core concepts and a solution approach.</p>
      </div>

      <div className="tool-form card">
        <div className="form-group">
          <label htmlFor="question-input">Paste Question Here</label>
          <textarea 
            id="question-input"
            rows="5"
            placeholder="e.g. Explain the concept of Virtual Memory with a suitable diagram and discuss page replacement algorithms."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <button className="btn-primary" style={{marginTop: '1.5rem', width: '100%'}} onClick={handleAnalyze} disabled={!question.trim() || loading}>
          {loading ? "Analyzing..." : "Analyze PYQ ✨"}
        </button>
      </div>

      {loading && (
        <div className="tool-loading">
          <div className="spinner"></div>
          <p>RIA is dismantling the question structure...</p>
        </div>
      )}

      {analysis && !loading && (
        <div className="card markdown-result" style={{marginTop: '2rem'}}>
          <ReactMarkdown>{analysis}</ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default PYQAnalyzer;
