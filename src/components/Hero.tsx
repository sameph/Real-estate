import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import MagneticButton from './MagneticButton';
import heroImage from '@/assets/hero-apartment.jpg';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.3]);
  const textY = useTransform(scrollYProgress, [0, 0.5], ['0%', '30%']);
  const blur = useTransform(scrollYProgress, [0, 0.5], [0, 10]);
  
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

  // Mouse parallax for decorative elements
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const letters = 'Balhir'.split('');

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative h-[120vh] w-full overflow-hidden"
    >
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y: smoothY, scale: smoothScale }}
        className="absolute inset-0 z-0"
      >
        <img
          src={heroImage}
          alt="Balhir Luxury Apartment"
          className="w-full h-full object-cover"
        />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/40 to-background"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0.6]) }}
        />
      </motion.div>

      {/* Animated grain overlay */}
      <div className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative Elements with Mouse Parallax */}
      <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ 
            x: mousePosition.x * 30,
            y: mousePosition.y * 30,
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 30 }}
          className="absolute top-20 right-10 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsla(38, 65%, 50%, 0.12) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }}
        />
        <motion.div
          animate={{ 
            x: mousePosition.x * -20,
            y: mousePosition.y * -20,
          }}
          transition={{ type: 'spring', stiffness: 50, damping: 30 }}
          className="absolute bottom-40 left-10 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, hsla(38, 65%, 50%, 0.08) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        
        {/* Floating geometric elements */}
        <motion.div
          animate={{ 
            x: mousePosition.x * 15,
            y: mousePosition.y * 15,
            rotate: mousePosition.x * 10,
          }}
          className="absolute top-1/4 right-[15%] w-20 h-20 border border-primary/20 rotate-45"
        />
        <motion.div
          animate={{ 
            x: mousePosition.x * -10,
            y: mousePosition.y * -10,
          }}
          className="absolute bottom-1/3 left-[10%] w-3 h-3 bg-primary/30 rounded-full"
        />
      </div>

      {/* Content */}
      <motion.div
        style={{ 
          opacity,
          y: textY,
          filter: useTransform(blur, (v) => `blur(${v}px)`),
        }}
        className="relative z-20 h-screen flex flex-col items-center justify-center px-6"
      >
        <div className="text-center max-w-5xl mx-auto">
          {/* Subtitle with stagger */}
          <motion.div className="overflow-hidden mb-6">
            <motion.p
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-primary font-medium tracking-[0.4em] uppercase text-sm"
            >
              Welcome to
            </motion.p>
          </motion.div>

          {/* Main Title with Character Animation */}
          <div className="overflow-hidden perspective-1000">
            <motion.h1
              className="font-serif text-7xl md:text-9xl lg:text-[12rem] font-medium tracking-tight mb-8 leading-none"
            >
              <span className="inline-flex">
                {letters.map((letter, i) => (
                  <motion.span
                    key={i}
                    initial={{ y: 200, opacity: 0, rotateX: -80 }}
                    animate={{ y: 0, opacity: 1, rotateX: 0 }}
                    transition={{
                      duration: 1.2,
                      delay: 0.5 + i * 0.08,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="inline-block origin-bottom"
                    style={{ perspective: '1000px' }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
              <motion.span
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.5, type: 'spring' }}
                className="text-primary inline-block"
              >
                .
              </motion.span>
            </motion.h1>
          </div>

          {/* Tagline with word reveal */}
          <motion.div className="overflow-hidden mb-12">
            <motion.p
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            >
              Experience luxury living in the heart of Addis Ababa. Where modern elegance 
              meets Ethiopian hospitality.
            </motion.p>
          </motion.div>

          {/* CTA Buttons with magnetic effect */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <MagneticButton strength={0.15}>
              <Button variant="gold" size="xl" className="min-w-[200px] group">
                <span>Book Your Stay</span>
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </MagneticButton>
            <MagneticButton strength={0.15}>
              <Button variant="hero" size="xl" className="min-w-[200px]">
                Explore
              </Button>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-20 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-3 cursor-pointer group"
          >
            <motion.span 
              className="text-xs tracking-[0.3em] uppercase text-muted-foreground group-hover:text-primary transition-colors"
            >
              Scroll to discover
            </motion.span>
            <motion.div className="w-6 h-10 rounded-full border-2 border-primary/30 flex items-start justify-center p-2 group-hover:border-primary/60 transition-colors">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1 h-1 rounded-full bg-primary"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Side Text with reveal */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="hidden lg:block absolute left-8 top-1/2 -translate-y-1/2 z-20"
      >
        <p
          className="text-xs tracking-[0.5em] uppercase text-muted-foreground"
          style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
        >
          Addis Ababa • Ethiopia
        </p>
      </motion.div>

      {/* Decorative corner elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="hidden lg:block absolute top-8 left-8 w-16 h-16 border-l border-t border-primary/30 z-20"
      />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 1 }}
        className="hidden lg:block absolute bottom-8 right-8 w-16 h-16 border-r border-b border-primary/30 z-20"
      />
    </section>
  );
};

export default Hero;
