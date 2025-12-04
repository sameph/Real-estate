import { motion } from 'framer-motion';
import { AspectRatio } from './ui/aspect-ratio';

const plans = [
  {
    name: 'Studio Suite',
    size: '45 m²',
    beds: '1 Bed',
    img: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'One Bedroom',
    size: '68 m²',
    beds: '1 Bed + Lounge',
    img: 'https://images.unsplash.com/photo-1505692794403-34d4982f88aa?q=80&w=1200&auto=format&fit=crop',
  },
  {
    name: 'Two Bedroom',
    size: '102 m²',
    beds: '2 Bed + Lounge',
    img: 'https://images.unsplash.com/photo-1600566752802-99429c3951c6?q=80&w=1200&auto=format&fit=crop',
  },
];

const FloorPlans = () => {
  return (
    <section id="floor-plans" className="relative py-24 md:py-32 bg-card/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-primary font-medium tracking-[0.3em] uppercase text-sm"
            >
              Floor Plans
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl mt-4"
            >
              Choose your layout
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-muted-foreground max-w-2xl"
          >
            Spacious, light‑filled apartments crafted for modern living and longer stays.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((p, i) => (
            <motion.article
              key={p.name}
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="rounded-xl overflow-hidden bg-card border border-border hover:border-primary/40 transition-colors"
            >
              <div className="image-reveal">
                <AspectRatio ratio={16 / 10}>
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                </AspectRatio>
              </div>
              <div className="p-5">
                <h3 className="font-medium text-lg">{p.name}</h3>
                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-2">
                  <span>{p.size}</span>
                  <span className="opacity-40">•</span>
                  <span>{p.beds}</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FloorPlans;
