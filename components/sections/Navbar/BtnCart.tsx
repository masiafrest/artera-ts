import { ReactNode, useRef } from "react";
import { Button, useDisclosure, Icon, Box } from "@chakra-ui/react";
import { BsCart } from "react-icons/bs";
import CartDrawer from "components/CartDrawer";
import { useCart } from "lib/context/CartContext";

type Props = { closeFirstModal?: () => void };

export default function BtnCart({ closeFirstModal }: Props) {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { cart } = useCart();

  const totalQty = cart.reduce((acc, cur) => {
    return acc + cur.qty;
  }, 0);

  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClose = () => {
    onClose();
    closeFirstModal?.();
  };

  return (
    <Button ref={btnRef} onClick={onOpen} pos="relative">
      {!!totalQty && <NotificationBadge content={totalQty} />}
      <Icon as={BsCart} />
      <CartDrawer
        disclosureProps={{
          isOpen,
          handleClose,
        }}
        ref={btnRef}
      />
    </Button>
  );
}

const NotificationBadge = ({ content }: { content: string | number }) => {
  return (
    <Box
      pos="absolute"
      top="-2"
      right="-2"
      rounded="full"
      h="6"
      w="6"
      bg="red.300"
      display="flex"
      alignItems="center"
      justifyContent="center"
      fontSize="xs"
    >
      {content}
    </Box>
  );
};
