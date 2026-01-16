import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { ArrowRightIcon, PhoneIcon, CartIcon } from "../components/Icons";
import { createOrder } from "../services/ordersService";
import "./Checkout.css";

const DELIVERY_FEE = 30;

export default function Checkout() {
  const { items, total, clear } = useCart();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [method, setMethod] = useState("pickup");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const finalTotal = method === "delivery" ? total + DELIVERY_FEE : total;
  const requiresPayment = method === "delivery";

  function formatCardNumber(value: string) {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(" ");
    } else {
      return v;
    }
  }

  function formatExpiry(value: string) {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4);
    }
    return v;
  }

  async function handlePlaceOrder(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    // Validate payment if required
    if (requiresPayment && paymentMethod === "card") {
      if (!cardNumber || !cardName || !cardExpiry || !cardCvv) {
        alert("Udfyld venligst alle betalingsoplysninger");
        return;
      }
      if (cardNumber.replace(/\s/g, "").length < 16) {
        alert("Ugyldigt kortnummer");
        return;
      }
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      if (requiresPayment && paymentMethod === "card") {
        await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate API call
      }

      // Create order in Firebase
      const orderId = await createOrder({
      items,
        total: finalTotal,
      name,
      phone,
      address: method === "delivery" ? address : null,
        method: method as "pickup" | "delivery",
      note,
        paymentMethod: requiresPayment ? (paymentMethod as "card" | "mobilepay") : "cash",
        paymentStatus: requiresPayment && paymentMethod === "card" ? "paid" : "pending",
      status: "pending",
      });

      // Clear cart and go to confirmation
    clear();
      setIsProcessing(false);
      navigate("/confirmation/" + orderId);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Der opstod en fejl ved placering af ordren. Prøv venligst igen.");
      setIsProcessing(false);
    }
  }

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        <h2 className="checkout-title">
          <CartIcon style={{ marginRight: "0.5rem", verticalAlign: "middle" }} />
          Gennemfør bestilling
        </h2>
      {items.length === 0 ? (
          <div className="checkout-empty">
            <p>Din kurv er tom —</p>
            <Link to="/bestil" className="checkout-link">
              Se menuen
          </Link>
        </div>
      ) : (
          <div className="checkout-layout">
            <form onSubmit={handlePlaceOrder} className="checkout-form">
              <section className="checkout-section">
                <h3 className="checkout-section-title">Kontaktoplysninger</h3>
                <div className="form-group">
                  <label className="form-label">Navn</label>
            <input
                    type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
                    className="form-input"
                    placeholder="Indtast dit navn"
            />
          </div>
                <div className="form-group">
                  <label className="form-label">
                    <PhoneIcon style={{ marginRight: "0.35rem", verticalAlign: "middle" }} />
                    Telefonnummer
                  </label>
            <input
                    type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
                    className="form-input"
                    placeholder="+45 12 34 56 78"
            />
          </div>
              </section>

              <section className="checkout-section">
                <h3 className="checkout-section-title">Afhentning eller levering</h3>
                <div className="method-selector">
                  <label className={`method-option ${method === "pickup" ? "active" : ""}`}>
                    <input
                      type="radio"
                      name="method"
                      value="pickup"
                      checked={method === "pickup"}
                      onChange={(e) => setMethod(e.target.value)}
                    />
                    <div className="method-content">
                      <span className="method-icon">🚗</span>
                      <div>
                        <div className="method-title">Afhentning</div>
                        <div className="method-desc">Hent din bestilling i butikken</div>
                      </div>
                    </div>
                  </label>
                  <label className={`method-option ${method === "delivery" ? "active" : ""}`}>
                    <input
                      type="radio"
                      name="method"
                      value="delivery"
                      checked={method === "delivery"}
              onChange={(e) => setMethod(e.target.value)}
                    />
                    <div className="method-content">
                      <span className="method-icon">🚴</span>
                      <div>
                        <div className="method-title">Levering</div>
                        <div className="method-desc">Vi bringer det til dig</div>
                      </div>
                    </div>
                  </label>
          </div>

          {method === "delivery" && (
                  <div className="form-group" style={{ marginTop: "1rem" }}>
                    <label className="form-label">Leveringsadresse</label>
              <input
                      type="text"
                required={method === "delivery"}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                      className="form-input"
                      placeholder="Gadenavn og nummer"
              />
            </div>
          )}
              </section>

              <section className="checkout-section">
                <h3 className="checkout-section-title">Bemærkninger (valgfrit)</h3>
                <div className="form-group">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
                    className="form-textarea"
                    placeholder="Har du nogen særlige ønsker eller allergener?"
                    rows={4}
                  />
                </div>
              </section>

              {requiresPayment && (
                <section className="checkout-section">
                  <h3 className="checkout-section-title">💳 Betalingsmetode</h3>
                  <div className="payment-methods">
                    <label className={`payment-method-option ${paymentMethod === "card" ? "active" : ""}`}>
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === "card"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <div className="payment-method-content">
                        <span className="payment-icon">💳</span>
                        <div>
                          <div className="payment-method-title">Kortbetaling</div>
                          <div className="payment-method-desc">Visa, Mastercard, Dankort</div>
                        </div>
                      </div>
                    </label>
                    <label className={`payment-method-option ${paymentMethod === "mobilepay" ? "active" : ""}`}>
                      <input
                        type="radio"
                        name="payment"
                        value="mobilepay"
                        checked={paymentMethod === "mobilepay"}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <div className="payment-method-content">
                        <span className="payment-icon">📱</span>
                        <div>
                          <div className="payment-method-title">MobilePay</div>
                          <div className="payment-method-desc">Betal med MobilePay</div>
                        </div>
                      </div>
                    </label>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="payment-form">
                      <div className="form-group">
                        <label className="form-label">Navn på kort</label>
                        <input
                          type="text"
                          required={paymentMethod === "card"}
                          value={cardName}
                          onChange={(e) => setCardName(e.target.value)}
                          className="form-input"
                          placeholder="Fulde navn"
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">Kortnummer</label>
                        <input
                          type="text"
                          required={paymentMethod === "card"}
                          value={cardNumber}
                          onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                          className="form-input"
                          placeholder="1234 5678 9012 3456"
                          maxLength={19}
                        />
                      </div>
                      <div className="form-row">
                        <div className="form-group" style={{ flex: 1 }}>
                          <label className="form-label">Udløbsdato</label>
                          <input
                            type="text"
                            required={paymentMethod === "card"}
                            value={cardExpiry}
                            onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                            className="form-input"
                            placeholder="MM/ÅÅ"
                            maxLength={5}
                          />
                        </div>
                        <div className="form-group" style={{ flex: 1 }}>
                          <label className="form-label">CVV</label>
                          <input
                            type="text"
                            required={paymentMethod === "card"}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                            className="form-input"
                            placeholder="123"
                            maxLength={3}
            />
          </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "mobilepay" && (
                    <div className="mobilepay-info">
                      <p>Du vil blive omdirigeret til MobilePay for at gennemføre betalingen.</p>
                    </div>
                  )}
                </section>
              )}

              <div className="checkout-actions">
              <button
                type="button"
                onClick={() => navigate("/cart")}
                  className="btn-secondary"
                  disabled={isProcessing}
              >
                  Tilbage
              </button>
              <button
                type="submit"
                  className="btn-primary"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <span className="spinner"></span>
                      Behandler...
                    </>
                  ) : (
                    <>
                      {requiresPayment ? "Betal og placer ordre" : "Placer ordre"}
                      <ArrowRightIcon style={{ marginLeft: "0.5rem", verticalAlign: "middle" }} />
                    </>
                  )}
              </button>
              </div>

              <p className="checkout-note">
                {requiresPayment 
                  ? "🔒 Din betaling er sikker og krypteret. Vi ringer til dig, når din bestilling er klar!"
                  : "💳 Betaling sker ved afhentning. Vi ringer til dig, når din bestilling er klar!"
                }
              </p>
            </form>

            <aside className="checkout-summary">
              <div className="summary-header">
                <h3>Din bestilling</h3>
                <span className="summary-count">{items.length} {items.length === 1 ? "vare" : "varer"}</span>
              </div>
              <div className="summary-items">
                {items.map((item) => (
                  <div key={item.id} className="summary-item">
                    <div className="summary-item-info">
                      <span className="summary-item-name">{item.name}</span>
                      <span className="summary-item-qty">x{item.qty}</span>
                    </div>
                    <span className="summary-item-price">
                      DKK {(item.price * item.qty).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="summary-total">
                <div className="summary-total-row">
                  <span>Subtotal</span>
                  <span>DKK {total.toFixed(2)}</span>
                </div>
                {method === "delivery" && (
                  <div className="summary-total-row">
                    <span>Leveringsgebyr</span>
                    <span>DKK {DELIVERY_FEE.toFixed(2)}</span>
                  </div>
                )}
                <div className="summary-total-row summary-total-final">
                  <span>Total</span>
                  <strong>DKK {finalTotal.toFixed(2)}</strong>
            </div>
          </div>
            </aside>
          </div>
      )}
      </div>
    </main>
  );
}
