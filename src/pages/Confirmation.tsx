import { useEffect, useState, useRef } from "react";
import { type Order } from "../services/ordersService";
import { CheckIcon } from "../hooks/icons";
import "../styles/confirmation.css";
import { Link } from "react-router-dom";
import { db } from "../config/firebase";
import { doc, onSnapshot } from "firebase/firestore";
import confetti from "canvas-confetti";
import { useCart } from "../contexts/CartContext";

export default function Confirmation({ orderId }: { orderId: string }) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true); // Inside Confirmation.tsx
  const { clear } = useCart();

  useEffect(() => {
    if (!orderId) return;

    setLoading(true);

    // 1. Check Cache for immediate UI (Optional)
    const cached = sessionStorage.getItem(`order:${orderId}`);
    if (cached) {
      setOrder(JSON.parse(cached));
      setLoading(false);
    }

    // 2. Set up a REAL-TIME listener on the Firestore document
    const orderRef = doc(db, "orders", orderId);

    const unsubscribe = onSnapshot(
      orderRef,
      (docSnap) => {
        if (docSnap.exists()) {
          const updatedOrder = { id: docSnap.id, ...docSnap.data() } as Order;
          setOrder(updatedOrder);

          // Keep the cache updated so it's fresh if they refresh the page
          sessionStorage.setItem(
            `order:${orderId}`,
            JSON.stringify(updatedOrder),
          );
        } else {
          console.error("Ordren blev ikke fundet i systemet.");
        }
        setLoading(false);
      },
      (error) => {
        console.error("Fejl ved lytning til ordre:", error);
        setLoading(false);
      },
    );

    // 3. Clean up on unmount
    return () => {
      unsubscribe();
      // We remove the cache when they leave the confirmation page
      sessionStorage.removeItem(`order:${orderId}`);
    };
  }, [orderId]);

  // useEffect(() => {
  //   async function loadOrder() {
  //     try {
  //       // 1️⃣ Try sessionStorage first
  //       const cached = sessionStorage.getItem(`order:${orderId}`);
  //       if (cached) {
  //         setOrder(JSON.parse(cached));
  //         return;
  //       }

  //       // 2️⃣ Fallback to Firebase
  //       const fetchedOrder = await getOrderById(orderId);
  //       setOrder(fetchedOrder);

  //       // Optional: cache it if fetched
  //       sessionStorage.setItem(
  //         `order:${orderId}`,
  //         JSON.stringify(fetchedOrder),
  //       );
  //     } catch (error) {
  //       console.error("Error loading order:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   loadOrder();
  // }, [orderId]);

  const hasCelebrated = useRef(false);

  useEffect(() => {
    // Only fire if the UI is fully loaded AND the status is paid AND we haven't celebrated yet
    if (!loading && order?.paymentStatus === "paid" && !hasCelebrated.current) {
      // Add a tiny 300ms delay so the user actually sees the page
      const timer = setTimeout(() => {
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#e63946", "#f1faee", "#a8dadc", "#457b9d"],
        });
        hasCelebrated.current = true;

        clear();
        localStorage.removeItem("checkout_draft");
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [order?.paymentStatus, loading]);

  if (loading) {
    return (
      <main className="confirmation-page">
        <div className="loader-container">
          <div className="spinner"></div>
          <p>Henter din ordrebekræftelse...</p>
        </div>
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
          {/* SCENARIO 1: Card Payment */}
          {order.paymentMethod === "card" &&
            (order.paymentStatus === "paid" ? (
              <div className="payment-badge success">
                <CheckIcon className="confirmation-icon" />
                <span>Betaling modtaget</span>
              </div>
            ) : (
              <div className="payment-badge pending">
                ⏳ Afventer betaling...
              </div>
            ))}

          {/* SCENARIO 2 & 3: Cash / MobilePay (Manual) */}
          {(order.paymentMethod === "cash" ||
            order.paymentMethod === "mobilepay") && (
            <div className="payment-badge manual">
              🔔 Betales ved{" "}
              {order.method === "delivery" ? "levering" : "afhentning"}
            </div>
          )}

          <h1 className="confirmation-title">
            {order.paymentStatus === "paid" || order.paymentMethod !== "card"
              ? "Tak! Vi er i gang med din ordre 🎉"
              : "Vi har modtaget din bestilling"}
          </h1>
          <p className="confirmation-order-id">Ordrenummer #{order.id}</p>
        </header>

        <section className="confirmation-content">
          <div>
            <h3 className="confirmation-section-title">Bestilte varer</h3>
            <ul className="confirmation-items">
              {order.items.map((item: any) => (
                <li key={item.id} className="confirmation-item">
                  <div className="confirmation-item-details">
                    <span className="confirmation-item-name">
                      {item.qty} × {item.name}
                    </span>
                    <span className="confirmation-item-price">
                      {(item.price * item.qty).toFixed(2)},-
                    </span>
                  </div>

                  {item.selectedIngredients &&
                    item.selectedIngredients.length > 0 && (
                      <div className="confirmation-item-ingredients">
                        {item.selectedIngredients.map(
                          (ing: any, idx: number) => (
                            <li key={idx}>
                              <span>{ing.name}</span>
                              <span>
                                {ing.extraPrice
                                  ? `${ing.extraPrice.toFixed(2)},-`
                                  : ""}
                              </span>
                            </li>
                          ),
                        )}
                      </div>
                    )}
                </li>
              ))}
            </ul>
          </div>

          <div className="confirmation-total">
            <span>Total</span>
            <span>{order.total.toFixed(2)},-</span>
          </div>

          <div className="confirmation-info">
            {order.method === "delivery" ? (
              <p>
                🚚 Maden bliver leveret til: <strong>{order.address}</strong>
              </p>
            ) : (
              <p>🛍️ Du kan hente din mad hos os om ca. 20 min.</p>
            )}
            {order.paymentMethod !== "card" && (
              <p className="payment-reminder">
                Husk at have <strong>{order.total.toFixed(2)},-</strong> klar
                til{" "}
                {order.paymentMethod === "mobilepay"
                  ? "MobilePay"
                  : "kontant betaling"}
                .
              </p>
            )}
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
