
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
import { PlusCircle, MoreHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { samplePurchases, products } from '@/lib/data';
import type { Purchase } from '@/lib/firestore-types';

type DisplayPurchase = Omit<Purchase, 'date'> & { date: string; productName: string };


export default function InventoryPage() {
  const [purchases, setPurchases] = React.useState<DisplayPurchase[]>([]);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingPurchase, setEditingPurchase] = React.useState<DisplayPurchase | null>(null);

  React.useEffect(() => {
    const initialPurchases = samplePurchases.map(p => ({
        ...p,
        productName: products.find(prod => prod.id === p.productId)?.name || 'Unknown Product'
    }));
    setPurchases(initialPurchases);
  }, []);

  const handleAddPurchase = () => {
    setEditingPurchase(null);
    setIsDialogOpen(true);
  };
  
  const handleSavePurchase = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const formData = new FormData(e.currentTarget);
      const productId = formData.get('productId') as string;
      const quantity = parseInt(formData.get('quantity') as string);
      const unitCost = parseFloat(formData.get('unitCost') as string);
      const totalCost = quantity * unitCost;

      const newPurchase: DisplayPurchase = {
          id: editingPurchase ? editingPurchase.id : `pur${purchases.length + 1}`,
          supplier: formData.get('supplier') as string,
          productId: productId,
          productName: products.find(p => p.id === productId)?.name || 'Unknown',
          quantity: quantity,
          unitCost: unitCost,
          totalCost: totalCost,
          date: new Date().toISOString().split('T')[0], // Use today's date
      };

      if (editingPurchase) {
          setPurchases(purchases.map(p => p.id === newPurchase.id ? newPurchase : p));
      } else {
          setPurchases([...purchases, newPurchase]);
      }
      setIsDialogOpen(false);
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle>Inventory Purchases</CardTitle>
          <CardDescription>
            Track stock purchases and inventory levels.
          </CardDescription>
        </div>
        <Button size="sm" className="h-8 gap-1" onClick={handleAddPurchase}>
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Purchase</span>
        </Button>
      </div>
      <Card className="mt-4">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Supplier</TableHead>
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Unit Cost</TableHead>
                <TableHead className="text-right">Total Cost</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {purchases.map(purchase => (
                <TableRow key={purchase.id}>
                  <TableCell>{purchase.date}</TableCell>
                  <TableCell className="font-medium">{purchase.productName}</TableCell>
                  <TableCell>{purchase.supplier}</TableCell>
                  <TableCell className="text-right">{purchase.quantity}</TableCell>
                  <TableCell className="text-right">${purchase.unitCost.toFixed(2)}</TableCell>
                  <TableCell className="text-right">${purchase.totalCost.toFixed(2)}</TableCell>
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
                        <DropdownMenuItem disabled>Edit</DropdownMenuItem>
                        <DropdownMenuItem disabled>Delete</DropdownMenuItem>
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
            <DialogContent className="sm:max-w-[425px]">
                 <form onSubmit={handleSavePurchase}>
                    <DialogHeader>
                        <DialogTitle>{editingPurchase ? 'Edit Purchase' : 'Add Purchase'}</DialogTitle>
                        <DialogDescription>
                           {editingPurchase ? 'Update the details of this purchase.' : 'Record a new inventory purchase.'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="productId" className="text-right">Product</Label>
                            {/* In a real app, this would be a select dropdown */}
                            <Input id="productId" name="productId" defaultValue={editingPurchase?.productId || 'p1'} className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="supplier" className="text-right">Supplier</Label>
                            <Input id="supplier" name="supplier" defaultValue={editingPurchase?.supplier} className="col-span-3" required />
                        </div>
                         <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="quantity" className="text-right">Quantity</Label>
                            <Input id="quantity" name="quantity" type="number" defaultValue={editingPurchase?.quantity} className="col-span-3" required />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="unitCost" className="text-right">Unit Cost</Label>
                            <Input id="unitCost" name="unitCost" type="number" step="0.01" defaultValue={editingPurchase?.unitCost} className="col-span-3" required />
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">Cancel</Button>
                        </DialogClose>
                        <Button type="submit">Save Purchase</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    </>
  );
}
