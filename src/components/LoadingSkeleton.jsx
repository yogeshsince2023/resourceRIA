const LoadingSkeleton = () => {
  return (
    <div style={{ padding: '4rem 2rem', maxWidth: '1280px', margin: '0 auto' }}>
      {/* Title skeleton */}
      <div className="skeleton" style={{ width: '40%', height: '2.5rem', margin: '0 auto 3rem' }} />

      {/* Card grid skeleton */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: '16px',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <div className="skeleton" style={{ width: '70%', height: '1.5rem' }} />
            <div className="skeleton" style={{ width: '40%', height: '1rem' }} />
            <div className="skeleton" style={{ width: '100%', height: '3rem', marginTop: '0.5rem' }} />
            <div className="skeleton" style={{ width: '100%', height: '2.5rem', marginTop: 'auto' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoadingSkeleton;
