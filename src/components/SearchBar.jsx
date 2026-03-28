import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronRight } from 'lucide-react';
import { resources } from '../data/resources';
import { languages } from '../data/languages';
import { roadmaps } from '../data/roadmaps';
import './SearchBar.css';

// Build the Index once
const getSearchIndex = () => {
  const index = [];

  const pages = [
    { title: 'Home Dashboard', type: 'Page', url: '/' },
    { title: 'Academic Resources', type: 'Page', url: '/resources' },
    { title: 'Programming Languages', type: 'Page', url: '/languages' },
    { title: 'Tech Roadmaps', type: 'Page', url: '/roadmaps' },
    { title: 'Bunk Calculator (Attendance)', type: 'Tool', url: '/bunk-calculator' },
    { title: 'GPA Calculator', type: 'Tool', url: '/gpa-calculator' },
    { title: 'AI Smart Quiz Generator', type: 'AI Tool', url: '/quiz' },
    { title: 'AI Roadmap Generator', type: 'AI Tool', url: '/roadmap-generator' },
    { title: 'AI PYQ Analyzer', type: 'AI Tool', url: '/pyq-analyzer' },
    { title: 'AI Notes Summarizer', type: 'AI Tool', url: '/notes-summarizer' }
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
        branchObj.semesters[semName].forEach(subject => {
          index.push({
            title: subject.name,
            type: `Subject (${branchName} - ${semName})`,
            url: `/resources/${yearKey}?branch=${encodeURIComponent(branchName)}&sem=${encodeURIComponent(semName)}`
          });
        });
      });
    });
  });

  languages.forEach(lang => {
    index.push({
      title: lang.title,
      type: 'Language Course',
      url: '/languages'
    });
  });

  roadmaps.forEach(map => {
    index.push({
      title: map.title,
      type: 'Learning Roadmap',
      url: '/roadmaps'
    });
  });

  return index;
};

const searchIndex = getSearchIndex();

const SearchBar = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setQuery('');
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const lowerQ = query.toLowerCase();
    const filtered = searchIndex.filter(item => {
      if (!item || !item.title || !item.type) return false;
      return item.title.toLowerCase().includes(lowerQ) || item.type.toLowerCase().includes(lowerQ);
    }).slice(0, 10); // cap to top 10 results
    setResults(filtered);
  }, [query]);

  const handleSelect = (url) => {
    navigate(url);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="search-modal-backdrop" onClick={onClose}>
          <motion.div 
            className="search-modal"
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            onClick={e => e.stopPropagation()}
          >
            <div className="search-input-wrapper">
              <Search className="search-icon-inside" size={24} />
              <input 
                ref={inputRef}
                type="text" 
                placeholder="Search resources, topics, tools..." 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') onClose();
                  // Note: full arrow key nav could go here! 
                }}
              />
              <button className="search-esc" onClick={onClose}>ESC</button>
            </div>
            
            {(results.length > 0 || query.trim()) && (
              <div className="search-results">
                {results.length > 0 ? (
                  results.map((res, i) => (
                    <div key={i} className="search-result-item" onClick={() => handleSelect(res.url)}>
                      <div className="search-result-text">
                        <h4>{res.title}</h4>
                        <span>{res.type}</span>
                      </div>
                      <ChevronRight size={18} className="search-result-arrow" />
                    </div>
                  ))
                ) : (
                  <div className="search-no-results">
                    No results found for "{query}"
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SearchBar;
