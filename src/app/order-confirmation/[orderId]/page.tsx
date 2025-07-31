
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
        <Card className="max-w-2xl mx-auto">
            <CardHeader className="text-center">
                <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                <CardTitle className="text-3xl font-headline">Thank you for your order!</CardTitle>
                <CardDescription>
                    Your order has been placed successfully. A confirmation email has been sent to {order.customer.email}.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="my-4 p-4 border rounded-md">
                    <h3 className="font-semibold text-lg mb-2">Order Summary</h3>
                    <div className="flex justify-between text-muted-foreground">
                        <span>Order ID:</span>
                        <span className="font-mono text-sm">{order.id}</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                        <span>Order Date:</span>
                        <span>{order.date}</span>
                    </div>
                     <div className="flex justify-between text-muted-foreground">
                        <span>Payment Method:</span>
                        <span>{order.paymentMethod}</span>
                    </div>
                </div>
                
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

                <div className="border-t mt-4 pt-4 space-y-2">
                    <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>${order.total.toFixed(2)}</span>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
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
