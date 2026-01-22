import type { Product } from "../hooks/types";

// localStorage keys
const PRODUCTS_STORAGE_KEY = "xanthos_products";
const PRODUCTS_LAST_UPDATED_KEY = "xanthos_products_lastUpdated";
const MOST_POPULAR_IDS_KEY = "xanthos_mostPopularProductIds";
const MOST_POPULAR_LAST_UPDATED_KEY = "xanthos_mostPopular_lastUpdated";

// Helper functions for localStorage
export function getStoredProducts(): Product[] | null {
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

export function setStoredProducts(products: Product[]): void {
  try {
    localStorage.setItem(PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  } catch (error) {
    console.error("Error saving products to localStorage:", error);
  }
}

export function getStoredLastUpdated(): Date | null {
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

export function setStoredLastUpdated(date: Date): void {
  try {
    localStorage.setItem(PRODUCTS_LAST_UPDATED_KEY, date.toISOString());
  } catch (error) {
    console.error("Error saving lastUpdated to localStorage:", error);
  }
}

export function getStoredMostPopularIds(): string[] | null {
  try {
    const stored = localStorage.getItem(MOST_POPULAR_IDS_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      return Array.isArray(parsed) ? (parsed as string[]) : null;
    }
  } catch (error) {
    console.error(
      "Error reading most popular product IDs from localStorage:",
      error,
    );
  }
  return null;
}

export function setStoredMostPopularIds(ids: string[]): void {
  try {
    localStorage.setItem(MOST_POPULAR_IDS_KEY, JSON.stringify(ids));
  } catch (error) {
    console.error(
      "Error saving most popular product IDs to localStorage:",
      error,
    );
  }
}

export function getStoredMostPopularLastUpdated(): Date | null {
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

export function setStoredMostPopularLastUpdated(date: Date): void {
  try {
    localStorage.setItem(MOST_POPULAR_LAST_UPDATED_KEY, date.toISOString());
  } catch (error) {
    console.error(
      "Error saving most popular lastUpdated to localStorage:",
      error,
    );
  }
}
