import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import {
  Wifi,
  Car,
  Utensils,
  Shield,
  Tv,
  Wind,
  Coffee,
  Sparkles,
} from 'lucide-react';

const amenities = [
  {
    icon: Wifi,
    title: 'High-Speed WiFi',
    description: 'Stay connected with lightning-fast internet throughout.',
  },
  {
    icon: Car,
    title: 'Private Parking',
    description: 'Secure underground parking for your peace of mind.',
  },
  {
    icon: Utensils,
    title: 'Gourmet Kitchen',
    description: 'Fully equipped kitchen with premium appliances.',
  },
  {
    icon: Shield,
    title: '24/7 Security',
    description: 'Round-the-clock security and surveillance systems.',
  },
  {
    icon: Tv,
    title: 'Smart Entertainment',
    description: 'Smart TV with streaming services and sound system.',
  },
  {
    icon: Wind,
    title: 'Climate Control',
    description: 'Individual climate control in every room.',
  },
  {
    icon: Coffee,
    title: 'Premium Coffee',
    description: 'Ethiopian coffee experience with premium equipment.',
  },
  {
    icon: Sparkles,
    title: 'Daily Housekeeping',
    description: 'Professional cleaning to keep your space pristine.',
  },
];

const Amenities = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section
      id="amenities"
      ref={containerRef}
      className="relative py-32 overflow-hidden bg-card/30"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-primary font-medium tracking-[0.3em] uppercase text-sm"
          >
            Amenities
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="font-serif text-4xl md:text-5xl lg:text-6xl mt-4 mb-6"
          >
            Everything You <span className="text-gradient">Need</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-muted-foreground text-lg"
          >
            Thoughtfully curated amenities designed to make your stay comfortable 
            and memorable.
          </motion.p>
        </div>

        {/* Amenities Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {amenities.map((amenity, index) => (
            <motion.div
              key={amenity.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.1 * index,
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
              }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="group relative p-8 rounded-2xl bg-background/50 border border-border/50 hover:border-primary/50 transition-all duration-500"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 rounded-2xl bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300"
                >
                  <amenity.icon className="w-7 h-7 text-primary" />
                </motion.div>

                <h3 className="font-serif text-xl mb-3 group-hover:text-primary transition-colors duration-300">
                  {amenity.title}
                </h3>

                <p className="text-muted-foreground text-sm leading-relaxed">
                  {amenity.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Amenities;
