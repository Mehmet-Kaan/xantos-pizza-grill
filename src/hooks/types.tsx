export interface AddOnOption {
  name: string;
  extraPrice?: number; // optional extra cost
}

export interface Product {
  id: string;
  category: string;
  name: string;
  description: string;
  price: number;
  imageExist?: string;
  image: string;
  imageLarge: string;
  size?: AddOnOption[];
  type?: AddOnOption[];
  chooseOne?: AddOnOption[];
  addOns?: AddOnOption[];
  addOnsExtra?: AddOnOption[];
  tags?: string[];
  stripePriceId?: string;
  stripeProductId?: string;
}
