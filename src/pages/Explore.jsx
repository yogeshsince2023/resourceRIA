import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Compass, BookOpen, Code, Map, Wrench, ArrowRight } from 'lucide-react';
import { resources } from '../data/resources';
import { languages } from '../data/languages';
import { roadmaps } from '../data/roadmaps';
import './Explore.css';

const Explore = () => {
  const [activeTab, setActiveTab] = useState('all');

  const categories = [
    { id: 'all', label: 'All', icon: <Compass size={16} /> },
    { id: 'resources', label: 'Resources', icon: <BookOpen size={16} /> },
    { id: 'languages', label: 'Languages', icon: <Code size={16} /> },
    { id: 'roadmaps', label: 'Roadmaps', icon: <Map size={16} /> },
    { id: 'tools', label: 'Tools', icon: <Wrench size={16} /> }
  ];

  // Tools data
  const tools = [
    { title: 'GPA Calculator', description: 'Calculate SGPA and CGPA', path: '/gpa-calculator' },
    { title: 'Bunk Calculator', description: 'Track attendance & safe bunks', path: '/bunk-calculator' },
    { title: 'Scientific Calculator', description: 'Advanced math functions', path: '/scientific-calculator' },
    { title: 'AI Smart Quiz', description: 'Generate quizzes with AI', path: '/quiz' },
    { title: 'AI Roadmap Generator', description: 'Personalized learning plans', path: '/roadmap-generator' },
    { title: 'AI PYQ Analyzer', description: 'Analyze past papers', path: '/pyq-analyzer' },
    { title: 'AI Notes Summarizer', description: 'Summarize study notes', path: '/notes-summarizer' }
  ];

  const getCategoryData = () => {
    switch (activeTab) {
      case 'resources':
        return Object.entries(resources).slice(0, 4).map(([key, data]) => ({
          type: 'resource',
          title: data.label,
          subtitle: `${Object.keys(data.branches).length} branches`,
          path: `/resources/${key}`,
          topics: Object.keys(data.branches).slice(0, 3)
        }));
      case 'languages':
        return languages.slice(0, 6).map(lang => ({
          type: 'language',
          title: lang.title,
          subtitle: lang.duration,
          path: '/languages',
          topics: lang.topics.slice(0, 3)
        }));
      case 'roadmaps':
        return roadmaps.slice(0, 6).map(map => ({
          type: 'roadmap',
          title: map.title,
          subtitle: map.duration,
          path: '/roadmaps',
          topics: map.topics.slice(0, 3)
        }));
      case 'tools':
        return tools.map(tool => ({
          type: 'tool',
          title: tool.title,
          subtitle: 'Utility',
          path: tool.path,
          topics: []
        }));
      default: // 'all' - show mix of everything
        return [
          ...Object.entries(resources).slice(0, 2).map(([key, data]) => ({
            type: 'resource',
            title: data.label,
            subtitle: `${Object.keys(data.branches).length} branches`,
            path: `/resources/${key}`,
            topics: Object.keys(data.branches).slice(0, 2)
          })),
          ...languages.slice(0, 2).map(lang => ({
            type: 'language',
            title: lang.title,
            subtitle: lang.duration,
            path: '/languages',
            topics: lang.topics.slice(0, 2)
          })),
          ...roadmaps.slice(0, 2).map(map => ({
            type: 'roadmap',
            title: map.title,
            subtitle: map.duration,
            path: '/roadmaps',
            topics: map.topics.slice(0, 2)
          })),
          ...tools.slice(0, 3).map(tool => ({
            type: 'tool',
            title: tool.title,
            subtitle: 'Utility',
            path: tool.path,
            topics: []
          }))
        ];
    }
  };

  const data = getCategoryData();

  const getTypeColor = (type) => {
    switch (type) {
      case 'resource': return '#0061a4';
      case 'language': return '#7c3aed';
      case 'roadmap': return '#059669';
      case 'tool': return '#d97706';
      default: return '#6b7280';
    }
  };

  return (
    <div className="explore-page container">
      <h1 className="heading-two-tone">
        Explore <span className="highlight">Everything</span>
      </h1>
      <p className="page-subtitle">
        Browse all resources, languages, roadmaps, and tools in one place
      </p>

      {/* Category Tabs */}
      <div className="semester-tabs tab-bar">
        {categories.map((cat) => (
          <button 
            key={cat.id}
            className={`sem-tab ${activeTab === cat.id ? 'active' : ''}`}
            onClick={() => setActiveTab(cat.id)}
          >
            {cat.icon}
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid-container explore-grid">
        {data.map((item, idx) => (
          <Link to={item.path} key={idx} className="card explore-card">
            <span 
              className="category-tag"
              style={{ 
                background: `${getTypeColor(item.type)}20`,
                color: getTypeColor(item.type),
                borderColor: getTypeColor(item.type)
              }}
            >
              {item.type}
            </span>
            
            <h3 className="explore-title">{item.title}</h3>
            <p className="explore-subtitle">{item.subtitle}</p>
            
            {item.topics && item.topics.length > 0 && (
              <div className="topic-pills">
                {item.topics.map((topic, i) => (
                  <span key={i} className="topic-pill">{topic}</span>
                ))}
              </div>
            )}

            <div className="explore-link">
              Explore <ArrowRight size={16} />
            </div>
          </Link>
        ))}
      </div>

      {/* View All CTA */}
      {activeTab !== 'all' && (
        <div className="view-all-cta">
          <p>Want to see more?</p>
          <Link to={`/${activeTab}`} className="btn-primary">
            View All {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </Link>
        </div>
      )}
    </div>
  );
};

export default Explore;
