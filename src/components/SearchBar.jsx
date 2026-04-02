import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight, FileText, Cpu, Compass, Wrench } from 'lucide-react';
import Fuse from 'fuse.js';
import { resources } from '../data/resources';
import { languages } from '../data/languages';
import { roadmaps } from '../data/roadmaps';
import './SearchBar.css';

// Build the Index once
const getSearchIndex = () => {
  const index = [];

  const pages = [
    { title: 'Home Dashboard', type: 'Page', url: '/', icon: 'page' },
    { title: 'Academic Resources', type: 'Page', url: '/resources', icon: 'page' },
    { title: 'Explore All Content', type: 'Page', url: '/explore', icon: 'page' },
    { title: 'Leaderboard', type: 'Page', url: '/leaderboard', icon: 'page' },
    { title: 'Contributors', type: 'Page', url: '/contributors', icon: 'page' },
    { title: 'Upload Resources', type: 'Page', url: '/upload', icon: 'tool' },
    { title: 'My Uploads', type: 'Page', url: '/my-uploads', icon: 'page' },
    { title: 'Achievement Badges', type: 'Page', url: '/badges', icon: 'page' },
    { title: 'Programming Languages', type: 'Page', url: '/languages', icon: 'page' },
    { title: 'Tech Roadmaps', type: 'Page', url: '/roadmaps', icon: 'page' },
    { title: 'Contacts', type: 'Page', url: '/contacts', icon: 'page' },
    { title: 'Bunk Calculator', type: 'Tool', url: '/bunk-calculator', icon: 'tool' },
    { title: 'GPA Calculator', type: 'Tool', url: '/gpa-calculator', icon: 'tool' },
    { title: 'Scientific Calculator', type: 'Tool', url: '/scientific-calculator', icon: 'tool' },
    { title: 'AI Smart Quiz Generator', type: 'AI Tool', url: '/quiz', icon: 'ai' },
    { title: 'AI Roadmap Generator', type: 'AI Tool', url: '/roadmap-generator', icon: 'ai' },
    { title: 'AI PYQ Analyzer', type: 'AI Tool', url: '/pyq-analyzer', icon: 'ai' },
    { title: 'AI Notes Summarizer', type: 'AI Tool', url: '/notes-summarizer', icon: 'ai' }
  ];
  index.push(...pages);

  // Parse deeply nested resources mapping
  Object.keys(resources).forEach(yearKey => {
    const yearObj = resources[yearKey];
    if (!yearObj.branches) return;
    Object.keys(yearObj.branches).forEach(branchName => {
      const branchObj = yearObj.branches[branchName];
      if (!branchObj.semesters) return;
      Object.keys(branchObj.semesters).forEach(semName => {
        if (Array.isArray(branchObj.semesters[semName])) {
          branchObj.semesters[semName].forEach(subject => {
            index.push({
              title: subject.name,
              type: `${branchName} · ${semName}`,
              url: `/resources/${yearKey}?branch=${encodeURIComponent(branchName)}&sem=${encodeURIComponent(semName)}`,
              icon: 'subject'
            });
          });
        }
      });
    });
  });

  languages.forEach(lang => {
    index.push({
      title: lang.title,
      type: 'Language Course',
      url: '/languages',
      icon: 'page'
    });
  });

  roadmaps.forEach(map => {
    index.push({
      title: map.title,
      type: 'Learning Roadmap',
      url: '/roadmaps',
      icon: 'page'
    });
  });

  return index;
};

const searchIndex = getSearchIndex();

// Fuse.js fuzzy search configuration
const fuse = new Fuse(searchIndex, {
  keys: [
    { name: 'title', weight: 0.7 },
    { name: 'type', weight: 0.3 }
  ],
  threshold: 0.4,       // 0 = exact, 1 = match anything
  includeScore: true,
  minMatchCharLength: 1,
});

const typeIcons = {
  page: <Compass size={16} />,
  tool: <Wrench size={16} />,
  ai: <Cpu size={16} />,
  subject: <FileText size={16} />,
};

const SearchBar = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setResults([]);
      setSelectedIdx(0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      // Show top pages when empty
      setResults(searchIndex.slice(0, 8));
      setSelectedIdx(0);
      return;
    }
    const fuseResults = fuse.search(query).slice(0, 12);
    setResults(fuseResults.map(r => r.item));
    setSelectedIdx(0);
  }, [query]);

  const handleSelect = (url) => {
    navigate(url);
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      onClose();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIdx(prev => Math.min(prev + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIdx(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && results[selectedIdx]) {
      handleSelect(results[selectedIdx].url);
    }
  };

  // Scroll selected item into view
  useEffect(() => {
    if (resultsRef.current) {
      const selected = resultsRef.current.children[selectedIdx];
      if (selected) selected.scrollIntoView({ block: 'nearest' });
    }
  }, [selectedIdx]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="search-modal-backdrop" onClick={onClose}>
          <motion.div 
            className="search-modal"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.15 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="search-input-wrapper">
              <Search className="search-icon-inside" size={20} />
              <input 
                ref={inputRef}
                type="text" 
                placeholder="Search resources, topics, tools..." 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                aria-label="Search"
                role="combobox"
                aria-expanded={results.length > 0}
                aria-activedescendant={results[selectedIdx] ? `search-item-${selectedIdx}` : undefined}
              />
              <button className="search-esc" onClick={onClose}>ESC</button>
            </div>
            
            {results.length > 0 && (
              <div className="search-results" ref={resultsRef} role="listbox">
                {!query.trim() && (
                  <div className="search-section-label">Quick Access</div>
                )}
                {results.map((res, i) => (
                  <div 
                    key={i} 
                    id={`search-item-${i}`}
                    className={`search-result-item ${i === selectedIdx ? 'selected' : ''}`} 
                    onClick={() => handleSelect(res.url)}
                    role="option"
                    aria-selected={i === selectedIdx}
                    tabIndex={-1}
                  >
                    <div className="search-result-icon">
                      {typeIcons[res.icon] || typeIcons.page}
                    </div>
                    <div className="search-result-text">
                      <h4>{res.title}</h4>
                      <span>{res.type}</span>
                    </div>
                    <ChevronRight size={16} className="search-result-arrow" />
                  </div>
                ))}
              </div>
            )}

            {query.trim() && results.length === 0 && (
              <div className="search-results">
                <div className="search-no-results">
                  No results found for "{query}"
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SearchBar;
