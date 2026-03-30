import { roadmaps } from '../data/roadmaps';

const Roadmaps = () => {
  return (
    <div className="roadmaps-page container" style={{ padding: '4rem 2rem' }}>
      <h1 className="heading-two-tone" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        Road <span className="highlight">Maps</span>
      </h1>
      
      <div className="grid-container" style={{ alignItems: 'stretch' }}>
        {roadmaps.map((roadmap, idx) => (
          <div key={idx} className="card roadmap-card" style={{ display: 'flex', flexDirection: 'column', minHeight: '260px' }}>
            <h2>{roadmap.title}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
              Duration: {roadmap.duration}
            </p>
            <div className="topic-pills">
              {roadmap.topics?.map((topic, i) => (
                <span key={i} className="topic-pill">{topic}</span>
              ))}
            </div>
            <a 
              href={roadmap.url || '#'} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn-primary" 
              style={{ marginTop: 'auto', textAlign: 'center' }}
              aria-label={`Start ${roadmap.title} roadmap on roadmap.sh`}
            >
              Start Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmaps;
