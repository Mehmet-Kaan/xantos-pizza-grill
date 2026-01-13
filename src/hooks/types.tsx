export interface IngredientOption {
  name: string;
  extraPrice?: number; // optional extra cost
}

export interface Product {
  id: string;
  category: string;
  name: string;
  desc: string;
  price: number;
  image: string;
  ingredients?: IngredientOption[];
  selectedIngredients?: IngredientOption[];
  tags?: string[];
}
