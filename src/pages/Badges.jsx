import { useState } from 'react';
import { Lock } from 'lucide-react';
import { badges } from '../data/mockBadges';
import './Badges.css';

const Badges = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredBadges = activeCategory === 'all' 
    ? badges 
    : badges.filter(badge => badge.category === activeCategory);

  const categories = ['all', 'Contribution', 'Academic', 'Community'];

  return (
    <div className="badges-page container">
      <h1 className="heading-two-tone">
        Achievement <span className="highlight">Badges</span>
      </h1>
      <p className="page-subtitle">
        Track your progress and unlock achievements as you contribute and learn
      </p>

      {/* Category Filter Tabs */}
      <div className="semester-tabs tab-bar">
        {categories.map((category) => (
          <button 
            key={category}
            className={`sem-tab ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category === 'all' ? 'All Badges' : category}
          </button>
        ))}
      </div>

      {/* Badges Grid */}
      <div className="grid-container badges-grid">
        {filteredBadges.map((badge) => (
          <div 
            key={badge.id} 
            className={`card badge-card ${!badge.unlocked ? 'locked' : ''}`}
          >
            {!badge.unlocked && (
              <div className="lock-overlay">
                <Lock size={24} />
              </div>
            )}
            
            <div className="badge-emoji">{badge.icon}</div>
            <h3 className="badge-name">{badge.name}</h3>
            <p className="badge-description">{badge.description}</p>
            
            <div className="badge-progress-container">
              <div className="badge-progress">
                <div 
                  className="badge-progress-fill" 
                  style={{ width: `${badge.progress}%` }}
                />
              </div>
              <span className="badge-progress-text">{badge.progress}%</span>
            </div>

            <p className="badge-requirement">{badge.requirement}</p>
            
            <span className={`badge-category-tag category-${badge.category.toLowerCase()}`}>
              {badge.category}
            </span>
          </div>
        ))}
      </div>

      {/* Progress Summary */}
      <div className="card progress-summary">
        <h2>Your Badge Progress</h2>
        <div className="progress-stats">
          <div className="progress-stat">
            <div className="stat-value unlocked">
              {badges.filter(b => b.unlocked).length}
            </div>
            <div className="stat-label">Unlocked</div>
          </div>
          <div className="progress-stat">
            <div className="stat-value in-progress">
              {badges.filter(b => !b.unlocked && b.progress > 0).length}
            </div>
            <div className="stat-label">In Progress</div>
          </div>
          <div className="progress-stat">
            <div className="stat-value locked">
              {badges.filter(b => !b.unlocked && b.progress === 0).length}
            </div>
            <div className="stat-label">Locked</div>
          </div>
          <div className="progress-stat total">
            <div className="stat-value">
              {badges.length}
            </div>
            <div className="stat-label">Total Badges</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Badges;
