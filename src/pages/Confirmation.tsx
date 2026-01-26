import { useEffect, useState } from "react";
import { getOrderById, type Order } from "../services/ordersService";
import { CheckIcon } from "../hooks/icons";
import "../styles/confirmation.css";
import { Link } from "react-router-dom";

export default function Confirmation({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadOrder() {
      try {
        // 1️⃣ Try sessionStorage first
        const cached = sessionStorage.getItem(`order:${orderId}`);
        if (cached) {
          setOrder(JSON.parse(cached));
          return;
        }

        // 2️⃣ Fallback to Firebase
        const fetchedOrder = await getOrderById(orderId);
        setOrder(fetchedOrder);

        // Optional: cache it if fetched
        sessionStorage.setItem(
          `order:${orderId}`,
          JSON.stringify(fetchedOrder),
        );
      } catch (error) {
        console.error("Error loading order:", error);
      } finally {
        setLoading(false);
      }
    }

    loadOrder();
  }, [orderId]);

  useEffect(() => {
    return () => {
      sessionStorage.removeItem(`order:${orderId}`);
    };
  }, [orderId]);

  if (loading) {
    return (
      <main className="confirmation-page">
        <div className="confirmation-loading">Indlæser ordre…</div>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="confirmation-page">
        <div className="confirmation-error">Ordre ikke fundet.</div>
      </main>
    );
  }

  return (
    <main className="confirmation-page">
      <div className="confirmation-card">
        <header className="confirmation-header">
          <CheckIcon className="confirmation-icon" />
          <h1 className="confirmation-title">Tak! Din ordre er modtaget 🎉</h1>
          <p className="confirmation-order-id">Ordrenummer #{order.id}</p>
        </header>

        <section className="confirmation-content">
          <div>
            <h3 className="confirmation-section-title">Bestilte varer</h3>
            <ul className="confirmation-items">
              {order.items.map((item: any) => (
                <li key={item.id} className="confirmation-item">
                  <span className="confirmation-item-name">
                    {item.qty} × {item.name}
                  </span>
                  <span className="confirmation-item-price">
                    {item.price * item.qty},-
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="confirmation-total">
            <span>Total</span>
            <span>{order.total},-</span>
          </div>

          <div className="confirmation-info">
            📞 Vi ringer til dig på <strong>{order.phone}</strong>, når din
            ordre er klar.
          </div>

          <div className="confirmation-actions">
            <Link
              to="/"
              className="confirmation-btn confirmation-btn-primary btn-secondary"
            >
              Tilbage til menu
            </Link>
            <button
              onClick={() => window.print()}
              className="confirmation-btn confirmation-btn-secondary"
            >
              Udskriv kvittering
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
