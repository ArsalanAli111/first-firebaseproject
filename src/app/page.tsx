
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { products, categories } from "@/lib/data";
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { ProductCard } from "@/components/product-card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function Home() {
  
  const featuredProducts = products.filter(p => p.category === 'new-arrivals').slice(0, 8);
  const bestSellers = products.filter(p => p.category === 'best-sellers').slice(0, 4);
  const luxuryCollection = products.filter(p => p.category === 'luxury-collection').slice(0, 4);
  const topCategories = categories.filter(c => ['perfumes-for-men', 'perfumes-for-women', 'unisex-perfumes', 'gift-sets', 'luxury-collection'].includes(c.slug));


  return (
    <div className="space-y-16 pb-16">
      <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center text-center text-white bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <Image 
          src="https://placehold.co/1600x900.png" 
          alt="Perfume bottles"
          data-ai-hint="perfume bottles"
          fill
          className="absolute inset-0 z-0 object-cover opacity-30"
        />
        <div className="relative z-10 bg-black bg-opacity-40 p-8 rounded-lg">
          <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 tracking-tight">
            Find Your Signature Scent
          </h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 font-body">
            Explore our curated collection of luxury perfumes and discover a fragrance that truly represents you.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
            <Link href="/shop">Shop Now <ArrowRight className="ml-2 h-5 w-5" /></Link>
          </Button>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <section>
           <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-headline">New Arrivals</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">Discover the latest fragrances carefully curated for you. Stay ahead with our newest arrivals that redefine elegance.</p>
          </div>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {featuredProducts.map((product) => (
                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/4">
                  <div className="p-1 h-full">
                    <ProductCard product={product} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="hidden sm:flex" />
            <CarouselNext className="hidden sm:flex" />
          </Carousel>
        </section>

        <section>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-headline">Shop by Category</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">Browse our collection by category to find perfumes that perfectly match your style and personality.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {topCategories.map((category) => (
              <Link href={`/category/${category.slug}`} key={category.id} className="group">
                <Card className="overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                  <CardHeader className="p-0">
                     <Image src={category.imageUrl} alt={category.name} width={400} height={300} className="w-full h-48 object-cover" data-ai-hint={category.dataAiHint} />
                  </CardHeader>
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold text-center font-headline">{category.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section>
           <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-headline">Our Best Sellers</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">Explore the most loved fragrances by our customers. These best-sellers are a must-have in your collection.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
        
        <section>
           <div className="text-center mb-8">
            <h2 className="text-3xl font-bold font-headline">The Luxury Collection</h2>
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">Indulge in premium luxury perfumes crafted for those who desire sophistication and timeless elegance.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {luxuryCollection.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
