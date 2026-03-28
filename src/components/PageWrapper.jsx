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
