import { motion } from 'framer-motion';

const fadeTransition = {
  initial: { opacity: 1 },
  animate: { opacity: 0 },
  exit: { opacity: 1 },
};

const Transition = () => {
  return (
    <motion.div
      className='fixed top-0 left-0 w-full h-full bg-[#1f2e3b]'
      variants={fadeTransition}
      initial='initial'
      animate='animate'
      exit='exit'
      transition={{ delay: 0.2, duration: 0.6, ease: 'easeInOut' }}
    />
  );
};

export default Transition;
