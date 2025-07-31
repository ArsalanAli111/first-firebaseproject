
'use client';

import * as React from 'react';
import { notFound } from 'next/navigation';
import { ProductCard } from '@/components/product-card';
import { products as allProducts, categories } from '@/lib/data';
import { Filter, X } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import type { Product } from '@/lib/types';

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const category = categories.find(c => c.slug === slug);

  if (!category) {
    notFound();
  }

  const initialProducts = React.useMemo(() => {
    const childCategoryIds = categories
      .filter(c => c.parentId === category.id)
      .map(c => c.id);
    
    const childCategorySlugs = categories
      .filter(c => childCategoryIds.includes(c.id) || (c.parentId && childCategoryIds.includes(c.parentId)))
      .map(c => c.slug);

    const relevantCategorySlugs = [slug, ...childCategorySlugs];
    return allProducts.filter(p => relevantCategorySlugs.includes(p.category));
  }, [slug, category.id]);

  const [filteredProducts, setFilteredProducts] = React.useState<Product[]>(initialProducts);
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([]);
  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 250]);
  
  const allBrands = React.useMemo(() => {
    const brands = initialProducts.map(p => p.brand).filter(Boolean) as string[];
    return [...new Set(brands)];
  }, [initialProducts]);

  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };
  
  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value);
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setPriceRange([0, 250]);
  }

  React.useEffect(() => {
    let newFiltered = initialProducts;

    if (selectedBrands.length > 0) {
      newFiltered = newFiltered.filter(p => p.brand && selectedBrands.includes(p.brand));
    }

    newFiltered = newFiltered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    setFilteredProducts(newFiltered);
  }, [selectedBrands, priceRange, initialProducts]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline">{category.name}</h1>
        <p className="text-muted-foreground mt-2">Browse our curated selection of {category.name.toLowerCase()}.</p>
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
            Showing {filteredProducts.length} of {initialProducts.length} products
          </div>
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
             <div className="text-center py-16 border rounded-lg">
                <h2 className="text-2xl font-semibold mb-2">No Products Found</h2>
                <p className="text-muted-foreground">There are currently no products available for the selected filters.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
