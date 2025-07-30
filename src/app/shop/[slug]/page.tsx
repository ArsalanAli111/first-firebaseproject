import { products } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, ShoppingBag, Minus, Plus } from 'lucide-react';
import { AddToCartButton } from '@/components/add-to-cart-button';
import { RecommendedProducts } from '@/components/recommended-products';
import { Suspense } from 'react';

export async function generateStaticParams() {
  return products.map(product => ({
    slug: product.slug,
  }));
}

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products.find(p => p.slug === params.slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg">
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
              data-ai-hint="perfume bottle"
            />
          </div>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {product.images.slice(0, 3).map((img, index) => (
              <div key={index} className="aspect-square relative rounded-md overflow-hidden border">
                <Image
                  src={img}
                  alt={`${product.name} view ${index + 1}`}
                  fill
                  className="object-cover"
                  data-ai-hint="perfume bottle"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h1 className="text-4xl font-bold font-headline">{product.name}</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < Math.round(product.reviews[0]?.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
              ))}
            </div>
            <span className="text-muted-foreground text-sm">({product.reviews.length} reviews)</span>
          </div>
          <p className="text-3xl font-headline text-primary">${product.price.toFixed(2)}</p>
          <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          
          <AddToCartButton product={product} />

          <div className="border-t pt-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {product.reviews.map((review, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0">
                    <div className="flex items-center mb-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                      ))}
                      <p className="ml-2 font-semibold">{review.author}</p>
                    </div>
                    <p className="text-muted-foreground text-sm">{review.text}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="text-3xl font-bold text-center mb-8 font-headline">You Might Also Like</h2>
        <Suspense fallback={<div className="text-center">Loading recommendations...</div>}>
          <RecommendedProducts currentProductId={product.id} />
        </Suspense>
      </div>
    </div>
  );
}
