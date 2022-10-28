import { TypedObject } from "@portabletext/types";
export type ProductProjected = {
  _id: string;
  title?: string;
  description?: TypedObject | TypedObject[]; // This is wrong, it is BlockContent/TypedObject[]
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
    price?: number;
    stockCount: number;
  }[];
  categories?: string[];
  weight?: number;
  brand?: string;
  updatedAt?: string;
  imageUrl?: string;
};

export type ShopWithProduct = {
  _id: string;
  shop?: {
    _id: string;
    name?: string;
    imageUrl?: string;
    supermarketChain?: string;
    address?: string;
    city?: string;
    postalCode?: number;
  };
  price?: number;
  stockCount?: number;
};

export type ProductDetailedProjected = Omit<ProductProjected, "brand" | "shopsWithProduct"> & {
  brand: {
    _id: string;
    name: string;
    imageUrl: string;
  };
  shopsWithProduct?: ShopWithProduct[];
};

export type BoolDict = {
  [key: string]: boolean;
};

export type Filters = {
  categories: BoolDict;
  brands: BoolDict;
  minPrice: number;
  maxPrice: number;
  veganOnly: boolean;
  excludeAllergens: BoolDict;
};
