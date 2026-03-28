import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { playHoverSound, playClickSound } from './utils/sound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageWrapper from './components/PageWrapper';

// Pages will be imported here
import Home from './pages/Home';
import Resources from './pages/Resources';
import YearResources from './pages/YearResources';
import Languages from './pages/Languages';
import Roadmaps from './pages/Roadmaps';
import GPACalculator from './pages/GPACalculator';
import BunkCalculator from './pages/BunkCalculator';
import QuizGenerator from './pages/QuizGenerator';
import RoadmapGenerator from './pages/RoadmapGenerator';
import PYQAnalyzer from './pages/PYQAnalyzer';
import NotesSummarizer from './pages/NotesSummarizer';
import ComingSoon from './components/ComingSoon';

function App() {
  const location = useLocation();

  useEffect(() => {
    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, .card, select, input')) {
        playHoverSound();
      }
    };
    const handleClick = (e) => {
      if (e.target.closest('a, button, select, input')) {
        playClickSound();
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
            <Route path="/resources" element={<PageWrapper><Resources /></PageWrapper>} />
            <Route path="/resources/:year" element={<PageWrapper><YearResources /></PageWrapper>} />
            <Route path="/languages" element={<PageWrapper><Languages /></PageWrapper>} />
            <Route path="/roadmaps" element={<PageWrapper><Roadmaps /></PageWrapper>} />
            <Route path="/timetable" element={<PageWrapper><ComingSoon /></PageWrapper>} />
            <Route path="/gpa-calculator" element={<PageWrapper><GPACalculator /></PageWrapper>} />
            <Route path="/bunk-calculator" element={<PageWrapper><BunkCalculator /></PageWrapper>} />
            <Route path="/quiz" element={<PageWrapper><QuizGenerator /></PageWrapper>} />
            <Route path="/roadmap-generator" element={<PageWrapper><RoadmapGenerator /></PageWrapper>} />
            <Route path="/pyq-analyzer" element={<PageWrapper><PYQAnalyzer /></PageWrapper>} />
            <Route path="/notes-summarizer" element={<PageWrapper><NotesSummarizer /></PageWrapper>} />
            <Route path="/about-us" element={<PageWrapper><ComingSoon /></PageWrapper>} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}

export default App;
