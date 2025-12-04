import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import { Button } from './ui/button';
import AnimatedText from './AnimatedText';
import MagneticButton from './MagneticButton';

const contactInfo = [
  {
    icon: MapPin,
    label: 'Address',
    value: 'Bole, Addis Ababa, Ethiopia',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+251 911 123 456',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'stay@balhir.com',
  },
  {
    icon: Clock,
    label: 'Check-in',
    value: '2:00 PM - 10:00 PM',
  },
];

const Location = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });
  const [mapToken, setMapToken] = useState('');

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  // Addis Ababa coordinates (Bole area)
  const coordinates = { lng: 38.7987, lat: 9.0054 };

  useEffect(() => {
    if (!mapContainerRef.current || !mapToken) return;

    // Dynamically import mapbox-gl
    import('mapbox-gl').then((mapboxgl) => {
      import('mapbox-gl/dist/mapbox-gl.css');

      mapboxgl.default.accessToken = mapToken;

      const map = new mapboxgl.default.Map({
        container: mapContainerRef.current!,
        style: 'mapbox://styles/mapbox/dark-v11',
        center: [coordinates.lng, coordinates.lat],
        zoom: 14,
        pitch: 45,
      });

      // Add marker
      const markerEl = document.createElement('div');
      markerEl.className = 'custom-marker';
      markerEl.innerHTML = `
        <div class="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
          <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <div class="w-3 h-3 rounded-full bg-background"></div>
          </div>
        </div>
      `;

      new mapboxgl.default.Marker(markerEl)
        .setLngLat([coordinates.lng, coordinates.lat])
        .addTo(map);

      // Add navigation control
      map.addControl(new mapboxgl.default.NavigationControl(), 'top-right');

      return () => map.remove();
    });
  }, [mapToken]);

  return (
    <section
      id="location"
      ref={containerRef}
      className="relative py-32 lg:py-48 overflow-hidden bg-card/30"
    >
      {/* Animated background */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
      >
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary/5 blur-[120px]" />
      </motion.div>

      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <motion.div 
              className="h-px w-12 bg-primary"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            />
            <span className="text-primary font-medium tracking-[0.3em] uppercase text-sm">
              Location
            </span>
            <motion.div 
              className="h-px w-12 bg-primary"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
          </motion.div>

          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl mb-6">
            <AnimatedText text="Find" delay={0.1} />
            {' '}
            <span className="text-gradient">
              <AnimatedText text="Us" delay={0.2} />
            </span>
          </h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-muted-foreground text-lg"
          >
            Located in the prestigious Bole district, just minutes from the airport 
            and the city's finest attractions.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          {/* Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1, delayChildren: 0.2 },
              },
            }}
            className="space-y-4"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.label}
                variants={{
                  hidden: { opacity: 0, x: -40, scale: 0.95 },
                  visible: { 
                    opacity: 1, 
                    x: 0,
                    scale: 1,
                    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
                  },
                }}
                whileHover={{ x: 8, transition: { duration: 0.3 } }}
                className="flex items-start gap-4 p-5 rounded-xl bg-background/50 border border-border/50 hover:border-primary/50 transition-all duration-300 group cursor-default"
              >
                <motion.div 
                  className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors duration-300"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                >
                  <info.icon className="w-5 h-5 text-primary" />
                </motion.div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
                    {info.label}
                  </p>
                  <p className="text-foreground font-medium">{info.value}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="pt-4"
            >
              <MagneticButton strength={0.1}>
                <Button variant="gold" size="lg" className="w-full group">
                  <span>Get Directions</span>
                  <ExternalLink className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </Button>
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ y }}
            className="lg:col-span-2 relative"
          >
            {!mapToken ? (
              <motion.div 
                className="aspect-[16/10] rounded-2xl bg-card border border-border overflow-hidden flex flex-col items-center justify-center p-8"
                whileHover={{ borderColor: 'hsl(var(--primary) / 0.3)' }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  animate={{ 
                    scale: [1, 1.1, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <MapPin className="w-16 h-16 text-primary/50 mb-4" />
                </motion.div>
                <p className="text-muted-foreground text-center mb-4">
                  Enter your Mapbox public token to view the interactive map
                </p>
                <input
                  type="text"
                  placeholder="pk.your_mapbox_token..."
                  className="w-full max-w-md px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/50 transition-all duration-300"
                  onChange={(e) => setMapToken(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-3">
                  Get your token at{' '}
                  <a
                    href="https://mapbox.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    mapbox.com
                  </a>
                </p>
              </motion.div>
            ) : (
              <div
                ref={mapContainerRef}
                className="aspect-[16/10] rounded-2xl overflow-hidden border border-border hover:border-primary/30 transition-colors duration-500"
              />
            )}

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="absolute -bottom-6 left-6 glass rounded-xl p-5 glow"
            >
              <p className="font-serif text-lg text-foreground">Balhir Apartment</p>
              <p className="text-sm text-muted-foreground">Bole • Addis Ababa</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Location;
