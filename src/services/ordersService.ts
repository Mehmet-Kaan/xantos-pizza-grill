import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  orderBy,
  where,
  Timestamp,
  onSnapshot,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "../config/firebase";
import type { AddOnOption } from "../hooks/types";

export interface Order {
  id?: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    qty: number;
    selectedSize?: AddOnOption;
    selectedType?: AddOnOption;
    selectedChooseOne?: AddOnOption;
    selectedaddOns?: AddOnOption[];
    selectedaddOnsExtra?: AddOnOption[];
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
export async function createOrder(
  orderData: Omit<Order, "id" | "createdAt">,
): Promise<string> {
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

// Get all orders (with optional filters for today's orders and excluding ready status)
export async function getAllOrders(
  onlyToday = false,
  excludeReady = false,
): Promise<Order[]> {
  try {
    let q = query(collection(db, "orders"));

    // Filter: only today's orders
    if (onlyToday) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayTimestamp = Timestamp.fromDate(today);
      q = query(q, where("createdAt", ">=", todayTimestamp));
    }

    // Note: We filter by status client-side to avoid composite index requirement
    // Always order by createdAt descending (newest first)
    q = query(q, orderBy("createdAt", "desc"));

    const querySnapshot = await getDocs(q);
    let orders = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
    })) as Order[];

    // Filter: exclude orders with "ready" status (client-side to avoid index requirement)
    if (excludeReady) {
      orders = orders.filter((order) => order.status !== "ready");
    }

    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
}

// Update order status
export async function updateOrderStatus(
  orderId: string,
  status: Order["status"],
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

// Subscribe to real-time order updates (with optional filters for today's orders and excluding ready status)
export function subscribeToOrders(
  onUpdate: (orders: Order[]) => void,
  onError?: (error: Error) => void,
  onlyToday = false,
  excludeReady = false,
): Unsubscribe {
  try {
    let q = query(collection(db, "orders"));

    // Filter: only today's orders
    if (onlyToday) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const todayTimestamp = Timestamp.fromDate(today);
      q = query(q, where("createdAt", ">=", todayTimestamp));
    }

    // Note: We filter by status client-side to avoid composite index requirement
    // Always order by createdAt descending (newest first)
    q = query(q, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        let orders = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate() || new Date(),
        })) as Order[];

        // Filter: exclude orders with "ready" status (client-side to avoid index requirement)
        if (excludeReady) {
          orders = orders.filter((order) => order.status !== "ready");
        }

        onUpdate(orders);
      },
      (error) => {
        console.error("Error in orders subscription:", error);
        if (onError) {
          onError(error as Error);
        }
      },
    );

    return unsubscribe;
  } catch (error) {
    console.error("Error setting up orders subscription:", error);
    if (onError) {
      onError(error as Error);
    }
    // Return a no-op unsubscribe function
    return () => {};
  }
}
