import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { ExternalLink, FileText, HardDrive } from 'lucide-react';
import { FaYoutube } from 'react-icons/fa';
import { resources } from '../data/resources';
import './YearResources.css';

const YearResources = () => {
  const { year } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const yearData = resources[year];

  const initialBranch = searchParams.get('branch') || (yearData ? Object.keys(yearData.branches)[0] : '');
  const [selectedBranch, setSelectedBranch] = useState(initialBranch);

  useEffect(() => {
    if (selectedBranch && searchParams.get('branch') !== selectedBranch) {
      setSearchParams({ branch: selectedBranch }, { replace: true });
    }
  }, [selectedBranch, searchParams, setSearchParams]);

  if (!yearData) {
    return <div className="container" style={{ padding: '4rem 2rem', textAlign: 'center' }}><h2>Year not found</h2></div>;
  }

  const branchData = yearData.branches[selectedBranch] || { subjects: [] };

  const getIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'pdf': return <FileText size={16} />;
      case 'youtube': return <FaYoutube size={16} />;
      case 'drive': return <HardDrive size={16} />;
      default: return <ExternalLink size={16} />;
    }
  };

  return (
    <div className="year-resources-page container" style={{ padding: '4rem 2rem' }}>
      <div className="page-header">
        <h1 className="heading-two-tone">Resources <span className="highlight">{yearData.label}</span></h1>
        
        <select 
          className="branch-select"
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
        >
          {Object.keys(yearData.branches).map(branchName => (
            <option key={branchName} value={branchName}>{branchName}</option>
          ))}
        </select>
      </div>

      <div className="subjects-grid">
        {branchData.subjects.length > 0 ? (
          branchData.subjects.map((subject, idx) => (
            <div key={idx} className="card subject-card">
              <h3>{subject.name}</h3>
              <div className="resource-links">
                {subject.links.map((link, linkIdx) => (
                  <a key={linkIdx} href={link.url} target="_blank" rel="noopener noreferrer" className={`resource-btn ${link.type.toLowerCase()}`}>
                    {getIcon(link.type)} {link.type}
                  </a>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p>No subjects found for this branch yet.</p>
        )}
      </div>
    </div>
  );
};

export default YearResources;
