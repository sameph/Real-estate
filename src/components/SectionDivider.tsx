import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface SectionDividerProps {
  variant?: 'line' | 'wave' | 'dots' | 'gradient';
}

const SectionDivider = ({ variant = 'line' }: SectionDividerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scaleX = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  if (variant === 'wave') {
    return (
      <div ref={ref} className="relative h-32 overflow-hidden">
        <motion.svg
          className="absolute inset-0 w-full h-full"
          style={{ opacity }}
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M0,60 C200,120 400,0 600,60 C800,120 1000,0 1200,60"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 2, ease: 'easeInOut' }}
            viewport={{ once: true }}
          />
        </motion.svg>
      </div>
    );
  }

  if (variant === 'dots') {
    return (
      <div ref={ref} className="flex items-center justify-center py-16 gap-4">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full bg-primary"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'gradient') {
    return (
      <div ref={ref} className="relative h-px">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary to-transparent"
          style={{ scaleX, opacity }}
        />
      </div>
    );
  }

  // Default: line
  return (
    <div ref={ref} className="relative h-px my-8 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-primary/50 origin-left"
        style={{ scaleX }}
      />
    </div>
  );
};

export default SectionDivider;
