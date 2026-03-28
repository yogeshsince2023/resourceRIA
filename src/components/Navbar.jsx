import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Moon, Sun, Search } from 'lucide-react';
import SearchBar from './SearchBar';
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    return localStorage.getItem('theme') === 'dark';
  });
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();

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

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Resources', path: '/resources' },
    { name: 'Languages', path: '/languages' },
    { name: 'Roadmaps', path: '/roadmaps' }
  ];

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <img src="/logo.png" alt="ResourceRIA Logo" className="navbar-logo-img" />
        </Link>
        
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <Link 
              key={link.path} 
              to={link.path}
              className={location.pathname === link.path ? 'active' : ''}
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          
          <div className="nav-dropdown">
            <button className="dropdown-btn">Tools & AI ▼</button>
            <div className="dropdown-content">
              <Link to="/bunk-calculator" onClick={() => setMenuOpen(false)}>Bunk Calculator</Link>
              <Link to="/gpa-calculator" onClick={() => setMenuOpen(false)}>GPA Calculator</Link>
              <Link to="/quiz" onClick={() => setMenuOpen(false)}>Smart AI Quiz</Link>
              <Link to="/roadmap-generator" onClick={() => setMenuOpen(false)}>AI Roadmap</Link>
              <Link to="/pyq-analyzer" onClick={() => setMenuOpen(false)}>AI PYQ Analyzer</Link>
              <Link to="/notes-summarizer" onClick={() => setMenuOpen(false)}>AI Notes Summarizer</Link>
            </div>
          </div>
        </div>

        <div className="nav-actions">
          <button className="search-btn" onClick={() => setIsSearchOpen(true)} title="Search (Cmd+K)">
            <Search size={18} />
            <span className="search-shortcut">⌘K</span>
          </button>

          <button onClick={toggleTheme} className="icon-btn theme-toggle" aria-label="Toggle theme">
            {isDark ? <Sun size={24} /> : <Moon size={24} />}
          </button>
          
          <button className="icon-btn mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      <SearchBar isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
  );
};

export default Navbar;
