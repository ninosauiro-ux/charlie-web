import productBar from '@/assets/product-bar.jpg';
import productBonbons from '@/assets/product-bonbons.jpg';
import productGiftbox from '@/assets/product-giftbox.jpg';
import productHotchoc from '@/assets/product-hotchoc.jpg';
import productTruffles from '@/assets/product-truffles.jpg';

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  notes: string;
  price: number;
  image: string;
  category: 'bars' | 'bonbons' | 'truffles' | 'gift-boxes' | 'hot-chocolate';
  tags: string[];
  allergens: string;
  ingredients: string;
  flavorNotes: string;
  stock: 'in-stock' | 'low-stock';
  dietary: string[];
}

export const products: Product[] = [
  {
    id: '1',
    slug: 'midnight-sea-salt-bar',
    name: 'Midnight Sea Salt Bar (70%)',
    description: 'Deep cacao, flaky salt finish.',
    notes: 'Deep cocoa, toasted almond, clean salty finish.',
    price: 7.90,
    image: productBar,
    category: 'bars',
    tags: ['Best seller', 'Vegan'],
    allergens: 'May contain traces of nuts and milk.',
    ingredients: 'Cocoa mass, cocoa butter, cane sugar, sea salt.',
    flavorNotes: 'Deep cocoa, toasted almond, clean salty finish.',
    stock: 'in-stock',
    dietary: ['vegan'],
  },
  {
    id: '2',
    slug: 'raspberry-noir-bar',
    name: 'Raspberry Noir Bar (65%)',
    description: 'Dark chocolate with bright berry notes.',
    notes: 'Bright raspberry, dark chocolate depth, gentle tartness.',
    price: 8.50,
    image: productBar,
    category: 'bars',
    tags: ['Fruity'],
    allergens: 'May contain traces of nuts and milk.',
    ingredients: 'Cocoa mass, cocoa butter, cane sugar, freeze-dried raspberries.',
    flavorNotes: 'Bright raspberry, dark chocolate depth, gentle tartness.',
    stock: 'in-stock',
    dietary: [],
  },
  {
    id: '3',
    slug: 'pistachio-praline-bonbons',
    name: 'Pistachio Praline Bonbons (9 pcs)',
    description: 'Silky pistachio heart, crisp shell.',
    notes: 'Nutty pistachio cream, delicate crunch, lingering sweetness.',
    price: 16.90,
    image: productBonbons,
    category: 'bonbons',
    tags: ['Giftable'],
    allergens: 'Contains nuts and milk.',
    ingredients: 'Dark chocolate, pistachios, cocoa butter, cream, sugar.',
    flavorNotes: 'Nutty pistachio cream, delicate crunch, lingering sweetness.',
    stock: 'in-stock',
    dietary: [],
  },
  {
    id: '4',
    slug: 'hazelnut-gianduja-truffles',
    name: 'Hazelnut Gianduja Truffles (12 pcs)',
    description: 'Classic, melt-in-mouth.',
    notes: 'Rich hazelnut, smooth gianduja, cocoa dust finish.',
    price: 18.50,
    image: productTruffles,
    category: 'truffles',
    tags: ['Classic'],
    allergens: 'Contains nuts and milk.',
    ingredients: 'Dark chocolate, hazelnuts, cocoa butter, cream, cocoa powder.',
    flavorNotes: 'Rich hazelnut, smooth gianduja, cocoa dust finish.',
    stock: 'low-stock',
    dietary: [],
  },
  {
    id: '5',
    slug: 'caramel-crunch-bar',
    name: 'Caramel Crunch Bar (55%)',
    description: 'Buttery caramel + toasted crunch.',
    notes: 'Buttery caramel, toasted rice crunch, milky chocolate.',
    price: 8.20,
    image: productBar,
    category: 'bars',
    tags: ['Sweet'],
    allergens: 'Contains milk. May contain traces of nuts.',
    ingredients: 'Milk chocolate, caramel pieces, toasted rice, butter, sugar.',
    flavorNotes: 'Buttery caramel, toasted rice crunch, milky chocolate.',
    stock: 'in-stock',
    dietary: [],
  },
  {
    id: '6',
    slug: 'yuzu-citrus-bonbons',
    name: 'Yuzu Citrus Bonbons (9 pcs)',
    description: 'Citrus sparkle, dark finish.',
    notes: 'Bright yuzu, creamy ganache, dark chocolate snap.',
    price: 16.90,
    image: productBonbons,
    category: 'bonbons',
    tags: ['Seasonal'],
    allergens: 'Contains milk. May contain traces of nuts.',
    ingredients: 'Dark chocolate, cream, yuzu juice, cocoa butter, sugar.',
    flavorNotes: 'Bright yuzu, creamy ganache, dark chocolate snap.',
    stock: 'low-stock',
    dietary: [],
  },
  {
    id: '7',
    slug: 'golden-set-gift-box',
    name: "Charlie Gift Box — 'The Golden Set'",
    description: 'A curated mix for instant gifting.',
    notes: 'An assortment of our best bars and bonbons in a ribbon-tied box.',
    price: 29.90,
    image: productGiftbox,
    category: 'gift-boxes',
    tags: ['Gift box'],
    allergens: 'Contains nuts and milk.',
    ingredients: 'Assorted chocolates. See individual items.',
    flavorNotes: 'A journey through caramel, citrus, and cocoa.',
    stock: 'in-stock',
    dietary: [],
  },
  {
    id: '8',
    slug: 'hot-chocolate-ritual-kit',
    name: 'Hot Chocolate Ritual Kit',
    description: 'Single-origin cacao, marshmallow dust.',
    notes: 'Velvety single-origin cacao with handmade marshmallow dust.',
    price: 22.00,
    image: productHotchoc,
    category: 'hot-chocolate',
    tags: ['Cozy'],
    allergens: 'Contains milk. May contain traces of nuts.',
    ingredients: 'Single-origin cocoa powder, cane sugar, vanilla, marshmallow dust.',
    flavorNotes: 'Velvety cacao, hints of vanilla, marshmallow sweetness.',
    stock: 'in-stock',
    dietary: [],
  },
];

export const categories = [
  { key: 'bars', label: 'Bars' },
  { key: 'bonbons', label: 'Bonbons' },
  { key: 'truffles', label: 'Truffles' },
  { key: 'gift-boxes', label: 'Gift Boxes' },
  { key: 'hot-chocolate', label: 'Hot Chocolate' },
] as const;

export const getProductBySlug = (slug: string) => products.find(p => p.slug === slug);
