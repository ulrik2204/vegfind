import { createTheme, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import BaseLayout from "../components/BaseLayout";
import "../styles/globals.css";

const queryClient = new QueryClient();

const theme = createTheme({
  palette: {
    primary: {
      main: "#7DCE13",
    },
    secondary: {
      main: "#2B7A0B",
    },
    background: {
      default: "#EAE509",
    },
    // last: #5BB318
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
