"use client";

import { useEffect, useState } from 'react';
import { getRecommendedProducts } from '@/app/actions';
import { ProductCard } from './product-card';
import type { Product } from '@/lib/types';
import { Skeleton } from './ui/skeleton';

interface RecommendedProductsProps {
  currentProductId: string;
}

export function RecommendedProducts({ currentProductId }: RecommendedProductsProps) {
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate viewing history by storing it in localStorage
    let history = JSON.parse(localStorage.getItem('viewingHistory') || '[]');
    if (!history.includes(currentProductId)) {
      history.unshift(currentProductId);
    }
    history = history.slice(0, 5); // Keep history to a reasonable length
    localStorage.setItem('viewingHistory', JSON.stringify(history));

    async function fetchRecommendations() {
      setLoading(true);
      try {
        const products = await getRecommendedProducts(history);
        setRecommendations(products);
      } catch (error) {
        console.error("Failed to fetch recommendations", error);
        setRecommendations([]); // Handle error case
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, [currentProductId]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-64 w-full" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-6 w-1/4" />
          </div>
        ))}
      </div>
    );
  }
  
  if(recommendations.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {recommendations.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
