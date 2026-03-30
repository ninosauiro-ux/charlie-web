import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const NewsletterForm = ({ variant = 'default' }: { variant?: 'default' | 'footer' }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    trackEvent('newsletter_signup', { email });
    setSubmitted(true);
  };

  const dark = variant === 'footer';

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div key="form" className="flex gap-2 w-full" exit={{ opacity: 0 }} transition={{ duration: 0.12 }}>
            <input
              type="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className={`flex-1 px-4 py-2.5 rounded-2xl body-small border focus:outline-none focus:ring-2 focus:ring-gold ${dark ? 'bg-text-on-dark/10 border-text-on-dark/20 text-text-on-dark placeholder:text-text-on-dark/40' : 'bg-card border-border text-foreground'}`}
              aria-label="Email for newsletter"
            />
            <button
              type="submit"
              className={`px-5 py-2.5 rounded-2xl font-semibold body-small transition-all ${dark ? 'bg-gold text-primary hover:bg-accent-hover' : 'bg-primary text-primary-foreground hover:bg-primary-hover'}`}
            >
              Join
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="success"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 200, damping: 12 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-full bg-gold flex items-center justify-center">
              <Check size={16} className="text-primary" />
            </div>
            <span className={`body-small font-semibold ${dark ? 'text-text-on-dark' : 'text-primary'}`}>Welcome to Charlie Chocolate!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
};

export default NewsletterForm;
