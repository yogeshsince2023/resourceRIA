import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <img src="/logo.png" alt="ResourceRIA Logo" className="footer-logo-img" />
        <p>For all your Academic Needs</p>
        <div className="social-links">
          <a href="#" aria-label="Instagram"><FaInstagram size={24} /></a>
          <a href="#" aria-label="LinkedIn"><FaLinkedin size={24} /></a>
          <a href="#" aria-label="GitHub"><FaGithub size={24} /></a>
        </div>
        <p className="footer-bottom">Made with 💙 By ResourceRIA Team</p>
      </div>
    </footer>
  );
};

export default Footer;
