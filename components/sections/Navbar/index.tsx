import { type ReactNode } from "react";
import {
  Box,
  Flex,
  Link,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  Heading,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import BtnCart from "./BtnCart";
import { useAuth } from "lib/context/AuthContext";

const NavLink = ({ children, href }: { children: ReactNode; href: string }) => (
  <NextLink href={href} passHref>
    <Link>{children}</Link>
  </NextLink>
);

export default function NavBar() {
  const { colorMode, toggleColorMode } = useColorMode();
  const { isAdmin, signOut } = useAuth();

  return (
    <Box
      bg={useColorModeValue("gray.100", "gray.900")}
      px={4}
      position="fixed"
      top="0"
      width="100%"
      zIndex="10"
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box>
          <Heading>
            <NextLink href="/" passHref>
              <Link
                _hover={{
                  textDecoration: "none",
                }}
              >
                Arterra
              </Link>
            </NextLink>
          </Heading>
        </Box>
        <Flex alignItems={"center"}>
          <Stack direction={"row"} spacing={3}>
            {isAdmin && (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap="1rem"
              >
                <NavLink href="/addProduct">Add Product</NavLink>
                <Button onClick={() => signOut()}>SignOut</Button>
              </Box>
            )}

            <BtnCart />
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
          </Stack>
        </Flex>
      </Flex>
    </Box>
  );
}
