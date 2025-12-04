import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Sparkles, Award, Heart } from 'lucide-react';
import AnimatedText from './AnimatedText';
import ParallaxImage from './ParallaxImage';
import bedroomImage from '@/assets/bedroom.jpg';

const stats = [
  { number: '150+', label: 'Happy Guests', icon: Heart },
  { number: '5', label: 'Star Rating', icon: Award },
  { number: '24/7', label: 'Concierge', icon: Sparkles },
];

const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const badgeScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10]);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative py-32 lg:py-48 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
      >
        <motion.div 
          className="absolute top-1/2 left-1/4 w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsla(38, 65%, 50%, 0.06) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Image Column */}
          <motion.div
            className="relative"
            style={{ y: imageY }}
          >
            {/* Main Image with parallax */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
              whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative rounded-2xl overflow-hidden"
              style={{ perspective: '1000px' }}
            >
              <ParallaxImage
                src={bedroomImage}
                alt="Luxury Bedroom"
                className="aspect-[3/4] rounded-2xl"
                speed={0.15}
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              
              {/* Hover reveal */}
              <motion.div
                className="absolute inset-0 bg-primary/10 opacity-0 hover:opacity-100 transition-opacity duration-500"
              />
            </motion.div>

            {/* Floating Badge with 3D effect */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotateX: 45 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{ scale: badgeScale, rotateX }}
              className="absolute -bottom-8 -right-4 md:right-8 glass rounded-2xl p-6 glow"
            >
              <motion.p 
                className="text-5xl font-serif text-primary mb-1"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
              >
                12+
              </motion.p>
              <p className="text-sm text-muted-foreground tracking-wide">Years of Excellence</p>
            </motion.div>

            {/* Decorative Frame with draw animation */}
            <svg
              className="absolute -top-4 -left-4 w-32 h-32 text-primary/50"
              viewBox="0 0 100 100"
            >
              <motion.path
                d="M 0 30 L 0 0 L 30 0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.3, ease: 'easeInOut' }}
              />
            </svg>
            
            {/* Bottom right frame */}
            <svg
              className="absolute -bottom-4 -right-4 w-32 h-32 text-primary/50 rotate-180"
              viewBox="0 0 100 100"
            >
              <motion.path
                d="M 0 30 L 0 0 L 30 0"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, delay: 0.5, ease: 'easeInOut' }}
              />
            </svg>
          </motion.div>

          {/* Content Column */}
          <motion.div className="lg:pl-8" style={{ y: textY }}>
            {/* Section Label */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex items-center gap-4 mb-6"
            >
              <motion.div 
                className="h-px w-12 bg-primary"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              />
              <span className="text-primary font-medium tracking-[0.3em] uppercase text-sm">
                About Us
              </span>
            </motion.div>

            {/* Title with animated text */}
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-8 leading-tight">
              <AnimatedText text="A Haven of" delay={0.2} />
              <br />
              <span className="text-gradient">
                <AnimatedText text="Sophistication" delay={0.4} />
              </span>
            </h2>

            {/* Description paragraphs */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-muted-foreground text-lg leading-relaxed mb-6"
            >
              Nestled in the vibrant heart of Addis Ababa, Balhir Apartment offers 
              an unparalleled blend of luxury and comfort. Our meticulously designed 
              spaces reflect the rich cultural heritage of Ethiopia while embracing 
              contemporary elegance.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-muted-foreground leading-relaxed mb-12"
            >
              Every detail has been carefully curated to ensure your stay exceeds 
              expectations—from premium amenities to breathtaking city views. 
              Experience the warmth of Ethiopian hospitality in a setting that 
              feels like home.
            </motion.p>

            {/* Stats with stagger animation */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.15, delayChildren: 0.6 },
                },
              }}
              className="grid grid-cols-3 gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  variants={{
                    hidden: { opacity: 0, y: 40, scale: 0.9 },
                    visible: { 
                      opacity: 1, 
                      y: 0, 
                      scale: 1,
                      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
                    },
                  }}
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                  className="text-center group cursor-default"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                  >
                    <stat.icon className="w-6 h-6 text-primary mx-auto mb-3 group-hover:text-primary-foreground transition-colors" />
                  </motion.div>
                  <motion.p 
                    className="font-serif text-3xl md:text-4xl text-foreground mb-1"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.8 + index * 0.1, type: 'spring' }}
                  >
                    {stat.number}
                  </motion.p>
                  <p className="text-xs text-muted-foreground tracking-wider uppercase">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
