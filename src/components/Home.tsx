import "../styles/home.css";
import { Link } from "react-router-dom";
import { MENU, MenuCard } from "./Menu";
import { PizzaIcon, ArrowRightIcon } from "./Icons";
import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import {
  getAllReviews,
  getReviewsMetadata,
  type Review,
} from "../services/reviewsService";
import ScrollReveal from "../utils/ScrollReveal";

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
      error
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
  const todayIndex = new Date().getDate() % SPECIALS.length;
  const special = SPECIALS[todayIndex];
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [averageRating, setAverageRating] = useState(4.6);
  const [totalReviews, setTotalReviews] = useState(500);

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

  function handleContactSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Handle form submission (you can add API call here)
    alert("Tak for din besked! Vi vender tilbage snarest.");
    setContactForm({ name: "", email: "", message: "" });
  }

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
                <span
                  className={isOpenNow() ? "open-dot" : "closed-dot"}
                ></span>
                {isOpenNow() ? "Åben nu" : "Lukket – åbner kl. 11:00"}
              </div>
              <h1 className="hero-title">
                <PizzaIcon />
                Velkommen til Xanthos Pizza & Grill
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
                <Link to="/menu" className="btn-secondary">
                  Se menu
                </Link>
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
        <section className="section about-section">
          <ScrollReveal>
          <div className="section-header">
            <h2 className="section-title">Om os</h2>
            <p className="section-subtitle">Din lokale pizzabar og grill</p>
          </div>
          </ScrollReveal>
          <ScrollReveal>
          <div className="about-content">
            <div className="about-text">
              <p>
                Xanthos Pizza & Grill er en lokal pizzabar og grill med fokus på
                gode råvarer, hurtig service og hyggelig stemning. Vi bager
                vores pizzaer i stenovn og griller kød på åben grill, så du får
                maksimal smag hver gang.
              </p>
              <p>
                Du kan både spise hjemme, hente selv eller få leveret. Bestil
                online, og vi gør din mad klar, mens du er på vej – eller sørger
                for hurtig udbringning i lokalområdet.
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
            {MENU.slice(0, 3).map((item: any) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </section>

        {/* OPENING HOURS & CONTACT INFO */}
        <section className="section info-section">
          <div className="info-grid">
            <div className="info-card hours-card">
              <div className="info-card-header">
                <span className="info-icon">🕒</span>
                <h3>Åbningstider</h3>
              </div>
              <div className="hours-list">
                <div className="hours-item">
                  <span>Mandag – Torsdag</span>
                  <span className="hours-time">11:00 – 21:00</span>
                </div>
                <div className="hours-item">
                  <span>Fredag – Søndag</span>
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

            <div className="info-card contact-card">
              <div className="info-card-header">
                <span className="info-icon">📞</span>
                <h3>Kontakt os</h3>
              </div>
              <div className="contact-info">
                <a href="tel:70123456" className="contact-link">
                  <span className="contact-label">Telefon:</span>
                  <span className="contact-value">70 12 34 56</span>
                </a>
                <a href="mailto:info@pizza-grill.dk" className="contact-link">
                  <span className="contact-label">E-mail:</span>
                  <span className="contact-value">info@pizza-grill.dk</span>
                </a>
                <div className="contact-link">
                  <span className="contact-label">Adresse:</span>
                  <span className="contact-value">Hovedgade 123, 1234 By</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* REVIEWS SECTION */}
        <section className="section reviews-section">
          <div className="section-header">
            <h2 className="section-title">Hvad vores kunder siger</h2>
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
                    <p className="review-author">— {review.author}</p>
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

        {/* CONTACT FORM SECTION */}
        <section className="section contact-section">
          <div className="section-header">
            <h2 className="section-title">Skriv til os</h2>
            <p className="section-subtitle">
              Har du spørgsmål til allergener, levering, større bestillinger
              eller bare lyst til at bestille over telefonen? Du er altid
              velkommen til at kontakte os.
            </p>
          </div>
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <div className="form-group">
              <label htmlFor="name">Navn</label>
              <input
                type="text"
                id="name"
                value={contactForm.name}
                onChange={(e) =>
                  setContactForm({ ...contactForm, name: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                value={contactForm.email}
                onChange={(e) =>
                  setContactForm({ ...contactForm, email: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">Besked</label>
              <textarea
                id="message"
                rows={5}
                value={contactForm.message}
                onChange={(e) =>
                  setContactForm({ ...contactForm, message: e.target.value })
                }
                required
              ></textarea>
            </div>
            <button type="submit" className="btn-primary btn-submit">
              Send besked
            </button>
          </form>
        </section>

        {/* FINAL CTA */}
        <section className="section cta-section">
          <div className="cta-content">
            <h2 className="cta-title">Klar til at bestille?</h2>
            <p className="cta-subtitle">
              Udforsk vores menu og bestil dine favoritter nu
            </p>
            <Link to="/bestil" className="btn-primary btn-large">
              Bestil nu 🍕
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
