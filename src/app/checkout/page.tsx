
'use client';

import * as React from 'react';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { createOrder } from '@/app/actions';
import type { OrderItem, Order } from '@/lib/types';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cartItems, totalPrice, clearCart } = useCart();
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = React.useState(false);
  const [paymentMethod, setPaymentMethod] = React.useState<'Credit Card' | 'Cash on Delivery'>('Credit Card');
  const [orderPlaced, setOrderPlaced] = React.useState<Order | null>(null);


  const handlePlaceOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (cartItems.length === 0) {
        toast({ title: "Your cart is empty", variant: "destructive" });
        setLoading(false);
        return;
    }

    const formData = new FormData(e.currentTarget);
    const orderItems: OrderItem[] = cartItems.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        imageUrl: item.imageUrl
    }));

    try {
        const result = await createOrder({
            customer: {
                name: `${formData.get('firstName')} ${formData.get('lastName')}`,
                email: formData.get('email') as string,
                phone: formData.get('phone') as string,
                address: formData.get('address') as string,
                city: formData.get('city') as string,
                state: formData.get('state') as string,
                postalCode: formData.get('zip') as string,
                country: formData.get('country') as string,
            },
            items: orderItems,
            total: totalPrice,
            paymentMethod: paymentMethod,
        });

        if (result.success && result.orderId) {
            toast({
                title: "Order Placed Successfully!",
                description: "Thank you for your purchase. We've received your order.",
            });
            clearCart();
            // Instead of redirecting, we'll show the confirmation UI.
            setOrderPlaced({
                id: result.orderId,
                customer: result.order.customer,
                items: result.order.items,
                total: result.order.total,
                date: new Date(result.order.createdAt.seconds * 1000).toLocaleDateString(),
                status: result.order.status,
                paymentMethod: result.order.paymentMethod,
            });
        } else {
            throw new Error(result.error || "Order creation failed unexpectedly.");
        }
    } catch (error) {
        console.error("Failed to create order:", error);
        toast({
            title: "Failed to place order",
            description: "Something went wrong. Please try again.",
            variant: "destructive",
        });
    } finally {
        setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Card className="max-w-2xl mx-auto">
                <CardHeader className="text-center">
                    <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-4" />
                    <CardTitle className="text-3xl font-headline">Thank you for your order!</CardTitle>
                    <CardDescription>
                        Your order has been placed successfully. A confirmation email has been sent to {orderPlaced.customer.email}.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="my-4 p-4 border rounded-md">
                        <h3 className="font-semibold text-lg mb-2">Order Summary</h3>
                        <div className="flex justify-between text-muted-foreground">
                            <span>Order ID:</span>
                            <span className="font-mono text-sm">{orderPlaced.id}</span>
                        </div>
                        <div className="flex justify-between text-muted-foreground">
                            <span>Order Date:</span>
                            <span>{orderPlaced.date}</span>
                        </div>
                         <div className="flex justify-between text-muted-foreground">
                            <span>Payment Method:</span>
                            <span>{orderPlaced.paymentMethod}</span>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        {orderPlaced.items.map(item => (
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
                            <span>${orderPlaced.total.toFixed(2)}</span>
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
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold font-headline mb-8 text-center">Checkout</h1>
       {cartItems.length === 0 && !loading ? (
        <Card className="text-center p-8">
            <CardTitle>Your cart is empty</CardTitle>
            <CardContent className="mt-4">
                <p>You need to add items to your cart before you can checkout.</p>
                <Button onClick={() => router.push('/shop')} className="mt-4">
                    Continue Shopping
                </Button>
            </CardContent>
        </Card>
      ) : (
      <div className="grid lg:grid-cols-2 gap-12">
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Shipping & Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePlaceOrder} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" name="firstName" placeholder="John" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" name="lastName" placeholder="Doe" required />
                  </div>
                </div>
                 <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" name="email" placeholder="you@example.com" required />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input id="phone" name="phone" placeholder="(123) 456-7890" required />
                    </div>
                 </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input id="address" name="address" placeholder="123 Main St" required />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" name="city" placeholder="Anytown" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Input id="state" name="state" placeholder="CA" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zip">ZIP Code</Label>
                    <Input id="zip" name="zip" placeholder="12345" required />
                  </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" name="country" placeholder="USA" required />
                </div>

                <h3 className="text-xl font-headline pt-4">Payment Details</h3>
                 <RadioGroup defaultValue="Credit Card" name="paymentMethod" onValueChange={(value: 'Credit Card' | 'Cash on Delivery') => setPaymentMethod(value)}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Credit Card" id="r1" />
                        <Label htmlFor="r1">Credit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Cash on Delivery" id="r2" />
                        <Label htmlFor="r2">Cash on Delivery</Label>
                    </div>
                </RadioGroup>

                {paymentMethod === 'Credit Card' && (
                    <div className="space-y-4 pt-4 border-t mt-4">
                        <div className="space-y-2">
                            <Label htmlFor="card-number">Card Number</Label>
                            <Input id="card-number" placeholder="**** **** **** 1234" required={paymentMethod === 'Credit Card'} />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="expiry">Expiry Date</Label>
                            <Input id="expiry" placeholder="MM/YY" required={paymentMethod === 'Credit Card'} />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="cvc">CVC</Label>
                            <Input id="cvc" placeholder="123" required={paymentMethod === 'Credit Card'} />
                        </div>
                        </div>
                    </div>
                )}
                
                <Button type="submit" size="lg" className="w-full mt-6 bg-accent hover:bg-accent/90" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {loading ? 'Placing Order...' : 'Place Order'}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-headline">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map(item => (
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
              <div className="border-t pt-4 space-y-2">
                 <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                 <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>$0.00</span>
                </div>
                 <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      )}
    </div>
  );
}
