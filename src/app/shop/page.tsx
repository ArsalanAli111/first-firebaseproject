import { ProductCard } from '@/components/product-card';
import { products } from '@/lib/data';
import { Filter } from 'lucide-react';

export default function ShopPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline">All Perfumes</h1>
        <p className="text-muted-foreground mt-2">Explore our full collection of exquisite fragrances.</p>
      </header>
      
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4 lg:w-1/5">
          <h2 className="text-xl font-semibold font-headline mb-4 flex items-center">
            <Filter className="mr-2 h-5 w-5"/>
            Filters
          </h2>
          {/* Filters will be implemented in a future update */}
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Category</h3>
              <p className="text-sm text-muted-foreground">(Coming Soon)</p>
            </div>
             <div>
              <h3 className="font-semibold mb-2">Price</h3>
              <p className="text-sm text-muted-foreground">(Coming Soon)</p>
            </div>
             <div>
              <h3 className="font-semibold mb-2">Brand</h3>
              <p className="text-sm text-muted-foreground">(Coming Soon)</p>
            </div>
          </div>
        </aside>

        <main className="w-full md:w-3/4 lg:w-4/5">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
