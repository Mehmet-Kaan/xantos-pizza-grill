import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { CartIcon, PhoneIcon, ArrowRightIcon } from "./Icons";
import { SunIcon, MoonIcon } from "../hooks/icons";

function Nav() {
  const [open, setOpen] = useState(false);
  const { items } = useCart();
  const count = items.reduce((s: number, i: any) => s + i.qty, 0);

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    const html = document.documentElement;
    if (darkMode) {
      html.setAttribute("data-theme", "dark");
    } else {
      html.setAttribute("data-theme", "light");
    }
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  return (
    <header className="modern-header">
      <div className="modern-header-container">
        <Link to="/" className="modern-header-logo">
          <span className="modern-logo-main">Xanthos</span>
          <span className="modern-logo-sub">Pizza &amp; Grill</span>
        </Link>

        <nav className="modern-header-nav">
          <Link to="/menu" className="modern-nav-link">Menu</Link>
          <Link to="/om-os" className="modern-nav-link">Om os</Link>
          <Link to="/kontakt" className="modern-nav-link">Kontakt</Link>
        </nav>

        <div className="modern-header-actions">
          <a
            href="tel:+4570123456"
            className="modern-header-phone"
          >
            <PhoneIcon />
            <span>70 12 34 56</span>
          </a>

          <Link to="/cart" className="modern-header-cart">
            <CartIcon />
            <span>Kurv</span>
            {count > 0 && (
              <span className="modern-cart-badge">{count}</span>
            )}
          </Link>

          <Link to="/bestil" className="modern-header-cta">
            Bestil
            <ArrowRightIcon />
          </Link>

          <button
            className="modern-theme-toggle"
            onClick={() => setDarkMode((prev) => !prev)}
            aria-label="Skift tema"
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>

          <button
            className={`modern-mobile-toggle ${open ? "open" : ""}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Åbn/luk menu"
            aria-expanded={open}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <div className={`modern-mobile-menu ${open ? "open" : ""}`}>
        <nav className="modern-mobile-nav">
          <Link to="/menu" onClick={() => setOpen(false)}>Menu</Link>
          <Link to="/om-os" onClick={() => setOpen(false)}>Om os</Link>
          <Link to="/kontakt" onClick={() => setOpen(false)}>Kontakt</Link>
          <Link to="/cart" onClick={() => setOpen(false)}>
            Kurv {count > 0 && `(${count})`}
          </Link>
          <a href="tel:+4570123456" onClick={() => setOpen(false)}>
            Ring: 70 12 34 56
          </a>
          <Link to="/bestil" onClick={() => setOpen(false)} className="modern-mobile-cta">
            Bestil takeaway
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Nav;
