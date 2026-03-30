import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Phone, Mail, MessageCircle, Check } from 'lucide-react';
import SectionHeading from '@/components/SectionHeading';
import { useSEO } from '@/lib/seo';

const ContactPage = () => {
  useSEO({
    title: 'Contact — Charlie Chocolate Madrid',
    description: 'Visit our atelier, call us, or send a message. Calle del Chocolate, 17, 28013 Madrid. We reply within 24 hours.',
    path: '/contact',
  });

  const [sent, setSent] = useState(false);

  return (
    <main className="section-ivory noise-overlay min-h-screen">
      <div className="max-w-wide mx-auto px-4 md:px-6 py-14 md:py-20 lg:py-28">
        <SectionHeading eyebrow="GET IN TOUCH" title="Contact" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            {/* Cards */}
            {[
              { icon: MapPin, title: 'Address', lines: ['Calle del Chocolate, 17', '28013 Madrid, Spain'] },
              { icon: Clock, title: 'Hours', lines: ['Mon–Fri: 10:00–20:30', 'Sat: 11:00–21:00', 'Sun: 11:00–18:00'] },
            ].map(card => (
              <div key={card.title} className="bg-card rounded-3xl p-6 card-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <card.icon size={20} className="text-gold" />
                  <h3 className="heading-h4 text-primary">{card.title}</h3>
                </div>
                {card.lines.map(l => <p key={l} className="body-large text-muted-foreground">{l}</p>)}
              </div>
            ))}

            <div className="flex flex-wrap gap-3">
              <a href="tel:+34910247719" className="flex items-center gap-2 bg-card px-5 py-3 rounded-2xl card-shadow body-small font-semibold text-primary hover:bg-muted transition-colors">
                <Phone size={16} className="text-gold" /> Call
              </a>
              <a href="https://wa.me/34640185502" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-card px-5 py-3 rounded-2xl card-shadow body-small font-semibold text-primary hover:bg-muted transition-colors">
                <MessageCircle size={16} className="text-gold" /> WhatsApp
              </a>
              <a href="mailto:hola@charliechocolate.es" className="flex items-center gap-2 bg-card px-5 py-3 rounded-2xl card-shadow body-small font-semibold text-primary hover:bg-muted transition-colors">
                <Mail size={16} className="text-gold" /> Email
              </a>
            </div>

            {/* Map */}
            <div className="rounded-3xl overflow-hidden card-shadow h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3037.2!2d-3.706!3d40.420!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2sMadrid!5e0!3m2!1sen!2ses!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Charlie Chocolate location in Madrid"
              />
            </div>
          </div>

          {/* Form */}
          <div className="bg-card rounded-3xl p-8 md:p-10 card-shadow h-fit">
            <h2 className="heading-h3 text-primary mb-6">Send a message</h2>
            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.form key="form" onSubmit={e => { e.preventDefault(); setSent(true); }} className="space-y-4" exit={{ opacity: 0 }}>
                  <div>
                    <label className="body-small font-semibold text-primary block mb-1">Name</label>
                    <input required type="text" className="w-full px-4 py-3 rounded-2xl border border-border bg-ivory text-primary focus:ring-2 focus:ring-gold focus:outline-none body-large" />
                  </div>
                  <div>
                    <label className="body-small font-semibold text-primary block mb-1">Email</label>
                    <input required type="email" className="w-full px-4 py-3 rounded-2xl border border-border bg-ivory text-primary focus:ring-2 focus:ring-gold focus:outline-none body-large" />
                  </div>
                  <div>
                    <label className="body-small font-semibold text-primary block mb-1">Message</label>
                    <textarea required className="w-full px-4 py-3 rounded-2xl border border-border bg-ivory text-primary focus:ring-2 focus:ring-gold focus:outline-none body-large resize-none h-32" />
                  </div>
                  <button type="submit" className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-semibold hover:bg-primary-hover transition-all gold-glow">
                    Send message
                  </button>
                  <p className="body-small text-muted-foreground text-center">We reply within 24 hours (Mon–Fri).</p>
                </motion.form>
              ) : (
                <motion.div key="done" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 12 }} className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                    <Check size={32} className="text-gold" />
                  </div>
                  <h3 className="heading-h3 text-primary">Message sent!</h3>
                  <p className="body-large text-muted-foreground mt-2">We'll get back to you soon.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;
