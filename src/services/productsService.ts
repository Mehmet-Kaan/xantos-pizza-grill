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
  desc: string;
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
