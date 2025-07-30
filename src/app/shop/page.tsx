
'use client';

import * as React from 'react';
import { ProductCard } from '@/components/product-card';
import { products as allProducts, categories } from '@/lib/data';
import { Filter, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import type { Product } from '@/lib/types';

export default function ShopPage() {
  const [products, setProducts] = React.useState<Product[]>(allProducts);
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([]);
  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 250]);
  
  const allBrands = React.useMemo(() => {
    const brands = allProducts.map(p => p.brand);
    return [...new Set(brands)];
  }, []);

  const handleCategoryChange = (slug: string) => {
    setSelectedCategories(prev =>
      prev.includes(slug) ? prev.filter(c => c !== slug) : [...prev, slug]
    );
  };
  
  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };
  
  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 250]);
  }

  React.useEffect(() => {
    let filtered = allProducts;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter(p => selectedBrands.includes(p.brand));
    }

    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    setProducts(filtered);
  }, [selectedCategories, selectedBrands, priceRange]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline">All Perfumes</h1>
        <p className="text-muted-foreground mt-2">Explore our full collection of exquisite fragrances.</p>
      </header>
      
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4 lg:w-1/5">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold font-headline flex items-center">
              <Filter className="mr-2 h-5 w-5"/>
              Filters
            </h2>
            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-sm">
                <X className="mr-1 h-4 w-4" />
                Clear
            </Button>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-3">Category</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={`cat-${category.id}`} 
                      checked={selectedCategories.includes(category.slug)}
                      onCheckedChange={() => handleCategoryChange(category.slug)}
                    />
                    <Label htmlFor={`cat-${category.id}`} className="font-normal cursor-pointer">{category.name}</Label>
                  </div>
                ))}
              </div>
            </div>
             <div>
              <h3 className="font-semibold mb-3">Price Range</h3>
              <Slider
                value={priceRange}
                onValueChange={handlePriceChange}
                max={250}
                step={10}
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
             <div>
              <h3 className="font-semibold mb-3">Brand</h3>
              <div className="space-y-2">
                {allBrands.map(brand => (
                   <div key={brand} className="flex items-center space-x-2">
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={selectedBrands.includes(brand)}
                      onCheckedChange={() => handleBrandChange(brand)}
                    />
                    <Label htmlFor={`brand-${brand}`} className="font-normal cursor-pointer">{brand}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <main className="w-full md:w-3/4 lg:w-4/5">
          <div className="mb-4 text-sm text-muted-foreground">
            Showing {products.length} of {allProducts.length} products
          </div>
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 border rounded-lg">
                <h2 className="text-2xl font-semibold mb-2">No Products Found</h2>
                <p className="text-muted-foreground">Try adjusting your filters to find what you're looking for.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
