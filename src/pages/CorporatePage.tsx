import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Building, Phone, Mail } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { useSEO } from '@/lib/seo';
import { trackEvent } from '@/lib/analytics';

const CorporatePage = () => {
  useSEO({
    title: 'Corporate Chocolate Gifts in Spain | Charlie Chocolate',
    description: 'Premium chocolate gifts for clients, teams, and events. Custom branding, bulk pricing, handwritten notes. Packed in Madrid, shipped across Spain.',
    path: '/corporate',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    trackEvent('lead_submit', { form: 'corporate' });
    setSubmitted(true);
  };

  return (
    <main className="section-ivory noise-overlay min-h-screen">
      <div className="max-w-wide mx-auto px-4 md:px-6 py-14 md:py-20 lg:py-28">
        <SectionHeading eyebrow="CORPORATE" title="Corporate Gifting" subtitle="Premium chocolate gifts for clients, teams, and events—packed in Madrid, shipped across Spain." />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { title: 'Custom sleeves with your logo', desc: 'Add your brand to our premium packaging.' },
            { title: 'Bulk pricing tiers', desc: 'Volume discounts for orders of 25+.' },
            { title: 'Handwritten notes for VIP lists', desc: 'Personal touch for every recipient.' },
          ].map(item => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-3xl p-8 card-shadow"
            >
              <Building size={24} className="text-gold mb-4" />
              <h3 className="heading-h4 text-primary mb-2">{item.title}</h3>
              <p className="body-large text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="bg-card rounded-3xl p-8 md:p-10 card-shadow">
            <h2 className="heading-h3 text-primary mb-6">Request a quote</h2>
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form key="form" onSubmit={handleSubmit} className="space-y-4" exit={{ opacity: 0 }}>
                  {[
                    { name: 'company', label: 'Company name', type: 'text' },
                    { name: 'contact', label: 'Contact name', type: 'text' },
                    { name: 'email', label: 'Email', type: 'email' },
                    { name: 'phone', label: 'Phone', type: 'tel' },
                  ].map(field => (
                    <div key={field.name}>
                      <label className="body-small font-semibold text-primary block mb-1">{field.label}</label>
                      <input type={field.type} required className="w-full px-4 py-3 rounded-2xl border border-border bg-ivory text-primary focus:ring-2 focus:ring-gold focus:outline-none body-large" />
                    </div>
                  ))}
                  <div>
                    <label className="body-small font-semibold text-primary block mb-1">Estimated quantity</label>
                    <select className="w-full px-4 py-3 rounded-2xl border border-border bg-ivory text-primary focus:ring-2 focus:ring-gold focus:outline-none body-large">
                      <option>25–50</option><option>50–100</option><option>100–250</option><option>250+</option>
                    </select>
                  </div>
                  <div>
                    <label className="body-small font-semibold text-primary block mb-1">Message</label>
                    <textarea className="w-full px-4 py-3 rounded-2xl border border-border bg-ivory text-primary focus:ring-2 focus:ring-gold focus:outline-none body-large resize-none h-24" />
                  </div>
                  <button type="submit" className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-semibold hover:bg-primary-hover transition-all gold-glow">
                    Request a quote
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                  className="text-center py-12"
                >
                  <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                    <Check size={32} className="text-gold" />
                  </div>
                  <h3 className="heading-h3 text-primary mb-2">Thanks!</h3>
                  <p className="body-large text-muted-foreground">Our gifting team will reply within 1 business day.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="space-y-6">
            <div className="bg-cream rounded-3xl p-8">
              <h3 className="heading-h4 text-primary mb-4">Get in touch directly</h3>
              <div className="space-y-3">
                <a href="tel:+34910247719" className="flex items-center gap-3 body-large text-primary hover:text-secondary transition-colors">
                  <Phone size={18} className="text-gold" /> +34 910 24 77 19
                </a>
                <a href="mailto:hola@charliechocolate.es" className="flex items-center gap-3 body-large text-primary hover:text-secondary transition-colors">
                  <Mail size={18} className="text-gold" /> hola@charliechocolate.es
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CorporatePage;
