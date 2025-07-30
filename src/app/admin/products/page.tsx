
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
import { Badge } from '@/components/ui/badge';
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
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MoreHorizontal, PlusCircle, File } from 'lucide-react';
import { products as initialProducts, categories } from '@/lib/data';
import type { Product } from '@/lib/types';
import Image from 'next/image';

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
      const attributesString = formData.get('attributes') as string;
      let attributes = {};
      try {
        if (attributesString) {
            attributes = JSON.parse(attributesString);
        }
      } catch (error) {
          console.error("Invalid JSON for attributes", error);
          // handle error, maybe show a toast to the user
      }


      const newProduct: Product = {
          id: editingProduct ? editingProduct.id : `p${products.length + 1}`,
          name: formData.get('name') as string,
          description: formData.get('description') as string,
          price: parseFloat(formData.get('price') as string),
          category: formData.get('category') as string,
          stock: parseInt(formData.get('stock') as string),
          imageUrl: editingProduct?.imageUrl || 'https://placehold.co/600x600.png',
          images: editingProduct?.images || ['https://placehold.co/600x600.png'],
          slug: (formData.get('name') as string).toLowerCase().replace(/\s+/g, '-'),
          reviews: editingProduct?.reviews || [],
          attributes: attributes,
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
                <TableHead className="hidden md:table-cell">Attributes</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="hidden md:table-cell">Stock</TableHead>
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
                    />
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                   <TableCell>{getCategoryName(product.category)}</TableCell>
                   <TableCell className="hidden md:table-cell">
                        <div className="flex flex-wrap gap-1">
                            {product.attributes && Object.entries(product.attributes).map(([key, value]) => (
                                <Badge key={key} variant="secondary">{`${key}: ${value}`}</Badge>
                            ))}
                        </div>
                   </TableCell>
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
            <DialogContent className="sm:max-w-[525px]">
                 <form onSubmit={handleSaveProduct}>
                    <DialogHeader>
                        <DialogTitle>{editingProduct ? 'Edit Product' : 'Add Product'}</DialogTitle>
                        <DialogDescription>
                           {editingProduct ? 'Update the details of this product.' : 'Fill out the form to add a new product.'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
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
                            <Input id="category" name="category" defaultValue={editingProduct?.category} className="col-span-3" required />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="attributes" className="text-right">Attributes</Label>
                            <Textarea id="attributes" name="attributes" defaultValue={JSON.stringify(editingProduct?.attributes || {})} className="col-span-3" placeholder='e.g. {"size": "50ml"}' />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="stock" className="text-right">Stock</Label>
                            <Input id="stock" name="stock" type="number" defaultValue={editingProduct?.stock} className="col-span-3" required />
                        </div>
                         {/* We will add image upload in a future step */}
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
