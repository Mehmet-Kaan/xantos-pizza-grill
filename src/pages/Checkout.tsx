import { useEffect, useState, type FormEvent } from "react";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import {
  ArrowRightIcon,
  PhoneIcon,
  CartIcon,
  MailIcon,
  UserIcon,
} from "../utils/Icons";
import { createOrder, type Order } from "../services/ordersService";
import "../styles/Checkout.css";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { IMAGE_BASE_URL } from "../services/productsService";

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
  const location = useLocation();
  const cameFromCart = location.state?.from === "/cart";

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

  const [isHydrated, setIsHydrated] = useState(false);

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

  //   useEffect(() => {
  //   // Only redirect if we've loaded the draft, the cart is truly empty,
  //   // and we aren't currently returning from a payment attempt.
  //   const status = searchParams.get("status");
  //   if (isHydrated && items.length === 0 && !status && !isProcessing) {
  //     navigate("/menu");
  //   }
  // }, [items.length, isHydrated, isProcessing, searchParams]);

  useEffect(() => {
    // document.body.style.overflow = cartDrawerOpen ? "hidden" : "auto";
    if (notification) {
      document.body.classList.add("cart-drawer-open");
    } else {
      document.body.classList.remove("cart-drawer-open");
    }
    return () => {
      // document.body.style.overflow = "auto";
      document.body.classList.remove("cart-drawer-open");
    };
  }, [notification]);

  // Handle BFCache (Back-Forward Cache) scenarios
  useEffect(() => {
    // Define the cleanup logic once
    const cleanupLoadingState = () => {
      if (isProcessing) {
        setIsProcessing(false);
        setNotification(null);
      }
    };

    const handlePageShow = (event: PageTransitionEvent) => {
      // Detects returns from the "Frozen" browser cache
      if (event.persisted && isProcessing) {
        cleanupLoadingState();
        showNotification(
          "Bestillingen blev afbrudt. Du kan prøve igen.",
          "error",
        );
      }
    };

    // 1. Listen for the Back/Forward button clicks
    window.addEventListener("popstate", cleanupLoadingState);

    // 2. Listen for the page being restored (specifically for PWAs/Mac Dock apps)
    window.addEventListener("pageshow", handlePageShow);

    // 3. Clean up listeners when the user eventually leaves the page
    return () => {
      window.removeEventListener("popstate", cleanupLoadingState);
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, [isProcessing]); // Re-syncs whenever the spinner starts or stops

  // Handle Visibility Change (Tab focus/blur)
  useEffect(() => {
    const handleVisibilityChange = () => {
      // If the user comes back to the app and we are still "processing"
      if (document.visibilityState === "visible" && isProcessing) {
        // Small delay to allow potential URL params to be parsed first
        setTimeout(() => {
          const status = new URLSearchParams(window.location.search).get(
            "status",
          );
          if (!status) {
            setIsProcessing(false);
            setNotification(null);
          }
        }, 500);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isProcessing]);

  // Handle Cancelled payments from Stripe
  useEffect(() => {
    const status = searchParams.get("status");
    // const orderId = searchParams.get("orderId");

    if (status === "cancelled") {
      setIsProcessing(false);
      setNotification(null);

      showNotification(
        "Betalingen blev ikke gennemført. Du kan prøve igen eller vælge en anden betalingsmetode.",
        "error",
      );

      // Clean up the URL so the message doesn't pop up again on refresh
      navigate("/checkout", { replace: true });
    }
  }, [searchParams]);

  // Load draft on mount
  useEffect(() => {
    const saved = localStorage.getItem("checkout_draft");
    if (saved) {
      const parsed = JSON.parse(saved);
      setName(parsed.name || "");
      setEmail(parsed.email || "");
      setPhone(parsed.phone || "");
      setAddress(parsed.address || "");
      setIsAddressValid(parsed.isAddressValid || false);
      setMethod(parsed.method || "pickup");
      setNote(parsed.note || "");
    }
    setIsHydrated(true); // 👈 Tell the app we are done loading
  }, []);

  // 3. Update your SAVE effect
  useEffect(() => {
    // 👈 Only save if we have finished the initial load
    if (!isHydrated) return;

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
  }, [name, email, phone, address, isAddressValid, method, note, isHydrated]);

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

  async function updateOrderInFirestore(orderId: string, data: any) {
    const orderRef = doc(db, "orders", orderId);
    // merge: true ensures we don't overwrite internal fields like stripeSessionId
    // if you decide to add them later on the backend
    return await setDoc(orderRef, data, { merge: true });
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

    // OPENING HOURS CHECK (11:00 – 20:30)
    const OPEN_HOUR = 10;
    const OPEN_MINUTE = 0;

    const CLOSE_HOUR = 22;
    const CLOSE_MINUTE = 0;

    const ONLINE_CLOSE_OFFSET_MINUTES = 15;

    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const openMinutes = OPEN_HOUR * 60 + OPEN_MINUTE;
    const closeMinutes = CLOSE_HOUR * 60 + CLOSE_MINUTE;
    const onlineCloseMinutes = closeMinutes - ONLINE_CLOSE_OFFSET_MINUTES;

    const minutesUntilOpen =
      currentMinutes < openMinutes
        ? openMinutes - currentMinutes
        : 24 * 60 - currentMinutes + openMinutes;

    const hours = Math.floor(minutesUntilOpen / 60);
    const minutes = minutesUntilOpen % 60;

    const reopenText =
      hours > 0
        ? `Vi åbner igen om ${hours} timer og ${minutes} minutter.`
        : `Vi åbner igen om ${minutes} minutter.`;

    if (currentMinutes < openMinutes || currentMinutes > onlineCloseMinutes) {
      showNotification(
        `Vi åbner snart igen! \n
    Vi har desværre lukket lige nu, men du kan snart komme tilbage og bestille.

    Velkommen til at bestille i dagens åbningstid: ${String(OPEN_HOUR).padStart(2, "0")}:${String(OPEN_MINUTE).padStart(2, "0")} – ${String(CLOSE_HOUR).padStart(2, "0")}:${String(CLOSE_MINUTE).padStart(2, "0")}` +
          "\n\n" +
          reopenText,
      );

      //       showNotification(
      //         `Vi åbner snart igen! \n
      // Vi har desværre lukket lige nu, men du kan snart komme tilbage og bestille.

      // Onlinebestillinger åbner samtidig med, at restauranten åbner og lukker ca. 15 minutter før vores fastsatte lukketid. \n
      // Dette er for at sikre, at vi altid kan nå at færdiggøre de bestillinger, vi påtager os.

      // Velkommen til at bestille i dagens åbningstid: ${String(OPEN_HOUR).padStart(2, "0")}:${String(OPEN_MINUTE).padStart(2, "0")} – ${String(CLOSE_HOUR).padStart(2, "0")}:${String(CLOSE_MINUTE).padStart(2, "0")}` +
      //           "\n\n" +
      //           reopenText,
      //       );
      return;
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
        items: items.map((item) => {
          let cleanedItem: any = {
            id: item.id,
            name: item.name,
            description: item.description,
            price: item.price,
            qty: item.qty,
          };

          if (item.selectedSize) cleanedItem.selectedSize = item.selectedSize;
          if (item.selectedType) cleanedItem.selectedType = item.selectedType;
          if (item.selectedChooseOne)
            cleanedItem.selectedChooseOne = item.selectedChooseOne;
          if (item.selectedaddOns?.length)
            cleanedItem.selectedaddOns = item.selectedaddOns;
          if (item.selectedaddOnsExtra?.length)
            cleanedItem.selectedaddOnsExtra = item.selectedaddOnsExtra;

          if (item.stripePriceId) {
            cleanedItem.stripePriceId = item.stripePriceId;
          }
          if (item.stipeProductId) {
            cleanedItem.stipeProductId = item.stipeProductId;
          }

          return cleanedItem;
        }),

        total: finalTotal,
        name,
        phone,
        address: method === "delivery" ? address : "",
        method: method as "pickup" | "delivery",
        email: trimmedEmail,
        note,
        paymentMethod: paymentMethod as "card" | "mobilepay" | "cash",
        paymentStatus: "pending" as "pending" | "paid",
        status: "pending" as Order["status"],
        createdAt: Date.now(),
      };

      // --- RETRY LOGIC ENGINE ---
      let currentOrderId = sessionStorage.getItem("pending_order_id");

      if (currentOrderId) {
        // User hit 'back' or 'X' and is trying again. Update the old record.
        await updateOrderInFirestore(currentOrderId, orderPayload);
        console.log("Re-using existing order ID:", currentOrderId);
      } else {
        // First attempt. Create a fresh record.
        currentOrderId = await createOrder(orderPayload);
        sessionStorage.setItem("pending_order_id", currentOrderId);
      }

      // --- PAYMENT FLOW ---
      if (paymentMethod === "card") {
        try {
          const response = await fetch(
            import.meta.env.VITE_STRIPE_FUNCTION_URL,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                cartItems: items.map((item) => ({
                  name: item.name,
                  description: item.description,
                  unitAmount: item.price,
                  quantity: item.qty,
                })),
                orderId: currentOrderId, // Use the ID from our retry logic
                customerEmail: email.trim(),
                customerName: name.trim(),
              }),
            },
          );

          if (!response.ok) throw new Error("Stripe session failed");

          const session = await response.json();
          if (session.url) {
            // We DON'T clear cart here, so it's still there if they hit 'back'
            window.location.href = session.url;
            return;
          }
        } catch (err) {
          console.error("Stripe Error:", err);
          showNotification("Betalingsfejl. Prøv venligst igen.");
          setIsProcessing(false);
          return;
        }
      } else {
        // --- CASH / MOBILEPAY FALLBACK ---
        // 1. Success UI
        setNotification({
          message: "Ordre modtaget! Vi ringer hvis der er noget.",
          type: "success",
        });

        // 2. Cleanup (Order is final, no more retries needed)
        sessionStorage.removeItem("pending_order_id");
        clear();
        localStorage.removeItem("checkout_draft");

        // 3. Navigate
        setTimeout(() => {
          navigate("/confirmation/" + currentOrderId);
        }, 2000);
      }
    } catch (error) {
      console.error("General Error:", error);
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
            <div className="cart-empty-state">
              <div className="cart-empty-icon">🛒</div>
              <h2 className="cart-empty-title">Din kurv er tom</h2>
              <p className="cart-empty-text">
                Tilføj lækre retter fra menuen for at komme i gang
              </p>
              <Link to="/bestil" className="checkout-link">
                Se menuen
              </Link>
            </div>
          </div>
        ) : (
          <div
            className={
              !cameFromCart
                ? "checkout-layout"
                : "checkout-layout noSummaryLayout"
            }
          >
            {/* Order Summary Sidebar */}
            {!cameFromCart && (
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
                        src={`${IMAGE_BASE_URL}/Large/${item.imageLarge}`}
                        alt={item.name}
                        className="checkout-item-img"
                        loading="lazy"
                        onError={(e) => {
                          let target = e.target as HTMLImageElement;
                          target.src = `${IMAGE_BASE_URL}/assets/placeholderIMG.jpeg`;
                          target.onerror = null;
                          // target.style.display = "none";
                        }}
                      />

                      <div className="summary-item-info">
                        <span className="summary-item-name">{item.name}</span>
                        <span className="summary-item-qty">x{item.qty}</span>

                        {item.selectedSize && (
                          <div className="cart-item-ingredients">
                            <p className="cart-ingredients-label">Størlek:</p>
                            <div className="cart-ingredients-list">
                              <span className="cart-ingredient-tag">
                                {item.selectedSize.name}
                                {item.selectedSize.extraPrice &&
                                  item.selectedSize.extraPrice > 0 && (
                                    <span className="cart-ingredient-price">
                                      +{item.selectedSize.extraPrice.toFixed(2)}{" "}
                                      kr
                                    </span>
                                  )}
                              </span>
                            </div>
                          </div>
                        )}
                        {(item.selectedType || item.selectedChooseOne) && (
                          <div className="cart-item-ingredients">
                            <p className="cart-ingredients-label">Tilvalg:</p>
                            <div className="cart-ingredients-list">
                              {item.selectedType && (
                                <span className="cart-ingredient-tag">
                                  {item.selectedType.name}
                                  {item.selectedType.extraPrice &&
                                    item.selectedType.extraPrice > 0 && (
                                      <span className="cart-ingredient-price">
                                        +
                                        {item.selectedType.extraPrice.toFixed(
                                          2,
                                        )}{" "}
                                        kr
                                      </span>
                                    )}
                                </span>
                              )}
                              {item.selectedChooseOne && (
                                <span className="cart-ingredient-tag">
                                  {item.selectedChooseOne.name}
                                  {item.selectedChooseOne.extraPrice &&
                                    item.selectedChooseOne.extraPrice > 0 && (
                                      <span className="cart-ingredient-price">
                                        +
                                        {item.selectedChooseOne.extraPrice.toFixed(
                                          2,
                                        )}{" "}
                                        kr
                                      </span>
                                    )}
                                </span>
                              )}
                            </div>
                          </div>
                        )}

                        {item.selectedaddOns &&
                          item.selectedaddOns.length > 0 && (
                            <div className="cart-item-ingredients">
                              <p className="cart-ingredients-label">Tilvalg:</p>
                              <div className="cart-ingredients-list">
                                {item.selectedaddOns.map(
                                  (ing: any, idx: number) => (
                                    <span
                                      key={idx}
                                      className="cart-ingredient-tag"
                                    >
                                      {ing.name}
                                      {ing.extraPrice > 0 && (
                                        <span className="cart-ingredient-price">
                                          +{ing.extraPrice.toFixed(2)} kr
                                        </span>
                                      )}
                                    </span>
                                  ),
                                )}
                              </div>
                            </div>
                          )}

                        {item.selectedaddOnsExtra &&
                          item.selectedaddOnsExtra.length > 0 && (
                            <div className="cart-item-ingredients">
                              <p className="cart-ingredients-label">Tilvalg:</p>
                              <div className="cart-ingredients-list">
                                {item.selectedaddOnsExtra.map(
                                  (ing: any, idx: number) => (
                                    <span
                                      key={idx}
                                      className="cart-ingredient-tag"
                                    >
                                      {ing.name}
                                      {ing.extraPrice > 0 && (
                                        <span className="cart-ingredient-price">
                                          +{ing.extraPrice.toFixed(2)} kr
                                        </span>
                                      )}
                                    </span>
                                  ),
                                )}
                              </div>
                            </div>
                          )}
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
            )}

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
