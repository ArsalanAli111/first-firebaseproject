
'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getOrderById } from '@/app/actions';
import type { Order } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function OrderConfirmationPage() {
    const { orderId } = useParams();
    const router = useRouter();
    const [order, setOrder] = React.useState<Order | null>(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        if (typeof orderId === 'string') {
            const fetchOrder = async () => {
                try {
                    setLoading(true);
                    const fetchedOrder = await getOrderById(orderId);
                    if (fetchedOrder) {
                        setOrder(fetchedOrder);
                    } else {
                        setError('Order not found.');
                    }
                } catch (err) {
                    setError('Failed to load order details.');
                    console.error(err);
                } finally {
                    setLoading(false);
                }
            };
            fetchOrder();
        }
    }, [orderId]);

    if (loading) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 flex justify-center items-center min-h-[60vh]">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <Card className="max-w-md mx-auto p-8">
                    <CardTitle className="text-2xl text-destructive">Error</CardTitle>
                    <CardContent>
                        <p className="mt-4">{error || 'Could not find the requested order.'}</p>
                        <Button onClick={() => router.push('/')} className="mt-6">Go to Homepage</Button>
                    </CardContent>
                </Card>
            </div>
        );
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
