import { CartItem } from "@/context/CartContext";

export interface Order {
  id: string | number;
  userId: string | number;
  fullName?: string;
  phone?: string;
  items: CartItem[];
  shippingAddress: string;
  deliveryMethod: string;
  paymentMethod: string;
  paymentStatus: string;
  trackingNumber: string;
  orderComment?: string;
  totalAmount: number;
}
