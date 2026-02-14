// Utility script to initialize products in Firebase
// Run this once to populate your Firestore with initial products

import { MENU } from "../services/menuItems";
import { createProduct } from "../services/productsService";

export async function initializeProducts() {
  try {
    console.log("Initializing products in Firebase...");

    for (const product of MENU) {
      await createProduct({
        category: product.category,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        imageLarge: product.imageLarge,
        size: product.size || [],
        type: product.type || [],
        chooseOne: product.chooseOne || [],
        addOns: product.addOns || [],
        addOnsExtra: product.addOnsExtra || [],
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
