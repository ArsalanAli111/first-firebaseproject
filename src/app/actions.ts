'use server';

import { generateProductRecommendations } from '@/ai/flows/product-recommendations';
import { products } from '@/lib/data';
import type { Product } from '@/lib/types';

export async function getRecommendedProducts(viewingHistory: string[]): Promise<Product[]> {
  try {
    const result = await generateProductRecommendations({
      viewingHistory,
      currentTrends: 'perfumes for men, gift boxes, and best sellers'
    });

    const recommendedIds = result.recommendations;
    
    // In a real app, you would fetch these products from your database.
    // For this example, we filter from our mock data.
    const recommendedProducts = products.filter(p => recommendedIds.includes(p.id));

    // If AI gives fewer results, fill up with other products
    if (recommendedProducts.length < 4) {
      const otherProducts = products.filter(p => !recommendedIds.includes(p.id) && !viewingHistory.includes(p.id));
      const needed = 4 - recommendedProducts.length;
      return [...recommendedProducts, ...otherProducts.slice(0, needed)];
    }

    return recommendedProducts;
  } catch (error) {
    console.error("Error getting product recommendations:", error);
    // Return a default set of products on error
    return products.slice(0, 4).filter(p => !viewingHistory.includes(p.id));
  }
}
