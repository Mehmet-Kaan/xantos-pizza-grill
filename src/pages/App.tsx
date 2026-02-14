import "../App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  useParams,
} from "react-router-dom";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Home from "./Home";
import Menu from "./Menu";
import CartPage from "./CartPage";
import Checkout from "./Checkout";
import Confirmation from "./Confirmation";
import Admin from "./Admin";
import Privacy from "./PrivacyPolicy";
import { CartProvider } from "../contexts/CartContext";
import ScrollToTop from "../utils/ScrollToTop";
import { AnimatePresence } from "framer-motion";
import PageTransition from "../utils/PageTransition";

// import CookieBanner from "../components/CookieBanner";

function AppContent() {
  const location = useLocation();

  // Prevents the browser from trying to restore old scroll positions.
  // useEffect(() => {
  //   if ("scrollRestoration" in window.history) {
  //     window.history.scrollRestoration = "manual";
  //   }
  // }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Nav />

      <div className="flex-1 app-bg">
        <ScrollToTop />
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname + location.hash}>
            <Route
              path="/"
              element={
                <PageTransition>
                  <Home />
                </PageTransition>
              }
            />
            <Route
              path="/menu"
              element={
                <PageTransition>
                  <Menu />
                </PageTransition>
              }
            />
            <Route
              path="/bestil"
              element={
                <PageTransition>
                  <Menu />
                </PageTransition>
              }
            />
            {/* <Route
              path="/om-os"
              element={
                <PageTransition>
                  <OmOs />
                </PageTransition>
              }
            />
            <Route
              path="/kontakt"
              element={
                <PageTransition>
                  <Kontakt />
                </PageTransition>
              }
            /> */}
            <Route
              path="/privacypolicy"
              element={
                <PageTransition>
                  <Privacy />
                </PageTransition>
              }
            />
            <Route
              path="/cart"
              element={
                <PageTransition>
                  <CartPage />
                </PageTransition>
              }
            />
            <Route
              path="/checkout"
              element={
                <PageTransition>
                  <Checkout />
                </PageTransition>
              }
            />
            <Route
              path="/confirmation/:orderId"
              element={
                <PageTransition>
                  <ConfirmationWrapper />
                </PageTransition>
              }
            />
            <Route
              path="/admin"
              element={
                <PageTransition>
                  <Admin />
                </PageTransition>
              }
            />
            <Route
              path="*"
              element={
                <PageTransition>
                  <NotFound />
                </PageTransition>
              }
            />
          </Routes>
        </AnimatePresence>
      </div>

      <Footer />
      {/* <CookieBanner /> */}
    </div>
  );
}

export default function App() {
  return (
    // <Router basename="/xantos-pizza-grill/">
    <Router>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </Router>
  );
}

// function ConfirmationWrapper() {
//   // react-router v6: use params inside component
//   const params = window.location.pathname.split("/");
//   const orderId = params[params.length - 1];
//   return <Confirmation orderId={orderId} />;
// }

function ConfirmationWrapper() {
  const { orderId } = useParams();
  return <Confirmation orderId={orderId!} />;
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
