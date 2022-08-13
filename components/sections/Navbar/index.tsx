import { AnchorHTMLAttributes, type ReactNode } from "react";
import {
  Box,
  Flex,
  Link,
  Button,
  useColorModeValue,
  Stack,
  useColorMode,
  Heading,
  useBreakpointValue,
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  IconButton,
  MenuDivider,
  HStack,
  Divider,
  Text,
  Spacer,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon, AddIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import BtnCart from "./BtnCart";
import { useAuth } from "lib/context/AuthContext";
import { useRouter } from "next/router";
import HamburgerBtn from "./HamburgerBtn";
import { useCart } from "lib/context/CartContext";
import { GrConfigure } from "react-icons/gr";
import NavLink from "./NavLink";
import ConfigBtn from "./ConfigBtn";

export default function NavBar() {
  // const { cart } = useCart();
  const router = useRouter();
  const isSmallScreen = useBreakpointValue({
    base: true,
    sx: true,
    sm: false,
    md: false,
  });
  // const { colorMode, toggleColorMode } = useColorMode();
  const { isAdmin, signOut, loggedIn } = useAuth();

  return (
    <Box
      bg={useColorModeValue("arterra.100", "arterra.300")}
      px={4}
      width="100%"
      // los btn editar es 1399 de chakra
      zIndex="1400"
      position="sticky"
      top={0}
    >
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <Box flex="1 1 33%"></Box>
        <Box flex="1 1 33%">
          <Heading fontWeight="extrabold" textAlign="center">
            <NextLink href="/" passHref>
              <Link
                _hover={{
                  textDecoration: "none",
                }}
              >
                ARTERRA
              </Link>
            </NextLink>
          </Heading>
        </Box>
        <Box flex="1 1 33%">
          {isSmallScreen ? (
            <Flex justifyContent="flex-end">
              <HamburgerBtn>
                {(onClose) => (
                  <Stack
                    spacing={3}
                    justifyContent="center"
                    alignItems="center"
                  >
                    {isAdmin && <ConfigBtn />}
                    {/* {isCartHaveItem && (
                  <NavLink onClose={onClose} href="/checkout">
                    Pedido
                  </NavLink>
                )} */}
                    <NavLink onClose={onClose} href="/faqs">
                      F.A.Q
                    </NavLink>
                    <Divider />
                    <BtnCart closeFirstModal={onClose} />
                    {/* <Button onClick={toggleColorMode}>
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button> */}
                    <Button
                      onClick={() => {
                        if (loggedIn) {
                          signOut();
                          onClose();
                        } else {
                          onClose();
                          router.push("/signin");
                        }
                      }}
                    >
                      {loggedIn ? "Cerrar sesión" : "Ingresar"}
                    </Button>
                  </Stack>
                )}
              </HamburgerBtn>
            </Flex>
          ) : (
            <HStack spacing={3} justifyContent="flex-end">
              {isAdmin && <ConfigBtn />}
              {/* {isCartHaveItem && (
              <NavLink href="/checkout">Confirmar pedidos</NavLink>
            )} */}
              <NavLink href="/faqs">F.A.Q</NavLink>
              <BtnCart />
              {/* <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button> */}
              <Button
                onClick={() => (loggedIn ? signOut() : router.push("signin"))}
              >
                {loggedIn ? "Cerrar sesión" : "Ingresar"}
              </Button>
            </HStack>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
