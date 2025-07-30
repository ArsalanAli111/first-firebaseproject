import type { Product, Category, Order } from './types';
import type { User, Attribute, Purchase } from './firestore-types';

export const categories: Category[] = [
  { id: '1', name: 'Perfumes for Men', slug: 'perfumes-for-men', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'male perfume' },
  { id: 'men-fresh', name: 'Fresh', slug: 'men-fresh', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'fresh scent', parentId: '1' },
  { id: 'men-woody', name: 'Woody', slug: 'men-woody', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'woody scent', parentId: '1' },
  { id: '2', name: 'Perfumes for Women', slug: 'perfumes-for-women', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'female perfume' },
  { id: 'women-floral', name: 'Floral', slug: 'women-floral', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'floral scent', parentId: '2' },
  { id: 'women-citrus', name: 'Citrus', slug: 'women-citrus', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'citrus scent', parentId: '2' },
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
    category: 'men-fresh',
    slug: 'ocean-breeze',
    stock: 15,
    reviews: [{ rating: 5, text: 'Absolutely invigorating!', author: 'John D.' }],
    attributes: { 'Scent Profile': 'Aquatic', 'Size': '100ml' },
  },
  {
    id: 'p2',
    name: 'Midnight Oud',
    description: 'A mysterious and smoky blend of rare oud, incense, and black pepper. Perfect for a memorable evening.',
    price: 180.00,
    imageUrl: 'https://placehold.co/600x600.png',
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    category: 'men-woody',
    slug: 'midnight-oud',
    stock: 8,
    reviews: [{ rating: 5, text: 'Powerful and long-lasting.', author: 'Mark S.' }],
    attributes: { 'Scent Profile': 'Smoky', 'Size': '50ml' },
  },
  {
    id: 'p3',
    name: 'Velvet Rose',
    description: 'An elegant and timeless floral scent featuring Bulgarian rose, violet, and a hint of vanilla.',
    price: 150.00,
    imageUrl: 'https://placehold.co/600x600.png',
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    category: 'women-floral',
    slug: 'velvet-rose',
    stock: 20,
    reviews: [{ rating: 4, text: 'Beautiful and romantic.', author: 'Jane A.' }],
    attributes: { 'Scent Profile': 'Floral', 'Size': '100ml' },
  },
  {
    id: 'p4',
    name: 'Citrus Glow',
    description: 'A vibrant and energetic burst of Sicilian lemon, bergamot, and orange blossom. Radiates positivity.',
    price: 110.00,
    imageUrl: 'https://placehold.co/600x600.png',
    images: ['https://placehold.co/600x600.png', 'https://placehold.co/600x600.png', 'https://placehold.co/600x600.png'],
    category: 'women-citrus',
    slug: 'citrus-glow',
    stock: 25,
    reviews: [{ rating: 5, text: 'My new favorite summer scent!', author: 'Emily R.' }],
    attributes: { 'Scent Profile': 'Citrus', 'Size': '50ml' },
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
    attributes: { 'Size': '5x2ml' },
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
    attributes: { 'Contents': '3 items' },
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
    attributes: { 'Scent Profile': 'Spicy', 'Size': '100ml' },
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
    attributes: { 'Scent Profile': 'Musk', 'Size': '50ml' },
  },
];

export const featuredProducts = products.slice(0, 4);
export const bestSellers = products.slice(4, 8);

