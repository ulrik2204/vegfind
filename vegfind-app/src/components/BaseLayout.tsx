import { Box } from "@mui/material";
import { ReactElement, ReactNode } from "react";
import NavBar from "./NavBar";

type BaseLayoutProps = {
  children: ReactNode;
};
export default function BaseLayout(props: BaseLayoutProps): ReactElement {
  return (
    <Box
      sx={{
        backgroundColor: "background.default",
        height: "100vh",
        width: "100%",
        minWidth: "90vw",
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
      }}
    >
      <NavBar />
      {props.children}
    </Box>
  );
}
