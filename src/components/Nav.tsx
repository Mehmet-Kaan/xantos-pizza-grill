import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import {
  CartIcon,
  PhoneIcon,
  ArrowRightIcon,
  PizzaIcon,
  InfoIcon,
  ContactIcon,
} from "./Icons";
import { SunIcon, MoonIcon } from "../hooks/icons";

function Nav() {
  const [open, setOpen] = useState(false);
  const { items } = useCart();
  const count = items.reduce((s: number, i: any) => s + i.qty, 0);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

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
    if (open) {
      document.body.classList.add("mobile-menu-open");
    } else {
      document.body.classList.remove("mobile-menu-open");
    }
    return () => {
      document.body.classList.remove("mobile-menu-open");
    };
  }, [open]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!open) return;

      const target = event.target as Node;

      // Don't close if clicking inside the menu or on the toggle button
      if (
        menuRef.current?.contains(target) ||
        toggleRef.current?.contains(target)
      ) {
        return;
      }

      setOpen(false);
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
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
          <Link to="/menu" className="modern-nav-link">
            Menu
          </Link>
          <Link to="/om-os" className="modern-nav-link">
            Om os
          </Link>
          <Link to="/kontakt" className="modern-nav-link">
            Kontakt
          </Link>
        </nav>

        <div className="modern-header-actions">
          <a href="tel:+4555376976" className="modern-header-phone">
            <PhoneIcon />
            <span>55 37 69 76</span>
          </a>

          <Link to="/cart" className="modern-header-cart">
            <CartIcon />
            <span>Kurv</span>
            {count > 0 && <span className="modern-cart-badge">{count}</span>}
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
            ref={toggleRef}
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

      <div ref={menuRef} className={`modern-mobile-menu ${open ? "open" : ""}`}>
        <nav className="modern-mobile-nav">
          <Link to="/menu" onClick={() => setOpen(false)}>
            <PizzaIcon className="mobile-nav-icon" />
            <span>Menu</span>
          </Link>
          <Link to="/om-os" onClick={() => setOpen(false)}>
            <InfoIcon className="mobile-nav-icon" />
            <span>Om os</span>
          </Link>
          <Link to="/kontakt" onClick={() => setOpen(false)}>
            <ContactIcon className="mobile-nav-icon" />
            <span>Kontakt</span>
          </Link>
          <Link to="/cart" onClick={() => setOpen(false)}>
            <CartIcon className="mobile-nav-icon" />
            <span>Kurv {count > 0 && `(${count})`}</span>
          </Link>
          <div className="contact-and-theme-div">
            <a href="tel:+4570123456" onClick={() => setOpen(false)}>
              <PhoneIcon className="mobile-nav-icon" />
              <span>+45 70 12 34 56</span>
            </a>
            <button
              className="mobile-theme-toggle"
              onClick={() => setDarkMode((prev) => !prev)}
              aria-label="Skift tema"
            >
              {darkMode ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>
          <Link
            to="/bestil"
            onClick={() => setOpen(false)}
            className="modern-mobile-cta"
          >
            <span>Bestil takeaway</span>
            <ArrowRightIcon className="mobile-nav-cta-icon" />
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Nav;
