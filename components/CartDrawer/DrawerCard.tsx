import {
  Text,
  Button,
  HStack,
  Image,
  Input,
  VStack,
  Box,
  IconButton,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import React from "react";
import { CartProductDetailInterface } from "lib/types";
import { useCart } from "lib/context/CartContext";
import { getUrlSlides, toCurrency } from "lib/utils";

type Props = CartProductDetailInterface;

export default function DrawerCard({
  qty = 1,
  descripcion = "description",
  precio = "10",
  sku,
  imagenes,
}: Props) {
  const { setCart } = useCart();

  const onClickMore = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setCart((prevCart) =>
      prevCart.map((c) => {
        if (c.sku === sku) {
          return { ...c, qty: c.qty + 1 };
        }
        return c;
      })
    );
  };

  const onClickLess = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setCart((prevCart) =>
      prevCart.map((c) => {
        if (c.sku === sku) {
          return { ...c, qty: c.qty - 1 };
        }
        return c;
      })
    );
  };

  return (
    <HStack h="full" w="full" justifyContent="space-between">
      <Image
        rounded={"lg"}
        height={135}
        width={135}
        objectFit={"cover"}
        src={getUrlSlides(imagenes)[0]}
        alt="img"
      />
      <VStack
        align="start"
        flexGrow="1"
        justifyContent="center"
        alignItems="center"
      >
        <HStack justifyContent="space-between">
          <VStack>
            <Text>{descripcion}</Text>
            <Text>Precio: {toCurrency(precio)}</Text>
            <Text>Total: {toCurrency(Number(precio) * qty)}</Text>
          </VStack>
        </HStack>
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
            setCart((prevCart) => prevCart.filter((c) => c.sku !== sku));
          }}
        />
      </Box>
    </HStack>
  );
}
