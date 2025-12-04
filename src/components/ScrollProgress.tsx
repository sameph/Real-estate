import { motion, useScroll, useSpring } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Top progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-primary origin-left z-[100]"
        style={{ scaleX }}
      />
      
      {/* Side progress indicator */}
      <motion.div
        className="fixed right-6 top-1/2 -translate-y-1/2 w-[2px] h-32 bg-border/30 rounded-full overflow-hidden z-50 hidden lg:block"
      >
        <motion.div
          className="w-full bg-primary rounded-full origin-top"
          style={{ scaleY: scaleX }}
        />
      </motion.div>
    </>
  );
};

export default ScrollProgress;
