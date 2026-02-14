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
  writeBatch,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { MENU } from "./menuItems";

export interface Product {
  id?: string;
  category: string;
  name: string;
  description: string;
  price: number;
  image: string;
  imageLarge: string;
  tags?: string[];
  size?: Array<{
    name: string;
    extraPrice?: number;
  }>;
  type?: Array<{
    name: string;
    extraPrice?: number;
  }>;
  chooseOne?: Array<{
    name: string;
    extraPrice?: number;
  }>;
  addOns?: Array<{
    name: string;
    extraPrice?: number;
  }>;
  addOnsExtra?: Array<{
    name: string;
    extraPrice?: number;
  }>;
}
console.log("MENU:", MENU);

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

export const resetAndUploadMenu = async () => {
  const collectionRef = collection(db, "menuItems");

  try {
    // console.log("Emptying collection...");

    // 1. Get all current documents
    const snapshot = await getDocs(collectionRef);

    // 2. Delete existing items using a Batch (more efficient)
    const deleteBatch = writeBatch(db);
    snapshot.docs.forEach((document) => {
      deleteBatch.delete(document.ref);
    });
    await deleteBatch.commit();
    console.log("Collection erased.");

    // 3. Upload new items
    console.log("Uploading new menu items...");
    const uploadBatch = writeBatch(db);

    MENU.forEach((item) => {
      // Use the 'id' we defined in the array as the document ID
      const docRef = doc(db, "menuItems", item.id!);
      uploadBatch.set(docRef, item);
    });

    await uploadBatch.commit();
    console.log("✅ Success! Menu has been fully reset and updated.");
    alert("Menuet er blevet opdateret!");
  } catch (error) {
    console.error("Error resetting menu:", error);
    alert("Der opstod en fejl under opdateringen.");
  }
};

//Partly upload for double checking
// export const resetAndUploadMenu = async () => {
//   const collectionRef = collection(db, "menuItems");

//   try {
//     console.log("Emptying collection...");

//     // 1. Get all current documents
//     const snapshot = await getDocs(collectionRef);

//     // 2. Delete existing items
//     const deleteBatch = writeBatch(db);
//     snapshot.docs.forEach((document) => {
//       deleteBatch.delete(document.ref);
//     });
//     await deleteBatch.commit();
//     console.log("Collection erased.");

//     // 3. Upload only the first 20 items
//     console.log("Uploading first 20 menu items for testing...");
//     const uploadBatch = writeBatch(db);

//     // .slice(0, 20) takes items from index 0 up to (but not including) 20
//     const limitedMenu = MENU.slice(100, 117);

//     console.log(limitedMenu);

//     limitedMenu.forEach((item) => {
//       // Logic from earlier: use item.id or generate one if missing
//       const docId = item.id || item.name.toLowerCase().replace(/\s+/g, "-");
//       const docRef = doc(db, "menuItems", docId);

//       uploadBatch.set(docRef, item);
//     });

//     await uploadBatch.commit();
//     console.log(`✅ Success! ${limitedMenu.length} items uploaded.`);
//     alert(`Menuet er opdateret med de første ${limitedMenu.length} emner!`);
//   } catch (error) {
//     console.error("Error resetting menu:", error);
//     alert("Der opstod en fejl under opdateringen.");
//   }
// };

export const verifyMenuSync = async () => {
  const collectionRef = collection(db, "menuItems");

  try {
    console.log("Checking synchronization...");

    // 1. Fetch all documents currently in Firebase
    const snapshot = await getDocs(collectionRef);
    const firebaseItems = snapshot.docs.map((doc) => doc.id);

    // 2. Extract IDs from your local MASTER_MENU
    const localItems = MENU.map((item) => item.id).filter(
      (id): id is string => id !== undefined,
    );

    // 3. Find missing items
    const missingInFirebase = localItems.filter(
      (id) => !firebaseItems.includes(id),
    );
    const extraInFirebase = firebaseItems.filter(
      (id) => !localItems.includes(id),
    );

    // 4. Report results
    console.log("--- Sync Report ---");
    console.log(`Local items: ${localItems.length}`);
    console.log(`Firebase items: ${firebaseItems.length}`);

    if (missingInFirebase.length === 0 && extraInFirebase.length === 0) {
      console.log("✅ Perfect Sync: Firebase matches your local MENU exactly.");
      alert("Alt er synkroniseret korrekt!");
    } else {
      if (missingInFirebase.length > 0) {
        console.warn("❌ Missing in Firebase:", missingInFirebase);
      }
      if (extraInFirebase.length > 0) {
        console.warn(
          "⚠️ Extra items in Firebase (not in local MENU):",
          extraInFirebase,
        );
      }
      alert(
        `Sync advarsel! Tjek konsollen for detaljer. Mangler: ${missingInFirebase.length}`,
      );
    }
  } catch (error) {
    console.error("Verification failed:", error);
  }
};

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

// export const updateMenuImages = async () => {
//   try {
//     console.log("Fixing image paths on existing items...");

//     const uploadBatch = writeBatch(db);

//     MENU.forEach((item) => {
//       const docRef = doc(db, "menuItems", item.id!);

//       uploadBatch.update(docRef, {
//         image: item.image, // only this field will change
//       });
//     });

//     await uploadBatch.commit();

//     console.log("✅ Success! All image fields updated.");
//     alert("Billederne er blevet rettet!");
//   } catch (error) {
//     console.error("Error updating images:", error);
//     alert("Der opstod en fejl under opdatering af billeder.");
//   }
// };

// export const addLargeImagesToMenu = () => {
//   MENU.forEach((item) => {
//     if (!item.image) return;

//     const base = item.image.replace(/\.jpeg$/i, "");
//     item.imageLarge = `${base}-large.jpeg`;
//   });

//   console.log("✅ imageLarge keys generated locally", MENU);
// };
