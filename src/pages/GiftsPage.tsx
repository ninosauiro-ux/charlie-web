import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Check, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';
import { products } from '@/data/products';
import { useCartContext } from '@/contexts/CartContext';
import SectionHeading from '@/components/SectionHeading';
import { useSEO } from '@/lib/seo';
import giftboxImg from '@/assets/product-giftbox.jpg';

const easeSnappy = [0.16, 1, 0.3, 1] as const;

const curatedBoxes = [
  { name: 'The Golden Set', price: 29.90, desc: 'A balanced mix of bars + bonbons.' },
  { name: 'Midnight Luxe', price: 39.90, desc: 'Dark chocolate focus, bold and elegant.' },
  { name: 'Family Share Box', price: 44.90, desc: 'Crowd-pleasing flavors, generous portions.' },
];

const sizes = [
  { pcs: 6, price: 14.90 },
  { pcs: 12, price: 26.90 },
  { pcs: 24, price: 49.90 },
];

const flavors = products.filter(p => p.category === 'bonbons' || p.category === 'bars' || p.category === 'truffles');

const wraps = [
  { name: 'Minimal kraft', price: 0 },
  { name: 'Gold ribbon', price: 2.00 },
  { name: 'Birthday sleeve', price: 2.50 },
];

const GiftsPage = () => {
  useSEO({
    title: 'Gift Boxes — Artisan Chocolate Gifts | Charlie Chocolate Madrid',
    description: 'Ready-to-gift chocolate sets and build-your-own gift boxes. Gift-ready packaging, personal notes, same-day Madrid delivery.',
    path: '/gifts',
  });

  const { addItem } = useCartContext();
  const [step, setStep] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [note, setNote] = useState('');
  const [selectedWrap, setSelectedWrap] = useState(0);

  const maxFlavors = sizes[selectedSize].pcs;

  const toggleFlavor = (id: string) => {
    setSelectedFlavors(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) :
      prev.length < maxFlavors ? [...prev, id] : prev
    );
  };

  const giftBoxTotal = sizes[selectedSize].price + wraps[selectedWrap].price;

  return (
    <main className="section-ivory noise-overlay min-h-screen">
      <div className="max-w-wide mx-auto px-4 md:px-6 py-14 md:py-20 lg:py-28">
        <SectionHeading eyebrow="GIFTING" title="Gift Boxes" subtitle="Ready-to-gift sets and a build-your-own box for every occasion." />

        {/* Curated boxes */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20"
        >
          {curatedBoxes.map(box => (
            <motion.div
              key={box.name}
              variants={{
                hidden: { opacity: 0, y: 24 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: easeSnappy } },
              }}
              className="gradient-border-card bg-card rounded-3xl overflow-hidden card-shadow hover:card-shadow-hover transition-all hover:-translate-y-1"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={giftboxImg} alt={box.name} className="w-full h-full object-cover" loading="lazy" width={400} height={300} />
              </div>
              <div className="p-6 space-y-3">
                <h3 className="heading-h3 text-primary">{box.name}</h3>
                <p className="body-large text-muted-foreground">{box.desc}</p>
                <div className="flex items-center justify-between pt-2">
                  <span className="price-text text-primary">€{box.price.toFixed(2)}</span>
                  <button
                    onClick={() => addItem({ id: `gift-${box.name}`, name: box.name, price: box.price, image: giftboxImg, slug: 'gifts' })}
                    className="bg-primary text-primary-foreground px-5 py-2.5 rounded-2xl font-semibold text-sm hover:bg-primary-hover transition-all"
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Build a box */}
        <div className="bg-card rounded-3xl card-shadow p-6 md:p-10">
          <div className="flex items-center gap-3 mb-8">
            <Gift size={24} className="text-gold" />
            <h2 className="heading-h3 text-primary">Build your own gift box</h2>
          </div>

          {/* Progress */}
          <div className="flex gap-2 mb-8">
            {['Size', 'Flavors', 'Note', 'Wrap'].map((s, i) => (
              <button
                key={s}
                onClick={() => setStep(i)}
                className={`flex-1 py-2 rounded-full body-small font-semibold transition-all ${step === i ? 'bg-primary text-primary-foreground' : step > i ? 'bg-gold/20 text-primary' : 'bg-muted text-muted-foreground'}`}
              >
                {step > i && <Check size={12} className="inline mr-1" />}
                {s}
              </button>
            ))}
          </div>

          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: easeSnappy }}
          >
            {step === 0 && (
              <div className="grid grid-cols-3 gap-4">
                {sizes.map((s, i) => (
                  <button
                    key={s.pcs}
                    onClick={() => { setSelectedSize(i); setSelectedFlavors([]); }}
                    className={`p-6 rounded-3xl border-2 transition-all text-center ${selectedSize === i ? 'border-gold bg-gold/5' : 'border-border hover:border-gold/50'}`}
                  >
                    <p className="heading-h2 text-primary">{s.pcs}</p>
                    <p className="body-small text-muted-foreground">pieces</p>
                    <p className="price-text text-secondary mt-2">€{s.price.toFixed(2)}</p>
                  </button>
                ))}
              </div>
            )}

            {step === 1 && (
              <div>
                <p className="body-small text-muted-foreground mb-4">Select up to {maxFlavors} flavors ({selectedFlavors.length}/{maxFlavors})</p>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {flavors.map(f => (
                    <button
                      key={f.id}
                      onClick={() => toggleFlavor(f.id)}
                      className={`p-4 rounded-2xl border-2 text-left transition-all ${selectedFlavors.includes(f.id) ? 'border-gold bg-gold/5' : 'border-border hover:border-gold/50'}`}
                    >
                      <p className="body-small font-semibold text-primary">{f.name}</p>
                      <p className="body-small text-muted-foreground">{f.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <label className="body-small font-semibold text-primary mb-2 block">Add a personal note (optional)</label>
                <textarea
                  value={note}
                  onChange={e => setNote(e.target.value.slice(0, 200))}
                  className="w-full p-4 rounded-2xl border border-border bg-ivory text-primary body-large focus:ring-2 focus:ring-gold focus:outline-none resize-none h-32"
                  placeholder="Happy birthday! Enjoy these chocolates..."
                  aria-label="Gift note"
                />
                <p className="body-small text-muted-foreground text-right mt-1">{note.length}/200</p>
              </div>
            )}

            {step === 3 && (
              <div className="grid grid-cols-3 gap-4">
                {wraps.map((w, i) => (
                  <button
                    key={w.name}
                    onClick={() => setSelectedWrap(i)}
                    className={`p-5 rounded-3xl border-2 transition-all text-center ${selectedWrap === i ? 'border-gold bg-gold/5' : 'border-border hover:border-gold/50'}`}
                  >
                    <p className="body-small font-semibold text-primary">{w.name}</p>
                    {w.price > 0 && <p className="body-small text-gold mt-1">+€{w.price.toFixed(2)}</p>}
                    {w.price === 0 && <p className="body-small text-muted-foreground mt-1">Free</p>}
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
            <div>
              <p className="body-small text-muted-foreground">Total</p>
              <p className="price-text text-primary">€{giftBoxTotal.toFixed(2)}</p>
            </div>
            <div className="flex gap-3">
              {step > 0 && (
                <button onClick={() => setStep(step - 1)} className="px-6 py-3 rounded-2xl border-2 border-border text-primary font-semibold hover:bg-muted transition-colors">
                  Back
                </button>
              )}
              {step < 3 ? (
                <button onClick={() => setStep(step + 1)} className="bg-primary text-primary-foreground px-8 py-3 rounded-2xl font-semibold hover:bg-primary-hover transition-all flex items-center gap-2">
                  Next <ArrowRight size={16} />
                </button>
              ) : (
                <button
                  onClick={() => addItem({
                    id: `custom-gift-${Date.now()}`,
                    name: `Custom Gift Box (${sizes[selectedSize].pcs} pcs)`,
                    price: giftBoxTotal,
                    image: giftboxImg,
                    slug: 'gifts',
                  })}
                  className="bg-primary text-primary-foreground px-8 py-3 rounded-2xl font-semibold hover:bg-primary-hover transition-all gold-glow flex items-center gap-2"
                >
                  Add gift box to cart <ArrowRight size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default GiftsPage;
