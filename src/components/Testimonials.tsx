import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Hanna T.',
    role: 'Business Traveller',
    quote:
      'Immaculate apartment and excellent location. The team was incredibly responsive and kind. It felt like home.',
  },
  {
    name: 'Daniel K.',
    role: 'Extended Stay',
    quote:
      'Bright spaces, reliable Wi‑Fi, and quiet. I stayed for three weeks and loved every day of it.',
  },
  {
    name: 'Maya S.',
    role: 'Holiday Visit',
    quote:
      'The design is beautiful and the amenities are thoughtful. Perfect base for exploring Addis.',
  },
];

const Testimonials = () => {
  return (
    <section id="testimonials" className="relative py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-primary font-medium tracking-[0.3em] uppercase text-sm"
          >
            Testimonials
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl mt-4"
          >
            Guests love staying here
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.blockquote
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.07 }}
              className="p-6 rounded-xl bg-card/50 border border-border/60 hover:border-primary/40 transition-colors"
            >
              <Quote className="w-6 h-6 text-primary/70" />
              <p className="mt-4 text-foreground leading-relaxed">“{t.quote}”</p>
              <footer className="mt-6 text-sm text-muted-foreground">
                <span className="text-foreground font-medium">{t.name}</span> • {t.role}
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
