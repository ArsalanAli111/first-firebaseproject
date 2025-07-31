
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Loader2 } from 'lucide-react';
import type { Order, OrderStatus } from '@/lib/types';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from 'next/image';
import { collection, query, onSnapshot, orderBy, doc, updateDoc, Timestamp } from 'firebase/firestore';
import { firestore } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

export default function OrdersPage() {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [isDetailsOpen, setIsDetailsOpen] = React.useState(false);
  const [selectedOrder, setSelectedOrder] = React.useState<Order | null>(null);
  const { toast } = useToast();


  React.useEffect(() => {
    const q = query(collection(firestore, "orders"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const ordersData: Order[] = [];
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            ordersData.push({
                id: doc.id,
                date: (data.createdAt as Timestamp)?.toDate().toLocaleDateString() || new Date(data.date).toLocaleDateString(),
                status: data.status,
                customer: data.customer,
                total: data.total,
                items: data.items,
                createdAt: data.createdAt,
            });
        });
        setOrders(ordersData);
        setLoading(false);
    }, (error) => {
        console.error("Error fetching orders:", error);
        toast({ title: "Error fetching orders", variant: "destructive" });
        setLoading(false);
    });

    return () => unsubscribe();
  }, [toast]);


  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    const orderRef = doc(firestore, 'orders', orderId);
    try {
        await updateDoc(orderRef, { status: newStatus });
        toast({ title: `Order status updated to ${newStatus}` });
    } catch (error) {
        console.error("Error updating order status:", error);
        toast({ title: "Failed to update status", variant: "destructive" });
    }
  };

  const viewOrderDetails = (order: Order) => {
    setSelectedOrder(order);
    setIsDetailsOpen(true);
  }

  const getStatusClass = (status: OrderStatus) => {
    switch (status) {
      case 'Delivered':
        return 'bg-green-600';
      case 'Shipped':
        return 'bg-blue-500';
      case 'Pending':
        return 'bg-yellow-500';
      case 'Cancelled':
        return 'bg-red-500';
      default:
        return '';
    }
  };


  return (
    <>
    <div>
        <CardTitle>Customer Orders</CardTitle>
        <CardDescription>View and manage all customer orders from Firestore.</CardDescription>
    </div>
    <Card className="mt-4">
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
              {loading ? (
                 <TableRow>
                    <TableCell colSpan={6} className="h-24 text-center">
                        <Loader2 className="mx-auto h-8 w-8 animate-spin" />
                    </TableCell>
                </TableRow>
              ) : orders.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No orders found.
                  </TableCell>
                </TableRow>
              ) : (
                orders.map(order => (
                    <TableRow key={order.id}>
                        <TableCell className="font-medium truncate max-w-24" title={order.id}>{order.id}</TableCell>
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
                            <DropdownMenuItem onClick={() => viewOrderDetails(order)}>
                                View Details
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'Pending')}>Pending</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'Shipped')}>Shipped</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'Delivered')}>Delivered</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(order.id, 'Cancelled')}>Cancelled</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        </TableCell>
                    </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

     <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[625px]">
            <DialogHeader>
                <DialogTitle>Order #{selectedOrder?.id}</DialogTitle>
                <DialogDescription>
                    Details for order placed on {selectedOrder?.date}.
                </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-4">
               {selectedOrder?.items.map(item => (
                 <div key={item.id} className="flex items-start gap-4 py-2 border-b last:border-0">
                    <Image src={item.imageUrl} alt={item.name} width={60} height={60} className="rounded-md" data-ai-hint="perfume bottle" />
                    <div className="flex-grow">
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                ))}
            </div>
        </DialogContent>
    </Dialog>
    </>
  );
}
