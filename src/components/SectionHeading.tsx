import { motion } from 'framer-motion';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
  center?: boolean;
}

const SectionHeading = ({ eyebrow, title, subtitle, dark, center = true }: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 34 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.22 }}
    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    className={`mb-12 ${center ? 'text-center' : ''}`}
  >
    {eyebrow && <p className={`ui-label mb-3 ${dark ? 'text-gold' : 'text-secondary'}`}>{eyebrow}</p>}
    <h2 className={`heading-h2 ${dark ? 'text-text-on-dark' : 'text-primary'}`}>{title}</h2>
    {subtitle && <p className={`body-large mt-3 max-w-2xl ${center ? 'mx-auto' : ''} ${dark ? 'text-text-on-dark/70' : 'text-muted-foreground'}`}>{subtitle}</p>}
  </motion.div>
);

export default SectionHeading;
