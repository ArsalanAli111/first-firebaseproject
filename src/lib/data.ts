
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

export const attributes: Attribute[] = [
  {
    id: 'attr1',
    type: 'Fragrance Family',
    values: ['Woody', 'Floral', 'Oriental', 'Citrus', 'Fresh', 'Spicy', 'Aquatic'],
  },
  {
    id: 'attr2',
    type: 'Size',
    values: ['50ml', '75ml', '100ml', '150ml'],
  },
  {
    id: 'attr3',
    type: 'Gender',
    values: ['Men', 'Women', 'Unisex'],
  },
];


export const products: Product[] = [
    // --- Perfumes for Men (8) ---
    { id: 'p1', name: 'Titanium Edge', description: 'A sharp, metallic fragrance with notes of ginger, juniper, and cedarwood.', price: 115.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'perfume bottle', images: [], category: 'perfumes-for-men', slug: 'titanium-edge', stock: 25, brand: 'Vanguard', reviews: [], attributes: { 'Fragrance Family': 'Woody', 'Size': '100ml', 'Gender': 'Men' } },
    { id: 'p2', name: 'Savage Leather', description: 'A raw, animalic scent of worn leather, tobacco, and black pepper.', price: 145.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'perfume bottle', images: [], category: 'perfumes-for-men', slug: 'savage-leather', stock: 18, brand: 'Nomad', reviews: [], attributes: { 'Fragrance Family': 'Woody', 'Size': '75ml', 'Gender': 'Men' } },
    { id: 'p3', name: 'Nautical Depth', description: 'An invigorating blast of sea salt, cypress, and ambergris.', price: 95.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'perfume bottle', images: [], category: 'perfumes-for-men', slug: 'nautical-depth', stock: 30, brand: 'Aqua Drift', reviews: [], attributes: { 'Fragrance Family': 'Aquatic', 'Size': '150ml', 'Gender': 'Men' } },
    { id: 'p4', name: 'Urban Knight', description: 'A sophisticated city blend of bergamot, lavender, and tonka bean.', price: 125.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'perfume bottle', images: [], category: 'perfumes-for-men', slug: 'urban-knight', stock: 22, brand: 'Metropolis', reviews: [], attributes: { 'Fragrance Family': 'Fresh', 'Size': '100ml', 'Gender': 'Men' } },
    { id: 'p5', name: 'Spiced Ember', description: 'A warm, inviting mix of cardamom, cinnamon, and vanilla.', price: 130.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'perfume bottle', images: [], category: 'perfumes-for-men', slug: 'spiced-ember', stock: 20, brand: 'Hearth', reviews: [], attributes: { 'Fragrance Family': 'Spicy', 'Size': '100ml', 'Gender': 'Men' } },
    { id: 'p6', name: 'Alpine Trail', description: 'Crisp mountain air captured with pine, mint, and white musk.', price: 110.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'perfume bottle', images: [], category: 'perfumes-for-men', slug: 'alpine-trail', stock: 28, brand: 'Summit Scents', reviews: [], attributes: { 'Fragrance Family': 'Fresh', 'Size': '75ml', 'Gender': 'Men' } },
    { id: 'p7', name: 'Volcanic Ash', description: 'A smoky, mineralic fragrance of incense, vetiver, and burning birch.', price: 155.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'perfume bottle', images: [], category: 'perfumes-for-men', slug: 'volcanic-ash', stock: 15, brand: 'Eruption', reviews: [], attributes: { 'Fragrance Family': 'Woody', 'Size': '50ml', 'Gender': 'Men' } },
    { id: 'p8', name: 'Citrus Reserve', description: 'A refined blend of blood orange, patchouli, and aged oak.', price: 140.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'perfume bottle', images: [], category: 'perfumes-for-men', slug: 'citrus-reserve', stock: 19, brand: 'Orchard & Oak', reviews: [], attributes: { 'Fragrance Family': 'Citrus', 'Size': '100ml', 'Gender': 'Men' } },

    // --- Perfumes for Women (8) ---
    { id: 'p9', name: 'Silk Petals', description: 'A delicate whisper of peony, lychee, and rosewater.', price: 120.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'perfume bottle', images: [], category: 'perfumes-for-women', slug: 'silk-petals', stock: 35, brand: 'Fleur Chic', reviews: [], attributes: { 'Fragrance Family': 'Floral', 'Size': '100ml', 'Gender': 'Women' } },
    { id: 'p10', name: 'Golden Hour', description: 'A warm, radiant glow of neroli, amber, and white musk.', price: 160.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'perfume bottle', images: [], category: 'perfumes-for-women', slug: 'golden-hour', stock: 20, brand: 'Aura', reviews: [], attributes: { 'Fragrance Family': 'Oriental', 'Size': '75ml', 'Gender': 'Women' } },
    { id: 'p11', name: 'Midnight Jasmine', description: 'An intoxicating evening scent of night-blooming jasmine, tuberose, and sandalwood.', price: 140.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'perfume bottle', images: [], category: 'perfumes-for-women', slug: 'midnight-jasmine', stock: 22, brand: 'Nocturne', reviews: [], attributes: { 'Fragrance Family': 'Floral', 'Size': '50ml', 'Gender': 'Women' } },
    { id: 'p12', name: 'Berry Blush', description: 'A playful, sweet mix of red berries, vanilla, and praline.', price: 85.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'perfume bottle', images: [], category: 'perfumes-for-women', slug: 'berry-blush', stock: 40, brand: 'Confection', reviews: [], attributes: { 'Fragrance Family': 'Fresh', 'Size': '100ml', 'Gender': 'Women' } },
    { id: 'p13', name: 'Cashmere Kiss', description: 'A soft, comforting embrace of cashmere woods, vanilla bean, and a hint of peach.', price: 175.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'perfume bottle', images: [], category: 'perfumes-for-women', slug: 'cashmere-kiss', stock: 18, brand: 'Intime', reviews: [], attributes: { 'Fragrance Family': 'Oriental', 'Size': '75ml', 'Gender': 'Women' } },
    { id: 'p14', name: 'Solaris Bloom', description: 'A bright, solar floral featuring ylang-ylang, coconut, and bergamot.', price: 130.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'perfume bottle', images: [], category: 'perfumes-for-women', slug: 'solaris-bloom', stock: 25, brand: 'Sun-Kissed', reviews: [], attributes: { 'Fragrance Family': 'Floral', 'Size': '100ml', 'Gender': 'Women' } },
    { id: 'p15', name: 'Velvet Orchid', description: 'A rich, mysterious floral with black orchid, plum, and patchouli.', price: 180.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'perfume bottle', images: [], category: 'perfumes-for-women', slug: 'velvet-orchid', stock: 15, brand: 'Obsidian Flora', reviews: [], attributes: { 'Fragrance Family': 'Oriental', 'Size': '50ml', 'Gender': 'Women' } },
    { id: 'p16', name: 'Gilded Lily', description: 'A sparkling, sophisticated lily scent with hints of mandarin and white woods.', price: 150.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'perfume bottle', images: [], category: 'perfumes-for-women', slug: 'gilded-lily', stock: 19, brand: 'Opulence', reviews: [], attributes: { 'Fragrance Family': 'Floral', 'Size': '75ml', 'Gender': 'Women' } },

    // --- Unisex Perfumes (8) ---
    { id: 'p17', name: 'Oud Equinox', description: 'A balanced harmony of rare oud, rose, and saffron for all.', price: 210.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'perfume bottle', images: [], category: 'unisex-perfumes', slug: 'oud-equinox', stock: 12, brand: 'Balance', reviews: [], attributes: { 'Fragrance Family': 'Oriental', 'Size': '75ml', 'Gender': 'Unisex' } },
    { id: 'p18', name: 'Paper & Ink', description: 'A minimalist scent of crisp paper, dry ink, and a hint of leather.', price: 125.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'perfume bottle', images: [], category: 'unisex-perfumes', slug: 'paper-ink', stock: 25, brand: 'Bibliotheque', reviews: [], attributes: { 'Fragrance Family': 'Woody', 'Size': '50ml', 'Gender': 'Unisex' } },
    { id: 'p19', name: 'Concrete Jungle', description: 'An urban-inspired mix of wet asphalt, metal, and fresh ginger.', price: 145.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'perfume bottle', images: [], category: 'unisex-perfumes', slug: 'concrete-jungle', stock: 20, brand: 'Urbanite', reviews: [], attributes: { 'Fragrance Family': 'Fresh', 'Size': '100ml', 'Gender': 'Unisex' } },
    { id: 'p20', name: 'Smoke & Mirrors', description: 'A mysterious blend of burning palo santo, vanilla absolute, and black pepper.', price: 165.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'perfume bottle', images: [], category: 'unisex-perfumes', slug: 'smoke-mirrors', stock: 18, brand: 'Illusion', reviews: [], attributes: { 'Fragrance Family': 'Woody', 'Size': '75ml', 'Gender': 'Unisex' } },
    { id: 'p21', name: 'Green Tea Therapy', description: 'A calming infusion of matcha green tea, white mint, and clary sage.', price: 90.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'perfume bottle', images: [], category: 'unisex-perfumes', slug: 'green-tea-therapy', stock: 30, brand: 'Serenity', reviews: [], attributes: { 'Fragrance Family': 'Fresh', 'Size': '150ml', 'Gender': 'Unisex' } },
    { id: 'p22', name: 'Amber Solstice', description: 'A radiant amber core, warmed by saffron and cedar.', price: 190.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'perfume bottle', images: [], category: 'unisex-perfumes', slug: 'amber-solstice', stock: 14, brand: 'Sol', reviews: [], attributes: { 'Fragrance Family': 'Oriental', 'Size': '50ml', 'Gender': 'Unisex' } },
    { id: 'p23', name: 'Citrus & Sage', description: 'A clean, herbal blend of grapefruit, clary sage, and vetiver.', price: 105.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'perfume bottle', images: [], category: 'unisex-perfumes', slug: 'citrus-sage', stock: 28, brand: 'Apothecary', reviews: [], attributes: { 'Fragrance Family': 'Citrus', 'Size': '100ml', 'Gender': 'Unisex' } },
    { id: 'p24', name: 'Fig Leaf', description: 'A green, milky scent of fresh fig leaves, coconut, and blond woods.', price: 135.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'perfume bottle', images: [], category: 'unisex-perfumes', slug: 'fig-leaf', stock: 21, brand: 'Grove', reviews: [], attributes: { 'Fragrance Family': 'Fresh', 'Size': '75ml', 'Gender': 'Unisex' } },

    // --- Gift Sets (5) ---
    { id: 'p25', name: 'Men\'s Signature Set', description: 'A trio of our top men\'s fragrances in convenient 50ml bottles.', price: 195.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'gift set', images: [], category: 'gift-sets', slug: 'mens-signature-set', stock: 15, brand: 'Scent Sample', reviews: [], attributes: { 'Contains': '3x50ml Bottles', 'Gender': 'Men' } },
    { id: 'p26', name: 'Women\'s Floral Trio', description: 'Explore a bouquet of our most beloved floral scents.', price: 210.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'gift set', images: [], category: 'gift-sets', slug: 'womens-floral-trio', stock: 12, brand: 'Scent Sample', reviews: [], attributes: { 'Contains': '3x50ml Bottles', 'Gender': 'Women' } },
    { id: 'p27', name: 'Unisex Discovery Box', description: 'A curated collection of five daring unisex fragrances for the modern scent explorer.', price: 110.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'gift box', images: [], category: 'gift-sets', slug: 'unisex-discovery-box', stock: 20, brand: 'Scent Sample', reviews: [], attributes: { 'Contains': '5x10ml Sprays', 'Gender': 'Unisex' } },
    { id: 'p28', name: 'The Ultimate Luxury Set', description: 'A full-size luxury perfume, matching candle, and body lotion in an exquisite gift box.', price: 250.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'gift box', images: [], category: 'gift-sets', slug: 'ultimate-luxury-set', stock: 10, brand: 'Scent Sample', reviews: [], attributes: { 'Contains': '3 items', 'Gender': 'Unisex' } },
    { id: 'p29', name: 'His & Hers Duo', description: 'The perfect gift for a couple, featuring complementary scents for him and her.', price: 220.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'gift set', images: [], category: 'gift-sets', slug: 'his-hers-duo', stock: 18, brand: 'Scent Sample', reviews: [], attributes: { 'Contains': '2x75ml Bottles', 'Gender': 'Unisex' } },

    // --- Tester Perfumes (5) ---
    { id: 'p30', name: 'Woody Wonders Sampler', description: 'A journey through the forest with five distinct woody fragrances.', price: 55.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'perfume samples', images: [], category: 'tester-perfumes', slug: 'woody-wonders-sampler', stock: 40, brand: 'Scent Sample', reviews: [], attributes: { 'Size': '5x2ml', 'Gender': 'Unisex' } },
    { id: 'p31', name: 'Citrus Splash Collection', description: 'A vibrant selection of five zesty and uplifting citrus scents.', price: 50.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'perfume samples', images: [], category: 'tester-perfumes', slug: 'citrus-splash-collection', stock: 45, brand: 'Scent Sample', reviews: [], attributes: { 'Size': '5x2ml', 'Gender': 'Unisex' } },
    { id: 'p32', name: 'Oriental Dreams Set', description: 'Uncover the mystery of the East with five rich and exotic perfumes.', price: 60.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'perfume samples', images: [], category: 'tester-perfumes', slug: 'oriental-dreams-set', stock: 35, brand: 'Scent Sample', reviews: [], attributes: { 'Size': '5x2ml', 'Gender': 'Unisex' } },
    { id: 'p33', name: 'Best of Men Tester Kit', description: 'Sample our five top-rated fragrances for men.', price: 55.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'perfume samples', images: [], category: 'tester-perfumes', slug: 'best-of-men-tester-kit', stock: 38, brand: 'Scent Sample', reviews: [], attributes: { 'Size': '5x2ml', 'Gender': 'Men' } },
    { id: 'p34', name: 'Best of Women Tester Kit', description: 'Sample our five top-rated fragrances for women.', price: 55.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'perfume samples', images: [], category: 'tester-perfumes', slug: 'best-of-women-tester-kit', stock: 38, brand: 'Scent Sample', reviews: [], attributes: { 'Size': '5x2ml', 'Gender': 'Women' } },
    
    // --- Luxury Collection (6) ---
    { id: 'p35', name: 'Imperial Oud', description: 'Sourced from the finest agarwood, this is a statement of pure opulence.', price: 250.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'luxury perfume', images: [], category: 'luxury-collection', slug: 'imperial-oud', stock: 10, brand: 'Royal Scents', reviews: [], attributes: { 'Fragrance Family': 'Oriental', 'Size': '100ml', 'Gender': 'Unisex' } },
    { id: 'p36', name: 'Diamond Dust', description: 'A sparkling, ethereal scent with iris, ambrette, and white aldehydes.', price: 240.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'luxury perfume', images: [], category: 'luxury-collection', slug: 'diamond-dust', stock: 12, brand: 'Gemstone', reviews: [], attributes: { 'Fragrance Family': 'Floral', 'Size': '75ml', 'Gender': 'Women' } },
    { id: 'p37', name: 'Royal Leather', description: 'The scent of a king\'s library; aged leather, rare manuscripts, and fine cedar.', price: 235.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'luxury perfume', images: [], category: 'luxury-collection', slug: 'royal-leather', stock: 11, brand: 'Monarch', reviews: [], attributes: { 'Fragrance Family': 'Woody', 'Size': '100ml', 'Gender': 'Men' } },
    { id: 'p38', name: 'Saffron Elixir', description: 'A rich and potent blend of Persian saffron, damask rose, and vanilla absolute.', price: 225.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'luxury perfume', images: [], category: 'luxury-collection', slug: 'saffron-elixir', stock: 14, brand: 'Alchemist', reviews: [], attributes: { 'Fragrance Family': 'Spicy', 'Size': '50ml', 'Gender': 'Unisex' } },
    { id: 'p39', name: 'Éclat de Jardin', description: 'A masterful floral composition capturing a private garden in full bloom after a spring rain.', price: 215.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'luxury perfume', images: [], category: 'luxury-collection', slug: 'eclat-de-jardin', stock: 16, brand: 'Haute Parfumerie', reviews: [], attributes: { 'Fragrance Family': 'Floral', 'Size': '75ml', 'Gender': 'Women' } },
    { id: 'p40', name: 'Centurion', description: 'A powerful and commanding fragrance of Roman pine, incense, and marble.', price: 220.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'luxury perfume', images: [], category: 'luxury-collection', slug: 'centurion', stock: 9, brand: 'Imperium', reviews: [], attributes: { 'Fragrance Family': 'Woody', 'Size': '100ml', 'Gender': 'Men' } },

    // --- Best Sellers (5) --- (Pulling from other categories)
    { id: 'p41', name: 'Savage Leather (Best Seller)', description: 'A raw, animalic scent of worn leather, tobacco, and black pepper.', price: 145.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'perfume bottle', images: [], category: 'best-sellers', slug: 'savage-leather-bs', stock: 18, brand: 'Nomad', reviews: [], attributes: { 'Fragrance Family': 'Woody', 'Size': '75ml', 'Gender': 'Men' } },
    { id: 'p42', name: 'Silk Petals (Best Seller)', description: 'A delicate whisper of peony, lychee, and rosewater.', price: 120.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'perfume bottle', images: [], category: 'best-sellers', slug: 'silk-petals-bs', stock: 35, brand: 'Fleur Chic', reviews: [], attributes: { 'Fragrance Family': 'Floral', 'Size': '100ml', 'Gender': 'Women' } },
    { id: 'p43', name: 'Paper & Ink (Best Seller)', description: 'A minimalist scent of crisp paper, dry ink, and a hint of leather.', price: 125.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'perfume bottle', images: [], category: 'best-sellers', slug: 'paper-ink-bs', stock: 25, brand: 'Bibliotheque', reviews: [], attributes: { 'Fragrance Family': 'Woody', 'Size': '50ml', 'Gender': 'Unisex' } },
    { id: 'p44', name: 'Golden Hour (Best Seller)', description: 'A warm, radiant glow of neroli, amber, and white musk.', price: 160.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'perfume bottle', images: [], category: 'best-sellers', slug: 'golden-hour-bs', stock: 20, brand: 'Aura', reviews: [], attributes: { 'Fragrance Family': 'Oriental', 'Size': '75ml', 'Gender': 'Women' } },
    { id: 'p45', name: 'Urban Knight (Best Seller)', description: 'A sophisticated city blend of bergamot, lavender, and tonka bean.', price: 125.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'perfume bottle', images: [], category: 'best-sellers', slug: 'urban-knight-bs', stock: 22, brand: 'Metropolis', reviews: [], attributes: { 'Fragrance Family': 'Fresh', 'Size': '100ml', 'Gender': 'Men' } },

    // --- New Arrivals (5) ---
    { id: 'p46', name: 'Matcha Morning', description: 'The serene scent of a morning ritual, with notes of matcha, rice milk, and bamboo.', price: 115.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'perfume bottle', images: [], category: 'new-arrivals', slug: 'matcha-morning', stock: 30, brand: 'Calm', reviews: [], attributes: { 'Fragrance Family': 'Fresh', 'Size': '75ml', 'Gender': 'Unisex' } },
    { id: 'p47', name: 'Desert Bloom', description: 'A rare floral that blossoms in the heat, with cactus flower, aloe, and warm sand accord.', price: 135.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'perfume bottle', images: [], category: 'new-arrivals', slug: 'desert-bloom', stock: 25, brand: 'Oasis', reviews: [], attributes: { 'Fragrance Family': 'Floral', 'Size': '50ml', 'Gender': 'Women' } },
    { id: 'p48', name: 'Rooftop Bar', description: 'The vibrant energy of a night out, with gin accord, lime, and tonic.', price: 125.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'perfume bottle', images: [], category: 'new-arrivals', slug: 'rooftop-bar', stock: 28, brand: 'Nightlife', reviews: [], attributes: { 'Fragrance Family': 'Citrus', 'Size': '100ml', 'Gender': 'Unisex' } },
    { id: 'p49', name: 'Black Vetiver', description: 'A darker, earthier take on vetiver, blended with black tea and ink.', price: 150.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'perfume bottle', images: [], category: 'new-arrivals', slug: 'black-vetiver', stock: 20, brand: 'Root & Stem', reviews: [], attributes: { 'Fragrance Family': 'Woody', 'Size': '75ml', 'Gender': 'Men' } },
    { id: 'p50', name: 'Sunkissed Peach', description: 'A juicy, photorealistic peach scent, warmed by the sun and softened with vanilla cream.', price: 95.00, imageUrl: 'https://placehold.co/600x600.png', dataAiHint: 'perfume bottle', images: [], category: 'new-arrivals', slug: 'sunkissed-peach', stock: 35, brand: 'Orchard', reviews: [], attributes: { 'Fragrance Family': 'Fresh', 'Size': '100ml', 'Gender': 'Women' } },
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
        total: 120.00,
        items: [
            { id: 'p9', name: 'Silk Petals', price: 120.00, quantity: 1, imageUrl: 'https://placehold.co/100x100.png' },
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
        total: 210.00,
        items: [
            { id: 'p3', name: 'Nautical Depth', price: 95.00, quantity: 1, imageUrl: 'https://placehold.co/100x100.png' },
            { id: 'p8', name: 'Citrus Reserve', price: 140.00, quantity: 1, imageUrl: 'https://placehold.co/100x100.png' },
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
        total: 55.00,
        items: [
            { id: 'p33', name: 'Best of Men Tester Kit', price: 55.00, quantity: 1, imageUrl: 'https://placehold.co/100x100.png' },
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
      total: 250.00,
      items: [
        { id: 'p35', name: 'Imperial Oud', price: 250.00, quantity: 1, imageUrl: 'https://placehold.co/100x100.png' },
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
      total: 220.00,
      items: [
        { id: 'p29', name: 'His & Hers Duo', price: 220.00, quantity: 1, imageUrl: 'https://placehold.co/100x100.png' },
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
        productId: 'p9',
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
