'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { ShoppingBag } from 'lucide-react';
import type { Product } from '@/lib/types';
import { useCart } from '@/hooks/use-cart';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      quantity: 1,
    });
  };

  return (
    <Card className="w-full h-full flex flex-col overflow-hidden group transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
      <Link href={`/shop/${product.slug}`} className="flex flex-col h-full">
        <CardHeader className="border-b p-0 relative">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={400}
            height={400}
            className="object-cover w-full h-64 aspect-square transition-transform duration-300 group-hover:scale-105"
            data-ai-hint="perfume bottle"
          />
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg font-headline leading-tight mb-2">
              {product.name}
          </CardTitle>
          <p className="text-muted-foreground text-sm">{product.category.replace(/-/g, ' ')}</p>
        </CardContent>
        <CardFooter className="p-4 flex justify-between items-center mt-auto">
          <p className="text-lg font-semibold font-headline text-primary">
            ${product.price.toFixed(2)}
          </p>
          <Button
            size="sm"
            onClick={handleAddToCart}
            className="bg-accent hover:bg-accent/90 text-accent-foreground"
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            Add to Cart
          </Button>
        </CardFooter>
      </Link>
    </Card>
  );
}
