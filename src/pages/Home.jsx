import { Link } from 'react-router-dom';
import { Calculator, BarChart3, BookOpen, Sparkles, ArrowRight, Compass, Users, Brain } from 'lucide-react';
import { resources } from '../data/resources';
import { contributors } from '../data/mockContributors';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <section className="hero" aria-label="Hero">
        <h1 className="hero-title heading-two-tone">
          RESOURCE<span className="highlight">RIA</span>
        </h1>
        <p className="hero-subtitle">Your one-stop hub for notes, PYQs, AI tools & learning roadmaps</p>
      </section>

      {/* About blurb for first-time visitors */}
      <section className="about-blurb" aria-label="About">
        <div className="container">
          <div className="blurb-card">
            <BookOpen size={24} className="blurb-icon" />
            <div>
              <p>
                <strong>ResourceRIA</strong> is a free, open-source academic platform built for engineering students.
                Access semester-wise notes, previous year question papers, curated roadmaps, and AI-powered study tools — all in one place.
                Whether you're preparing for exams, tracking attendance, or generating revision quizzes, RIA has you covered.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="browse-year" aria-label="Browse by Year">
        <div className="container">
          <h2>Browse by Year</h2>
          <div className="grid-container year-grid">
            {Object.entries(resources).map(([key, data]) => {
              const count = Object.keys(data.branches).length;
              return (
                <Link to={`/resources/${key}`} className="card year-card" key={key}>
                  <h3>{data.label}</h3>
                  <p className="branch-count">{count} {count === 1 ? 'Branch' : 'Branches'}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="features" aria-label="Features">
        <div className="container">
          <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Quick Tools</h2>
          <div className="grid-container feature-grid">
            <Link to="/gpa-calculator" className="card feature-card">
              <Calculator size={32} className="feature-icon" color="var(--primary-blue)" />
              <h3>GPA Calculator</h3>
              <p>Calculate your SGPA and CGPA easily and accurately.</p>
              <span className="feature-link">Try Now <ArrowRight size={16} /></span>
            </Link>
            
            <Link to="/bunk-calculator" className="card feature-card">
              <BarChart3 size={32} className="feature-icon" color="var(--primary-blue)" />
              <h3>Bunk Calculator</h3>
              <p>Know exactly how many classes you can skip safely.</p>
              <span className="feature-link">Check Now <ArrowRight size={16} /></span>
            </Link>

            <Link to="/quiz" className="card feature-card">
              <Brain size={32} className="feature-icon" color="var(--primary-blue)" />
              <h3>AI Smart Quiz</h3>
              <p>Generate 10 MCQs on any subject with AI explanations.</p>
              <span className="feature-link">Start Quiz <ArrowRight size={16} /></span>
            </Link>

            <Link to="/roadmap-generator" className="card feature-card">
              <Sparkles size={32} className="feature-icon" color="var(--primary-blue)" />
              <h3>AI Roadmap</h3>
              <p>Generate a personalized week-by-week learning plan.</p>
              <span className="feature-link">Build Roadmap <ArrowRight size={16} /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* Explore CTA Section */}
      <section className="explore-cta" aria-label="Explore">
        <div className="container">
          <Compass size={48} className="explore-icon" />
          <h2 className="heading-two-tone">
            Explore <span className="highlight">Everything</span>
          </h2>
          <p className="explore-description">
            Browse all academic resources, programming languages, learning roadmaps, and study tools in one unified view
          </p>
          <div className="explore-cta-buttons">
            <Link to="/explore" className="btn-primary">
              Start Exploring <ArrowRight size={18} />
            </Link>
            <Link to="/resources" className="btn-secondary">
              Browse by Year
            </Link>
          </div>
        </div>
      </section>

      {/* Contributors Teaser Section */}
      <section className="contributors-teaser" aria-label="Contributors">
        <div className="container">
          <Users size={40} className="teaser-icon" />
          <h2>Join Our Growing Community</h2>
          <p className="teaser-stats">
            <span className="stat-highlight">{contributors.length}+ contributors</span> sharing knowledge
          </p>
          <div className="avatar-stack">
            {contributors.slice(0, 5).map((contributor) => (
              <img 
                key={contributor.id} 
                src={contributor.avatar} 
                alt={contributor.name}
                title={contributor.name}
              />
            ))}
          </div>
          <Link to="/contributors" className="contributor-link">
            Meet all contributors <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <div className="sticky-banner" role="region" aria-label="Site notices">
        <p>Resources are still being added! Want to contribute?</p>
        <a href="https://forms.gle/5GZdMcTCzEo92fz28" target="_blank" rel="noopener noreferrer" className="btn-primary banner-btn">
          Contribute Here
        </a>
      </div>
    </div>
  );
};

export default Home;
