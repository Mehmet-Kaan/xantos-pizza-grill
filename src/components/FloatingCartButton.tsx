import "../styles/floatingCartButton.css";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { CartIcon } from "../utils/Icons";

export default function FloatingCart() {
  const { items } = useCart();
  const count = items.reduce((s, i) => s + i.qty, 0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (count === 0) return;

    setAnimate(true);
    const t = setTimeout(() => setAnimate(false), 500);
    return () => clearTimeout(t);
  }, [count]);

  if (count === 0) return null;

  return (
    <Link
      to="/cart"
      className={`floating-cart ${animate ? "animate" : ""}`}
      aria-label="Go to cart"
    >
      <CartIcon />
      <span className="floating-cart-count">{count}</span>
    </Link>
  );
}
