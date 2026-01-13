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

  return (
    <main className="cart-page max-w-4xl mx-auto p-6">
      <div className="titleBox">
        <h2 className="cart-page-title">
          <CartIcon className="cart-page-icon" />
          Din kurv
        </h2>

        {items.length > 0 && (
          <button
            className={confirmClear ? "cart-clear active" : "cart-clear"}
            disabled={confirmClear}
            onClick={() => setConfirmClear(true)}
            aria-label="Tøm kurv"
          >
            <TrashIcon className="cart-clear-icon" />
          </button>
        )}
      </div>

      {confirmClear && (
        <div className="cart-confirm-box">
          <div className="cart-confirm-text">
            <span className="cart-confirm-title">Tøm kurven?</span>
            <span className="cart-confirm-desc">
              Alle varer fjernes permanent.
            </span>
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
              Ja, tøm
            </button>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <div className="cart-empty">
          Din kurv er tom —{" "}
          <Link to="/menu" className="cart-empty-link">
            browse the menu
          </Link>
        </div>
      ) : (
        <div className="cart-list">
          {items.map((i) => {
            const extrasTotal =
              i.selectedIngredients?.reduce(
                (s: number, ing: any) => s + (ing.extraPrice || 0),
                0
              ) || 0;

            const rawPrice = i.price - extrasTotal;
            const itemPrice = i.price;
            const rowTotal = itemPrice * i.qty;

            return (
              <div key={i.id} className="cart-item">
                <div className="cart-item-main">
                  <img
                    src={`/assets/${i.image}`}
                    alt={i.name}
                    className="cart-item-img"
                  />

                  <div className="cart-item-details">
                    <h4 className="cart-item-title">{i.name}</h4>
                    <div className="cart-unit-price">{rawPrice},- / stk</div>

                    {i.selectedIngredients &&
                      i.selectedIngredients.length > 0 && (
                        <ul className="cart-ingredients">
                          {i.selectedIngredients.map((ing: any) => (
                            <li key={ing.name}>
                              + {ing.name}
                              {ing.extraPrice ? ` (${ing.extraPrice} kr)` : ""}
                            </li>
                          ))}
                        </ul>
                      )}
                  </div>

                  <button
                    className="cart-remove"
                    onClick={() => removeItem(i.id)}
                    aria-label="Remove item"
                  >
                    ✕
                  </button>
                </div>

                <div className="cart-item-controls">
                  <div className="cart-qty">
                    <button onClick={() => updateQty(i.id, i.qty - 1)}>
                      -
                    </button>
                    <span>{i.qty}</span>
                    <button onClick={() => updateQty(i.id, i.qty + 1)}>
                      +
                    </button>
                  </div>

                  <div className="cart-price">{rowTotal},-</div>
                </div>
              </div>
            );
          })}

          <div className="cart-summary">
            <div className="cart-breakdown">
              <div>
                Subtotal <span>{subtotal},-</span>
              </div>
              <div>
                Moms (25%) <span>{vat},-</span>
              </div>
            </div>

            <div className="cart-total">
              <span>Total</span>
              <strong>{total},-</strong>
            </div>

            <div className="cart-actions">
              <button
                onClick={() => navigate("/checkout")}
                className="cart-checkout"
              >
                Gå til betaling
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
