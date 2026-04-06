import { Link } from 'react-router-dom';
import { GraduationCap, BookOpen, Layers, Award } from 'lucide-react';
import { resources } from '../data/resources';
import './Resources.css';

const Resources = () => {
  return (
    <div className="resources-page container" style={{ padding: '4rem 2rem' }}>
      <h1 className="heading-two-tone" style={{ textAlign: 'center', margin: '0 0 3rem' }}>
        Select <span className="highlight">Year</span>
      </h1>
      
      <div className="grid-container year-grid-2x2">
        {Object.entries(resources).map(([yearKey, yearData], index) => {
          const borderColors = ['#14b8a6', '#3b82f6', '#a855f7', '#6366f1'];
          const borderColor = borderColors[index % borderColors.length];
          
          const getIcon = (idx) => {
            switch(idx % 4) {
              case 0: return <GraduationCap size={48} strokeWidth={1.5} />;
              case 1: return <BookOpen size={48} strokeWidth={1.5} />;
              case 2: return <Layers size={48} strokeWidth={1.5} />;
              case 3: return <Award size={48} strokeWidth={1.5} />;
              default: return <GraduationCap size={48} strokeWidth={1.5} />;
            }
          };

          return (
            <Link 
              to={`/resources/${yearKey}`} 
              key={yearKey} 
              className="card year-detail-card hover-lift"
              style={{ 
                borderLeft: `6px solid ${borderColor}`, 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center', 
                minHeight: '200px',
                gap: '1rem'
              }}
            >
              <div style={{ color: borderColor, opacity: 0.8 }}>
                {getIcon(index)}
              </div>
              <h2 style={{ margin: 0 }}>{yearData.label}</h2>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Resources;
