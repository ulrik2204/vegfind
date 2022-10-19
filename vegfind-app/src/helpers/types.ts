export type ProductProjected = {
  _id: string;
  title: string;
  description: string; // This is wrong, it is BlockContent/TypedObject[]
  type: string;
  stockCount: number;
  allergens: string[];
  shops: {
    _id: string;
    name: string;
  }[];
  categories: string[];
  weight: number;
  price: number;
  brand: string;
  updatedAt: string;
  imageUrl: string;
};
