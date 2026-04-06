import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  GraduationCap, 
  BookOpen, 
  Layers, 
  Award, 
  Code2, 
  Map, 
  Calculator, 
  BarChart3, 
  Brain, 
  Cpu, 
  FileText,
  Terminal,
  Sparkles,
  ArrowRight,
  Wrench,
  ChevronRight
} from 'lucide-react';
import { resources } from '../data/resources';
import { languages as langData } from '../data/languages';
import { roadmaps as roadmapData } from '../data/roadmaps';
import RIAModal from '../components/RIAModal';
import { AnimatePresence, motion } from 'framer-motion';
import './Explore.css';

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('resources');
  const [isAIModalOpen, setIsAIModalOpen] = useState(false);
  
  const sectionsRef = {
    resources: useRef(null),
    languages: useRef(null),
    roadmaps: useRef(null),
    tools: useRef(null),
    ai: useRef(null)
  };

  // 1. IntersectionObserver for Sticky Tab Bar
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-100px 0px -70% 0px',
      threshold: 0
    };

    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveTab(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    Object.values(sectionsRef).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);

  // 2. Real-time Filtering Logic
  const filteredLanguages = Array.isArray(langData) ? langData.filter(lang => 
    lang.title.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 9) : []; 

  const filteredRoadmaps = Array.isArray(roadmapData) ? roadmapData.filter(map => 
    map.title.toLowerCase().includes(searchQuery.toLowerCase())
  ).slice(0, 6) : [];

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 120; // Adjust for sticky header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const tabs = [
    { id: 'resources', label: 'Resources', icon: <BookOpen size={18} /> },
    { id: 'languages', label: 'Languages', icon: <Terminal size={18} /> },
    { id: 'roadmaps', label: 'Roadmaps', icon: <Map size={18} /> },
    { id: 'tools', label: 'Tools', icon: <Calculator size={18} /> },
    { id: 'ai', label: 'AI Tools', icon: <Cpu size={18} /> }
  ];

  const tools = [
    { label: "GPA Calculator", path: "/gpa-calculator", icon: <Calculator /> },
    { label: "Bunk Calculator", path: "/bunk-calculator", icon: <BarChart3 /> },
    { label: "Scientific Calc", path: "/scientific-calculator", icon: <Calculator /> },
    { label: "Unit Converter", path: "/unit-converter", icon: <Wrench />, comingSoon: true }
  ];

  return (
    <div className="explore-page anim-on-load">
      {/* 1. Hero Section */}
      <header className="explore-hero container">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="heading-two-tone"
        >
          Explore <span className="highlight">Everything</span>
        </motion.h1>
        <p className="explore-hero-desc">The ultimate navigation hub for all your academic and skill-building needs.</p>
        
        <div className="explore-main-search">
          <Search size={22} className="explore-search-icon" />
          <input 
            type="text" 
            placeholder="Type to filter languages and roadmaps..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Filter resources"
          />
        </div>
      </header>

      {/* 2. Sticky Tab Bar */}
      <nav className="explore-tabs-nav sticky">
        <div className="container">
          <div className="tabs-wrapper">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => scrollToSection(tab.id)}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      <div className="container explore-content">
        
        {/* 3. Resources Section */}
        <section id="resources" ref={sectionsRef.resources} className="explore-section">
          <div className="explore-section-header">
            <div className="title-with-icon">
              <GraduationCap size={28} className="icon-primary" />
              <h2>Academic Resources</h2>
            </div>
          </div>
          <div className="grid-responsive-2-4">
            {Object.keys(resources).map((key, idx) => (
              <Link 
                to={`/resources/${key}`} 
                key={key} 
                className="explore-card-large hover-lift"
                style={{ borderLeft: `6px solid ${['#14b8a6', '#3b82f6', '#a855f7', '#6366f1'][idx % 4]}` }}
              >
                <div className="card-large-icon">
                  {[ <GraduationCap size={32}/>, <BookOpen size={32}/>, <Layers size={32}/>, <Award size={32}/> ][idx % 4]}
                </div>
                <h3>{resources[key].label}</h3>
                <p>View semesters & notes</p>
                <ArrowRight className="card-arrow" size={20} />
              </Link>
            ))}
          </div>
        </section>

        {/* 4. Languages Section */}
        <section id="languages" ref={sectionsRef.languages} className="explore-section">
          <div className="explore-section-header">
            <div className="title-with-icon">
              <Code2 size={28} className="icon-primary" />
              <h2>Languages</h2>
            </div>
            {searchQuery && <span className="results-count">Showing {filteredLanguages.length} results</span>}
          </div>
          <div className="grid-responsive-2-4">
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((lang, idx) => (
                <Link to="/languages" key={idx} className="explore-card-item hover-lift">
                  <div className="card-icon-small"><Terminal size={20}/></div>
                  <div className="card-text">
                    <h4>{lang.title}</h4>
                  </div>
                </Link>
              ))
            ) : (
              <p className="no-results">No languages match "{searchQuery}"</p>
            )}
          </div>
        </section>

        {/* 5. Roadmaps Section */}
        <section id="roadmaps" ref={sectionsRef.roadmaps} className="explore-section">
          <div className="explore-section-header">
            <div className="title-with-icon">
              <Map size={28} className="icon-primary" />
              <h2>Roadmaps</h2>
            </div>
          </div>
          <div className="grid-responsive-2-3">
            {filteredRoadmaps.length > 0 ? (
              filteredRoadmaps.map((road, idx) => (
                <Link to="/roadmaps" key={idx} className="explore-card-item hover-lift">
                  <div className="card-icon-small"><Map size={20}/></div>
                  <div className="card-text">
                    <h4>{road.title}</h4>
                    <span>Curated path &rarr;</span>
                  </div>
                </Link>
              ))
            ) : (
              <p className="no-results">No roadmaps match "{searchQuery}"</p>
            )}
          </div>
        </section>

        {/* 6. Tools Section */}
        <section id="tools" ref={sectionsRef.tools} className="explore-section">
          <div className="explore-section-header">
            <div className="title-with-icon">
              <Calculator size={28} className="icon-primary" />
              <h2>Calculators & Tools</h2>
            </div>
          </div>
          <div className="grid-responsive-2-4">
            {tools.map((tool, idx) => (
              <Link to={tool.path} key={idx} className={`explore-card-tool hover-lift ${tool.comingSoon ? 'disabled' : ''}`}>
                <div className="tool-icon">{tool.icon}</div>
                <h4>{tool.label}</h4>
                {tool.comingSoon ? (
                  <span className="coming-soon">Coming Soon</span>
                ) : (
                  <span className="open-link">Open &rarr;</span>
                )}
              </Link>
            ))}
          </div>
        </section>

        {/* 7. AI Features Section */}
        <section id="ai" ref={sectionsRef.ai} className="explore-section">
          <div className="explore-section-header">
            <div className="title-with-icon">
              <Cpu size={28} className="icon-primary" />
              <h2>AI Powered Hub</h2>
            </div>
          </div>
          <div className="grid-responsive-2-3">
            <button onClick={() => setIsAIModalOpen(true)} className="explore-card-ai hover-lift">
              <div className="ai-icon-bg"><Brain size={24}/></div>
              <div className="ai-text">
                <h4>Ask RIA</h4>
                <p>Your 24/7 Academic Assistant</p>
              </div>
            </button>
            <Link to="/quiz" className="explore-card-ai hover-lift">
              <div className="ai-icon-bg"><Brain size={24}/></div>
              <div className="ai-text">
                <h4>Smart AI Quiz</h4>
                <p>Generate quizzes from notes</p>
              </div>
            </Link>
            <Link to="/roadmap-generator" className="explore-card-ai hover-lift">
              <div className="ai-icon-bg"><Sparkles size={24}/></div>
              <div className="ai-text">
                <h4>AI Roadmap Generator</h4>
                <p>Personalized learning paths</p>
              </div>
            </Link>
            <Link to="/notes-summarizer" className="explore-card-ai hover-lift">
              <div className="ai-icon-bg"><FileText size={24}/></div>
              <div className="ai-text">
                <h4>Notes Summarizer</h4>
                <p>Summarize complex PDF notes</p>
              </div>
            </Link>
            <Link to="/pyq-analyzer" className="explore-card-ai hover-lift">
              <div className="ai-icon-bg"><FileText size={24}/></div>
              <div className="ai-text">
                <h4>AI PYQ Analyzer</h4>
                <p>Weightage analysis of past papers</p>
              </div>
            </Link>
          </div>
        </section>
      </div>

      <AnimatePresence>
        {isAIModalOpen && (
          <RIAModal subject={{ name: "General Hub" }} onClose={() => setIsAIModalOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Explore;
