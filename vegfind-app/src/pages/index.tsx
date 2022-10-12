import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import sanityClient from "../lib/sanityClient";
import styles from "../styles/Home.module.css";

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
};

type HomeProps = {
  products: ProductProjected[];
};
const Home: NextPage<HomeProps> = (props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Vegfind</title>
        <meta
          name="description"
          content="Next level supermarket tool for vegetarians and vegans!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {props.products.map((item) => {
          return (
            <div key={item._id}>
              <div>{item.title}</div>
              <div>
                <span>{item.brand}</span> <span>{item.type}</span> <span>{item.price} kr</span>
              </div>
            </div>
          );
        })}
      </main>
      <footer className={styles.footer}></footer>
    </div>
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
