import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import Link from "next/link";
import { useMemo } from "react";
import { ProductProjected } from "../helpers/types";

type ProductItemProps = {
  product: ProductProjected;
};
export default function ProductItem(props: ProductItemProps) {
  const shops = props.product.shopsWithProduct;
  const lowestPrice = useMemo(() => {
    const prices: number[] | undefined = shops
      ?.map((item) => item?.price ?? Infinity)
      ?.filter((price) => price !== Infinity);
    if (prices === undefined || prices.length === 0) return undefined;
    return prices !== undefined ? Math.min(...prices) : undefined;
  }, [props]);

  return (
    <Link href={`/products/${props.product._id}`}>
      <Card sx={{ cursor: "pointer" }}>
        <CardMedia component="img" alt="" height="150" image={props.product.imageUrl} />
        <CardContent>
          <Typography variant="h6">{props.product.title}</Typography>
          <Typography>{props.product.brand}</Typography>
          <Typography>{props.product.type}</Typography>
          <Typography>{props.product.categories?.join(", ")}</Typography>
          <Typography>{props.product.allergens?.join(", ")}</Typography>
          {lowestPrice && <Typography>From {lowestPrice.toFixed(2)} kr</Typography>}
        </CardContent>
      </Card>
    </Link>
  );
}
