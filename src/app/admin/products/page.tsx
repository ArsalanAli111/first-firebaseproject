
'use client';

import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MoreHorizontal, PlusCircle, File } from 'lucide-react';
import { products as initialProducts, categories, attributes as allAttributes } from '@/lib/data';
import type { Product } from '@/lib/types';
import Image from 'next/image';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

export default function ProductsPage() {
  const [products, setProducts] = React.useState<Product[]>(initialProducts);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingProduct, setEditingProduct] = React.useState<Product | null>(null);
  
  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsDialogOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsDialogOpen(true);
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(currentProducts => currentProducts.filter(p => p.id !== productId));
  }

  const handleSaveProduct = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const name = formData.get('name') as string;
      const slug = name.toLowerCase().replace(/\s+/g, '-');
      
      const newAttributes: Record<string, string> = {};
      allAttributes.forEach(attr => {
          const value = formData.get(attr.type.toLowerCase().replace(' ', '-')) as string;
          if (value) {
              newAttributes[attr.type] = value;
          }
      });
      
      const newProduct: Product = {
          id: editingProduct ? editingProduct.id : `p${products.length + 1}`,
          name: name,
          description: formData.get('description') as string,
          price: parseFloat(formData.get('price') as string),
          category: formData.get('category') as string,
          stock: parseInt(formData.get('stock') as string),
          imageUrl: editingProduct?.imageUrl || `https://placehold.co/600x600.png`,
          images: editingProduct?.images || [],
          dataAiHint: editingProduct?.dataAiHint || 'perfume bottle',
          slug: slug,
          brand: formData.get('brand') as string,
          reviews: editingProduct?.reviews || [],
          attributes: newAttributes,
      };

      if (editingProduct) {
          setProducts(products.map(p => p.id === newProduct.id ? newProduct : p));
      } else {
          setProducts([...products, newProduct]);
      }
      setIsDialogOpen(false);
  }

  const getCategoryName = (slug: string) => {
    return categories.find(c => c.slug === slug)?.name || 'N/A';
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle>Products</CardTitle>
          <CardDescription>
            Manage your products and view their sales performance.
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
           <Button size="sm" variant="outline" className="h-8 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
            </Button>
          <Button size="sm" className="h-8 gap-1" onClick={handleAddProduct}>
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Product</span>
          </Button>
        </div>
      </div>
      <Card className="mt-4">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="hidden md:table-cell">Quantity</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map(product => (
                <TableRow key={product.id}>
                  <TableCell className="hidden sm:table-cell">
                    <Image
                      alt={product.name}
                      className="aspect-square rounded-md object-cover"
                      height="64"
                      src={product.imageUrl}
                      width="64"
                      data-ai-hint={product.dataAiHint}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                   <TableCell>{getCategoryName(product.category)}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell className="hidden md:table-cell">{product.stock}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleEditProduct(product)}>Edit</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDeleteProduct(product.id)}>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-2xl">
                 <form onSubmit={handleSaveProduct}>
                    <DialogHeader>
                        <DialogTitle>{editingProduct ? 'Edit Product' : 'Add Product'}</DialogTitle>
                        <DialogDescription>
                           {editingProduct ? 'Update the details of this product.' : 'Fill out the form to add a new product.'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto pr-6">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="name" className="text-right">Name</Label>
                            <Input id="name" name="name" defaultValue={editingProduct?.name} className="col-span-3" required />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="description" className="text-right">Description</Label>
                            <Textarea id="description" name="description" defaultValue={editingProduct?.description} className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">Price</Label>
                            <Input id="price" name="price" type="number" step="0.01" defaultValue={editingProduct?.price} className="col-span-3" required />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">Category</Label>
                            <Select name="category" defaultValue={editingProduct?.category}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map(cat => (
                                        <SelectItem key={cat.id} value={cat.slug}>{cat.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="brand" className="text-right">Brand</Label>
                            <Input id="brand" name="brand" defaultValue={editingProduct?.brand} className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="stock" className="text-right">Quantity</Label>
                            <Input id="stock" name="stock" type="number" defaultValue={editingProduct?.stock} className="col-span-3" required />
                        </div>
                        {allAttributes.map(attr => (
                            <div key={attr.id} className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor={attr.type.toLowerCase().replace(' ', '-')} className="text-right">{attr.type}</Label>
                                <Select name={attr.type.toLowerCase().replace(' ', '-')} defaultValue={editingProduct?.attributes?.[attr.type] as string | undefined}>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder={`Select ${attr.type}`} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {attr.values.map(val => (
                                            <SelectItem key={val} value={val}>{val}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        ))}

                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save Product</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </>
  );
}
