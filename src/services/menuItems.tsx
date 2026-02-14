import type { Product } from "./productsService";

export const MENU: Product[] = [
  {
    id: "starters-bruschetta",
    category: "Starters",
    name: "Bruschetta",
    description: "Garlic bread with fresh tomato",
    price: 70,
    image: "bruschetta.jpeg",
    imageLarge: "bruschetta-large.jpeg",
  },
  {
    id: "starters-baked-shrimp",
    category: "Starters",
    name: "Baked Shrimp 6 pcs.",
    description: "With garlic dressing",
    price: 75,
    image: "baked-shrimp.jpeg",
    imageLarge: "baked-shrimp-large.jpeg",
  },
  {
    id: "starters-tzatziki",
    category: "Starters",
    name: "Tzatziki",
    description: "Yogurt with cucumber, dill and garlic",
    price: 69,
    image: "tzatziki.jpeg",
    imageLarge: "tzatziki-large.jpeg",
  },
  {
    id: "starters-gamberetti-aglio",
    category: "Starters",
    name: "Gamberetti a la Aglio",
    description: "Shrimp in garlic",
    price: 75,
    image: "shrimp-garlic.jpeg",
    imageLarge: "shrimp-garlic-large.jpeg",
  },
  {
    id: "starters-cocktail-gamberetti",
    category: "Starters",
    name: "Cocktail di Gamberetti",
    description: "Shrimp cocktail",
    price: 75,
    image: "shrimp-cocktail.jpeg",
    imageLarge: "shrimp-cocktail-large.jpeg",
  },
  {
    id: "p-margherita",
    category: "Pizza",
    name: "Margherita",
    description: "Tomato and cheese",
    price: 75,
    image: "margherita.jpeg",
    size: [
      {
        name: "Alm.",
        extraPrice: 75,
      },
      {
        name: "Whole grain",
        extraPrice: 85,
      },
      {
        name: "Deep Pan",
        extraPrice: 85,
      },
      {
        name: "2 people",
        extraPrice: 170,
      },
      {
        name: "Family",
        extraPrice: 170,
      },
    ],
    addOns: [
      {
        name: "Egg",
        extraPrice: 8,
      },
      {
        name: "Pineapple",
        extraPrice: 10,
      },
      {
        name: "Asparagus",
        extraPrice: 10,
      },
      {
        name: "Bacon",
        extraPrice: 12,
      },
      {
        name: "Mushroom",
        extraPrice: 10,
      },
      {
        name: "Chili",
        extraPrice: 6,
      },
      {
        name: "Cocktail sausages",
        extraPrice: 12,
      },
      {
        name: "Gorgonzola",
        extraPrice: 12,
      },
      {
        name: "Minced ham",
        extraPrice: 12,
      },
      {
        name: "Garlic",
        extraPrice: 6,
      },
      {
        name: "Kebab",
        extraPrice: 12,
      },
      {
        name: "Ketchup",
        extraPrice: 7,
      },
      {
        name: "Meatballs",
        extraPrice: 12,
      },
      {
        name: "Meat strips",
        extraPrice: 12,
      },
      {
        name: "Chicken",
        extraPrice: 12,
      },
      {
        name: "Onion",
        extraPrice: 8,
      },
      {
        name: "Air-dried Ham",
        extraPrice: 35,
      },
      {
        name: "Mayonnaise",
        extraPrice: 10,
      },
      {
        name: "Mussels",
        extraPrice: 12,
      },
      {
        name: "Beef fillet",
        extraPrice: 25,
      },
      {
        name: "Olives",
        extraPrice: 10,
      },
      {
        name: "Cheese",
        extraPrice: 12,
      },
      {
        name: "Paprika",
        extraPrice: 10,
      },
      {
        name: "Pepperoni",
        extraPrice: 12,
      },
      {
        name: "Prawns",
        extraPrice: 12,
      },
      {
        name: "Remoulade",
        extraPrice: 10,
      },
      {
        name: "Salad",
        extraPrice: 12,
      },
      {
        name: "Spaghetti",
        extraPrice: 10,
      },
      {
        name: "Tomato",
        extraPrice: 8,
      },
      {
        name: "Tuna",
        extraPrice: 20,
      },
    ],
    imageLarge: "margherita-large.jpeg",
  },
  {
    id: "p-vesuvio",
    category: "Pizza",
    name: "Vesuvio",
    description: "Tomato, cheese and chopped ham",
    price: 82,
    image: "vesuvio.jpeg",
    size: [
      {
        name: "Alm.",
        extraPrice: 82,
      },
      {
        name: "Whole grain",
        extraPrice: 92,
      },
      {
        name: "Deep Pan",
        extraPrice: 92,
      },
      {
        name: "2 people",
        extraPrice: 170,
      },
      {
        name: "Family",
        extraPrice: 180,
      },
    ],
    addOns: [
      {
        name: "Egg",
        extraPrice: 8,
      },
      {
        name: "Pineapple",
        extraPrice: 10,
      },
      {
        name: "Asparagus",
        extraPrice: 10,
      },
      {
        name: "Bacon",
        extraPrice: 12,
      },
      {
        name: "Mushroom",
        extraPrice: 10,
      },
      {
        name: "Chili",
        extraPrice: 6,
      },
      {
        name: "Cocktail sausages",
        extraPrice: 12,
      },
      {
        name: "Gorgonzola",
        extraPrice: 12,
      },
      {
        name: "Minced ham",
        extraPrice: 12,
      },
      {
        name: "Garlic",
        extraPrice: 6,
      },
      {
        name: "Kebab",
        extraPrice: 12,
      },
      {
        name: "Ketchup",
        extraPrice: 7,
      },
      {
        name: "Meatballs",
        extraPrice: 12,
      },
      {
        name: "Meat strips",
        extraPrice: 12,
      },
      {
        name: "Chicken",
        extraPrice: 12,
      },
      {
        name: "Onion",
        extraPrice: 8,
      },
      {
        name: "Air-dried Ham",
        extraPrice: 35,
      },
      {
        name: "Mayonnaise",
        extraPrice: 10,
      },
      {
        name: "Mussels",
        extraPrice: 12,
      },
      {
        name: "Beef fillet",
        extraPrice: 25,
      },
      {
        name: "Olives",
        extraPrice: 10,
      },
      {
        name: "Cheese",
        extraPrice: 12,
      },
      {
        name: "Paprika",
        extraPrice: 10,
      },
      {
        name: "Pepperoni",
        extraPrice: 12,
      },
      {
        name: "Prawns",
        extraPrice: 12,
      },
      {
        name: "Remoulade",
        extraPrice: 10,
      },
      {
        name: "Salad",
        extraPrice: 12,
      },
      {
        name: "Spaghetti",
        extraPrice: 10,
      },
      {
        name: "Tomato",
        extraPrice: 8,
      },
      {
        name: "Tuna",
        extraPrice: 20,
      },
    ],
    imageLarge: "vesuvio-large.jpeg",
  },
  {
    id: "p-hawaii",
    category: "Pizza",
    name: "Hawaii",
    description: "Tomato, cheese, chopped ham and pineapple",
    price: 85,
    image: "hawaii.jpeg",
    size: [
      {
        name: "Alm.",
        extraPrice: 85,
      },
      {
        name: "Whole grain",
        extraPrice: 90,
      },
      {
        name: "Deep Pan",
        extraPrice: 90,
      },
      {
        name: "2 people",
        extraPrice: 160,
      },
      {
        name: "Family",
        extraPrice: 185,
      },
    ],
    addOns: [
      {
        name: "Egg",
        extraPrice: 8,
      },
      {
        name: "Pineapple",
        extraPrice: 10,
      },
      {
        name: "Asparagus",
        extraPrice: 10,
      },
      {
        name: "Bacon",
        extraPrice: 12,
      },
      {
        name: "Mushroom",
        extraPrice: 10,
      },
      {
        name: "Chili",
        extraPrice: 6,
      },
      {
        name: "Cocktail sausages",
        extraPrice: 12,
      },
      {
        name: "Gorgonzola",
        extraPrice: 12,
      },
      {
        name: "Minced ham",
        extraPrice: 12,
      },
      {
        name: "Garlic",
        extraPrice: 6,
      },
      {
        name: "Kebab",
        extraPrice: 12,
      },
      {
        name: "Ketchup",
        extraPrice: 7,
      },
      {
        name: "Meatballs",
        extraPrice: 12,
      },
      {
        name: "Meat strips",
        extraPrice: 12,
      },
      {
        name: "Chicken",
        extraPrice: 12,
      },
      {
        name: "Onion",
        extraPrice: 8,
      },
      {
        name: "Air-dried Ham",
        extraPrice: 35,
      },
      {
        name: "Mayonnaise",
        extraPrice: 10,
      },
      {
        name: "Mussels",
        extraPrice: 12,
      },
      {
        name: "Beef fillet",
        extraPrice: 25,
      },
      {
        name: "Olives",
        extraPrice: 10,
      },
      {
        name: "Cheese",
        extraPrice: 12,
      },
      {
        name: "Paprika",
        extraPrice: 10,
      },
      {
        name: "Pepperoni",
        extraPrice: 12,
      },
      {
        name: "Prawns",
        extraPrice: 12,
      },
      {
        name: "Remoulade",
        extraPrice: 10,
      },
      {
        name: "Salad",
        extraPrice: 12,
      },
      {
        name: "Spaghetti",
        extraPrice: 10,
      },
      {
        name: "Tomato",
        extraPrice: 8,
      },
      {
        name: "Tuna",
        extraPrice: 20,
      },
    ],
    imageLarge: "hawaii-large.jpeg",
  },
  {
    id: "p-capricciosa",
    category: "Pizza",
    name: "Capricciosa",
    description: "Tomato, cheese, chopped ham and mushrooms",
    price: 85,
    image: "capricciosa.jpeg",
    size: [
      {
        name: "Alm.",
        extraPrice: 85,
      },
      {
        name: "Whole grain",
        extraPrice: 90,
      },
      {
        name: "Deep Pan",
        extraPrice: 90,
      },
      {
        name: "2 people",
        extraPrice: 160,
      },
      {
        name: "Family",
        extraPrice: 185,
      },
    ],
    addOns: [
      {
        name: "Egg",
        extraPrice: 8,
      },
      {
        name: "Pineapple",
        extraPrice: 10,
      },
      {
        name: "Asparagus",
        extraPrice: 10,
      },
      {
        name: "Bacon",
        extraPrice: 12,
      },
      {
        name: "Mushroom",
        extraPrice: 10,
      },
      {
        name: "Chili",
        extraPrice: 6,
      },
      {
        name: "Cocktail sausages",
        extraPrice: 12,
      },
      {
        name: "Gorgonzola",
        extraPrice: 12,
      },
      {
        name: "Minced ham",
        extraPrice: 12,
      },
      {
        name: "Garlic",
        extraPrice: 6,
      },
      {
        name: "Kebab",
        extraPrice: 12,
      },
      {
        name: "Ketchup",
        extraPrice: 7,
      },
      {
        name: "Meatballs",
        extraPrice: 12,
      },
      {
        name: "Meat strips",
        extraPrice: 12,
      },
      {
        name: "Chicken",
        extraPrice: 12,
      },
      {
        name: "Onion",
        extraPrice: 8,
      },
      {
        name: "Air-dried Ham",
        extraPrice: 35,
      },
      {
        name: "Mayonnaise",
        extraPrice: 10,
      },
      {
        name: "Mussels",
        extraPrice: 12,
      },
      {
        name: "Beef fillet",
        extraPrice: 25,
      },
      {
        name: "Olives",
        extraPrice: 10,
      },
      {
        name: "Cheese",
        extraPrice: 12,
      },
      {
        name: "Paprika",
        extraPrice: 10,
      },
      {
        name: "Pepperoni",
        extraPrice: 12,
      },
      {
        name: "Prawns",
        extraPrice: 12,
      },
      {
        name: "Remoulade",
        extraPrice: 10,
      },
      {
        name: "Salad",
        extraPrice: 12,
      },
      {
        name: "Spaghetti",
        extraPrice: 10,
      },
      {
        name: "Tomato",
        extraPrice: 8,
      },
      {
        name: "Tuna",
        extraPrice: 20,
      },
    ],
    imageLarge: "capricciosa-large.jpeg",
  },
  {
    id: "p-hellas",
    category: "Pizza",
    name: "Hellas",
    description: "Tomato, cheese, meat sauce and onion",
    price: 85,
    image: "hellas.jpeg",
    size: [
      {
        name: "Alm.",
        extraPrice: 85,
      },
      {
        name: "Whole grain",
        extraPrice: 95,
      },
      {
        name: "Deep Pan",
        extraPrice: 95,
      },
      {
        name: "2 people",
        extraPrice: 170,
      },
      {
        name: "Family",
        extraPrice: 195,
      },
    ],
    addOns: [
      {
        name: "Egg",
        extraPrice: 8,
      },
      {
        name: "Pineapple",
        extraPrice: 10,
      },
      {
        name: "Asparagus",
        extraPrice: 10,
      },
      {
        name: "Bacon",
        extraPrice: 12,
      },
      {
        name: "Mushroom",
        extraPrice: 10,
      },
      {
        name: "Chili",
        extraPrice: 6,
      },
      {
        name: "Cocktail sausages",
        extraPrice: 12,
      },
      {
        name: "Gorgonzola",
        extraPrice: 12,
      },
      {
        name: "Minced ham",
        extraPrice: 12,
      },
      {
        name: "Garlic",
        extraPrice: 6,
      },
      {
        name: "Kebab",
        extraPrice: 12,
      },
      {
        name: "Ketchup",
        extraPrice: 7,
      },
      {
        name: "Meatballs",
        extraPrice: 12,
      },
      {
        name: "Meat strips",
        extraPrice: 12,
      },
      {
        name: "Chicken",
        extraPrice: 12,
      },
      {
        name: "Onion",
        extraPrice: 8,
      },
      {
        name: "Air-dried Ham",
        extraPrice: 35,
      },
      {
        name: "Mayonnaise",
        extraPrice: 10,
      },
      {
        name: "Mussels",
        extraPrice: 12,
      },
      {
        name: "Beef fillet",
        extraPrice: 25,
      },
      {
        name: "Olives",
        extraPrice: 10,
      },
      {
        name: "Cheese",
        extraPrice: 12,
      },
      {
        name: "Paprika",
        extraPrice: 10,
      },
      {
        name: "Pepperoni",
        extraPrice: 12,
      },
      {
        name: "Prawns",
        extraPrice: 12,
      },
      {
        name: "Remoulade",
        extraPrice: 10,
      },
      {
        name: "Salad",
        extraPrice: 12,
      },
      {
        name: "Spaghetti",
        extraPrice: 10,
      },
      {
        name: "Tomato",
        extraPrice: 8,
      },
      {
        name: "Tuna",
        extraPrice: 20,
      },
    ],
    imageLarge: "hellas-large.jpeg",
  },
  {
    id: "p-juventus",
    category: "Pizza",
    name: "Juventus",
    description: "Tomato, cheese and pepperoni",
    price: 82,
    image: "juventus.jpeg",
    size: [
      {
        name: "Alm.",
        extraPrice: 82,
      },
      {
        name: "Whole grain",
        extraPrice: 92,
      },
      {
        name: "Deep Pan",
        extraPrice: 92,
      },
      {
        name: "2 people",
        extraPrice: 170,
      },
      {
        name: "Family",
        extraPrice: 190,
      },
    ],
    addOns: [
      {
        name: "Egg",
        extraPrice: 8,
      },
      {
        name: "Pineapple",
        extraPrice: 10,
      },
      {
        name: "Asparagus",
        extraPrice: 10,
      },
      {
        name: "Bacon",
        extraPrice: 12,
      },
      {
        name: "Mushroom",
        extraPrice: 10,
      },
      {
        name: "Chili",
        extraPrice: 6,
      },
      {
        name: "Cocktail sausages",
        extraPrice: 12,
      },
      {
        name: "Gorgonzola",
        extraPrice: 12,
      },
      {
        name: "Minced ham",
        extraPrice: 12,
      },
      {
        name: "Garlic",
        extraPrice: 6,
      },
      {
        name: "Kebab",
        extraPrice: 12,
      },
      {
        name: "Ketchup",
        extraPrice: 7,
      },
      {
        name: "Meatballs",
        extraPrice: 12,
      },
      {
        name: "Meat strips",
        extraPrice: 12,
      },
      {
        name: "Chicken",
        extraPrice: 12,
      },
      {
        name: "Onion",
        extraPrice: 8,
      },
      {
        name: "Air-dried Ham",
        extraPrice: 35,
      },
      {
        name: "Mayonnaise",
        extraPrice: 10,
      },
      {
        name: "Mussels",
        extraPrice: 12,
      },
      {
        name: "Beef fillet",
        extraPrice: 25,
      },
      {
        name: "Olives",
        extraPrice: 10,
      },
      {
        name: "Cheese",
        extraPrice: 12,
      },
      {
        name: "Paprika",
        extraPrice: 10,
      },
      {
        name: "Pepperoni",
        extraPrice: 12,
      },
      {
        name: "Prawns",
        extraPrice: 12,
      },
      {
        name: "Remoulade",
        extraPrice: 10,
      },
      {
        name: "Salad",
        extraPrice: 12,
      },
      {
        name: "Spaghetti",
        extraPrice: 10,
      },
      {
        name: "Tomato",
        extraPrice: 8,
      },
      {
        name: "Tuna",
        extraPrice: 20,
      },
    ],
    imageLarge: "juventus-large.jpeg",
  },
  {
    id: "p-roma",
    category: "Pizza",
    name: "Roma",
    description: "Tomato, cheese, chopped ham and pepperoni",
    price: 89,
    image: "roma.jpeg",
    size: [
      {
        name: "Alm.",
        extraPrice: 89,
      },
      {
        name: "Whole grain",
        extraPrice: 99,
      },
      {
        name: "Deep Pan",
        extraPrice: 99,
      },
      {
        name: "2 people",
        extraPrice: 170,
      },
      {
        name: "Family",
        extraPrice: 195,
      },
    ],
    addOns: [
      {
        name: "Egg",
        extraPrice: 8,
      },
      {
        name: "Pineapple",
        extraPrice: 10,
      },
      {
        name: "Asparagus",
        extraPrice: 10,
      },
      {
        name: "Bacon",
        extraPrice: 12,
      },
      {
        name: "Mushroom",
        extraPrice: 10,
      },
      {
        name: "Chili",
        extraPrice: 6,
      },
      {
        name: "Cocktail sausages",
        extraPrice: 12,
      },
      {
        name: "Gorgonzola",
        extraPrice: 12,
      },
      {
        name: "Minced ham",
        extraPrice: 12,
      },
      {
        name: "Garlic",
        extraPrice: 6,
      },
      {
        name: "Kebab",
        extraPrice: 12,
      },
      {
        name: "Ketchup",
        extraPrice: 7,
      },
      {
        name: "Meatballs",
        extraPrice: 12,
      },
      {
        name: "Meat strips",
        extraPrice: 12,
      },
      {
        name: "Chicken",
        extraPrice: 12,
      },
      {
        name: "Onion",
        extraPrice: 8,
      },
      {
        name: "Air-dried Ham",
        extraPrice: 35,
      },
      {
        name: "Mayonnaise",
        extraPrice: 10,
      },
      {
        name: "Mussels",
        extraPrice: 12,
      },
      {
        name: "Beef fillet",
        extraPrice: 25,
      },
      {
        name: "Olives",
        extraPrice: 10,
      },
      {
        name: "Cheese",
        extraPrice: 12,
      },
      {
        name: "Paprika",
        extraPrice: 10,
      },
      {
        name: "Pepperoni",
        extraPrice: 12,
      },
      {
        name: "Prawns",
        extraPrice: 12,
      },
      {
        name: "Remoulade",
        extraPrice: 10,
      },
      {
        name: "Salad",
        extraPrice: 12,
      },
      {
        name: "Spaghetti",
        extraPrice: 10,
      },
      {
        name: "Tomato",
        extraPrice: 8,
      },
      {
        name: "Tuna",
        extraPrice: 20,
      },
    ],
    imageLarge: "roma-large.jpeg",
  },
  {
    id: "p-calzone",
    category: "Pizza",
    name: "Calzone (Baked in)",
    description: "Tomato, cheese and chopped ham",
    price: 85,
    image: "calzone.jpeg",
    size: [
      {
        name: "Alm.",
        extraPrice: 85,
      },
      {
        name: "Whole grain",
        extraPrice: 95,
      },
    ],
    addOns: [
      {
        name: "Egg",
        extraPrice: 8,
      },
      {
        name: "Pineapple",
        extraPrice: 10,
      },
      {
        name: "Asparagus",
        extraPrice: 10,
      },
      {
        name: "Bacon",
        extraPrice: 12,
      },
      {
        name: "Mushroom",
        extraPrice: 10,
      },
      {
        name: "Chili",
        extraPrice: 6,
      },
      {
        name: "Cocktail sausages",
        extraPrice: 12,
      },
      {
        name: "Gorgonzola",
        extraPrice: 12,
      },
      {
        name: "Minced ham",
        extraPrice: 12,
      },
      {
        name: "Garlic",
        extraPrice: 6,
      },
      {
        name: "Kebab",
        extraPrice: 12,
      },
      {
        name: "Ketchup",
        extraPrice: 7,
      },
      {
        name: "Meatballs",
        extraPrice: 12,
      },
      {
        name: "Meat strips",
        extraPrice: 12,
      },
      {
        name: "Chicken",
        extraPrice: 12,
      },
      {
        name: "Onion",
        extraPrice: 8,
      },
      {
        name: "Air-dried Ham",
        extraPrice: 35,
      },
      {
        name: "Mayonnaise",
        extraPrice: 10,
      },
      {
        name: "Mussels",
        extraPrice: 12,
      },
      {
        name: "Beef fillet",
        extraPrice: 25,
      },
      {
        name: "Olives",
        extraPrice: 10,
      },
      {
        name: "Cheese",
        extraPrice: 12,
      },
      {
        name: "Paprika",
        extraPrice: 10,
      },
      {
        name: "Pepperoni",
        extraPrice: 12,
      },
      {
        name: "Prawns",
        extraPrice: 12,
      },
      {
        name: "Remoulade",
        extraPrice: 10,
      },
      {
        name: "Salad",
        extraPrice: 12,
      },
      {
        name: "Spaghetti",
        extraPrice: 10,
      },
      {
        name: "Tomato",
        extraPrice: 8,
      },
      {
        name: "Tuna",
        extraPrice: 20,
      },
    ],
    imageLarge: "calzone-large.jpeg",
  },
  {
    id: "p-palermo",
    category: "Pizza",
    name: "Palermo",
    description: "Tomato, cheese, kebab, bacon and pepperoni",
    price: 92,
    image: "palermo.jpeg",
    size: [
      {
        name: "Alm.",
        extraPrice: 92,
      },
      {
        name: "Whole grain",
        extraPrice: 102,
      },
      {
        name: "Deep Pan",
        extraPrice: 102,
      },
      {
        name: "2 people",
        extraPrice: 170,
      },
      {
        name: "Family",
        extraPrice: 200,
      },
    ],
    addOns: [
      {
        name: "Egg",
        extraPrice: 8,
      },
      {
        name: "Pineapple",
        extraPrice: 10,
      },
      {
        name: "Asparagus",
        extraPrice: 10,
      },
      {
        name: "Bacon",
        extraPrice: 12,
      },
      {
        name: "Mushroom",
        extraPrice: 10,
      },
      {
        name: "Chili",
        extraPrice: 6,
      },
      {
        name: "Cocktail sausages",
        extraPrice: 12,
      },
      {
        name: "Gorgonzola",
        extraPrice: 12,
      },
      {
        name: "Minced ham",
        extraPrice: 12,
      },
      {
        name: "Garlic",
        extraPrice: 6,
      },
      {
        name: "Kebab",
        extraPrice: 12,
      },
      {
        name: "Ketchup",
        extraPrice: 7,
      },
      {
        name: "Meatballs",
        extraPrice: 12,
      },
      {
        name: "Meat strips",
        extraPrice: 12,
      },
      {
        name: "Chicken",
        extraPrice: 12,
      },
      {
        name: "Onion",
        extraPrice: 8,
      },
      {
        name: "Air-dried Ham",
        extraPrice: 35,
      },
      {
        name: "Mayonnaise",
        extraPrice: 10,
      },
      {
        name: "Mussels",
        extraPrice: 12,
      },
      {
        name: "Beef fillet",
        extraPrice: 25,
      },
      {
        name: "Olives",
        extraPrice: 10,
      },
      {
        name: "Cheese",
        extraPrice: 12,
      },
      {
        name: "Paprika",
        extraPrice: 10,
      },
      {
        name: "Pepperoni",
        extraPrice: 12,
      },
      {
        name: "Prawns",
        extraPrice: 12,
      },
      {
        name: "Remoulade",
        extraPrice: 10,
      },
      {
        name: "Salad",
        extraPrice: 12,
      },
      {
        name: "Spaghetti",
        extraPrice: 10,
      },
      {
        name: "Tomato",
        extraPrice: 8,
      },
      {
        name: "Tuna",
        extraPrice: 20,
      },
    ],
    imageLarge: "palermo-large.jpeg",
  },
  {
    id: "p-avanos",
    category: "Pizza",
    name: "Avanos",
    description: "Tomato, cheese, salad and dressing",
    price: 100,
    image: "avanos.jpeg",
    size: [
      {
        name: "Alm.",
        extraPrice: 92,
      },
      {
        name: "Whole grain",
        extraPrice: 102,
      },
      {
        name: "Deep Pan",
        extraPrice: 102,
      },
      {
        name: "2 people",
        extraPrice: 170,
      },
      {
        name: "Family",
        extraPrice: 200,
      },
    ],
    type: [
      {
        name: "Kebab",
        extraPrice: 0,
      },
      {
        name: "Chicken",
        extraPrice: 0,
      },
      {
        name: "Minced Ham",
        extraPrice: 0,
      },
    ],
    addOns: [
      {
        name: "Egg",
        extraPrice: 8,
      },
      {
        name: "Pineapple",
        extraPrice: 10,
      },
      {
        name: "Asparagus",
        extraPrice: 10,
      },
      {
        name: "Bacon",
        extraPrice: 12,
      },
      {
        name: "Mushroom",
        extraPrice: 10,
      },
      {
        name: "Chili",
        extraPrice: 6,
      },
      {
        name: "Cocktail sausages",
        extraPrice: 12,
      },
      {
        name: "Gorgonzola",
        extraPrice: 12,
      },
      {
        name: "Minced ham",
        extraPrice: 12,
      },
      {
        name: "Garlic",
        extraPrice: 6,
      },
      {
        name: "Kebab",
        extraPrice: 12,
      },
      {
        name: "Ketchup",
        extraPrice: 7,
      },
      {
        name: "Meatballs",
        extraPrice: 12,
      },
      {
        name: "Meat strips",
        extraPrice: 12,
      },
      {
        name: "Chicken",
        extraPrice: 12,
      },
      {
        name: "Onion",
        extraPrice: 8,
      },
      {
        name: "Air-dried Ham",
        extraPrice: 35,
      },
      {
        name: "Mayonnaise",
        extraPrice: 10,
      },
      {
        name: "Mussels",
        extraPrice: 12,
      },
      {
        name: "Beef fillet",
        extraPrice: 25,
      },
      {
        name: "Olives",
        extraPrice: 10,
      },
      {
        name: "Cheese",
        extraPrice: 12,
      },
      {
        name: "Paprika",
        extraPrice: 10,
      },
      {
        name: "Pepperoni",
        extraPrice: 12,
      },
      {
        name: "Prawns",
        extraPrice: 12,
      },
      {
        name: "Remoulade",
        extraPrice: 10,
      },
      {
        name: "Salad",
        extraPrice: 12,
      },
      {
        name: "Spaghetti",
        extraPrice: 10,
      },
      {
        name: "Tomato",
        extraPrice: 8,
      },
      {
        name: "Tuna",
        extraPrice: 20,
      },
    ],
    imageLarge: "avanos-large.jpeg",
  },
  {
    id: "p-parma",
    category: "Pizza",
    name: "Parma",
    description: "Tomato, cheese, air-dried ham, gorgonzola, arugula and pesto",
    price: 100,
    image: "parma.jpeg",
    size: [
      {
        name: "Alm.",
        extraPrice: 100,
      },
      {
        name: "Whole grain",
        extraPrice: 110,
      },
      {
        name: "Deep Pan",
        extraPrice: 110,
      },
      {
        name: "Family",
        extraPrice: 210,
      },
    ],
    addOns: [
      {
        name: "Egg",
        extraPrice: 8,
      },
      {
        name: "Pineapple",
        extraPrice: 10,
      },
      {
        name: "Asparagus",
        extraPrice: 10,
      },
      {
        name: "Bacon",
        extraPrice: 12,
      },
      {
        name: "Mushroom",
        extraPrice: 10,
      },
      {
        name: "Chili",
        extraPrice: 6,
      },
      {
        name: "Cocktail sausages",
        extraPrice: 12,
      },
      {
        name: "Gorgonzola",
        extraPrice: 12,
      },
      {
        name: "Minced ham",
        extraPrice: 12,
      },
      {
        name: "Garlic",
        extraPrice: 6,
      },
      {
        name: "Kebab",
        extraPrice: 12,
      },
      {
        name: "Ketchup",
        extraPrice: 7,
      },
      {
        name: "Meatballs",
        extraPrice: 12,
      },
      {
        name: "Meat strips",
        extraPrice: 12,
      },
      {
        name: "Chicken",
        extraPrice: 12,
      },
      {
        name: "Onion",
        extraPrice: 8,
      },
      {
        name: "Air-dried Ham",
        extraPrice: 35,
      },
      {
        name: "Mayonnaise",
        extraPrice: 10,
      },
      {
        name: "Mussels",
        extraPrice: 12,
      },
      {
        name: "Beef fillet",
        extraPrice: 25,
      },
      {
        name: "Olives",
        extraPrice: 10,
      },
      {
        name: "Cheese",
        extraPrice: 12,
      },
      {
        name: "Paprika",
        extraPrice: 10,
      },
      {
        name: "Pepperoni",
        extraPrice: 12,
      },
      {
        name: "Prawns",
        extraPrice: 12,
      },
      {
        name: "Remoulade",
        extraPrice: 10,
      },
      {
        name: "Salad",
        extraPrice: 12,
      },
      {
        name: "Spaghetti",
        extraPrice: 10,
      },
      {
        name: "Tomato",
        extraPrice: 8,
      },
      {
        name: "Tuna",
        extraPrice: 20,
      },
    ],
    imageLarge: "parma-large.jpeg",
  },
  {
    id: "p-meatlover",
    category: "Pizza",
    name: "Meat Lover",
    description:
      "Tomato, cheese, kebab, chicken, pepperoni, cocktail sausages and bacon",
    price: 110,
    image: "meat-lover.jpeg",
    size: [
      {
        name: "Alm.",
        extraPrice: 110,
      },
      {
        name: "Whole grain",
        extraPrice: 120,
      },
      {
        name: "Deep Pan",
        extraPrice: 120,
      },
      {
        name: "2 people",
        extraPrice: 170,
      },
      {
        name: "Family",
        extraPrice: 229,
      },
    ],
    addOns: [
      {
        name: "Egg",
        extraPrice: 8,
      },
      {
        name: "Pineapple",
        extraPrice: 10,
      },
      {
        name: "Asparagus",
        extraPrice: 10,
      },
      {
        name: "Bacon",
        extraPrice: 12,
      },
      {
        name: "Mushroom",
        extraPrice: 10,
      },
      {
        name: "Chili",
        extraPrice: 6,
      },
      {
        name: "Cocktail sausages",
        extraPrice: 12,
      },
      {
        name: "Gorgonzola",
        extraPrice: 12,
      },
      {
        name: "Minced ham",
        extraPrice: 12,
      },
      {
        name: "Garlic",
        extraPrice: 6,
      },
      {
        name: "Kebab",
        extraPrice: 12,
      },
      {
        name: "Ketchup",
        extraPrice: 7,
      },
      {
        name: "Meatballs",
        extraPrice: 12,
      },
      {
        name: "Meat strips",
        extraPrice: 12,
      },
      {
        name: "Chicken",
        extraPrice: 12,
      },
      {
        name: "Onion",
        extraPrice: 8,
      },
      {
        name: "Air-dried Ham",
        extraPrice: 35,
      },
      {
        name: "Mayonnaise",
        extraPrice: 10,
      },
      {
        name: "Mussels",
        extraPrice: 12,
      },
      {
        name: "Beef fillet",
        extraPrice: 25,
      },
      {
        name: "Olives",
        extraPrice: 10,
      },
      {
        name: "Cheese",
        extraPrice: 12,
      },
      {
        name: "Paprika",
        extraPrice: 10,
      },
      {
        name: "Pepperoni",
        extraPrice: 12,
      },
      {
        name: "Prawns",
        extraPrice: 12,
      },
      {
        name: "Remoulade",
        extraPrice: 10,
      },
      {
        name: "Salad",
        extraPrice: 12,
      },
      {
        name: "Spaghetti",
        extraPrice: 10,
      },
      {
        name: "Tomato",
        extraPrice: 8,
      },
      {
        name: "Tuna",
        extraPrice: 20,
      },
    ],
    imageLarge: "meat-lover-large.jpeg",
  },
  {
    id: "p-santa",
    category: "Pizza",
    name: "Santa",
    description: "Tomato, cheese, chopped ham, bacon and egg",
    price: 89,
    image: "santa.jpeg",
    size: [
      {
        name: "Alm.",
        extraPrice: 89,
      },
      {
        name: "Whole grain",
        extraPrice: 99,
      },
      {
        name: "Deep Pan",
        extraPrice: 99,
      },
      {
        name: "2 people",
        extraPrice: 170,
      },
      {
        name: "Family",
        extraPrice: 195,
      },
    ],
    addOns: [
      {
        name: "Egg",
        extraPrice: 8,
      },
      {
        name: "Pineapple",
        extraPrice: 10,
      },
      {
        name: "Asparagus",
        extraPrice: 10,
      },
      {
        name: "Bacon",
        extraPrice: 12,
      },
      {
        name: "Mushroom",
        extraPrice: 10,
      },
      {
        name: "Chili",
        extraPrice: 6,
      },
      {
        name: "Cocktail sausages",
        extraPrice: 12,
      },
      {
        name: "Gorgonzola",
        extraPrice: 12,
      },
      {
        name: "Minced ham",
        extraPrice: 12,
      },
      {
        name: "Garlic",
        extraPrice: 6,
      },
      {
        name: "Kebab",
        extraPrice: 12,
      },
      {
        name: "Ketchup",
        extraPrice: 7,
      },
      {
        name: "Meatballs",
        extraPrice: 12,
      },
      {
        name: "Meat strips",
        extraPrice: 12,
      },
      {
        name: "Chicken",
        extraPrice: 12,
      },
      {
        name: "Onion",
        extraPrice: 8,
      },
      {
        name: "Air-dried Ham",
        extraPrice: 35,
      },
      {
        name: "Mayonnaise",
        extraPrice: 10,
      },
      {
        name: "Mussels",
        extraPrice: 12,
      },
      {
        name: "Beef fillet",
        extraPrice: 25,
      },
      {
        name: "Olives",
        extraPrice: 10,
      },
      {
        name: "Cheese",
        extraPrice: 12,
      },
      {
        name: "Paprika",
        extraPrice: 10,
      },
      {
        name: "Pepperoni",
        extraPrice: 12,
      },
      {
        name: "Prawns",
        extraPrice: 12,
      },
      {
        name: "Remoulade",
        extraPrice: 10,
      },
      {
        name: "Salad",
        extraPrice: 12,
      },
      {
        name: "Spaghetti",
        extraPrice: 10,
      },
      {
        name: "Tomato",
        extraPrice: 8,
      },
      {
        name: "Tuna",
        extraPrice: 20,
      },
    ],
    imageLarge: "santa-large.jpeg",
  },
  {
    id: "p-xanthos-special",
    category: "Pizza",
    name: "Xanthos Special",
    description: "Tomato, cheese, chopped ham, kebab and béarnaise sauce",
    price: 95,
    image: "xanthos-special.jpeg",
    size: [
      {
        name: "Alm.",
        extraPrice: 95,
      },
      {
        name: "Whole grain",
        extraPrice: 105,
      },
      {
        name: "Deep Pan",
        extraPrice: 105,
      },
      {
        name: "2 people",
        extraPrice: 170,
      },
      {
        name: "Family",
        extraPrice: 205,
      },
    ],
    addOns: [
      {
        name: "Egg",
        extraPrice: 8,
      },
      {
        name: "Pineapple",
        extraPrice: 10,
      },
      {
        name: "Asparagus",
        extraPrice: 10,
      },
      {
        name: "Bacon",
        extraPrice: 12,
      },
      {
        name: "Mushroom",
        extraPrice: 10,
      },
      {
        name: "Chili",
        extraPrice: 6,
      },
      {
        name: "Cocktail sausages",
        extraPrice: 12,
      },
      {
        name: "Gorgonzola",
        extraPrice: 12,
      },
      {
        name: "Minced ham",
        extraPrice: 12,
      },
      {
        name: "Garlic",
        extraPrice: 6,
      },
      {
        name: "Kebab",
        extraPrice: 12,
      },
      {
        name: "Ketchup",
        extraPrice: 7,
      },
      {
        name: "Meatballs",
        extraPrice: 12,
      },
      {
        name: "Meat strips",
        extraPrice: 12,
      },
      {
        name: "Chicken",
        extraPrice: 12,
      },
      {
        name: "Onion",
        extraPrice: 8,
      },
      {
        name: "Air-dried Ham",
        extraPrice: 35,
      },
      {
        name: "Mayonnaise",
        extraPrice: 10,
      },
      {
        name: "Mussels",
        extraPrice: 12,
      },
      {
        name: "Beef fillet",
        extraPrice: 25,
      },
      {
        name: "Olives",
        extraPrice: 10,
      },
      {
        name: "Cheese",
        extraPrice: 12,
      },
      {
        name: "Paprika",
        extraPrice: 10,
      },
      {
        name: "Pepperoni",
        extraPrice: 12,
      },
      {
        name: "Prawns",
        extraPrice: 12,
      },
      {
        name: "Remoulade",
        extraPrice: 10,
      },
      {
        name: "Salad",
        extraPrice: 12,
      },
      {
        name: "Spaghetti",
        extraPrice: 10,
      },
      {
        name: "Tomato",
        extraPrice: 8,
      },
      {
        name: "Tuna",
        extraPrice: 20,
      },
    ],
    imageLarge: "xanthos-special-large.jpeg",
  },
  {
    id: "p-valentino",
    category: "Pizza",
    name: "Valentino",
    description: "Tomato, cheese, chicken, bacon, pineapple and curry",
    price: 95,
    image: "valentino.jpeg",
    size: [
      {
        name: "Alm.",
        extraPrice: 95,
      },
      {
        name: "Whole grain",
        extraPrice: 105,
      },
      {
        name: "Deep Pan",
        extraPrice: 105,
      },
      {
        name: "2 people",
        extraPrice: 170,
      },
      {
        name: "Family",
        extraPrice: 205,
      },
    ],
    addOns: [
      {
        name: "Egg",
        extraPrice: 8,
      },
      {
        name: "Pineapple",
        extraPrice: 10,
      },
      {
        name: "Asparagus",
        extraPrice: 10,
      },
      {
        name: "Bacon",
        extraPrice: 12,
      },
      {
        name: "Mushroom",
        extraPrice: 10,
      },
      {
        name: "Chili",
        extraPrice: 6,
      },
      {
        name: "Cocktail sausages",
        extraPrice: 12,
      },
      {
        name: "Gorgonzola",
        extraPrice: 12,
      },
      {
        name: "Minced ham",
        extraPrice: 12,
      },
      {
        name: "Garlic",
        extraPrice: 6,
      },
      {
        name: "Kebab",
        extraPrice: 12,
      },
      {
        name: "Ketchup",
        extraPrice: 7,
      },
      {
        name: "Meatballs",
        extraPrice: 12,
      },
      {
        name: "Meat strips",
        extraPrice: 12,
      },
      {
        name: "Chicken",
        extraPrice: 12,
      },
      {
        name: "Onion",
        extraPrice: 8,
      },
      {
        name: "Air-dried Ham",
        extraPrice: 35,
      },
      {
        name: "Mayonnaise",
        extraPrice: 10,
      },
      {
        name: "Mussels",
        extraPrice: 12,
      },
      {
        name: "Beef fillet",
        extraPrice: 25,
      },
      {
        name: "Olives",
        extraPrice: 10,
      },
      {
        name: "Cheese",
        extraPrice: 12,
      },
      {
        name: "Paprika",
        extraPrice: 10,
      },
      {
        name: "Pepperoni",
        extraPrice: 12,
      },
      {
        name: "Prawns",
        extraPrice: 12,
      },
      {
        name: "Remoulade",
        extraPrice: 10,
      },
      {
        name: "Salad",
        extraPrice: 12,
      },
      {
        name: "Spaghetti",
        extraPrice: 10,
      },
      {
        name: "Tomato",
        extraPrice: 8,
      },
      {
        name: "Tuna",
        extraPrice: 20,
      },
    ],
    imageLarge: "valentino-large.jpeg",
  },
  {
    id: "p-vegetariana",
    category: "Pizza",
    name: "Vegetariana",
    description:
      "Tomato, cheese, mushrooms, peppers, onions, pineapple and olives",
    price: 95,
    image: "vegetariana.jpeg",
    size: [
      {
        name: "Alm.",
        extraPrice: 95,
      },
      {
        name: "Whole grain",
        extraPrice: 105,
      },
      {
        name: "Deep Pan",
        extraPrice: 105,
      },
      {
        name: "2 people",
        extraPrice: 170,
      },
      {
        name: "Family",
        extraPrice: 205,
      },
    ],
    addOns: [
      {
        name: "Egg",
        extraPrice: 8,
      },
      {
        name: "Pineapple",
        extraPrice: 10,
      },
      {
        name: "Asparagus",
        extraPrice: 10,
      },
      {
        name: "Bacon",
        extraPrice: 12,
      },
      {
        name: "Mushroom",
        extraPrice: 10,
      },
      {
        name: "Chili",
        extraPrice: 6,
      },
      {
        name: "Cocktail sausages",
        extraPrice: 12,
      },
      {
        name: "Gorgonzola",
        extraPrice: 12,
      },
      {
        name: "Minced ham",
        extraPrice: 12,
      },
      {
        name: "Garlic",
        extraPrice: 6,
      },
      {
        name: "Kebab",
        extraPrice: 12,
      },
      {
        name: "Ketchup",
        extraPrice: 7,
      },
      {
        name: "Meatballs",
        extraPrice: 12,
      },
      {
        name: "Meat strips",
        extraPrice: 12,
      },
      {
        name: "Chicken",
        extraPrice: 12,
      },
      {
        name: "Onion",
        extraPrice: 8,
      },
      {
        name: "Air-dried Ham",
        extraPrice: 35,
      },
      {
        name: "Mayonnaise",
        extraPrice: 10,
      },
      {
        name: "Mussels",
        extraPrice: 12,
      },
      {
        name: "Beef fillet",
        extraPrice: 25,
      },
      {
        name: "Olives",
        extraPrice: 10,
      },
      {
        name: "Cheese",
        extraPrice: 12,
      },
      {
        name: "Paprika",
        extraPrice: 10,
      },
      {
        name: "Pepperoni",
        extraPrice: 12,
      },
      {
        name: "Prawns",
        extraPrice: 12,
      },
      {
        name: "Remoulade",
        extraPrice: 10,
      },
      {
        name: "Salad",
        extraPrice: 12,
      },
      {
        name: "Spaghetti",
        extraPrice: 10,
      },
      {
        name: "Tomato",
        extraPrice: 8,
      },
      {
        name: "Tuna",
        extraPrice: 20,
      },
    ],
    imageLarge: "vegetariana-large.jpeg",
  },
  {
    id: "p-quatro-formaggi",
    category: "Pizza",
    name: "Quatro Formaggi",
    description:
      "Tomato, fresh mozzarella, cheddar cheese, feta cheese, gorgonzola",
    price: 100,
    image: "quatro-formaggi.jpeg",
    size: [
      {
        name: "Alm.",
        extraPrice: 100,
      },
      {
        name: "Whole grain",
        extraPrice: 110,
      },
      {
        name: "Deep Pan",
        extraPrice: 110,
      },
      {
        name: "2 people",
        extraPrice: 170,
      },
      {
        name: "Family",
        extraPrice: 210,
      },
    ],
    addOns: [
      {
        name: "Egg",
        extraPrice: 8,
      },
      {
        name: "Pineapple",
        extraPrice: 10,
      },
      {
        name: "Asparagus",
        extraPrice: 10,
      },
      {
        name: "Bacon",
        extraPrice: 12,
      },
      {
        name: "Mushroom",
        extraPrice: 10,
      },
      {
        name: "Chili",
        extraPrice: 6,
      },
      {
        name: "Cocktail sausages",
        extraPrice: 12,
      },
      {
        name: "Gorgonzola",
        extraPrice: 12,
      },
      {
        name: "Minced ham",
        extraPrice: 12,
      },
      {
        name: "Garlic",
        extraPrice: 6,
      },
      {
        name: "Kebab",
        extraPrice: 12,
      },
      {
        name: "Ketchup",
        extraPrice: 7,
      },
      {
        name: "Meatballs",
        extraPrice: 12,
      },
      {
        name: "Meat strips",
        extraPrice: 12,
      },
      {
        name: "Chicken",
        extraPrice: 12,
      },
      {
        name: "Onion",
        extraPrice: 8,
      },
      {
        name: "Air-dried Ham",
        extraPrice: 35,
      },
      {
        name: "Mayonnaise",
        extraPrice: 10,
      },
      {
        name: "Mussels",
        extraPrice: 12,
      },
      {
        name: "Beef fillet",
        extraPrice: 25,
      },
      {
        name: "Olives",
        extraPrice: 10,
      },
      {
        name: "Cheese",
        extraPrice: 12,
      },
      {
        name: "Paprika",
        extraPrice: 10,
      },
      {
        name: "Pepperoni",
        extraPrice: 12,
      },
      {
        name: "Prawns",
        extraPrice: 12,
      },
      {
        name: "Remoulade",
        extraPrice: 10,
      },
      {
        name: "Salad",
        extraPrice: 12,
      },
      {
        name: "Spaghetti",
        extraPrice: 10,
      },
      {
        name: "Tomato",
        extraPrice: 8,
      },
      {
        name: "Tuna",
        extraPrice: 20,
      },
    ],
    imageLarge: "quatro-formaggi-large.jpeg",
  },
  {
    id: "p-hadrianas",
    category: "Pizza",
    name: "Hadrianas",
    description: "Tomato, cheese, bacon, pepperoni, chili and garlic",
    price: 92,
    image: "hadrianas.jpeg",
    size: [
      {
        name: "Alm.",
        extraPrice: 92,
      },
      {
        name: "Whole grain",
        extraPrice: 102,
      },
      {
        name: "Deep Pan",
        extraPrice: 102,
      },
      {
        name: "Family",
        extraPrice: 200,
      },
    ],
    addOns: [
      {
        name: "Egg",
        extraPrice: 8,
      },
      {
        name: "Pineapple",
        extraPrice: 10,
      },
      {
        name: "Asparagus",
        extraPrice: 10,
      },
      {
        name: "Bacon",
        extraPrice: 12,
      },
      {
        name: "Mushroom",
        extraPrice: 10,
      },
      {
        name: "Chili",
        extraPrice: 6,
      },
      {
        name: "Cocktail sausages",
        extraPrice: 12,
      },
      {
        name: "Gorgonzola",
        extraPrice: 12,
      },
      {
        name: "Minced ham",
        extraPrice: 12,
      },
      {
        name: "Garlic",
        extraPrice: 6,
      },
      {
        name: "Kebab",
        extraPrice: 12,
      },
      {
        name: "Ketchup",
        extraPrice: 7,
      },
      {
        name: "Meatballs",
        extraPrice: 12,
      },
      {
        name: "Meat strips",
        extraPrice: 12,
      },
      {
        name: "Chicken",
        extraPrice: 12,
      },
      {
        name: "Onion",
        extraPrice: 8,
      },
      {
        name: "Air-dried Ham",
        extraPrice: 35,
      },
      {
        name: "Mayonnaise",
        extraPrice: 10,
      },
      {
        name: "Mussels",
        extraPrice: 12,
      },
      {
        name: "Beef fillet",
        extraPrice: 25,
      },
      {
        name: "Olives",
        extraPrice: 10,
      },
      {
        name: "Cheese",
        extraPrice: 12,
      },
      {
        name: "Paprika",
        extraPrice: 10,
      },
      {
        name: "Pepperoni",
        extraPrice: 12,
      },
      {
        name: "Prawns",
        extraPrice: 12,
      },
      {
        name: "Remoulade",
        extraPrice: 10,
      },
      {
        name: "Salad",
        extraPrice: 12,
      },
      {
        name: "Spaghetti",
        extraPrice: 10,
      },
      {
        name: "Tomato",
        extraPrice: 8,
      },
      {
        name: "Tuna",
        extraPrice: 20,
      },
    ],
    imageLarge: "hadrianas-large.jpeg",
  },
  {
    id: "p-matador",
    category: "Pizza",
    name: "Matador (Half Baked)",
    description: "Tomato, cheese, onions, beef fillet, mushrooms and bearnaise",
    price: 119,
    image: "matador.jpeg",
    size: [
      {
        name: "Alm.",
        extraPrice: 119,
      },
      {
        name: "Whole grain",
        extraPrice: 129,
      },
    ],
    addOns: [
      {
        name: "Egg",
        extraPrice: 8,
      },
      {
        name: "Pineapple",
        extraPrice: 10,
      },
      {
        name: "Asparagus",
        extraPrice: 10,
      },
      {
        name: "Bacon",
        extraPrice: 12,
      },
      {
        name: "Mushroom",
        extraPrice: 10,
      },
      {
        name: "Chili",
        extraPrice: 6,
      },
      {
        name: "Cocktail sausages",
        extraPrice: 12,
      },
      {
        name: "Gorgonzola",
        extraPrice: 12,
      },
      {
        name: "Minced ham",
        extraPrice: 12,
      },
      {
        name: "Garlic",
        extraPrice: 6,
      },
      {
        name: "Kebab",
        extraPrice: 12,
      },
      {
        name: "Ketchup",
        extraPrice: 7,
      },
      {
        name: "Meatballs",
        extraPrice: 12,
      },
      {
        name: "Meat strips",
        extraPrice: 12,
      },
      {
        name: "Chicken",
        extraPrice: 12,
      },
      {
        name: "Onion",
        extraPrice: 8,
      },
      {
        name: "Air-dried Ham",
        extraPrice: 35,
      },
      {
        name: "Mayonnaise",
        extraPrice: 10,
      },
      {
        name: "Mussels",
        extraPrice: 12,
      },
      {
        name: "Beef fillet",
        extraPrice: 25,
      },
      {
        name: "Olives",
        extraPrice: 10,
      },
      {
        name: "Cheese",
        extraPrice: 12,
      },
      {
        name: "Paprika",
        extraPrice: 10,
      },
      {
        name: "Pepperoni",
        extraPrice: 12,
      },
      {
        name: "Prawns",
        extraPrice: 12,
      },
      {
        name: "Remoulade",
        extraPrice: 10,
      },
      {
        name: "Salad",
        extraPrice: 12,
      },
      {
        name: "Spaghetti",
        extraPrice: 10,
      },
      {
        name: "Tomato",
        extraPrice: 8,
      },
      {
        name: "Tuna",
        extraPrice: 20,
      },
    ],
    imageLarge: "matador-large.jpeg",
  },
  {
    id: "p-keko",
    category: "Pizza",
    name: "Keko",
    description: "Tomato, cheese, kebab and gorgonzola",
    price: 89,
    image: "keko.jpeg",
    size: [
      {
        name: "Alm.",
        extraPrice: 89,
      },
      {
        name: "Whole grain",
        extraPrice: 99,
      },
      {
        name: "Deep Pan",
        extraPrice: 99,
      },
      {
        name: "2 people",
        extraPrice: 170,
      },
      {
        name: "Family",
        extraPrice: 195,
      },
    ],
    addOns: [
      {
        name: "Egg",
        extraPrice: 8,
      },
      {
        name: "Pineapple",
        extraPrice: 10,
      },
      {
        name: "Asparagus",
        extraPrice: 10,
      },
      {
        name: "Bacon",
        extraPrice: 12,
      },
      {
        name: "Mushroom",
        extraPrice: 10,
      },
      {
        name: "Chili",
        extraPrice: 6,
      },
      {
        name: "Cocktail sausages",
        extraPrice: 12,
      },
      {
        name: "Gorgonzola",
        extraPrice: 12,
      },
      {
        name: "Minced ham",
        extraPrice: 12,
      },
      {
        name: "Garlic",
        extraPrice: 6,
      },
      {
        name: "Kebab",
        extraPrice: 12,
      },
      {
        name: "Ketchup",
        extraPrice: 7,
      },
      {
        name: "Meatballs",
        extraPrice: 12,
      },
      {
        name: "Meat strips",
        extraPrice: 12,
      },
      {
        name: "Chicken",
        extraPrice: 12,
      },
      {
        name: "Onion",
        extraPrice: 8,
      },
      {
        name: "Air-dried Ham",
        extraPrice: 35,
      },
      {
        name: "Mayonnaise",
        extraPrice: 10,
      },
      {
        name: "Mussels",
        extraPrice: 12,
      },
      {
        name: "Beef fillet",
        extraPrice: 25,
      },
      {
        name: "Olives",
        extraPrice: 10,
      },
      {
        name: "Cheese",
        extraPrice: 12,
      },
      {
        name: "Paprika",
        extraPrice: 10,
      },
      {
        name: "Pepperoni",
        extraPrice: 12,
      },
      {
        name: "Prawns",
        extraPrice: 12,
      },
      {
        name: "Remoulade",
        extraPrice: 10,
      },
      {
        name: "Salad",
        extraPrice: 12,
      },
      {
        name: "Spaghetti",
        extraPrice: 10,
      },
      {
        name: "Tomato",
        extraPrice: 8,
      },
      {
        name: "Tuna",
        extraPrice: 20,
      },
    ],
    imageLarge: "keko-large.jpeg",
  },
  {
    id: "p-vordingborg-special",
    category: "Pizza",
    name: "Vordingborg Special",
    description: "Tomato, cheese, chicken, bacon and cocktail sausages",
    price: 95,
    image: "vordingborg-special.jpeg",
    size: [
      {
        name: "Alm",
        extraPrice: 95,
      },
      {
        name: "Whole grain",
        extraPrice: 105,
      },
      {
        name: "Deep Pan",
        extraPrice: 105,
      },
      {
        name: "2 people",
        extraPrice: 170,
      },
      {
        name: "Family",
        extraPrice: 205,
      },
    ],
    addOns: [
      {
        name: "Egg",
        extraPrice: 8,
      },
      {
        name: "Pineapple",
        extraPrice: 10,
      },
      {
        name: "Asparagus",
        extraPrice: 10,
      },
      {
        name: "Bacon",
        extraPrice: 12,
      },
      {
        name: "Mushroom",
        extraPrice: 10,
      },
      {
        name: "Chili",
        extraPrice: 6,
      },
      {
        name: "Cocktail sausages",
        extraPrice: 12,
      },
      {
        name: "Gorgonzola",
        extraPrice: 12,
      },
      {
        name: "Minced ham",
        extraPrice: 12,
      },
      {
        name: "Garlic",
        extraPrice: 6,
      },
      {
        name: "Kebab",
        extraPrice: 12,
      },
      {
        name: "Ketchup",
        extraPrice: 7,
      },
      {
        name: "Meatballs",
        extraPrice: 12,
      },
      {
        name: "Meat strips",
        extraPrice: 12,
      },
      {
        name: "Chicken",
        extraPrice: 12,
      },
      {
        name: "Onion",
        extraPrice: 8,
      },
      {
        name: "Air-dried Ham",
        extraPrice: 35,
      },
      {
        name: "Mayonnaise",
        extraPrice: 10,
      },
      {
        name: "Mussels",
        extraPrice: 12,
      },
      {
        name: "Beef fillet",
        extraPrice: 25,
      },
      {
        name: "Olives",
        extraPrice: 10,
      },
      {
        name: "Cheese",
        extraPrice: 12,
      },
      {
        name: "Paprika",
        extraPrice: 10,
      },
      {
        name: "Pepperoni",
        extraPrice: 12,
      },
      {
        name: "Prawns",
        extraPrice: 12,
      },
      {
        name: "Remoulade",
        extraPrice: 10,
      },
      {
        name: "Salad",
        extraPrice: 12,
      },
      {
        name: "Spaghetti",
        extraPrice: 10,
      },
      {
        name: "Tomato",
        extraPrice: 8,
      },
      {
        name: "Tuna",
        extraPrice: 20,
      },
    ],
    imageLarge: "vordingborg-special-large.jpeg",
  },
  {
    id: "p-jalapenos",
    category: "Pizza",
    name: "Jalapenos",
    description: "Tomato, cheese, kebab and jalapenos",
    price: 89,
    image: "jalapenos.jpeg",
    size: [
      {
        name: "Alm.",
        extraPrice: 89,
      },
      {
        name: "Whole grain",
        extraPrice: 99,
      },
      {
        name: "Deep Pan",
        extraPrice: 99,
      },
      {
        name: "2 people",
        extraPrice: 170,
      },
      {
        name: "Family",
        extraPrice: 195,
      },
    ],
    addOns: [
      {
        name: "Egg",
        extraPrice: 8,
      },
      {
        name: "Pineapple",
        extraPrice: 10,
      },
      {
        name: "Asparagus",
        extraPrice: 10,
      },
      {
        name: "Bacon",
        extraPrice: 12,
      },
      {
        name: "Mushroom",
        extraPrice: 10,
      },
      {
        name: "Chili",
        extraPrice: 6,
      },
      {
        name: "Cocktail sausages",
        extraPrice: 12,
      },
      {
        name: "Gorgonzola",
        extraPrice: 12,
      },
      {
        name: "Minced ham",
        extraPrice: 12,
      },
      {
        name: "Garlic",
        extraPrice: 6,
      },
      {
        name: "Kebab",
        extraPrice: 12,
      },
      {
        name: "Ketchup",
        extraPrice: 7,
      },
      {
        name: "Meatballs",
        extraPrice: 12,
      },
      {
        name: "Meat strips",
        extraPrice: 12,
      },
      {
        name: "Chicken",
        extraPrice: 12,
      },
      {
        name: "Onion",
        extraPrice: 8,
      },
      {
        name: "Air-dried Ham",
        extraPrice: 35,
      },
      {
        name: "Mayonnaise",
        extraPrice: 10,
      },
      {
        name: "Mussels",
        extraPrice: 12,
      },
      {
        name: "Beef fillet",
        extraPrice: 25,
      },
      {
        name: "Olives",
        extraPrice: 10,
      },
      {
        name: "Cheese",
        extraPrice: 12,
      },
      {
        name: "Paprika",
        extraPrice: 10,
      },
      {
        name: "Pepperoni",
        extraPrice: 12,
      },
      {
        name: "Prawns",
        extraPrice: 12,
      },
      {
        name: "Remoulade",
        extraPrice: 10,
      },
      {
        name: "Salad",
        extraPrice: 12,
      },
      {
        name: "Spaghetti",
        extraPrice: 10,
      },
      {
        name: "Tomato",
        extraPrice: 8,
      },
      {
        name: "Tuna",
        extraPrice: 20,
      },
    ],
    imageLarge: "jalapenos-large.jpeg",
  },
  {
    id: "p-romeo",
    category: "Pizza",
    name: "Romeo",
    description: "Tomato, cheese, potato, fresh mozzarella, pesto, arugula",
    price: 85,
    image: "romeo.jpeg",
    size: [
      {
        name: "Alm.",
        extraPrice: 85,
      },
      {
        name: "Whole grain",
        extraPrice: 95,
      },
      {
        name: "Deep Pan",
        extraPrice: 95,
      },
      {
        name: "2 people",
        extraPrice: 160,
      },
      {
        name: "Family",
        extraPrice: 195,
      },
    ],
    addOns: [
      {
        name: "Egg",
        extraPrice: 8,
      },
      {
        name: "Pineapple",
        extraPrice: 10,
      },
      {
        name: "Asparagus",
        extraPrice: 10,
      },
      {
        name: "Bacon",
        extraPrice: 12,
      },
      {
        name: "Mushroom",
        extraPrice: 10,
      },
      {
        name: "Chili",
        extraPrice: 6,
      },
      {
        name: "Cocktail sausages",
        extraPrice: 12,
      },
      {
        name: "Gorgonzola",
        extraPrice: 12,
      },
      {
        name: "Minced ham",
        extraPrice: 12,
      },
      {
        name: "Garlic",
        extraPrice: 6,
      },
      {
        name: "Kebab",
        extraPrice: 12,
      },
      {
        name: "Ketchup",
        extraPrice: 7,
      },
      {
        name: "Meatballs",
        extraPrice: 12,
      },
      {
        name: "Meat strips",
        extraPrice: 12,
      },
      {
        name: "Chicken",
        extraPrice: 12,
      },
      {
        name: "Onion",
        extraPrice: 8,
      },
      {
        name: "Air-dried Ham",
        extraPrice: 35,
      },
      {
        name: "Mayonnaise",
        extraPrice: 10,
      },
      {
        name: "Mussels",
        extraPrice: 12,
      },
      {
        name: "Beef fillet",
        extraPrice: 25,
      },
      {
        name: "Olives",
        extraPrice: 10,
      },
      {
        name: "Cheese",
        extraPrice: 12,
      },
      {
        name: "Paprika",
        extraPrice: 10,
      },
      {
        name: "Pepperoni",
        extraPrice: 12,
      },
      {
        name: "Prawns",
        extraPrice: 12,
      },
      {
        name: "Remoulade",
        extraPrice: 10,
      },
      {
        name: "Salad",
        extraPrice: 12,
      },
      {
        name: "Spaghetti",
        extraPrice: 10,
      },
      {
        name: "Tomato",
        extraPrice: 8,
      },
      {
        name: "Tuna",
        extraPrice: 20,
      },
    ],
    imageLarge: "romeo-large.jpeg",
  },
  {
    id: "p-torino",
    category: "Pizza",
    name: "Torino",
    description:
      "Tomato, cheese, strips of meat, mushrooms, peppers and onions",
    price: 92,
    image: "torino.jpeg",
    size: [
      {
        name: "Alm.",
        extraPrice: 92,
      },
      {
        name: "Whole grain",
        extraPrice: 102,
      },
      {
        name: "Deep Pan",
        extraPrice: 102,
      },
      {
        name: "2 people",
        extraPrice: 170,
      },
      {
        name: "Family",
        extraPrice: 200,
      },
    ],
    addOns: [
      {
        name: "Egg",
        extraPrice: 16,
      },
      {
        name: "Pineapple",
        extraPrice: 20,
      },
      {
        name: "Asparagus",
        extraPrice: 20,
      },
      {
        name: "Bacon",
        extraPrice: 30,
      },
      {
        name: "Mushroom",
        extraPrice: 20,
      },
      {
        name: "Chili",
        extraPrice: 6,
      },
      {
        name: "Cocktail sausages",
        extraPrice: 30,
      },
      {
        name: "Gorgonzola",
        extraPrice: 30,
      },
      {
        name: "Minced ham",
        extraPrice: 30,
      },
      {
        name: "Garlic",
        extraPrice: 6,
      },
      {
        name: "Kebab",
        extraPrice: 30,
      },
      {
        name: "Ketchup",
        extraPrice: 10,
      },
      {
        name: "Meatballs",
        extraPrice: 30,
      },
      {
        name: "Meat strips",
        extraPrice: 30,
      },
      {
        name: "Chicken",
        extraPrice: 30,
      },
      {
        name: "Onion",
        extraPrice: 16,
      },
      {
        name: "Air-dried Ham",
        extraPrice: 35,
      },
      {
        name: "Mayonnaise",
        extraPrice: 10,
      },
      {
        name: "Mussels",
        extraPrice: 30,
      },
      {
        name: "Beef fillet",
        extraPrice: 40,
      },
      {
        name: "Olives",
        extraPrice: 20,
      },
      {
        name: "Cheese",
        extraPrice: 30,
      },
      {
        name: "Paprika",
        extraPrice: 20,
      },
      {
        name: "Pepperoni",
        extraPrice: 30,
      },
      {
        name: "Prawns",
        extraPrice: 30,
      },
      {
        name: "Remoulade",
        extraPrice: 10,
      },
      {
        name: "Salad",
        extraPrice: 24,
      },
      {
        name: "Spaghetti",
        extraPrice: 20,
      },
      {
        name: "Tomato",
        extraPrice: 16,
      },
      {
        name: "Tuna",
        extraPrice: 40,
      },
    ],
    imageLarge: "torino-large.jpeg",
  },
  {
    id: "p-ufo",
    category: "Pizza",
    name: "UFO (Double baked)",
    description: "Tomato, cheese, chopped ham and mushrooms",
    price: 99,
    image: "ufo.jpeg",
    size: [
      {
        name: "Alm.",
        extraPrice: 99,
      },
      {
        name: "Whole grain",
        extraPrice: 109,
      },
    ],
    addOns: [
      {
        name: "Egg",
        extraPrice: 8,
      },
      {
        name: "Pineapple",
        extraPrice: 10,
      },
      {
        name: "Asparagus",
        extraPrice: 10,
      },
      {
        name: "Bacon",
        extraPrice: 12,
      },
      {
        name: "Mushroom",
        extraPrice: 10,
      },
      {
        name: "Chili",
        extraPrice: 6,
      },
      {
        name: "Cocktail sausages",
        extraPrice: 12,
      },
      {
        name: "Gorgonzola",
        extraPrice: 12,
      },
      {
        name: "Minced ham",
        extraPrice: 12,
      },
      {
        name: "Garlic",
        extraPrice: 6,
      },
      {
        name: "Kebab",
        extraPrice: 12,
      },
      {
        name: "Ketchup",
        extraPrice: 7,
      },
      {
        name: "Meatballs",
        extraPrice: 12,
      },
      {
        name: "Meat strips",
        extraPrice: 12,
      },
      {
        name: "Chicken",
        extraPrice: 12,
      },
      {
        name: "Onion",
        extraPrice: 8,
      },
      {
        name: "Air-dried Ham",
        extraPrice: 35,
      },
      {
        name: "Mayonnaise",
        extraPrice: 10,
      },
      {
        name: "Mussels",
        extraPrice: 12,
      },
      {
        name: "Beef fillet",
        extraPrice: 25,
      },
      {
        name: "Olives",
        extraPrice: 10,
      },
      {
        name: "Cheese",
        extraPrice: 12,
      },
      {
        name: "Paprika",
        extraPrice: 10,
      },
      {
        name: "Pepperoni",
        extraPrice: 12,
      },
      {
        name: "Prawns",
        extraPrice: 12,
      },
      {
        name: "Remoulade",
        extraPrice: 10,
      },
      {
        name: "Salad",
        extraPrice: 12,
      },
      {
        name: "Spaghetti",
        extraPrice: 10,
      },
      {
        name: "Tomato",
        extraPrice: 8,
      },
      {
        name: "Tuna",
        extraPrice: 20,
      },
    ],
    imageLarge: "ufo-large.jpeg",
  },
  {
    id: "p-samos",
    category: "Pizza",
    name: "Samos",
    description: "Tomato, cheese, pepperoni, paprika, chili and garlic",
    price: 92,
    image: "samos.jpeg",
    size: [
      {
        name: "Alm.",
        extraPrice: 92,
      },
      {
        name: "Whole grain",
        extraPrice: 102,
      },
      {
        name: "Deep Pan",
        extraPrice: 102,
      },
      {
        name: "2 people",
        extraPrice: 170,
      },
      {
        name: "Family",
        extraPrice: 200,
      },
    ],
    addOns: [
      {
        name: "Egg",
        extraPrice: 8,
      },
      {
        name: "Pineapple",
        extraPrice: 10,
      },
      {
        name: "Asparagus",
        extraPrice: 10,
      },
      {
        name: "Bacon",
        extraPrice: 12,
      },
      {
        name: "Mushroom",
        extraPrice: 10,
      },
      {
        name: "Chili",
        extraPrice: 6,
      },
      {
        name: "Cocktail sausages",
        extraPrice: 12,
      },
      {
        name: "Gorgonzola",
        extraPrice: 12,
      },
      {
        name: "Minced ham",
        extraPrice: 12,
      },
      {
        name: "Garlic",
        extraPrice: 6,
      },
      {
        name: "Kebab",
        extraPrice: 12,
      },
      {
        name: "Ketchup",
        extraPrice: 7,
      },
      {
        name: "Meatballs",
        extraPrice: 12,
      },
      {
        name: "Meat strips",
        extraPrice: 12,
      },
      {
        name: "Chicken",
        extraPrice: 12,
      },
      {
        name: "Onion",
        extraPrice: 8,
      },
      {
        name: "Air-dried Ham",
        extraPrice: 35,
      },
      {
        name: "Mayonnaise",
        extraPrice: 10,
      },
      {
        name: "Mussels",
        extraPrice: 12,
      },
      {
        name: "Beef fillet",
        extraPrice: 25,
      },
      {
        name: "Olives",
        extraPrice: 10,
      },
      {
        name: "Cheese",
        extraPrice: 12,
      },
      {
        name: "Paprika",
        extraPrice: 10,
      },
      {
        name: "Pepperoni",
        extraPrice: 12,
      },
      {
        name: "Prawns",
        extraPrice: 12,
      },
      {
        name: "Remoulade",
        extraPrice: 10,
      },
      {
        name: "Salad",
        extraPrice: 12,
      },
      {
        name: "Spaghetti",
        extraPrice: 10,
      },
      {
        name: "Tomato",
        extraPrice: 8,
      },
      {
        name: "Tuna",
        extraPrice: 20,
      },
    ],
    imageLarge: "samos-large.jpeg",
  },
  {
    id: "p-mamma-mia",
    category: "Pizza",
    name: "Mamma Mia (Baked in) - Regular",
    description: "Tomato, cheese, spaghetti and meat sauce",
    price: 92,
    image: "mamma-mia.jpeg",
    size: [
      {
        name: "Alm.",
        extraPrice: 92,
      },
      {
        name: "Whole grain",
        extraPrice: 102,
      },
    ],
    addOns: [
      {
        name: "Egg",
        extraPrice: 8,
      },
      {
        name: "Pineapple",
        extraPrice: 10,
      },
      {
        name: "Asparagus",
        extraPrice: 10,
      },
      {
        name: "Bacon",
        extraPrice: 12,
      },
      {
        name: "Mushroom",
        extraPrice: 10,
      },
      {
        name: "Chili",
        extraPrice: 6,
      },
      {
        name: "Cocktail sausages",
        extraPrice: 12,
      },
      {
        name: "Gorgonzola",
        extraPrice: 12,
      },
      {
        name: "Minced ham",
        extraPrice: 12,
      },
      {
        name: "Garlic",
        extraPrice: 6,
      },
      {
        name: "Kebab",
        extraPrice: 12,
      },
      {
        name: "Ketchup",
        extraPrice: 7,
      },
      {
        name: "Meatballs",
        extraPrice: 12,
      },
      {
        name: "Meat strips",
        extraPrice: 12,
      },
      {
        name: "Chicken",
        extraPrice: 12,
      },
      {
        name: "Onion",
        extraPrice: 8,
      },
      {
        name: "Air-dried Ham",
        extraPrice: 35,
      },
      {
        name: "Mayonnaise",
        extraPrice: 10,
      },
      {
        name: "Mussels",
        extraPrice: 12,
      },
      {
        name: "Beef fillet",
        extraPrice: 25,
      },
      {
        name: "Olives",
        extraPrice: 10,
      },
      {
        name: "Cheese",
        extraPrice: 12,
      },
      {
        name: "Paprika",
        extraPrice: 10,
      },
      {
        name: "Pepperoni",
        extraPrice: 12,
      },
      {
        name: "Prawns",
        extraPrice: 12,
      },
      {
        name: "Remoulade",
        extraPrice: 10,
      },
      {
        name: "Salad",
        extraPrice: 12,
      },
      {
        name: "Spaghetti",
        extraPrice: 10,
      },
      {
        name: "Tomato",
        extraPrice: 8,
      },
      {
        name: "Tuna",
        extraPrice: 20,
      },
    ],
    imageLarge: "mamma-mia-large.jpeg",
  },
  {
    id: "p-mix",
    category: "Pizza",
    name: "Mix",
    description:
      "Tomato, cheese, minced ham, meat sauce, meat strips, bacon and onions",
    price: 109,
    image: "mix.jpeg",
    size: [
      {
        name: "Alm.",
        extraPrice: 109,
      },
      {
        name: "Whole grain",
        extraPrice: 119,
      },
      {
        name: "Deep Pan",
        extraPrice: 119,
      },
      {
        name: "Family",
        extraPrice: 229,
      },
    ],
    addOns: [
      {
        name: "Egg",
        extraPrice: 8,
      },
      {
        name: "Pineapple",
        extraPrice: 10,
      },
      {
        name: "Asparagus",
        extraPrice: 10,
      },
      {
        name: "Bacon",
        extraPrice: 12,
      },
      {
        name: "Mushroom",
        extraPrice: 10,
      },
      {
        name: "Chili",
        extraPrice: 6,
      },
      {
        name: "Cocktail sausages",
        extraPrice: 12,
      },
      {
        name: "Gorgonzola",
        extraPrice: 12,
      },
      {
        name: "Minced ham",
        extraPrice: 12,
      },
      {
        name: "Garlic",
        extraPrice: 6,
      },
      {
        name: "Kebab",
        extraPrice: 12,
      },
      {
        name: "Ketchup",
        extraPrice: 7,
      },
      {
        name: "Meatballs",
        extraPrice: 12,
      },
      {
        name: "Meat strips",
        extraPrice: 12,
      },
      {
        name: "Chicken",
        extraPrice: 12,
      },
      {
        name: "Onion",
        extraPrice: 8,
      },
      {
        name: "Air-dried Ham",
        extraPrice: 35,
      },
      {
        name: "Mayonnaise",
        extraPrice: 10,
      },
      {
        name: "Mussels",
        extraPrice: 12,
      },
      {
        name: "Beef fillet",
        extraPrice: 25,
      },
      {
        name: "Olives",
        extraPrice: 10,
      },
      {
        name: "Cheese",
        extraPrice: 12,
      },
      {
        name: "Paprika",
        extraPrice: 10,
      },
      {
        name: "Pepperoni",
        extraPrice: 12,
      },
      {
        name: "Prawns",
        extraPrice: 12,
      },
      {
        name: "Remoulade",
        extraPrice: 10,
      },
      {
        name: "Salad",
        extraPrice: 12,
      },
      {
        name: "Spaghetti",
        extraPrice: 10,
      },
      {
        name: "Tomato",
        extraPrice: 8,
      },
      {
        name: "Tuna",
        extraPrice: 20,
      },
    ],
    imageLarge: "mix-large.jpeg",
  },
  {
    id: "p-marinara",
    category: "Pizza",
    name: "Marinara",
    description: "Tomato, cheese, shrimp, mussels and tuna",
    price: 95,
    image: "marinara.jpeg",
    size: [
      {
        name: "Alm",
        extraPrice: 95,
      },
      {
        name: "Whole grain",
        extraPrice: 105,
      },
      {
        name: "Deep Pan",
        extraPrice: 105,
      },
      {
        name: "2 people",
        extraPrice: 170,
      },
      {
        name: "Family",
        extraPrice: 205,
      },
    ],
    addOns: [
      {
        name: "Egg",
        extraPrice: 8,
      },
      {
        name: "Pineapple",
        extraPrice: 10,
      },
      {
        name: "Asparagus",
        extraPrice: 10,
      },
      {
        name: "Bacon",
        extraPrice: 12,
      },
      {
        name: "Mushroom",
        extraPrice: 10,
      },
      {
        name: "Chili",
        extraPrice: 6,
      },
      {
        name: "Cocktail sausages",
        extraPrice: 12,
      },
      {
        name: "Gorgonzola",
        extraPrice: 12,
      },
      {
        name: "Minced ham",
        extraPrice: 12,
      },
      {
        name: "Garlic",
        extraPrice: 6,
      },
      {
        name: "Kebab",
        extraPrice: 12,
      },
      {
        name: "Ketchup",
        extraPrice: 7,
      },
      {
        name: "Meatballs",
        extraPrice: 12,
      },
      {
        name: "Meat strips",
        extraPrice: 12,
      },
      {
        name: "Chicken",
        extraPrice: 12,
      },
      {
        name: "Onion",
        extraPrice: 8,
      },
      {
        name: "Air-dried Ham",
        extraPrice: 35,
      },
      {
        name: "Mayonnaise",
        extraPrice: 10,
      },
      {
        name: "Mussels",
        extraPrice: 12,
      },
      {
        name: "Beef fillet",
        extraPrice: 25,
      },
      {
        name: "Olives",
        extraPrice: 10,
      },
      {
        name: "Cheese",
        extraPrice: 12,
      },
      {
        name: "Paprika",
        extraPrice: 10,
      },
      {
        name: "Pepperoni",
        extraPrice: 12,
      },
      {
        name: "Prawns",
        extraPrice: 12,
      },
      {
        name: "Remoulade",
        extraPrice: 10,
      },
      {
        name: "Salad",
        extraPrice: 12,
      },
      {
        name: "Spaghetti",
        extraPrice: 10,
      },
      {
        name: "Tomato",
        extraPrice: 8,
      },
      {
        name: "Tuna",
        extraPrice: 20,
      },
    ],
    imageLarge: "marinara-large.jpeg",
  },
  {
    id: "mex-mexicana",
    category: "Mexican Pizzas",
    name: "Mexicana",
    description:
      "Tomato, cheese, chicken, kebabs, peppers, jalapenos and taco sauce",
    price: 99,
    image: "mexicana.jpeg",
    size: [
      {
        name: "Alm",
        extraPrice: 99,
      },
      {
        name: "Whole grain",
        extraPrice: 109,
      },
      {
        name: "Deep Pan",
        extraPrice: 109,
      },
      {
        name: "2 people",
        extraPrice: 170,
      },
      {
        name: "Family",
        extraPrice: 210,
      },
    ],
    addOns: [
      {
        name: "Egg",
        extraPrice: 16,
      },
      {
        name: "Pineapple",
        extraPrice: 20,
      },
      {
        name: "Asparagus",
        extraPrice: 20,
      },
      {
        name: "Bacon",
        extraPrice: 30,
      },
      {
        name: "Mushroom",
        extraPrice: 20,
      },
      {
        name: "Chili",
        extraPrice: 6,
      },
      {
        name: "Cocktail sausages",
        extraPrice: 30,
      },
      {
        name: "Gorgonzola",
        extraPrice: 30,
      },
      {
        name: "Minced ham",
        extraPrice: 30,
      },
      {
        name: "Garlic",
        extraPrice: 6,
      },
      {
        name: "Kebab",
        extraPrice: 30,
      },
      {
        name: "Ketchup",
        extraPrice: 10,
      },
      {
        name: "Meatballs",
        extraPrice: 30,
      },
      {
        name: "Meat strips",
        extraPrice: 30,
      },
      {
        name: "Chicken",
        extraPrice: 30,
      },
      {
        name: "Onion",
        extraPrice: 16,
      },
      {
        name: "Air-dried Ham",
        extraPrice: 35,
      },
      {
        name: "Mayonnaise",
        extraPrice: 10,
      },
      {
        name: "Mussels",
        extraPrice: 30,
      },
      {
        name: "Beef fillet",
        extraPrice: 40,
      },
      {
        name: "Olives",
        extraPrice: 20,
      },
      {
        name: "Cheese",
        extraPrice: 30,
      },
      {
        name: "Paprika",
        extraPrice: 20,
      },
      {
        name: "Pepperoni",
        extraPrice: 30,
      },
      {
        name: "Prawns",
        extraPrice: 30,
      },
      {
        name: "Remoulade",
        extraPrice: 10,
      },
      {
        name: "Salad",
        extraPrice: 24,
      },
      {
        name: "Spaghetti",
        extraPrice: 20,
      },
      {
        name: "Tomato",
        extraPrice: 16,
      },
      {
        name: "Tuna",
        extraPrice: 40,
      },
    ],
    imageLarge: "mexicana-large.jpeg",
  },
  {
    id: "mex-acapulco",
    category: "Mexican Pizzas",
    name: "Acapulco",
    description:
      "Tomato, cheese, minced beef, pepperoni, jalapenos and taco sauce",
    price: 99,
    image: "acapulco.jpeg",
    size: [
      {
        name: "Alm",
        extraPrice: 99,
      },
      {
        name: "Whole grain",
        extraPrice: 109,
      },
      {
        name: "Deep Pan",
        extraPrice: 109,
      },
      {
        name: "2 people",
        extraPrice: 170,
      },
      {
        name: "Family",
        extraPrice: 210,
      },
    ],
    addOns: [
      {
        name: "Egg",
        extraPrice: 8,
      },
      {
        name: "Pineapple",
        extraPrice: 10,
      },
      {
        name: "Asparagus",
        extraPrice: 10,
      },
      {
        name: "Bacon",
        extraPrice: 12,
      },
      {
        name: "Mushroom",
        extraPrice: 10,
      },
      {
        name: "Chili",
        extraPrice: 6,
      },
      {
        name: "Cocktail sausages",
        extraPrice: 12,
      },
      {
        name: "Gorgonzola",
        extraPrice: 12,
      },
      {
        name: "Minced ham",
        extraPrice: 12,
      },
      {
        name: "Garlic",
        extraPrice: 6,
      },
      {
        name: "Kebab",
        extraPrice: 12,
      },
      {
        name: "Ketchup",
        extraPrice: 7,
      },
      {
        name: "Meatballs",
        extraPrice: 12,
      },
      {
        name: "Meat strips",
        extraPrice: 12,
      },
      {
        name: "Chicken",
        extraPrice: 12,
      },
      {
        name: "Onion",
        extraPrice: 8,
      },
      {
        name: "Air-dried Ham",
        extraPrice: 35,
      },
      {
        name: "Mayonnaise",
        extraPrice: 10,
      },
      {
        name: "Mussels",
        extraPrice: 12,
      },
      {
        name: "Beef fillet",
        extraPrice: 25,
      },
      {
        name: "Olives",
        extraPrice: 10,
      },
      {
        name: "Cheese",
        extraPrice: 12,
      },
      {
        name: "Paprika",
        extraPrice: 10,
      },
      {
        name: "Pepperoni",
        extraPrice: 12,
      },
      {
        name: "Prawns",
        extraPrice: 12,
      },
      {
        name: "Remoulade",
        extraPrice: 10,
      },
      {
        name: "Salad",
        extraPrice: 12,
      },
      {
        name: "Spaghetti",
        extraPrice: 10,
      },
      {
        name: "Tomato",
        extraPrice: 8,
      },
      {
        name: "Tuna",
        extraPrice: 20,
      },
    ],
    imageLarge: "acapulco-large.jpeg",
  },
  {
    id: "pasta-tortellini-special",
    category: "Pasta dishes",
    name: "Tortellini Special",
    description: "With mushrooms, bacon, peas, corn, chicken and cream",
    price: 95,
    image: "tortellini-special.jpeg",
    imageLarge: "tortellini-special-large.jpeg",
  },
  {
    id: "pasta-bolognese",
    category: "Pasta dishes",
    name: "Spaghetti Bolognese",
    description: "With meat sauce",
    price: 85,
    image: "bolognese.jpeg",
    imageLarge: "bolognese-large.jpeg",
  },
  {
    id: "pasta-tortellini-cream",
    category: "Pasta dishes",
    name: "Tortellini",
    description: "With mushrooms, bacon, tomato sauce and cream sauce",
    price: 95,
    image: "tortellini-cream.jpeg",
    imageLarge: "tortellini-cream-large.jpeg",
  },
  {
    id: "pasta-penne-a",
    category: "Pasta dishes",
    name: "Penne (A)",
    description: "With salmon, shrimp, tomato sauce, cream and garlic",
    price: 105,
    image: "penne-a.jpeg",
    imageLarge: "penne-a-large.jpeg",
  },
  {
    id: "pasta-penne-b",
    category: "Pasta dishes",
    name: "Penne (B)",
    description: "With chicken, bacon, curry and tomato sauce and cream",
    price: 105,
    image: "penne-b.jpeg",
    imageLarge: "penne-b-large.jpeg",
  },
  {
    id: "pasta-fettucine-a",
    category: "Pasta dishes",
    name: "Fettucine (A)",
    description: "With meat strips, mushrooms, gorgonzola and cream",
    price: 95,
    image: "fettucine-a.jpeg",
    imageLarge: "fettucine-a-large.jpeg",
  },
  {
    id: "pasta-fettucine-b",
    category: "Pasta dishes",
    name: "Fettucine (B)",
    description: "With chopped ham, bacon, tomato and cream",
    price: 95,
    image: "fettucine-b.jpeg",
    imageLarge: "fettucine-b-large.jpeg",
  },
  {
    id: "pasta-tortellini-gorgonzola",
    category: "Pasta dishes",
    name: "Tortellini Al Gorgonzola",
    description: "With gorgonzola, mushrooms and cream",
    price: 95,
    image: "tortellini-gorgonzola.jpeg",
    addOns: [
      {
        name: "Extra Gorgonzola",
        extraPrice: 15,
      },
    ],
    imageLarge: "tortellini-gorgonzola-large.jpeg",
  },
  {
    id: "pasta-tortellini-genoveze",
    category: "Pasta dishes",
    name: "Tortellini Genoveze",
    description: "With chopped ham, bacon and tomato and cream",
    price: 105,
    image: "tortellini-genoveze.jpeg",
    imageLarge: "tortellini-genoveze-large.jpeg",
  },
  {
    id: "pasta-lasagne",
    category: "Pasta dishes",
    name: "Lasagne",
    description: "With meat sauce",
    price: 85,
    image: "lasagne.jpeg",
    imageLarge: "lasagne-large.jpeg",
  },
  {
    id: "pasta-carbonara",
    category: "Pasta dishes",
    name: "Spaghetti Carbonara",
    description: "With bacon, egg and cream sauce",
    price: 95,
    image: "carbonara.jpeg",
    imageLarge: "carbonara-large.jpeg",
  },
  {
    id: "alc-english-beef",
    category: "A la carte",
    name: "English beef 200g",
    description: "With optional sauce. Served with salad and choice of potato.",
    price: 185,
    image: "english-beef.jpeg",
    type: [
      {
        name: "Potato wedges",
        extraPrice: 0,
      },
      {
        name: "French fries",
        extraPrice: 0,
      },
    ],
    chooseOne: [
      {
        name: "Bearnaise sauce",
        extraPrice: 0,
      },
      {
        name: "Mushroom sauce",
        extraPrice: 0,
      },
      {
        name: "Gorgonzola sauce",
        extraPrice: 0,
      },
      {
        name: "Brown sauce",
        extraPrice: 0,
      },
      {
        name: "No sauce",
        extraPrice: 0,
      },
    ],
    imageLarge: "english-beef-large.jpeg",
  },
  {
    id: "alc-plank-steak",
    category: "A la carte",
    name: "Plank steak",
    description:
      "Choose between beef filet, chicken breast, or pork tenderloin and optional sauce.",
    price: 185,
    image: "plank-steak.jpeg",
    type: [
      {
        name: "Potato wedges",
        extraPrice: 0,
      },
      {
        name: "French fries",
        extraPrice: 0,
      },
    ],
    chooseOne: [
      {
        name: "Bearnaise sauce",
        extraPrice: 0,
      },
      {
        name: "Mushroom sauce",
        extraPrice: 0,
      },
      {
        name: "Gorgonzola sauce",
        extraPrice: 0,
      },
      {
        name: "Brown sauce",
        extraPrice: 0,
      },
      {
        name: "No sauce",
        extraPrice: 0,
      },
    ],
    imageLarge: "plank-steak-large.jpeg",
  },
  {
    id: "alc-bistecca-funghi",
    category: "A la carte",
    name: "Bistecca Al Funghi 2 pcs.",
    description: "With optional sauce.",
    price: 195,
    image: "bistecca-funghi.jpeg",
    type: [
      {
        name: "Potato wedges",
        extraPrice: 0,
      },
      {
        name: "French fries",
        extraPrice: 0,
      },
    ],
    chooseOne: [
      {
        name: "Bearnaise sauce",
        extraPrice: 0,
      },
      {
        name: "Mushroom sauce",
        extraPrice: 0,
      },
      {
        name: "Gorgonzola sauce",
        extraPrice: 0,
      },
      {
        name: "Brown sauce",
        extraPrice: 0,
      },
      {
        name: "No sauce",
        extraPrice: 0,
      },
    ],
    imageLarge: "bistecca-funghi-large.jpeg",
  },
  {
    id: "alc-pork-tenderloin",
    category: "A la carte",
    name: "Pork tenderloin 200g",
    description: "With optional sauce.",
    price: 159,
    image: "pork-tenderloin.jpeg",
    type: [
      {
        name: "Potato wedges",
        extraPrice: 0,
      },
      {
        name: "French fries",
        extraPrice: 0,
      },
    ],
    chooseOne: [
      {
        name: "Bearnaise sauce",
        extraPrice: 0,
      },
      {
        name: "Mushroom sauce",
        extraPrice: 0,
      },
      {
        name: "Gorgonzola sauce",
        extraPrice: 0,
      },
      {
        name: "Brown sauce",
        extraPrice: 0,
      },
      {
        name: "No sauce",
        extraPrice: 0,
      },
    ],
    imageLarge: "pork-tenderloin-large.jpeg",
  },
  {
    id: "alc-ham-schnitzel",
    category: "A la carte",
    name: "Ham schnitzel",
    description: "With optional sauce.",
    price: 119,
    image: "ham-schnitzel.jpeg",
    type: [
      {
        name: "Potato wedges",
        extraPrice: 0,
      },
      {
        name: "French fries",
        extraPrice: 0,
      },
    ],
    chooseOne: [
      {
        name: "Bearnaise sauce",
        extraPrice: 0,
      },
      {
        name: "Mushroom sauce",
        extraPrice: 0,
      },
      {
        name: "Gorgonzola sauce",
        extraPrice: 0,
      },
      {
        name: "Brown sauce",
        extraPrice: 0,
      },
      {
        name: "No sauce",
        extraPrice: 0,
      },
    ],
    imageLarge: "ham-schnitzel-large.jpeg",
  },
  {
    id: "alc-luxury-rice",
    category: "A la carte",
    name: "Luxury Rice",
    description: "With chicken, shrimp, peas, corn, garlic and tzatziki.",
    price: 109,
    image: "luxury-rice.jpeg",
    type: [
      {
        name: "Potato wedges",
        extraPrice: 0,
      },
      {
        name: "French fries",
        extraPrice: 0,
      },
    ],
    chooseOne: [
      {
        name: "Bearnaise sauce",
        extraPrice: 0,
      },
      {
        name: "Mushroom sauce",
        extraPrice: 0,
      },
      {
        name: "Gorgonzola sauce",
        extraPrice: 0,
      },
      {
        name: "Brown sauce",
        extraPrice: 0,
      },
      {
        name: "No sauce",
        extraPrice: 0,
      },
    ],
    imageLarge: "luxury-rice-large.jpeg",
  },
  {
    id: "alc-pollo-fritto",
    category: "A la carte",
    name: "Pollo Fritto",
    description: "1/2 chicken with remoulade.",
    price: 95,
    image: "pollo-fritto.jpeg",
    type: [
      {
        name: "Potato wedges",
        extraPrice: 0,
      },
      {
        name: "French fries",
        extraPrice: 0,
      },
    ],
    chooseOne: [
      {
        name: "Bearnaise sauce",
        extraPrice: 0,
      },
      {
        name: "Mushroom sauce",
        extraPrice: 0,
      },
      {
        name: "Gorgonzola sauce",
        extraPrice: 0,
      },
      {
        name: "Brown sauce",
        extraPrice: 0,
      },
      {
        name: "No sauce",
        extraPrice: 0,
      },
    ],
    imageLarge: "pollo-fritto-large.jpeg",
  },
  {
    id: "alc-chicken-breast",
    category: "A la carte",
    name: "Chicken breast",
    description: "With fried onions and optional sauce.",
    price: 139,
    image: "chicken-breast.jpeg",
    type: [
      {
        name: "Potato wedges",
        extraPrice: 0,
      },
      {
        name: "French fries",
        extraPrice: 0,
      },
    ],
    chooseOne: [
      {
        name: "Bearnaise sauce",
        extraPrice: 0,
      },
      {
        name: "Mushroom sauce",
        extraPrice: 0,
      },
      {
        name: "Gorgonzola sauce",
        extraPrice: 0,
      },
      {
        name: "Brown sauce",
        extraPrice: 0,
      },
      {
        name: "No sauce",
        extraPrice: 0,
      },
    ],
    imageLarge: "chicken-breast-large.jpeg",
  },
  {
    id: "alc-nuggets-10",
    category: "A la carte",
    name: "Chicken Nuggets 10 pcs.",
    description: "With remoulade and french fries.",
    price: 99,
    image: "chicken-nuggets.jpeg",
    type: [
      {
        name: "Potato wedges",
        extraPrice: 0,
      },
      {
        name: "French fries",
        extraPrice: 0,
      },
    ],
    chooseOne: [
      {
        name: "Bearnaise sauce",
        extraPrice: 0,
      },
      {
        name: "Mushroom sauce",
        extraPrice: 0,
      },
      {
        name: "Gorgonzola sauce",
        extraPrice: 0,
      },
      {
        name: "Brown sauce",
        extraPrice: 0,
      },
      {
        name: "No sauce",
        extraPrice: 0,
      },
    ],
    imageLarge: "chicken-nuggets-large.jpeg",
  },
  {
    id: "alc-kebab-dish",
    category: "A la carte",
    name: "Kebab dish",
    description: "With mayonnaise and tzatziki.",
    price: 109,
    image: "kebab-dish.jpeg",
    type: [
      {
        name: "Potato wedges",
        extraPrice: 0,
      },
      {
        name: "French fries",
        extraPrice: 0,
      },
    ],
    chooseOne: [
      {
        name: "Bearnaise sauce",
        extraPrice: 0,
      },
      {
        name: "Mushroom sauce",
        extraPrice: 0,
      },
      {
        name: "Gorgonzola sauce",
        extraPrice: 0,
      },
      {
        name: "Brown sauce",
        extraPrice: 0,
      },
      {
        name: "No sauce",
        extraPrice: 0,
      },
    ],
    imageLarge: "kebab-dish-large.jpeg",
  },
  {
    id: "alc-pepper-steak",
    category: "A la carte",
    name: "Pepper steak 200g",
    description: "With pepper sauce.",
    price: 185,
    image: "pepper-steak.jpeg",
    type: [
      {
        name: "Potato wedges",
        extraPrice: 0,
      },
      {
        name: "French fries",
        extraPrice: 0,
      },
    ],
    chooseOne: [
      {
        name: "Bearnaise sauce",
        extraPrice: 0,
      },
      {
        name: "Mushroom sauce",
        extraPrice: 0,
      },
      {
        name: "Gorgonzola sauce",
        extraPrice: 0,
      },
      {
        name: "Brown sauce",
        extraPrice: 0,
      },
      {
        name: "No sauce",
        extraPrice: 0,
      },
    ],
    imageLarge: "pepper-steak-large.jpeg",
  },
  {
    id: "alc-xanthos-steak",
    category: "A la carte",
    name: "Xanthos steak 2 pcs.",
    description: "Greek beef and optional sauce.",
    price: 109,
    image: "xanthos-steak.jpeg",
    type: [
      {
        name: "Potato wedges",
        extraPrice: 0,
      },
      {
        name: "French fries",
        extraPrice: 0,
      },
    ],
    chooseOne: [
      {
        name: "Bearnaise sauce",
        extraPrice: 0,
      },
      {
        name: "Mushroom sauce",
        extraPrice: 0,
      },
      {
        name: "Gorgonzola sauce",
        extraPrice: 0,
      },
      {
        name: "Brown sauce",
        extraPrice: 0,
      },
      {
        name: "No sauce",
        extraPrice: 0,
      },
    ],
    imageLarge: "xanthos-steak-large.jpeg",
  },
  {
    id: "alc-danish-beef",
    category: "A la carte",
    name: "Danish beef 1 pc.",
    description: "With caramelized onions and optional sauce.",
    price: 120,
    image: "danish-beef.jpeg",
    type: [
      {
        name: "Potato wedges",
        extraPrice: 0,
      },
      {
        name: "French fries",
        extraPrice: 0,
      },
    ],
    chooseOne: [
      {
        name: "Bearnaise sauce",
        extraPrice: 0,
      },
      {
        name: "Mushroom sauce",
        extraPrice: 0,
      },
      {
        name: "Gorgonzola sauce",
        extraPrice: 0,
      },
      {
        name: "Brown sauce",
        extraPrice: 0,
      },
      {
        name: "No sauce",
        extraPrice: 0,
      },
    ],
    imageLarge: "danish-beef-large.jpeg",
  },
  {
    id: "alc-vordingborg-beef",
    category: "A la carte",
    name: "Vordingborg beef 250g",
    description: "Minced beef with cheese, bacon and optional sauce.",
    price: 209,
    image: "vordingborg-beef.jpeg",
    type: [
      {
        name: "Potato wedges",
        extraPrice: 0,
      },
      {
        name: "French fries",
        extraPrice: 0,
      },
    ],
    chooseOne: [
      {
        name: "Bearnaise sauce",
        extraPrice: 0,
      },
      {
        name: "Mushroom sauce",
        extraPrice: 0,
      },
      {
        name: "Gorgonzola sauce",
        extraPrice: 0,
      },
      {
        name: "Brown sauce",
        extraPrice: 0,
      },
      {
        name: "No sauce",
        extraPrice: 0,
      },
    ],
    imageLarge: "vordingborg-beef-large.jpeg",
  },
  {
    id: "kids-nuggets",
    category: "Children's Dishes",
    name: "Children Chicken Nuggets 6 pcs.",
    description: "With french fries and ketchup",
    price: 75,
    image: "kids-nuggets.jpeg",
    addOns: [
      {
        name: "Extra Ketchup",
        extraPrice: 0,
      },
      {
        name: "Mayo",
        extraPrice: 5,
      },
    ],
    imageLarge: "kids-nuggets-large.jpeg",
  },
  {
    id: "kids-spaghetti",
    category: "Children's Dishes",
    name: "Children Spaghetti Bolognese",
    description: "Kids portion of spaghetti with meat sauce",
    price: 75,
    image: "kids-spaghetti.jpeg",
    imageLarge: "kids-spaghetti-large.jpeg",
  },
  {
    id: "kids-fish",
    category: "Children's Dishes",
    name: "Children Fish fillet 1 pc.",
    description: "With french fries, remoulade or ketchup",
    price: 75,
    image: "kids-fish.jpeg",
    chooseOne: [
      {
        name: "No sauce",
        extraPrice: 0,
      },
      {
        name: "Remoulade",
        extraPrice: 0,
      },
      {
        name: "Ketchup",
        extraPrice: 0,
      },
    ],
    imageLarge: "kids-fish-large.jpeg",
  },
  {
    id: "kids-p-meatsauce",
    category: "Children Pizza",
    name: "Kids Meat Sauce Pizza",
    description: "Tomato, cheese and meat sauce",
    price: 75,
    image: "kids-pizza-meat.jpeg",
    addOns: [
      {
        name: "Egg",
        extraPrice: 0,
      },
      {
        name: "Pineapple",
        extraPrice: 0,
      },
      {
        name: "Asparagus",
        extraPrice: 0,
      },
      {
        name: "Bacon",
        extraPrice: 0,
      },
      {
        name: "Mushroom",
        extraPrice: 0,
      },
      {
        name: "Chili",
        extraPrice: 6,
      },
      {
        name: "Cocktail sausages",
        extraPrice: 0,
      },
      {
        name: "Gorgonzola",
        extraPrice: 0,
      },
      {
        name: "Minced ham",
        extraPrice: 0,
      },
      {
        name: "Garlic",
        extraPrice: 6,
      },
      {
        name: "Kebab",
        extraPrice: 0,
      },
      {
        name: "Ketchup",
        extraPrice: 0,
      },
      {
        name: "Meatballs",
        extraPrice: 0,
      },
      {
        name: "Meat strips",
        extraPrice: 0,
      },
      {
        name: "Chicken",
        extraPrice: 0,
      },
      {
        name: "Onion",
        extraPrice: 0,
      },
      {
        name: "Air-dried Ham",
        extraPrice: 35,
      },
      {
        name: "Mayonnaise",
        extraPrice: 10,
      },
      {
        name: "Mussels",
        extraPrice: 0,
      },
      {
        name: "Beef fillet",
        extraPrice: 0,
      },
      {
        name: "Olives",
        extraPrice: 0,
      },
      {
        name: "Cheese",
        extraPrice: 0,
      },
      {
        name: "Paprika",
        extraPrice: 0,
      },
      {
        name: "Pepperoni",
        extraPrice: 0,
      },
      {
        name: "Prawns",
        extraPrice: 0,
      },
      {
        name: "Remoulade",
        extraPrice: 10,
      },
      {
        name: "Salad",
        extraPrice: 0,
      },
      {
        name: "Spaghetti",
        extraPrice: 0,
      },
      {
        name: "Tomato",
        extraPrice: 0,
      },
      {
        name: "Tuna",
        extraPrice: 0,
      },
    ],
    imageLarge: "kids-pizza-meat-large.jpeg",
  },
  {
    id: "kids-p-pepperoni",
    category: "Children Pizza",
    name: "Børne Pepperoni Pizza",
    description: "Tomato, cheese and pepperoni",
    price: 75,
    image: "kids-pizza-pepperoni.jpeg",
    addOns: [
      {
        name: "Egg",
        extraPrice: 0,
      },
      {
        name: "Pineapple",
        extraPrice: 0,
      },
      {
        name: "Asparagus",
        extraPrice: 0,
      },
      {
        name: "Bacon",
        extraPrice: 0,
      },
      {
        name: "Mushroom",
        extraPrice: 0,
      },
      {
        name: "Chili",
        extraPrice: 6,
      },
      {
        name: "Cocktail sausages",
        extraPrice: 0,
      },
      {
        name: "Gorgonzola",
        extraPrice: 0,
      },
      {
        name: "Minced ham",
        extraPrice: 0,
      },
      {
        name: "Garlic",
        extraPrice: 6,
      },
      {
        name: "Kebab",
        extraPrice: 0,
      },
      {
        name: "Ketchup",
        extraPrice: 0,
      },
      {
        name: "Meatballs",
        extraPrice: 0,
      },
      {
        name: "Meat strips",
        extraPrice: 0,
      },
      {
        name: "Chicken",
        extraPrice: 0,
      },
      {
        name: "Onion",
        extraPrice: 0,
      },
      {
        name: "Air-dried Ham",
        extraPrice: 35,
      },
      {
        name: "Mayonnaise",
        extraPrice: 10,
      },
      {
        name: "Mussels",
        extraPrice: 0,
      },
      {
        name: "Beef fillet",
        extraPrice: 0,
      },
      {
        name: "Olives",
        extraPrice: 0,
      },
      {
        name: "Cheese",
        extraPrice: 0,
      },
      {
        name: "Paprika",
        extraPrice: 0,
      },
      {
        name: "Pepperoni",
        extraPrice: 0,
      },
      {
        name: "Prawns",
        extraPrice: 0,
      },
      {
        name: "Remoulade",
        extraPrice: 10,
      },
      {
        name: "Salad",
        extraPrice: 0,
      },
      {
        name: "Spaghetti",
        extraPrice: 0,
      },
      {
        name: "Tomato",
        extraPrice: 0,
      },
      {
        name: "Tuna",
        extraPrice: 0,
      },
    ],
    imageLarge: "kids-pizza-pepperoni-large.jpeg",
  },
  {
    id: "kids-p-ham",
    category: "Children Pizza",
    name: "Kids Minced Ham Pizza",
    description: "Tomato, cheese and minced ham",
    price: 75,
    image: "kids-pizza-ham.jpeg",
    addOns: [
      {
        name: "Egg",
        extraPrice: 0,
      },
      {
        name: "Pineapple",
        extraPrice: 0,
      },
      {
        name: "Asparagus",
        extraPrice: 0,
      },
      {
        name: "Bacon",
        extraPrice: 0,
      },
      {
        name: "Mushroom",
        extraPrice: 0,
      },
      {
        name: "Chili",
        extraPrice: 6,
      },
      {
        name: "Cocktail sausages",
        extraPrice: 0,
      },
      {
        name: "Gorgonzola",
        extraPrice: 0,
      },
      {
        name: "Minced ham",
        extraPrice: 0,
      },
      {
        name: "Garlic",
        extraPrice: 6,
      },
      {
        name: "Kebab",
        extraPrice: 0,
      },
      {
        name: "Ketchup",
        extraPrice: 0,
      },
      {
        name: "Meatballs",
        extraPrice: 0,
      },
      {
        name: "Meat strips",
        extraPrice: 0,
      },
      {
        name: "Chicken",
        extraPrice: 0,
      },
      {
        name: "Onion",
        extraPrice: 0,
      },
      {
        name: "Air-dried Ham",
        extraPrice: 35,
      },
      {
        name: "Mayonnaise",
        extraPrice: 10,
      },
      {
        name: "Mussels",
        extraPrice: 0,
      },
      {
        name: "Beef fillet",
        extraPrice: 0,
      },
      {
        name: "Olives",
        extraPrice: 0,
      },
      {
        name: "Cheese",
        extraPrice: 0,
      },
      {
        name: "Paprika",
        extraPrice: 0,
      },
      {
        name: "Pepperoni",
        extraPrice: 0,
      },
      {
        name: "Prawns",
        extraPrice: 0,
      },
      {
        name: "Remoulade",
        extraPrice: 10,
      },
      {
        name: "Salad",
        extraPrice: 0,
      },
      {
        name: "Spaghetti",
        extraPrice: 0,
      },
      {
        name: "Tomato",
        extraPrice: 0,
      },
      {
        name: "Tuna",
        extraPrice: 0,
      },
    ],
    imageLarge: "kids-pizza-ham-large.jpeg",
  },
  {
    id: "salad-xanthos",
    category: "Salads",
    name: "Xanthos Salad",
    description: "With shrimp, tuna and eggs. Served with flutes and butter",
    price: 85,
    image: "salad-xanthos.jpeg",
    imageLarge: "salad-xanthos-large.jpeg",
  },
  {
    id: "salad-shrimp",
    category: "Salads",
    name: "Shrimp Salad",
    description: "Served with flutes and butter",
    price: 85,
    image: "salad-shrimp.jpeg",
    imageLarge: "salad-shrimp-large.jpeg",
  },
  {
    id: "salad-chicken",
    category: "Salads",
    name: "Chicken salad",
    description: "With bacon. Served with flutes and butter",
    price: 85,
    image: "salad-chicken.jpeg",
    imageLarge: "salad-chicken-large.jpeg",
  },
  {
    id: "salad-greek",
    category: "Salads",
    name: "Greek Salad",
    description: "Served with flutes and butter",
    price: 75,
    image: "salad-greek.jpeg",
    addOns: [
      {
        name: "Feta Cheese",
        extraPrice: 0,
      },
    ],
    imageLarge: "salad-greek-large.jpeg",
  },
  {
    id: "salad-ham",
    category: "Salads",
    name: "Chopped Ham Salad",
    description: "Served with flutes and butter",
    price: 85,
    image: "salad-ham.jpeg",
    imageLarge: "salad-ham-large.jpeg",
  },
  {
    id: "durum-classic",
    category: "Durum",
    name: "Durum",
    description: "Homemade flatbread with salad and dressing.",
    price: 80,
    image: "durum.jpeg",
    type: [
      {
        name: "Kebab",
        extraPrice: 0,
      },
      {
        name: "Chicken",
        extraPrice: 0,
      },
      {
        name: "Falafel",
        extraPrice: 0,
      },
      {
        name: "Minced Ham",
        extraPrice: 0,
      },
    ],
    imageLarge: "durum-large.jpeg",
  },
  {
    id: "durum-menu",
    category: "Durum",
    name: "Durum Menu",
    description: "Free choice durum roll and soda can.",
    price: 110,
    image: "durum-menu.jpeg",
    type: [
      {
        name: "Durum - Kebab",
        extraPrice: 0,
      },
      {
        name: "Durum - Chicken",
        extraPrice: 0,
      },
      {
        name: "Durum - Falafel",
        extraPrice: 0,
      },
      {
        name: "Durum - Minced Ham",
        extraPrice: 0,
      },
    ],
    chooseOne: [
      {
        name: "Coca-Cola",
        extraPrice: 0,
      },
      {
        name: "Coca-Cola Light",
        extraPrice: 0,
      },
      {
        name: "Fanta",
        extraPrice: 0,
      },
      {
        name: "Sprite",
        extraPrice: 0,
      },
    ],
    imageLarge: "durum-menu-large.jpeg",
  },
  {
    id: "pita-falafel",
    category: "Homemade Pita Bread",
    name: "Falafel Pita Bread",
    description: "Served with salad and dressing.",
    price: 65,
    image: "pita-falafel.jpeg",
    imageLarge: "pita-falafel-large.jpeg",
  },
  {
    id: "pita-chicken",
    category: "Homemade Pita Bread",
    name: "Chicken Pita bread",
    description: "Served with salad and dressing.",
    price: 65,
    image: "pita-chicken.jpeg",
    imageLarge: "pita-chicken-large.jpeg",
  },
  {
    id: "pita-kebab",
    category: "Homemade Pita Bread",
    name: "Kebab Pita bread",
    description: "Served with salad and dressing.",
    price: 65,
    image: "pita-kebab.jpeg",
    imageLarge: "pita-kebab-large.jpeg",
  },
  {
    id: "pita-ham",
    category: "Homemade Pita Bread",
    name: "Chopped Ham Pita Bread",
    description: "Served with salad and dressing.",
    price: 65,
    image: "pita-ham.jpeg",
    imageLarge: "pita-ham-large.jpeg",
  },
  {
    id: "pita-menu",
    category: "Homemade Pita Bread",
    name: "Pita Bread Menu",
    description: "Free choice pita bread and soda can.",
    price: 105,
    image: "pita-menu.jpeg",
    type: [
      {
        name: "Kebab Pita bread",
        extraPrice: 0,
      },
      {
        name: "Chicken Pita bread",
        extraPrice: 0,
      },
      {
        name: "Falafel Pita bread",
        extraPrice: 0,
      },
      {
        name: "Chopped Ham Pita bread",
        extraPrice: 0,
      },
    ],
    chooseOne: [
      {
        name: "Coca-Cola",
        extraPrice: 0,
      },
      {
        name: "Coca-Cola Light",
        extraPrice: 0,
      },
      {
        name: "Fanta",
        extraPrice: 0,
      },
      {
        name: "Sprite",
        extraPrice: 0,
      },
    ],
    imageLarge: "pita-menu-large.jpeg",
  },
  {
    id: "pizza-sandwich-classic",
    category: "Pizza Sandwich",
    name: "Pizza sandwich",
    description: "Homemade. Served with salad, cheese and dressing.",
    price: 85,
    image: "pizza-sandwich.jpeg",
    type: [
      {
        name: "Kebab",
        extraPrice: 0,
      },
      {
        name: "Chicken",
        extraPrice: 0,
      },
      {
        name: "Tuna",
        extraPrice: 0,
      },
      {
        name: "Falafel",
        extraPrice: 0,
      },
      {
        name: "Dried Ham",
        extraPrice: 0,
      },
    ],
    imageLarge: "pizza-sandwich-large.jpeg",
  },
  {
    id: "club-beef",
    category: "Clubsandwich",
    name: "Beef Sandwich",
    description:
      "Ground beef with cheese, bacon, arugula, green salad, dressing and mayonnaise. Served with boat potatoes and pesto.",
    price: 119,
    image: "beef-sandwich.jpeg",
    imageLarge: "beef-sandwich-large.jpeg",
  },
  {
    id: "club-chicken",
    category: "Clubsandwich",
    name: "Chicken Sandwich",
    description:
      "Chicken strips with arugula, green salad, bacon, curry dressing and mayonnaise. Served with boat potatoes and pesto.",
    price: 119,
    image: "chicken-sandwich.jpeg",
    imageLarge: "chicken-sandwich-large.jpeg",
  },
  {
    id: "club-mexican",
    category: "Clubsandwich",
    name: "Mexican Sandwich",
    description:
      "Chicken strips, bacon, peppers, jalapenos, green salad and curry dressing. Served with boat potatoes and pesto.",
    price: 119,
    image: "mexican-sandwich.jpeg",
    imageLarge: "mexican-sandwich-large.jpeg",
  },
  {
    id: "nachos-chicken",
    category: "Nachos",
    name: "Chicken Nachos",
    description: "With cheddar cheese, guacamole and taco sauce.",
    price: 85,
    image: "nachos-chicken.jpeg",
    imageLarge: "nachos-chicken-large.jpeg",
  },
  {
    id: "nachos-meat",
    category: "Nachos",
    name: "Meat strips Nachos",
    description: "With cheddar cheese, guacamole and taco sauce.",
    price: 85,
    image: "nachos-meat.jpeg",
    imageLarge: "nachos-meat-large.jpeg",
  },
  {
    id: "burg-home-xanthos",
    category: "Beef burger",
    name: "Xanthos Burger",
    description: "Homemade beef burger with fresh salad and dressing",
    price: 69,
    image: "xanthos-burger.jpeg",
    imageLarge: "xanthos-burger-large.jpeg",
  },
  {
    id: "burg-home-cheese",
    category: "Beef burger",
    name: "Cheese Burger",
    description: "Homemade beef burger with melted cheese",
    price: 73,
    image: "home-cheese-burger.jpeg",
    imageLarge: "home-cheese-burger-large.jpeg",
  },
  {
    id: "burg-home-double-bacon",
    category: "Beef burger",
    name: "Double Bacon Cheese Burger",
    description: "Homemade with double bacon and cheese",
    price: 89,
    image: "home-double-bacon.jpeg",
    imageLarge: "home-double-bacon-large.jpeg",
  },
  {
    id: "burg-home-super",
    category: "Beef burger",
    name: "Super Burger",
    description: "Homemade with mushrooms, soft onions and cheese",
    price: 79,
    image: "home-super-burger.jpeg",
    imageLarge: "home-super-burger-large.jpeg",
  },
  {
    id: "burg-home-bacon-cheese",
    category: "Beef burger",
    name: "Bacon Cheese Burger",
    description: "Homemade with cheese and bacon",
    price: 75,
    image: "home-bacon-cheese.jpeg",
    imageLarge: "home-bacon-cheese-large.jpeg",
  },
  {
    id: "burg-norm-hamburger",
    category: "Normal Burger",
    name: "Hamburger",
    description: "Classic burger with salad and dressing",
    price: 62,
    image: "norm-hamburger.jpeg",
    imageLarge: "norm-hamburger-large.jpeg",
  },
  {
    id: "burg-norm-cheese",
    category: "Normal Burger",
    name: "Cheese Burger",
    description: "Classic burger with cheese",
    price: 65,
    image: "norm-cheese.jpeg",
    imageLarge: "norm-cheese-large.jpeg",
  },
  {
    id: "burg-norm-bacon",
    category: "Normal Burger",
    name: "Bacon Burger",
    description: "Classic burger with crispy bacon",
    price: 65,
    image: "norm-bacon.jpeg",
    imageLarge: "norm-bacon-large.jpeg",
  },
  {
    id: "burg-norm-double-bacon",
    category: "Normal Burger",
    name: "Double Bacon Cheese Burger",
    description: "Classic burger with bacon and cheese",
    price: 75,
    image: "norm-double-bacon.jpeg",
    imageLarge: "norm-double-bacon-large.jpeg",
  },
  {
    id: "burg-norm-bacon-cheese",
    category: "Normal Burger",
    name: "Bacon Cheese Burger",
    description: "Classic burger with bacon and cheese",
    price: 69,
    image: "norm-bacon-cheese.jpeg",
    imageLarge: "norm-bacon-cheese-large.jpeg",
  },
  {
    id: "burg-norm-menu",
    category: "Normal Burger",
    name: "Burger Menu",
    description: "With french fries, salad mayonnaise and soda can",
    price: 99,
    image: "burger-menu.jpeg",
    chooseOne: [
      {
        name: "Coca-Cola",
        extraPrice: 0,
      },
      {
        name: "Coca-Cola Light",
        extraPrice: 0,
      },
      {
        name: "Fanta",
        extraPrice: 0,
      },
      {
        name: "Sprite",
        extraPrice: 0,
      },
    ],
    imageLarge: "burger-menu-large.jpeg",
  },
  {
    id: "burg-norm-chicken",
    category: "Normal Burger",
    name: "Chicken Burger",
    description: "Crispy chicken burger with salad and dressing",
    price: 70,
    image: "chicken-burger.jpeg",
    imageLarge: "chicken-burger-large.jpeg",
  },
  {
    id: "side-fries-small",
    category: "French fries",
    name: "French Fries (Small)",
    description: "Crispy golden french fries",
    price: 45,
    image: "fries-small.jpeg",
    addOns: [
      {
        name: "Ketchup",
        extraPrice: 0,
      },
      {
        name: "Mayo",
        extraPrice: 5,
      },
    ],
    imageLarge: "fries-small-large.jpeg",
  },
  {
    id: "side-fries-large",
    category: "French fries",
    name: "French Fries (Large)",
    description: "Large portion of crispy golden french fries",
    price: 50,
    image: "fries-large.jpeg",
    addOns: [
      {
        name: "Ketchup",
        extraPrice: 0,
      },
      {
        name: "Mayo",
        extraPrice: 5,
      },
    ],
    imageLarge: "fries-large-large.jpeg",
  },
  {
    id: "side-wedges",
    category: "French fries",
    name: "Potato wedges (Large)",
    description: "Seasoned potato wedges",
    price: 55,
    image: "potato-wedges.jpeg",
    imageLarge: "potato-wedges-large.jpeg",
  },
  {
    id: "fish-shrimp-10",
    category: "Fish dishes",
    name: "Baked Shrimp 10 pcs.",
    description: "With french fries, salad and garlic dressing",
    price: 109,
    image: "fish-shrimp.jpeg",
    imageLarge: "fish-shrimp-large.jpeg",
  },
  {
    id: "fish-fillet-2",
    category: "Fish dishes",
    name: "Fish fillet 2 pcs.",
    description: "With french fries, salad and remoulade",
    price: 109,
    image: "fish-fillet.jpeg",
    imageLarge: "fish-fillet-large.jpeg",
  },
  {
    id: "fish-calamari-10",
    category: "Fish dishes",
    name: "Calamari 10 pcs.",
    description: "With french fries, salad and garlic dressing",
    price: 109,
    image: "calamari.jpeg",
    imageLarge: "calamari-large.jpeg",
  },
  {
    id: "fish-salmon-2",
    category: "Fish dishes",
    name: "Salmon 2 pcs.",
    description: "With french fries, salad and bearnaisesauce",
    price: 159,
    image: "salmon-dish.jpeg",
    imageLarge: "salmon-dish-large.jpeg",
  },
  {
    id: "extra-dipping",
    category: "Extras",
    name: "Dipping",
    description: "Choose your favorite dipping sauce",
    price: 15,
    image: "dipping.jpeg",
    chooseOne: [
      {
        name: "Remoulade",
        extraPrice: 0,
      },
      {
        name: "Salat-mayonnaise",
        extraPrice: 0,
      },
      {
        name: "Ketchup",
        extraPrice: 0,
      },
      {
        name: "Chili-mayonnaise",
        extraPrice: 0,
      },
      {
        name: "Hvidløgsdressing",
        extraPrice: 0,
      },
    ],
    imageLarge: "dipping-large.jpeg",
  },
  {
    id: "snack-chili-cheese",
    category: "Snacks",
    name: "Chili Cheese Tops 5 pcs.",
    description: "Spicy melted cheese in a crispy coating",
    price: 45,
    image: "chili-cheese.jpeg",
    imageLarge: "chili-cheese-large.jpeg",
  },
  {
    id: "snack-onion-rings",
    category: "Snacks",
    name: "Onion Rings 5 pcs.",
    description: "Crispy battered onion rings",
    price: 40,
    image: "onion-rings.jpeg",
    imageLarge: "onion-rings-large.jpeg",
  },
  {
    id: "snack-mozzarella-sticks",
    category: "Snacks",
    name: "Mozzarella Sticks 5 pcs.",
    description: "Melted mozzarella breaded and fried",
    price: 45,
    image: "mozzarella-sticks.jpeg",
    imageLarge: "mozzarella-sticks-large.jpeg",
  },
  {
    id: "snack-box",
    category: "Snacks",
    name: "Snack Box",
    description:
      "5 pcs chili cheese tops, 5 pcs onion rings, 5 pcs mozzarella sticks and french fries",
    price: 95,
    image: "snack-box.jpeg",
    imageLarge: "snack-box-large.jpeg",
  },
  {
    id: "dessert-darido-is",
    category: "Desserts",
    name: "Darido is",
    description:
      "Vanilla, chocolate, and strawberry ice cream w. whipped cream and chocolate sauce",
    price: 65,
    image: "darido-is.jpeg",
    imageLarge: "darido-is-large.jpeg",
  },
  {
    id: "bev-cola",
    category: "Beverages",
    name: "Coca-Cola",
    description: "Out of the house only. Choose size.",
    price: 25,
    image: "cola.jpeg",
    type: [
      {
        name: "0.5L",
        extraPrice: 0,
      },
      {
        name: "1.5L",
        extraPrice: 15,
      },
    ],
    imageLarge: "cola-large.jpeg",
  },
  {
    id: "bev-cola-zero",
    category: "Beverages",
    name: "Coca-Cola zero",
    description: "Out of the house only. Choose size.",
    price: 25,
    image: "cola-zero.jpeg",
    type: [
      {
        name: "0.5L",
        extraPrice: 0,
      },
      {
        name: "1.5L",
        extraPrice: 15,
      },
    ],
    imageLarge: "cola-zero-large.jpeg",
  },
  {
    id: "bev-sprite",
    category: "Beverages",
    name: "Sprite",
    description: "Out of the house only. Choose size.",
    price: 25,
    image: "sprite.jpeg",
    type: [
      {
        name: "0.5L",
        extraPrice: 0,
      },
      {
        name: "1.5L",
        extraPrice: 15,
      },
    ],
    imageLarge: "sprite-large.jpeg",
  },
  {
    id: "bev-fanta",
    category: "Beverages",
    name: "Fanta",
    description: "Out of the house only. Choose size.",
    price: 25,
    image: "fanta.jpeg",
    type: [
      { name: "0.5L", extraPrice: 0 },
      { name: "1.5L", extraPrice: 15 },
    ],
    imageLarge: "fanta-large.jpeg",
  },
  {
    id: "bev-wine",
    category: "Beverages",
    name: "Wine",
    description:
      "1 Bottle of house red or white wine (Out of the house only). 14% vol",
    price: 169,
    image: "wine.jpeg",
    tags: ["18+"],
    type: [
      {
        name: "Red Wine",
        extraPrice: 0,
      },
      {
        name: "White Wine",
        extraPrice: 0,
      },
    ],
    imageLarge: "wine-large.jpeg",
  },
  {
    id: "bev-beer",
    category: "Beverages",
    name: "Beer 33 cl",
    description: "4.6% vol, 0.33l. Age restriction 18+",
    price: 25,
    image: "beer.jpeg",
    tags: ["18+"],
    imageLarge: "beer-large.jpeg",
  },
  {
    id: "bev-water",
    category: "Beverages",
    name: "Water - 0,5L",
    description: "Refreshing still water",
    price: 18,
    image: "water.jpeg",
    imageLarge: "water-large.jpeg",
  },
];
