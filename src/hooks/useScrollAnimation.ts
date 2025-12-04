import { useScroll, useTransform, useSpring, MotionValue } from 'framer-motion';
import { useRef, RefObject } from 'react';

interface ScrollAnimationOptions {
  offset?: [string, string];
  smooth?: number;
}

export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const { offset = ['start end', 'end start'], smooth = 50 } = options;
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as any,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: smooth,
    restDelta: 0.001,
  });

  return { ref, scrollYProgress, smoothProgress };
};

export const useParallax = (
  value: MotionValue<number>,
  distance: number
) => {
  return useTransform(value, [0, 1], [-distance, distance]);
};

export const useParallaxRange = (
  value: MotionValue<number>,
  inputRange: number[],
  outputRange: (string | number)[]
) => {
  return useTransform(value, inputRange, outputRange);
};

// Reveal animation variants
export const revealVariants = {
  hidden: { 
    opacity: 0, 
    y: 80,
    filter: 'blur(10px)',
  },
  visible: { 
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 1,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const slideRevealVariants = {
  hidden: { 
    opacity: 0, 
    x: -100,
    rotateY: -15,
  },
  visible: { 
    opacity: 1, 
    x: 0,
    rotateY: 0,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const scaleRevealVariants = {
  hidden: { 
    opacity: 0, 
    scale: 0.8,
    filter: 'blur(20px)',
  },
  visible: { 
    opacity: 1, 
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 1,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

export const staggerItem = {
  hidden: { 
    opacity: 0, 
    y: 60,
    scale: 0.95,
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

// Text character animation
export const letterAnimation = {
  hidden: { 
    opacity: 0, 
    y: 50,
    rotateX: -90,
  },
  visible: (i: number) => ({
    opacity: 1, 
    y: 0,
    rotateX: 0,
    transition: {
      duration: 0.5,
      delay: i * 0.03,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};

// Word animation
export const wordAnimation = {
  hidden: { 
    opacity: 0, 
    y: 30,
    filter: 'blur(4px)',
  },
  visible: (i: number) => ({
    opacity: 1, 
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.6,
      delay: i * 0.08,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
};
