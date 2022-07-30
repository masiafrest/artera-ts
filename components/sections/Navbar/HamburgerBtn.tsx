import { type ReactNode, useRef, Children } from "react";
import {
  Button,
  useDisclosure,
  Icon,
  Box,
  useColorModeValue,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerBody,
  DrawerHeader,
  Heading,
} from "@chakra-ui/react";
import { BsCart } from "react-icons/bs";
import CartDrawer from "components/CartDrawer";
import { useCart } from "lib/context/CartContext";
import { HamburgerIcon } from "@chakra-ui/icons";

type Props = {
  children: (onClose: () => void) => ReactNode;
};

export default function HamburgerBtn({ children }: Props) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <>
      <Button ref={btnRef} onClick={onOpen} pos="relative">
        <Icon as={HamburgerIcon} />
      </Button>
      <Drawer onClose={onClose} isOpen={isOpen} size={"xs"}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Heading>Arterra</Heading>
          </DrawerHeader>
          <DrawerBody>{children(onClose)}</DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
