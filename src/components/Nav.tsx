import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import {
  CartIcon,
  PhoneIcon,
  ArrowRightIcon,
  PizzaIcon,
  InfoIcon,
  ContactIcon,
} from "../utils/Icons";
import ToggleThemeButton from "./ToggleThemeButton";

function Nav() {
  const [open, setOpen] = useState(false);
  const { items } = useCart();
  const count = items.reduce((s: number, i: any) => s + i.qty, 0);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const [isAdminPage, setIsAdminPage] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleScroll = (id: string) => {
    if (location.pathname === "/") {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/", { state: { scrollTo: id } });
    }
  };

  useEffect(() => {
    if (location.pathname === "/admin" || location.pathname === "/login") {
      setIsAdminPage(true);
    } else {
      setIsAdminPage(false);
    }
  }, [location.pathname]);

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
    <header className={isAdminPage ? "modern-header hide" : "modern-header"}>
      <div className="modern-header-container">
        <Link to="/" className="modern-header-logo">
          <span className="modern-logo-main">Xanthos</span>
          <span className="modern-logo-sub">Pizza &amp; Grill</span>
        </Link>

        <nav className="modern-header-nav">
          <Link to="/menu" className="modern-nav-link">
            Menu
          </Link>

          <button
            className="modern-nav-link"
            onClick={() => handleScroll("about")}
          >
            Om os
          </button>
          <button
            className="modern-nav-link"
            onClick={() => handleScroll("contact")}
          >
            Kontakt
          </button>
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

          <ToggleThemeButton />

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
          <button
            className="modern-mobile-nav"
            onClick={() => {
              handleScroll("about");
              setOpen(false);
            }}
          >
            <InfoIcon className="mobile-nav-icon" />
            <span>Om os</span>
          </button>
          <button
            className="modern-mobile-nav"
            onClick={() => {
              handleScroll("contact");
              setOpen(false);
            }}
          >
            <ContactIcon className="mobile-nav-icon" />
            <span>Kontakt</span>
          </button>
          <Link to="/cart" onClick={() => setOpen(false)}>
            <CartIcon className="mobile-nav-icon" />
            <span>Kurv {count > 0 && `(${count})`}</span>
          </Link>
          <div className="contact-and-theme-div">
            <a href="tel:+4555376976" onClick={() => setOpen(false)}>
              <PhoneIcon className="mobile-nav-icon" />
              <span>55 37 69 76</span>
            </a>

            <ToggleThemeButton setClass={"mobile-theme-toggle"} />
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
