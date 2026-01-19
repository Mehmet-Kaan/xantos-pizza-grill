import { useState, useEffect, useRef } from "react";
import {
  getAllOrders,
  updateOrderStatus,
  subscribeToOrders,
  type Order,
} from "../services/ordersService";
import { initializeProducts } from "../utils/initProducts";
import {
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductsMetadata,
  setMostPopularProductIds,
  getMostPopularMetadataAndIds,
  type Product,
} from "../services/productsService";
import {
  getAllReviews,
  updateReview,
  getReviewsMetadata,
  deleteReview,
  type Review,
} from "../services/reviewsService";
import type { Unsubscribe } from "firebase/firestore";
import "../styles/Admin.css";

// localStorage keys
const PRODUCTS_STORAGE_KEY = "admin_products";
const PRODUCTS_LAST_UPDATED_KEY = "admin_products_lastUpdated";
const REVIEWS_STORAGE_KEY = "admin_reviews";
const REVIEWS_LAST_UPDATED_KEY = "admin_reviews_lastUpdated";
// Reuse same keys as menu for most popular so both stay in sync
const MOST_POPULAR_IDS_KEY = "xanthos_mostPopularProductIds";
const MOST_POPULAR_LAST_UPDATED_KEY = "xanthos_mostPopular_lastUpdated";

// Products localStorage helpers
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

function getStoredProductsLastUpdated(): Date | null {
  try {
    const stored = localStorage.getItem(PRODUCTS_LAST_UPDATED_KEY);
    if (stored) {
      return new Date(stored);
    }
  } catch (error) {
    console.error(
      "Error reading products lastUpdated from localStorage:",
      error,
    );
  }
  return null;
}

function setStoredProductsLastUpdated(date: Date): void {
  try {
    localStorage.setItem(PRODUCTS_LAST_UPDATED_KEY, date.toISOString());
  } catch (error) {
    console.error("Error saving products lastUpdated to localStorage:", error);
  }
}

// Most popular products localStorage helpers (shared with Menu)
function getStoredMostPopularIdsAdmin(): string[] | null {
  try {
    const stored = localStorage.getItem(MOST_POPULAR_IDS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? (parsed as string[]) : null;
    }
  } catch (error) {
    console.error("Error reading most popular product IDs from localStorage:", error);
  }
  return null;
}

function setStoredMostPopularIdsAdmin(ids: string[]): void {
  try {
    localStorage.setItem(MOST_POPULAR_IDS_KEY, JSON.stringify(ids));
  } catch (error) {
    console.error("Error saving most popular product IDs to localStorage:", error);
  }
}

function getStoredMostPopularLastUpdatedAdmin(): Date | null {
  try {
    const stored = localStorage.getItem(MOST_POPULAR_LAST_UPDATED_KEY);
    if (stored) {
      return new Date(stored);
    }
  } catch (error) {
    console.error(
      "Error reading most popular lastUpdated from localStorage:",
      error,
    );
  }
  return null;
}

function setStoredMostPopularLastUpdatedAdmin(date: Date): void {
  try {
    localStorage.setItem(MOST_POPULAR_LAST_UPDATED_KEY, date.toISOString());
  } catch (error) {
    console.error(
      "Error saving most popular lastUpdated to localStorage:",
      error,
    );
  }
}

// Reviews localStorage helpers
function getStoredReviews(): Review[] | null {
  try {
    const stored = localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Convert createdAt strings back to Date objects
      return parsed.map((review: any) => ({
        ...review,
        createdAt: new Date(review.createdAt),
      }));
    }
  } catch (error) {
    console.error("Error reading reviews from localStorage:", error);
  }
  return null;
}

