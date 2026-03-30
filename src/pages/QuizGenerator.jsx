import { useState, useEffect } from "react";
import { generateQuiz } from "../lib/gemini";
import "./QuizGenerator.css";

const QuizGenerator = () => {
  const [subject, setSubject] = useState("");
  const [difficulty, setDifficulty] = useState("Intermediate");
  const [loading, setLoading] = useState(false);
  const [quizData, setQuizData] = useState(null);
  
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem("ria_quiz_history");
    if (saved) {
      try {
        setHistory(JSON.parse(saved));
      } catch (error) {
        console.error("Failed to parse quiz history:", error);
        // Leave history empty
      }
    }
  }, []);

  const handleGenerate = async () => {
    if (!subject.trim()) return;
    setLoading(true);
    setQuizData(null);
    setCurrentIdx(0);
    setScore(0);
    setShowResults(false);
    
    try {
      const data = await generateQuiz(subject, difficulty);
      if (data && Array.isArray(data)) {
        setQuizData(data);
      } else {
        alert("Failed to generate quiz. Please try again.");
      }
    } catch (error) {
      console.error("Generate quiz error:", error);
      alert("An error occurred while generating the quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (option) => {
    if (isAnswered) return;
    setSelectedOption(option);
    setIsAnswered(true);

    const isCorrect = option === quizData[currentIdx].correctAnswer;
    if (isCorrect) setScore((prev) => prev + 1);
  };

  const nextQuestion = () => {
    if (currentIdx + 1 < quizData.length) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      finishQuiz(score);
    }
  };

  const finishQuiz = (finalScore) => {
    setShowResults(true);
    const newRecord = {
      subject,
      difficulty,
      score: finalScore,
      total: quizData.length,
      date: new Date().toLocaleDateString()
    };
    const updatedHistory = [newRecord, ...history].slice(0, 50);
    setHistory(updatedHistory);
    localStorage.setItem("ria_quiz_history", JSON.stringify(updatedHistory));
  };

  return (
    <div className="quiz-page container">
      <div className="quiz-header">
        <h1 className="heading-two-tone">RIA <span className="highlight">Smart Quiz</span></h1>
        <p>Generate targeted MCQs instantly using Gemini AI.</p>
      </div>

      {!quizData && !loading && (
        <div className="quiz-form card">
          <div className="form-group">
            <label>Subject or Topic</label>
            <input 
              type="text" 
              placeholder="e.g. Operating Systems, Data Structures, Machine Learning"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Difficulty</label>
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <button className="btn-primary" onClick={handleGenerate} disabled={!subject.trim()}>
            Generate Quiz ✨
          </button>
        </div>
      )}

      {loading && (
        <div className="quiz-loading">
          <div className="spinner"></div>
          <p>RIA is forging your quiz...</p>
        </div>
      )}

      {quizData && !showResults && !loading && (
        <div className="quiz-active card">
          <div className="quiz-progress">
            <span>Question {currentIdx + 1} of {quizData.length}</span>
            <span>Score: {score}</span>
          </div>
          <h2 className="quiz-question">{quizData[currentIdx].question}</h2>
          
          <div className="quiz-options">
            {quizData[currentIdx].options.map((opt, i) => {
              const q = quizData[currentIdx];
              let btnClass = "quiz-option";
              if (isAnswered) {
                if (opt === q.correctAnswer) btnClass += " correct";
                else if (opt === selectedOption) btnClass += " incorrect";
              }
              return (
                <button 
                  key={i} 
                  className={btnClass} 
                  onClick={() => handleAnswer(opt)}
                  disabled={isAnswered}
                >
                  {opt}
                </button>
              );
            })}
          </div>

          {isAnswered && (
             <div className="quiz-explanation">
              <h4>Explanation:</h4>
              <p>{quizData[currentIdx].explanation}</p>
              <button className="btn-primary next-btn" onClick={nextQuestion}>
                {currentIdx + 1 < quizData.length ? "Next Question" : "See Results"}
              </button>
            </div>
          )}
        </div>
      )}

      {showResults && (
        <div className="quiz-results card">
          <h2>Quiz Complete! 🎉</h2>
          <div className="score-display">
            <span className="score-number">{score}</span>
            <span className="score-total">/ {quizData.length}</span>
          </div>
          <p>You completed a {difficulty} level quiz on {subject}.</p>
          <button className="btn-primary" onClick={() => setQuizData(null)}>
            Generate New Quiz
          </button>
        </div>
      )}

      {history.length > 0 && !quizData && !loading && (
        <div className="quiz-history card" style={{ marginTop: '2rem' }}>
          <h3>Recent Quizzes</h3>
          <ul className="history-list">
            {history.map((record, idx) => (
              <li key={idx} className="history-item">
                <div className="hist-main">
                  <strong>{record.subject}</strong> <span className="badge">{record.difficulty}</span>
                </div>
                <div className="hist-score">
                  {record.score}/{record.total} <small>({record.date})</small>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QuizGenerator;
