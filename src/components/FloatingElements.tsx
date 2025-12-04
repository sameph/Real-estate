import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const FloatingElements = () => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll();
  
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -180]);

  return (
    <div ref={ref} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Floating orbs */}
      <motion.div
        className="absolute top-[20%] left-[10%] w-96 h-96 rounded-full"
        style={{
          y: y1,
          background: 'radial-gradient(circle, hsla(38, 65%, 50%, 0.08) 0%, transparent 70%)',
          filter: 'blur(60px)',
        }}
      />
      
      <motion.div
        className="absolute top-[40%] right-[5%] w-[500px] h-[500px] rounded-full"
        style={{
          y: y2,
          background: 'radial-gradient(circle, hsla(38, 65%, 50%, 0.05) 0%, transparent 70%)',
          filter: 'blur(80px)',
        }}
      />
      
      <motion.div
        className="absolute top-[60%] left-[20%] w-72 h-72 rounded-full"
        style={{
          y: y3,
          background: 'radial-gradient(circle, hsla(38, 65%, 50%, 0.06) 0%, transparent 70%)',
          filter: 'blur(50px)',
        }}
      />

      {/* Geometric shapes */}
      <motion.div
        className="absolute top-[15%] right-[20%] w-4 h-4 border border-primary/20"
        style={{ y: y1, rotate: rotate1 }}
      />
      
      <motion.div
        className="absolute top-[45%] left-[5%] w-6 h-6 border border-primary/15 rounded-full"
        style={{ y: y2 }}
      />
      
      <motion.div
        className="absolute top-[70%] right-[15%] w-3 h-3 bg-primary/10"
        style={{ y: y3, rotate: rotate2 }}
      />

      {/* Subtle lines */}
      <motion.div
        className="absolute top-[30%] left-0 w-24 h-px bg-gradient-to-r from-primary/20 to-transparent"
        style={{ y: y1 }}
      />
      
      <motion.div
        className="absolute top-[55%] right-0 w-32 h-px bg-gradient-to-l from-primary/20 to-transparent"
        style={{ y: y2 }}
      />
    </div>
  );
};

export default FloatingElements;
