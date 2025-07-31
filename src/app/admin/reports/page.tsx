
'use client';

import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { LineChart, Line, BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from "recharts";
import { products, sampleOrders } from "@/lib/data";
import { FileDown } from "lucide-react";
import type { Product } from '@/lib/types';

type TopSellingProduct = Product & {
    unitsSold: number;
    revenue: number;
};

export default function ReportsPage() {
  const [topSellingProducts, setTopSellingProducts] = React.useState<TopSellingProduct[]>([]);
  
  const salesData = React.useMemo(() => {
    const salesByMonth: Record<string, { sales: number }> = {};
    sampleOrders.forEach(order => {
        const date = new Date(order.date);
        const month = date.toLocaleString('default', { month: 'short' });
        salesByMonth[month] = {
            sales: (salesByMonth[month]?.sales || 0) + order.total,
        };
    });

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentMonth = new Date().getMonth();
    const lastSixMonths: { name: string; sales: number }[] = [];

    for (let i = 5; i >= 0; i--) {
        const monthIndex = (currentMonth - i + 12) % 12;
        const monthName = monthNames[monthIndex];
        lastSixMonths.push({
            name: monthName,
            sales: salesByMonth[monthName]?.sales || 0,
        });
    }
    
    return lastSixMonths;
  }, []);

  const newCustomersData = React.useMemo(() => {
    const customerFirstOrder: Record<string, Date> = {};
    sampleOrders.forEach(order => {
      const orderDate = new Date(order.date);
      if (!customerFirstOrder[order.customer.email] || orderDate < customerFirstOrder[order.customer.email]) {
        customerFirstOrder[order.customer.email] = orderDate;
      }
    });

    const newCustomersByMonth: Record<string, number> = {};
    Object.values(customerFirstOrder).forEach(date => {
      const month = date.toLocaleString('default', { month: 'short' });
      newCustomersByMonth[month] = (newCustomersByMonth[month] || 0) + 1;
    });

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentMonth = new Date().getMonth();
    const lastSixMonths: { month: string; newCustomers: number }[] = [];

    for (let i = 5; i >= 0; i--) {
        const monthIndex = (currentMonth - i + 12) % 12;
        const monthName = monthNames[monthIndex];
        lastSixMonths.push({
            month: monthName,
            newCustomers: newCustomersByMonth[monthName] || 0,
        });
    }
    return lastSixMonths;
  }, []);

  React.useEffect(() => {
    const productSales: Record<string, { unitsSold: number; revenue: number }> = {};

    sampleOrders.forEach(order => {
        order.items.forEach(item => {
            if (!productSales[item.id]) {
                productSales[item.id] = { unitsSold: 0, revenue: 0 };
            }
            productSales[item.id].unitsSold += item.quantity;
            productSales[item.id].revenue += item.price * item.quantity;
        });
    });

    const sortedProducts = Object.entries(productSales)
        .map(([productId, salesData]) => {
            const productInfo = products.find(p => p.id === productId);
            return {
                ...productInfo,
                ...salesData
            } as TopSellingProduct;
        })
        .filter(p => p.id)
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);
        
    setTopSellingProducts(sortedProducts);
  }, []);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Sales Report</CardTitle>
                <CardDescription>Monthly sales performance over the last 6 months.</CardDescription>
            </div>
            <Button variant="outline" size="sm">
                <FileDown className="mr-2 h-4 w-4" />
                Export Sales Data
            </Button>
        </CardHeader>
        <CardContent>
            <ChartContainer config={{}} className="h-[350px] w-full">
                <ResponsiveContainer>
                    <LineChart data={salesData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="name" tickLine={false} axisLine={{ stroke: 'hsl(var(--border))' }} />
                        <YAxis tickLine={false} axisLine={{ stroke: 'hsl(var(--border))' }} tickFormatter={(value) => `$${value/1000}k`}/>
                        <Tooltip
                            content={<ChartTooltipContent
                                indicator="dot"
                                formatter={(value) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value as number)}
                            />}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ r: 4, fill: 'hsl(var(--primary))' }} activeDot={{ r: 6 }} />
                    </LineChart>
                </ResponsiveContainer>
             </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
            <div>
                <CardTitle>Top Selling Products</CardTitle>
                <CardDescription>Your best performing products by revenue.</CardDescription>
            </div>
             <Button variant="outline" size="sm">
                <FileDown className="mr-2 h-4 w-4" />
                Export Product Data
            </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead className="text-right">Units Sold</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Total Revenue</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topSellingProducts.map(product => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell className="text-right">{product.unitsSold}</TableCell>
                  <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">${product.revenue.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

       <Card>
        <CardHeader>
            <CardTitle>New Customer Growth</CardTitle>
            <CardDescription>New customers acquired per month.</CardDescription>
        </CardHeader>
        <CardContent>
            <ChartContainer config={{}} className="h-[350px] w-full">
                <ResponsiveContainer>
                    <BarChart data={newCustomersData}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                        <YAxis />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="newCustomers" name="New Customers" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                </ResponsiveContainer>
             </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
