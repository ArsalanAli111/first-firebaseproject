
import type { Product, Category, Order } from './types';
import type { User, Attribute, Purchase } from './firestore-types';

export const categories: Category[] = [
  { id: 'cat1', name: 'Perfumes for Men', slug: 'perfumes-for-men', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'male perfume' },
  { id: 'cat2', name: 'Perfumes for Women', slug: 'perfumes-for-women', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'female perfume' },
  { id: 'cat3', name: 'Unisex Perfumes', slug: 'unisex-perfumes', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'unisex perfume' },
  { id: 'cat4', name: 'Gift Sets', slug: 'gift-sets', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'gift box' },
  { id: 'cat5', name: 'Tester Perfumes', slug: 'tester-perfumes', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'perfume samples' },
  { id: 'cat6', name: 'Luxury Collection', slug: 'luxury-collection', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'luxury perfume' },
  { id: 'cat7', name: 'Best Sellers', slug: 'best-sellers', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'popular perfume' },
  { id: 'cat8', name: 'New Arrivals', slug: 'new-arrivals', imageUrl: 'https://placehold.co/400x300.png', dataAiHint: 'new perfume' },
];


export const products: Product[] = [
  // Perfumes for Men
  {
    id: 'p1', name: 'Ocean Breeze', description: 'A fresh, aquatic fragrance that captures the essence of a coastal storm.', price: 120.00,
    imageUrl: 'https://placehold.co/600x600.png?text=Ocean+Breeze', images: ['https://placehold.co/600x600.png?text=Ocean+Breeze'],
    category: 'perfumes-for-men', slug: 'ocean-breeze', stock: 15, brand: 'Aqua Di Mare',
    reviews: [{ rating: 5, text: 'Absolutely invigorating!', author: 'John D.' }], attributes: { 'Scent': 'Aquatic', 'Size': '100ml' },
  },
  {
    id: 'p2', name: 'Forest Floor', description: 'A deep, earthy scent with notes of oakmoss, sandalwood, and vetiver.', price: 135.00,
    imageUrl: 'https://placehold.co/600x600.png?text=Forest+Floor', images: ['https://placehold.co/600x600.png?text=Forest+Floor'],
    category: 'perfumes-for-men', slug: 'forest-floor', stock: 20, brand: 'Terra Firma',
    reviews: [{ rating: 4, text: 'Very grounding and masculine.', author: 'Mike R.' }], attributes: { 'Scent': 'Woody', 'Size': '100ml' },
  },
  // Perfumes for Women
  {
    id: 'p3', name: 'Velvet Rose', description: 'An elegant and timeless floral scent featuring Bulgarian rose, violet, and a hint of vanilla.', price: 150.00,
    imageUrl: 'https://placehold.co/600x600.png?text=Velvet+Rose', images: ['https://placehold.co/600x600.png?text=Velvet+Rose'],
    category: 'perfumes-for-women', slug: 'velvet-rose', stock: 20, brand: 'Fleur Chic',
    reviews: [{ rating: 4, text: 'Beautiful and romantic.', author: 'Jane A.' }], attributes: { 'Scent': 'Floral', 'Size': '100ml' },
  },
  {
    id: 'p4', name: 'Citrus Glow', description: 'A vibrant and energetic burst of Sicilian lemon, bergamot, and orange blossom.', price: 110.00,
    imageUrl: 'https://placehold.co/600x600.png?text=Citrus+Glow', images: ['https://placehold.co/600x600.png?text=Citrus+Glow'],
    category: 'perfumes-for-women', slug: 'citrus-glow', stock: 25, brand: 'Zest & Co.',
    reviews: [{ rating: 5, text: 'My new favorite summer scent!', author: 'Emily R.' }], attributes: { 'Scent': 'Citrus', 'Size': '50ml' },
  },
  // Unisex Perfumes
  {
    id: 'p5', name: 'Noir Enigma', description: 'A complex, spicy-sweet scent with notes of black cardamom, incense, and vanilla.', price: 165.00,
    imageUrl: 'https://placehold.co/600x600.png?text=Noir+Enigma', images: ['https://placehold.co/600x600.png?text=Noir+Enigma'],
    category: 'unisex-perfumes', slug: 'noir-enigma', stock: 12, brand: 'Obscura',
    reviews: [{ rating: 5, text: 'Truly unique and captivating.', author: 'Alex G.' }], attributes: { 'Scent': 'Oriental', 'Size': '75ml' },
  },
  {
    id: 'p6', name: 'Green Tea & Ginger', description: 'A clean, crisp, and uplifting fragrance perfect for everyday wear.', price: 95.00,
    imageUrl: 'https://placehold.co/600x600.png?text=Green+Tea', images: ['https://placehold.co/600x600.png?text=Green+Tea'],
    category: 'unisex-perfumes', slug: 'green-tea-ginger', stock: 30, brand: 'Zen Garden',
    reviews: [{ rating: 4, text: 'So refreshing and light.', author: 'Sam T.' }], attributes: { 'Scent': 'Aromatic', 'Size': '100ml' },
  },
  // Gift Sets
  {
    id: 'p7', name: 'His & Hers Duo', description: 'A perfect pairing of our best-selling men\'s and women\'s fragrances.', price: 220.00,
    imageUrl: 'https://placehold.co/600x600.png?text=His+Hers+Duo', images: ['https://placehold.co/600x600.png?text=His+Hers+Duo'],
    category: 'gift-sets', slug: 'his-hers-duo', stock: 15, brand: 'Scent Sample',
    reviews: [], attributes: { 'Contains': '2x50ml Bottles' },
  },
  {
    id: 'p8', name: 'Luxury Gift Box', description: 'The ultimate gift. Contains a full-size bottle, travel spray, and scented candle.', price: 250.00,
    imageUrl: 'https://placehold.co/600x600.png?text=Luxury+Gift+Box', images: ['https://placehold.co/600x600.png?text=Luxury+Gift+Box'],
    category: 'gift-sets', slug: 'luxury-gift-box', stock: 10, brand: 'Scent Sample',
    reviews: [{ rating: 5, text: 'Stunning presentation.', author: 'Sophia L.' }], attributes: { 'Contents': '3 items' },
  },
  // Tester Perfumes
  {
    id: 'p9', name: 'Discovery Tester Set', description: 'Explore our five most popular fragrances with this discovery set.', price: 40.00,
    imageUrl: 'https://placehold.co/600x600.png?text=Discovery+Set', images: ['https://placehold.co/600x600.png?text=Discovery+Set'],
    category: 'tester-perfumes', slug: 'discovery-tester-set', stock: 50, brand: 'Scent Sample',
    reviews: [{ rating: 5, text: 'Great way to find a favorite.', author: 'Chris P.' }], attributes: { 'Size': '5x2ml' },
  },
  {
    id: 'p10', name: 'Floral Notes Sampler', description: 'A curated selection of our finest floral perfumes for women.', price: 45.00,
    imageUrl: 'https://placehold.co/600x600.png?text=Floral+Sampler', images: ['https://placehold.co/600x600.png?text=Floral+Sampler'],
    category: 'tester-perfumes', slug: 'floral-notes-sampler', stock: 35, brand: 'Scent Sample',
    reviews: [], attributes: { 'Size': '5x2ml' },
  },
  // Luxury Collection
  {
    id: 'p11', name: 'Midnight Oud', description: 'A mysterious and smoky blend of rare oud, incense, and black pepper.', price: 180.00,
    imageUrl: 'https://placehold.co/600x600.png?text=Midnight+Oud', images: ['https://placehold.co/600x600.png?text=Midnight+Oud'],
    category: 'luxury-collection', slug: 'midnight-oud', stock: 8, brand: 'Arabian Nights',
    reviews: [{ rating: 5, text: 'Powerful and long-lasting.', author: 'Mark S.' }], attributes: { 'Scent': 'Smoky', 'Size': '50ml' },
  },
  {
    id: 'p12', name: 'Imperial Amber', description: 'A rich and opulent fragrance with golden amber, saffron, and aged leather.', price: 275.00,
    imageUrl: 'https://placehold.co/600x600.png?text=Imperial+Amber', images: ['https://placehold.co/600x600.png?text=Imperial+Amber'],
    category: 'luxury-collection', slug: 'imperial-amber', stock: 5, brand: 'Royal Scents',
    reviews: [], attributes: { 'Scent': 'Amber', 'Size': '100ml' },
  },
  // Best Sellers
  {
    id: 'p13', name: 'Ember & Spice', description: 'A warm scent with cinnamon, clove, and amber. Ideal for cozy nights.', price: 135.00,
    imageUrl: 'https://placehold.co/600x600.png?text=Ember+Spice', images: ['https://placehold.co/600x600.png?text=Ember+Spice'],
    category: 'best-sellers', slug: 'ember-spice', stock: 18, brand: 'Arabian Nights',
    reviews: [{ rating: 5, text: 'Feels like a warm hug.', author: 'David C.' }], attributes: { 'Scent': 'Spicy', 'Size': '100ml' },
  },
  {
    id: 'p14', name: 'Solar Musk', description: 'A clean and radiant musk fragrance, enhanced with white jasmine and ambrette.', price: 145.00,
    imageUrl: 'https://placehold.co/600x600.png?text=Solar+Musk', images: ['https://placehold.co/600x600.png?text=Solar+Musk'],
    category: 'best-sellers', slug: 'solar-musk', stock: 22, brand: 'Fleur Chic',
    reviews: [{ rating: 4, text: 'Subtle yet very sophisticated.', author: 'Olivia W.' }], attributes: { 'Scent': 'Musk', 'Size': '50ml' },
  },
  // New Arrivals
  {
    id: 'p15', name: 'Aqua Vitae', description: 'A modern marine fragrance with notes of grapefruit, sea minerals, and cedar.', price: 125.00,
    imageUrl: 'https://placehold.co/600x600.png?text=Aqua+Vitae', images: ['https://placehold.co/600x600.png?text=Aqua+Vitae'],
    category: 'new-arrivals', slug: 'aqua-vitae', stock: 25, brand: 'Aqua Di Mare',
    reviews: [], attributes: { 'Scent': 'Marine', 'Size': '100ml' },
  },
  {
    id: 'p16', name: 'Petal Haze', description: 'A dreamy, soft floral with peony, lychee, and white musk.', price: 155.00,
    imageUrl: 'https://placehold.co/600x600.png?text=Petal+Haze', images: ['https://placehold.co/600x600.png?text=Petal+Haze'],
    category: 'new-arrivals', slug: 'petal-haze', stock: 18, brand: 'Fleur Chic',
    reviews: [], attributes: { 'Scent': 'Floral', 'Size': '75ml' },
  }
];


