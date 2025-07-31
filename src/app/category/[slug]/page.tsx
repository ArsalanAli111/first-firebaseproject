import { notFound } from 'next/navigation';
import { products as allProducts, categories } from '@/lib/data';
import type { Product } from '@/lib/types';
import { CategoryClientPage } from '@/components/category-client-page';

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const category = categories.find(c => c.slug === slug);

  if (!category) {
    notFound();
  }

  const childCategoryIds = categories
    .filter(c => c.parentId === category.id)
    .map(c => c.id);
  
  const childCategorySlugs = categories
    .filter(c => childCategoryIds.includes(c.id) || (c.parentId && childCategoryIds.includes(c.parentId)))
    .map(c => c.slug);

  const relevantCategorySlugs = [slug, ...childCategorySlugs];
  const initialProducts: Product[] = allProducts.filter(p => relevantCategorySlugs.includes(p.category));

  return <CategoryClientPage category={category} initialProducts={initialProducts} />;
}
