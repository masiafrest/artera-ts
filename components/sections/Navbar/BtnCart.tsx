import { type ReactNode, useRef } from "react";
import { Button, useDisclosure, Icon } from "@chakra-ui/react";
import { BsCart } from "react-icons/bs";
import CartDrawer from "components/CartDrawer";

type Props = {};

export default function BtnCart({}: Props) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <Button ref={btnRef} onClick={onOpen}>
      <Icon as={BsCart} />
      <CartDrawer
        disclosureProps={{
          isOpen,
          onClose,
        }}
        ref={btnRef}
      />
    </Button>
  );
}
