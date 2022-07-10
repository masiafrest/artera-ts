import { forwardRef, RefObject } from "react";
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
  useToast,
} from "@chakra-ui/react";
import DrawerCard from "./DrawerCard";

import { toCurrency } from "lib/utils";
import axios from "axios";

import { useCart } from "lib/context/CartContext";

import { CartProductDetailInterface } from "lib/types";

type Props = {
  disclosureProps: {
    isOpen: boolean;
    onClose: () => void;
  };
};

const CartDrawer = forwardRef((props: Props, ref: any) => {
  const { isOpen, onClose } = props.disclosureProps;
  const { cart, resetCart } = useCart();
  const toast = useToast({ duration: 5000, isClosable: true, position: "top" });
  const onCheckOut = () => {
    axios
      .post<CartProductDetailInterface[]>("/api/sendEmail", cart)
      .then((data) => {
        console.log({ data });
        resetCart();
        onClose();
        toast({
          title: "Mensaje enviado con exito",
          description: "Te vamos a contactar pronto",
          status: "success",
        });
      })
      .catch((err) => {
        toast({
          title: "Hubo un problema en la conexion",
          description: "Intentelo mas tarde",
          status: "error",
        });
        console.log({ err });
      });
  };
  return (
    <Drawer
      isOpen={isOpen}
      placement="right"
      onClose={onClose}
      finalFocusRef={ref}
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
  );
});

export default CartDrawer;
