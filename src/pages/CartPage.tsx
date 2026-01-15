import "../styles/cart.css";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { CartIcon, TrashIcon } from "../components/Icons";
import { useState } from "react";

export default function CartPage() {
  const navigate = useNavigate();
  const { items, updateQty, removeItem, clear, total } = useCart();
  const [confirmClear, setConfirmClear] = useState(false);

  const vatRate = 0.25;
  const vat = Math.round((total * vatRate) / (1 + vatRate));
  const subtotal = total - vat;
  const itemCount = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <main className="cart-page">
      <div className="cart-page-container">
        <div className="cart-page-header">
          <div className="cart-page-title-section">
            <h1 className="cart-page-title">
              <CartIcon className="cart-page-icon" />
              Din kurv
            </h1>
            {items.length > 0 && (
              <p className="cart-page-subtitle">
                {itemCount} {itemCount === 1 ? "vare" : "varer"}
              </p>
            )}
          </div>

          {items.length > 0 && (
            <button
              className={`cart-clear-btn ${confirmClear ? "active" : ""}`}
              onClick={() => setConfirmClear(true)}
              aria-label="Tøm kurv"
            >
              <TrashIcon className="cart-clear-icon" />
              <span>Tøm kurv</span>
            </button>
          )}
        </div>

        {confirmClear && (
          <div className="cart-confirm-box">
            <div className="cart-confirm-content">
              <div className="cart-confirm-icon">⚠️</div>
              <div className="cart-confirm-text">
                <h3 className="cart-confirm-title">Tøm kurven?</h3>
                <p className="cart-confirm-desc">
                  Alle varer fjernes permanent. Denne handling kan ikke fortrydes.
                </p>
              </div>
            </div>

            <div className="cart-confirm-actions">
              <button
                className="cart-confirm-cancel"
                onClick={() => setConfirmClear(false)}
              >
                Annuller
              </button>

              <button
                className="cart-confirm-danger"
                onClick={() => {
                  clear();
                  setConfirmClear(false);
                }}
              >
                Ja, tøm kurv
              </button>
            </div>
          </div>
        )}

        {items.length === 0 ? (
          <div className="cart-empty-state">
            <div className="cart-empty-icon">🛒</div>
            <h2 className="cart-empty-title">Din kurv er tom</h2>
            <p className="cart-empty-text">
              Tilføj lækre retter fra menuen for at komme i gang
            </p>
            <Link to="/menu" className="cart-empty-cta">
              Se menu
            </Link>
          </div>
        ) : (
          <div className="cart-content">
            <div className="cart-items-section">
              <h2 className="cart-section-title">Varer</h2>
              <div className="cart-items-list">
                {items.map((i) => {
                  const extrasTotal =
                    i.selectedIngredients?.reduce(
                      (s: number, ing: any) => s + (ing.extraPrice || 0),
                      0
                    ) || 0;

                  const basePrice = i.price - extrasTotal;
                  const itemPrice = i.price;
                  const rowTotal = itemPrice * i.qty;
                  const itemVat = Math.round((rowTotal * vatRate) / (1 + vatRate));
                  const itemSubtotal = rowTotal - itemVat;

                  return (
                    <div key={i.id} className="cart-item-card">
                      <div className="cart-item-image-wrapper">
                        {(i as any).image && (
                          <img
                            src={`./assets/${(i as any).image}`}
                            alt={i.name}
                            className="cart-item-image"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = './assets/pizza-placeholder.jpg';
                            }}
                          />
                        )}
                      </div>

                      <div className="cart-item-info">
                        <div className="cart-item-header">
                          <h3 className="cart-item-name">{i.name}</h3>
                          <button
                            className="cart-item-remove"
                            onClick={() => removeItem(i.id)}
                            aria-label="Fjern vare"
                          >
                            <TrashIcon />
                          </button>
                        </div>

                        {(i as any).desc && (
                          <p className="cart-item-description">{(i as any).desc}</p>
                        )}

                        <div className="cart-item-pricing">
                          <div className="cart-item-base-price">
                            <span>Basispris:</span>
                            <span>{basePrice} kr</span>
                          </div>
                          {extrasTotal > 0 && (
                            <div className="cart-item-extras-price">
                              <span>Tilvalg:</span>
                              <span>+{extrasTotal} kr</span>
                            </div>
                          )}
                          <div className="cart-item-unit-price">
                            <span>Pris pr. stk:</span>
                            <strong>{itemPrice} kr</strong>
                          </div>
                        </div>

                        {i.selectedIngredients &&
                          i.selectedIngredients.length > 0 && (
                            <div className="cart-item-ingredients">
                              <p className="cart-ingredients-label">Tilvalg:</p>
                              <div className="cart-ingredients-list">
                                {i.selectedIngredients.map((ing: any, idx: number) => (
                                  <span key={idx} className="cart-ingredient-tag">
                                    {ing.name}
                                    {ing.extraPrice && (
                                      <span className="cart-ingredient-price">
                                        +{ing.extraPrice} kr
                                      </span>
                                    )}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                        <div className="cart-item-footer">
                          <div className="cart-item-qty">
                            <button
                              className="cart-qty-btn"
                              onClick={() => updateQty(i.id, Math.max(1, i.qty - 1))}
                              disabled={i.qty <= 1}
                              aria-label="Reducer antal"
                            >
                              −
                            </button>
                            <span className="cart-qty-value">{i.qty}</span>
                            <button
                              className="cart-qty-btn"
                              onClick={() => updateQty(i.id, i.qty + 1)}
                              aria-label="Øg antal"
                            >
                              +
                            </button>
                          </div>

                          <div className="cart-item-total">
                            <span className="cart-item-total-label">I alt:</span>
                            <span className="cart-item-total-price">{rowTotal} kr</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="cart-summary-section">
              <h2 className="cart-section-title">Ordreoversigt</h2>
              <div className="cart-summary-card">
                <div className="cart-summary-details">
                  <div className="cart-summary-row">
                    <span>Antal varer</span>
                    <span>{itemCount} {itemCount === 1 ? "vare" : "varer"}</span>
                  </div>
                  <div className="cart-summary-row">
                    <span>Subtotal (ekskl. moms)</span>
                    <span>{subtotal} kr</span>
                  </div>
                  <div className="cart-summary-row cart-summary-vat">
                    <span>Moms (25%)</span>
                    <span>{vat} kr</span>
                  </div>
                  <div className="cart-summary-divider"></div>
                  <div className="cart-summary-total">
                    <span>Total inkl. moms</span>
                    <strong>{total} kr</strong>
                  </div>
                </div>

                <div className="cart-summary-actions">
                  <Link to="/menu" className="cart-continue-shopping">
                    Fortsæt shopping
                  </Link>
                  <button
                    onClick={() => navigate("/checkout")}
                    className="cart-checkout-btn"
                  >
                    Gå til betaling
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
