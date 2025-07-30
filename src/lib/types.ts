export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  images: string[];
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

export type Order = {
  id: string;
  date: string;
  status: 'Pending' | 'Shipped' | 'Delivered';
  total: number;
  customer: {
    name: string;
    email: string;
  };
  items: Omit<CartItem, 'quantity'> & { quantity: number }[];
};
