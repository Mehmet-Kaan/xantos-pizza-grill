import "../styles/cart.css";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { CartIcon, TrashIcon } from "../utils/Icons";
import { useState } from "react";
import { IMAGE_BASE_URL } from "../services/productsService";

export default function CartPage() {
  const navigate = useNavigate();
  const { items, updateQty, removeItem, clear, total } = useCart();
  const [confirmClear, setConfirmClear] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

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
                  Alle varer fjernes permanent. Denne handling kan ikke
                  fortrydes.
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
                  // 1. The price of the pizza itself based on chosen size
                  // If no size is selected yet, fall back to the default item.price
                  // const basePrice = i.selectedSize
                  //   ? i.selectedSize.extraPrice
                  //   : i.price || 0;

                  // 2. The cost of everything else (Type + Extras)
                  let selectedTypeCost = i.selectedType
                    ? i.selectedType.extraPrice || 0
                    : 0;

                  let chooseOneCost = i.selectedChooseOne
                    ? i.selectedChooseOne.extraPrice || 0
                    : 0;

                  let addOnsCost = i.selectedaddOns
                    ? i.selectedaddOns.reduce(
                        (acc, i) => acc + (i.extraPrice || 0),
                        0,
                      )
                    : 0;

                  let addOnsExtrasCost = i.selectedaddOnsExtra
                    ? i.selectedaddOnsExtra.reduce(
                        (acc, i) => acc + (i.extraPrice || 0),
                        0,
                      )
                    : 0;

                  const extrasTotal =
                    selectedTypeCost +
                    chooseOneCost +
                    addOnsExtrasCost +
                    addOnsCost;

                  const basePrice = i.price - extrasTotal;
                  const itemPrice = i.price;
                  const rowTotal = itemPrice * i.qty;

                  // 3. The final display price
                  // const finalPrice = basePrice || 0 + extrasTotal;

                  return (
                    <div key={i.id} className="cart-item-card">
                      <div className="cart-item-image-wrapper">
                        {(i as any).imageLarge && (
                          <>
                            {!imageLoaded && <div className="image-shimmer" />}

                            <img
                              src={`${IMAGE_BASE_URL}/Large/${(i as any).imageLarge}`}
                              alt={i.name}
                              className={`cart-item-image ${imageLoaded ? "loaded" : "hidden"}`}
                              loading="lazy"
                              onLoad={() => setImageLoaded(true)}
                              onError={(e) => {
                                const img = e.currentTarget;
                                img.onerror = null;
                                img.src = `${IMAGE_BASE_URL}/assets/placeholderIMG.jpeg`;
                                setImageLoaded(true);
                              }}
                            />
                          </>
                          // <img
                          //   src={`${IMAGE_BASE_URL}/Large/${(i as any).imageLarge}`}
                          //   alt={i.name}
                          //   className="cart-item-image"
                          //   loading="lazy"
                          //   onError={(e) => {
                          //     const img = e.currentTarget;
                          //     img.onerror = null;
                          //     img.src = `${IMAGE_BASE_URL}/assets/placeholderIMG.jpeg`;
                          //   }}
                          // />
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
                          <p className="cart-item-description">
                            {(i as any).desc}
                          </p>
                        )}

                        <div className="cart-item-pricing">
                          <div className="cart-item-base-price">
                            <span>Basispris:</span>
                            <span>{basePrice.toFixed(2)} kr</span>
                          </div>
                          {extrasTotal > 0 && (
                            <div className="cart-item-extras-price">
                              <span>Tilvalg:</span>
                              <span>+{extrasTotal.toFixed(2)} kr</span>
                            </div>
                          )}
                          <div className="cart-item-unit-price">
                            <span>Pris pr. stk:</span>
                            <strong>{itemPrice.toFixed(2)} kr</strong>
                          </div>
                        </div>

                        {i.selectedSize && (
                          <div className="cart-item-ingredients">
                            <p className="cart-ingredients-label">Størlek:</p>
                            <div className="cart-ingredients-list">
                              <span className="cart-ingredient-tag">
                                {i.selectedSize.name}
                                {i.selectedSize.extraPrice &&
                                  i.selectedSize.extraPrice > 0 && (
                                    <span className="cart-ingredient-price">
                                      +{i.selectedSize.extraPrice.toFixed(2)} kr
                                    </span>
                                  )}
                              </span>
                            </div>
                          </div>
                        )}
                        {(i.selectedType || i.selectedChooseOne) && (
                          <div className="cart-item-ingredients">
                            <p className="cart-ingredients-label">Tilvalg:</p>
                            <div className="cart-ingredients-list">
                              {i.selectedType && (
                                <span className="cart-ingredient-tag">
                                  {i.selectedType.name}
                                  {i.selectedType.extraPrice &&
                                    i.selectedType.extraPrice > 0 && (
                                      <span className="cart-ingredient-price">
                                        +{i.selectedType.extraPrice.toFixed(2)}{" "}
                                        kr
                                      </span>
                                    )}
                                </span>
                              )}
                              {i.selectedChooseOne && (
                                <span className="cart-ingredient-tag">
                                  {i.selectedChooseOne.name}
                                  {i.selectedChooseOne.extraPrice &&
                                    i.selectedChooseOne.extraPrice > 0 && (
                                      <span className="cart-ingredient-price">
                                        +
                                        {i.selectedChooseOne.extraPrice.toFixed(
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

                        {i.selectedaddOns && i.selectedaddOns.length > 0 && (
                          <div className="cart-item-ingredients">
                            <p className="cart-ingredients-label">Tilvalg:</p>
                            <div className="cart-ingredients-list">
                              {i.selectedaddOns.map((ing: any, idx: number) => (
                                <span key={idx} className="cart-ingredient-tag">
                                  {ing.name}
                                  {ing.extraPrice > 0 && (
                                    <span className="cart-ingredient-price">
                                      +{ing.extraPrice.toFixed(2)} kr
                                    </span>
                                  )}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {i.selectedaddOnsExtra &&
                          i.selectedaddOnsExtra.length > 0 && (
                            <div className="cart-item-ingredients">
                              <p className="cart-ingredients-label">Tilvalg:</p>
                              <div className="cart-ingredients-list">
                                {i.selectedaddOnsExtra.map(
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

                        <div className="cart-item-footer">
                          <div className="cart-item-qty">
                            <button
                              className="cart-qty-btn"
                              onClick={() =>
                                updateQty(i.id, Math.max(1, i.qty - 1))
                              }
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
                            <span className="cart-item-total-label">
                              I alt:
                            </span>
                            <span className="cart-item-total-price">
                              {rowTotal.toFixed(2)} kr
                            </span>
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
                    <span>
                      {itemCount} {itemCount === 1 ? "vare" : "varer"}
                    </span>
                  </div>
                  <div className="cart-summary-row">
                    <span>Subtotal (ekskl. moms)</span>
                    <span>{subtotal.toFixed(2)} kr</span>
                  </div>
                  <div className="cart-summary-row cart-summary-vat">
                    <span>Moms (25%)</span>
                    <span>{vat.toFixed(2)} kr</span>
                  </div>
                  {/* <div className="cart-summary-divider"></div> */}
                  <div className="cart-summary-total">
                    <span>Total inkl. moms</span>
                    <strong>{total.toFixed(2)} kr</strong>
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
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
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
