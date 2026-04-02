import { useState } from 'react';
import { Trophy, Medal, Award, TrendingUp, TrendingDown, Minus, Star } from 'lucide-react';
import { weeklyLeaderboard, monthlyLeaderboard, allTimeLeaderboard } from '../data/mockLeaderboard';
import './Leaderboard.css';

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState('weekly');

  const getLeaderboardData = () => {
    switch (activeTab) {
      case 'weekly': return weeklyLeaderboard;
      case 'monthly': return monthlyLeaderboard;
      default: return allTimeLeaderboard;
    }
  };

  const data = getLeaderboardData();
  const top3 = data.slice(0, 3);
  const rest = data.slice(3);

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <TrendingUp size={16} className="trend-up" />;
      case 'down': return <TrendingDown size={16} className="trend-down" />;
      default: return <Minus size={16} className="trend-same" />;
    }
  };

  const getPodiumStyle = (rank) => {
    if (rank === 1) return 'podium-card gold';
    if (rank === 2) return 'podium-card silver';
    return 'podium-card bronze';
  };

  return (
    <div className="leaderboard-page container">
      <h1 className="heading-two-tone">
        Leader<span className="highlight">board</span>
      </h1>
      <p className="page-subtitle">
        Celebrating our top contributors this week, month, and all time
      </p>
      
      <div className="coming-soon-badge">
        <Star size={12} /> Coming Soon - Live Rankings
      </div>

      <div className="semester-tabs tab-bar">
        <button 
          className={`sem-tab ${activeTab === 'weekly' ? 'active' : ''}`}
          onClick={() => setActiveTab('weekly')}
        >
          Weekly
        </button>
        <button 
          className={`sem-tab ${activeTab === 'monthly' ? 'active' : ''}`}
          onClick={() => setActiveTab('monthly')}
        >
          Monthly
        </button>
        <button 
          className={`sem-tab ${activeTab === 'allTime' ? 'active' : ''}`}
          onClick={() => setActiveTab('allTime')}
        >
          All Time
        </button>
      </div>

      {/* Podium Section - Top 3 */}
      <div className="podium-section">
        {top3[1] && (
          <div className="podium-card silver">
            <div className="rank-badge rank-2">2</div>
            <img src={top3[1].avatar} alt={top3[1].name} className="podium-avatar" />
            <h3 className="podium-name">{top3[1].name}</h3>
            <p className="podium-contributions">{top3[1].contributions} contributions</p>
            <div className="podium-badges">{top3[1].badges.join(' ')}</div>
          </div>
        )}

        {top3[0] && (
          <div className="podium-card gold">
            <div className="rank-badge rank-1">
              <Trophy size={20} /> 1
            </div>
            <img src={top3[0].avatar} alt={top3[0].name} className="podium-avatar" />
            <h3 className="podium-name">{top3[0].name}</h3>
            <p className="podium-contributions">{top3[0].contributions} contributions</p>
            <div className="podium-badges">{top3[0].badges.join(' ')}</div>
          </div>
        )}

        {top3[2] && (
          <div className="podium-card bronze">
            <div className="rank-badge rank-3">3</div>
            <img src={top3[2].avatar} alt={top3[2].name} className="podium-avatar" />
            <h3 className="podium-name">{top3[2].name}</h3>
            <p className="podium-contributions">{top3[2].contributions} contributions</p>
            <div className="podium-badges">{top3[2].badges.join(' ')}</div>
          </div>
        )}
      </div>

      {/* Leaderboard Table - Ranks 4-10 */}
      <div className="card leaderboard-list">
        <div className="leaderboard-header">
          <span>Rank</span>
          <span>Contributor</span>
          <span>Contributions</span>
          <span>Trend</span>
          <span>Badges</span>
        </div>
        
        {rest.map((entry) => (
          <div key={entry.rank} className="leaderboard-row">
            <div className="rank-number">{entry.rank}</div>
            <div className="contributor-info">
              <img src={entry.avatar} alt={entry.name} className="contributor-avatar-small" />
              <span className="contributor-name">{entry.name}</span>
            </div>
            <div className="contributions-count">{entry.contributions}</div>
            <div className="trend-icon">{getTrendIcon(entry.trend)}</div>
            <div className="row-badges">{entry.badges.join(' ')}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;
