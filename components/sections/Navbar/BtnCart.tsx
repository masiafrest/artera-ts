import { type ReactNode, useRef } from "react";
import {
  Text,
  Button,
  useDisclosure,
  Icon,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerFooter,
  DrawerBody,
  DrawerCloseButton,
  DrawerHeader,
  Divider,
  VStack,
  StackDivider,
} from "@chakra-ui/react";
import { BsCart } from "react-icons/bs";
import DrawerCard from "./DrawerCard";
import { useCart } from "lib/context/CartContext";
import { toCurrency } from "lib/utils";

type Props = {};

export default function BtnCart({}: Props) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const btnRef = useRef<any>();
  const { cart } = useCart();

  const onCheckOut = () => {
    fetch("/api/sendEmail");
  };
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
              {toCurrency(
                cart.reduce((a, v) => {
                  return a + Number(v.precio) * v.qty;
                }, 0)
              )}
            </Text>
          )}
          <Divider />
          <DrawerFooter style={{ display: "flex", justifyContent: "center" }}>
            <Button
              colorScheme="blue"
              w={"full"}
              fontWeight="bold"
              fontSize="large"
              disabled={cart.length === 0}
              onClick={onCheckOut}
            >
              Checkout
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Button>
  );
}
