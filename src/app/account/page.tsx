
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { sampleOrders } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function AccountPage() {
  // In a real app, this would be fetched for the logged-in user.
  const orders = sampleOrders;
  const userName = "Jane Doe";

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <header className="mb-8">
        <h1 className="text-4xl font-bold font-headline">My Account</h1>
        <p className="text-muted-foreground mt-2">Welcome back, {userName}!</p>
      </header>

      <div className="space-y-8">
        <div>
            <h2 className="text-2xl font-semibold font-headline mb-4">Order History</h2>
            {orders.length === 0 ? (
                <p>You have not placed any orders yet.</p>
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
                                <div className="space-y-4">
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
                                </div>
                            </CardContent>
                             <CardFooter className="flex justify-between items-center bg-secondary/50 py-3 px-6">
                                <span className="font-semibold">Total: ${order.total.toFixed(2)}</span>
                                <Button variant="outline" size="sm">View Details</Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
