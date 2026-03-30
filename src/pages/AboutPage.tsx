import { motion } from 'framer-motion';
import SectionHeading from '@/components/SectionHeading';
import { useSEO } from '@/lib/seo';
import { MapPin, Clock, Coffee, Leaf, Cherry } from 'lucide-react';

const easeSnappy = [0.16, 1, 0.3, 1] as const;

const flavors = [
  { name: 'Caramel', desc: 'Buttery, rich, golden warmth.', icon: Coffee },
  { name: 'Citrus', desc: 'Bright yuzu and orange zest sparkle.', icon: Leaf },
  { name: 'Nuts', desc: 'Pistachio, hazelnut, almond depth.', icon: Coffee },
  { name: 'Coffee', desc: 'Espresso roast, clean finish.', icon: Coffee },
  { name: 'Berries', desc: 'Raspberry, blackcurrant, tart contrast.', icon: Cherry },
];

const AboutPage = () => {
  useSEO({
    title: 'About — Our Story | Charlie Chocolate Madrid',
    description: 'Discover the Charlie Chocolate story. Handcrafted artisan chocolate from our Madrid atelier, made with single-origin cacao and finished by hand.',
    path: '/about',
  });

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="section-ivory noise-overlay py-14 md:py-20 lg:py-28">
        <div className="max-w-wide mx-auto px-4 md:px-6">
          <SectionHeading eyebrow="OUR STORY" title="The Charlie Atelier" subtitle="A small team, a precise craft, a lot of joy." />
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-cream noise-overlay py-14 md:py-20 lg:py-28">
        <div className="max-w-wide mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: easeSnappy }}
              className="heading-h2 text-primary mb-6"
            >
              Our philosophy
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="body-large text-muted-foreground mb-8"
            >
              Balance over sweetness. Texture over excess. Craft over volume.
            </motion.p>
            <motion.blockquote
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-card rounded-3xl p-8 card-shadow border-l-4 border-gold"
            >
              <p className="heading-h3 text-primary italic">"Chocolate should feel like a tiny celebration—every time."</p>
            </motion.blockquote>
          </div>
        </div>
      </section>

      {/* Flavors */}
      <section className="section-ivory noise-overlay py-14 md:py-20 lg:py-28">
        <div className="max-w-wide mx-auto px-4 md:px-6">
          <SectionHeading eyebrow="FLAVOR WORLD" title="Meet the flavors" />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-2 md:grid-cols-5 gap-4"
          >
            {flavors.map(f => (
              <motion.div
                key={f.name}
                variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
                className="bg-card rounded-3xl p-6 card-shadow text-center"
              >
                <f.icon size={24} className="text-gold mx-auto mb-3" />
                <h3 className="heading-h4 text-primary mb-1">{f.name}</h3>
                <p className="body-small text-muted-foreground">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Visit */}
      <section className="section-dark noise-overlay py-14 md:py-20 lg:py-28">
        <div className="max-w-wide mx-auto px-4 md:px-6 text-center">
          <SectionHeading eyebrow="VISIT" title="Visit us in Madrid" dark />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-text-on-dark/5 rounded-3xl p-6 border border-text-on-dark/10">
              <MapPin size={24} className="text-gold mx-auto mb-3" />
              <p className="body-large text-text-on-dark">Calle del Chocolate, 17</p>
              <p className="body-small text-text-on-dark/70">28013 Madrid, Spain</p>
            </div>
            <div className="bg-text-on-dark/5 rounded-3xl p-6 border border-text-on-dark/10">
              <Clock size={24} className="text-gold mx-auto mb-3" />
              <p className="body-small text-text-on-dark">Mon–Fri: 10:00–20:30</p>
              <p className="body-small text-text-on-dark">Sat: 11:00–21:00</p>
              <p className="body-small text-text-on-dark">Sun: 11:00–18:00</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;
