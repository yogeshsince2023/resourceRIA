import { Link } from 'react-router-dom';
import { Calculator, Calendar, ArrowRight } from 'lucide-react';
import { resources } from '../data/resources';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <h1 className="hero-title heading-two-tone">
          RESOURCE<span className="highlight">RIA</span>
        </h1>
        <p className="hero-subtitle">For all your Academic Needs</p>
      </section>

      <section className="browse-year">
        <div className="container">
          <h2>Browse by Year</h2>
          <div className="grid-container year-grid">
            {Object.entries(resources).map(([key, data]) => (
              <Link to={`/resources`} className="card year-card" key={key}>
                <h3>{data.label}</h3>
                <p className="branch-count">{Object.keys(data.branches).length} Branches</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="grid-container feature-grid">
            <Link to="/gpa-calculator" className="card feature-card">
              <Calculator size={32} className="feature-icon" color="var(--primary-blue)" />
              <h3>GPA Calculator</h3>
              <p>Calculate your SGPA and CGPA easily and accurately.</p>
              <span className="feature-link">Try Now <ArrowRight size={16} /></span>
            </Link>
            
            <Link to="/timetable" className="card feature-card">
              <Calendar size={32} className="feature-icon" color="var(--primary-blue)" />
              <h3>Time Table</h3>
              <p>Check your class timetable and track events.</p>
              <span className="feature-link">View Timetable <ArrowRight size={16} /></span>
            </Link>
          </div>
        </div>
      </section>

      <div className="sticky-banner">
        <p>Resources are still being added! Want to contribute?</p>
        <a href="https://forms.gle/5GZdMcTCzEo92fz28" target="_blank" rel="noopener noreferrer" className="btn-primary banner-btn">
          Contribute Here
        </a>
      </div>
    </div>
  );
};

export default Home;
