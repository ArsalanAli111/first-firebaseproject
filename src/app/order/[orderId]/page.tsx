
import { getOrderById } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export default async function OrderConfirmationPage({ params }: { params: { orderId: string } }) {
  const order = await getOrderById(params.orderId);

  if (!order) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card className="max-w-3xl mx-auto">
            <CardHeader className="text-center items-center">
                <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                <CardTitle className="text-3xl font-headline">Thank you for your order!</CardTitle>
                <CardDescription className="max-w-prose">
                    Your order has been placed successfully. A confirmation email has been sent to {order.customer.email}. You can view your order history in your account page.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="my-4 p-4 border rounded-md bg-secondary/50">
                    <h3 className="font-semibold text-lg mb-4">Order Details</h3>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                        <div className="flex justify-between col-span-2">
                           <span className="text-muted-foreground">Order ID:</span>
                           <span className="font-mono">{order.id}</span>
                        </div>
                         <div className="flex justify-between col-span-2">
                           <span className="text-muted-foreground">Order Date:</span>
                           <span>{order.date}</span>
                        </div>
                        <div className="flex justify-between col-span-2">
                           <span className="text-muted-foreground">Name:</span>
                           <span>{order.customer.name}</span>
                        </div>
                        <div className="flex justify-between col-span-2">
                           <span className="text-muted-foreground">Shipping to:</span>
                           <span className="text-right">{order.customer.address}, {order.customer.city}, {order.customer.state} {order.customer.postalCode}</span>
                        </div>
                    </div>
                </div>
                
                <h3 className="font-semibold text-lg mb-4 mt-6">Items Ordered</h3>
                <div className="space-y-4">
                    {order.items.map(item => (
                        <div key={item.id} className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <div className="relative h-16 w-16 rounded-md overflow-hidden border">
                                    <Image src={item.imageUrl} alt={item.name} fill className="object-cover" />
                                </div>
                                <div>
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                </div>
                            </div>
                            <p>${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                    ))}
                </div>

                <div className="border-t mt-6 pt-4 space-y-2">
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Subtotal</span>
                        <span>${order.total.toFixed(2)}</span>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Shipping</span>
                        <span>$0.00</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${order.total.toFixed(2)}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4 mt-4">
                <Button asChild className="w-full">
                    <Link href="/shop">Continue Shopping</Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                    <Link href="/account">View Order History</Link>
                </Button>
            </CardFooter>
        </Card>
    </div>
  );
}
