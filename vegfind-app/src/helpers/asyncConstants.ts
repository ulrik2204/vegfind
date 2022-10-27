import sanityClient from "../lib/sanityClient";

export const BRANDS = (async () =>
  (await sanityClient.fetch<{ name: string }[]>(`*[_type == "brand"]{name}`)).map(
    (brand) => brand.name,
  ))();

export const CATEGORIES = (async () =>
  (await sanityClient.fetch<{ title: string }[]>(`*[_type == "category"]{title}`)).map(
    (category) => category.title,
  ))();
