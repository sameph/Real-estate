import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Instagram, Facebook, Twitter, ArrowUp, Heart } from 'lucide-react';
import MagneticButton from './MagneticButton';

const Footer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer ref={containerRef} className="relative py-20 border-t border-border/50 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-card/50 to-transparent pointer-events-none" />
      
      <motion.div 
        className="container mx-auto px-6 relative"
        style={{ opacity, y }}
      >
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          {/* Brand */}
          <motion.div 
            className="md:col-span-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <a href="#home" className="font-serif text-4xl tracking-wide inline-block mb-6 group">
              <span className="group-hover:text-primary transition-colors duration-300">Balhir</span>
              <motion.span 
                className="text-primary inline-block"
                whileHover={{ scale: 1.5, rotate: 180 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                .
              </motion.span>
            </a>
            <p className="text-muted-foreground max-w-sm leading-relaxed mb-6">
              Experience luxury living in the heart of Addis Ababa. Where modern 
              elegance meets Ethiopian hospitality.
            </p>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {[
                { icon: Instagram, href: '#' },
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
              ].map((social, index) => (
                <MagneticButton key={index} strength={0.2}>
                  <motion.a
                    href={social.href}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-11 h-11 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-300"
                  >
                    <social.icon size={18} />
                  </motion.a>
                </MagneticButton>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            className="md:col-span-3"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <h4 className="font-serif text-lg mb-6 text-foreground">Quick Links</h4>
            <ul className="space-y-4">
              {['About', 'Amenities', 'Gallery', 'Location', 'Contact'].map((link, index) => (
                <motion.li 
                  key={link}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-muted-foreground hover:text-primary transition-colors duration-300 text-sm inline-block relative group"
                  >
                    {link}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            className="md:col-span-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h4 className="font-serif text-lg mb-6 text-foreground">Get in Touch</h4>
            <ul className="space-y-4 text-sm">
              <li>
                <span className="text-muted-foreground">Address:</span>
                <p className="text-foreground mt-1">Bole, Addis Ababa, Ethiopia</p>
              </li>
              <li>
                <span className="text-muted-foreground">Email:</span>
                <p className="text-foreground mt-1">
                  <a href="mailto:stay@balhir.com" className="hover:text-primary transition-colors">
                    stay@balhir.com
                  </a>
                </p>
              </li>
              <li>
                <span className="text-muted-foreground">Phone:</span>
                <p className="text-foreground mt-1">
                  <a href="tel:+251911123456" className="hover:text-primary transition-colors">
                    +251 911 123 456
                  </a>
                </p>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div 
          className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p 
            className="text-muted-foreground text-sm flex items-center gap-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5 }}
          >
            © {currentYear} Balhir Apartment. Made with 
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-primary fill-primary" />
            </motion.span>
            in Ethiopia.
          </motion.p>

          <MagneticButton strength={0.15}>
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors px-4 py-2 rounded-lg hover:bg-card border border-transparent hover:border-border/50"
            >
              Back to top
              <motion.div
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowUp size={16} />
              </motion.div>
            </motion.button>
          </MagneticButton>
        </div>
      </motion.div>
    </footer>
  );
};

export default Footer;
