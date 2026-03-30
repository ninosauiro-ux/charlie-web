import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, X } from 'lucide-react';
import { products, categories } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import SectionHeading from '@/components/SectionHeading';
import { useSEO } from '@/lib/seo';

const easeSnappy = [0.16, 1, 0.3, 1] as const;

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'best', label: 'Best sellers' },
  { value: 'price-asc', label: 'Price: low to high' },
  { value: 'price-desc', label: 'Price: high to low' },
];

const ShopPage = () => {
  useSEO({
    title: 'Shop Chocolate Bars, Bonbons & Gift Boxes | Charlie Chocolate',
    description: 'Browse our handcrafted chocolate bars, bonbons, truffles, and gift boxes. Artisan chocolate from Madrid with same-day delivery.',
    path: '/shop',
  });

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sort, setSort] = useState('featured');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const filtered = useMemo(() => {
    let result = selectedCategory ? products.filter(p => p.category === selectedCategory) : [...products];
    if (sort === 'price-asc') result.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') result.sort((a, b) => b.price - a.price);
    return result;
  }, [selectedCategory, sort]);

  return (
    <main className="section-ivory noise-overlay min-h-screen">
      <div className="max-w-wide mx-auto px-4 md:px-6 py-14 md:py-20 lg:py-28">
        <SectionHeading title="Shop" subtitle="Bars, bonbons, truffles, and gift boxes—crafted to be shared." />

        {/* Filters row */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="md:hidden bg-card px-4 py-2 rounded-full body-small font-semibold text-primary card-shadow flex items-center gap-2"
            aria-label="Toggle filters"
          >
            <SlidersHorizontal size={14} /> Filters
          </button>

          <div className={`flex flex-wrap gap-2 ${filtersOpen ? 'flex' : 'hidden md:flex'}`}>
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full body-small font-semibold transition-all ${!selectedCategory ? 'bg-primary text-primary-foreground' : 'bg-card text-primary card-shadow hover:bg-muted'}`}
            >
              All
            </button>
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setSelectedCategory(cat.key)}
                className={`px-4 py-2 rounded-full body-small font-semibold transition-all ${selectedCategory === cat.key ? 'bg-primary text-primary-foreground' : 'bg-card text-primary card-shadow hover:bg-muted'}`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="ml-auto">
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              className="bg-card px-4 py-2 rounded-2xl body-small font-semibold text-primary card-shadow border-0 focus:ring-2 focus:ring-gold cursor-pointer"
              aria-label="Sort products"
            >
              {sortOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Product grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } } }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          key={`${selectedCategory}-${sort}`}
        >
          {filtered.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="heading-h3 text-primary mb-2">No products found</p>
            <p className="body-large text-muted-foreground">Try a different category.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default ShopPage;
