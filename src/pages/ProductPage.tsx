import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, Minus, ArrowRight, Truck, Clock, Gift, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { getProductBySlug, products } from '@/data/products';
import { useCartContext } from '@/contexts/CartContext';
import { useSEO } from '@/lib/seo';

const easeOutQuint = [0.22, 1, 0.36, 1] as const;

const tabs = ['Flavor notes', 'Ingredients', 'Allergens', 'Shipping & returns'];

const ProductPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = getProductBySlug(slug || '');
  const { addItem } = useCartContext();
  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState(0);

  useSEO({
    title: product ? `${product.name} | Charlie Chocolate` : 'Product | Charlie Chocolate',
    description: product?.description || 'Artisan chocolate from Madrid.',
    path: `/product/${slug}`,
  });

  if (!product) {
    return (
      <div className="section-ivory min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="heading-h2 text-primary mb-4">Product not found</h1>
          <Link to="/shop" className="text-secondary font-semibold">Back to shop</Link>
        </div>
      </div>
    );
  }

  const tabContent = [
    product.flavorNotes,
    product.ingredients,
    product.allergens,
    'Madrid same-day delivery for orders before 12:00. Spain mainland: 24–48h. Free shipping on orders €49+. Returns accepted within 14 days for unopened products.',
  ];

  const recommendations = products.filter(p => p.id !== product.id).slice(0, 3);

  return (
    <main className="section-ivory noise-overlay min-h-screen">
      {/* Breadcrumbs */}
      <div className="max-w-wide mx-auto px-4 md:px-6 pt-6">
        <nav className="flex items-center gap-1 body-small text-muted-foreground" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-secondary transition-colors">Home</Link>
          <ChevronRight size={12} />
          <Link to="/shop" className="hover:text-secondary transition-colors">Shop</Link>
          <ChevronRight size={12} />
          <span className="text-primary font-semibold truncate">{product.name}</span>
        </nav>
      </div>

      <div className="max-w-wide mx-auto px-4 md:px-6 py-8 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Gallery */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: easeOutQuint }}
            className="aspect-square rounded-3xl overflow-hidden card-shadow"
          >
            <img src={product.image} alt={product.name} className="w-full h-full object-cover" width={800} height={800} />
          </motion.div>

          {/* Purchase panel */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: easeOutQuint }}
            className="space-y-6"
          >
            {/* Tags */}
            <div className="flex gap-2">
              {product.tags.map(tag => (
                <span key={tag} className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  tag === 'Best seller' ? 'bg-gold text-primary' :
                  tag === 'Seasonal' ? 'bg-berry text-primary-foreground' :
                  'bg-muted text-primary'
                }`}>{tag}</span>
              ))}
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${product.stock === 'low-stock' ? 'bg-berry/10 text-berry' : 'bg-gold/10 text-primary'}`}>
                {product.stock === 'in-stock' ? 'In stock' : 'Low stock'}
              </span>
            </div>

            <h1 className="heading-h2 text-primary">{product.name}</h1>
            <p className="price-text text-primary" style={{ fontSize: 28 }}>€{product.price.toFixed(2)}</p>
            <p className="body-large text-muted-foreground">{product.notes}</p>

            {/* Quantity + Add to cart */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3 bg-muted rounded-2xl px-3 py-2">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="w-8 h-8 rounded-full bg-card flex items-center justify-center hover:bg-surface-soft transition-colors" aria-label="Decrease quantity">
                  <Minus size={16} />
                </button>
                <span className="font-semibold w-8 text-center">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="w-8 h-8 rounded-full bg-card flex items-center justify-center hover:bg-surface-soft transition-colors" aria-label="Increase quantity">
                  <Plus size={16} />
                </button>
              </div>
              <button
                onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image, slug: product.slug }, qty)}
                className="flex-1 bg-primary text-primary-foreground py-4 rounded-2xl font-semibold hover:bg-primary-hover transition-all hover:-translate-y-1 gold-glow flex items-center justify-center gap-2"
              >
                Add to cart <ArrowRight size={18} />
              </button>
            </div>

            {/* Shipping note */}
            <div className="bg-cream rounded-3xl p-5 space-y-3">
              {[
                { icon: Clock, text: 'Madrid same-day before 12:00' },
                { icon: Truck, text: 'Spain 24–48h' },
                { icon: Gift, text: 'Free shipping €49+' },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <Icon size={16} className="text-gold flex-shrink-0" />
                  <span className="body-small text-primary">{text}</span>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div>
              <div className="flex gap-1 border-b border-border overflow-x-auto">
                {tabs.map((tab, i) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(i)}
                    className={`px-4 py-3 body-small font-semibold whitespace-nowrap border-b-2 transition-colors ${activeTab === i ? 'border-secondary text-secondary' : 'border-transparent text-muted-foreground hover:text-primary'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.26, ease: easeOutQuint }}
                className="py-4"
              >
                <p className="body-large text-muted-foreground">{tabContent[activeTab]}</p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Recommendations */}
        <div className="mt-16 lg:mt-28">
          <h2 className="heading-h3 text-primary mb-8">Pairs well with</h2>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6"
          >
            {recommendations.map(p => (
              <motion.div
                key={p.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOutQuint } },
                }}
              >
                <Link to={`/product/${p.slug}`} className="block bg-card rounded-3xl overflow-hidden card-shadow hover:card-shadow-hover transition-all hover:-translate-y-1">
                  <div className="aspect-square overflow-hidden">
                    <img src={p.image} alt={p.name} className="w-full h-full object-cover" loading="lazy" width={400} height={400} />
                  </div>
                  <div className="p-4">
                    <h3 className="heading-h4 text-primary" style={{ fontSize: 16 }}>{p.name}</h3>
                    <p className="price-text text-secondary mt-1" style={{ fontSize: 16 }}>€{p.price.toFixed(2)}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* JSON-LD Product Schema */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.image,
        offers: {
          '@type': 'Offer',
          price: product.price.toFixed(2),
          priceCurrency: 'EUR',
          availability: product.stock === 'in-stock' ? 'https://schema.org/InStock' : 'https://schema.org/LimitedAvailability',
        },
      }) }} />
    </main>
  );
};

export default ProductPage;
