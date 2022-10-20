import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { ProductProjected } from "../helpers/types";

type ProductItemProps = {
  product: ProductProjected;
};
export default function ProductItem(props: ProductItemProps) {
  return (
    <Card>
      <CardMedia component="img" alt="" height="150" image={props.product.imageUrl} />
      <CardContent>
        <Typography variant="h6">{props.product.title}</Typography>
        <Typography>{props.product.brand}</Typography>
        <Typography>{props.product.type}</Typography>
        <Typography>{props.product.categories?.join(", ")}</Typography>
      </CardContent>
    </Card>
  );
}
