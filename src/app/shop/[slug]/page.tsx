
'use client';

import { products, categories } from '@/lib/data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { AddToCartButton } from '@/components/add-to-cart-button';
import { RecommendedProducts } from '@/components/recommended-products';
import { Suspense, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import type { Product } from '@/lib/types';

export default function ProductDetailPage({ params }: { params: { slug:string } }) {
  const [product, setProduct] = useState<Product | undefined>(products.find(p => p.slug === params.slug));
  const { isAuthenticated, user } = useAuth();
  
  const [mainImage, setMainImage] = useState(product?.imageUrl);
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewText, setNewReviewText] = useState('');
  
  if (!product) {
    notFound();
  }
  
  const category = categories.find(c => c.slug === product.category);
  const allImages = [product.imageUrl, ...product.images];

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewText.trim() || !user) return;
    
    const newReview = {
        author: user.name,
        rating: newReviewRating,
        text: newReviewText,
    };

    const updatedProduct = {
      ...product,
      reviews: [newReview, ...product.reviews],
    };

    setProduct(updatedProduct);
    // In a real app, you would also update this in your backend.
    
    setNewReviewText('');
    setNewReviewRating(5);
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        <div>
          <div className="aspect-square relative rounded-lg overflow-hidden shadow-lg">
            {allImages.map((img, index) => (
                <Image
                  key={index}
                  src={img}
                  alt={product.name}
                  fill
                  className={`object-cover transition-opacity duration-500 ease-in-out ${mainImage === img ? 'opacity-100' : 'opacity-0'}`}
                  data-ai-hint="perfume bottle"
                  priority={index === 0}
                />
            ))}
          </div>
          <div className="grid grid-cols-4 gap-2 mt-2">
            {allImages.slice(0, 4).map((img, index) => (
              <button key={index} onClick={() => setMainImage(img)} className={`aspect-square relative rounded-md overflow-hidden border-2 transition-all ${mainImage === img ? 'border-primary' : 'border-transparent'}`}>
                <Image
                  src={img}
                  alt={`${product.name} view ${index + 1}`}
                  fill
                  className="object-cover"
                  data-ai-hint="perfume bottle"
                />
              </button>
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
          
           <div className="space-y-4 pt-4 border-t">
              {category && (
                  <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm">Category:</span>
                      <Link href={`/category/${category.slug}`} passHref>
                          <Badge variant="outline" className="cursor-pointer hover:bg-accent hover:text-accent-foreground">{category.name}</Badge>
                      </Link>
                  </div>
              )}
              {product.attributes && Object.entries(product.attributes).length > 0 && (
                  <div className="flex items-start gap-2">
                      <span className="font-semibold text-sm mt-1">Attributes:</span>
                      <div className="flex flex-wrap gap-2">
                          {Object.entries(product.attributes).map(([key, value]) => (
                              <Badge key={key} variant="secondary">{`${key}: ${value}`}</Badge>
                          ))}
                      </div>
                  </div>
              )}
          </div>

          <AddToCartButton product={product} />

          <div className="border-t pt-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-headline">Reviews</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {isAuthenticated && (
                    <form onSubmit={handleReviewSubmit} className="space-y-4 p-4 border rounded-md bg-secondary/50 mb-6">
                        <h4 className="font-semibold">Write a review</h4>
                        <div className="flex items-center gap-2">
                            <span className="text-sm">Rating:</span>
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <button key={i} type="button" onClick={() => setNewReviewRating(i + 1)}>
                                        <Star className={`h-5 w-5 transition-colors ${i < newReviewRating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300 hover:text-yellow-300'}`} />
                                    </button>
                                ))}
                            </div>
                        </div>
                        <Textarea 
                            placeholder="Share your thoughts..." 
                            value={newReviewText}
                            onChange={(e) => setNewReviewText(e.target.value)}
                            required
                        />
                        <Button type="submit" size="sm">Submit Review</Button>
                    </form>
                )}
                {product.reviews.length > 0 ? (
                  product.reviews.map((review, index) => (
                    <div key={index} className="border-b pb-4 last:border-b-0">
                      <div className="flex items-center mb-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                        ))}
                        <p className="ml-2 font-semibold">{review.author}</p>
                      </div>
                      <p className="text-muted-foreground text-sm">{review.text}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No reviews yet. Be the first to share your thoughts!</p>
                )}
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
