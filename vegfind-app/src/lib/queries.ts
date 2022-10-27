import { ProductProjected } from "../helpers/types";
import sanityClient from "./sanityClient";

function productsSearch(searchString: string, slice?: { offset: number; size: number }) {
  const searchStr = '"*' + searchString.toLowerCase() + '*"';
  const sliceFilter =
    slice === undefined ? "" : `[${slice.offset}..${slice.offset + slice.size - 1}]`;
  return `*[_type == "product" ${
    searchString === ""
      ? ""
      : `&& (title match ${searchStr} || brand->name match ${searchStr} || count(categories[title match ${searchStr}]) >= 1)`
  }] | order(lower(title) asc)${sliceFilter}`;
}

const sanityGROQ = {
  getProducts: (searchString: string, offset: number, size: number) => `${productsSearch(
    searchString,
    { offset, size },
  )} {
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
  getProductCount: (searchString: string) => `count(${productsSearch(searchString)})`,
};

export function getProductsSanity(searchString: string, offset: number, size: number) {
  return sanityClient.fetch(sanityGROQ.getProducts(searchString, offset, size)) as Promise<
    ProductProjected[]
  >;
}

export function getProductsCountSanity(searchString: string) {
  return sanityClient.fetch(sanityGROQ.getProductCount(searchString)) as Promise<number>;
}
