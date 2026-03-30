import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, Search } from 'lucide-react';
import SearchBar from './SearchBar';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const dropdownBtnRef = useRef(null);
  const dropdownMenuRef = useRef(null);

  // Detect OS for shortcut label
  const isMac = typeof navigator !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
  const shortcutLabel = isMac ? '⌘K' : 'Ctrl+K';

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        dropdownBtnRef.current &&
        !dropdownBtnRef.current.contains(e.target) &&
        dropdownMenuRef.current &&
        !dropdownMenuRef.current.contains(e.target)
      ) {
        setDropdownOpen(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [dropdownOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false);
    setDropdownOpen(false);
  }, [location.pathname]);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Resources', path: '/resources' },
    { name: 'Languages', path: '/languages' },
    { name: 'Roadmaps', path: '/roadmaps' }
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo" aria-label="ResourceRIA Home">
          <img src="/logo.png" alt="ResourceRIA Logo" className="navbar-logo-img" />
        </Link>
        
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={isActive(link.path) ? 'active' : ''}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="nav-dropdown">
            <button 
              ref={dropdownBtnRef} 
              className="dropdown-btn" 
              onClick={() => setDropdownOpen(!dropdownOpen)} 
              aria-expanded={dropdownOpen} 
              aria-controls="tools-menu"
              aria-haspopup="true"
            >
              Tools & AI ▼
            </button>
            <div ref={dropdownMenuRef} className={`dropdown-content ${dropdownOpen ? 'open' : ''}`} id="tools-menu" role="menu">
              <Link to="/bunk-calculator" role="menuitem">Bunk Calculator</Link>
              <Link to="/gpa-calculator" role="menuitem">GPA Calculator</Link>
              <Link to="/quiz" role="menuitem">Smart AI Quiz</Link>
              <Link to="/roadmap-generator" role="menuitem">AI Roadmap</Link>
              <Link to="/pyq-analyzer" role="menuitem">AI PYQ Analyzer</Link>
              <Link to="/notes-summarizer" role="menuitem">AI Notes Summarizer</Link>
            </div>
          </div>
        </div>

        <div className="nav-actions">
          <button className="search-btn" onClick={() => setIsSearchOpen(true)} title={`Search (${shortcutLabel})`} aria-label="Open search">
            <Search size={18} />
            <span className="search-shortcut">{shortcutLabel}</span>
          </button>

          <button onClick={toggleTheme} className="icon-btn theme-toggle" aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button className="icon-btn mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
  );
};

export default Navbar;
