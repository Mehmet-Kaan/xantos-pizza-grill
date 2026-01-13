import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  orderBy,
  Timestamp,
  type DocumentData,
} from "firebase/firestore";
import { db } from "../config/firebase";

export interface Order {
  id?: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    qty: number;
    selectedIngredients?: Array<{ name: string; extraPrice?: number }>;
  }>;
  total: number;
  name: string;
  phone: string;
  address: string | null;
  method: "pickup" | "delivery";
  note?: string;
  paymentMethod?: "card" | "mobilepay" | "cash";
  paymentStatus?: "paid" | "pending";
  status: "pending" | "paid" | "making" | "ready" | "collected";
  createdAt: Date | Timestamp;
}

// Create a new order
export async function createOrder(orderData: Omit<Order, "id" | "createdAt">): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, "orders"), {
      ...orderData,
      createdAt: Timestamp.now(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

// Get all orders
export async function getAllOrders(): Promise<Order[]> {
  try {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    })) as Order[];
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

// Update order status
export async function updateOrderStatus(
  orderId: string,
  status: Order["status"]
): Promise<void> {
  try {
    const orderRef = doc(db, "orders", orderId);
    await updateDoc(orderRef, {
      status,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
}

// Get order by ID
export async function getOrderById(orderId: string): Promise<Order | null> {
  try {
    const q = query(collection(db, "orders"));
    const querySnapshot = await getDocs(q);
    const order = querySnapshot.docs.find((doc) => doc.id === orderId);
    
    if (!order) return null;
    
    return {
      id: order.id,
      ...order.data(),
      createdAt: order.data().createdAt?.toDate() || new Date(),
    } as Order;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw error;
  }
}
