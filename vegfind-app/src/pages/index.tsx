import { Box } from "@mui/material";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import PageTemplate from "../components/PageTemplate";
import ProductItem from "../components/ProductItem";
import { ProductProjected } from "../helpers/types";
import sanityClient from "../lib/sanityClient";
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
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              sm: "1fr",
              lg: "1fr 1fr 1fr 1fr",
            },
            gap: "1rem",
          }}
        >
          {props.products.map((item) => {
            return <ProductItem key={item._id} product={item} />;
          })}
        </Box>
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
