import { roadmaps } from '../data/roadmaps';

const Roadmaps = () => {
  return (
    <div className="roadmaps-page container" style={{ padding: '4rem 2rem' }}>
      <h1 className="heading-two-tone" style={{ textAlign: 'center', marginBottom: '3rem' }}>
        Road <span className="highlight">Maps</span>
      </h1>
      
      <div className="grid-container">
        {roadmaps.map((roadmap, idx) => (
          <div key={idx} className="card roadmap-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <h2>{roadmap.title}</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1rem' }}>
              Duration: {roadmap.duration}
            </p>
            <p style={{ color: 'var(--primary-blue)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              {roadmap.topics.join(', ')}
            </p>
            <a href={roadmap.url || '#'} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ marginTop: 'auto', textAlign: 'center' }}>
              Start Now
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roadmaps;
