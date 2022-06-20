import {
  Text,
  Button,
  Flex,
  HStack,
  Image,
  Input,
  VStack,
  useNumberInput,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import React from "react";
import { CartProductDetailInterface } from "lib/types";
import { useCart } from "lib/context/CartContext";

type Props = CartProductDetailInterface;

export default function DrawerCard({
  qty = 1,
  Descripcion = "description",
  Precio = 10,
  SKU,
}: Props) {
  const { setCart } = useCart();

  const onClickMore = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setCart((prevCart) =>
      prevCart.map((c) => {
        if (c.SKU === SKU) {
          return { ...c, qty: c.qty + 1 };
        }
        return c;
      })
    );
  };

  const onClickLess = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setCart((prevCart) =>
      prevCart.map((c) => {
        if (c.SKU === SKU) {
          return { ...c, qty: c.qty - 1 };
        }
        return c;
      })
    );
  };

  return (
    <HStack h="full" spacing="7">
      <Image
        rounded={"lg"}
        height={100}
        width={100}
        objectFit={"cover"}
        src={"/images/vasija_card.webp"}
        alt="img"
      />
      <VStack align="start">
        <Text>{Descripcion}</Text>
        <Text>{Precio}</Text>
        <HStack maxW="36">
          <Button onClick={onClickMore}>+</Button>
          <Input value={qty} min={1} readOnly />
          <Button onClick={onClickLess}>-</Button>
        </HStack>
      </VStack>
      <Box h="20">
        <IconButton
          aria-label="delete item"
          icon={<CloseIcon />}
          onClick={(e) => {
            setCart((prevCart) => prevCart.filter((c) => c.SKU !== SKU));
          }}
        />
      </Box>
    </HStack>
  );
}
