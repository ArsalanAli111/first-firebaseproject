
'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart as BarChartIcon, Box, DollarSign, Package, ShoppingCart, Tags, Users } from "lucide-react";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend, CartesianGrid, Pie, Cell, PieChart } from "recharts";
import { sampleOrders, products as allProducts, attributes as allAttributes, categories as allCategories, users } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Link from "next/link";
import React from "react";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

export default function AdminDashboardPage() {

    const totalRevenue = sampleOrders.reduce((acc, order) => acc + order.total, 0);
    const totalProducts = allProducts.length;
    const totalOrders = sampleOrders.length;
    const totalCustomers = users.filter(u => u.role === 'customer').length;
    const totalCategories = allCategories.length;
    const totalAttributes = allAttributes.length;
    
    const recentProducts = allProducts.slice(-5).reverse();

    const categoryDistribution = allProducts.reduce((acc, product) => {
        const categoryName = allCategories.find(c => c.slug === product.category)?.name || 'Uncategorized';
        acc[categoryName] = (acc[categoryName] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const pieData = Object.entries(categoryDistribution).map(([name, value]) => ({ name, value }));

    const getCategoryName = (slug: string) => {
        return allCategories.find(c => c.slug === slug)?.name || 'N/A';
    }
    
    const monthlySales = React.useMemo(() => {
        const salesByMonth: Record<string, number> = {};
        sampleOrders.forEach(order => {
            const date = new Date(order.date);
            const month = date.toLocaleString('default', { month: 'short' });
            salesByMonth[month] = (salesByMonth[month] || 0) + order.total;
        });

        // Ensure we have data for the last 6 months, even if it's 0
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const currentMonth = new Date().getMonth();
        const lastSixMonths = [];
        for (let i = 5; i >= 0; i--) {
            const monthIndex = (currentMonth - i + 12) % 12;
            const monthName = monthNames[monthIndex];
            lastSixMonths.push({
                name: monthName,
                sales: salesByMonth[monthName] || 0,
            });
        }
        
        return lastSixMonths;
    }, []);


  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold font-headline">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Calculated from all orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalOrders}</div>
            <p className="text-xs text-muted-foreground">Live order count</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">Live product count</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{totalCustomers}</div>
            <p className="text-xs text-muted-foreground">Registered customer count</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Box className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCategories}</div>
            <p className="text-xs text-muted-foreground">Total category count</p>
          </CardContent>
        </Card>
         <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Attributes</CardTitle>
            <Tags className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalAttributes}</div>
            <p className="text-xs text-muted-foreground">Total attribute types</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
            <CardDescription>Monthly sales performance from orders.</CardDescription>
          </CardHeader>
          <CardContent>
             <ChartContainer config={{}} className="h-[300px] w-full">
                <ResponsiveContainer>
                    <BarChart data={monthlySales}>
                        <CartesianGrid vertical={false} />
                        <XAxis dataKey="name" tickLine={false} axisLine={false} tickMargin={8} />
                        <YAxis />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Legend />
                        <Bar dataKey="sales" fill="hsl(var(--primary))" radius={4} />
                    </BarChart>
                </ResponsiveContainer>
             </ChartContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Product Categories</CardTitle>
            <CardDescription>Distribution of products across categories.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={{}} className="h-[300px] w-full">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                            {pieData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                         <Tooltip content={<ChartTooltipContent />} />
                         <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

       <Card>
            <CardHeader>
                <CardTitle>Recent Products</CardTitle>
                <CardDescription>The last 5 products added to your store.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Product Name</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {recentProducts.map(product => (
                            <TableRow key={product.id}>
                                <TableCell>
                                    <Link href={`/admin/products`} className="font-medium text-primary hover:underline">
                                        {product.name}
                                    </Link>
                                </TableCell>
                                <TableCell>{getCategoryName(product.category)}</TableCell>
                                <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

       <Card>
            <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>A list of the most recent orders.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sampleOrders.slice(0, 5).map(order => (
                            <TableRow key={order.id}>
                                <TableCell>
                                    <Link href="/admin/orders" className="font-medium text-primary hover:underline">
                                        {order.id}
                                    </Link>
                                </TableCell>
                                <TableCell>{order.customer.name}</TableCell>
                                <TableCell>
                                    <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'}
                                        className={order.status === 'Delivered' ? 'bg-green-600' : order.status === 'Pending' ? 'bg-yellow-500' : 'bg-blue-500'}
                                    >
                                        {order.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

    </div>
  );
}

    