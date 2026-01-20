// Utility script to initialize products in Firebase
// Run this once to populate your Firestore with initial products

import { createProduct } from "../services/productsService";
import { MENU } from "../pages/Menu";

export async function initializeProducts() {
  try {
    console.log("Initializing products in Firebase...");

    for (const product of MENU) {
      await createProduct({
        category: product.category,
        name: product.name,
        desc: product.desc,
        price: product.price,
        image: product.image,
        ingredients: product.ingredients || [],
      });
      console.log(`Created product: ${product.name}`);
    }

    console.log("All products initialized successfully!");
  } catch (error) {
    console.error("Error initializing products:", error);
    throw error;
  }
}

// To use this, you can call it from a component or create a separate script
// Example: await initializeProducts();
