import { useState, useEffect } from 'react';
import { Users, FileText, Download, ExternalLink, Heart, Code } from 'lucide-react';
import { contributors, contributorStats } from '../data/mockContributors';
import './Contributors.css';

const Contributors = () => {
  const [animatedStats, setAnimatedStats] = useState({
    contributors: 0,
    resources: 0,
    downloads: 0
  });

  // Animate counters on mount
  useEffect(() => {
    const duration = 1000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const easeOut = 1 - Math.pow(1 - progress, 3);

      setAnimatedStats({
        contributors: Math.floor(contributorStats.totalContributors * easeOut),
        resources: Math.floor(contributorStats.totalResources * easeOut),
        downloads: Math.floor(contributorStats.totalDownloads * easeOut)
      });

      if (step >= steps) clearInterval(timer);
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const getRoleColor = (role) => {
    switch (role) {
      case 'Maintainer': return '#fbbf24';
      case 'Core Contributor': return '#a78bfa';
      case 'Contributor': return '#34d399';
      default: return '#60a5fa';
    }
  };

  return (
    <div className="contributors-page container">
      <h1 className="heading-two-tone">
        Our <span className="highlight">Contributors</span>
      </h1>
      <p className="page-subtitle">
        Meet the amazing people making ResourceRIA possible
      </p>

      {/* Stats Row */}
      <div className="stats-row">
        <div className="stat-card">
          <Users size={32} className="stat-icon" />
          <div className="stat-number">{animatedStats.contributors}+</div>
          <div className="stat-label">Total Contributors</div>
        </div>
        <div className="stat-card">
          <FileText size={32} className="stat-icon" />
          <div className="stat-number">{animatedStats.resources}+</div>
          <div className="stat-label">Resources Shared</div>
        </div>
        <div className="stat-card">
          <Download size={32} className="stat-icon" />
          <div className="stat-number">{animatedStats.downloads.toLocaleString()}</div>
          <div className="stat-label">Downloads</div>
        </div>
      </div>

      {/* Contributors Grid */}
      <div className="grid-container contributors-grid">
        {contributors.map((contributor) => (
          <div key={contributor.id} className="card contributor-card">
            <img 
              src={contributor.avatar} 
              alt={contributor.name} 
              className="contributor-avatar"
            />
            <h3 className="contributor-name">{contributor.name}</h3>
            <span 
              className="contributor-role"
              style={{ borderColor: getRoleColor(contributor.role), color: getRoleColor(contributor.role) }}
            >
              {contributor.role}
            </span>
            <div className="contributor-stats">
              <Code size={16} />
              <span>{contributor.contributions} contributions</span>
            </div>
            <div className="contributor-badges">
              {contributor.badges.slice(0, 4).map((badge, idx) => (
                <span key={idx} className="mini-badge" title={badge}>
                  {badge === 'first-upload' && '🚀'}
                  {badge === 'streak-7' && '🔥'}
                  {badge === 'streak-14' && '💪'}
                  {badge === 'streak-30' && '👑'}
                  {badge === 'top-contributor' && '⭐'}
                  {badge === 'helper' && '🤝'}
                  {badge === 'quality-checker' && '✅'}
                  {badge === 'roadmap-master' && '🗺️'}
                  {badge === 'note-taker' && '📝'}
                  {badge === 'pyq-expert' && '📚'}
                  {badge === 'quiz-creator' && '🎯'}
                  {badge === 'ai-pioneer' && '🤖'}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* How to Contribute Section */}
      <div className="how-to-section card">
        <h2 className="heading-two-tone">
          How to <span className="highlight">Contribute</span>
        </h2>
        <p className="section-description">
          Want to help fellow students? Here's how you can contribute:
        </p>
        
        <ol className="contribution-steps">
          <li>
            <Heart size={20} className="step-icon" />
            <div>
              <strong>Fork the Repository</strong>
              <p>Create a fork of our GitHub repository to start contributing</p>
            </div>
          </li>
          <li>
            <FileText size={20} className="step-icon" />
            <div>
              <strong>Add Resources</strong>
              <p>Upload notes, PYQs, or other study materials for your subjects</p>
            </div>
          </li>
          <li>
            <ExternalLink size={20} className="step-icon" />
            <div>
              <strong>Submit via Form</strong>
              <p>Or use our Google Form for quick submissions without coding</p>
            </div>
          </li>
        </ol>

        <a 
          href="https://forms.gle/5GZdMcTCzEo92fz28" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn-primary contribute-btn"
        >
          <ExternalLink size={18} />
          Contribute via Google Form
        </a>
      </div>
    </div>
  );
};

export default Contributors;
