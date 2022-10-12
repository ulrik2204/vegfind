import { Card, CardContent, CardMedia, Typography } from "@mui/material";

type ProductItemProps = {
  title: string;
  type: string;
  shops: string[];
  categories: string[];
  priceNOK: number;
  imageUrl: string;
};
export default function ProductItem(props: ProductItemProps) {
  return (
    <Card sx={{ width: "20rem" }}>
      <CardMedia component="img" alt="" height="150" image={props.imageUrl} />
      <CardContent>
        <Typography variant="h6">{props.title}</Typography>
        <Typography>{props.type}</Typography>
        <Typography>Shops: {props.shops.join(", ")}</Typography>
        <Typography>Price: {props.priceNOK} kr</Typography>
        <Typography>Categories: {props.categories.join(", ")}</Typography>
      </CardContent>
    </Card>
  );
}
