import { languages } from '../data/languages';

const Languages = () => {
  return (
    <div className="languages-page container" style={{ padding: '4rem 2rem' }}>
      <h1 className="heading-two-tone" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        Let&apos;s <span className="highlight">Start</span>
      </h1>
      
      <div className="grid-container" style={{ alignItems: 'stretch' }}>
        {languages.map((lang, idx) => (
          <div key={idx} className="card language-card" style={{ display: 'flex', flexDirection: 'column', minHeight: '260px' }}>
            <h2>{lang.title}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
              Duration: {lang.duration}
            </p>
            <div className="topic-pills">
              {lang.topics?.map((topic, i) => (
                <span key={i} className="topic-pill">{topic}</span>
              ))}
            </div>
            {lang.url ? (
              <a 
                href={lang.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-primary" 
                style={{ marginTop: 'auto', textAlign: 'center' }}
                aria-label={`Start ${lang.title} learning path on roadmap.sh`}
              >
                Start Now
              </a>
            ) : (
              <button className="btn-primary" style={{ marginTop: 'auto', textAlign: 'center', opacity: 0.5, cursor: 'not-allowed' }} disabled aria-label={`${lang.title} coming soon`}>
                Coming Soon
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Languages;
