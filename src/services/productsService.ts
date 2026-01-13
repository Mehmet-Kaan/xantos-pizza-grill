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

// Get all products
export async function getAllProducts(): Promise<Product[]> {
  try {
    const q = query(collection(db, "products"), orderBy("category"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Product[];
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

// Create a new product
export async function createProduct(
  productData: Omit<Product, "id">
): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, "products"), productData);
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
  productData: Partial<Product>
): Promise<void> {
  try {
    const productRef = doc(db, "products", productId);
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
    const productRef = doc(db, "products", productId);
    await deleteDoc(productRef);
    await updateProductsMetadata();
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

// Get products metadata (lastUpdated timestamp)
export async function getProductsMetadata(): Promise<Date | null> {
  try {
    const metadataRef = doc(db, "metadata", "products");
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
    console.error("Error fetching products metadata:", error);
    return null;
  }
}

// Update products metadata (called when products are created/updated/deleted)
export async function updateProductsMetadata(): Promise<void> {
  try {
    const metadataRef = doc(db, "metadata", "products");
    await setDoc(
      metadataRef,
      {
        lastUpdated: serverTimestamp(),
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error updating products metadata:", error);
  }
}
