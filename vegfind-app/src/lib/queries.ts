import { Filters, ProductDetailedProjected, ProductProjected } from "../helpers/types";
import sanityClient from "./sanityClient";

function productsSearch(
  searchString: string,
  filters: Filters | null,
  slice?: { offset: number; size: number },
) {
  const searchStr = '"*' + searchString.toLowerCase() + '*"';
  const sliceFilter =
    slice === undefined ? "" : `[${slice.offset}..${slice.offset + slice.size - 1}]`;
  const searchBySearchString =
    searchString === ""
      ? ""
      : `&& (title match ${searchStr} || brand->name match ${searchStr} || categories[]->title match ${searchStr})`;
  const filterVegan = filters?.veganOnly ? `&& (type == "vegan")` : "";
  const filterMinPrice =
    filters?.minPrice && filters.minPrice > 0
      ? `&& count(shopsWithProduct[price >= ${filters.minPrice}]) > 0`
      : "";
  const filterMaxPrice =
    filters?.maxPrice && filters.maxPrice > 0
      ? `&& count(shopsWithProduct[price <= ${filters.maxPrice}]) > 0`
      : "";
  const excludeAllergens = (() => {
    if (filters?.excludeAllergens === undefined) return "";
    const fAllergens = filters.excludeAllergens;
    const exAllergens = Object.keys(fAllergens)
      .filter((allergen) => fAllergens[allergen])
      .map((allergen) => allergen.toLocaleLowerCase());
    if (exAllergens.length === 0) return "";
    return `&& count(allergens[!@ in ${JSON.stringify(exAllergens)}]) == 0`;
  })();
  const filterBrands = (() => {
    if (filters?.brands === undefined) return "";
    const fBrands = filters.brands;
    const allBrands = Object.keys(fBrands);
    const brands = allBrands.filter((brand) => fBrands[brand]).map((brand) => brand.toLowerCase());
    if (brands.length === 0) return "";
    else if (brands.length === allBrands.length) return "";
    return `&& lower(brand->name) in ${JSON.stringify(brands)}`;
  })();
  const filterCategories = (() => {
    if (filters?.categories === undefined) return "";
    const fCategories = filters.categories;
    const allCategories = Object.keys(fCategories);
    const categories = allCategories
      .filter((category) => fCategories[category])
      .map((category) => category.toLowerCase());

    if (categories.length === 0) return "";
    else if (categories.length === allCategories.length) return "";
    return `&& categories[]->title match ${JSON.stringify(categories)}`;
  })();

  return `*[_type == "product" ${searchBySearchString} ${filterVegan} ${filterMinPrice} ${filterMaxPrice} ${excludeAllergens} ${filterBrands} ${filterCategories}] | order(lower(title) asc)${sliceFilter}`;
}

const productProjection = `{
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
    "price": shopsWithProduct[]->price,
    "brand": brand->name,
    "updatedAt": _updatedAt
   }`;

const productDetailedProjection = `{
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
        name,
        "imageUrl": image.asset->url,
        "supermarketChain": supermarketChain->name,
        address,
        city,
        postalCode,
      },
      stockCount,
      price
    },
    "categories": categories[]->title,
    weight,
    brand->{
      _id,
      name,
      "imageUrl": logo.asset->url,
    },
    "updatedAt": _updatedAt
   }`;

const sanityGROQ = {
  getProducts: (searchString: string, filters: Filters | null, offset: number, size: number) =>
    `${productsSearch(searchString, filters, { offset, size })} ${productProjection}`,
  getProductCount: (searchString: string, filters: Filters | null) =>
    `count(${productsSearch(searchString, filters)})`,
  getProduct: (id: string) =>
    `*[_type == "product" && _id == "${id}"] ${productDetailedProjection}`,
};

export function getProductsSanity(
  searchString: string,
  filters: Filters | null,
  offset: number,
  size: number,
) {
  return sanityClient.fetch(sanityGROQ.getProducts(searchString, filters, offset, size)) as Promise<
    ProductProjected[]
  >;
}

export function getProductsCountSanity(searchString: string, filters: Filters | null) {
  return sanityClient.fetch(sanityGROQ.getProductCount(searchString, filters)) as Promise<number>;
}

export async function getProductSanity(id: string) {
  const result = (await sanityClient.fetch(
    sanityGROQ.getProduct(id),
  )) as ProductDetailedProjected[];
  return result[0];
}
