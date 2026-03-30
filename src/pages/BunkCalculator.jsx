import { useState, useEffect } from 'react';
import { Target, AlertCircle, CheckCircle2, Coffee } from 'lucide-react';
import './BunkCalculator.css';

const BunkCalculator = () => {
  const [attended, setAttended] = useState('');
  const [total, setTotal] = useState('');
  const [target, setTarget] = useState(75);
  
  const [result, setResult] = useState(null);

  useEffect(() => {
    calculateBunk();
  }, [attended, total, target]);

  const calculateBunk = () => {
    const a = parseInt(attended);
    const t = parseInt(total);
    const req = parseInt(target);

    if (isNaN(a) || isNaN(t) || isNaN(req) || t === 0 || a > t || req < 1 || req > 100 || a < 0) {
      setResult(null);
      return;
    }

    const currentPct = (a / t) * 100;
    
    if (currentPct < req) {
      if (req === 100) {
        setResult({
          status: 'danger',
          currentPct: currentPct.toFixed(2),
          message: 'Impossible to reach 100% attendance with past absences.',
          icon: <AlertCircle size={32} className="text-danger" />
        });
      } else {
        // Need to attend N more classes
        // (a + n) / (t + n) = req / 100 => 100a + 100n = req*t + req*n => n(100 - req) = req*t - 100a
        const n = Math.ceil((req * t - 100 * a) / (100 - req));
        setResult({
          status: 'danger',
          currentPct: currentPct.toFixed(2),
          message: `You need to attend ${n} more consecutive class${n > 1 ? 'es' : ''} to reach ${req}%.`,
          icon: <AlertCircle size={32} className="text-danger" />
        });
      }
    } else if (currentPct > req) {
      // Can bunk M classes
      // a / (t + m) = req / 100 => 100a = req*t + req*m => m = Math.floor((100a - req*t) / req)
      const m = Math.floor((100 * a - req * t) / req);
      if (m === 0) {
        setResult({
          status: 'warning',
          currentPct: currentPct.toFixed(2),
          message: `You are above your target but cannot afford to miss the next class.`,
          icon: <Target size={32} className="text-warning" />
        });
      } else {
        setResult({
          status: 'safe',
          currentPct: currentPct.toFixed(2),
          message: `You can safely bunk ${m} class${m > 1 ? 'es' : ''} and still maintain ${req}%.`,
          icon: <Coffee size={32} className="text-safe" />
        });
      }
    } else {
      setResult({
        status: 'warning',
        currentPct: currentPct.toFixed(2),
        message: `You are exactly at ${req}%. Don't bunk!`,
        icon: <Target size={32} className="text-warning" />
      });
    }
  };

  return (
    <div className="bunk-calculator-page container">
      <div className="page-header text-center" style={{marginBottom: '3rem'}}>
        <h1 className="heading-two-tone">Bunk <span className="highlight">Calculator</span></h1>
        <p>Calculate exactly how many classes you need to attend (or can afford to miss).</p>
      </div>

      <div className="bunk-calc-grid">
        <div className="card input-card">
          <h2>Attendance Details</h2>
          
          <div className="form-group">
            <label>Classes Attended</label>
            <input 
              type="number" 
              min="0"
              placeholder="e.g. 35"
              value={attended}
              onChange={(e) => setAttended(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Total Classes Held</label>
            <input 
              type="number" 
              min="1"
              placeholder="e.g. 50"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Target Attendance (%)</label>
            <div className="range-container">
              <input 
                type="range" 
                min="50" max="100" 
                value={target}
                onChange={(e) => setTarget(e.target.value)}
              />
              <span className="range-val">{target}%</span>
            </div>
          </div>
        </div>

        <div className="card result-card">
          <h2>Calculation Result</h2>
          {result ? (
            <div className={`result-box status-${result.status}`}>
              <div className="result-icon">{result.icon}</div>
              <div className="result-pct">{result.currentPct}% Current</div>
              <p className="result-msg">{result.message}</p>
              
              <div className="progress-container mt-4">
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ 
                      width: `${Math.min(result.currentPct, 100)}%`,
                      backgroundColor: result.status === 'safe' ? 'var(--primary-blue)' : result.status === 'danger' ? '#ef4444' : '#eab308'
                    }}
                  ></div>
                </div>
                <div className="progress-labels">
                  <span>0%</span>
                  <span>Target: {target}%</span>
                  <span>100%</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="empty-state">
              <CheckCircle2 size={48} className="empty-icon" />
              <p>Enter your classes attended and total classes to see if you can sleep in today.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BunkCalculator;
