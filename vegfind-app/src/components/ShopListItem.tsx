import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { ShopWithProduct } from "../helpers/types";

type ShopListItemProps = {
  shop: ShopWithProduct;
};
export default function ShopListItem(props: ShopListItemProps) {
  const innerShop = props.shop.shop;
  const address = `${innerShop.address}, ${innerShop.postalCode}, ${innerShop.city}`;
  return (
    <Card>
      <CardMedia component="img" alt="" height="150" image={props.shop.shop.imageUrl} />
      <CardContent>
        <Typography variant="h6">{props.shop.shop.name}</Typography>
        <Typography>{props.shop.shop.supermarketChain}</Typography>
        <Typography>{props.shop.price.toFixed(2)} kr</Typography>
        <Typography>Stock Count: {props.shop.stockCount ?? "unknown"} </Typography>
        <Typography>Address: {address}</Typography>
      </CardContent>
    </Card>
  );
}
