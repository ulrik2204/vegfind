import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

type PageContainerProps = {
  title: string;
  children: ReactNode;
};
export default function PageTemplate(props: PageContainerProps) {
  return (
    <Box
      component={"main"}
      sx={{
        width: {
          xs: "95%",
          lg: "70%",
        },
        overflow: "hidden",
      }}
    >
      <Typography
        variant="h1"
        sx={{
          marginTop: "2rem",
          textOverflow: "ellipsis",
          fontSize: "64px",
        }}
      >
        {props.title}
      </Typography>
      <Box>{props.children}</Box>
    </Box>
  );
}
