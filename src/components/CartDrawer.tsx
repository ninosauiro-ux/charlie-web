import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCartContext } from '@/contexts/CartContext';
import { trackEvent } from '@/lib/analytics';

const CartDrawer = () => {
  const { items, removeItem, updateQuantity, totalPrice, freeShipping, isOpen, setIsOpen } = useCartContext();

  const handleCheckout = () => {
    trackEvent('begin_checkout', { total: totalPrice, items: items.length });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-primary/40 z-[70]"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-card z-[80] flex flex-col shadow-2xl"
            role="dialog"
            aria-label="Shopping cart"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag size={20} className="text-primary" />
                <h2 className="heading-h4 text-primary">Your cart</h2>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-muted rounded-full transition-colors" aria-label="Close cart">
                <X size={20} className="text-primary" />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={48} className="text-muted-foreground/30 mb-4" />
                  <p className="heading-h4 text-primary mb-2">Your cart is empty</p>
                  <p className="body-small text-muted-foreground">Add some chocolates to get started.</p>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex gap-4 p-3 bg-ivory rounded-3xl">
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-2xl" loading="lazy" />
                    <div className="flex-1 min-w-0">
                      <h3 className="body-small font-semibold text-primary truncate">{item.name}</h3>
                      <p className="price-text text-secondary mt-1" style={{ fontSize: 16 }}>€{item.price.toFixed(2)}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-surface-soft transition-colors" aria-label="Decrease quantity">
                          <Minus size={14} />
                        </button>
                        <span className="body-small font-semibold w-6 text-center">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 rounded-full bg-muted flex items-center justify-center hover:bg-surface-soft transition-colors" aria-label="Increase quantity">
                          <Plus size={14} />
                        </button>
                        <button onClick={() => removeItem(item.id)} className="ml-auto body-small text-muted-foreground hover:text-destructive transition-colors" aria-label={`Remove ${item.name}`}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-border space-y-4">
                {!freeShipping && (
                  <div className="bg-cream rounded-2xl p-3 text-center">
                    <p className="body-small text-primary">Add <span className="font-bold">€{(49 - totalPrice).toFixed(2)}</span> more for free shipping!</p>
                  </div>
                )}
                {freeShipping && (
                  <div className="bg-gold/10 rounded-2xl p-3 text-center">
                    <p className="body-small text-primary font-semibold">✓ Free shipping included!</p>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="heading-h4 text-primary">Total</span>
                  <span className="price-text text-primary">€{totalPrice.toFixed(2)}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-primary text-primary-foreground py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-primary-hover transition-all hover:-translate-y-1 gold-glow"
                >
                  Checkout <ArrowRight size={18} />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
