/**
 * @fileoverview This file contains the type definitions for the Firestore database collections.
 */

// Represents a product in the 'products' collection.
export interface Product {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  attributes: Record<string, string | number>; // e.g. { "scent": "floral", "size": 100 }
  stockQty: number;
  imageUrl: string;
}

// Represents a category in the 'categories' collection.
export interface Category {
  id: string;
  name: string;
  slug: string;
}

// Represents a product attribute in the 'attributes' collection.
export interface Attribute {
  id: string;
  type: string; // e.g., 'scent-profile', 'size'
  values: string[]; // e.g., ['Floral', 'Woody', 'Citrus'] or ['50ml', '100ml']
}

// Represents an item within an order.
export interface OrderItem {
    productId: string;
    quantity: number;
    price: number; // Price at the time of purchase
}

// Represents an order in the 'orders' collection.
export interface Order {
  id:string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: Date; // Or Firestore timestamp
}

// Represents a user in the 'users' collection.
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
}

// Represents a purchase/procurement record in the 'purchases' collection.
export interface Purchase {
  id: string;
  supplier: string;
  productId: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  date: Date; // Or Firestore timestamp
}

// Represents a policy document in the 'policies' collection.
export interface Policy {
  id: string;
  type: 'shipping' | 'refund' | 'privacy' | 'terms';
  content: string; // Can be HTML or Markdown
}
