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
} from "@chakra-ui/react";
import DrawerCard from "./DrawerCard";

import { toCurrency } from "lib/utils";

import { useCart } from "lib/context/CartContext";
import { useRouter } from "next/router";

type Props = {
  disclosureProps: {
    isOpen: boolean;
    onClose: () => void;
  };
};

const CartDrawer = forwardRef((props: Props, ref: any) => {
  const router = useRouter();
  const { isOpen, onClose } = props.disclosureProps;
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
        {cart.length > 0 && <Text align="center">Total: {getCartTotal()}</Text>}
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

CartDrawer.displayName = "CartDrawer";
export default CartDrawer;
