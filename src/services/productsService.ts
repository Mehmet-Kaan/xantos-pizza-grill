import {
  collection,
  getDocs,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  getDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";

export interface Product {
  id?: string;
  category: string;
  name: string;
  description: string;
  price: number;
  image: string;
  tags?: string[];
  ingredients: Array<{
    name: string;
    extraPrice?: number;
  }>;
}

// Get all menuItems
export async function getAllProducts(): Promise<Product[]> {
  try {
    const q = query(collection(db, "menuItems"), orderBy("category"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
  } catch (error) {
    console.error("Error fetching menuItems:", error);
    throw error;
  }
}

// Create a new product
export async function createProduct(
  productData: Omit<Product, "id">,
): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, "menuItems"), productData);
    await updateProductsMetadata();
    return docRef.id;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}

// Update a product
export async function updateProduct(
  productId: string,
  productData: Partial<Product>,
): Promise<void> {
  try {
    const productRef = doc(db, "menuItems", productId);
    await updateDoc(productRef, productData);
    await updateProductsMetadata();
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

// Delete a product
export async function deleteProduct(productId: string): Promise<void> {
  try {
    const productRef = doc(db, "menuItems", productId);
    await deleteDoc(productRef);
    await updateProductsMetadata();
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

// Get menuItems metadata (lastUpdated timestamp)
export async function getProductsMetadata(): Promise<Date | null> {
  try {
    const metadataRef = doc(db, "metadata", "menuItems");
    const metadataSnap = await getDoc(metadataRef);

    if (metadataSnap.exists()) {
      const data = metadataSnap.data();
      const lastUpdated = data.lastUpdated;
      if (lastUpdated) {
        // Convert Firestore Timestamp to Date
        if (lastUpdated.toDate) {
          return lastUpdated.toDate();
        }
        return new Date(lastUpdated);
      }
    }
    return null;
  } catch (error) {
    console.error("Error fetching menuItems metadata:", error);
    return null;
  }
}

// Update menuItems metadata (called when menuItems are created/updated/deleted)
export async function updateProductsMetadata(): Promise<void> {
  try {
    const metadataRef = doc(db, "metadata", "menuItems");
    await setDoc(
      metadataRef,
      {
        lastUpdated: serverTimestamp(),
      },
      { merge: true },
    );
  } catch (error) {
    console.error("Error updating menuItems metadata:", error);
  }
}

// Get most popular product IDs
export async function getMostPopularProductIds(): Promise<string[]> {
  try {
    const metadataRef = doc(db, "metadata", "menuItems");
    const metadataSnap = await getDoc(metadataRef);

    if (metadataSnap.exists()) {
      const data = metadataSnap.data();
      return data.mostPopularProductIds || [];
    }
    return [];
  } catch (error) {
    console.error("Error fetching most popular product IDs:", error);
    return [];
  }
}

// Set most popular product IDs
export async function setMostPopularProductIds(
  productIds: string[],
): Promise<void> {
  try {
    const metadataRef = doc(db, "metadata", "menuItems");
    await setDoc(
      metadataRef,
      {
        mostPopularProductIds: productIds,
        mostPopularLastUpdated: serverTimestamp(),
        lastUpdated: serverTimestamp(),
      },
      { merge: true },
    );
  } catch (error) {
    console.error("Error setting most popular product IDs:", error);
    throw error;
  }
}

// Get most popular metadata (lastUpdated timestamp)
export async function getMostPopularMetadata(): Promise<Date | null> {
  try {
    const metadataRef = doc(db, "metadata", "menuItems");
    const metadataSnap = await getDoc(metadataRef);

    if (metadataSnap.exists()) {
      const data = metadataSnap.data();
      const mostPopularLastUpdated = data.mostPopularLastUpdated;
      if (mostPopularLastUpdated) {
        // Convert Firestore Timestamp to Date
        if (mostPopularLastUpdated.toDate) {
          return mostPopularLastUpdated.toDate();
        }
        return new Date(mostPopularLastUpdated);
      }
    }
    return null;
  } catch (error) {
    console.error("Error fetching most popular metadata:", error);
    return null;
  }
}

// Get most popular metadata and IDs in one call (optimized)
export async function getMostPopularMetadataAndIds(): Promise<{
  lastUpdated: Date | null;
  productIds: string[];
}> {
  try {
    const metadataRef = doc(db, "metadata", "menuItems");
    const metadataSnap = await getDoc(metadataRef);

    if (metadataSnap.exists()) {
      const data = metadataSnap.data();
      const productIds = data.mostPopularProductIds || [];

      let lastUpdated: Date | null = null;
      const mostPopularLastUpdated = data.mostPopularLastUpdated;
      if (mostPopularLastUpdated) {
        if (mostPopularLastUpdated.toDate) {
          lastUpdated = mostPopularLastUpdated.toDate();
        } else {
          lastUpdated = new Date(mostPopularLastUpdated);
        }
      }

      return { lastUpdated, productIds };
    }
    return { lastUpdated: null, productIds: [] };
  } catch (error) {
    console.error("Error fetching most popular metadata and IDs:", error);
    return { lastUpdated: null, productIds: [] };
  }
}

export const MENU: Product[] = [
  {
    id: "p-margherita",
    category: "Pizza",
    name: "Margherita",
    description: "Tomato, mozzarella, basil",
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
    description: "Spicy pepperoni, mozzarella",
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
    description: "Tomato sauce, mozzarella, ham, pineapple",
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
    description: "Mozzarella, peppers, mushrooms, onions, olives",
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
    description: "Pepperoni, minced beef, ham, bacon",
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
    description: "Herb marinated chicken breast",
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
    description: "Slow-cooked pork ribs",
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
    description: "200g grilled steak with seasoning",
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
    description: "Beef patty, cheddar, lettuce, tomato",
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
    description: "Crispy golden fries",
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
    description: "Fresh greens, cucumber, tomato",
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
    description: "330ml",
    price: 19,
    image: "cocacola.jpg",
    ingredients: [],
  },
  {
    id: "d-water",
    category: "Drinks",
    name: "Mineral Water",
    description: "500ml",
    price: 14,
    image: "water.jpg",
    ingredients: [],
  },

  // NEW DRINKS
  {
    id: "d-fanta",
    category: "Drinks",
    name: "Fanta",
    description: "330ml",
    price: 19,
    image: "fanta.jpg",
    ingredients: [],
  },
  {
    id: "d-sprite",
    category: "Drinks",
    name: "Sprite",
    description: "330ml",
    price: 19,
    image: "sprite.jpg",
    ingredients: [],
  },
];

// A function to migrate from a collection to another one
// export async function migrateProductsToMenuItems() {
//   const OLD_COLLECTION = "products";
//   const NEW_COLLECTION = "menuItems";

//   const snapshot = await getDocs(collection(db, OLD_COLLECTION));

//   if (snapshot.empty) {
//     console.log("❌ No documents found. Migration aborted.");
//     return;
//   }

//   const batch = writeBatch(db);
//   snapshot.docs.forEach((docSnapshot) => {
//     const targetRef = doc(db, NEW_COLLECTION, docSnapshot.id);
//     batch.set(targetRef, docSnapshot.data());
//   });

//   await batch.commit();

//   console.log(
//     `✅ Migration complete: ${snapshot.size} documents copied from '${OLD_COLLECTION}' → '${NEW_COLLECTION}'`,
//   );
// }

// export async function migrateProductFields() {
//   const COLLECTION_NAME = "menuItems"; // Adjust if you're still moving from "products"
//   const snapshot = await getDocs(collection(db, COLLECTION_NAME));

//   if (snapshot.empty) {
//     console.log("❌ No documents found in collection.");
//     return;
//   }

//   const batch = writeBatch(db);
//   let changeCount = 0;

//   snapshot.docs.forEach((docSnapshot) => {
//     const data = docSnapshot.data();

//     // Check if the old 'desc' key exists
//     if (Object.prototype.hasOwnProperty.call(data, "desc")) {
//       const targetRef = doc(db, COLLECTION_NAME, docSnapshot.id);

//       batch.update(targetRef, {
//         description: data.desc, // Map old 'desc' to new 'description'
//         desc: deleteField(), // Completely remove the 'desc' key
//       });

//       changeCount++;
//     }
//   });

//   if (changeCount === 0) {
//     console.log(
//       "ℹ️ All documents are already using 'description'. No changes needed.",
//     );
//     return;
//   }

//   await batch.commit();
//   console.log(
//     `✅ Success! Updated ${changeCount} documents. 'desc' is now 'description'.`,
//   );
// }
