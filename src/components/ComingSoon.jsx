import React from 'react';

const ComingSoon = () => {
  return (
    <div className="coming-soon-page" style={{ textAlign: 'center', padding: '4rem 1rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', flexGrow: 1 }}>
      <img 
        src="https://illustrations.popsy.co/blue/work-from-home.svg" 
        alt="Working hard illustration" 
        style={{ width: '100%', maxWidth: '400px', marginBottom: '2rem' }}
      />
      <h2 className="heading-two-tone" style={{ fontSize: '2rem', marginBottom: '1rem' }}>
        We&apos;re running a little late — but we&apos;ll be there soon
      </h2>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', maxWidth: '600px' }}>
        Got what we're missing? Share it and help us deliver to everyone.
      </p>
      <a href="#" target="_blank" rel="noopener noreferrer" className="btn-primary">
        Contribute here
      </a>
    </div>
  );
};

export default ComingSoon;
