import type { Product, Category, Order } from './types';

export const categories: Category[] = [
  { id: '1', name: 'Perfumes for Men', slug: 'perfumes-for-men', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'male perfume' },
  { id: '2', name: 'Perfumes for Women', slug: 'perfumes-for-women', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'female perfume' },
  { id: '3', name: 'Tester Box', slug: 'tester-box', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'perfume samples' },
  { id: '4', name: 'Best Sellers', slug: 'best-sellers', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'popular perfume' },
  { id: '5', name: 'Gift Box', slug: 'gift-box', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'gift box' },
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Ocean Breeze',
    description: 'A fresh, aquatic fragrance that captures the essence of a coastal storm. Notes of sea salt, cypress, and driftwood.',
    price: 120.00,
    imageUrl: 'https://placehold.co/600x600.png',
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    category: 'perfumes-for-men',
    slug: 'ocean-breeze',
    stock: 15,
    reviews: [{ rating: 5, text: 'Absolutely invigorating!', author: 'John D.' }],
  },
  {
    id: 'p2',
    name: 'Midnight Oud',
    description: 'A mysterious and smoky blend of rare oud, incense, and black pepper. Perfect for a memorable evening.',
    price: 180.00,
    imageUrl: 'https://placehold.co/600x600.png',
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    category: 'perfumes-for-men',
    slug: 'midnight-oud',
    stock: 8,
    reviews: [{ rating: 5, text: 'Powerful and long-lasting.', author: 'Mark S.' }],
  },
  {
    id: 'p3',
    name: 'Velvet Rose',
    description: 'An elegant and timeless floral scent featuring Bulgarian rose, violet, and a hint of vanilla.',
    price: 150.00,
    imageUrl: 'https://placehold.co/600x600.png',
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    category: 'perfumes-for-women',
    slug: 'velvet-rose',
    stock: 20,
    reviews: [{ rating: 4, text: 'Beautiful and romantic.', author: 'Jane A.' }],
  },
  {
    id: 'p4',
    name: 'Citrus Glow',
    description: 'A vibrant and energetic burst of Sicilian lemon, bergamot, and orange blossom. Radiates positivity.',
    price: 110.00,
    imageUrl: 'https://placehold.co/600x600.png',
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    category: 'perfumes-for-women',
    slug: 'citrus-glow',
    stock: 25,
    reviews: [{ rating: 5, text: 'My new favorite summer scent!', author: 'Emily R.' }],
  },
  {
    id: 'p5',
    name: 'Discovery Tester Set',
    description: 'Explore our five most popular fragrances with this discovery set. Includes 5 x 2ml samples.',
    price: 40.00,
    imageUrl: 'https://placehold.co/600x600.png',
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    category: 'tester-box',
    slug: 'discovery-tester-set',
    stock: 50,
    reviews: [{ rating: 5, text: 'Great way to find a favorite.', author: 'Chris P.' }],
  },
  {
    id: 'p6',
    name: 'Luxury Gift Box',
    description: 'The ultimate gift for a fragrance lover. Contains a full-size bottle, a travel spray, and a scented candle.',
    price: 250.00,
    imageUrl: 'https://placehold.co/600x600.png',
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    category: 'gift-box',
    slug: 'luxury-gift-box',
    stock: 10,
    reviews: [{ rating: 5, text: 'Stunning presentation and value.', author: 'Sophia L.' }],
  },
  {
    id: 'p7',
    name: 'Ember & Spice',
    description: 'A warm and comforting scent with notes of cinnamon, clove, and warm amber. Ideal for cozy nights in.',
    price: 135.00,
    imageUrl: 'https://placehold.co/600x600.png',
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    category: 'best-sellers',
    slug: 'ember-spice',
    stock: 18,
    reviews: [{ rating: 5, text: 'Feels like a warm hug.', author: 'David C.' }],
  },
  {
    id: 'p8',
    name: 'Solar Musk',
    description: 'A clean and radiant musk fragrance, enhanced with notes of white jasmine and ambrette.',
    price: 145.00,
    imageUrl: 'https://placehold.co/600x600.png',
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    category: 'best-sellers',
    slug: 'solar-musk',
    stock: 22,
    reviews: [{ rating: 4, text: 'Subtle yet very sophisticated.', author: 'Olivia W.' }],
  },
];

export const featuredProducts = products.slice(0, 4);
export const bestSellers = products.slice(4, 8);

export const sampleOrders: Order[] = [
    {
        id: 'ORD001',
        date: '2023-10-15',
        status: 'Delivered',
        total: 160.00,
        items: [
            { id: 'p3', name: 'Velvet Rose', price: 150.00, quantity: 1, imageUrl: 'https://placehold.co/100x100.png' },
        ]
    },
    {
        id: 'ORD002',
        date: '2023-11-01',
        status: 'Shipped',
        total: 230.00,
        items: [
            { id: 'p1', name: 'Ocean Breeze', price: 120.00, quantity: 1, imageUrl: 'https://placehold.co/100x100.png' },
            { id: 'p4', name: 'Citrus Glow', price: 110.00, quantity: 1, imageUrl: 'https://placehold.co/100x100.png' },
        ]
    },
    {
        id: 'ORD003',
        date: '2023-11-05',
        status: 'Pending',
        total: 40.00,
        items: [
            { id: 'p5', name: 'Discovery Tester Set', price: 40.00, quantity: 1, imageUrl: 'https://placehold.co/100x100.png' },
        ]
    }
];
