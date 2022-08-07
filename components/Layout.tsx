import { Box, Flex } from "@chakra-ui/react";
import Link from "next/link";
import * as React from "react";
import Footer from "./sections/Footer";
import NavBar from "./sections/Navbar";

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <Flex height="100vh" flexDirection="column">
      {/* <Box
        flex="
      1 1 auto"
      >
        <NavBar />
      </Box> */}
      <NavBar />
      <Box
        flex="
      1 1 auto"
      >
        {children}
      </Box>
      <Box flex="0 1 40px">
        <Footer />
      </Box>
    </Flex>
  );
}
