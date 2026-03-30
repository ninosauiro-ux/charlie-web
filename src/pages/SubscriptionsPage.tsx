import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { useSEO } from '@/lib/seo';

const easeSnappy = [0.16, 1, 0.3, 1] as const;

const plans = [
  { name: 'Mini', price: 19.90, items: '2 bars + 6 bonbons', cta: 'Start Mini' },
  { name: 'Classic', price: 29.90, items: '3 bars + 9 bonbons', cta: 'Start Classic', featured: true },
  { name: 'Grand', price: 44.90, items: '4 bars + 12 bonbons + 1 surprise', cta: 'Start Grand' },
];

const perks = ['Subscriber-only drops', 'Skip or pause anytime', 'Free shipping included'];

const SubscriptionsPage = () => {
  useSEO({
    title: 'Chocolate Subscription — Monthly Box | Charlie Chocolate Madrid',
    description: 'Subscribe to a monthly box of seasonal bars and bonbons. Save on artisan chocolate with exclusive flavors delivered to your door.',
    path: '/subscriptions',
  });

  return (
    <main className="section-ivory noise-overlay min-h-screen">
      <div className="max-w-wide mx-auto px-4 md:px-6 py-14 md:py-20 lg:py-28">
        <SectionHeading eyebrow="SUBSCRIBE" title="Chocolate Subscription" subtitle="A monthly box of seasonal bars + bonbons—save and discover new flavors." />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          {plans.map(plan => (
            <motion.div
              key={plan.name}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeSnappy } },
              }}
              className={`relative bg-card rounded-3xl p-8 card-shadow transition-all hover:card-shadow-hover hover:-translate-y-2 ${plan.featured ? 'ring-2 ring-gold' : ''}`}
            >
              {plan.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-primary px-4 py-1 rounded-full text-xs font-bold">Most popular</span>
              )}
              <h3 className="heading-h3 text-primary mb-2">{plan.name}</h3>
              <p className="body-large text-muted-foreground mb-4">{plan.items}</p>
              <p className="price-text text-primary mb-6" style={{ fontSize: 32 }}>€{plan.price.toFixed(2)}<span className="body-small text-muted-foreground font-normal">/month</span></p>
              <ul className="space-y-2 mb-8">
                {perks.map(perk => (
                  <li key={perk} className="flex items-center gap-2 body-small text-muted-foreground">
                    <Check size={14} className="text-gold flex-shrink-0" />
                    {perk}
                  </li>
                ))}
              </ul>
              <button className={`w-full py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all hover:-translate-y-1 ${plan.featured ? 'bg-primary text-primary-foreground gold-glow' : 'bg-muted text-primary hover:bg-surface-soft'}`}>
                {plan.cta} <ArrowRight size={16} />
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
};

export default SubscriptionsPage;
