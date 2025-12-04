import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ArrowRight } from 'lucide-react';

const StickyCTA = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] md:hidden">
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="mx-4 mb-4 rounded-xl shadow-2xl overflow-hidden border border-border backdrop-blur-xl bg-card/80"
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3">
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">Ready to book your stay?</p>
            <p className="text-xs text-muted-foreground truncate">Secure your dates in seconds.</p>
          </div>
          <a href="#contact" className="shrink-0">
            <Button variant="gold" size="lg" className="group">
              Book Now
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default StickyCTA;
