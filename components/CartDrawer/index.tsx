import { forwardRef } from "react";
import {
  Text,
  Button,
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
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import DrawerCard from "./DrawerCard";
import { BsCart } from "react-icons/bs";

import { useCart } from "lib/context/CartContext";
import { useRouter } from "next/router";

type Props = {
  disclosureProps: {
    isOpen: boolean;
    handleClose: () => void;
  };
};

const CartDrawer = forwardRef((props: Props, ref: any) => {
  const router = useRouter();
  const { isOpen, handleClose: onClose } = props.disclosureProps;
  const { cart, getCartTotal } = useCart();
  const onCheckOut = () => {
    onClose();
    router.push("/checkout");
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
      <DrawerContent bg={useColorModeValue("arterra.100", "arterra.300")}>
        <DrawerCloseButton />
        <DrawerHeader>
          <HStack gap="2">
            <BsCart />
            <Text>Tu Carrito de compra</Text>
          </HStack>
        </DrawerHeader>
        <Divider />
        <DrawerBody>
          <VStack divider={<StackDivider />} spacing={2}>
            {cart.length > 0 ? (
              cart.map((e) => <DrawerCard key={e.sku} {...e} />)
            ) : (
              <Text align="center">
                No tienes ningún artículo en tu carrito de compras.
              </Text>
            )}
          </VStack>
        </DrawerBody>
        {cart.length > 0 && <Text align="center">Total: {getCartTotal()}</Text>}
        <Divider />
        <DrawerFooter style={{ display: "flex", justifyContent: "center" }}>
          <Button
            w={"full"}
            fontWeight="bold"
            fontSize="large"
            disabled={cart.length === 0}
            onClick={onCheckOut}
          >
            Continuar
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
});

CartDrawer.displayName = "CartDrawer";
export default CartDrawer;
