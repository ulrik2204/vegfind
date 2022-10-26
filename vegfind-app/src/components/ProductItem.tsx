import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { useMemo } from "react";
import { ProductProjected } from "../helpers/types";

type ProductItemProps = {
  product: ProductProjected;
};
export default function ProductItem(props: ProductItemProps) {
  const shops = props.product.shopsWithProduct;
  const lowestPrice = useMemo(
    () => (shops !== undefined ? Math.min(...shops.map((item) => item.price)) : undefined),
    [props],
  );
  return (
    <Card>
      <CardMedia component="img" alt="" height="150" image={props.product.imageUrl} />
      <CardContent>
        <Typography variant="h6">{props.product.title}</Typography>
        <Typography>{props.product.brand}</Typography>
        <Typography>{props.product.type}</Typography>
        <Typography>{props.product.categories?.join(", ")}</Typography>
        {lowestPrice && <Typography>From {lowestPrice.toFixed(2)} kr</Typography>}
      </CardContent>
    </Card>
  );
}
