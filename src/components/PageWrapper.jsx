import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const pageVariants = {
  initial: { opacity: 0, y: 15, scale: 0.98 },
  in: { opacity: 1, y: 0, scale: 1 },
  out: { opacity: 0, y: -15, scale: 0.98 }
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4
};

const PageWrapper = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    let title = 'ResourceRIA | ' + location.pathname.substring(1).split('/').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' / ');
    if (location.pathname === '/') title = 'ResourceRIA | Academic & Tool Hub';
    if (location.pathname.startsWith('/resources/year')) title = 'ResourceRIA | Subjects';
    if (location.pathname === '/gpa-calculator') title = 'ResourceRIA | GPA Calculator';
    if (location.pathname === '/bunk-calculator') title = 'ResourceRIA | Bunk Calculator';
    if (location.pathname === '/explore') title = 'ResourceRIA | Explore';
    if (location.pathname === '/leaderboard') title = 'ResourceRIA | Leaderboard';
    if (location.pathname === '/contributors') title = 'ResourceRIA | Contributors';
    if (location.pathname === '/upload') title = 'ResourceRIA | Upload Resources';
    if (location.pathname === '/my-uploads') title = 'ResourceRIA | My Uploads';
    if (location.pathname === '/badges') title = 'ResourceRIA | Badges';
    if (location.pathname === '/scientific-calculator') title = 'ResourceRIA | Scientific Calculator';
    if (location.pathname === '/contacts') title = 'ResourceRIA | Contacts';
    
    document.title = title;
  }, [location.pathname]);

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      style={{ width: '100%', display: 'flex', flexDirection: 'column', flexGrow: 1 }}
    >
      {children}
    </motion.div>
  );
};

PageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageWrapper;
