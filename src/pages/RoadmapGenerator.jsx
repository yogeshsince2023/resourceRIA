import { useState } from "react";
import { generateCustomRoadmap } from "../lib/gemini";
import "./AI_Tools.css";

const RoadmapGenerator = () => {
  const [goal, setGoal] = useState("");
  const [skillLevel, setSkillLevel] = useState("Beginner");
  const [timeWeeks, setTimeWeeks] = useState(4);
  const [learningStyle, setLearningStyle] = useState("Videos & Projects");
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState(null);

  const handleGenerate = async () => {
    if (!goal.trim()) return;
    setLoading(true);
    setRoadmap(null);
    const data = await generateCustomRoadmap(goal, skillLevel, timeWeeks, learningStyle);
    if (data) setRoadmap(data);
    else alert("Failed to generate roadmap. Please try again.");
    setLoading(false);
  };

  return (
    <div className="ai-tool-page container">
      <div className="tool-header">
        <h1 className="heading-two-tone">RIA <span className="highlight">Custom Roadmap</span></h1>
        <p>Get a personalized week-by-week learning plan synthesized via AI.</p>
      </div>

      {!roadmap && !loading && (
        <div className="tool-form card">
          <div className="form-group">
            <label>What is your goal?</label>
            <input 
              type="text" 
              placeholder="e.g. Become a Full Stack Developer, Learn Machine Learning..."
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>
          <div className="form-grid">
            <div className="form-group">
              <label>Current Skill Level</label>
              <select value={skillLevel} onChange={(e) => setSkillLevel(e.target.value)}>
                <option value="Complete Beginner">Complete Beginner</option>
                <option value="Some Knowledge">Some Knowledge</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>
            <div className="form-group">
              <label>Time Available (Weeks)</label>
              <input 
                type="number" min="1" max="52" 
                value={timeWeeks} 
                onChange={(e) => setTimeWeeks(e.target.value)} 
              />
            </div>
            <div className="form-group">
              <label>Learning Style</label>
              <select value={learningStyle} onChange={(e) => setLearningStyle(e.target.value)}>
                <option value="Videos & Projects">Videos & Projects</option>
                <option value="Reading & Theory">Reading & Theory</option>
                <option value="Interactive Coding">Interactive Coding</option>
              </select>
            </div>
          </div>
          <button className="btn-primary" style={{marginTop: '1.5rem', width: '100%'}} onClick={handleGenerate} disabled={!goal.trim()}>
            Generate Roadmap ✨
          </button>
        </div>
      )}

      {loading && (
        <div className="tool-loading">
          <div className="spinner"></div>
          <p>RIA is analyzing learning paths for {goal}...</p>
        </div>
      )}

      {roadmap && !loading && (
        <div className="roadmap-result">
          <div className="card text-center" style={{marginBottom: '3rem'}}>
            <h2 style={{color: 'var(--primary-blue)', marginTop: 0}}>{roadmap.title}</h2>
            <p>{roadmap.summary}</p>
            <button className="btn-secondary" style={{marginTop: '1rem'}} onClick={() => setRoadmap(null)}>Generate Another</button>
          </div>
          
          <div className="timeline">
            {roadmap.weeks.map((w, idx) => (
              <div key={idx} className="timeline-item card">
                <div className="timeline-week-badge">Week {w.week}</div>
                <h3 style={{margin: '0 0 1rem 0'}}>{w.focus}</h3>
                <ul style={{ margin: 0, paddingLeft: '1.2rem', color: 'var(--text-muted)'}}>
                  {w.tasks.map((task, i) => (
                    <li key={i} style={{marginBottom: '0.4rem'}}>{task}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoadmapGenerator;
