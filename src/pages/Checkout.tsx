import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import {
  ArrowRightIcon,
  PhoneIcon,
  CartIcon,
  MailIcon,
  UserIcon,
} from "../components/Icons";
import { createOrder, type Order } from "../services/ordersService";
import "../styles/Checkout.css";

const DELIVERY_FEE = 30;
// 2. Minimum order logic
const MIN_DELIVERY_LIMIT = 100;

const RESTAURANT_COORDS = { lat: 55.01206, lon: 11.902388 };
const MAX_DELIVERY_DISTANCE_KM = 5;

// Haversine formula to calculate distance in KM
function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function Checkout() {
  const { items, total, clear } = useCart();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [isAddressValid, setIsAddressValid] = useState(false);

  const [method, setMethod] = useState("pickup");
  const [note, setNote] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [suggestions, setSuggestions] = useState([]);
  const [distanceError, setDistanceError] = useState("");

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const isUnderDeliveryLimit = total < MIN_DELIVERY_LIMIT;

  // 1. Add state at the top of your component
  const [notification, setNotification] = useState<{
    message: string;
    type: "error" | "success" | "loading";
  } | null>(null);

  // 2. Create a helper to show and auto-hide the notification
  const showNotification = (
    message: string,
    type: "error" | "success" | "loading" = "error",
  ) => {
    setNotification({ message, type });
    // Auto-hide after 4 seconds
    if (type !== "loading") {
      setTimeout(() => setNotification(null), 4000);
    }
  };

  const finalTotal = method === "delivery" ? total + DELIVERY_FEE : total;

  const vatRate = 0.25;
  const vat = Math.round((total * vatRate) / (1 + vatRate));
  const subtotal = total - vat;

  useEffect(() => {
    // document.title = "Checkout - Xantos Pizza";
    if (items.length === 0) {
      navigate("/menu");
    }
  }, []);

  // Handle Cancelled payments from Stripe
  useEffect(() => {
    const status = searchParams.get("status");
    // const orderId = searchParams.get("orderId");

    if (status === "cancelled") {
      showNotification(
        "Betalingen blev ikke gennemført. Du kan prøve igen eller vælge en anden betalingsmetode.",
        "error",
      );

      // Clean up the URL so the message doesn't pop up again on refresh
      navigate("/checkout", { replace: true });
    }
  }, [searchParams]);

  // useEffect(() => {
  //   if (searchParams.get("status") === "cancelled") {
  //     showNotification(
  //       "Betalingen blev annulleret. Dine oplysninger er gemt, så du kan prøve igen.",
  //     );
  //   }
  // }, [searchParams]);

  // Persistence: Save draft to localStorage
  useEffect(() => {
    const formData = {
      name,
      email,
      phone,
      address,
      isAddressValid,
      method,
      note,
    };
    localStorage.setItem("checkout_draft", JSON.stringify(formData));
  }, [name, email, phone, address, isAddressValid, method, note]);

  // Load draft on mount
  useEffect(() => {
    const saved = localStorage.getItem("checkout_draft");
    if (saved) {
      const parsed = JSON.parse(saved);
      setName(parsed.name);
      setEmail(parsed.email);
      setPhone(parsed.phone);
      setAddress(parsed.address);
      setIsAddressValid(parsed.isAddressValid || false);
      setMethod(parsed.method);
      setNote(parsed.note);
    }
  }, []);

  // Handle Address Search
  async function handleAddressChange(input: string) {
    setAddress(input);
    setDistanceError("");
    setIsAddressValid(false); // Reset validity as they type

    if (input.length > 3) {
      const res = await fetch(
        `https://api.dataforsyningen.dk/adresser/autocomplete?q=${encodeURIComponent(input)}`,
      );
      const data = await res.json();
      setSuggestions(data);
    } else {
      setSuggestions([]);
    }
  }

  // Handle Selection
  async function selectAddress(suggestion: any) {
    const fullAddress = suggestion.tekst;
    setAddress(fullAddress);
    setSuggestions([]);

    try {
      const res = await fetch(
        `https://api.dataforsyningen.dk/adresser?q=${encodeURIComponent(fullAddress)}&per_side=1`,
      );
      const data = await res.json();

      if (data && data.length > 0) {
        const addressData = data[0];

        // Use optional chaining (?.) to prevent crashes if a property is missing
        const x = addressData.adgangsadresse?.adgangspunkt?.koordinater?.[0];
        const y = addressData.adgangsadresse?.adgangspunkt?.koordinater?.[1];

        if (x && y) {
          const dist = getDistance(
            RESTAURANT_COORDS.lat,
            RESTAURANT_COORDS.lon,
            y, // latitude
            x, // longitude
          );

          console.log("Calculated Distance:", dist);

          if (dist > MAX_DELIVERY_DISTANCE_KM) {
            setDistanceError(
              `Beklager, vi leverer ikke til denne adresse (${dist.toFixed(1)} km væk). Max 5 km.`,
            );
            setIsAddressValid(false);
            // setMethod("pickup");
          } else if (isUnderDeliveryLimit) {
            setDistanceError(
              `Minimumskøb for levering er ${MIN_DELIVERY_LIMIT} kr.`,
            );
            // setMethod("pickup");
          } else {
            setDistanceError("");
            setIsAddressValid(true);
          }
        } else {
          console.error("Coordinates (x,y) not found in DAWA response");
        }
      }
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  }

  const formatDanishPhone = (value: string) => {
    // 1. Remove everything that isn't a digit
    const digits = value.replace(/\D/g, "");

    // 2. Limit to 8 digits
    const sliced = digits.slice(0, 8);

    // 3. Add a space after every 2 digits using regex
    // This matches groups of 2 digits and adds a space, then trims the trailing space
    return sliced.replace(/(\d{2})(?=\d)/g, "$1 ").trim();
  };

  // Helper to validate and check distance
  async function validateAndCheckDistance(fullAddress: string) {
    try {
      const res = await fetch(
        `https://api.dataforsyningen.dk/adresser?q=${encodeURIComponent(fullAddress)}&per_side=1`,
      );
      const data = await res.json();

      if (data && data.length > 0) {
        const addressData = data[0];
        // Note: check your exact DAWA path, usually it's x and y directly or under koordinater
        const x =
          addressData.adgangsadresse?.adgangspunkt?.koordinater?.[0] ||
          addressData.adgangsadresse?.adgangspunkt?.x;
        const y =
          addressData.adgangsadresse?.adgangspunkt?.koordinater?.[1] ||
          addressData.adgangsadresse?.adgangspunkt?.y;

        if (x && y) {
          const dist = getDistance(
            RESTAURANT_COORDS.lat,
            RESTAURANT_COORDS.lon,
            y,
            x,
          );

          if (dist > MAX_DELIVERY_DISTANCE_KM) {
            setDistanceError(
              `Beklager, vi leverer ikke til denne adresse (${dist.toFixed(1)} km væk). Max 5 km.`,
            );
            setIsAddressValid(false);
            return false;
          } else if (isUnderDeliveryLimit) {
            setDistanceError(
              `Minimumskøb for levering er ${MIN_DELIVERY_LIMIT} kr.`,
            );
            setIsAddressValid(false);
            return false;
          } else {
            setDistanceError("");
            setIsAddressValid(true);
            return true;
          }
        }
      }
      setDistanceError(
        "Vi kunne ikke finde adressen. Vælg venligst fra listen.",
      );
      setIsAddressValid(false);
      return false;
    } catch (error) {
      console.error("Validation error:", error);
      return false;
    }
  }

  async function handlePlaceOrder(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Validate Phone
    const cleanPhone = phone.replace(/\s/g, "");

    if (cleanPhone.length !== 8) {
      showNotification("Telefonnummeret skal være præcis 8 cifre.");
      return;
    }

    const trimmedEmail = email.trim();

    // Validate Email
    if (!emailRegex.test(trimmedEmail)) {
      showNotification(
        "Indtast venligst en gyldig e-mailadresse (f.eks. navn@mail.dk).",
      );
      return;
    }

    // ADDRESS VALIDATION
    if (method === "delivery") {
      let valid = isAddressValid;

      // If not already valid (e.g., they didn't click a suggestion), check now
      if (!valid) {
        setNotification({ message: "Validerer adresse...", type: "loading" });
        valid = await validateAndCheckDistance(address);
        setNotification(null); // Clear the "validating" message
      }

      if (!valid) {
        showNotification("Indtast venligst en gyldig adresse inden for 5 km.");
        return;
      }

      if (isUnderDeliveryLimit) {
        showNotification(
          `Minimumskøb for levering er ${MIN_DELIVERY_LIMIT} kr.`,
        );
        return;
      }
    }

    // 1. Show Loading Notification
    setNotification({
      message: "Vi gør din betaling klar... Vent venligst.",
      type: "loading",
    });

    setIsProcessing(true);

    try {
      // 1. Prepare Order Payload
      const orderPayload = {
        items,
        total: finalTotal,
        name,
        phone,
        address: method === "delivery" ? address : null,
        method: method as "pickup" | "delivery",
        note,
        paymentMethod: paymentMethod as "card" | "mobilepay" | "cash",
        paymentStatus: "pending" as "pending" | "paid",
        status: "pending" as Order["status"],
        createdAt: Date.now(),
      };

      // 2. Create Order in Firestore (Always do this first!)
      const orderId = await createOrder(orderPayload);

      // 3. Conditional Payment Logic
      // if (paymentMethod === "card") {
      //   // Redirect to Stripe
      //   const response = await fetch(import.meta.env.VITE_STRIPE_FUNCTION_URL, {
      //     method: "POST",
      //     headers: { "Content-Type": "application/json" },
      //     body: JSON.stringify({
      //       cartItems: items.map((item) => ({
      //         price: item.stripePriceId, // Ensure your menu items have this!
      //         quantity: item.qty,
      //       })),
      //       orderId: orderId,
      //     }),
      //   });

      //   const session = await response.json();

      //   console.log(session);

      //   if (session.url) {
      //     window.location.href = session.url;
      //     return; // Browser leaves our site here
      //   } else {
      //     throw new Error("Stripe session creation failed");
      //   }
      // }

      // 3. Conditional Payment Logic
      if (paymentMethod === "card") {
        try {
          const response = await fetch(
            import.meta.env.VITE_STRIPE_FUNCTION_URL,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                cartItems: items.map((item) => ({
                  price: item.stripePriceId,
                  quantity: item.qty,
                })),
                orderId: orderId,
                // Pro tip: Send the email to Stripe to pre-fill the checkout page!
                customerEmail: email.trim(),
              }),
            },
          );

          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Kunne ikke oprette betaling");
          }

          const session = await response.json();

          if (session.url) {
            // Clear local storage before leaving so the cart is empty when they return
            clear();
            localStorage.removeItem("checkout_draft");

            window.location.href = session.url;
            return;
          } else {
            throw new Error("Stripe session URL manglede i svaret");
          }
        } catch (err) {
          console.error("Stripe Error:", err);
          showNotification("Der opstod en fejl med betalingen. Prøv igen.");
          setIsProcessing(false);
          return;
        }
      }

      // 4. Fallback for Cash / MobilePay (Manual handling)
      sessionStorage.setItem(
        `order:${orderId}`,
        JSON.stringify({ id: orderId, ...orderPayload }),
      );

      clear();
      localStorage.removeItem("checkout_draft");
      setIsProcessing(false);

      // If it's cash/pickup, show success for a moment then navigate
      setNotification({
        message: "Ordre modtaget! Vi ringer hvis der er noget.",
        type: "success",
      });
      setTimeout(() => {
        navigate("/confirmation/" + orderId);
      }, 2000);
    } catch (error) {
      console.error("Error:", error);
      setIsProcessing(false);
      showNotification("Der opstod en fejl. Prøv venligst igen.");
    }
  }

  return (
    <main className="checkout-page">
      <div className="checkout-container">
        <h2 className="checkout-title">
          <CartIcon
            style={{ marginRight: "0.5rem", verticalAlign: "middle" }}
          />
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
            {/* Order Summary Sidebar */}
            <aside className="checkout-summary">
              <div className="summary-header">
                <h3>Din bestilling</h3>
                <span className="summary-count">
                  {items.length} {items.length === 1 ? "vare" : "varer"}
                </span>
              </div>
              <div className="summary-items">
                {items.map((item) => (
                  <div key={item.id} className="summary-item">
                    <img
                      src={`./assets/${item.image}`}
                      alt={item.name}
                      className="checkout-item-img"
                    />
                    <div className="summary-item-info">
                      <span className="summary-item-name">{item.name}</span>
                      <span className="summary-item-qty">x{item.qty}</span>
                      <ul className="summary-item-ingredients-list">
                        {item.selectedIngredients?.map((ing, idx) => (
                          <li key={idx}>
                            {ing.name}
                            {idx !==
                              (item.selectedIngredients?.length ?? 0) - 1 && (
                              <span className="kommaTecken">,</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <span className="summary-item-price">
                      {(item.price * item.qty).toFixed(2)} DKK
                    </span>
                  </div>
                ))}
              </div>
              <div className="summary-total">
                <div className="summary-total-row">
                  <span>Subtotal</span>
                  <span>{subtotal.toFixed(2)} DKK</span>
                </div>
                <div className="summary-total-row">
                  <span>Moms (25%)</span>
                  <span>{vat.toFixed(2)} DKK</span>
                </div>
                {method === "delivery" && (
                  <div className="summary-total-row">
                    <span>Leveringsgebyr</span>
                    <span>{DELIVERY_FEE.toFixed(2)} DKK</span>
                  </div>
                )}
                <div className="summary-total-row summary-total-final">
                  <span>Total</span>
                  <strong>{finalTotal.toFixed(2)} DKK</strong>
                </div>
              </div>
            </aside>

            {/* Checkout Form */}
            <form onSubmit={handlePlaceOrder} className="checkout-form">
              <section className="checkout-section">
                <h3 className="checkout-section-title">Kontaktoplysninger</h3>
                <div className="form-group">
                  <label className="form-label">
                    <UserIcon
                      style={{
                        marginRight: "0.35rem",
                        verticalAlign: "middle",
                      }}
                    />{" "}
                    Navn
                  </label>
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
                    <MailIcon
                      style={{
                        marginRight: "0.35rem",
                        verticalAlign: "middle",
                      }}
                    />{" "}
                    E-mail
                  </label>
                  <input
                    type="email" // 👈 Tells the browser to validate as email
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-input"
                    placeholder="din@email.dk"
                    onInvalid={(e) =>
                      (e.target as HTMLInputElement).setCustomValidity(
                        "Indtast venligst en gyldig e-mail",
                      )
                    }
                    onInput={(e) =>
                      (e.target as HTMLInputElement).setCustomValidity("")
                    }
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">
                    <PhoneIcon
                      style={{
                        marginRight: "0.35rem",
                        verticalAlign: "middle",
                      }}
                    />{" "}
                    Telefonnummer
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) =>
                      setPhone(formatDanishPhone(e.target.value))
                    }
                    className="form-input"
                    placeholder="8 cifre (fx 12 34 56 78)"
                    autoComplete="tel"
                  />
                </div>
              </section>

              <section className="checkout-section">
                <h3 className="checkout-section-title">
                  Afhentning eller levering
                </h3>
                <div className="method-selector">
                  <label
                    className={`method-option ${method === "pickup" ? "active" : ""}`}
                  >
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
                        <div className="method-desc">Hent selv i butikken</div>
                      </div>
                    </div>
                  </label>
                  <label
                    className={`method-option ${method === "delivery" ? "active" : ""}`}
                  >
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
                        <div className="method-desc">
                          Vi bringer det til dig
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
                {/* {method === "delivery" && (
                  <div className="form-group" style={{ marginTop: "1rem" }}>
                    <label className="form-label">Leveringsadresse</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="form-input"
                      placeholder="Gadenavn og nummer"
                    />
                  </div>
                )} */}
                {method === "delivery" && (
                  <div
                    className="form-group"
                    style={{ marginTop: "1rem", position: "relative" }}
                  >
                    <label className="form-label">Leveringsadresse</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => handleAddressChange(e.target.value)}
                      onBlur={() => {
                        if (address.length > 5 && !isAddressValid) {
                          validateAndCheckDistance(address);
                        }
                      }}
                      className="form-input"
                      placeholder="Søg din adresse..."
                      autoComplete="off"
                    />

                    {/* Autocomplete Suggestions */}
                    {suggestions.length > 0 && (
                      <ul className="address-suggestions">
                        {suggestions.map((s: any, idx) => (
                          <li key={idx} onClick={() => selectAddress(s)}>
                            {s.tekst}
                          </li>
                        ))}
                      </ul>
                    )}

                    {distanceError && (
                      <p
                        className="error-message"
                        style={{
                          color: "#ff4d4d",
                          fontSize: "0.85rem",
                          marginTop: "0.5rem",
                          marginBottom: "0",
                        }}
                      >
                        ⚠️ {distanceError}
                      </p>
                    )}
                  </div>
                )}
              </section>

              <section className="checkout-section">
                <h3 className="checkout-section-title">Betalingsmetode</h3>
                <div className="payment-methods">
                  <label
                    className={`payment-method-option ${paymentMethod === "card" ? "active" : ""}`}
                  >
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
                        <div className="payment-method-title">Kort</div>
                        <div className="payment-method-desc">
                          Visa / Mastercard
                        </div>
                      </div>
                    </div>
                  </label>
                  <label
                    className={`payment-method-option ${paymentMethod === "cash" ? "active" : ""}`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value="cash"
                      checked={paymentMethod === "cash"}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <div className="payment-method-content">
                      <span className="payment-icon">💵</span>
                      <div>
                        <div className="payment-method-title">Kontant</div>
                        <div className="payment-method-desc">
                          Betal ved modtagelse
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
              </section>

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
                      <span className="spinner"></span> Behandler...
                    </>
                  ) : (
                    <>
                      {" "}
                      {paymentMethod === "card"
                        ? "Betal og placer ordre"
                        : "Placer ordre"}{" "}
                      <ArrowRightIcon
                        style={{
                          marginLeft: "0.5rem",
                          verticalAlign: "middle",
                        }}
                      />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
      {notification && (
        <div className={`notification-overlay ${notification.type}`}>
          <div className="notification-content">
            <div className="notification-icon">
              {notification.type === "loading" ? (
                <div className="notification-spinner"></div>
              ) : notification.type === "success" ? (
                "✅"
              ) : (
                "⚠️"
              )}
            </div>
            <p>{notification.message}</p>

            {/* Only show the close button if it's NOT loading */}
            {notification.type !== "loading" && (
              <button
                onClick={() => setNotification(null)}
                className="notification-close"
              >
                Forstået
              </button>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
