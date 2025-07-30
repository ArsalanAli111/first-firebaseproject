import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { featuredProducts, categories, bestSellers } from "@/lib/data";
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { ProductCard } from "@/components/product-card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center text-center text-white bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
        <Image 
          src="https://placehold.co/1600x900.png" 
          alt="Perfume bottles"
          data-ai-hint="perfume bottles"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 opacity-30"
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
          <h2 className="text-3xl font-bold text-center mb-8 font-headline">Featured Products</h2>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {featuredProducts.map((product) => (
                <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
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
          <h2 className="text-3xl font-bold text-center mb-8 font-headline">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {categories.map((category) => (
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
          <h2 className="text-3xl font-bold text-center mb-8 font-headline">Our Best Sellers</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
