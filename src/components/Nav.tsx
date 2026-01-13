import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { CartIcon, PhoneIcon, ArrowRightIcon } from "./Icons";
import { SunIcon, MoonIcon } from "../hooks/icons"; // Add these to your Icons component
import { useLocation } from "react-router-dom";

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

  const location = useLocation();
  const isHome = location.pathname === "/";

  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    if (!isHome) {
      setShowHeader(true);
      return;
    }

    const onScroll = () => {
      setShowHeader(window.scrollY > 80);
    };

    window.addEventListener("scroll", onScroll);
    onScroll(); // run once on load

    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  return (
    <header
      className={`header ${
        isHome
          ? showHeader
            ? "header--visible"
            : "header--hidden"
          : "header--visible"
      } ${!isHome && "header--not-home"}`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-2xl font-extrabold">
          Xanthos Pizza &amp; Grill
        </Link>

        <button
          className={`nav-toggle ${open ? "nav-toggle-open" : ""}`}
          aria-label="Åbn/luk menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <div className="nav-right flex items-center gap-4">
          <nav className="hidden md:flex gap-4 items-center">
            <Link to="/menu">Menu</Link>
            <Link to="/om-os">Om os</Link>
            <Link to="/kontakt">Kontakt</Link>
            <Link to="/cart" className="relative inline-block">
              <CartIcon style={{ marginRight: "0.35rem" }} />
              Kurv
              <span className="ml-2 bg-white text-red-600 rounded-full px-2 py-0.5 text-xs font-semibold">
                {count}
              </span>
            </Link>
          </nav>

          <a
            href="tel:+4570123456"
            className="hidden md:flex nav-phone items-center"
          >
            <PhoneIcon style={{ marginRight: "0.35rem" }} />
            Tlf. <span>70 12 34 56</span>
          </a>

          <Link to="/bestil" className="hidden md:flex nav-cta items-center">
            Bestil takeaway
            <ArrowRightIcon style={{ marginLeft: "0.4rem" }} />
          </Link>

          {/* Dark/Light Toggle */}
          <button
            className="theme-toggle p-2 rounded-full border border-gray-300 dark:border-gray-600"
            onClick={() => setDarkMode((prev) => !prev)}
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>

      {/* {open && (
        <div className="nav-mobile">
          <nav className="flex flex-col gap-4 p-4">
            <Link to="/menu" onClick={() => setOpen(false)}>
              Menu
            </Link>
            <Link to="/om-os" onClick={() => setOpen(false)}>
              Om os
            </Link>
            <Link to="/kontakt" onClick={() => setOpen(false)}>
              Kontakt
            </Link>
            <Link to="/cart" onClick={() => setOpen(false)}>
              Kurv ({count})
            </Link>
            <a href="tel:+4570123456" onClick={() => setOpen(false)}>
              Tlf. 70 12 34 56
            </a>
            <Link
              to="/bestil"
              className="nav-cta-full"
              onClick={() => setOpen(false)}
            >
              Bestil takeaway
            </Link>
          </nav>
        </div>
      )} */}

      <div className={`nav-mobile ${open ? "nav-mobile--open" : ""}`}>
        <nav className="flex flex-col gap-4 p-4">
          <Link to="/menu" onClick={() => setOpen(false)}>
            Menu
          </Link>
          <Link to="/om-os" onClick={() => setOpen(false)}>
            Om os
          </Link>
          <Link to="/kontakt" onClick={() => setOpen(false)}>
            Kontakt
          </Link>
          <Link to="/cart" onClick={() => setOpen(false)}>
            Kurv ({count})
          </Link>
          <a href="tel:+4570123456" onClick={() => setOpen(false)}>
            Tlf. 70 12 34 56
          </a>
          <Link
            to="/bestil"
            className="nav-cta-full"
            onClick={() => setOpen(false)}
          >
            Bestil takeaway
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Nav;
