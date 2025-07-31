
import { Timestamp } from "firebase/firestore";

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  images: string[];
  dataAiHint?: string;
  category: string;
  slug: string;
  stock: number;
  brand: string;
  attributes: Record<string, string | number>;
  reviews: {
    rating: number;
    text: string;
    author: string;
  }[];
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  dataAiHint: string;
  parentId?: string;
};

export type CartItem = {
  id: string;
  name:string;
  price: number;
  quantity: number;
  imageUrl: string;
};

// Represents a single item within an order
export type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
};

export type OrderStatus = 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';

// Customer information collected at checkout
export type CustomerInfo = {
  name: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

// The structure of an Order document in Firestore
export type Order = {
  id: string;
  date: string;
  status: OrderStatus;
  total: number;
  customer: CustomerInfo;
  items: OrderItem[];
  createdAt?: Timestamp;
  paymentMethod: 'Credit Card' | 'Cash on Delivery' | 'N/A';
};
