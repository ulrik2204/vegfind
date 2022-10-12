import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import PageTemplate from "../components/PageTemplate";
import ProductItem from "../components/ProductItem";
import sanityClient from "../lib/sanityClient";

type ProductProjected = {
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

type HomeProps = {
  products: ProductProjected[];
};
const Home: NextPage<HomeProps> = (props) => {
  return (
    <>
      <Head>
        <title>Vegfind</title>
        <meta
          name="description"
          content="Next level supermarket tool for vegetarians and vegans!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageTemplate title="Products">
        {props.products.map((item) => {
          return (
            <ProductItem
              key={item._id}
              title={item.title}
              type={item.type}
              priceNOK={item.price}
              categories={item.categories}
              shops={item.shops.map((shop) => shop.name)}
              imageUrl={item.imageUrl}
            />
          );
        })}
      </PageTemplate>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  // Get the 6 newst posts from sanity
  const query = `*[_type == "product"] | order(_updatedAt desc) {
    _id,
    title,
    description,
    "slug": slug.current,
    "imageUrl": image.asset->url,
    type,
    stockCount,
    allergens,
    "shops": shops[] -> {
      _id,
      name
    },
    "categories": categories[]->title,
    weight,
    price,
    "brand": brand.name,
    "updatedAt": _updatedAt
   }`;

  const products: ProductProjected[] = await sanityClient.fetch(query);

  return {
    props: {
      products,
    },
  };
};
