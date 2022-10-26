import { ProductProjected } from "../helpers/types";
import sanityClient from "./sanityClient";

const sanityGROQ = {
  getProducts: (
    offset: number,
    size: number,
  ) => `*[_type == "product"] | order(lower(title) asc)[${offset}..${offset + size - 1}] {
    _id,
    title,
    description,
    "slug": slug.current,
    "imageUrl": image.asset->url,
    type,
    allergens,
    "shops": shops[] -> {
      _id,
      name
    },
    "shopsWithProduct": shopsWithProduct[]{
      _id,
      "shop": shop -> {
        _id,
        name
      },
      stockCount,
      price
    },
    "categories": categories[]->title,
    weight,
    price,
    "brand": brand->name,
    "updatedAt": _updatedAt
   }`,
  GET_PRODUCT_COUNT: `count(*[_type == "product"])`,
};

export function getProductsSanity(offset: number, size: number) {
  return sanityClient.fetch(sanityGROQ.getProducts(offset, size)) as Promise<ProductProjected[]>;
}

export function getProductsCountSanity() {
  return sanityClient.fetch(sanityGROQ.GET_PRODUCT_COUNT) as Promise<number>;
}
