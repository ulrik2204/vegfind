import { Box, Pagination, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import PageTemplate from "../components/PageTemplate";
import ProductItem from "../components/ProductItem";
import useDebounce from "../helpers/hooks";
import { getProductsCountSanity, getProductsSanity } from "../lib/queries";

const PRODUCTS_PAGE_SIZE = 20;

const Home: NextPage = () => {
  const [page, setPage] = useState(0);
  const [searchString, setSearchString] = useState("");
  const debouncedSearchString = useDebounce(searchString);
  const { products, productCount } = useProducts(
    debouncedSearchString,
    page * PRODUCTS_PAGE_SIZE,
    PRODUCTS_PAGE_SIZE,
  );
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
        <TextField
          variant="filled"
          label="Search for products"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          sx={{ margin: "1em 0 1em 0" }}
        />
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
        <br />
        <Pagination color="primary" count={pagesCount} onChange={(_, page) => setPage(page - 1)} />
      </PageTemplate>
    </>
  );
};

export default Home;

function useProducts(searchString: string, offset: number, size: number) {
  const {
    data: products,
    // isLoading: isProductsLoading,
    // error: productsError,
  } = useQuery(["products", searchString, offset, size], () =>
    getProductsSanity(searchString, offset, size),
  );
  const {
    data: productCount,
    // isLoading: isProductsCountLoading,
    // error: productCountLoading,
  } = useQuery(["productsCount", searchString], () => getProductsCountSanity(searchString));

  return { products, productCount };
}
