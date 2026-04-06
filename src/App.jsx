import { useEffect, lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { playHoverSound, playClickSound } from './utils/sound';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Breadcrumbs from './components/Breadcrumbs';
import PageWrapper from './components/PageWrapper';
import LoadingSkeleton from './components/LoadingSkeleton';

// Configure NProgress
NProgress.configure({ showSpinner: false, trickleSpeed: 200, minimum: 0.1 });

// Lazy-loaded pages — code-splitting for reduced initial bundle
const Home = lazy(() => import('./pages/Home'));
const Resources = lazy(() => import('./pages/Resources'));
const Explore = lazy(() => import('./pages/Explore'));
const YearResources = lazy(() => import('./pages/YearResources'));
const Languages = lazy(() => import('./pages/Languages'));
const Roadmaps = lazy(() => import('./pages/Roadmaps'));
const GPACalculator = lazy(() => import('./pages/GPACalculator'));
const BunkCalculator = lazy(() => import('./pages/BunkCalculator'));
const QuizGenerator = lazy(() => import('./pages/QuizGenerator'));
const RoadmapGenerator = lazy(() => import('./pages/RoadmapGenerator'));
const PYQAnalyzer = lazy(() => import('./pages/PYQAnalyzer'));
const NotesSummarizer = lazy(() => import('./pages/NotesSummarizer'));
const ScientificCalculator = lazy(() => import('./pages/ScientificCalculator'));
const Contacts = lazy(() => import('./pages/Contacts'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ComingSoon = lazy(() => import('./components/ComingSoon'));

function App() {
  const location = useLocation();

  // NProgress loading bar on route change
  useEffect(() => {
    NProgress.start();
    // Small delay so it feels responsive, then finish
    const timer = setTimeout(() => NProgress.done(), 300);
    return () => {
      clearTimeout(timer);
      NProgress.done();
    };
  }, [location.pathname]);

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
      {/* Skip-to-main accessibility link (WCAG 2.4.1) */}
      <a href="#main-content" className="skip-to-content">Skip to main content</a>
      
      <Navbar />
      <Breadcrumbs />
      <main id="main-content" tabIndex="-1">
        <Suspense fallback={<LoadingSkeleton />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
              <Route path="/resources" element={<PageWrapper><Resources /></PageWrapper>} />
              <Route path="/explore" element={<PageWrapper><Explore /></PageWrapper>} />
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
              <Route path="/scientific-calculator" element={<PageWrapper><ScientificCalculator /></PageWrapper>} />
              <Route path="/contacts" element={<PageWrapper><Contacts /></PageWrapper>} />
              <Route path="/about-us" element={<PageWrapper><ComingSoon /></PageWrapper>} />
              <Route path="*" element={<PageWrapper><NotFound /></PageWrapper>} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}

export default App;
