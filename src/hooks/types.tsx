export interface IngredientOption {
  name: string;
  extraPrice?: number; // optional extra cost
}

export interface Product {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  image: string;
  stripePriceId?: string;
  stripeProductId?: string;
  ingredients?: IngredientOption[];
  selectedIngredients?: IngredientOption[];
  tags?: string[];
}
