import { FaGithub } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-content">
        <img src="/logo.png" alt="ResourceRIA Logo" className="footer-logo-img" />
        <p>For all your Academic Needs</p>
        <div className="social-links">
          <a href="https://github.com/resourceria" target="_blank" rel="noopener noreferrer" aria-label="Follow ResourceRIA on GitHub">
            <FaGithub size={24} />
          </a>
        </div>
        <p className="footer-bottom">Made with 💙 By ResourceRIA Team</p>
      </div>
    </footer>
  );
};

export default Footer;
