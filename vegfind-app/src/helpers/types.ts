export type ProductProjected = {
  _id: string;
  title?: string;
  description?: string; // This is wrong, it is BlockContent/TypedObject[]
  type?: string;
  allergens?: string[];
  shops?: {
    _id: string;
    name: string;
  }[];
  shopsWithProduct?: {
    _id: string;
    shop: {
      _id: string;
      name: string;
    };
    price: number;
    stockCount: number;
  }[];
  categories?: string[];
  weight?: number;
  brand?: string;
  updatedAt?: string;
  imageUrl?: string;
};
