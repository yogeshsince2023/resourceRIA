import { Link } from 'react-router-dom';
import { resources } from '../data/resources';
import './Resources.css';

const Resources = () => {
  return (
    <div className="resources-page container" style={{ padding: '4rem 2rem' }}>
      <h1 className="heading-two-tone" style={{ textAlign: 'center', margin: '0 0 3rem' }}>
        Select <span className="highlight">Year</span>
      </h1>
      
      <div className="grid-container year-grid-2x2">
        {Object.entries(resources).map(([yearKey, yearData]) => (
          <Link to={`/resources/${yearKey}`} key={yearKey} className="card year-detail-card">
            <h2>{yearData.label}</h2>
            <p className="branch-count-badge">{Object.keys(yearData.branches).length} Branches</p>
            <ul className="branch-list">
              {Object.keys(yearData.branches).slice(0, 3).map((branch, idx) => (
                <li key={idx}>{branch}</li>
              ))}
              {Object.keys(yearData.branches).length > 3 && (
                <li>+ {Object.keys(yearData.branches).length - 3} more</li>
              )}
            </ul>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Resources;
