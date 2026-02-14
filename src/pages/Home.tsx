import "../styles/home.css";
import { Link, useLocation } from "react-router-dom";
import { MenuCard } from "./Menu";
import { PizzaIcon, ArrowRightIcon } from "../utils/Icons";
import { useState, useEffect } from "react";
// import type { FormEvent } from "react";
import {
  getAllReviews,
  getReviewsMetadata,
  type Review,
} from "../services/reviewsService";
import {
  getAllProducts,
  getProductsMetadata,
  getMostPopularMetadataAndIds,
} from "../services/productsService";
import {
  getStoredProducts,
  setStoredProducts,
  getStoredLastUpdated,
  setStoredLastUpdated,
  getStoredMostPopularIds,
  setStoredMostPopularIds,
  getStoredMostPopularLastUpdated,
  setStoredMostPopularLastUpdated,
} from "../services/localStorageService";
import ScrollReveal from "../utils/ScrollReveal";
import type { Product } from "../hooks/types";
import FeedbackModal from "../components/FeedbackModal";

// localStorage keys
const REVIEWS_STORAGE_KEY = "xanthos_reviews";
const REVIEWS_LAST_UPDATED_KEY = "xanthos_reviews_lastUpdated";

// Helper functions for localStorage
function getStoredReviews(): Review[] | null {
  try {
    const stored = localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Convert createdAt strings back to Date objects
      return parsed.map((review: any) => ({
        ...review,
        createdAt: review.createdAt ? new Date(review.createdAt) : new Date(),
      }));
    }
  } catch (error) {
    console.error("Error reading reviews from localStorage:", error);
  }
  return null;
}

function setStoredReviews(reviews: Review[]): void {
  try {
    // Convert Date objects to ISO strings for storage
    const serializable = reviews.map((review) => ({
      ...review,
      createdAt:
        review.createdAt instanceof Date
          ? review.createdAt.toISOString()
          : review.createdAt,
    }));
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(serializable));
  } catch (error) {
    console.error("Error saving reviews to localStorage:", error);
  }
}

function getStoredReviewsLastUpdated(): Date | null {
  try {
    const stored = localStorage.getItem(REVIEWS_LAST_UPDATED_KEY);
    if (stored) {
      return new Date(stored);
    }
  } catch (error) {
    console.error(
      "Error reading reviews lastUpdated from localStorage:",
      error,
    );
  }
  return null;
}

function setStoredReviewsLastUpdated(date: Date): void {
  try {
    localStorage.setItem(REVIEWS_LAST_UPDATED_KEY, date.toISOString());
  } catch (error) {
    console.error("Error saving reviews lastUpdated to localStorage:", error);
  }
}

const SPECIALS = [
  {
    id: 1,
    title: "BBQ Ribs Combo",
    description: "Saftiga ribs med vår hemlagade BBQ-sås + liten Cola",
    price: "159,-",
    image: "./assets/pepperoni.jpg",
  },
  {
    id: 2,
    title: "Pepperoni Pizza Deal",
    description: "Stor pepperoni pizza + valgfri dip",
    price: "119,-",
    image: "./assets/pepperoni.jpg",
  },
  {
    id: 3,
    title: "Mixed Grill Plate",
    description: "Kebabspyd, pølser & pommes frites",
    price: "169,-",
    image: "./assets/pepperoni.jpg",
  },
];

