import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

// Ingredient option type
export interface IngredientOption {
  name: string;
  extraPrice?: number; // optional extra cost
}

// Cart item type
export interface CartItem {
  id: string;
  name: string;
  price: number; // base price
  qty: number;
  selectedIngredients?: IngredientOption[];
  [key: string]: unknown;
}

// Menu item type (incoming from Menu)
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  desc: string;
  ingredients?: IngredientOption[];
  selectedIngredients?: IngredientOption[];
  [key: string]: unknown;
}

type CartContextValue = {
  items: CartItem[];
  addItem: (menuItem: MenuItem, qty?: number) => void;
  updateQty: (id: string, qty: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  total: number;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("cart") || "[]");
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  // Helper to calculate price including selected ingredient extras
  const calculateTotalPrice = (item: MenuItem) => {
    const extras =
      item.selectedIngredients?.reduce(
        (sum, ing) => sum + (ing.extraPrice || 0),
        0,
      ) || 0;
    return item.price + extras;
  };

  function addItem(menuItem: MenuItem) {
    setItems((prev: CartItem[]) => {
      // Generate a unique key if ingredients differ (so same pizza with different toppings is separate)
      const uniqueId =
        menuItem.id +
        (menuItem.selectedIngredients
          ?.map((i) => i.name)
          .sort()
          .join("-") || "");

      const found = prev.find((i) => i.id === uniqueId);

      const totalPrice = calculateTotalPrice(menuItem);

      if (found) {
        return prev.map((i) =>
          i.id === uniqueId ? { ...i, qty: i.qty + menuItem.qty } : i,
        );
      }

      return [
        ...prev,
        {
          ...menuItem,
          id: uniqueId,
          qty: menuItem.qty,
          price: totalPrice,
        },
      ];
    });
  }

  function updateQty(id: string, qty: number) {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.id !== id)
        : prev.map((i) => (i.id === id ? { ...i, qty } : i)),
    );
  }

  function removeItem(id: string) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function clear() {
    setItems([]);
  }

  // Total includes selected ingredient extras
  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQty, removeItem, clear, total }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
