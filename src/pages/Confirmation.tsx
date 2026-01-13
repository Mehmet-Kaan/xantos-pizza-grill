import { useEffect, useState } from "react";
import { getOrderById, type Order } from "../services/ordersService";

export default function Confirmation({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrder() {
      try {
        const fetchedOrder = await getOrderById(orderId);
        setOrder(fetchedOrder);
      } catch (error) {
        console.error("Error loading order:", error);
      } finally {
        setLoading(false);
      }
    }
    loadOrder();
  }, [orderId]);

  if (loading) {
    return (
      <main className="max-w-3xl mx-auto p-6">
        <div className="p-6 bg-white rounded shadow text-center">Indlæser ordre...</div>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="max-w-3xl mx-auto p-6">
        <div className="p-6 bg-white rounded shadow">Ordre ikke fundet.</div>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded shadow p-6">
        <h2 className="text-2xl font-bold mb-2">
          Thanks — your order is placed!
        </h2>
        <p className="text-sm text-gray-600 mb-4">Order #{order.id}</p>
        <div>
          <h4 className="font-semibold">Items</h4>
          <ul className="mt-2">
            {order.items.map((i: any) => (
              <li key={i.id}>
                {i.qty} × {i.name} — {i.price * i.qty},-
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4">
          Total: <strong>{order.total},-</strong>
        </div>
        <div className="mt-4">
          We will call you at <strong>{order.phone}</strong> when your order is
          ready.
        </div>
      </div>
    </main>
  );
}
