
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from 'next/image';
import { Target, Eye, Gem } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-background">
      <section className="relative h-[50vh] w-full flex items-center justify-center text-center text-white">
        <Image 
          src="https://placehold.co/1600x800.png" 
          alt="A collection of perfume bottles on a stylish background"
          data-ai-hint="perfume display"
          fill
          className="absolute inset-0 z-0 object-cover opacity-40"
        />
        <div className="relative z-10 bg-black bg-opacity-30 p-8 rounded-lg">
          <h1 className="text-4xl md:text-6xl font-bold font-headline mb-4 tracking-tight">
            About Scent Sample
          </h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto font-body">
            Your personal journey into the world of exquisite fragrances starts here.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <section>
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl font-bold font-headline text-center">Who We Are</CardTitle>
            </CardHeader>
            <CardContent className="text-lg text-muted-foreground text-center space-y-4">
              <p>
                Scent Sample was born from a passion for the art of perfumery. We believe that a fragrance is more than just a scent; it's an expression of identity, a memory, and a personal signature. 
              </p>
              <p>
                Our mission is to make the world of luxury and niche fragrances accessible to everyone. We offer a curated collection of authentic scents, allowing you to explore, discover, and fall in love with new perfumes without committing to a full bottle.
              </p>
            </CardContent>
          </Card>
        </section>

        <section className="grid md:grid-cols-2 gap-8 items-center">
            <div>
                <h2 className="text-3xl font-bold font-headline mb-4">Our Mission & Vision</h2>
                <div className="space-y-6 text-muted-foreground">
                    <div className="flex items-start gap-4">
                        <Target className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold text-foreground">Our Mission</h3>
                            <p>To provide a seamless and enjoyable platform for fragrance lovers to discover and sample a wide array of high-quality perfumes, fostering a community of scent enthusiasts.</p>
                        </div>
                    </div>
                    <div className="flex items-start gap-4">
                        <Eye className="h-8 w-8 text-primary mt-1 flex-shrink-0" />
                        <div>
                            <h3 className="font-semibold text-foreground">Our Vision</h3>
                            <p>To become the most trusted and beloved destination for fragrance discovery, known for our exceptional curation, commitment to authenticity, and passion for the customer experience.</p>
                        </div>
                    </div>
                </div>
            </div>
             <div className="relative h-80 w-full rounded-lg overflow-hidden shadow-lg">
                <Image 
                    src="https://placehold.co/600x400.png"
                    alt="Perfume ingredients like flowers and spices"
                    data-ai-hint="perfume ingredients"
                    fill
                    className="object-cover"
                />
            </div>
        </section>
        
        <section>
          <h2 className="text-3xl font-bold text-center mb-8 font-headline">Why Choose Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
                <CardHeader>
                    <Gem className="h-12 w-12 mx-auto text-accent" />
                    <CardTitle className="font-headline mt-4">Authenticity Guaranteed</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">We source our products directly from brands and authorized distributors. Every sample is 100% authentic, rebottled with care.</p>
                </CardContent>
            </Card>
             <Card className="text-center">
                <CardHeader>
                    <Gem className="h-12 w-12 mx-auto text-accent" />
                    <CardTitle className="font-headline mt-4">Curated Selection</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Our experts hand-pick a diverse range of fragrances, from timeless classics to modern niche creations, ensuring you find something to love.</p>
                </CardContent>
            </Card>
             <Card className="text-center">
                <CardHeader>
                    <Gem className="h-12 w-12 mx-auto text-accent" />
                    <CardTitle className="font-headline mt-4">Explore & Discover</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Our sample sizes make it easy and affordable to try new scents, build a fragrance wardrobe, and find your perfect signature.</p>
                </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
