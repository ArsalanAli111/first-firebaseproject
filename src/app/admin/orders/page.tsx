
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoreHorizontal, File, PlusCircle } from 'lucide-react';
import { sampleOrders, products, categories } from '@/lib/data';
import type { Order } from '@/lib/types';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from 'next/image';

type OrderStatus = 'Pending' | 'Shipped' | 'Delivered';

export default function OrdersPage() {
  const [orders, setOrders] = React.useState<Order[]>(sampleOrders);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [editingOrder, setEditingOrder] = React.useState<Order | null>(null);


  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(currentOrders =>
      currentOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleEditOrder = (order: Order) => {
    setEditingOrder(order);
    setIsDialogOpen(true);
  }

  const handleAddOrder = () => {
    setEditingOrder(null);
    setIsDialogOpen(true);
  }

  const handleSaveOrder = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // In a real app, you would handle form submission to your backend
      setIsDialogOpen(false);
  }


  const getStatusClass = (status: OrderStatus) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-600';
      case 'Shipped':
        return 'bg-blue-500';
      case 'Pending':
        return 'bg-yellow-500';
      default:
        return '';
    }
  };

  const getCategoryName = (slug: string) => {
    return categories.find(c => c.slug === slug)?.name || 'N/A';
  }


  const renderOrderTable = (filteredOrders: Order[]) => {
    return (
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Total</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No orders found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredOrders.map(order => (
                  <React.Fragment key={order.id}>
                    <TableRow>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>
                            <div className="font-medium">{order.customer.name}</div>
                            <div className="text-sm text-muted-foreground">{order.customer.email}</div>
                        </TableCell>
                        <TableCell className="hidden md:table-cell">{order.date}</TableCell>
                        <TableCell>
                        <Badge className={getStatusClass(order.status)}>
                            {order.status}
                        </Badge>
                        </TableCell>
                        <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                        <TableCell>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleEditOrder(order)}>
                                Edit Order
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'Pending')}>Pending</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'Shipped')}>Shipped</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'Delivered')}>Delivered</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={6} className="p-0">
                             <div className="p-4 space-y-4 bg-muted/50">
                                <h4 className="font-semibold">Order Items:</h4>
                                {order.items && order.items.map(item => {
                                  const product = products.find(p => p.id === item.id);
                                  return (
                                     <div key={item.id} className="flex items-start gap-4 py-2 border-b last:border-0">
                                        <Image src={item.imageUrl} alt={item.name} width={40} height={40} className="rounded-md" data-ai-hint="perfume bottle" />
                                        <div className="flex-grow">
                                            <p className="font-medium text-sm">{item.name}</p>
                                            <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                            {product && (
                                              <div className="mt-1">
                                                <Badge variant="outline" className="mr-1">{getCategoryName(product.category)}</Badge>
                                                {product.attributes && Object.entries(product.attributes).map(([key, value]) => (
                                                  <Badge key={key} variant="secondary" className="mr-1">{`${key}: ${value}`}</Badge>
                                                ))}
                                              </div>
                                            )}
                                        </div>
                                        <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                  )
                                })}
                             </div>
                        </TableCell>
                    </TableRow>
                  </React.Fragment>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    );
  };

  return (
    <>
    <Tabs defaultValue="all">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle>Customer Orders</CardTitle>
          <CardDescription>View, filter, and manage all customer orders.</CardDescription>
        </div>
        <div className="flex items-center gap-2">
            <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="shipped">Shipped</TabsTrigger>
                <TabsTrigger value="delivered" className="hidden sm:flex">Delivered</TabsTrigger>
            </TabsList>
            <Button size="sm" variant="outline" className="h-8 gap-1">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Export</span>
            </Button>
            <Button size="sm" className="h-8 gap-1" onClick={handleAddOrder}>
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Order</span>
            </Button>
        </div>
      </div>
      <div className="mt-4">
        <TabsContent value="all">
          {renderOrderTable(orders)}
        </TabsContent>
        <TabsContent value="pending">
          {renderOrderTable(orders.filter(o => o.status === 'Pending'))}
        </TabsContent>
        <TabsContent value="shipped">
          {renderOrderTable(orders.filter(o => o.status === 'Shipped'))}
        </TabsContent>
        <TabsContent value="delivered">
          {renderOrderTable(orders.filter(o => o.status === 'Delivered'))}
        </TabsContent>
      </div>
    </Tabs>

     <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[625px]">
            <form onSubmit={handleSaveOrder}>
                <DialogHeader>
                    <DialogTitle>{editingOrder ? 'Edit Order' : 'Add Order'}</DialogTitle>
                    <DialogDescription>
                        {editingOrder ? 'Update the details of this order.' : 'Create a new customer order.'}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {/* Add form fields for order details here */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="customer-name" className="text-right">Customer Name</Label>
                        <Input id="customer-name" defaultValue={editingOrder?.customer.name} className="col-span-3" />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="customer-email" className="text-right">Customer Email</Label>
                        <Input id="customer-email" type="email" defaultValue={editingOrder?.customer.email} className="col-span-3" />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="status" className="text-right">Status</Label>
                        <Input id="status" defaultValue={editingOrder?.status} className="col-span-3" />
                    </div>
                    {/* A more complex item editor would be needed for a real app */}
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Items</Label>
                        <div className="col-span-3 text-sm text-muted-foreground">
                            Item editing is not implemented in this demo.
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button type="button" variant="secondary">Cancel</Button>
                    </DialogClose>
                    <Button type="submit">Save Order</Button>
                </DialogFooter>
            </form>
        </DialogContent>
    </Dialog>
    </>
  );
}
