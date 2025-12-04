import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  type?: 'words' | 'chars' | 'lines';
  once?: boolean;
}

const AnimatedText = ({ 
  text, 
  className = '', 
  delay = 0,
  type = 'words',
  once = true,
}: AnimatedTextProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: '-50px' });

  if (type === 'chars') {
    const chars = text.split('');
    return (
      <span ref={ref} className={`inline-block ${className}`}>
        {chars.map((char, index) => (
          <motion.span
            key={index}
            className="inline-block"
            initial={{ opacity: 0, y: 50, rotateX: -90 }}
            animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
            transition={{
              duration: 0.5,
              delay: delay + index * 0.02,
              ease: [0.25, 0.1, 0.25, 1],
            }}
            style={{ perspective: '1000px' }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        ))}
      </span>
    );
  }

  if (type === 'lines') {
    const lines = text.split('\n');
    return (
      <span ref={ref} className={className}>
        {lines.map((line, index) => (
          <span key={index} className="block overflow-hidden">
            <motion.span
              className="block"
              initial={{ y: '100%' }}
              animate={isInView ? { y: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: delay + index * 0.15,
                ease: [0.25, 0.1, 0.25, 1],
              }}
            >
              {line}
            </motion.span>
          </span>
        ))}
      </span>
    );
  }

  // Default: words
  const words = text.split(' ');
  return (
    <span ref={ref} className={`inline ${className}`}>
      {words.map((word, index) => (
        <span key={index} className="inline-block overflow-hidden mr-[0.25em]">
          <motion.span
            className="inline-block"
            initial={{ y: '100%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: delay + index * 0.05,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

export default AnimatedText;
