
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MoreHorizontal, File } from 'lucide-react';
import { sampleOrders } from '@/lib/data';
import type { Order } from '@/lib/types';

type OrderStatus = 'Pending' | 'Shipped' | 'Delivered';

export default function OrdersPage() {
  const [orders, setOrders] = React.useState<Order[]>(sampleOrders);

  const handleStatusChange = (orderId: string, newStatus: OrderStatus) => {
    setOrders(currentOrders =>
      currentOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const getStatusVariant = (status: OrderStatus) => {
    switch (status) {
      case 'Delivered':
        return 'default';
      case 'Shipped':
        return 'secondary';
      case 'Pending':
        return 'destructive';
      default:
        return 'outline';
    }
  };
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


  const renderOrderRows = (filteredOrders: Order[]) => {
     if (filteredOrders.length === 0) {
      return (
        <TableRow>
          <TableCell colSpan={6} className="h-24 text-center">
            No orders found.
          </TableCell>
        </TableRow>
      );
    }
    return filteredOrders.map(order => (
      <TableRow key={order.id}>
        <TableCell className="font-medium">{order.id}</TableCell>
        <TableCell>{order.customer.name}</TableCell>
        <TableCell className="hidden md:table-cell">{order.date}</TableCell>
        <TableCell>
          <Badge variant={getStatusVariant(order.status)} className={getStatusClass(order.status)}>
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
              <DropdownMenuItem onClick={() => alert(`Viewing details for ${order.id}`)}>
                View Details
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
    ));
  };

  return (
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
        </div>
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
                    <TabsContent value="all" className="contents">
                        {renderOrderRows(orders)}
                    </TabsContent>
                    <TabsContent value="pending" className="contents">
                        {renderOrderRows(orders.filter(o => o.status === 'Pending'))}
                    </TabsContent>
                    <TabsContent value="shipped" className="contents">
                        {renderOrderRows(orders.filter(o => o.status === 'Shipped'))}
                    </TabsContent>
                    <TabsContent value="delivered" className="contents">
                        {renderOrderRows(orders.filter(o => o.status === 'Delivered'))}
                    </TabsContent>
                </TableBody>
            </Table>
        </CardContent>
      </Card>
    </Tabs>
  );
}
