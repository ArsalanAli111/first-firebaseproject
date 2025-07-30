
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { sampleOrders } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, MapPin, Edit } from "lucide-react";

export default function DashboardPage() {
  // In a real app, this would be fetched for the logged-in user.
  const orders = sampleOrders.slice(0, 2); // Show recent orders
  const user = {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    avatarUrl: "https://placehold.co/100x100.png",
    shippingAddress: "123 Perfume Lane, Scent City, 12345"
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back, {user.name}!</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: User Info & Address */}
        <div className="lg:col-span-1 space-y-8">
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatarUrl} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="font-headline">{user.name}</CardTitle>
                <CardDescription>{user.email}</CardDescription>
              </div>
            </CardHeader>
            <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Profile
                </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{user.shippingAddress}</p>
            </CardContent>
             <CardFooter>
                <Button variant="outline" size="sm" className="w-full">
                    <Edit className="mr-2 h-4 w-4" />
                    Update Address
                </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Right Column: Order History */}
        <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold font-headline mb-4">Recent Orders</h2>
            {orders.length === 0 ? (
                <Card>
                    <CardContent className="pt-6">
                        <p>You have not placed any orders yet.</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-6">
                    {orders.map(order => (
                        <Card key={order.id}>
                            <CardHeader className="flex flex-row justify-between items-start">
                                <div>
                                    <CardTitle>Order #{order.id}</CardTitle>
                                    <CardDescription>Date: {order.date}</CardDescription>
                                </div>
                                <Badge variant={order.status === 'Delivered' ? 'default' : 'secondary'} className={order.status === 'Delivered' ? 'bg-green-600' : ''}>
                                    {order.status}
                                </Badge>
                            </CardHeader>
                            <CardContent>
                                {order.items.map(item => (
                                    <div key={item.id} className="flex items-center gap-4 py-2 border-b last:border-0">
                                        <Image src={item.imageUrl} alt={item.name} width={64} height={64} className="rounded-md" />
                                        <div className="flex-grow">
                                            <p className="font-medium">{item.name}</p>
                                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                    </div>
                                ))}
                            </CardContent>
                             <CardFooter className="flex justify-between items-center bg-secondary/50 py-3 px-6">
                                <span className="font-semibold">Total: ${order.total.toFixed(2)}</span>
                                <Button variant="outline" size="sm">View Details</Button>
                            </CardFooter>
                        </Card>
                    ))}
                     <Button variant="link" asChild>
                        <a href="/account">View All Orders</a>
                    </Button>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
