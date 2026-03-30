import { motion } from 'framer-motion';
import { Plus, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCartContext } from '@/contexts/CartContext';
import type { Product } from '@/data/products';

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] as const } },
};

const ProductCard = ({ product, index = 0 }: { product: Product; index?: number }) => {
  const { addItem } = useCartContext();

  return (
    <motion.div
      variants={cardVariants}
      className="group relative bg-card rounded-3xl overflow-hidden card-shadow hover:card-shadow-hover transition-shadow duration-300"
    >
      {/* Image */}
      <Link to={`/product/${product.slug}`} className="block overflow-hidden aspect-square">
        <motion.img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          loading="lazy"
          width={400}
          height={400}
        />
      </Link>

      {/* Tags */}
      {product.tags.length > 0 && (
        <div className="absolute top-3 left-3 flex gap-1.5 z-10">
          {product.tags.map(tag => (
            <span key={tag} className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
              tag === 'Best seller' ? 'bg-gold text-primary' :
              tag === 'Seasonal' ? 'bg-berry text-primary-foreground' :
              tag === 'Gift box' ? 'bg-secondary text-secondary-foreground' :
              'bg-card/90 text-primary backdrop-blur-sm'
            }`}>
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Stock */}
      {product.stock === 'low-stock' && (
        <span className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold bg-berry/10 text-berry">Low stock</span>
      )}

      {/* Info */}
      <div className="p-4 space-y-2">
        <Link to={`/product/${product.slug}`}>
          <h3 className="heading-h4 text-primary hover:text-secondary transition-colors line-clamp-2" style={{ fontSize: 16 }}>{product.name}</h3>
        </Link>
        <p className="body-small text-muted-foreground line-clamp-1">{product.description}</p>
        <div className="flex items-center justify-between pt-1">
          <span className="price-text text-primary">€{product.price.toFixed(2)}</span>
          <span className="body-small text-muted-foreground">{product.stock === 'in-stock' ? 'In stock' : 'Low stock'}</span>
        </div>
      </div>

      {/* Hover actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute bottom-[120px] left-0 right-0 px-4 opacity-0 group-hover:opacity-100 transition-all duration-200 flex gap-2"
      >
        <button
          onClick={() => addItem({ id: product.id, name: product.name, price: product.price, image: product.image, slug: product.slug })}
          className="flex-1 bg-primary text-primary-foreground py-2.5 rounded-2xl font-semibold text-sm flex items-center justify-center gap-1.5 hover:bg-primary-hover transition-colors"
          aria-label={`Add ${product.name} to cart`}
        >
          <Plus size={16} /> Add to cart
        </button>
        <Link
          to={`/product/${product.slug}`}
          className="bg-muted text-primary py-2.5 px-3 rounded-2xl hover:bg-surface-soft transition-colors flex items-center"
          aria-label={`Quick view ${product.name}`}
        >
          <Eye size={16} />
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default ProductCard;
