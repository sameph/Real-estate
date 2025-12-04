import { motion } from 'framer-motion';
import { Building2, ShieldCheck, Sun, Wifi } from 'lucide-react';

const items = [
  {
    icon: Building2,
    title: 'Prime Bole Address',
    desc: 'Minutes from the airport and top dining, in Addis Ababa’s most sought‑after district.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure & Private',
    desc: '24/7 security, controlled access, and discreet services for total peace of mind.',
  },
  {
    icon: Sun,
    title: 'Bright Modern Spaces',
    desc: 'Floor‑to‑ceiling windows, premium finishes, and warm contemporary design.',
  },
  {
    icon: Wifi,
    title: 'Work & Relax',
    desc: 'High‑speed Wi‑Fi, smart TVs, and comfortable lounges for work or leisure.',
  },
];

const Highlights = () => {
  return (
    <section id="highlights" className="relative py-24 md:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-primary font-medium tracking-[0.3em] uppercase text-sm"
          >
            Highlights
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-serif text-4xl md:text-5xl mt-4"
          >
            A better way to stay
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-muted-foreground mt-4"
          >
            Thoughtfully designed residences with amenities that elevate every moment.
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((it, i) => (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              whileHover={{ y: -6 }}
              className="p-6 rounded-xl bg-card/50 border border-border/60 hover:border-primary/40 transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <it.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-medium text-lg">{it.title}</h3>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{it.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
