
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
        const timestamp = serverTimestamp();
        const orderToCreate = {
            customer: orderData.customer,
            items: orderData.items,
            total: orderData.total,
            paymentMethod: orderData.paymentMethod,
            status: 'Pending',
            createdAt: timestamp
        };
        const docRef = await addDoc(collection(firestore, 'orders'), orderToCreate);
        
        return { success: true, orderId: docRef.id, error: null };
    } catch (error: any) {
        console.error("Error creating order in Firestore:", error);
        return { success: false, error: "Could not create order in database.", orderId: null };
    }
}


export async function getOrderById(orderId: string): Promise<Order | null> {
    try {
        const orderRef = doc(firestore, 'orders', orderId);
        const orderSnap = await getDoc(orderRef);

        if (!orderSnap.exists()) {
            console.warn(`Order with ID ${orderId} not found.`);
            return null;
        }

        const data = orderSnap.data();
        // Convert Firestore Timestamp to a readable date string
        const date = data.createdAt instanceof Timestamp 
            ? data.createdAt.toDate().toLocaleDateString()
            : new Date().toLocaleDateString();

        return {
            id: orderSnap.id,
            date: date,
            status: data.status || 'Pending',
            customer: data.customer,
            total: data.total,
            items: data.items,
            createdAt: data.createdAt, // keep original timestamp if needed
            paymentMethod: data.paymentMethod || 'N/A',
        };
    } catch (error) {
        console.error(`Error fetching order ${orderId}:`, error);
        throw new Error("Could not retrieve order details.");
    }
}
