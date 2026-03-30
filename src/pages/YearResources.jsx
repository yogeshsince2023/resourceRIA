import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { ExternalLink, FileText, HardDrive, PlayCircle } from 'lucide-react';
import { resources } from '../data/resources';
import RIAModal from '../components/RIAModal';
import { AnimatePresence } from 'framer-motion';
import './YearResources.css';

const YearResources = () => {
  const { year } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const yearData = resources[year];

  const initialBranch = searchParams.get('branch') || (yearData ? Object.keys(yearData.branches)[0] : '');
  const [selectedBranch, setSelectedBranch] = useState(initialBranch);

  const branchData = yearData && yearData.branches[selectedBranch] 
                     ? yearData.branches[selectedBranch] 
                     : { semesters: {} };
  
  const availableSemesters = Object.keys(branchData.semesters || {});
  const initialSem = searchParams.get('sem') || (availableSemesters.length > 0 ? availableSemesters[0] : '');
  const [selectedSem, setSelectedSem] = useState(initialSem);

  const [activeRIA, setActiveRIA] = useState(null);

  useEffect(() => {
    const branch = searchParams.get('branch');
    const sem = searchParams.get('sem');
    if (branch && yearData && yearData.branches[branch] && branch !== selectedBranch) {
      setSelectedBranch(branch);
    }
    if (sem && yearData && yearData.branches[selectedBranch] && yearData.branches[selectedBranch].semesters[sem] && sem !== selectedSem) {
      setSelectedSem(sem);
    }
  }, [searchParams, selectedBranch, selectedSem, yearData]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (selectedBranch) params.set('branch', selectedBranch);
    if (selectedSem) params.set('sem', selectedSem);
    setSearchParams(params, { replace: true });
  }, [selectedBranch, selectedSem, setSearchParams]);

  if (!yearData) {
    return <div className="container" style={{ padding: '4rem 2rem', textAlign: 'center' }}><h2>Year not found</h2></div>;
  }

  const subjects = branchData.semesters?.[selectedSem] || [];

  const getIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'notes': return <FileText size={16} />;
      case 'video':
      case 'youtube': return <PlayCircle size={16} />;
      case 'drive': return <HardDrive size={16} />;
      case 'pyq': return <FileText size={16} />;
      default: return <ExternalLink size={16} />;
    }
  };

  const getBadgeClass = (type) => {
    const t = type.toLowerCase();
    if (t === 'pyq') return 'badge-pyq';
    if (t === 'notes') return 'badge-notes';
    if (t === 'video' || t === 'youtube') return 'badge-video';
    return 'badge-other';
  };

  return (
    <div className="year-resources-page container" style={{ padding: '4rem 2rem' }}>
      <div className="page-header">
        <h1 className="heading-two-tone">Resources <span className="highlight">{yearData.label}</span></h1>
        
        <div className="filter-controls">
          <select 
            className="branch-select"
            value={selectedBranch}
            onChange={(e) => {
              setSelectedBranch(e.target.value);
              const newBranchObj = yearData.branches[e.target.value];
              if (newBranchObj && newBranchObj.semesters) {
                const sems = Object.keys(newBranchObj.semesters);
                if (sems.length > 0) setSelectedSem(sems[0]);
              } else {
                setSelectedSem('');
              }
            }}
          >
            {Object.keys(yearData.branches).map(branchName => (
              <option key={branchName} value={branchName}>{branchName}</option>
            ))}
          </select>

          {availableSemesters.length > 0 && (
            <div className="semester-tabs">
              {availableSemesters.map(semName => (
                <button 
                  key={semName}
                  className={`sem-tab ${selectedSem === semName ? 'active' : ''}`}
                  onClick={() => setSelectedSem(semName)}
                >
                  {semName}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="subjects-grid">
        {subjects.length > 0 ? (
          subjects.map((subject, idx) => (
            <div key={idx} className="card subject-card" style={{animationDelay: `${idx * 0.1}s`}}>
              <h3>{subject.name}</h3>
              <div className="resource-links">
                {subject.links.map((link, linkIdx) => (
                  <a key={linkIdx} href={link.url} target="_blank" rel="noopener noreferrer" className={`resource-btn ${getBadgeClass(link.type)}`}>
                    {getIcon(link.type)} {link.type.toUpperCase()}
                  </a>
                ))}
              </div>
              
              <div style={{ marginTop: 'auto', paddingTop: '1rem', display: 'flex' }}>
                <button 
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setActiveRIA(subject); }}
                  className="btn-primary" 
                  style={{ background: 'transparent', border: '1px solid var(--primary-blue)', color: 'var(--primary-blue)', width: '100%', padding: '0.6rem', transition: 'all 0.3s' }}
                >
                  Ask RIA ✨
                </button>
              </div>
            </div>
          ))
        ) : (
          <p style={{textAlign: 'center', gridColumn: '1 / -1', color: 'var(--text-muted)', fontStyle: 'italic', padding: '2rem'}}>
            No subjects found for this semester yet.
          </p>
        )}
      </div>

      <AnimatePresence>
        {activeRIA && (
          <RIAModal subject={activeRIA} onClose={() => setActiveRIA(null)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default YearResources;
