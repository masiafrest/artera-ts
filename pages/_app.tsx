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
      <CartProvider>
        <ChakraProvider theme={theme}>
          <NavBar />
          <Box paddingTop="16" paddingBottom={{ base: "28", md: "14" }}>
            <Component {...pageProps} />
          </Box>
          <Footer />
        </ChakraProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default MyApp;
