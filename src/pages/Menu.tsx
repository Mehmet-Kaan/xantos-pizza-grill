import "../styles/menu.css";
import { useCart, type MenuItem } from "../contexts/CartContext";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import type { IngredientOption, Product } from "../hooks/types";
import { CloseIcon } from "../hooks/icons";
import { CartIcon, TrashIcon } from "../components/Icons";
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
  const { addItem, items, removeItem } = useCart();

  return (
    <div key={item.id} className="menu-item-simple homePopularItemsDiv">
      <img
        src={`./assets/${item.image}`}
        alt={item.name}
        className="menu-item-simple-img"
      />
      <div>
        <p className="menu-cart-item-name">{item.name}</p>
        <p className="menu-cart-item-desc">{item.desc}</p>
        <p className="menu-cart-item-price" style={{ fontWeight: "bold" }}>
          DKK {item.price.toFixed(2)}
        </p>
      </div>
      {items.some((i) => i.id === item.id) ? (
        <div className="menu-cart-controls">
          <button
            onClick={(e) => {
              e.stopPropagation();
              removeItem(item.id);
            }}
            className="menu-item-simple-add"
          >
            <TrashIcon className="cart-clear-icon" />
          </button>
        </div>
      ) : (
        <Link to={"/cart"} className="menu-cart-controls">
          <button
            onClick={(e) => {
              e.stopPropagation();
              addItem({ ...item, qty: 1 });
            }}
            className="menu-item-simple-add"
          >
            +
          </button>
        </Link>
      )}
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
  const [isClosing, setIsClosing] = useState(false);
  const [qty, setQty] = useState(1);

  const increaseQty = () => setQty((q) => q + 1);
  const decreaseQty = () => setQty((q) => (q > 1 ? q - 1 : 1));

  const toggle = (ing: IngredientOption) => {
    setSelected((prev) =>
      prev.includes(ing) ? prev.filter((i) => i !== ing) : [...prev, ing],
    );
  };

  const handleConfirm = () => {
    setAnimate(true); // Start animation
    setTimeout(() => {
      setAnimate(false);
      onConfirm(selected, qty);
    }, 600); // matches CSS animation duration
  };

  const handleClose = () => {
    if (isClosing) return; // Prevent multiple close calls
    setIsClosing(true);
    // Wait for animation to complete before actually closing
    setTimeout(() => {
      onClose();
    }, 200); // Match CSS animation duration
  };

  // Calculate extra price for display
  const extraPrice = selected.reduce((acc, i) => acc + (i.extraPrice || 0), 0);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isClosing) {
        handleClose();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isClosing]);

  return (
    <div
      className={`modal-overlay ${isClosing ? "modal-closing" : ""}`}
      onClick={handleClose}
    >
      <div
        className={`modal-box ${isClosing ? "modal-closing" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-image-wrapper">
            <img
              className="modalImage"
              src={`./assets/${item.image}`}
              alt={item.image}
            />
            <div className="modal-price-badge">{item.price} kr</div>
          </div>

          <div className="modal-header-section">
            <h3 className="modal-title-text">Tilpas din {item.name}</h3>
            {item.desc && <p className="modal-item-desc">{item.desc}</p>}
          </div>

          {item.ingredients && item.ingredients.length > 0 && (
            <>
              <div className="modal-section-divider"></div>
              <p className="modal-desc">Vælg tilvalg:</p>
              <div className="modal-ingredients">
                {item.ingredients.map((ing) => (
                  <label key={ing.name} className="modal-ingredient">
                    <input
                      type="checkbox"
                      checked={selected.includes(ing)}
                      onChange={() => toggle(ing)}
                    />
                    <span className="custom-checkbox" />
                    <span className="ingredient-label">
                      <span className="ingredient-name">{ing.name}</span>
                      {ing.extraPrice ? (
                        <span className="ingredient-price">
                          +{ing.extraPrice} kr
                        </span>
                      ) : null}
                    </span>
                  </label>
                ))}
              </div>
            </>
          )}
        </div>

        <button onClick={handleClose} className="modal-cancel">
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
              <span>
                Tilføj til {window.innerWidth < 720 ? "" : "kurv"} •{" "}
                {(item.price + extraPrice) * qty} kr
              </span>
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
  const [mostPopularProductIds, setMostPopularProductIds] = useState<string[]>(
    [],
  );
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
  const popularRef = useRef<HTMLElement | null>(null);
  const categoryTitleRefs = useRef<Record<string, HTMLElement | null>>({});

  const { addItem, items, updateQty, removeItem, clear, total } = useCart();
  const [confirmClear, setConfirmClear] = useState(false);
  const cartItemsRef = useRef<HTMLDivElement | null>(null);

  const prevItemsCountRef = useRef(items.length);

  const [animate, setAnimate] = useState(false);
  const count = items.reduce((s, i) => s + i.qty, 0);

  //Looks for cart to animate it on new item added
  useEffect(() => {
    if (count === 0) return;

    setAnimate(true);
    const t = setTimeout(() => setAnimate(false), 500);
    return () => clearTimeout(t);
  }, [count]);

  // Open cart drawer when item is added (mobile only)
  // useEffect(() => {
  //   const isMobile = window.innerWidth < 720;
  //   const itemsIncreased = items.length > prevItemsCountRef.current;

  //   if (isMobile && itemsIncreased && items.length > 0 && !cartDrawerOpen) {
  //     setCartDrawerOpen(true);
  //   }

  //   prevItemsCountRef.current = items.length;
  // }, [items.length, cartDrawerOpen]);

  // Open cart drawer when item is added (mobile only) and if the cart drawer not already opened once already
  useEffect(() => {
    const isMobile = window.innerWidth < 720;
    const prevCount = prevItemsCountRef.current;
    const itemsIncreased = items.length > prevCount;

    // Check if the cart drawer was already opened once
    const cartDrawerOpenedOnce = sessionStorage.getItem(
      "cart_drawer_opened_once",
    );

    // Open drawer only if items increased, not empty, and drawer hasn't been opened yet
    if (
      isMobile &&
      itemsIncreased &&
      items.length > 0 &&
      !cartDrawerOpenedOnce
    ) {
      sessionStorage.setItem("cart_drawer_opened_once", "true");
      setCartDrawerOpen(true);
    }

    // Update previous items count for next render
    prevItemsCountRef.current = items.length;
  }, [items.length]);

  useEffect(() => {
    if (cartDrawerOpen && cartItemsRef.current) {
      // Wait for DOM to render the new item
      requestAnimationFrame(() => {
        cartItemsRef.current!.scrollTo({
          top: cartItemsRef.current!.scrollHeight,
          behavior: "smooth",
        });
      });
    }
  }, [cartDrawerOpen, items.length]);

  useEffect(() => {
    if (confirmClear && cartItemsRef.current) {
      requestAnimationFrame(() => {
        cartItemsRef.current!.scrollTo({ top: 0, behavior: "smooth" });
      });
    }
  }, [confirmClear]);

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

  const categories =
    mostPopularProductIds.length > 0
      ? ["Most Popular", ...new Set(products.map((m) => m.category))]
      : [...new Set(products.map((m) => m.category))];

  const openModal = (item: Product) => {
    setActiveItem(item);
  };

  const closeModal = () => {
    setActiveItem(null);
  };

  const confirmAdd = (
    item: Product,
    selectedIngredients: IngredientOption[],
    qty: number,
  ) => {
    addItem({ ...item, selectedIngredients, qty });
    setActiveItem(null);
  };

  useEffect(() => {
    // document.body.style.overflow = activeItem ? "hidden" : "auto";
    if (activeItem) {
      document.body.classList.add("modal-open");
      document.querySelector(".menu-grid")?.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
      document.querySelector(".menu-grid")?.classList.remove("modal-open");
    }
    return () => {
      // document.body.style.overflow = "auto";
      document.body.classList.remove("modal-open");
      document.querySelector(".menu-grid")?.classList.remove("modal-open");
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
      document.body.classList.add("modal-open-allergen");
    } else {
      document.body.classList.remove("modal-open-allergen");
    }
    return () => {
      document.body.classList.remove("modal-open-allergen");
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
          titleElement.classList.add("is-sticky");
        } else {
          titleElement.classList.remove("is-sticky");
        }
      });
    };

    // Check on mount and when products change
    const timeoutId = setTimeout(() => {
      checkStickyTitles();
    }, 100); // Small delay to ensure refs are set

    // Add scroll listener
    window.addEventListener("scroll", checkStickyTitles, { passive: true });

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", checkStickyTitles);
    };
  }, [products]);

  // Show categoriesContainer-revealOnScroll when scrolling past menu-filters > categoriesContainer
  useEffect(() => {
    if (loading || products.length === 0) return;

    const checkRevealOnScroll = () => {
      // Find the categoriesContainer inside menu-filters
      const menuFilters = document.querySelector(".menu-filters");
      const triggerEl = menuFilters?.querySelector(
        ".categoriesContainer",
      ) as HTMLElement;
      const revealEl = document.querySelector(
        ".categoriesContainer-revealOnScroll",
      ) as HTMLElement;

      if (!triggerEl || !revealEl) return;

      const triggerRect = triggerEl.getBoundingClientRect();

      // Show when the trigger element has scrolled out of view (above viewport)
      // This means user has scrolled past the menu-filters categoriesContainer
      if (triggerRect.top <= 0) {
        // Scrolled past - show the reveal element
        revealEl.classList.add("is-visible");
      } else {
        // Scrolled back to top - hide the reveal element
        revealEl.classList.remove("is-visible");
      }
    };

    // Add scroll listener
    window.addEventListener("scroll", checkRevealOnScroll, { passive: true });
    window.addEventListener("resize", checkRevealOnScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", checkRevealOnScroll);
      window.removeEventListener("resize", checkRevealOnScroll);
    };
  }, [loading, products.length]);

  const filteredItems = products.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags?.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase()),
      ) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  // Most popular: show selected products
  const popularItems = filteredItems.filter(
    (item) => item.id && mostPopularProductIds.includes(item.id),
  );

  // Track if category change is from user click (to prevent scroll-based updates during click)
  const isUserClickingRef = useRef(false);
  // Track if we've initialized the category on first load
  const hasInitializedCategoryRef = useRef(false);

  const handleCategoryClick = (cat: string) => {
    isUserClickingRef.current = true;
    setSelectedCategory(cat);
    const target =
      cat === "Most Popular" ? popularRef.current : sectionRefs.current[cat];
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    // Reset flag after scroll animation completes
    setTimeout(() => {
      isUserClickingRef.current = false;
    }, 1000);
  };

  // Ensure "Most Popular" is selected when data loads (only on initial load, no scrolling)
  useEffect(() => {
    // Only run once when data is ready and we're at the top of the page
    if (
      hasInitializedCategoryRef.current ||
      loading ||
      products.length === 0 ||
      window.scrollY > 0
    ) {
      return;
    }

    // Check if "Most Popular" should be available
    if (mostPopularProductIds.length > 0 && popularItems.length > 0) {
      // Only set if current category is not "Most Popular"
      if (selectedCategory !== "Most Popular") {
        hasInitializedCategoryRef.current = true;
        setSelectedCategory("Most Popular");
      } else {
        // Already correct, just mark as initialized
        hasInitializedCategoryRef.current = true;
      }
    }
  }, [
    loading,
    products.length,
    mostPopularProductIds.length,
    popularItems.length,
    selectedCategory,
  ]);

  // Auto-scroll the active category button into view in categoriesContainer-revealOnScroll
  useEffect(() => {
    if (loading || products.length === 0 || !selectedCategory) return;

    // Only scroll if the reveal container is visible
    const revealContainer = document.querySelector(
      ".categoriesContainer-revealOnScroll",
    ) as HTMLElement;
    if (!revealContainer || !revealContainer.classList.contains("is-visible")) {
      return;
    }

    // Find the active button by text content
    const buttons = revealContainer.querySelectorAll("button");
    let targetButton: HTMLElement | null = null;
    buttons.forEach((btn) => {
      if (btn.textContent?.trim() === selectedCategory) {
        targetButton = btn;
      }
    });

    if (targetButton && revealContainer) {
      const containerRect = revealContainer.getBoundingClientRect();
      const buttonRect = (targetButton as HTMLElement).getBoundingClientRect();

      // Calculate scroll position to center the button
      const scrollLeft =
        revealContainer.scrollLeft +
        (buttonRect.left - containerRect.left) -
        containerRect.width / 2 +
        buttonRect.width / 2;

      // Smooth scroll to the button
      revealContainer.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }, [selectedCategory, loading, products.length]);

  // Auto-update active category based on scroll position
  useEffect(() => {
    if (loading || products.length === 0) return;

    const updateActiveCategory = () => {
      // Don't update if user just clicked a category or if we haven't initialized yet
      if (isUserClickingRef.current || !hasInitializedCategoryRef.current)
        return;

      const scrollY = window.scrollY || window.pageYOffset;
      const viewportHeight = window.innerHeight;
      const threshold = viewportHeight * 0.3; // Consider section active when 30% into viewport

      let activeCategory: string | null = null;
      let minDistance = Infinity;

      // Check "Most Popular" section
      if (popularRef.current) {
        const rect = popularRef.current.getBoundingClientRect();
        const sectionTop = rect.top + scrollY;
        const distance = Math.abs(scrollY + threshold - sectionTop);

        if (
          rect.top <= threshold &&
          rect.bottom > 0 &&
          distance < minDistance
        ) {
          minDistance = distance;
          activeCategory = "Most Popular";
        }
      }

      // Check all other category sections
      Object.entries(sectionRefs.current).forEach(([cat, element]) => {
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const sectionTop = rect.top + scrollY;
        const distance = Math.abs(scrollY + threshold - sectionTop);

        if (
          rect.top <= threshold &&
          rect.bottom > 0 &&
          distance < minDistance
        ) {
          minDistance = distance;
          activeCategory = cat;
        }
      });

      // Update selected category if we found an active one
      if (activeCategory && activeCategory !== selectedCategory) {
        setSelectedCategory(activeCategory);
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveCategory();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateActiveCategory, { passive: true });

    // Initial check
    updateActiveCategory();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateActiveCategory);
    };
  }, [loading, products.length, selectedCategory]);

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
    <main className="menuPageContainer max-w-7xl">
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
          onClick={() => {
            document
              .querySelector(".allergen-modal")
              ?.classList.add("allergen-close-animation");
            setTimeout(() => setShowAllergens(false), 400);
          }}
        >
          <div
            className="max-w-6xl modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-close-btn">
              <button
                onClick={() => {
                  document
                    .querySelector(".allergen-modal")
                    ?.classList.add("allergen-close-animation");
                  setTimeout(() => setShowAllergens(false), 400);
                }}
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
            <h3 className="modal-title">Allergener & Kontakt</h3>

            <p className="modal-text">
              Kontakt os hvis du har spørgsmål om allergener, ingredienser eller
              bestilling.
            </p>

            {/* Contact Box */}
            <div className="contact-box">
              <p className="contact-header">Kontakt os direkte</p>

              <a href="tel:0723171061" className="contact-btn call">
                📞 Ring: 0 (723) 17 10 61
              </a>

              <a href="sms:0723171061" className="contact-btn sms">
                💬 Send SMS
              </a>

              <a
                href="https://wa.me/0046723171061"
                className="contact-btn whatsapp"
                target="_blank"
              >
                🟢 WhatsApp
              </a>
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

            {/* Opening Hours */}
            <div className="hours-box">
              <h4 className="hours-title">Åbningstider</h4>
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
            </div>
          </div>
        </div>
      )}
      <div className="menu-grid">
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
        <aside className="menu-sidebar">
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

        <div className="categoriesContainer-revealOnScroll">
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

        <section className="menu-products">
          <div className="menu-filters">
            <ScrollReveal>
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
            </ScrollReveal>
            <ScrollReveal>
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
            </ScrollReveal>
          </div>
          <ScrollReveal>
            {mostPopularProductIds.length > 0 && popularItems.length > 0 && (
              <div
                className="menu-category-block menu-popular-block"
                ref={(el) => {
                  popularRef.current = el;
                }}
              >
                <h3
                  className="menu-category-title"
                  ref={(el) => {
                    categoryTitleRefs.current["Most Popular"] = el;
                  }}
                >
                  Most Popular
                </h3>
                <div className="menu-products-grid">
                  {popularItems.map((item) => (
                    <div
                      key={item.id}
                      className="menu-item-simple"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (item.ingredients && item.ingredients.length > 0) {
                          openModal(item);
                        }
                      }}
                    >
                      <img
                        src={`./assets/${item.image}`}
                        alt={item.name}
                        className="menu-item-simple-img"
                      />
                      <div className="menu-item-simple-content">
                        <div className="menu-item-simple-header">
                          <h4 className="menu-item-simple-name">{item.name}</h4>
                          <span className="menu-item-simple-price">
                            {item.price} kr
                          </span>
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
                          if (item.ingredients && item.ingredients.length > 0) {
                            openModal(item);
                          } else {
                            confirmAdd(item, [], 1);
                          }
                        }}
                      >
                        +
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </ScrollReveal>
          {Array.from(new Set(products.map((m) => m.category))).map((cat) => {
            const itemsInCategory = filteredItems.filter(
              (item) => item.category === cat,
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
                      onClick={(e) => {
                        e.stopPropagation();
                        if (item.ingredients && item.ingredients.length > 0) {
                          openModal(item);
                        }
                      }}
                    >
                      <img
                        src={`./assets/${item.image}`}
                        alt={item.name}
                        className="menu-item-simple-img"
                      />
                      <div className="menu-item-simple-content">
                        <div className="menu-item-simple-header">
                          <h4 className="menu-item-simple-name">{item.name}</h4>
                          <span className="menu-item-simple-price">
                            {item.price} kr
                          </span>
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
                          if (item.ingredients && item.ingredients.length > 0) {
                            openModal(item);
                          } else {
                            confirmAdd(item, [], 1);
                          }
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
          className={`cart-drawer-overlay ${
            cartDrawerOpen ? "cart-drawer-open" : ""
          }`}
          onClick={() => setCartDrawerOpen(false)}
        >
          <div
            className={`cart-drawer ${
              cartDrawerOpen ? "cart-drawer-open" : ""
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="cart-drawer-header">
              <h3>Din kurv</h3>
              <div className="cart-drawer-header-actions">
                {items.length > 0 && (
                  <button
                    className={`cart-clear-btn ${confirmClear ? "active" : ""}`}
                    onClick={() => setConfirmClear(true)}
                    aria-label="Tøm kurv"
                  >
                    <TrashIcon className="cart-clear-icon" />
                    <span>Tøm kurv</span>
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
              <div className="cart-empty-state">
                <div className="cart-empty-icon">🛒</div>
                <h2 className="cart-empty-title">Din kurv er tom</h2>
                <p className="cart-empty-text">
                  Tilføj lækre retter fra menuen for at komme i gang
                </p>
              </div>
            ) : (
              <>
                <div className="menu-cart-items" ref={cartItemsRef}>
                  {confirmClear && (
                    <div className="cart-confirm-box mb-0">
                      <div className="cart-confirm-content">
                        <div className="cart-confirm-icon">⚠️</div>
                        <div className="cart-confirm-text">
                          <h3 className="cart-confirm-title">Tøm kurven?</h3>
                          <p className="cart-confirm-desc">
                            Alle varer fjernes permanent. Denne handling kan
                            ikke fortrydes.
                          </p>
                        </div>
                      </div>

                      <div className="cart-confirm-actions">
                        <button
                          className="cart-confirm-cancel"
                          onClick={() => setConfirmClear(false)}
                        >
                          Annuller
                        </button>

                        <button
                          className="cart-confirm-danger"
                          onClick={() => {
                            clear();
                            setConfirmClear(false);
                          }}
                        >
                          Ja, tøm kurv
                        </button>
                      </div>
                    </div>
                  )}
                  {items.map((item) => (
                    <div key={item.id} className="menu-cart-item">
                      <div>
                        <p className="menu-cart-item-name">{item.name}</p>
                        {item.selectedIngredients &&
                          item.selectedIngredients.length > 0 && (
                            <p className="menu-cart-item-ingredients">
                              {item.selectedIngredients.map((ing, idx) => (
                                <span key={idx}>
                                  {ing.name}
                                  {ing.extraPrice
                                    ? ` (+${ing.extraPrice} kr)`
                                    : ""}
                                  {idx < item.selectedIngredients!.length - 1
                                    ? ", "
                                    : ""}
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
                          onClick={() => {
                            if (item.qty == 1) {
                              removeItem(item.id);
                            } else {
                              updateQty(item.id, Math.max(1, item.qty - 1));
                            }
                          }}
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
                          <TrashIcon className="clear-cart-icon" />
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
        {count > 0 && (
          <button
            className={`mobile-cart-button ${animate ? "animate" : ""}`}
            onClick={() => setCartDrawerOpen(true)}
          >
            <CartIcon />
            <span className="mobile-cart-badge">{count}</span>
          </button>
        )}

        <aside className="menu-cart-panel">
          <div className="menu-cart-header">
            <div>
              <h3>Din kurv</h3>
              <span className="menu-cart-count">{items.length} varer</span>
            </div>
            {items.length > 0 && (
              <button
                className={`cart-clear-btn ${confirmClear ? "active" : ""}`}
                onClick={() => setConfirmClear(true)}
                aria-label="Tøm kurv"
              >
                <TrashIcon className="cart-clear-icon" />
                <span>Tøm kurv</span>
              </button>
            )}
          </div>

          {items.length === 0 ? (
            <div className="cart-empty-state">
              <div className="cart-empty-icon">🛒</div>
              <h2 className="cart-empty-title">Din kurv er tom</h2>
              <p className="cart-empty-text">
                Tilføj lækre retter fra menuen for at komme i gang
              </p>
            </div>
          ) : (
            <>
              <div className="menu-cart-items">
                {confirmClear && (
                  <div className="cart-confirm-box mb-0">
                    <div className="cart-confirm-content">
                      <div className="cart-confirm-icon">⚠️</div>
                      <div className="cart-confirm-text">
                        <h3 className="cart-confirm-title">Tøm kurven?</h3>
                        <p className="cart-confirm-desc">
                          Alle varer fjernes permanent. Denne handling kan ikke
                          fortrydes.
                        </p>
                      </div>
                    </div>

                    <div className="cart-confirm-actions">
                      <button
                        className="cart-confirm-cancel"
                        onClick={() => setConfirmClear(false)}
                      >
                        Annuller
                      </button>

                      <button
                        className="cart-confirm-danger"
                        onClick={() => {
                          clear();
                          setConfirmClear(false);
                        }}
                      >
                        Ja, tøm kurv
                      </button>
                    </div>
                  </div>
                )}
                {items.map((item) => (
                  <div key={item.id} className="menu-cart-item">
                    <div>
                      <p className="menu-cart-item-name">{item.name}</p>
                      {item.selectedIngredients &&
                        item.selectedIngredients.length > 0 && (
                          <p className="menu-cart-item-ingredients">
                            {item.selectedIngredients.map((ing, idx) => (
                              <span key={idx}>
                                {ing.name}
                                {ing.extraPrice
                                  ? ` (+${ing.extraPrice} kr)`
                                  : ""}
                                {idx < item.selectedIngredients!.length - 1
                                  ? ", "
                                  : ""}
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
                        onClick={() => {
                          if (item.qty == 1) {
                            removeItem(item.id);
                          } else {
                            updateQty(item.id, Math.max(1, item.qty - 1));
                          }
                        }}
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
                        <TrashIcon className="clear-cart-icon" />
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
