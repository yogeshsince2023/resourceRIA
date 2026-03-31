import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer-content">
        <img src="/logo.png" alt="ResourceRIA Logo" className="footer-logo-img" />
        <p>For all your Academic Needs</p>
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
        <p className="footer-bottom">Made with 💙 By ResourceRIA Team</p>
      </div>
    </footer>
  );
};

export default Footer;
