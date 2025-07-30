import { ProductCard } from '@/components/product-card';
import { products, categories } from '@/lib/data';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return categories.map(category => ({
    slug: category.slug,
  }));
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const category = categories.find(c => c.slug === slug);
  const filteredProducts = products.filter(p => p.category === slug);
  
  if (!category) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline">{category.name}</h1>
        <p className="text-muted-foreground mt-2">Browse our curated selection of {category.name.toLowerCase()}.</p>
      </header>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">No Products Found</h2>
            <p className="text-muted-foreground">There are currently no products available in this category.</p>
        </div>
      )}
    </div>
  );
}
