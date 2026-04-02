import { useState } from 'react';
import { evaluate, format, complex, sqrt } from 'mathjs';
import { 
  Calculator, Activity, FunctionSquare, LayoutGrid,
  ArrowRightLeft, ListRestart, Binary
} from 'lucide-react';
import './ScientificCalculator.css';

const ScientificMode = ({ history, setHistory }) => {
  const [display, setDisplay] = useState('');
  const [equation, setEquation] = useState('');
  const [angleMode, setAngleMode] = useState('deg');
  const [memory, setMemory] = useState(0);
  const [isShift, setIsShift] = useState(false);

  const appendToDisplay = (value) => setDisplay((prev) => prev + value);
  const handleClear = () => { setDisplay(''); setEquation(''); };
  const handleDelete = () => setDisplay((prev) => prev.slice(0, -1));

  const preprocessExpression = (expr) => {
    let p = expr;
    p = p.replace(/π/g, 'pi');
    p = p.replace(/√\(/g, 'sqrt(');
    p = p.replace(/∛\(/g, 'cbrt(');
    p = p.replace(/ln\(/g, 'log(');
    p = p.replace(/log\(/g, 'log10(');
    return p;
  };

  const calculate = () => {
    if (!display) return;
    try {
      const expr = preprocessExpression(display);
      // For DEG mode: mathjs natively understands 'sin(30 deg)' via unit math.
      // We also support 'sin(30)' by wrapping lone numerics in trig calls with deg.
      // Strategy: if angleMode is deg, we post-process trig calls that don't already have
      // 'deg' or 'rad' to inject degrees automatically.
      let finalExpr = expr;
      if (angleMode === 'deg') {
        // Match trig functions with a simple numeric or expression inside parens
        // pattern: sin/cos/tan/asin/acos/atan( <arg> ) where arg has no 'deg' or 'rad'
        finalExpr = finalExpr.replace(
          /((?:a?sin|a?cos|a?tan))\(([^)]+)\)/g,
          (match, fn, arg) => {
            if (arg.includes('deg') || arg.includes('rad')) return match;
            return `${fn}(${arg} deg)`;
          }
        );
      }
      let result = evaluate(finalExpr);
      const finalResult = format(result, { precision: 14 });
      setEquation(display + ' =');
      setDisplay(String(finalResult));
      setHistory((prev) => [...prev, { eq: display, res: finalResult }]);
    } catch (error) {
       // Check if its a complex result mathematically invalid without complex mode
      setDisplay('Error');
    }
  };

  return (
    <div className="sci-mode-wrapper">
      <div className="calculator-screen anim-fade-in">
        <div className="equation">{equation}</div>
        <div className="display">{display || '0'}</div>
      </div>
      
      <div className="sci-top-bar">
        <div className="angle-toggle">
          <button className={`toggle-btn ${angleMode === 'deg' ? 'active' : ''}`} onClick={() => setAngleMode('deg')}>DEG</button>
          <button className={`toggle-btn ${angleMode === 'rad' ? 'active' : ''}`} onClick={() => setAngleMode('rad')}>RAD</button>
        </div>
        <div className="memory-funcs">
          <button onClick={() => setMemory(0)}>MC</button>
          <button onClick={() => setDisplay((prev) => prev + memory)}>MR</button>
          <button onClick={() => setMemory(Number(display) || memory)}>M+</button>
          <button className={`toggle-btn ${isShift ? 'active highlight' : ''}`} onClick={() => setIsShift(!isShift)}>SHIFT</button>
        </div>
      </div>

      <div className="calculator-keypad advanced-grid">
        <button className="btn-sci text-sm" onClick={() => appendToDisplay('abs(')}>|x|</button>
        <button className="btn-sci text-sm" onClick={() => appendToDisplay('ceil(')}>ceil</button>
        <button className="btn-sci text-sm" onClick={() => appendToDisplay('floor(')}>floor</button>
        <button className="btn-sci text-sm" onClick={() => appendToDisplay('combinations(')}>nCr</button>
        <button className="btn-sci text-sm" onClick={() => appendToDisplay('permutations(')}>nPr</button>

        <button className="btn-sci" onClick={() => appendToDisplay(isShift ? 'asin(' : 'sin(')}>{isShift ? 'sin⁻¹' : 'sin'}</button>
        <button className="btn-sci" onClick={() => appendToDisplay(isShift ? 'acos(' : 'cos(')}>{isShift ? 'cos⁻¹' : 'cos'}</button>
        <button className="btn-sci" onClick={() => appendToDisplay(isShift ? 'atan(' : 'tan(')}>{isShift ? 'tan⁻¹' : 'tan'}</button>
        <button className="btn-sci" onClick={() => appendToDisplay('^')}>xʸ</button>
        <button className="btn-sci" onClick={() => appendToDisplay('!')}>x!</button>

        <button className="btn-sci" onClick={() => appendToDisplay('ln(')}>ln</button>
        <button className="btn-sci" onClick={() => appendToDisplay('log(')}>log</button>
        <button className="btn-sci" onClick={() => appendToDisplay(isShift ? '∛(' : '√(')}>{isShift ? '∛' : '√'}</button>
        <button className="btn-sci" onClick={() => appendToDisplay('e')}>e</button>
        <button className="btn-sci" onClick={() => appendToDisplay('π')}>π</button>
        
        <button className="btn-sci" onClick={() => appendToDisplay('(')}>(</button>
        <button className="btn-sci" onClick={() => appendToDisplay(')')}>)</button>
        <button className="btn-action" onClick={handleDelete}>DEL</button>
        <button className="btn-action" onClick={handleClear}>C</button>
        <button className="btn-op" onClick={() => appendToDisplay('%')}>mod</button>

        <button className="btn-num" onClick={() => appendToDisplay('7')}>7</button>
        <button className="btn-num" onClick={() => appendToDisplay('8')}>8</button>
        <button className="btn-num" onClick={() => appendToDisplay('9')}>9</button>
        <button className="btn-op" onClick={() => appendToDisplay('/')}>÷</button>
        <button className="btn-op" onClick={() => appendToDisplay('*')}>×</button>

        <button className="btn-num" onClick={() => appendToDisplay('4')}>4</button>
        <button className="btn-num" onClick={() => appendToDisplay('5')}>5</button>
        <button className="btn-num" onClick={() => appendToDisplay('6')}>6</button>
        <button className="btn-op" onClick={() => appendToDisplay('-')}>-</button>
        <button className="btn-op" onClick={() => appendToDisplay('+')}>+</button>

        <button className="btn-num" onClick={() => appendToDisplay('1')}>1</button>
        <button className="btn-num" onClick={() => appendToDisplay('2')}>2</button>
        <button className="btn-num" onClick={() => appendToDisplay('3')}>3</button>
        <button className="btn-num" onClick={() => appendToDisplay('0')}>0</button>
        <button className="btn-num" onClick={() => appendToDisplay('.')}>.</button>
        
        <button className="btn-sci" onClick={() => appendToDisplay(' deg')}>deg</button>
        <button className="btn-sci" onClick={() => appendToDisplay(',')}>','</button>
        <button className="btn-sci" onClick={() => appendToDisplay(' i')}>i</button>
        <button className="btn-equal" style={{ gridColumn: 'span 2' }} onClick={calculate}>=</button>
      </div>
    </div>
  );
};

const MatrixMode = ({ setHistory }) => {
  const [matA, setMatA] = useState('[[1, 2], [3, 4]]');
  const [matB, setMatB] = useState('[[2, 0], [1, 2]]');
  const [result, setResult] = useState('');

  const performOp = (op) => {
    try {
      const res = evaluate(`format(${op}, {precision: 14})`);
      setResult(String(res));
      setHistory((prev) => [...prev, { eq: op, res: String(res) }]);
    } catch(e) {
      setResult('Error parsing matrices');
    }
  };

  return (
    <div className="matrix-mode anim-fade-in">
      <div className="input-group">
        <label>Matrix A (JSON Format)</label>
        <input className="data-input" value={matA} onChange={(e) => setMatA(e.target.value)} />
      </div>
      <div className="input-group">
        <label>Matrix B (JSON Format)</label>
        <input className="data-input" value={matB} onChange={(e) => setMatB(e.target.value)} />
      </div>
      <div className="matrix-ops">
        <button className="btn-num" onClick={() => performOp(`${matA} + ${matB}`)}>A + B</button>
        <button className="btn-num" onClick={() => performOp(`${matA} - ${matB}`)}>A - B</button>
        <button className="btn-num" onClick={() => performOp(`${matA} * ${matB}`)}>A × B</button>
        <button className="btn-sci" onClick={() => performOp(`det(${matA})`)}>det(A)</button>
        <button className="btn-sci" onClick={() => performOp(`inv(${matA})`)}>inv(A)</button>
      </div>
      <div className="result-display">
        <h4>Result Matrix</h4>
        <div className="res-box">{result || '...'}</div>
      </div>
    </div>
  );
};

const EquationMode = ({ setHistory }) => {
  const [eqType, setEqType] = useState('linear');
  // Linear: ax + b = c
  const [lin, setLin] = useState({a: '', b: '', c: ''});
  // Quad: ax^2 + bx + c = 0
  const [quad, setQuad] = useState({a: '', b: '', c: ''});
  const [res, setRes] = useState('');

  const solveLine = () => {
    try {
      let a = evaluate(lin.a || '0');
      let b = evaluate(lin.b || '0');
      let c = evaluate(lin.c || '0');
      if (a === 0) setRes('Not linear (a=0)');
      else {
        let x = (c - b) / a;
        setRes(`x = ${format(x, {precision: 10})}`);
      }
    } catch(e) { setRes('Error parsing values'); }
  };

  const solveQuad = () => {
    try {
      let a = evaluate(quad.a || '0');
      let b = evaluate(quad.b || '0');
      let c = evaluate(quad.c || '0');
      if (a === 0) setRes('Not quadratic (a=0)');
      else {
        let d = b*b - 4*a*c;
        let rootD = sqrt(complex(d));
        let x1 = evaluate(`(-${b} + ${rootD}) / (2*${a})`);
        let x2 = evaluate(`(-${b} - ${rootD}) / (2*${a})`);
        setRes(`x₁ = ${format(x1, 10)}\nx₂ = ${format(x2, 10)}`);
      }
    } catch(e) { setRes('Error parsing values'); }
  };

  return (
    <div className="equation-mode anim-fade-in">
      <div className="angle-toggle eq-tabs">
        <button className={`toggle-btn ${eqType === 'linear' ? 'active' : ''}`} onClick={() => setEqType('linear')}>Linear</button>
        <button className={`toggle-btn ${eqType === 'quad' ? 'active' : ''}`} onClick={() => setEqType('quad')}>Quadratic</button>
      </div>
      
      {eqType === 'linear' && (
        <div className="eq-inputs">
          <p>ax + b = c</p>
          <div className="flex-row">
            <input placeholder="a" value={lin.a} onChange={e => setLin({...lin, a: e.target.value})} className="data-input short"/> <span>x + </span>
            <input placeholder="b" value={lin.b} onChange={e => setLin({...lin, b: e.target.value})} className="data-input short"/> <span>=</span>
            <input placeholder="c" value={lin.c} onChange={e => setLin({...lin, c: e.target.value})} className="data-input short"/>
          </div>
          <button className="btn-equal full" onClick={solveLine}>Solve for x</button>
        </div>
      )}

      {eqType === 'quad' && (
        <div className="eq-inputs">
          <p>ax² + bx + c = 0</p>
          <div className="flex-row">
            <input placeholder="a" value={quad.a} onChange={e => setQuad({...quad, a: e.target.value})} className="data-input short"/> <span>x² + </span>
            <input placeholder="b" value={quad.b} onChange={e => setQuad({...quad, b: e.target.value})} className="data-input short"/> <span>x + </span>
            <input placeholder="c" value={quad.c} onChange={e => setQuad({...quad, c: e.target.value})} className="data-input short"/> <span>= 0</span>
          </div>
          <button className="btn-equal full" onClick={solveQuad}>Find Roots</button>
        </div>
      )}

      <div className="result-display">
        <div className="res-box">{res || 'Waiting for input...'}</div>
      </div>
    </div>
  );
}

const StatisticsMode = ({ setHistory }) => {
  const [dataset, setDataset] = useState('1, 2, 3, 4, 5, 6, 7, 8, 9');
  const [stats, setStats] = useState(null);

  const calcStats = () => {
    try {
      let arr = evaluate(`[${dataset}]`);
      let result = evaluate(`{
        mean: mean([${dataset}]),
        median: median([${dataset}]),
        mode: mode([${dataset}]),
        std: std([${dataset}], 'uncorrected')
      }`);
      setStats(result);
      setHistory(prev => [...prev, {eq: `stats(${arr.length} items)`, res: `μ=${format(result.mean, 4)}`}]);
    } catch(e) {
      setStats({error: "Invalid Number List"});
    }
  };

  return (
    <div className="stat-mode anim-fade-in">
      <div className="input-group">
        <label>Dataset (comma separated)</label>
        <textarea className="data-input tall" value={dataset} onChange={e => setDataset(e.target.value)} />
      </div>
      <button className="btn-equal full" onClick={calcStats}>Calculate Statistics</button>
      
      {stats && (
        <div className="stat-results">
          {stats.error ? <p className="error">{stats.error}</p> : (
            <div className="stat-grid">
               <div className="stat-card"><span>Mean (μ)</span> <b>{format(stats.mean, 6)}</b></div>
               <div className="stat-card"><span>Median</span> <b>{format(stats.median, 6)}</b></div>
               <div className="stat-card"><span>Mode</span> <b>{Array.isArray(stats.mode) ? stats.mode.join(', ') : stats.mode}</b></div>
               <div className="stat-card"><span>Std Dev (σ)</span> <b>{format(stats.std, 6)}</b></div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const UNIT_CATEGORIES = {
  Length: [
    { label: 'Meter (m)', val: 'm' },
    { label: 'Kilometer (km)', val: 'km' },
    { label: 'Centimeter (cm)', val: 'cm' },
    { label: 'Millimeter (mm)', val: 'mm' },
    { label: 'Inch (in)', val: 'inch' },
    { label: 'Foot (ft)', val: 'ft' },
    { label: 'Yard (yd)', val: 'yd' },
    { label: 'Mile (mi)', val: 'mi' },
  ],
  Mass: [
    { label: 'Kilogram (kg)', val: 'kg' },
    { label: 'Gram (g)', val: 'g' },
    { label: 'Milligram (mg)', val: 'mg' },
    { label: 'Pound (lb)', val: 'lb' },
    { label: 'Ounce (oz)', val: 'oz' },
    { label: 'Tonne (t)', val: 'ton' },
  ],
  Temperature: [
    { label: 'Celsius (°C)', val: 'degC' },
    { label: 'Fahrenheit (°F)', val: 'degF' },
    { label: 'Kelvin (K)', val: 'K' },
  ],
  Speed: [
    { label: 'km/h', val: 'km/h' },
    { label: 'm/s', val: 'm/s' },
    { label: 'mph', val: 'mi/h' },
    { label: 'knot', val: 'knot' },
  ],
  Area: [
    { label: 'Square meter (m²)', val: 'm^2' },
    { label: 'Square km (km²)', val: 'km^2' },
    { label: 'Square foot (ft²)', val: 'ft^2' },
    { label: 'Acre', val: 'acre' },
    { label: 'Hectare (ha)', val: 'hectare' },
  ],
};

const ALL_UNITS = Object.values(UNIT_CATEGORIES).flat();

const UnitMode = ({ setHistory }) => {
  const [val, setVal] = useState('100');
  const [from, setFrom] = useState('cm');
  const [to, setTo] = useState('inch');
  const [res, setRes] = useState('');
  const [error, setError] = useState('');

  const calcUnit = () => {
    setError('');
    try {
      let result = evaluate(`${val} ${from} to ${to}`);
      const formatted = format(result, { precision: 8 });
      setRes(formatted);
      setHistory(prev => [...prev, { eq: `${val} ${from} → ${to}`, res: formatted }]);
    } catch(e) {
      setError(`Cannot convert ${from} → ${to}. Units may be incompatible.`);
      setRes('');
    }
  };

  return (
    <div className="unit-mode anim-fade-in">
      <div className="unit-grid">
        <div className="input-group">
          <label>Value</label>
          <input className="data-input" value={val} onChange={e => setVal(e.target.value)} type="number" />
        </div>
        <div className="input-group">
          <label>From</label>
          <select className="data-input" value={from} onChange={e => setFrom(e.target.value)}>
            {Object.entries(UNIT_CATEGORIES).map(([cat, units]) => (
              <optgroup key={cat} label={cat}>
                {units.map(u => <option key={u.val} value={u.val}>{u.label}</option>)}
              </optgroup>
            ))}
          </select>
        </div>
        <div className="unit-arrow">⇄</div>
        <div className="input-group">
          <label>To</label>
          <select className="data-input" value={to} onChange={e => setTo(e.target.value)}>
            {Object.entries(UNIT_CATEGORIES).map(([cat, units]) => (
              <optgroup key={cat} label={cat}>
                {units.map(u => <option key={u.val} value={u.val}>{u.label}</option>)}
              </optgroup>
            ))}
          </select>
        </div>
      </div>
      <button className="btn-equal full mt" onClick={calcUnit}>Convert</button>
      {error && <p className="unit-error">{error}</p>}
      {res && (
        <div className="result-display mt">
          <div className="unit-result-label">{val} {from} =</div>
          <div className="res-box">{res} {to}</div>
        </div>
      )}
    </div>
  );
};


const ScientificCalculator = () => {
  const [activeMode, setActiveMode] = useState('scientific');
  const [history, setHistory] = useState([]);
  
  return (
    <div className="calculator-page advanced-layout">
      <div className="calc-master-container">
        
        {/* Sidebar History */}
        <div className="calc-history-sidebar">
           <h3 className="history-title"><ListRestart size={18} /> Computation History</h3>
           <div className="history-list">
             {history.length === 0 && <p className="empty-history">No computations yet.</p>}
             {[...history].reverse().map((h, i) => (
               <div key={i} className="history-item">
                 <div className="hist-eq">{h.eq}</div>
                 <div className="hist-res">= {h.res}</div>
               </div>
             ))}
           </div>
           {history.length > 0 && (
             <button className="clear-hist-btn" onClick={() => setHistory([])}>Clear History</button>
           )}
        </div>

        {/* Main Interface */}
        <div className="calculator-container advanced">
          <div className="calculator-header compressed">
            <h1 className="heading-two-tone">Pro <span className="highlight">Compute</span> Engine</h1>
          </div>

          <div className="calc-tabs">
            <button className={`tab-btn ${activeMode === 'scientific' ? 'active' : ''}`} onClick={() => setActiveMode('scientific')}><Calculator size={18}/> Scientific</button>
            <button className={`tab-btn ${activeMode === 'matrix' ? 'active' : ''}`} onClick={() => setActiveMode('matrix')}><LayoutGrid size={18}/> Matrix</button>
            <button className={`tab-btn ${activeMode === 'equation' ? 'active' : ''}`} onClick={() => setActiveMode('equation')}><FunctionSquare size={18}/> Equations</button>
            <button className={`tab-btn ${activeMode === 'statistics' ? 'active' : ''}`} onClick={() => setActiveMode('statistics')}><Activity size={18}/> Stats</button>
            <button className={`tab-btn ${activeMode === 'unit' ? 'active' : ''}`} onClick={() => setActiveMode('unit')}><ArrowRightLeft size={18}/> Units</button>
          </div>

          <div className="calc-mode-content">
            {activeMode === 'scientific' && <ScientificMode history={history} setHistory={setHistory} />}
            {activeMode === 'matrix' && <MatrixMode setHistory={setHistory} />}
            {activeMode === 'equation' && <EquationMode setHistory={setHistory} />}
            {activeMode === 'statistics' && <StatisticsMode setHistory={setHistory} />}
            {activeMode === 'unit' && <UnitMode setHistory={setHistory} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScientificCalculator;
