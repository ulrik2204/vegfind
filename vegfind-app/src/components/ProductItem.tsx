import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { ProductProjected } from "../helpers/types";

type ProductItemProps = {
  product: ProductProjected;
};
export default function ProductItem(props: ProductItemProps) {
  return (
    <Card sx={{ width: "20rem" }}>
      <CardMedia component="img" alt="" height="150" image={props.product.imageUrl} />
      <CardContent>
        <Typography variant="h6">{props.product.title}</Typography>
        <Typography>{props.product.type}</Typography>
        <Typography>Shops: {props.product.shops.join(", ")}</Typography>
        <Typography>Price: {props.product.price} kr</Typography>
        <Typography>Categories: {props.product.categories.join(", ")}</Typography>
      </CardContent>
    </Card>
  );
}
