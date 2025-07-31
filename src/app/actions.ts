
'use server';

import { generateProductRecommendations } from '@/ai/flows/product-recommendations';
import { products } from '@/lib/data';
import type { Product, Order, OrderItem, CustomerInfo } from '@/lib/types';
import { firestore } from '@/lib/firebase';
import { addDoc, collection, doc, getDoc, serverTimestamp, Timestamp } from 'firebase/firestore';

export async function getRecommendedProducts(viewingHistory: string[]): Promise<Product[]> {
  try {
    const result = await generateProductRecommendations({
      viewingHistory,
      currentTrends: 'perfumes for men, gift boxes, and best sellers'
    });

    const recommendedIds = result.recommendations;
    
    // In a real app, you would fetch these products from your database.
    // For this example, we filter from our mock data.
    const recommendedProducts = products.filter(p => recommendedIds.includes(p.id));

    // If AI gives fewer results, fill up with other products
    if (recommendedProducts.length < 4) {
      const otherProducts = products.filter(p => !recommendedIds.includes(p.id) && !viewingHistory.includes(p.id));
      const needed = 4 - recommendedProducts.length;
      return [...recommendedProducts, ...otherProducts.slice(0, needed)];
    }

    return recommendedProducts;
  } catch (error) {
    console.error("Error getting product recommendations:", error);
    // Return a default set of products on error
    return products.slice(0, 4).filter(p => !viewingHistory.includes(p.id));
  }
}

export async function createOrder(orderData: {
  customer: CustomerInfo;
  items: OrderItem[];
  total: number;
  paymentMethod: 'Credit Card' | 'Cash on Delivery';
}) {
    try {
        const orderToCreate = {
            ...orderData,
            date: new Date().toISOString().split('T')[0],
            status: 'Pending', // Default status
            createdAt: serverTimestamp()
        };
        const orderRef = await addDoc(collection(firestore, 'orders'), orderToCreate);
        return { success: true, orderId: orderRef.id };
    } catch (error) {
        console.error("Error creating order in Firestore:", error);
        throw new Error("Could not create order.");
    }
}


export async function getOrderById(orderId: string): Promise<Order | null> {
    try {
        const orderRef = doc(firestore, 'orders', orderId);
        const orderSnap = await getDoc(orderRef);

        if (!orderSnap.exists()) {
            return null;
        }

        const data = orderSnap.data();
        return {
            id: orderSnap.id,
            date: (data.createdAt as Timestamp)?.toDate().toLocaleDateString() || new Date(data.date).toLocaleDateString(),
            status: data.status,
            customer: data.customer,
            total: data.total,
            items: data.items,
            createdAt: data.createdAt,
            paymentMethod: data.paymentMethod,
        };
    } catch (error) {
        console.error("Error fetching order:", error);
        throw new Error("Could not retrieve order.");
    }
}
