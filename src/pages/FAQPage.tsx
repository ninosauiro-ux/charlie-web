import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import SectionHeading from '@/components/SectionHeading';
import { useSEO } from '@/lib/seo';

const faqs = [
  { q: 'What are your shipping options?', a: 'Madrid same-day delivery for orders placed before 12:00 (12:00–18:00 window). Spain mainland: 24–48h. Free shipping on orders €49+.' },
  { q: 'Do you offer gift wrapping?', a: 'Yes! All orders come in gift-ready packaging. You can also add gold ribbon (+€2.00), birthday sleeve (+€2.50), or a handwritten note (+€1.50).' },
  { q: 'Can I customize a gift box?', a: 'Absolutely. Use our gift box builder to choose size, flavors, a personal note, and wrap style.' },
  { q: 'Do you ship internationally?', a: 'Currently we ship within Spain. We\'re working on European shipping—sign up for our newsletter to be the first to know.' },
  { q: 'Are your chocolates suitable for vegans?', a: 'Several of our bars are vegan, including the Midnight Sea Salt Bar (70%). Products are clearly tagged.' },
  { q: 'How should I store the chocolates?', a: 'Store in a cool, dry place (16–18°C). Avoid direct sunlight and refrigeration.' },
  { q: 'Do you offer corporate gifting?', a: 'Yes! We offer custom sleeves with your logo, bulk pricing, and handwritten notes. Contact us for a quote.' },
  { q: 'What is your return policy?', a: 'We accept returns within 14 days for unopened products. Perishable items cannot be returned once opened.' },
];

const FAQPage = () => {
  useSEO({
    title: 'FAQ — Frequently Asked Questions | Charlie Chocolate',
    description: 'Answers about shipping, gift wrapping, corporate orders, allergens, and more from Charlie Chocolate Madrid.',
    path: '/faq',
  });

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="section-ivory noise-overlay min-h-screen">
      <div className="max-w-wide mx-auto px-4 md:px-6 py-14 md:py-20 lg:py-28">
        <SectionHeading eyebrow="HELP" title="Frequently Asked Questions" />
        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.4 }}
              className="bg-card rounded-3xl card-shadow overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
                aria-expanded={openIndex === i}
              >
                <span className="heading-h4 text-primary pr-4">{faq.q}</span>
                <ChevronDown size={20} className={`text-muted-foreground flex-shrink-0 transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
              </button>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="px-6 pb-6"
                >
                  <p className="body-large text-muted-foreground">{faq.a}</p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default FAQPage;
