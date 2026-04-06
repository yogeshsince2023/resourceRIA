import { useState } from 'react';
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

  const [activeRIA, setActiveRIA] = useState(null);

  if (!yearData) {
    return <div className="container" style={{ padding: '4rem 2rem', textAlign: 'center' }}><h2>Year not found</h2></div>;
  }

  const branches = Object.keys(yearData.branches);
  const selectedBranch = searchParams.get('branch') && yearData.branches[searchParams.get('branch')]
    ? searchParams.get('branch')
    : branches[0];

  const branchData = yearData.branches[selectedBranch] || { semesters: {} };
  const availableSemesters = Object.keys(branchData.semesters || {});

  const selectedSem = searchParams.get('sem') && branchData.semesters?.[searchParams.get('sem')]
    ? searchParams.get('sem')
    : availableSemesters[0] || '';

  const subjects = branchData.semesters?.[selectedSem] || [];

  const getIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'notes': return <FileText size={20} />;
      case 'video':
      case 'youtube': return <PlayCircle size={20} />;
      case 'drive': return <HardDrive size={20} />;
      case 'pyq': return <FileText size={20} />;
      default: return <ExternalLink size={20} />;
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
          {/* Branch selection removed as per request */}

          {availableSemesters.length > 0 && (
            <div className="semester-tabs">
              {availableSemesters.map(semName => (
                <button 
                  key={semName}
                  className={`sem-tab ${selectedSem === semName ? 'active' : ''}`}
                  onClick={() => setSearchParams({ branch: selectedBranch, sem: semName }, { replace: true })}
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
            <div key={`${selectedBranch}-${selectedSem}-${idx}`} className="card subject-card" style={{animationDelay: `${idx * 0.1}s`}}>
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
