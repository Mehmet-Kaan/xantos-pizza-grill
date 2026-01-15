import "../styles/menu.css";
import { useCart, type MenuItem } from "../contexts/CartContext";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { IngredientOption, Product } from "../hooks/types";
import { CloseIcon } from "../hooks/icons";
import { CartIcon } from "./Icons";
import {
  getAllProducts,
  getProductsMetadata,
} from "../services/productsService";

// localStorage keys
const PRODUCTS_STORAGE_KEY = "xanthos_products";
const PRODUCTS_LAST_UPDATED_KEY = "xanthos_products_lastUpdated";

// Helper functions for localStorage
function getStoredProducts(): Product[] | null {
  try {
    const stored = localStorage.getItem(PRODUCTS_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error reading products from localStorage:", error);
  }
  return null;
}

function setStoredProducts(products: Product[]): void {
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  } catch (error) {
    console.error("Error saving products to localStorage:", error);
  }
}

function getStoredLastUpdated(): Date | null {
  try {
    const stored = localStorage.getItem(PRODUCTS_LAST_UPDATED_KEY);
    if (stored) {
      return new Date(stored);
    }
  } catch (error) {
    console.error("Error reading lastUpdated from localStorage:", error);
  }
  return null;
}

function setStoredLastUpdated(date: Date): void {
  try {
    localStorage.setItem(PRODUCTS_LAST_UPDATED_KEY, date.toISOString());
  } catch (error) {
    console.error("Error saving lastUpdated to localStorage:", error);
  }
}
export const MENU: Product[] = [
  {
    id: "p-margherita",
    category: "Pizza",
    name: "Margherita",
    desc: "Tomato, mozzarella, basil",
    price: 79,
    image: "margherita.jpg",
    ingredients: [
      { name: "Extra cheese", extraPrice: 10 },
      { name: "Basil", extraPrice: 5 },
      { name: "Garlic", extraPrice: 5 },
    ],
  },
  {
    id: "p-pepperoni",
    category: "Pizza",
    name: "Pepperoni",
    desc: "Spicy pepperoni, mozzarella",
    price: 89,
    image: "pepperoni.jpg",
    ingredients: [
      { name: "Extra cheese", extraPrice: 10 },
      { name: "Chili flakes" },
      { name: "Garlic", extraPrice: 5 },
    ],
  },

  // NEW PIZZAS
  {
    id: "p-hawaiian",
    category: "Pizza",
    name: "Hawaiian",
    desc: "Tomato sauce, mozzarella, ham, pineapple",
    price: 95,
    image: "hawaiian.jpg",
    ingredients: [
      { name: "Extra cheese", extraPrice: 10 },
      { name: "Pineapple", extraPrice: 8 },
      { name: "Ham", extraPrice: 12 },
    ],
  },
  {
    id: "p-veggie",
    category: "Pizza",
    name: "Veggie Deluxe",
    desc: "Mozzarella, peppers, mushrooms, onions, olives",
    price: 92,
    image: "veggie.jpg",
    ingredients: [
      { name: "Extra cheese", extraPrice: 10 },
      { name: "Mushrooms", extraPrice: 6 },
      { name: "Olives", extraPrice: 5 },
    ],
  },
  {
    id: "p-meatlover",
    category: "Pizza",
    name: "Meat Lover",
    desc: "Pepperoni, minced beef, ham, bacon",
    price: 109,
    image: "meatlover.jpg",
    ingredients: [
      { name: "Extra bacon", extraPrice: 12 },
      { name: "Extra cheese", extraPrice: 10 },
      { name: "Chili oil", extraPrice: 5 },
    ],
  },

  // EXISTING GRILL
  {
    id: "g-chicken",
    category: "Grill",
    name: "Grilled Chicken",
    desc: "Herb marinated chicken breast",
    price: 99,
    image: "chicken.jpg",
    ingredients: [
      { name: "Extra sauce", extraPrice: 8 },
      { name: "Side salad", extraPrice: 12 },
    ],
  },
  {
    id: "g-ribs",
    category: "Grill",
    name: "BBQ Ribs",
    desc: "Slow-cooked pork ribs",
    price: 129,
    image: "ribs.jpg",
    ingredients: [
      { name: "Extra BBQ sauce", extraPrice: 8 },
      { name: "Corn on the cob", extraPrice: 10 },
    ],
  },

  // NEW GRILL ITEMS
  {
    id: "g-steak",
    category: "Grill",
    name: "Beef Steak",
    desc: "200g grilled steak with seasoning",
    price: 149,
    image: "steak.jpg",
    ingredients: [
      { name: "Pepper sauce", extraPrice: 10 },
      { name: "Garlic butter", extraPrice: 6 },
    ],
  },
  {
    id: "g-burger",
    category: "Grill",
    name: "Classic Burger",
    desc: "Beef patty, cheddar, lettuce, tomato",
    price: 89,
    image: "burger.jpg",
    ingredients: [
      { name: "Extra cheese", extraPrice: 8 },
      { name: "Bacon", extraPrice: 10 },
      { name: "Jalapeños", extraPrice: 5 },
    ],
  },

  // SIDES
  {
    id: "s-fries",
    category: "Sides",
    name: "Pommes Frites",
    desc: "Crispy golden fries",
    price: 29,
    image: "fries.jpg",
    ingredients: [
      { name: "Dip – Garlic", extraPrice: 5 },
      { name: "Dip – Chili Mayo", extraPrice: 5 },
    ],
  },
  {
    id: "s-salad",
    category: "Sides",
    name: "Side Salad",
    desc: "Fresh greens, cucumber, tomato",
    price: 24,
    image: "salad.jpg",
    ingredients: [
      { name: "Feta", extraPrice: 8 },
      { name: "Olives", extraPrice: 6 },
    ],
  },

  // EXISTING DRINKS
  {
    id: "d-cola",
    category: "Drinks",
    name: "Coca-Cola",
    desc: "330ml",
    price: 19,
    image: "cocacola.jpg",
    ingredients: [],
  },
  {
    id: "d-water",
    category: "Drinks",
    name: "Mineral Water",
    desc: "500ml",
    price: 14,
    image: "water.jpg",
    ingredients: [],
  },

  // NEW DRINKS
  {
    id: "d-fanta",
    category: "Drinks",
    name: "Fanta",
    desc: "330ml",
    price: 19,
    image: "fanta.jpg",
    ingredients: [],
  },
  {
    id: "d-sprite",
    category: "Drinks",
    name: "Sprite",
    desc: "330ml",
    price: 19,
    image: "sprite.jpg",
    ingredients: [],
  },
];

