import type { AppProps } from "next/app";
import { Box, ChakraProvider, Container, Flex } from "@chakra-ui/react";
import theme from "theme";
import NavBar from "components/sections/Navbar";
import Footer from "components/sections/Footer";
import { CartProvider } from "lib/context/CartContext";
import { AuthProvider } from "lib/context/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ChakraProvider theme={theme}>
        <CartProvider>
          <NavBar />
          <Box paddingTop={"60px"}>
            <Component {...pageProps} />
          </Box>
          <Footer />
        </CartProvider>
      </ChakraProvider>
    </AuthProvider>
  );
}

export default MyApp;