export const sampleOrders: Order[] = [
    {
        id: 'ORD001',
        date: '2023-10-15',
        status: 'Delivered',
        customer: {
          name: 'Jane Doe',
          email: 'jane.doe@example.com',
        },
        total: 150.00,
        items: [
            { id: 'p3', name: 'Velvet Rose', price: 150.00, quantity: 1, imageUrl: 'https://placehold.co/100x100.png' },
        ]
    },
    {
        id: 'ORD002',
        date: '2023-11-01',
        status: 'Shipped',
        customer: {
          name: 'John Smith',
          email: 'john.smith@example.com',
        },
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
        customer: {
          name: 'Emily Johnson',
          email: 'emily.j@example.com'
        },
        total: 40.00,
        items: [
            { id: 'p5', name: 'Discovery Tester Set', price: 40.00, quantity: 1, imageUrl: 'https://placehold.co/100x100.png' },
        ]
    },
    {
      id: 'ORD004',
      date: '2023-11-06',
      status: 'Delivered',
      customer: {
        name: 'Mark S. Brown',
        email: 'mark.brown@example.com'
      },
      total: 180.00,
      items: [
        { id: 'p2', name: 'Midnight Oud', price: 180.00, quantity: 1, imageUrl: 'https://placehold.co/100x100.png' },
      ]
    },
    {
      id: 'ORD005',
      date: '2023-11-07',
      status: 'Shipped',
      customer: {
        name: 'Sophia Williams',
        email: 'sophia.w@example.com'
      },
      total: 250.00,
      items: [
        { id: 'p6', name: 'Luxury Gift Box', price: 250.00, quantity: 1, imageUrl: 'https://placehold.co/100x100.png' },
      ]
    }
];

export const users: User[] = [
  { id: 'user-001', name: 'Alice Admin', email: 'alice@example.com', role: 'admin', password: 'password123' },
  { id: 'user-007', name: 'Sam Staff', email: 'sam.staff@example.com', role: 'staff', password: 'password123' },
  { id: 'user-002', name: 'Jane Doe', email: 'jane.doe@example.com', role: 'customer', password: 'password123' },
  { id: 'user-003', name: 'John Smith', email: 'john.smith@example.com', role: 'customer', password: 'password123' },
  { id: 'user-004', name: 'Emily Johnson', email: 'emily.j@example.com', role: 'customer', password: 'password123' },
  { id: 'user-005', name: 'Mark S. Brown', email: 'mark.brown@example.com', role: 'customer', password: 'password123' },
  { id: 'user-006', name: 'Sophia Williams', email: 'sophia.w@example.com', role: 'customer', password: 'password123' },
];

export const attributes: Attribute[] = [
  {
    id: 'attr1',
    type: 'Scent Profile',
    values: ['Aquatic', 'Smoky', 'Floral', 'Citrus', 'Spicy', 'Musk'],
  },
  {
    id: 'attr2',
    type: 'Size',
    values: ['30ml', '50ml', '100ml'],
  },
  {
    id: 'attr3',
    type: 'Concentration',
    values: ['Eau de Parfum', 'Eau de Toilette', 'Extrait de Parfum'],
  },
];


export const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 5500 },
];

export const newCustomersData = [
    { month: 'Jan', newCustomers: 23 },
    { month: 'Feb', newCustomers: 31 },
    { month: 'Mar', newCustomers: 45 },
    { month: 'Apr', newCustomers: 42 },
    { month: 'May', newCustomers: 56 },
    { month: 'Jun', newCustomers: 60 },
];

type SamplePurchase = Omit<Purchase, 'date' | 'totalCost'> & { date: string; totalCost?: number };

const samplePurchaseData: SamplePurchase[] = [
    {
        id: 'pur-001',
        supplier: 'Fragrance Oils Inc.',
        productId: 'p1',
        quantity: 50,
        unitCost: 50,
        date: '2023-10-01'
    },
    {
        id: 'pur-002',
        supplier: 'Aroma Chemicals LLC',
        productId: 'p2',
        quantity: 30,
        unitCost: 90,
        date: '2023-10-05'
    },
    {
        id: 'pur-003',
        supplier: 'Global Perfumes Co.',
        productId: 'p3',
        quantity: 100,
        unitCost: 60,
        date: '2023-10-10'
    },
     {
        id: 'pur-004',
        supplier: 'Fragrance Oils Inc.',
        productId: 'p1',
        quantity: 50,
        unitCost: 50,
        date: '2023-11-01'
    },
];

export const samplePurchases: (Omit<Purchase, 'date'> & { date: string })[] = samplePurchaseData.map(p => ({
    ...p,
    totalCost: p.quantity * p.unitCost
}));
