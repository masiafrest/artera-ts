import { type ReactNode, useRef } from "react";
import {
  Text,
  Image,
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Heading,
  Icon,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerFooter,
  DrawerBody,
  DrawerCloseButton,
  Input,
  DrawerHeader,
  Divider,
  Container,
  VStack,
  StackDivider,
  useNumberInput,
  HStack,
} from "@chakra-ui/react";
import { BsCart } from "react-icons/bs";
import DrawerCard from "./DrawerCard";
import { useCart } from "lib/context/CartContext";

type Props = {};

export default function BtnCart({}: Props) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const btnRef = useRef<any>();
  const { cart } = useCart();

  return (
    <Button ref={btnRef} onClick={onOpen}>
      <Icon as={BsCart} />
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        size="sm"
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Cart</DrawerHeader>
          <DrawerBody>
            <VStack divider={<StackDivider />} spacing={4}>
              {cart.length > 0 ? (
                cart.map((e) => <DrawerCard key={e.sku} {...e} />)
              ) : (
                <Text align="center">No product added to the cart</Text>
              )}
            </VStack>
          </DrawerBody>
          {cart.length > 0 && (
            <Text align="center">
              Total:{" "}
              {cart
                .reduce((a, v) => {
                  //TODO price viene con como string en excel y viene con $, ejm: '$1350'
                  if (typeof v.precio === "string") {
                    const precio: number = parseFloat(v.precio.split("$")[1]);
                    return a + precio * v.qty;
                  }
                  return a + v.precio * v.qty;
                }, 0)
                .toFixed(2)}
            </Text>
          )}
          <Divider />
          <DrawerFooter style={{ display: "flex", justifyContent: "center" }}>
            <Button
              colorScheme="blue"
              w={"full"}
              fontWeight="bold"
              fontSize="large"
            >
              Checkout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Button>
  );
}