export const featuredProducts = products.slice(0, 4);
export const bestSellers = products.filter(p => p.category === 'best-sellers');

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
            { id: 'p9', name: 'Discovery Tester Set', price: 40.00, quantity: 1, imageUrl: 'https://placehold.co/100x100.png' },
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
        { id: 'p11', name: 'Midnight Oud', price: 180.00, quantity: 1, imageUrl: 'https://placehold.co/100x100.png' },
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
        { id: 'p8', name: 'Luxury Gift Box', price: 250.00, quantity: 1, imageUrl: 'https://placehold.co/100x100.png' },
      ]
    }
];

export const users: User[] = [
  { id: 'user-001', name: 'Alice Admin', email: 'alice@example.com', role: 'admin', password: 'password123', phone: '111-222-3333', address: '1 Admin Way', city: 'Adminville', state: 'AD', postalCode: '11111', country: 'USA' },
  { id: 'user-007', name: 'Sam Staff', email: 'sam.staff@example.com', role: 'staff', password: 'password123', phone: '222-333-4444', address: '2 Staff St', city: 'Workerton', state: 'ST', postalCode: '22222', country: 'USA' },
  { id: 'user-002', name: 'Jane Doe', email: 'jane.doe@example.com', role: 'customer', password: 'password123', phone: '333-444-5555', address: '123 Perfume Ln', city: 'Scent City', state: 'CA', postalCode: '90210', country: 'USA' },
  { id: 'user-003', name: 'John Smith', email: 'john.smith@example.com', role: 'customer', password: 'password123', phone: '444-555-6666', address: '456 Aroma Ave', city: 'Fragrance Town', state: 'NY', postalCode: '10001', country: 'USA' },
  { id: 'user-004', name: 'Emily Johnson', email: 'emily.j@example.com', role: 'customer', password: 'password123', phone: '555-666-7777', address: '789 Scented Blvd', city: 'Olfactory Oasis', state: 'FL', postalCode: '33101', country: 'USA' },
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
  { name: 'Jan', sales: 4000, revenue: 2400 },
  { name: 'Feb', sales: 3000, revenue: 1398 },
  { name: 'Mar', sales: 5000, revenue: 9800 },
  { name: 'Apr', sales: 4500, revenue: 3908 },
  { name: 'May', sales: 6000, revenue: 4800 },
  { name: 'Jun', sales: 5500, revenue: 3800 },
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
