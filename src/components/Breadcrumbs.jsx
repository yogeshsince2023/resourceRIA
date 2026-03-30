import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';
import './Breadcrumbs.css';

const routeLabels = {
  'resources': 'Resources',
  'languages': 'Languages',
  'roadmaps': 'Roadmaps',
  'gpa-calculator': 'GPA Calculator',
  'bunk-calculator': 'Bunk Calculator',
  'quiz': 'AI Quiz',
  'roadmap-generator': 'AI Roadmap',
  'pyq-analyzer': 'AI PYQ Analyzer',
  'notes-summarizer': 'AI Notes Summarizer',
  'timetable': 'Timetable',
  'about-us': 'About Us',
  'year1': 'Year 1',
  'year2': 'Year 2',
  'year3': 'Year 3',
  'year4': 'Year 4',
};

const Breadcrumbs = () => {
  const location = useLocation();
  const segments = location.pathname.split('/').filter(Boolean);

  if (segments.length === 0) return null; // No breadcrumbs on home page

  const crumbs = segments.map((seg, idx) => {
    const path = '/' + segments.slice(0, idx + 1).join('/');
    const label = routeLabels[seg] || seg.charAt(0).toUpperCase() + seg.slice(1);
    const isLast = idx === segments.length - 1;
    return { path, label, isLast };
  });

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link to="/" className="breadcrumb-home">
            <Home size={14} />
            <span>Home</span>
          </Link>
        </li>
        {crumbs.map((crumb, i) => (
          <li key={i}>
            <ChevronRight size={14} className="breadcrumb-sep" />
            {crumb.isLast ? (
              <span className="breadcrumb-current" aria-current="page">{crumb.label}</span>
            ) : (
              <Link to={crumb.path}>{crumb.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
