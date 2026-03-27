import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import './GPACalculator.css';

const GRADE_POINTS = {
  'O': 10,
  'A+': 9,
  'A': 8,
  'B+': 7,
  'B': 6,
  'C': 5,
  'P': 4,
  'F': 0
};

const GPACalculator = () => {
  const [subjects, setSubjects] = useState([
    { id: 1, name: '', credits: 3, grade: 'A' },
    { id: 2, name: '', credits: 3, grade: 'B+' },
    { id: 3, name: '', credits: 4, grade: 'A+' }
  ]);
  const [prevSgpaData, setPrevSgpaData] = useState([{ id: 1, sgpa: '', credits: '' }]);

  // SGPA Calculation
  const calculateSGPA = () => {
    let totalCredits = 0;
    let earnedPoints = 0;

    subjects.forEach(sub => {
      const credits = parseFloat(sub.credits) || 0;
      const points = GRADE_POINTS[sub.grade] || 0;
      totalCredits += credits;
      earnedPoints += (credits * points);
    });

    return totalCredits > 0 ? (earnedPoints / totalCredits).toFixed(2) : '0.00';
  };

  // CGPA Calculation
  const calculateCGPA = (currentSGPA) => {
    let totalCredits = 0;
    let totalPoints = 0;

    // Previous semesters
    prevSgpaData.forEach(sem => {
      const credits = parseFloat(sem.credits) || 0;
      const sgpa = parseFloat(sem.sgpa) || 0;
      if (credits > 0 && sgpa > 0) {
        totalCredits += credits;
        totalPoints += (credits * sgpa);
      }
    });

    // Current semester
    const currentCredits = subjects.reduce((acc, sub) => acc + (parseFloat(sub.credits) || 0), 0);
    const currSGPAVal = parseFloat(currentSGPA);
    
    if (currentCredits > 0 && currSGPAVal > 0) {
      totalCredits += currentCredits;
      totalPoints += (currentCredits * currSGPAVal);
    }

    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : currentSGPA;
  };

  const addSubject = () => {
    setSubjects([...subjects, { id: Date.now(), name: '', credits: 3, grade: 'A' }]);
  };

  const updateSubject = (id, field, value) => {
    setSubjects(subjects.map(sub => sub.id === id ? { ...sub, [field]: value } : sub));
  };

  const removeSubject = (id) => {
    if (subjects.length > 1) {
      setSubjects(subjects.filter(sub => sub.id !== id));
    }
  };

  const addPrevSem = () => {
    setPrevSgpaData([...prevSgpaData, { id: Date.now(), sgpa: '', credits: '' }]);
  };

  const removePrevSem = (id) => {
    setPrevSgpaData(prevSgpaData.filter(sem => sem.id !== id));
  };

  const updatePrevSem = (id, field, value) => {
    setPrevSgpaData(prevSgpaData.map(sem => sem.id === id ? { ...sem, [field]: value } : sem));
  };

  const sgpa = calculateSGPA();
  const cgpa = calculateCGPA(sgpa);

  return (
    <div className="gpa-page container" style={{ padding: '4rem 2rem' }}>
      <h1 className="heading-two-tone" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        GPA <span className="highlight">Calculator</span>
      </h1>

      <div className="grid-container gpa-grid">
        {/* Left Column - Current Semester SGPA */}
        <div className="card gpa-section">
          <h2>Current Semester (SGPA)</h2>
          <div className="subject-list">
            <div className="subject-header">
              <span>Subject (Optional)</span>
              <span>Credits</span>
              <span>Grade</span>
              <span></span>
            </div>
            {subjects.map(sub => (
              <div key={sub.id} className="subject-row">
                <input 
                  type="text" 
                  placeholder="Subject Name" 
                  value={sub.name}
                  onChange={(e) => updateSubject(sub.id, 'name', e.target.value)}
                  className="gpa-input"
                />
                <input 
                  type="number" 
                  min="1" max="6"
                  value={sub.credits}
                  onChange={(e) => updateSubject(sub.id, 'credits', e.target.value)}
                  className="gpa-input"
                />
                <select 
                  value={sub.grade}
                  onChange={(e) => updateSubject(sub.id, 'grade', e.target.value)}
                  className="gpa-select"
                >
                  {Object.keys(GRADE_POINTS).map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
                <button onClick={() => removeSubject(sub.id)} className="icon-btn danger" aria-label="Remove subject">
                  <Trash2 size={18} />
                </button>
              </div>
            ))}
          </div>
          <button onClick={addSubject} className="btn-secondary add-btn">
            <Plus size={18} /> Add Subject
          </button>
        </div>

        {/* Right Column - Previous Semesters & Results */}
        <div className="gpa-right-col">
          <div className="card result-card">
            <div className="result-item">
              <h3>SGPA</h3>
              <p className="highlight-text">{sgpa}</p>
            </div>
            <div className="result-item">
              <h3>CGPA</h3>
              <p className="highlight-text">{cgpa}</p>
            </div>
          </div>

          <div className="card gpa-section">
            <h2>Previous Semesters (For CGPA)</h2>
            <p className="section-desc">Add previous SGPA to calculate cumulative CGPA.</p>
            
            <div className="prev-sems">
              {prevSgpaData.map((sem, i) => (
                <div key={sem.id} className="prev-row">
                  <span className="sem-label">Sem {i + 1}</span>
                  <input 
                    type="number" 
                    placeholder="SGPA" 
                    step="0.01" min="0" max="10"
                    value={sem.sgpa}
                    onChange={(e) => updatePrevSem(sem.id, 'sgpa', e.target.value)}
                    className="gpa-input"
                  />
                  <input 
                    type="number" 
                    placeholder="Total Credits" 
                    value={sem.credits}
                    onChange={(e) => updatePrevSem(sem.id, 'credits', e.target.value)}
                    className="gpa-input"
                  />
                  <button onClick={() => removePrevSem(sem.id)} className="icon-btn danger" aria-label="Remove semester">
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
            <button onClick={addPrevSem} className="btn-secondary add-btn">
              <Plus size={18} /> Add Previous Semester
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GPACalculator;
