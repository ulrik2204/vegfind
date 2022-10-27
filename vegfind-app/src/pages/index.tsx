import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Pagination,
  TextField,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import FilterBox from "../components/FilterBox";
import PageTemplate from "../components/PageTemplate";
import ProductItem from "../components/ProductItem";
import { BRANDS, CATEGORIES } from "../helpers/asyncConstants";
import { allergens } from "../helpers/constants";
import useDebounce from "../helpers/hooks";
import { Filters } from "../helpers/types";
import { getProductsCountSanity, getProductsSanity } from "../lib/queries";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const PRODUCTS_PAGE_SIZE = 20;

async function getFilterInitialValues(): Promise<Filters> {
  return {
    brands: (await BRANDS).reduce((dict, brand) => ({ ...dict, [brand]: false }), {}),
    categories: (await CATEGORIES).reduce((dict, category) => ({ ...dict, [category]: false }), {}),
    excludeAllergens: allergens.reduce((dict, allergen) => ({ ...dict, [allergen]: false }), {}),
    minPrice: 0,
    maxPrice: -1,
    veganOnly: false,
  };
}

function useFilterInitialValues() {
  const { data } = useQuery(["initialFilter"], getFilterInitialValues);
  return data;
}

const Home: NextPage = () => {
  const [page, setPage] = useState(0);
  const [expanded, setExpanded] = useState<string | false>(false);
  const [searchString, setSearchString] = useState("");
  const [filterValues, setFilterValues] = useState<Filters | null>(null);
  const debouncedSearchString = useDebounce(searchString);
  const { products, productCount } = useProducts(
    debouncedSearchString,
    filterValues,
    page * PRODUCTS_PAGE_SIZE,
    PRODUCTS_PAGE_SIZE,
  );
  const filterInitialValues = useFilterInitialValues();
  const pagesCount = productCount !== undefined ? Math.ceil(productCount / PRODUCTS_PAGE_SIZE) : 1;
  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleSubmit = (filters: Filters) => {
    setFilterValues(filters);
    setExpanded(false);
  };
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
        {filterInitialValues && (
          <Accordion
            sx={{ borderRadius: "3px", marginBottom: "3rem" }}
            expanded={expanded === "filterbox"}
            onChange={handleChange("filterbox")}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>Show Filters</AccordionSummary>
            <AccordionDetails>
              <FilterBox filterInitialValues={filterInitialValues} onSubmit={handleSubmit} />
            </AccordionDetails>
          </Accordion>
        )}
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

function useProducts(searchString: string, filters: Filters | null, offset: number, size: number) {
  const {
    data: products,
    // isLoading: isProductsLoading,
    // error: productsError,
  } = useQuery(["products", searchString, filters, offset, size], () =>
    getProductsSanity(searchString, filters, offset, size),
  );
  const {
    data: productCount,
    // isLoading: isProductsCountLoading,
    // error: productCountLoading,
  } = useQuery(["productsCount", searchString, filters], () =>
    getProductsCountSanity(searchString, filters),
  );

  return { products, productCount };
}
