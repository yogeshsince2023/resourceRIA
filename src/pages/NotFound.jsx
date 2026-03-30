import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

const NotFound = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '6rem 2rem',
      flexGrow: 1,
      gap: '1.5rem'
    }}>
      <h1 style={{ fontSize: '8rem', fontWeight: 900, lineHeight: 1, color: 'var(--primary-blue)', margin: 0, opacity: 0.3 }}>
        404
      </h1>
      <h2 className="heading-two-tone" style={{ fontSize: '1.8rem' }}>
        Page Not <span className="highlight">Found</span>
      </h2>
      <p style={{ color: 'var(--text-muted)', maxWidth: '500px', lineHeight: 1.6 }}>
        The page you're looking for doesn't exist or has been moved.
        Let's get you back on track.
      </p>
      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <Home size={18} /> Go Home
        </Link>
        <Link to="/resources" className="btn-secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
          <Search size={18} /> Browse Resources
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
