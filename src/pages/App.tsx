import "../App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Home from "../components/Home";
import Menu from "../components/Menu";
import CartPage from "./CartPage";
import Checkout from "./Checkout";
import Confirmation from "./Confirmation";
import Admin from "./Admin";
import OmOs from "./OmOs";
import Kontakt from "./Kontakt";
import Privacy from "./PrivacyPolicy";
import { CartProvider } from "../contexts/CartContext";
import ScrollToTop from "../components/ScrollToTop";
// import CookieBanner from "../components/CookieBanner";

export default function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Nav />

          <div className="flex-1 app-bg">
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/bestil" element={<Menu />} />
              <Route path="/om-os" element={<OmOs />} />
              <Route path="/kontakt" element={<Kontakt />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route
                path="/confirmation/:orderId"
                element={<ConfirmationWrapper />}
              />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>

          <Footer />
          {/* <CookieBanner /> */}
        </div>
      </CartProvider>
    </Router>
  );
}

function ConfirmationWrapper() {
  // react-router v6: use params inside component
  const params = window.location.pathname.split("/");
  const orderId = params[params.length - 1];
  return <Confirmation orderId={orderId} />;
}

function NotFound() {
  return (
    <main className="max-w-4xl mx-auto p-6">
      <div className="bg-white p-6 rounded shadow">
        Page not found — <Link to="/">Go home</Link>
      </div>
    </main>
  );
}
