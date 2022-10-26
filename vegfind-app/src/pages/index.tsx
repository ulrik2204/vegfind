import { Box, Pagination } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import PageTemplate from "../components/PageTemplate";
import ProductItem from "../components/ProductItem";
import { getProductsCountSanity, getProductsSanity } from "../lib/queries";

const PRODUCTS_PAGE_SIZE = 20;

const Home: NextPage = () => {
  const [page, setPage] = useState(0);
  const { products, productCount } = useProducts(page, PRODUCTS_PAGE_SIZE);
  const pagesCount = productCount !== undefined ? Math.ceil(productCount / PRODUCTS_PAGE_SIZE) : 1;
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
              xs: "1fr",
              sm: "1fr 1fr",
              md: "1fr 1fr 1fr 1fr",
            },
            gap: "1rem",
          }}
        >
          {products?.map((item) => {
            return <ProductItem key={item._id} product={item} />;
          })}
        </Box>
        <Pagination color="primary" count={pagesCount} onChange={(_, page) => setPage(page)} />
      </PageTemplate>
    </>
  );
};

export default Home;

function useProducts(offset: number, size: number) {
  const {
    data: products,
    isLoading: isProductsLoading,
    error: productsError,
  } = useQuery(["products", offset, size], () => getProductsSanity(offset, size));
  const {
    data: productCount,
    isLoading: isProductsCountLoading,
    error: productCountLoading,
  } = useQuery(["productsCount"], getProductsCountSanity);
  return { products, productCount };
}
