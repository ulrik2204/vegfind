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
          sm: "95%",
          lg: "60%",
        },
      }}
    >
      <Typography
        variant="h1"
        sx={{
          marginTop: "2rem",
        }}
      >
        {props.title}
      </Typography>
      <Box>{props.children}</Box>
    </Box>
  );
}