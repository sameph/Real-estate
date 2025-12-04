import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useRef, useState } from 'react';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import AnimatedText from './AnimatedText';
import heroImage from '@/assets/hero-apartment.jpg';
import bedroomImage from '@/assets/bedroom.jpg';
import kitchenImage from '@/assets/kitchen.jpg';
import terraceImage from '@/assets/terrace.jpg';

const images = [
  { src: heroImage, title: 'Living Space', category: 'Interior' },
  { src: bedroomImage, title: 'Master Suite', category: 'Bedroom' },
  { src: kitchenImage, title: 'Gourmet Kitchen', category: 'Kitchen' },
  { src: terraceImage, title: 'Rooftop Views', category: 'Terrace' },
];

const Gallery = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === 0 ? images.length - 1 : selectedIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex(selectedIndex === images.length - 1 ? 0 : selectedIndex + 1);
    }
  };

  return (
    <>
      <section
        id="gallery"
        ref={containerRef}
        className="relative py-32 lg:py-48 overflow-hidden"
      >
        {/* Background Elements */}
        <motion.div
          className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5 }}
        />

        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
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
                  Gallery
                </span>
              </motion.div>

              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl">
                <AnimatedText text="Explore Our" delay={0.1} />
                <br />
                <span className="text-gradient">
                  <AnimatedText text="Spaces" delay={0.3} />
                </span>
              </h2>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-muted-foreground max-w-md mt-6 md:mt-0"
            >
              Every corner tells a story of elegance and thoughtful design.
            </motion.p>
          </div>

          {/* Gallery Grid with Masonry-like layout */}
          <div className="grid md:grid-cols-12 gap-4 md:gap-6">
            {images.map((image, index) => {
              const gridClasses = [
                'md:col-span-7 md:row-span-2',
                'md:col-span-5',
                'md:col-span-5',
                'md:col-span-12',
              ];
              
              const aspectClasses = [
                'aspect-[4/5]',
                'aspect-square',
                'aspect-square',
                'aspect-[21/9]',
              ];

              return (
                <motion.div
                  key={image.title}
                  initial={{ opacity: 0, y: 80, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{
                    delay: index * 0.15,
                    duration: 1,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  className={`group relative cursor-pointer ${gridClasses[index]}`}
                  onClick={() => setSelectedIndex(index)}
                >
                  <div className={`relative overflow-hidden rounded-2xl ${aspectClasses[index]}`}>
                    {/* Image with parallax */}
                    <motion.div
                      className="absolute inset-0"
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <img
                        src={image.src}
                        alt={image.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />

                    {/* Content reveal */}
                    <motion.div
                      className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end"
                      initial={false}
                    >
                      <motion.span 
                        className="text-primary text-xs tracking-[0.3em] uppercase mb-2 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0"
                      >
                        {image.category}
                      </motion.span>
                      <motion.h3 
                        className="font-serif text-2xl md:text-3xl text-foreground opacity-0 group-hover:opacity-100 transition-all duration-500 delay-75 translate-y-4 group-hover:translate-y-0"
                      >
                        {image.title}
                      </motion.h3>
                    </motion.div>

                    {/* Animated border */}
                    <div className="absolute inset-0 rounded-2xl border-2 border-primary/0 group-hover:border-primary/40 transition-all duration-700" />
                    
                    {/* Corner accents */}
                    <svg className="absolute top-0 left-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <motion.path
                        d="M 0 20 L 0 0 L 20 0"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        whileHover={{ pathLength: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    </svg>
                    <svg className="absolute bottom-0 right-0 w-16 h-16 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rotate-180">
                      <motion.path
                        d="M 0 20 L 0 0 L 20 0"
                        fill="none"
                        stroke="hsl(var(--primary))"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        whileHover={{ pathLength: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    </svg>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-background/98 backdrop-blur-2xl flex items-center justify-center"
            onClick={() => setSelectedIndex(null)}
          >
            {/* Close button */}
            <motion.button
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: 90 }}
              transition={{ delay: 0.2 }}
              className="absolute top-6 right-6 p-3 rounded-full bg-card/50 border border-border text-foreground hover:text-primary hover:border-primary transition-colors z-10"
              onClick={() => setSelectedIndex(null)}
            >
              <X size={24} />
            </motion.button>

            {/* Navigation */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="absolute left-4 md:left-8 p-3 rounded-full bg-card/50 border border-border text-foreground hover:text-primary hover:border-primary transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
            >
              <ArrowLeft size={24} />
            </motion.button>
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="absolute right-4 md:right-8 p-3 rounded-full bg-card/50 border border-border text-foreground hover:text-primary hover:border-primary transition-colors z-10"
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
            >
              <ArrowRight size={24} />
            </motion.button>

            {/* Image */}
            <motion.div
              key={selectedIndex}
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative max-w-[90vw] max-h-[80vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={images[selectedIndex].src}
                alt={images[selectedIndex].title}
                className="max-w-full max-h-[80vh] object-contain rounded-2xl"
              />
            </motion.div>

            {/* Caption */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.2 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
            >
              <span className="text-primary text-xs tracking-[0.3em] uppercase">
                {images[selectedIndex].category}
              </span>
              <h3 className="font-serif text-2xl text-foreground mt-2">
                {images[selectedIndex].title}
              </h3>
              <p className="text-muted-foreground text-sm mt-2">
                {selectedIndex + 1} / {images.length}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Gallery;
