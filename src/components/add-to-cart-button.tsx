"use client";

import { useState } from 'react';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ShoppingBag, Minus, Plus } from 'lucide-react';
import type { Product } from '@/lib/types';

interface AddToCartButtonProps {
    product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
    const [quantity, setQuantity] = useState(1);
    const { addToCart, updateQuantity, cartItems } = useCart();

    const handleAddToCart = () => {
        const cartItem = cartItems.find(item => item.id === product.id);
        if (cartItem) {
            updateQuantity(product.id, cartItem.quantity + quantity);
        } else {
             addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                imageUrl: product.imageUrl,
                quantity: quantity
            });
        }
    };
    
    return (
        <div className="flex items-center gap-4">
            <div className="flex items-center border rounded-md">
            <Button variant="ghost" size="icon" onClick={() => setQuantity(q => Math.max(1, q - 1))}>
                <Minus className="h-4 w-4" />
            </Button>
            <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-16 h-10 text-center border-0 focus-visible:ring-0"
                min="1"
            />
            <Button variant="ghost" size="icon" onClick={() => setQuantity(q => q + 1)}>
                <Plus className="h-4 w-4" />
            </Button>
            </div>
            <Button size="lg" onClick={handleAddToCart} className="flex-grow bg-accent hover:bg-accent/90 text-accent-foreground">
            <ShoppingBag className="mr-2 h-5 w-5" />
            Add to Cart
            </Button>
      </div>
    );
}
