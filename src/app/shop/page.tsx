
'use client';

import * as React from 'react';
import { ProductCard } from '@/components/product-card';
import { products as allProducts, categories, attributes as allAttributes } from '@/lib/data';
import { Filter, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import type { Product } from '@/lib/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const PRODUCTS_PER_PAGE = 9;

export default function ShopPage() {
  const [filteredProducts, setFilteredProducts] = React.useState<Product[]>(allProducts);
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = React.useState<string[]>([]);
  const [selectedAttributes, setSelectedAttributes] = React.useState<Record<string, string[]>>({});
  const [priceRange, setPriceRange] = React.useState<[number, number]>([0, 300]);
  const [currentPage, setCurrentPage] = React.useState(1);
  
  const allBrands = React.useMemo(() => {
    const brands = allProducts.map(p => p.brand);
    return [...new Set(brands)];
  }, []);

  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

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

  const handleAttributeChange = (type: string, value: string) => {
    setSelectedAttributes(prev => {
        const currentValues = prev[type] || [];
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];
        
        if (newValues.length === 0) {
            const { [type]: _, ...rest } = prev;
            return rest;
        }

        return { ...prev, [type]: newValues };
    });
  };
  
  const handlePriceChange = (value: [number, number]) => {
    setPriceRange(value);
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedAttributes({});
    setPriceRange([0, 300]);
  }

  React.useEffect(() => {
    let filtered = allProducts;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }

    if (selectedBrands.length > 0) {
      filtered = filtered.filter(p => selectedBrands.includes(p.brand));
    }

    if (Object.keys(selectedAttributes).length > 0) {
        filtered = filtered.filter(p => {
            return Object.entries(selectedAttributes).every(([type, values]) => {
                const productAttributeValue = p.attributes[type];
                return productAttributeValue && values.includes(productAttributeValue.toString());
            });
        });
    }

    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to first page on filter change
  }, [selectedCategories, selectedBrands, priceRange, selectedAttributes]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline">All Perfumes</h1>
        <p className="text-muted-foreground mt-2">Explore our full collection of exquisite fragrances.</p>
      </header>
      
      <div className="flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-1/4 lg:w-1/5">
          <div className="sticky top-24">
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
            
            <Accordion type="multiple" defaultValue={['category', 'price', 'brand', ...allAttributes.map(a => a.type)]} className="w-full">
              <AccordionItem value="category">
                <AccordionTrigger className="font-semibold text-base py-3">Category</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pt-2">
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
                </AccordionContent>
              </AccordionItem>

               <AccordionItem value="price">
                <AccordionTrigger className="font-semibold text-base py-3">Price Range</AccordionTrigger>
                <AccordionContent>
                  <div className="pt-2">
                    <Slider
                      value={priceRange}
                      onValueChange={handlePriceChange}
                      max={300}
                      step={10}
                    />
                    <div className="flex justify-between text-sm text-muted-foreground mt-2">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="brand">
                <AccordionTrigger className="font-semibold text-base py-3">Brand</AccordionTrigger>
                <AccordionContent>
                    <div className="space-y-2 pt-2 max-h-60 overflow-y-auto pr-2">
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
                </AccordionContent>
              </AccordionItem>
              
              {allAttributes.map(attr => (
                 <AccordionItem key={attr.id} value={attr.type}>
                    <AccordionTrigger className="font-semibold text-base py-3">{attr.type}</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2 pt-2 max-h-60 overflow-y-auto pr-2">
                            {attr.values.map(value => (
                                <div key={value} className="flex items-center space-x-2">
                                <Checkbox
                                    id={`attr-${attr.type}-${value}`}
                                    checked={selectedAttributes[attr.type]?.includes(value) || false}
                                    onCheckedChange={() => handleAttributeChange(attr.type, value)}
                                />
                                <Label htmlFor={`attr-${attr.type}-${value}`} className="font-normal cursor-pointer">{value}</Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                 </AccordionItem>
              ))}
            </Accordion>
          </div>
        </aside>

        <main className="w-full md:w-3/4 lg:w-4/5">
          <div className="mb-4 text-sm text-muted-foreground">
            Showing {currentProducts.length} of {filteredProducts.length} products
          </div>
          {currentProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
              <div className="flex justify-center items-center gap-4 mt-8">
                  <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                  >
                      <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <span className="text-sm">
                    Page {currentPage} of {totalPages}
                  </span>
                  <Button 
                      variant="outline" 
                      size="icon" 
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                  >
                      <ChevronRight className="h-4 w-4" />
                  </Button>
              </div>
            </>
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
