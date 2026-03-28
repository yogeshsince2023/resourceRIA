import { languages } from '../data/languages';

const Languages = () => {
  return (
    <div className="languages-page container" style={{ padding: '4rem 2rem' }}>
      <h1 className="heading-two-tone" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        Let&apos;s <span className="highlight">Start</span>
      </h1>
      
      <div className="grid-container">
        {languages.map((lang, idx) => (
          <div key={idx} className="card language-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <h2>{lang.title}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Duration: {lang.duration}
            </p>
            <p style={{ color: 'var(--primary-blue)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              {lang.topics.join(', ')}
            </p>
            <a href={lang.url || '#'} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ marginTop: 'auto', textAlign: 'center' }}>
              Start Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Languages;