export default function Home() {
  const location = useLocation();

  useEffect(() => {
    const scrollToId = (location.state as any)?.scrollTo;

    if (scrollToId) {
      // Wait a bit for the PageTransition to finish mounting
      setTimeout(() => {
        const el = document.getElementById(scrollToId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 200);
    }
  }, [location]);

  const todayIndex = new Date().getDate() % SPECIALS.length;
  const special = SPECIALS[todayIndex];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(4.6);
  const [totalReviews, setTotalReviews] = useState(500);

  const [products, setProducts] = useState<Product[]>([]);
  const [mostPopularProductIds, setMostPopularProductIds] = useState<string[]>(
    [],
  );
  const [mostPopularProducts, setMostPopularProducts] = useState<Product[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load products with caching logic
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        setError(null);

        // First, try to load from localStorage
        const storedProducts = getStoredProducts();
        const storedLastUpdated = getStoredLastUpdated();

        if (storedProducts && storedProducts.length > 0) {
          // Set products from cache immediately for fast UI
          const productsWithId = storedProducts.map((p) => ({
            ...p,
            id: p.id || "",
          })) as Product[];
          setProducts(productsWithId);
          setLoading(false);

          // Check if we need to update from Firebase
          const firebaseLastUpdated = await getProductsMetadata();

          if (firebaseLastUpdated) {
            // Compare timestamps
            const needsUpdate =
              !storedLastUpdated ||
              firebaseLastUpdated.getTime() > storedLastUpdated.getTime();

            if (needsUpdate) {
              // Fetch fresh data from Firebase
              const fetchedProducts = await getAllProducts();
              const freshProductsWithId = fetchedProducts.map((p) => ({
                ...p,
                id: p.id || "",
              })) as Product[];

              // Update state and localStorage
              setProducts(freshProductsWithId);
              setStoredProducts(freshProductsWithId);
              setStoredLastUpdated(firebaseLastUpdated);
            }
          }
        } else {
          // No cached data, fetch from Firebase
          const fetchedProducts = await getAllProducts();
          const productsWithId = fetchedProducts.map((p) => ({
            ...p,
            id: p.id || "",
          })) as Product[];

          setProducts(productsWithId);
          setStoredProducts(productsWithId);

          const firebaseLastUpdated = await getProductsMetadata();
          if (firebaseLastUpdated) {
            setStoredLastUpdated(firebaseLastUpdated);
          }
        }
      } catch (err) {
        console.error("Error loading products:", err);
        setError("Kunne ikke indlæse produkter. Prøv venligst igen.");
        console.log(error);

        // Fallback to cached data if available
        const storedProducts = getStoredProducts();
        if (storedProducts && storedProducts.length > 0) {
          const productsWithId = storedProducts.map((p) => ({
            ...p,
            id: p.id || "",
          })) as Product[];
          setProducts(productsWithId);
        }
      } finally {
        setLoading(false);
      }
    }
    loadProducts();

    // Load most popular product IDs with caching logic
    async function loadMostPopularProductIds() {
      try {
        // First, try to load from localStorage
        const storedIds = getStoredMostPopularIds();
        const storedLastUpdated = getStoredMostPopularLastUpdated();

        if (storedIds && storedIds.length >= 0 && storedLastUpdated) {
          // Set from cache immediately for fast UI
          setMostPopularProductIds(storedIds);

          // Check if we need to update from Firebase (single read to get both timestamp and IDs)
          const { lastUpdated: firebaseLastUpdated, productIds: fetchedIds } =
            await getMostPopularMetadataAndIds();

          if (firebaseLastUpdated) {
            // Compare timestamps
            const needsUpdate =
              !storedLastUpdated ||
              firebaseLastUpdated.getTime() > storedLastUpdated.getTime();

            if (needsUpdate) {
              // Update with fresh data from Firebase (already fetched in same call)
              setMostPopularProductIds(fetchedIds);
              setStoredMostPopularIds(fetchedIds);
              setStoredMostPopularLastUpdated(firebaseLastUpdated);
            }
          }
        } else {
          // No cached data, fetch from Firebase (single read to get both timestamp and IDs)
          const { lastUpdated: firebaseLastUpdated, productIds: fetchedIds } =
            await getMostPopularMetadataAndIds();

          setMostPopularProductIds(fetchedIds);
          setStoredMostPopularIds(fetchedIds);

          if (firebaseLastUpdated) {
            setStoredMostPopularLastUpdated(firebaseLastUpdated);
          }
        }
      } catch (err) {
        console.error("Error loading most popular product IDs:", err);

        // Fallback to cached data if available
        const storedIds = getStoredMostPopularIds();
        if (storedIds) {
          setMostPopularProductIds(storedIds);
        }
      }
    }
    loadMostPopularProductIds();
  }, []);

  // Update most popular products whenever products or IDs change
  useEffect(() => {
    if (products.length === 0 || mostPopularProductIds.length === 0) return;

    const popularItems = products.filter(
      (item) => item.id && mostPopularProductIds.includes(item.id),
    );

    setMostPopularProducts(popularItems);
  }, [products, mostPopularProductIds]);

  function isOpenNow() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();
    const currentTime = currentHour + currentMinutes / 60;

    const openTime = 11;
    const closeTime = 22;

    //     const day = now.getDay();
    // const [open, close] = hours[day];

    return currentTime >= openTime && currentTime < closeTime;
  }

  // function handleContactSubmit(e: FormEvent<HTMLFormElement>) {
  //   e.preventDefault();
  //   // Handle form submission (you can add API call here)
  //   alert("Tak for din besked! Vi vender tilbage snarest.");
  //   setContactForm({ name: "", email: "", message: "" });
  // }

  // Load reviews with caching logic
  useEffect(() => {
    async function loadReviews() {
      try {
        setReviewsLoading(true);

        // First, try to load from localStorage
        const storedReviews = getStoredReviews();
        const storedLastUpdated = getStoredReviewsLastUpdated();

        if (storedReviews && storedReviews.length > 0) {
          // Set reviews from cache immediately for fast UI
          setReviews(storedReviews);

          // Calculate average rating from cached reviews
          const avg =
            storedReviews.reduce((sum, r) => sum + r.rating, 0) /
            storedReviews.length;
          setAverageRating(Math.round(avg * 10) / 10);
          setTotalReviews(storedReviews.length);

          setReviewsLoading(false);

          // Check if we need to update from Firebase
          const firebaseLastUpdated = await getReviewsMetadata();

          if (firebaseLastUpdated) {
            // Compare timestamps
            const needsUpdate =
              !storedLastUpdated ||
              firebaseLastUpdated.getTime() > storedLastUpdated.getTime();

            if (needsUpdate) {
              // Fetch fresh data from Firebase
              const fetchedReviews = await getAllReviews(6);

              // Update state and localStorage
              setReviews(fetchedReviews);
              setStoredReviews(fetchedReviews);
              setStoredReviewsLastUpdated(firebaseLastUpdated);

              // Recalculate average rating
              if (fetchedReviews.length > 0) {
                const avg =
                  fetchedReviews.reduce((sum, r) => sum + r.rating, 0) /
                  fetchedReviews.length;
                setAverageRating(Math.round(avg * 10) / 10);
                setTotalReviews(fetchedReviews.length);
              }
            }
          }
        } else {
          // No cached data, fetch from Firebase
          const fetchedReviews = await getAllReviews(6);

          setReviews(fetchedReviews);
          setStoredReviews(fetchedReviews);

          // Calculate average rating
          if (fetchedReviews.length > 0) {
            const avg =
              fetchedReviews.reduce((sum, r) => sum + r.rating, 0) /
              fetchedReviews.length;
            setAverageRating(Math.round(avg * 10) / 10);
            setTotalReviews(fetchedReviews.length);
          }

          const firebaseLastUpdated = await getReviewsMetadata();
          if (firebaseLastUpdated) {
            setStoredReviewsLastUpdated(firebaseLastUpdated);
          }
        }
      } catch (err) {
        console.error("Error loading reviews:", err);

        // Fallback to cached data if available
        const storedReviews = getStoredReviews();
        if (storedReviews && storedReviews.length > 0) {
          setReviews(storedReviews);
          const avg =
            storedReviews.reduce((sum, r) => sum + r.rating, 0) /
            storedReviews.length;
          setAverageRating(Math.round(avg * 10) / 10);
          setTotalReviews(storedReviews.length);
        }
      } finally {
        setReviewsLoading(false);
      }
    }
    loadReviews();
  }, []);

  // Helper function to render stars
  function renderStars(rating: number) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {"★".repeat(fullStars)}
        {hasHalfStar && "☆"}
        {"☆".repeat(emptyStars)}
      </>
    );
  }

  return (
    <>
      {/* <FloatingCartButton /> */}
      {/* HERO SECTION */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        {/* <ScrollReveal> */}
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className={isOpenNow() ? "open-dot" : "closed-dot"}></span>
              {isOpenNow() ? "Åben nu" : "Lukket – åbner kl. 11:00"}
            </div>
            <h1 className="hero-title">
              <PizzaIcon className="hero-title-pizza-icon" />
              <span>Velkommen til Xanthos Pizza & Grill</span>
            </h1>
            <p className="hero-subtitle">
              Autentiske pizzor och grillfavoriter. Beställ enkelt online och
              hämta eller få hemleverans.
            </p>
            <div className="hero-features">
              <span className="hero-feature">
                <span className="hero-icon">🔥</span>
                Pickup
              </span>
              <span className="hero-feature">
                <span className="hero-icon">🚚</span>
                Levering
              </span>
              <span className="hero-feature">
                <span className="hero-icon">⭐</span>
                4.6/5 (500+ anmeldelser)
              </span>
            </div>
            <div className="hero-cta">
              <Link to="/bestil" className="btn-primary">
                Bestil takeaway
                <ArrowRightIcon />
              </Link>
              {/* <Link to="/menu" className="btn-secondary">
                Se menu
              </Link> */}
            </div>
          </div>
          <ScrollReveal>
            <div className="hero-special">
              <div className="special-card">
                <span className="special-badge">Dagens tilbud</span>
                <div className="special-image">
                  <img src={special.image} alt={special.title} />
                </div>
                <h3 className="special-title">{special.title}</h3>
                <p className="special-desc">{special.description}</p>
                <p className="special-price">{special.price}</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
        {/* </ScrollReveal> */}
      </section>

      <main className="home-main">
        {/* TRUST BAR */}
        <section className="trust-section">
          <div className="trust-grid">
            <ScrollReveal>
              <div className="trust-card">
                <div className="trust-icon">🚚</div>
                <h3>Levering</h3>
                <p>Hurtig & varm</p>
                {/* <p>30–45 min · Op til 5 km</p> */}
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="trust-card">
                <div className="trust-icon">🛍️</div>
                <h3>Afhentning</h3>
                <p>Klar på 15 min</p>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="trust-card">
                <div className="trust-icon">💳</div>
                <h3>Sikker betaling</h3>
                <p>Kort & MobilePay</p>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="trust-card">
                <div className="trust-icon">⭐</div>
                <h3>4.6 stjerner</h3>
                <p>500+ anmeldelser</p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ABOUT US SECTION */}
        <section id="about" className="section about-section">
          <ScrollReveal>
            <div className="section-header">
              <h2 className="section-title darkTitle">Om os</h2>
              <p className="section-subtitle">Din lokale pizzabar og grill</p>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="about-content">
              <div className="about-text">
                <p>
                  Xanthos Pizza & Grill er en lokal pizzabar og grill med fokus
                  på gode råvarer, hurtig service og hyggelig stemning. Vi bager
                  vores pizzaer i stenovn og griller kød på åben grill, så du
                  får maksimal smag hver gang.
                </p>
                <p>
                  Du kan både spise hjemme, hente selv eller få leveret. Bestil
                  online, og vi gør din mad klar, mens du er på vej – eller
                  sørger for hurtig udbringning i lokalområdet.
                </p>
                <p>
                  Har du ønsker til allergener, vegetariske muligheder eller
                  større selskaber, er du altid velkommen til at kontakte os.
                </p>
              </div>
              <div className="about-image">
                <div className="about-image-placeholder">
                  <PizzaIcon />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* POPULAR ITEMS */}
        <section className="section popular-section">
          <div className="section-header">
            <h2 className="section-title">Populære retter</h2>
            <p className="section-subtitle">Kundernas favoriter just nu</p>
          </div>
          <div className="popular-grid">
            {loading ? (
              <div className="popular-loading">Indlæser populære retter...</div>
            ) : error ? (
              <div className="popular-error">{error}</div>
            ) : mostPopularProducts.length === 0 ? (
              <div className="popular-empty">Ingen populære retter fundet.</div>
            ) : (
              mostPopularProducts.slice(0, 3).map((item: any) => (
                <ScrollReveal key={item.id}>
                  <MenuCard item={item} />
                </ScrollReveal>
              ))
            )}
          </div>
        </section>

        <ScrollReveal>
          <section className="section map-section">
            <div className="section-header">
              <h2 className="section-title darkTitle">Find os her</h2>
              <p className="section-subtitle">Algade 16, 4760 Vordingborg</p>
            </div>

            <div className="map-card">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m19!1m8!1m3!1d4575.553424571688!2d11.9024109!3d55.012079!3m2!1i1024!2i768!4f13.1!4m8!3e6!4m0!4m5!1s0x4652c94eed2c57ef%3A0xe462818a9ef3b84f!2sXanthos%2C%20Algade%2016%2C%204760%20Vordingborg%2C%20Danmark!3m2!1d55.012079!2d11.9024109!5e0!3m2!1ssv!2sse!4v1770909234070!5m2!1ssv!2sse"
                className="map-iframe"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />

              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Algade+16+4760+Vordingborg"
                target="_blank"
                rel="noopener noreferrer"
                className="map-button"
              >
                Få rutevejledning →
              </a>
            </div>
          </section>
        </ScrollReveal>

        {/* OPENING HOURS & CONTACT INFO */}
        <section id="contact" className="section info-section">
          <div className="info-grid">
            <ScrollReveal>
              <div className="info-card hours-card">
                <div className="info-card-header">
                  <span className="info-icon">🕒</span>
                  <h3>Åbningstider</h3>
                </div>
                <div className="hours-list">
                  <div className="hours-item">
                    <span className="darkTitle">Mandag – Torsdag</span>
                    <span className="hours-time">11:00 – 21:00</span>
                  </div>
                  <div className="hours-item">
                    <span className="darkTitle">Fredag – Søndag</span>
                    <span className="hours-time">11:00 – 23:00</span>
                  </div>
                </div>
                <div
                  className={`hours-status ${isOpenNow() ? "open" : "closed"}`}
                >
                  <span className="status-dot"></span>
                  {isOpenNow() ? "Åben nu" : "Lukket"}
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal>
              <div className="info-card contact-card">
                <div className="info-card-header">
                  <span className="info-icon">📞</span>
                  <h3>Kontakt os</h3>
                </div>
                <div className="contact-info">
                  <a href="tel:004555376976" className="contact-link">
                    <span className="contact-label">Telefon:</span>
                    <span className="contact-value">55 37 69 76</span>
                  </a>
                  <a href="mailto:info@pizza-grill.dk" className="contact-link">
                    <span className="contact-label">E-mail:</span>
                    <span className="contact-value">info@pizza-grill.dk</span>
                  </a>
                  <div className="contact-link">
                    <span className="contact-label">Adresse:</span>
                    <span className="contact-value">
                      Algade 16, 4760 Vordingborg, Danmark
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* REVIEWS SECTION */}
        <ScrollReveal>
          <section className="section reviews-section">
            <div className="section-header">
              <h2 className="section-title darkTitle">
                Hvad vores kunder siger
              </h2>
              <p className="section-subtitle">
                Anmeldelser fra vores glade kunder
              </p>
            </div>
            {reviewsLoading ? (
              <div className="reviews-loading">Indlæser anmeldelser...</div>
            ) : reviews.length === 0 ? (
              <div className="reviews-empty">
                <p>Ingen anmeldelser endnu. Vær den første til at anmelde!</p>
              </div>
            ) : (
              <>
                <div className="reviews-grid">
                  {reviews.slice(0, 3).map((review) => (
                    <div key={review.id} className="review-card">
                      <div className="review-stars">
                        {renderStars(review.rating)}
                      </div>
                      <p className="review-text">"{review.text}"</p>
                      <p className="review-author darkTitle">
                        — {review.author}
                      </p>
                    </div>
                  ))}
                </div>
                <p className="reviews-average">
                  ⭐ {averageRating.toFixed(1)} gennemsnitlig vurdering fra{" "}
                  {totalReviews} anmeldelse{totalReviews !== 1 ? "r" : ""}
                </p>
              </>
            )}
          </section>
        </ScrollReveal>

        <button
          className="feedback-trigger-btn"
          onClick={() => setIsModalOpen(true)}
        >
          <span>⭐</span> Feed-Back
        </button>

        {isModalOpen && <FeedbackModal onClose={() => setIsModalOpen(false)} />}

        {/* FINAL CTA */}
        <ScrollReveal>
          <section className="section cta-section">
            <div className="cta-content">
              <h2 className="cta-title">Klar til at bestille?</h2>
              <p className="cta-subtitle">
                Udforsk vores menu og bestil dine favoritter nu
              </p>
              <Link to="/bestil" className="btn-primary btn-large darkTitle">
                Bestil nu 🍕
              </Link>
            </div>
          </section>
        </ScrollReveal>
      </main>
    </>
  );
}
