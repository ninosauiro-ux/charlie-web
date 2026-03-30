import { motion } from 'framer-motion';

const promoText = "Free shipping €49+ • Madrid same-day delivery before 12:00 • Gift-ready packaging included";

const PromoBar = () => (
  <div className="bg-primary text-primary-foreground h-[38px] flex items-center overflow-hidden z-[60] relative" role="banner">
    <div className="hidden sm:flex w-full justify-center">
      <p className="ui-label text-primary-foreground/90 text-center">{promoText}</p>
    </div>
    <div className="sm:hidden flex whitespace-nowrap">
      <motion.div className="flex animate-marquee" aria-hidden="true">
        <span className="ui-label text-primary-foreground/90 px-8">{promoText}</span>
        <span className="ui-label text-primary-foreground/90 px-8">{promoText}</span>
      </motion.div>
    </div>
    <span className="sr-only">{promoText}</span>
  </div>
);

export default PromoBar;
