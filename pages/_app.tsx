import type { AppProps } from "next/app";
import { Box, ChakraProvider, Container, Flex } from "@chakra-ui/react";
import theme from "theme";
import NavBar from "components/sections/Navbar";
import Footer from "components/sections/Footer";
import { CartProvider } from "lib/context/CartContext";
import { AuthProvider } from "lib/context/AuthContext";
import { supabase } from "lib/utils/supabaseClient";
import { useEffect } from "react";
import { Layout } from "components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <CartProvider>
        <ChakraProvider theme={theme}>
          {/* <Box h="100vh">
            <NavBar />
            <Component {...pageProps} />
            <Footer />
          </Box> */}
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default MyApp;
