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
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import NextLink from "next/link";
import BtnCart from "./BtnCart";
import { useAuth } from "lib/context/AuthContext";
import { useRouter } from "next/router";
import HamburgerBtn from "./HamburgerBtn";
import { useCart } from "lib/context/CartContext";

const NavLink = ({
  children,
  href,
  ...rest
}: {
  children: ReactNode;
  href: string;
  onClose?: () => void;
} & AnchorHTMLAttributes<HTMLAnchorElement>) => (
  <Box
    onClick={() => {
      rest.onClose?.();
    }}
  >
    <NextLink {...rest} href={href} passHref>
      <Link>
        <Text>{children}</Text>
      </Link>
    </NextLink>
  </Box>
);

export default function NavBar() {
  const { cart } = useCart();
  const router = useRouter();
  const isSmallScreen = useBreakpointValue({
    base: true,
    sx: true,
    sm: false,
    md: false,
  });
  const { colorMode, toggleColorMode } = useColorMode();
  const { isAdmin, signOut, loggedIn } = useAuth();
  // const isCartHaveItem = cart.length > 0;

  return (
    <Box
      bg={useColorModeValue("gray.200", "gray.700")}
      px={4}
      width="100%"
      zIndex="10"
      position="sticky"
      top={0}
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
        {isSmallScreen ? (
          <HamburgerBtn>
            {(onClose) => (
              <Stack spacing={3} justifyContent="center" alignItems="center">
                {isAdmin && <NavLink href="/addProduct">Add Product</NavLink>}
                {/* {isCartHaveItem && (
                  <NavLink onClose={onClose} href="/checkout">
                    Pedido
                  </NavLink>
                )} */}
                <Divider />
                <BtnCart closeFirstModal={onClose} />
                <Button onClick={toggleColorMode}>
                  {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                </Button>
                <Button
                  onClick={() => {
                    if (loggedIn) {
                      signOut();
                      onClose();
                    } else {
                      router.push("/signin");
                    }
                  }}
                >
                  {loggedIn ? "Cerrar sesión" : "Ingresar"}
                </Button>
              </Stack>
            )}
          </HamburgerBtn>
        ) : (
          <HStack spacing={3}>
            {isAdmin && (
              <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                gap="1rem"
              >
                <NavLink href="/addProduct">Add Product</NavLink>
              </Box>
            )}
            {/* {isCartHaveItem && (
              <NavLink href="/checkout">Confirmar pedidos</NavLink>
            )} */}
            <BtnCart />
            <Button onClick={toggleColorMode}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Button
              onClick={() => (loggedIn ? signOut() : router.push("signin"))}
            >
              {loggedIn ? "Cerrar sesión" : "Ingresar"}
            </Button>
          </HStack>
        )}
      </Flex>
    </Box>
  );
}
