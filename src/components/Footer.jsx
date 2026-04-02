import { Link } from 'react-router-dom';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-content footer-grid container">
        {/* Brand Column */}
        <div className="footer-brand">
          <img src="/logo.png" alt="ResourceRIA Logo" className="footer-logo-img" />
          <p className="footer-tagline">For all your Academic Needs</p>
          <div className="social-links">
            <a href="https://github.com/yogeshsince2023" target="_blank" rel="noopener noreferrer" aria-label="Follow ResourceRIA on GitHub">
              <FaGithub size={24} />
            </a>
            <a href="https://www.instagram.com/kasamseyogestaparia" target="_blank" rel="noopener noreferrer" aria-label="Follow yogesh on Instagram">
              <FaInstagram size={24} />
            </a>
            <a href="https://www.linkedin.com/in/yogesh-taparia-a99513282/" target="_blank" rel="noopener noreferrer" aria-label="Follow yogesh on LinkedIn">
              <FaLinkedin size={24} />
            </a>
          </div>
        </div>

        {/* Resources Column */}
        <div className="footer-column">
          <h4>Resources</h4>
          <Link to="/resources">Academic Resources</Link>
          <Link to="/languages">Languages</Link>
          <Link to="/roadmaps">Roadmaps</Link>
          <Link to="/explore">Explore All</Link>
        </div>

        {/* Tools Column */}
        <div className="footer-column">
          <h4>Tools</h4>
          <Link to="/gpa-calculator">GPA Calculator</Link>
          <Link to="/bunk-calculator">Bunk Calculator</Link>
          <Link to="/scientific-calculator">Scientific Calculator</Link>
          <Link to="/quiz">AI Quiz</Link>
        </div>

        {/* Platform Column */}
        <div className="footer-column">
          <h4>Platform</h4>
          <Link to="/contributors">Contributors</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          <Link to="/badges">Badges</Link>
          <a href="https://forms.gle/5GZdMcTCzEo92fz28" target="_blank" rel="noopener noreferrer">Contribute</a>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <p>Made with 💙 By ResourceRIA Team</p>
      </div>
    </footer>
  );
};

export default Footer;