export function MenuCard({ item }: { item: MenuItem }) {
  const { addItem } = useCart();

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold">{item.name}</h4>
          <p className="text-sm text-gray-600">{item.desc}</p>
        </div>
        <div className="text-right">
          <div className="font-bold">{item.price},-</div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              addItem(item);
            }}
            className="mt-2 bg-red-600 text-white px-3 py-1 rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}


interface ModifyModalProps {
  item: Product;
  onClose: () => void;
  onConfirm: (selectedIngredients: IngredientOption[], qty: number) => void;
}

function ModifyModal({ item, onClose, onConfirm }: ModifyModalProps) {
  const [selected, setSelected] = useState<IngredientOption[]>([]);
  const [animate, setAnimate] = useState(false);
  const [qty, setQty] = useState(1);

  const increaseQty = () => setQty((q) => q + 1);
  const decreaseQty = () => setQty((q) => (q > 1 ? q - 1 : 1));

  const toggle = (ing: IngredientOption) => {
    setSelected((prev) =>
      prev.includes(ing) ? prev.filter((i) => i !== ing) : [...prev, ing]
    );
  };

  const handleConfirm = () => {
    setAnimate(true); // Start animation
    setTimeout(() => {
      setAnimate(false);
      onConfirm(selected, qty);
    }, 800); // matches CSS animation duration
  };

  // Calculate extra price for display
  const extraPrice = selected.reduce((acc, i) => acc + (i.extraPrice || 0), 0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <img
            className="modalImage"
            src={`./assets/${item.image}`}
            alt={item.image}
          />
          <h3>Tilpas din {item.name}</h3>
          <p className="modal-desc">Vælg tilvalg:</p>

          <div className="modal-ingredients">
            {item.ingredients?.map((ing) => (
              <label key={ing.name} className="modal-ingredient">
                <input
                  type="checkbox"
                  checked={selected.includes(ing)}
                  onChange={() => toggle(ing)}
                />

                <span className="custom-checkbox" />

                <span className="ingredient-label">
                  {ing.name}
                  {ing.extraPrice ? ` (+${ing.extraPrice} kr)` : ""}
                </span>
              </label>
            ))}
          </div>
        </div>

        <button onClick={onClose} className="modal-cancel">
          <CloseIcon width={20} height={20} />
        </button>

        <div className="modal-buttons">
          <div className="modal-qty">
            <button
              onClick={decreaseQty}
              disabled={qty <= 1}
              aria-label="Decrease quantity"
            >
              −
            </button>

            <span>{qty}</span>

            <button onClick={increaseQty} aria-label="Increase quantity">
              +
            </button>
          </div>
          <div className="modal-add-wrapper">
            <button onClick={handleConfirm} className="modal-confirm">
              Add to order DKK ({(item.price + extraPrice) * qty},-)
            </button>
            {animate && <div className="add-notify">Tilføjet!</div>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Menu() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllergens, setShowAllergens] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Most Popular");
  const [activeItem, setActiveItem] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const popularRef = useRef<HTMLElement | null>(null);
  const categoryTitleRefs = useRef<Record<string, HTMLElement | null>>({});

  const { addItem, items, updateQty, removeItem, clear, total } = useCart();
  const prevItemsCountRef = useRef(items.length);

  // Open cart drawer when item is added (mobile only)
  useEffect(() => {
    const isMobile = window.innerWidth < 720;
    const itemsIncreased = items.length > prevItemsCountRef.current;
    
    if (isMobile && itemsIncreased && items.length > 0 && !cartDrawerOpen) {
      setCartDrawerOpen(true);
    }
    
    prevItemsCountRef.current = items.length;
  }, [items.length, cartDrawerOpen]);

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
  }, []);

  const categories = [
    "Most Popular",
    ...new Set(products.map((m) => m.category)),
  ];

  const openModal = (item: Product) => {
    setActiveItem(item);
  };

  const closeModal = () => {
    setActiveItem(null);
  };

  const confirmAdd = (
    item: Product,
    selectedIngredients: IngredientOption[],
    qty: number
  ) => {
    addItem({ ...item, selectedIngredients, qty });
    setActiveItem(null);
  };

  useEffect(() => {
    // document.body.style.overflow = activeItem ? "hidden" : "auto";
    if (activeItem) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      // document.body.style.overflow = "auto";
      document.body.classList.remove("modal-open");
    };
  }, [activeItem]);

  useEffect(() => {
    // document.body.style.overflow = cartDrawerOpen ? "hidden" : "auto";
    if (cartDrawerOpen) {
      document.body.classList.add("cart-drawer-open");
    } else {
      document.body.classList.remove("cart-drawer-open");
    }
    return () => {
      // document.body.style.overflow = "auto";
      document.body.classList.remove("cart-drawer-open");
    };
  }, [cartDrawerOpen]);

  useEffect(() => {
    if (showAllergens) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [showAllergens]);

  // Scroll listener for sticky category titles background
  useEffect(() => {
    const checkStickyTitles = () => {
      Object.values(categoryTitleRefs.current).forEach((titleElement) => {
        if (!titleElement) return;
        
        const rect = titleElement.getBoundingClientRect();
        // Check if the title is at the top (sticky position) and still visible
        const isSticky = rect.top <= 0 && rect.bottom > 0;
        
        if (isSticky) {
          titleElement.classList.add('is-sticky');
        } else {
          titleElement.classList.remove('is-sticky');
        }
      });
    };

    // Check on mount and when products change
    const timeoutId = setTimeout(() => {
      checkStickyTitles();
    }, 100); // Small delay to ensure refs are set

    // Add scroll listener
    window.addEventListener('scroll', checkStickyTitles, { passive: true });
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('scroll', checkStickyTitles);
    };
  }, [products]);

  const filteredItems = products.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags?.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  // Most popular: top 3 products (you can adjust this logic later based on actual order data)
  const popularIds = new Set(products.slice(0, 3).map((item) => item.id));
  const popularItems = filteredItems.filter((item) => popularIds.has(item.id));

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    const target =
      cat === "Most Popular" ? popularRef.current : sectionRefs.current[cat];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (loading) {
    return (
      <main className="menuPageContainer max-w-6xl">
        <div style={{ textAlign: "center", padding: "4rem" }}>
          <p>Indlæser menuen...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="menuPageContainer max-w-6xl">
        <div style={{ textAlign: "center", padding: "4rem" }}>
          <p style={{ color: "red" }}>{error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="menuPageContainer max-w-6xl">
      {/* <FloatingCartButton /> */}
      <div className="menu-header">
        <div>
          <p className="menu-subtitle">
            Vælg en kategori for at se vores retter.
          </p>
          <h2 className="text-3xl font-bold flex items-center gap-2 mb-0">
            <span role="img" aria-label="bestik" className="menu-header-icon">
              🍽️
            </span>
            Bestil takeaway
          </h2>
        </div>
        <button className="allergen-btn" onClick={() => setShowAllergens(true)}>
          <span className="allergen-btn-text">Allergener</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 2L2 20h20L12 2z" />
            <line x1="12" y1="8" x2="12" y2="13" />
            <circle cx="12" cy="17" r="1" />
          </svg>
        </button>
      </div>
      {showAllergens && (
        <div 
          className="allergen-modal"
          onClick={() => setShowAllergens(false)}
        >
          <div 
            className="max-w-6xl modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="modal-title">Allergener & Kontakt</h3>

            <p className="modal-text">
              Kontakt os hvis du har spørgsmål om allergener, ingredienser eller
              bestilling.
            </p>

            {/* Contact Box */}
            <div className="contact-box">
              <p className="contact-header">Kontakt os direkte</p>

              <a href="tel:YOUR_PHONE_NUMBER" className="contact-btn call">
                📞 Ring: YOUR_PHONE_NUMBER
              </a>

              <a href="sms:YOUR_PHONE_NUMBER" className="contact-btn sms">
                💬 Send SMS
              </a>

              <a
                href="https://wa.me/yourphonenumber"
                className="contact-btn whatsapp"
                target="_blank"
              >
                🟢 WhatsApp
              </a>
            </div>

            {/* Opening Hours */}
            <div className="hours-box">
              <h4 className="hours-title">Åbningstider</h4>
              <p className="hours-text">YOUR_OPENING_HOURS</p>
            </div>

            {/* Allergen Info */}
            <div className="allergen-box">
              <h4 className="allergen-title">Almindelige allergener</h4>
              <ul className="allergen-list">
                <li>🌾 Gluten</li>
                <li>🥛 Laktose</li>
                <li>🥚 Æg</li>
                <li>🥜 Nødder</li>
                <li>🐟 Fisk</li>
                <li>🦐 Skaldyr</li>
                <li>🍤 Rejer</li>
                <li>🍺 Sulfitter</li>
              </ul>
              <p className="modal-note">
                Kontakt os for detaljer om specifikke retter.
              </p>
            </div>

            <div className="modal-close-btn">
              <button
                onClick={() => setShowAllergens(false)}
                aria-label="Close"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="custom-x-icon"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="menu-grid">
        <aside className="menu-sidebar">
          <div className="search-container">
            <input
              type="text"
              placeholder="Søg efter pizza, grill, drikke..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="menu-search"
            />
            <span className="search-icon">🔍</span>
          </div>

          <div className="categoriesContainer">
            {categories.map((cat) => (
              <button
                key={cat}
                className={cat === selectedCategory ? "solid" : "ghost"}
                onClick={() => handleCategoryClick(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </aside>

        <section className="menu-products">
          <div className="menu-filters">
            <div className="search-container">
              <input
                type="text"
                placeholder="Søg efter pizza, grill, drikke..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="menu-search"
              />
              <span className="search-icon">🔍</span>
            </div>

            <div className="categoriesContainer">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={cat === selectedCategory ? "solid" : "ghost"}
                  onClick={() => handleCategoryClick(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          {popularItems.length > 0 && (
            <div
              className="menu-category-block menu-popular-block"
              ref={(el) => {
                popularRef.current = el;
              }}
            >
              <h3 
                className="menu-category-title"
                ref={(el) => {
                  categoryTitleRefs.current['Most Popular'] = el;
                }}
              >
                Most Popular
              </h3>
              <div className="menu-products-grid">
                {popularItems.map((item) => (
                  <div
                    key={item.id}
                    className="menu-item-simple"
                    onClick={() => openModal(item)}
                  >
                    <img 
                      src={`./assets/${item.image}`} 
                      alt={item.name}
                      className="menu-item-simple-img"
                    />
                    <div className="menu-item-simple-content">
                      <div className="menu-item-simple-header">
                        <h4 className="menu-item-simple-name">{item.name}</h4>
                        <span className="menu-item-simple-price">{item.price} kr</span>
                      </div>
                      <p className="menu-item-simple-desc">{item.desc}</p>
                      {item.tags && item.tags.length > 0 && (
                        <div className="menu-item-simple-tags">
                          {item.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="menu-item-simple-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <button
                      className="menu-item-simple-add"
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(item);
                      }}
                    >
                      +
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {Array.from(new Set(products.map((m) => m.category))).map((cat) => {
            const itemsInCategory = filteredItems.filter(
              (item) => item.category === cat
            );
            if (itemsInCategory.length === 0) return null;

            return (
              <div
                key={cat}
                className="menu-category-block"
                ref={(el) => {
                  sectionRefs.current[cat] = el;
                }}
              >
                <h3 
                  className="menu-category-title"
                  ref={(el) => {
                    categoryTitleRefs.current[cat] = el;
                  }}
                >
                  {cat}
                </h3>
                <div className="menu-products-grid">
                  {itemsInCategory.map((item) => (
                    <div
                      key={item.id}
                      className="menu-item-simple"
                      onClick={() => openModal(item)}
                    >
                      <img 
                        src={`./assets/${item.image}`} 
                        alt={item.name}
                        className="menu-item-simple-img"
                      />
                      <div className="menu-item-simple-content">
                        <div className="menu-item-simple-header">
                          <h4 className="menu-item-simple-name">{item.name}</h4>
                          <span className="menu-item-simple-price">{item.price} kr</span>
                        </div>
                        <p className="menu-item-simple-desc">{item.desc}</p>
                        {item.tags && item.tags.length > 0 && (
                          <div className="menu-item-simple-tags">
                            {item.tags.slice(0, 2).map((tag) => (
                              <span key={tag} className="menu-item-simple-tag">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <button
                        className="menu-item-simple-add"
                        onClick={(e) => {
                          e.stopPropagation();
                          openModal(item);
                        }}
                      >
                        +
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {activeItem && (
            <ModifyModal
              item={activeItem}
              onClose={closeModal}
              onConfirm={(ingredients, qty) =>
                confirmAdd(activeItem, ingredients, qty)
              }
            />
          )}

          {filteredItems.length === 0 && (
            <p className="no-results">Ingen resultater fundet 🍕</p>
          )}
        </section>

        {/* Mobile Cart Drawer */}
        <div 
          className={`cart-drawer-overlay ${cartDrawerOpen ? "cart-drawer-open" : ""}`}
          onClick={() => setCartDrawerOpen(false)}
        >
          <div 
            className={`cart-drawer ${cartDrawerOpen ? "cart-drawer-open" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cart-drawer-header">
              <h3>Din kurv</h3>
              <div className="cart-drawer-header-actions">
                {items.length > 0 && (
                  <button 
                    className="cart-drawer-clear"
                    onClick={() => {
                      if (window.confirm("Er du sikker på, at du vil fjerne alle varer fra kurven?")) {
                        clear();
                      }
                    }}
                    aria-label="Fjern alle varer"
                  >
                    Tøm kurv
                  </button>
                )}
                <button 
                  className="cart-drawer-close"
                  onClick={() => setCartDrawerOpen(false)}
                  aria-label="Luk kurv"
                >
                  <CloseIcon width={24} height={24} />
                </button>
              </div>
            </div>

            {items.length === 0 ? (
              <p className="menu-cart-empty">
                Din kurv er tom. Tilføj lækre retter fra menuen.
              </p>
            ) : (
              <>
                <div className="menu-cart-items">
                  {items.map((item) => (
                    <div key={item.id} className="menu-cart-item">
                      <div>
                        <p className="menu-cart-item-name">{item.name}</p>
                        {item.selectedIngredients && item.selectedIngredients.length > 0 && (
                          <p className="menu-cart-item-ingredients">
                            {item.selectedIngredients.map((ing, idx) => (
                              <span key={idx}>
                                {ing.name}
                                {ing.extraPrice ? ` (+${ing.extraPrice} kr)` : ""}
                                {idx < item.selectedIngredients!.length - 1 ? ", " : ""}
                              </span>
                            ))}
                          </p>
                        )}
                        <p className="menu-cart-item-price">
                          DKK {(item.price * item.qty).toFixed(2)}
                        </p>
                      </div>
                      <div className="menu-cart-controls">
                        <button
                          onClick={() =>
                            updateQty(item.id, Math.max(1, item.qty - 1))
                          }
                          aria-label="Fjern en"
                        >
                          −
                        </button>
                        <span>{item.qty}</span>
                        <button
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          aria-label="Tilføj en"
                        >
                          +
                        </button>
                        <button
                          className="menu-cart-remove"
                          onClick={() => removeItem(item.id)}
                        >
                          Fjern
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="menu-cart-total">
                  <span>Total</span>
                  <strong>DKK {total.toFixed(2)}</strong>
                </div>
                <Link 
                  to="/checkout" 
                  className="nav-cta menu-cart-cta"
                  onClick={() => setCartDrawerOpen(false)}
                >
                  Gå til checkout
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile Floating Cart Button */}
        <button 
          className="mobile-cart-button"
          onClick={() => setCartDrawerOpen(true)}
          aria-label="Åbn kurv"
        >
          <CartIcon />
          {items.length > 0 && (
            <span className="mobile-cart-badge">{items.reduce((sum, i) => sum + i.qty, 0)}</span>
          )}
        </button>

        <aside className="menu-cart-panel">
          <div className="menu-cart-header">
            <div>
              <h3>Din kurv</h3>
              <span className="menu-cart-count">{items.length} varer</span>
            </div>
            {items.length > 0 && (
              <button 
                className="menu-cart-clear"
                onClick={() => {
                  if (window.confirm("Er du sikker på, at du vil fjerne alle varer fra kurven?")) {
                    clear();
                  }
                }}
                aria-label="Fjern alle varer"
              >
                Tøm kurv
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <p className="menu-cart-empty">
              Din kurv er tom. Tilføj lækre retter fra menuen.
            </p>
          ) : (
            <>
              <div className="menu-cart-items">
                {items.map((item) => (
                  <div key={item.id} className="menu-cart-item">
                    <div>
                      <p className="menu-cart-item-name">{item.name}</p>
                      {item.selectedIngredients && item.selectedIngredients.length > 0 && (
                        <p className="menu-cart-item-ingredients">
                          {item.selectedIngredients.map((ing, idx) => (
                            <span key={idx}>
                              {ing.name}
                              {ing.extraPrice ? ` (+${ing.extraPrice} kr)` : ""}
                              {idx < item.selectedIngredients!.length - 1 ? ", " : ""}
                            </span>
                          ))}
                        </p>
                      )}
                      <p className="menu-cart-item-price">
                        DKK {(item.price * item.qty).toFixed(2)}
                      </p>
                    </div>
                    <div className="menu-cart-controls">
                      <button
                        onClick={() =>
                          updateQty(item.id, Math.max(1, item.qty - 1))
                        }
                        aria-label="Fjern en"
                      >
                        −
                      </button>
                      <span>{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        aria-label="Tilføj en"
                      >
                        +
                      </button>
                      <button
                        className="menu-cart-remove"
                        onClick={() => removeItem(item.id)}
                      >
                        Fjern
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="menu-cart-total">
                <span>Total</span>
                <strong>DKK {total.toFixed(2)}</strong>
              </div>
              <Link to="/checkout" className="nav-cta menu-cart-cta">
                Gå til checkout
              </Link>
            </>
          )}
        </aside>
      </div>
    </main>
  );
}