function setStoredReviews(reviews: Review[]): void {
  try {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
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

type Tab = "orders" | "products" | "reviews";

// Function to play notification sound
function playNotificationSound() {
  try {
    // Create a simple notification sound using Web Audio API
    const audioContext = new (
      window.AudioContext || (window as any).webkitAudioContext
    )();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Pleasant notification tone (two-tone chime)
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.3,
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch (error) {
    console.error("Error playing notification sound:", error);
  }
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState<Tab>("orders");

  // Orders state
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [ordersError, setOrdersError] = useState<string | null>(null);
  const seenOrderIdsRef = useRef<Set<string>>(new Set());
  const unsubscribeRef = useRef<Unsubscribe | null>(null);
  const isInitialLoadRef = useRef<boolean>(true);

  // All today's orders state (for subsection)
  const [allTodaysOrders, setAllTodaysOrders] = useState<Order[]>([]);
  const [allTodaysOrdersLoading, setAllTodaysOrdersLoading] = useState(false);
  const [showAllTodaysOrders, setShowAllTodaysOrders] = useState(false);

  // Products state
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);
  const [productSearchQuery, setProductSearchQuery] = useState<string>("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [initializing, setInitializing] = useState(false);
  const [initSuccess, setInitSuccess] = useState(false);
  const [mostPopularProductIds, setMostPopularProductIdsState] = useState<
    string[]
  >([]);
  const [savingPopularProducts, setSavingPopularProducts] = useState(false);

  // Reviews state
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(true);
  const [reviewsError, setReviewsError] = useState<string | null>(null);

  // LocalStorage functions for all today's orders
  const getStoredTodaysOrders = (): Order[] | null => {
    try {
      const stored = localStorage.getItem("admin_todays_orders");
      if (!stored) return null;
      const data = JSON.parse(stored);
      // Check if data is from today
      const storedDate = new Date(data.date);
      const today = new Date();
      if (
        storedDate.getDate() !== today.getDate() ||
        storedDate.getMonth() !== today.getMonth() ||
        storedDate.getFullYear() !== today.getFullYear()
      ) {
        return null; // Data is from a different day
      }
      return data.orders;
    } catch (error) {
      console.error("Error reading today's orders from localStorage:", error);
      return null;
    }
  };

  const setStoredTodaysOrders = (orders: Order[]) => {
    try {
      localStorage.setItem(
        "admin_todays_orders",
        JSON.stringify({
          date: new Date().toISOString(),
          orders: orders,
        }),
      );
    } catch (error) {
      console.error("Error saving today's orders to localStorage:", error);
    }
  };

  const updateStoredTodaysOrderStatus = (
    orderId: string,
    newStatus: Order["status"],
  ) => {
    try {
      const stored = getStoredTodaysOrders();
      if (stored) {
        const updated = stored.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order,
        );
        setStoredTodaysOrders(updated);
        // Always update the state if the subsection is visible
        if (showAllTodaysOrders) {
          setAllTodaysOrders(updated);
        }
      }
    } catch (error) {
      console.error("Error updating stored order status:", error);
    }
  };

  async function loadOrders(resetSeenOrders = false) {
    try {
      setOrdersLoading(true);
      setOrdersError(null);
      // Only fetch today's orders that are not "ready" (klar)
      const fetchedOrders = await getAllOrders(true, true);
      setOrders(fetchedOrders);

      // Reset seen orders if manual refresh
      if (resetSeenOrders) {
        seenOrderIdsRef.current.clear();
      }

      // Initialize seen orders
      fetchedOrders.forEach((o) => {
        if (o.id) {
          seenOrderIdsRef.current.add(o.id);
        }
      });
    } catch (err) {
      console.error("Error loading orders:", err);
      setOrdersError("Kunne ikke indlæse ordrer. Prøv venligst igen.");
    } finally {
      setOrdersLoading(false);
    }
  }

  async function loadAllTodaysOrders() {
    try {
      setAllTodaysOrdersLoading(true);

      // First, try to load from localStorage
      const storedOrders = getStoredTodaysOrders();
      if (storedOrders && storedOrders.length > 0) {
        setAllTodaysOrders(storedOrders);
        setAllTodaysOrdersLoading(false);
        return; // Use cached data, don't fetch from Firebase
      }

      // If no cached data, fetch from Firebase
      const fetchedOrders = await getAllOrders(true, false); // Get all today's orders including "ready"
      setAllTodaysOrders(fetchedOrders);
      setStoredTodaysOrders(fetchedOrders);
    } catch (err) {
      console.error("Error loading all today's orders:", err);
      alert("Kunne ikke indlæse alle dagens ordrer. Prøv venligst igen.");
    } finally {
      setAllTodaysOrdersLoading(false);
    }
  }

  async function loadProducts() {
    try {
      setProductsLoading(true);
      setProductsError(null);

      // Check metadata first
      const serverMetadata = await getProductsMetadata();
      const storedLastUpdated = getStoredProductsLastUpdated();
      const storedProducts = getStoredProducts();

      // If we have cached data and metadata hasn't changed, use cache
      if (storedProducts && storedLastUpdated && serverMetadata) {
        // Compare timestamps (allowing for small differences due to serialization)
        const timeDiff = Math.abs(
          serverMetadata.getTime() - storedLastUpdated.getTime(),
        );
        if (timeDiff < 1000) {
          // Less than 1 second difference
          console.log("Using cached products (metadata unchanged)");
          setProducts(storedProducts);
          setProductsLoading(false);
          // Load most popular product IDs (with its own metadata caching)
          await loadMostPopularProductIds();
          return;
        }
      }

      // Metadata changed or no cache - fetch from Firebase
      console.log(
        "Fetching products from Firebase (metadata changed or no cache)",
      );
      const fetchedProducts = await getAllProducts();
      setProducts(fetchedProducts);

      // Update cache
      setStoredProducts(fetchedProducts);
      if (serverMetadata) {
        setStoredProductsLastUpdated(serverMetadata);
      }

      // Load most popular product IDs (with its own metadata caching)
      await loadMostPopularProductIds();
    } catch (err) {
      console.error("Error loading products:", err);
      setProductsError("Kunne ikke indlæse produkter. Prøv venligst igen.");

      // Try to use cached data as fallback
      const storedProducts = getStoredProducts();
      if (storedProducts) {
        console.log("Using cached products as fallback");
        setProducts(storedProducts);
      }
    } finally {
      setProductsLoading(false);
    }
  }

  async function loadMostPopularProductIds() {
    try {
      // First, try to load from localStorage
      const storedIds = getStoredMostPopularIdsAdmin();
      const storedLastUpdated = getStoredMostPopularLastUpdatedAdmin();

      if (storedIds && storedLastUpdated) {
        // Use cached data immediately
        setMostPopularProductIdsState(storedIds);

        // Check if we need to update from Firebase (single read to get both timestamp and IDs)
        const { lastUpdated: firebaseLastUpdated, productIds: fetchedIds } = 
          await getMostPopularMetadataAndIds();

        if (firebaseLastUpdated) {
          const needsUpdate =
            firebaseLastUpdated.getTime() > storedLastUpdated.getTime();

          if (needsUpdate) {
            // Update with fresh data from Firebase (already fetched in same call)
            setMostPopularProductIdsState(fetchedIds);
            setStoredMostPopularIdsAdmin(fetchedIds);
            setStoredMostPopularLastUpdatedAdmin(firebaseLastUpdated);
          }
        }
      } else {
        // No cached data, fetch from Firebase (single read to get both timestamp and IDs)
        const { lastUpdated: firebaseLastUpdated, productIds: fetchedIds } = 
          await getMostPopularMetadataAndIds();
        
        setMostPopularProductIdsState(fetchedIds);
        setStoredMostPopularIdsAdmin(fetchedIds);

        if (firebaseLastUpdated) {
          setStoredMostPopularLastUpdatedAdmin(firebaseLastUpdated);
        }
      }
    } catch (err) {
      console.error("Error loading most popular product IDs:", err);
      // Fallback to cached data if available
      const storedIds = getStoredMostPopularIdsAdmin();
      if (storedIds) {
        setMostPopularProductIdsState(storedIds);
      }
    }
  }

  async function handleToggleMostPopular(productId: string) {
    try {
      setSavingPopularProducts(true);
      const isCurrentlyPopular = mostPopularProductIds.includes(productId);
      const updatedIds = isCurrentlyPopular
        ? mostPopularProductIds.filter((id) => id !== productId)
        : [...mostPopularProductIds, productId];

      await setMostPopularProductIds(updatedIds);
      setMostPopularProductIdsState(updatedIds);
      // Keep localStorage in sync so Menu uses the same data immediately
      setStoredMostPopularIdsAdmin(updatedIds);
      setStoredMostPopularLastUpdatedAdmin(new Date());
    } catch (err) {
      console.error("Error updating most popular products:", err);
      alert("Kunne ikke opdatere mest populære produkter. Prøv venligst igen.");
    } finally {
      setSavingPopularProducts(false);
    }
  }

  async function handleClearAllMostPopular() {
    if (
      !confirm(
        "Er du sikker på, at du vil fjerne alle produkter fra 'Most Popular'?",
      )
    ) {
      return;
    }
    try {
      setSavingPopularProducts(true);
      await setMostPopularProductIds([]);
      setMostPopularProductIdsState([]);
      alert("Alle produkter fjernet fra 'Most Popular'!");
      // Clear localStorage cache for most popular
      setStoredMostPopularIdsAdmin([]);
      setStoredMostPopularLastUpdatedAdmin(new Date());
    } catch (err) {
      console.error("Error clearing most popular products:", err);
      alert("Kunne ikke fjerne produkter. Prøv venligst igen.");
    } finally {
      setSavingPopularProducts(false);
    }
  }

  async function loadReviews() {
    try {
      setReviewsLoading(true);
      setReviewsError(null);

      // Check metadata first
      const serverMetadata = await getReviewsMetadata();
      const storedLastUpdated = getStoredReviewsLastUpdated();
      const storedReviews = getStoredReviews();

      // If we have cached data and metadata hasn't changed, use cache
      if (storedReviews && storedLastUpdated && serverMetadata) {
        // Compare timestamps (allowing for small differences due to serialization)
        const timeDiff = Math.abs(
          serverMetadata.getTime() - storedLastUpdated.getTime(),
        );
        if (timeDiff < 1000) {
          // Less than 1 second difference
          console.log("Using cached reviews (metadata unchanged)");
          setReviews(storedReviews);
          setReviewsLoading(false);
          return;
        }
      }

      // Metadata changed or no cache - fetch from Firebase
      console.log(
        "Fetching reviews from Firebase (metadata changed or no cache)",
      );
      // Get all reviews including unapproved ones for admin
      const fetchedReviews = await getAllReviews(undefined, true);
      setReviews(fetchedReviews);

      // Update cache
      setStoredReviews(fetchedReviews);
      if (serverMetadata) {
        setStoredReviewsLastUpdated(serverMetadata);
      }
    } catch (err) {
      console.error("Error loading reviews:", err);
      setReviewsError("Kunne ikke indlæse anmeldelser. Prøv venligst igen.");

      // Try to use cached data as fallback
      const storedReviews = getStoredReviews();
      if (storedReviews) {
        console.log("Using cached reviews as fallback");
        setReviews(storedReviews);
      }
    } finally {
      setReviewsLoading(false);
    }
  }

  useEffect(() => {
    if (activeTab === "orders") {
      // Initial load
      loadOrders();
      isInitialLoadRef.current = true;

      // Set up real-time listener for orders (only today's orders, excluding "ready" status)
      unsubscribeRef.current = subscribeToOrders(
        (fetchedOrders) => {
          if (isInitialLoadRef.current) {
            // First load: just set orders and mark as seen
            setOrders(fetchedOrders);
            fetchedOrders.forEach((o) => {
              if (o.id) {
                seenOrderIdsRef.current.add(o.id);
              }
            });
            isInitialLoadRef.current = false;
            setOrdersLoading(false);
          } else {
            // Subsequent updates: check for new orders
            const previousOrderIds = seenOrderIdsRef.current;

            // Find new orders that we haven't seen before
            const newOrders = fetchedOrders.filter(
              (o) => o.id && !previousOrderIds.has(o.id),
            );

            if (newOrders.length > 0) {
              // Only play sound if page is visible
              if (!document.hidden) {
                // Play notification sound for new orders
                playNotificationSound();
              }

              // Append new orders to existing list (prepend since sorted by date desc)
              setOrders((prevOrders) => {
                // Get existing order IDs to avoid duplicates
                const existingIds = new Set(prevOrders.map((o) => o.id));
                const uniqueNewOrders = newOrders.filter(
                  (o) => o.id && !existingIds.has(o.id),
                );

                // Prepend new orders to existing ones (newest first)
                const updatedOrders = [...uniqueNewOrders, ...prevOrders];

                // Sort by createdAt descending to maintain order (newest first)
                return updatedOrders.sort((a, b) => {
                  const getTime = (order: Order) => {
                    if (order.createdAt instanceof Date) {
                      return order.createdAt.getTime();
                    }
                    if (
                      order.createdAt &&
                      typeof order.createdAt === "object" &&
                      "toDate" in order.createdAt
                    ) {
                      return (order.createdAt as any).toDate().getTime();
                    }
                    return new Date(order.createdAt as any).getTime();
                  };
                  return getTime(b) - getTime(a);
                });
              });

              // Update seen orders - mark new orders as seen
              newOrders.forEach((o) => {
                if (o.id) {
                  seenOrderIdsRef.current.add(o.id);
                }
              });
            }
            // If no new orders, don't update state - leave existing orders on screen
          }
        },
        (error) => {
          console.error("Error in orders subscription:", error);
          setOrdersError("Fejl ved real-time opdatering af ordrer.");
        },
        true, // onlyToday: only fetch today's orders
        true, // excludeReady: exclude orders with "ready" status
      );
    } else if (activeTab === "products") {
      loadProducts();
    } else if (activeTab === "reviews") {
      loadReviews();
    }

    // Cleanup: unsubscribe when tab changes or component unmounts
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, [activeTab]);

  // Additional cleanup on component unmount (when user navigates away from admin page)
  useEffect(() => {
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, []);

  async function handleInitializeProducts() {
    if (
      !confirm(
        "Er du sikker på, at du vil initialisere alle produkter? Dette kan oprette dubletter hvis produkter allerede findes.",
      )
    ) {
      return;
    }

    setInitializing(true);
    setInitSuccess(false);
    setProductsError(null);

    try {
      await initializeProducts();
      setInitSuccess(true);
      // Clear products cache and reload
      localStorage.removeItem(PRODUCTS_STORAGE_KEY);
      localStorage.removeItem(PRODUCTS_LAST_UPDATED_KEY);
      await loadProducts();
      setTimeout(() => setInitSuccess(false), 5000);
    } catch (err) {
      console.error("Error initializing products:", err);
      setProductsError(
        "Kunne ikke initialisere produkter. Tjek konsollen for detaljer.",
      );
    } finally {
      setInitializing(false);
    }
  }

  // async function handleInitializeReviews() {

  //   try {
  //     await initializeReviews();

  //   } catch (err) {
  //     console.error("Error initializing reviews:", err);

  //   }
  // }

  async function handleUpdateOrderStatus(id: string, status: Order["status"]) {
    try {
      await updateOrderStatus(id, status);

      // If status is "ready", remove from main orders list (since we filter out "ready" orders)
      if (status === "ready") {
        setOrders((prev) => prev.filter((o) => o.id !== id));
      } else {
        // Otherwise, just update the status
        setOrders((prev) =>
          prev.map((o) => (o.id === id ? { ...o, status } : o)),
        );
      }

      // Always update localStorage cache and "All Today's Orders" state
      updateStoredTodaysOrderStatus(id, status);

      // Also update the "All Today's Orders" state directly if visible
      if (showAllTodaysOrders) {
        setAllTodaysOrders((prev) =>
          prev.map((o) => (o.id === id ? { ...o, status } : o)),
        );
      }
    } catch (err) {
      console.error("Error updating order status:", err);
      alert("Kunne ikke opdatere ordrestatus. Prøv venligst igen.");
    }
  }

  async function handleUpdateProduct(
    productId: string,
    updates: Partial<Product>,
  ) {
    try {
      await updateProduct(productId, updates);
      const updatedProducts = products.map((p) =>
        p.id === productId ? { ...p, ...updates } : p,
      );
      setProducts(updatedProducts);

      // Update localStorage cache
      setStoredProducts(updatedProducts);
      const newMetadata = await getProductsMetadata();
      if (newMetadata) {
        setStoredProductsLastUpdated(newMetadata);
      }

      setEditingProduct(null);
      alert("Produkt opdateret med succes!");
    } catch (err) {
      console.error("Error updating product:", err);
      alert("Kunne ikke opdatere produkt. Prøv venligst igen.");
    }
  }

  async function handleDeleteProduct(productId: string) {
    if (!confirm("Er du sikker på, at du vil slette dette produkt?")) {
      return;
    }

    try {
      await deleteProduct(productId);
      const updatedProducts = products.filter((p) => p.id !== productId);
      setProducts(updatedProducts);

      // Update localStorage cache
      setStoredProducts(updatedProducts);
      const newMetadata = await getProductsMetadata();
      if (newMetadata) {
        setStoredProductsLastUpdated(newMetadata);
      }

      alert("Produkt slettet!");
    } catch (err) {
      console.error("Error deleting product:", err);
      alert("Kunne ikke slette produkt. Prøv venligst igen.");
    }
  }

  async function handleApproveReview(reviewId: string) {
    try {
      await updateReview(reviewId, { approved: true });
      const updatedReviews = reviews.map((r) =>
        r.id === reviewId ? { ...r, approved: true } : r,
      );
      setReviews(updatedReviews);

      // Update localStorage cache
      setStoredReviews(updatedReviews);
      const newMetadata = await getReviewsMetadata();
      if (newMetadata) {
        setStoredReviewsLastUpdated(newMetadata);
      }

      alert("Anmeldelse godkendt!");
    } catch (err) {
      console.error("Error approving review:", err);
      alert("Kunne ikke godkende anmeldelse. Prøv venligst igen.");
    }
  }

  async function handleRejectReview(reviewId: string) {
    if (!confirm("Er du sikker på, at du vil afvise denne anmeldelse?")) {
      return;
    }

    try {
      await updateReview(reviewId, { approved: false });
      const updatedReviews = reviews.map((r) =>
        r.id === reviewId ? { ...r, approved: false } : r,
      );
      setReviews(updatedReviews);

      // Update localStorage cache
      setStoredReviews(updatedReviews);
      const newMetadata = await getReviewsMetadata();
      if (newMetadata) {
        setStoredReviewsLastUpdated(newMetadata);
      }

      alert("Anmeldelse afvist!");
    } catch (err) {
      console.error("Error rejecting review:", err);
      alert("Kunne ikke afvise anmeldelse. Prøv venligst igen.");
    }
  }

  async function handleDeleteReview(reviewId: string) {
    if (!confirm("Er du sikker på, at du vil slette denne anmeldelse?")) {
      return;
    }

    try {
      await deleteReview(reviewId);
      const updatedReviews = reviews.filter((r) => r.id !== reviewId);
      setReviews(updatedReviews);

      // Update localStorage cache
      setStoredReviews(updatedReviews);
      const newMetadata = await getReviewsMetadata();
      if (newMetadata) {
        setStoredReviewsLastUpdated(newMetadata);
      }

      alert("Anmeldelse slettet!");
    } catch (err) {
      console.error("Error deleting review:", err);
      alert("Kunne ikke slette anmeldelse. Prøv venligst igen.");
    }
  }

  return (
    <main className="admin-page">
      <div className="admin-container">
        <h1 className="admin-title">Admin Panel</h1>

        {/* Tabs */}
        <div className="admin-tabs">
          <button
            className={`admin-tab ${activeTab === "orders" ? "active" : ""}`}
            onClick={() => setActiveTab("orders")}
          >
            📦 Ordrer ({orders.length})
          </button>
          <button
            className={`admin-tab ${activeTab === "products" ? "active" : ""}`}
            onClick={() => setActiveTab("products")}
          >
            🍕 Produkter ({products.length})
          </button>
          <button
            className={`admin-tab ${activeTab === "reviews" ? "active" : ""}`}
            onClick={() => setActiveTab("reviews")}
          >
            ⭐ Anmeldelser ({reviews.length})
          </button>
        </div>

        {/* Orders Section */}
        {activeTab === "orders" && (
          <section className="admin-section">
            <div className="section-header">
              <h2 className="section-title">Ordre Administration</h2>
              <button
                onClick={() => loadOrders(true)}
                className="btn-refresh"
                disabled={ordersLoading}
              >
                {ordersLoading ? "Indlæser..." : "🔄 Opdater"}
              </button>
            </div>

            {/* All Today's Orders Subsection */}
            <div className="todays-orders-subsection">
              <div className="todays-orders-header">
                <h3 className="todays-orders-title">
                  Alle Dagens Ordrer ({allTodaysOrders.length})
                </h3>
                <div className="todays-orders-actions">
                  {showAllTodaysOrders && (
                    <button
                      onClick={() => {
                        // Clear cache and reload from Firebase
                        localStorage.removeItem("admin_todays_orders");
                        loadAllTodaysOrders();
                      }}
                      className="btn-refresh btn-small"
                      disabled={allTodaysOrdersLoading}
                    >
                      {allTodaysOrdersLoading ? "Indlæser..." : "🔄 Opdater"}
                    </button>
                  )}
                  <button
                    onClick={() => {
                      if (!showAllTodaysOrders) {
                        setShowAllTodaysOrders(true);
                        loadAllTodaysOrders();
                      } else {
                        setShowAllTodaysOrders(false);
                      }
                    }}
                    className="btn-refresh btn-small"
                    disabled={allTodaysOrdersLoading}
                  >
                    {showAllTodaysOrders
                      ? "⬆️ Skjul"
                      : "⬇️ Vis Alle Dagens Ordrer"}
                  </button>
                </div>
              </div>

              {showAllTodaysOrders && (
                <div>
                  {allTodaysOrdersLoading ? (
                    <div className="loading-state">
                      Indlæser alle dagens ordrer...
                    </div>
                  ) : allTodaysOrders.length === 0 ? (
                    <div className="empty-state">Ingen ordrer i dag endnu.</div>
                  ) : (
                    <div className="orders-list">
                      {allTodaysOrders.map((o) => (
                        <div key={o.id} className="order-card">
                          <div className="order-header">
                            <div>
                              <div className="order-name">{o.name}</div>
                              <div className="order-meta">
                                {o.method === "delivery"
                                  ? "🚴 Levering"
                                  : "🚗 Afhentning"}
                                {" • "}
                                {(() => {
                                  if (o.createdAt instanceof Date) {
                                    return o.createdAt.toLocaleString("da-DK");
                                  }
                                  if (
                                    o.createdAt &&
                                    typeof o.createdAt === "object" &&
                                    "toDate" in o.createdAt
                                  ) {
                                    return (o.createdAt as any)
                                      .toDate()
                                      .toLocaleString("da-DK");
                                  }
                                  // Handle string dates from localStorage
                                  return new Date(
                                    o.createdAt as string | Date,
                                  ).toLocaleString("da-DK");
                                })()}
                              </div>
                              <div className="order-phone">📞 {o.phone}</div>
                              {o.address && (
                                <div className="order-address">
                                  📍 {o.address}
                                </div>
                              )}
                            </div>
                            <div className="order-actions">
                              <div className="order-total">
                                DKK {o.total.toFixed(2)}
                              </div>
                              <select
                                value={o.status}
                                onChange={(e) =>
                                  handleUpdateOrderStatus(
                                    o.id!,
                                    e.target.value as Order["status"],
                                  )
                                }
                                className="status-select"
                              >
                                <option value="pending">⏳ Afventer</option>
                                <option value="paid">💳 Betalt</option>
                                <option value="making">👨‍🍳 Tilbereder</option>
                                <option value="ready">✅ Klar</option>
                                <option value="collected">📦 Afhentet</option>
                              </select>
                            </div>
                          </div>
                          <div className="order-items">
                            <strong>Varer:</strong>
                            <ul>
                              {o.items.map((i: any) => (
                                <li key={i.id}>
                                  {i.qty} × {i.name} — DKK{" "}
                                  {(i.price * i.qty).toFixed(2)}
                                </li>
                              ))}
                            </ul>
                          </div>
                          {o.note && (
                            <div className="order-note">
                              <strong>Bemærkning:</strong> {o.note}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {ordersError && (
              <div className="alert alert-error">{ordersError}</div>
            )}

            {ordersLoading ? (
              <div className="loading-state">Indlæser ordrer...</div>
            ) : orders.length === 0 ? (
              <div className="empty-state">Ingen ordrer endnu.</div>
            ) : (
              <div className="orders-list">
                {orders.map((o) => (
                  <div key={o.id} className="order-card">
                    <div className="order-header">
                      <div>
                        <div className="order-name">{o.name}</div>
                        <div className="order-meta">
                          {o.method === "delivery"
                            ? "🚴 Levering"
                            : "🚗 Afhentning"}
                          {" • "}
                          {(() => {
                            if (o.createdAt instanceof Date) {
                              return o.createdAt.toLocaleString("da-DK");
                            }
                            if (
                              o.createdAt &&
                              typeof o.createdAt === "object" &&
                              "toDate" in o.createdAt
                            ) {
                              return (o.createdAt as any)
                                .toDate()
                                .toLocaleString("da-DK");
                            }
                            // Handle string dates from localStorage
                            return new Date(
                              o.createdAt as string | Date,
                            ).toLocaleString("da-DK");
                          })()}
                        </div>
                        <div className="order-phone">📞 {o.phone}</div>
                        {o.address && (
                          <div className="order-address">📍 {o.address}</div>
                        )}
                      </div>
                      <div className="order-actions">
                        <div className="order-total">
                          DKK {o.total.toFixed(2)}
                        </div>
                        <select
                          value={o.status}
                          onChange={(e) =>
                            handleUpdateOrderStatus(
                              o.id!,
                              e.target.value as Order["status"],
                            )
                          }
                          className="status-select"
                        >
                          <option value="pending">⏳ Afventer</option>
                          <option value="paid">💳 Betalt</option>
                          <option value="making">👨‍🍳 Tilbereder</option>
                          <option value="ready">✅ Klar</option>
                          <option value="collected">📦 Afhentet</option>
                        </select>
                      </div>
                    </div>
                    <div className="order-items">
                      <strong>Varer:</strong>
                      <ul>
                        {o.items.map((i: any) => (
                          <li key={i.id}>
                            {i.qty} × {i.name} — DKK{" "}
                            {(i.price * i.qty).toFixed(2)}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {o.note && (
                      <div className="order-note">
                        <strong>Bemærkning:</strong> {o.note}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </section>
        )}

        {/* Products Section */}
        {activeTab === "products" && (
          <section className="admin-section">
            <div className="section-header">
              <h2 className="section-title">Produkt Administration</h2>
              <div className="section-actions">
                <button
                  onClick={loadProducts}
                  className="btn-refresh"
                  disabled={productsLoading}
                >
                  {productsLoading ? "Indlæser..." : "🔄 Opdater"}
                </button>
                {/* <button
                  onClick={handleInitializeProducts}
                  className="btn-init"
                  disabled={initializing}
                >
                  {initializing ? "Initialiserer..." : "➕ Initialiser Produkter"}
                </button> */}
                {/* <button
                  onClick={handleInitializeReviews}
                  className="btn-init"
                  disabled={initializing}
                >
                Initialiser Reviews
                </button> */}
              </div>
            </div>

            {initSuccess && (
              <div className="alert alert-success">
                ✓ Produkter blev initialiseret med succes!
              </div>
            )}

            {productsError && (
              <div className="alert alert-error">{productsError}</div>
            )}

            {productsLoading ? (
              <div className="loading-state">Indlæser produkter...</div>
            ) : products.length === 0 ? (
              <div className="empty-state">
                <p>Ingen produkter endnu.</p>
                <button
                  onClick={handleInitializeProducts}
                  className="btn-init"
                  disabled={initializing}
                >
                  {initializing ? "Initialiserer..." : "Initialiser Produkter"}
                </button>
              </div>
            ) : (
              <>
                {editingProduct && (
                  <ProductEditForm
                    product={editingProduct}
                    onSave={(updates) =>
                      handleUpdateProduct(editingProduct.id!, updates)
                    }
                    onCancel={() => setEditingProduct(null)}
                  />
                )}

                {/* Most Popular Products Selector */}
                <div className="most-popular-selector">
                  <div className="most-popular-header">
                    <label className="most-popular-label">
                      ⭐ Mest Populære Produkter:
                    </label>
                    {mostPopularProductIds.length > 0 && (
                      <button
                        onClick={handleClearAllMostPopular}
                        className="btn-clear-popular"
                        disabled={savingPopularProducts}
                        title="Fjern alle produkter fra Most Popular"
                      >
                        ✕ Fjern Alle ({mostPopularProductIds.length})
                      </button>
                    )}
                  </div>
                  {savingPopularProducts && (
                    <div className="saving-indicator">Gemmer...</div>
                  )}
                  <p className="most-popular-info">
                    Vælg produkter der skal vises i "Most Popular" sektionen på
                    menuen. Klik på et produkt for at tilføje/fjerne det.
                  </p>
                  <div className="most-popular-products-grid">
                    {products.map((product) => {
                      const isPopular = mostPopularProductIds.includes(
                        product.id || "",
                      );
                      return (
                        <div
                          key={product.id}
                          className={`most-popular-product-card ${isPopular ? "is-popular" : ""}`}
                          onClick={() =>
                            !savingPopularProducts &&
                            handleToggleMostPopular(product.id!)
                          }
                        >
                          <div className="most-popular-product-checkbox">
                            {isPopular ? "✓" : ""}
                          </div>
                          <img
                            src={`./assets/${product.image}`}
                            alt={product.name}
                            className="most-popular-product-image"
                          />
                          <div className="most-popular-product-info">
                            <div className="most-popular-product-name">
                              {product.name}
                            </div>
                            <div className="most-popular-product-category">
                              {product.category}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {mostPopularProductIds.length > 0 && (
                    <div className="most-popular-summary">
                      <strong>{mostPopularProductIds.length}</strong> produkt
                      {mostPopularProductIds.length !== 1 ? "er" : ""} valgt til
                      "Most Popular"
                    </div>
                  )}
                </div>

                {/* Search Bar */}
                <div className="products-search-container">
                  <input
                    type="text"
                    placeholder="🔍 Søg efter produkter (navn, kategori, beskrivelse, tags, ingredienser)..."
                    value={productSearchQuery}
                    onChange={(e) => setProductSearchQuery(e.target.value)}
                    className="products-search-input"
                  />
                  {productSearchQuery && (
                    <button
                      onClick={() => setProductSearchQuery("")}
                      className="products-search-clear"
                      title="Ryd søgning"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Filtered Products */}
                {(() => {
                  const filteredProducts = products.filter((product) => {
                    if (!productSearchQuery.trim()) return true;

                    const query = productSearchQuery.toLowerCase();
                    const searchableText = [
                      product.name,
                      product.category,
                      product.desc,
                      ...(product.tags || []),
                      ...(product.ingredients?.map((ing) => ing.name) || []),
                    ]
                      .join(" ")
                      .toLowerCase();

                    return searchableText.includes(query);
                  });

                  if (filteredProducts.length === 0 && productSearchQuery) {
                    return (
                      <div className="empty-state">
                        <p>Ingen produkter fundet for "{productSearchQuery}"</p>
                        <button
                          onClick={() => setProductSearchQuery("")}
                          className="btn-refresh"
                        >
                          Ryd søgning
                        </button>
                      </div>
                    );
                  }

                  return (
                    <div className="products-grid">
                      {filteredProducts.map((product) => (
                        <div key={product.id} className="product-card">
                          <div className="product-header">
                            <img
                              src={`./assets/${product.image}`}
                              alt={product.name}
                            />

                            <div>
                              <div className="product-name">{product.name}</div>
                              <div className="product-category">
                                {product.category}
                              </div>
                            </div>
                            <div className="product-price">
                              DKK {product.price.toFixed(2)}
                            </div>
                          </div>
                          <div className="product-desc">{product.desc}</div>
                          {product.ingredients &&
                            product.ingredients.length > 0 && (
                              <div className="product-ingredients">
                                <strong>Tilvalg:</strong>
                                <ul>
                                  {product.ingredients.map((ing, idx) => (
                                    <li key={idx}>
                                      {ing.name}
                                      {ing.extraPrice &&
                                        ` (+DKK ${ing.extraPrice})`}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          {product.tags && product.tags.length > 0 && (
                            <div className="product-ingredients">
                              <strong>Tags:</strong>
                              <ul>
                                {product.tags.map((tag, idx) => (
                                  <li key={idx}>{tag}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                          <div className="product-actions">
                            <button
                              onClick={() => setEditingProduct(product)}
                              className="btn-edit"
                            >
                              ✏️ Rediger
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id!)}
                              className="btn-delete"
                            >
                              🗑️ Slet
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
                {productSearchQuery && (
                  <div className="products-search-results-info">
                    Viser{" "}
                    {
                      products.filter((product) => {
                        const query = productSearchQuery.toLowerCase();
                        const searchableText = [
                          product.name,
                          product.category,
                          product.desc,
                          ...(product.tags || []),
                          ...(product.ingredients?.map((ing) => ing.name) ||
                            []),
                        ]
                          .join(" ")
                          .toLowerCase();
                        return searchableText.includes(query);
                      }).length
                    }{" "}
                    af {products.length} produkter
                  </div>
                )}
              </>
            )}
          </section>
        )}

        {/* Reviews Section */}
        {activeTab === "reviews" && (
          <section className="admin-section">
            <div className="section-header">
              <h2 className="section-title">Anmeldelses Administration</h2>
              <button
                onClick={loadReviews}
                className="btn-refresh"
                disabled={reviewsLoading}
              >
                {reviewsLoading ? "Indlæser..." : "🔄 Opdater"}
              </button>
            </div>

            {reviewsError && (
              <div className="alert alert-error">{reviewsError}</div>
            )}

            {reviewsLoading ? (
              <div className="loading-state">Indlæser anmeldelser...</div>
            ) : reviews.length === 0 ? (
              <div className="empty-state">Ingen anmeldelser endnu.</div>
            ) : (
              <div className="reviews-list">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className={`review-card-admin ${
                      review.approved === false
                        ? "review-rejected"
                        : review.approved === true
                          ? "review-approved"
                          : "review-pending"
                    }`}
                  >
                    <div className="review-card-header">
                      <div className="review-info">
                        <div className="review-author">{review.author}</div>
                        <div className="review-rating">
                          {"★".repeat(review.rating)}
                          {"☆".repeat(5 - review.rating)}
                        </div>
                        <div className="review-date">
                          {(() => {
                            if (review.createdAt instanceof Date) {
                              return review.createdAt.toLocaleString("da-DK");
                            }
                            if (
                              review.createdAt &&
                              typeof review.createdAt === "object" &&
                              "toDate" in review.createdAt
                            ) {
                              return (review.createdAt as any)
                                .toDate()
                                .toLocaleString("da-DK");
                            }
                            // Handle string dates from localStorage
                            return new Date(
                              review.createdAt as string | Date,
                            ).toLocaleString("da-DK");
                          })()}
                        </div>
                      </div>
                      <div className="review-status">
                        {review.approved === true ? (
                          <span className="status-badge status-approved">
                            ✓ Godkendt
                          </span>
                        ) : review.approved === false ? (
                          <span className="status-badge status-rejected">
                            ✗ Afvist
                          </span>
                        ) : (
                          <span className="status-badge status-pending">
                            ⏳ Afventer
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="review-text-admin">"{review.text}"</div>
                    <div className="review-actions">
                      {review.approved !== true && (
                        <button
                          onClick={() => handleApproveReview(review.id!)}
                          className="btn-approve"
                        >
                          ✓ Godkend
                        </button>
                      )}
                      {review.approved !== false && (
                        <button
                          onClick={() => handleRejectReview(review.id!)}
                          className="btn-reject"
                        >
                          ✗ Afvis
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteReview(review.id!)}
                        className="btn-delete"
                      >
                        🗑️ Slet
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </main>
  );
}

// Product Edit Form Component
function ProductEditForm({
  product,
  onSave,
  onCancel,
}: {
  product: Product;
  onSave: (updates: Partial<Product>) => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState(product.name);
  const [desc, setDesc] = useState(product.desc);
  const [price, setPrice] = useState(product.price.toString());
  const [category, setCategory] = useState(product.category);
  const [image, setImage] = useState(product.image);
  const [tags, setTags] = useState<string[]>(product.tags || []);
  const [ingredients, setIngredients] = useState<
    Array<{ name: string; extraPrice?: number }>
  >(product.ingredients || []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave({
      name,
      desc,
      price: parseFloat(price),
      category,
      image,
      tags: tags.length > 0 ? tags : [],
      ingredients: ingredients.length > 0 ? ingredients : [],
    });
  }

  function addIngredient() {
    setIngredients([...ingredients, { name: "", extraPrice: undefined }]);
  }

  function removeIngredient(index: number) {
    setIngredients(ingredients.filter((_, i) => i !== index));
  }

  function updateIngredient(
    index: number,
    field: "name" | "extraPrice",
    value: string | number,
  ) {
    const updated = [...ingredients];
    updated[index] = {
      ...updated[index],
      [field]:
        field === "extraPrice"
          ? value === ""
            ? undefined
            : Number(value)
          : value,
    };
    setIngredients(updated);
  }

  return (
    <>
      <div className="modal-backdrop" onClick={onCancel}></div>
      <div className="product-edit-form">
        <h3>Rediger Produkt</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Navn</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Kategori</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="Pizza">Pizza</option>
                <option value="Grill">Grill</option>
                <option value="Sides">Sides</option>
                <option value="Drinks">Drinks</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Beskrivelse</label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              required
              rows={3}
            />
          </div>

          {/* Ingredients Section */}
          <div className="form-group">
            <div className="form-group-header">
              <label>Tilvalg (Ingredienser)</label>
              <button
                type="button"
                onClick={addIngredient}
                className="btn-add-small"
              >
                + Tilføj tilvalg
              </button>
            </div>
            {ingredients.length === 0 ? (
              <p className="form-hint">
                Ingen tilvalg tilføjet. Klik på "Tilføj tilvalg" for at tilføje.
              </p>
            ) : (
              <div className="ingredients-list">
                {ingredients.map((ing, idx) => (
                  <div key={idx} className="ingredient-item">
                    <input
                      type="text"
                      placeholder="Navn på tilvalg"
                      value={ing.name}
                      onChange={(e) =>
                        updateIngredient(idx, "name", e.target.value)
                      }
                      className="ingredient-name"
                    />
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      placeholder="Ekstra pris (valgfrit)"
                      value={ing.extraPrice || ""}
                      onChange={(e) =>
                        updateIngredient(idx, "extraPrice", e.target.value)
                      }
                      className="ingredient-price"
                    />
                    <button
                      type="button"
                      onClick={() => removeIngredient(idx)}
                      className="btn-remove"
                    >
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tags Section */}
          <div className="form-group">
            <label>Tags</label>
            <div className="tags-checkbox-group">
              {[
                { value: "vegetarian", label: "🌱 Vegetar" },
                { value: "vegan", label: "🥬 Vegansk" },
                { value: "spicy", label: "🌶️ Stærk" },
                { value: "glutenfree", label: "🌾 Glutenfri" },
                { value: "halal", label: "☪️ Halal" },
                { value: "popular", label: "⭐ Populær" },
              ].map((tag) => (
                <label key={tag.value} className="tag-checkbox-label">
                  <input
                    type="checkbox"
                    value={tag.value}
                    checked={tags.includes(tag.value)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setTags([...tags, tag.value]);
                      } else {
                        setTags(tags.filter((t) => t !== tag.value));
                      }
                    }}
                    className="tag-checkbox"
                  />
                  <span className="tag-checkbox-text">{tag.label}</span>
                </label>
              ))}
            </div>
            {tags.length > 0 && (
              <div className="selected-tags">
                <strong>Valgte tags:</strong> {tags.join(", ")}
              </div>
            )}
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Pris (DKK)</label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Billede filnavn</label>
              <input
                type="text"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="btn-save">
              💾 Gem
            </button>
            <button type="button" onClick={onCancel} className="btn-cancel">
              Annuller
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
