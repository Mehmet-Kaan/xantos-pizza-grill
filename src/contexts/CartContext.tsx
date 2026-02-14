import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

// Ingredient option type
export interface AddOnOption {
  name: string;
  extraPrice?: number; // optional extra cost
}

// Cart item type
export interface CartItem {
  id: string;
  name: string;
  price: number; // base price
  qty: number;
  selectedSize?: AddOnOption;
  selectedType?: AddOnOption;
  selectedChooseOne?: AddOnOption;
  selectedaddOns?: AddOnOption[];
  selectedaddOnsExtra?: AddOnOption[];
  [key: string]: unknown;
}

// Menu item type (incoming from Menu)
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  description: string;
  stripePriceId?: string;
  stipeProductId?: string;
  selectedSize?: AddOnOption;
  selectedType?: AddOnOption;
  selectedChooseOne?: AddOnOption;
  selectedaddOns?: AddOnOption[];
  selectedaddOnsExtra?: AddOnOption[];
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
  const calculateTotalPrice = (menuItem: MenuItem) => {
    // Use size as the base price. If size.extraPrice is 0 (like for 'Alm'), it uses that.
    const base = menuItem.selectedSize
      ? menuItem.selectedSize.extraPrice || 0
      : menuItem.price;

    const typeExtra = menuItem.selectedType?.extraPrice || 0;
    const chooseOneExtra = menuItem.selectedChooseOne?.extraPrice || 0;

    const ingredientsExtra = menuItem.selectedaddOns?.reduce(
      (sum, ing) => sum + (ing.extraPrice || 0),
      0,
    );
    const ingredientsExtraExtra = menuItem.selectedaddOnsExtra?.reduce(
      (sum, ing) => sum + (ing.extraPrice || 0),
      0,
    );

    return (
      base +
      typeExtra +
      chooseOneExtra +
      (ingredientsExtra ?? 0) +
      (ingredientsExtraExtra ?? 0)
    );
  };

  function addItem(menuItem: MenuItem) {
    setItems((prev: CartItem[]) => {
      // Generate a unique key if addOns differ (so same pizza with different toppings is separate)
      let itemQty = menuItem.qty || 1;

      // We combine ID + Size Name + Type Name + Sorted Extras
      const sizeKey = menuItem.selectedSize?.name || "default";
      const typeKey = menuItem.selectedType?.name || "none";
      const extrasKey =
        menuItem.selectedaddOns
          ?.map((i) => i.name)
          .sort()
          .join("-") || "no-extras";

      const uniqueId = `${menuItem.id}-${sizeKey}-${typeKey}-${extrasKey}`;

      const found = prev.find((i) => i.id === uniqueId);

      const totalPrice = calculateTotalPrice(menuItem);

      console.log(itemQty);

      if (found) {
        return prev.map((i) =>
          i.id === uniqueId ? { ...i, qty: i.qty + itemQty } : i,
        );
      }

      return [
        ...prev,
        {
          ...menuItem,
          id: uniqueId,
          qty: itemQty,
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
