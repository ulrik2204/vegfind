import { Box, Paper, Typography } from "@mui/material";
import { PortableText } from "@portabletext/react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import PageTemplate from "../../components/PageTemplate";
import ShopListItem from "../../components/ShopListItem";
import { getProductSanity } from "../../lib/queries";

export default function ProductPage() {
  const router = useRouter();
  const { id: lid } = router.query;
  const id = (lid as string | undefined) ?? "";
  const { data } = useQuery(["singleProduct", id], () => getProductSanity(id), {
    enabled: id?.length > 0,
  });

  if (!data) return <Box>Loading...</Box>;
  return (
    <PageTemplate title={data?.title ?? "Single Product"}>
      <Paper
        elevation={1}
        sx={{
          padding: "3em",
          display: "flex",
          flexFlow: "column",
          justifyContent: "center",
          flexGrow: 0,
          marginBottom: "3em",
        }}
      >
        <Box
          sx={{ height: "15rem", objectFit: "contain" }}
          component="img"
          src={data.imageUrl ?? ""}
          alt=""
        ></Box>
        <Box>
          <Typography variant="h5">{data?.title?.toUpperCase() ?? ""}</Typography>
          <span>
            <Typography>{data.brand.name.toUpperCase()}</Typography>

            <Box
              sx={{ height: "10rem" }}
              component="img"
              src={data.brand.imageUrl ?? ""}
              alt=""
            ></Box>
          </span>
          <Typography>Type: {data.type}</Typography>
          <Typography>Categories: {data.categories?.join(", ") ?? "None"}</Typography>
          <Typography>Allergens: {data.allergens?.join(", ") ?? "None"}</Typography>
          <br />
          <PortableText value={data.description ?? []}></PortableText>
        </Box>
      </Paper>
      <Typography variant="h3">Shops</Typography>

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
        {data?.shopsWithProduct?.map((shop) => {
          return <ShopListItem key={shop._id} shop={shop} />;
        })}
      </Box>
    </PageTemplate>
  );
}
