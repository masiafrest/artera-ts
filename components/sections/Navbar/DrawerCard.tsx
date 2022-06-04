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
import { ProductDetailInterface } from "lib/types";

type Props = { value?: number } & Partial<ProductDetailInterface>;

export default function DrawerCard({
  value = 1,
  Descripcion = "description",
  Precio = 10,
}: Props) {
  const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } =
    useNumberInput({ step: 1, min: 1, value });
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
          <Button {...getIncrementButtonProps()}>+</Button>
          <Input {...getInputProps()} />
          <Button {...getDecrementButtonProps()}>-</Button>
        </HStack>
      </VStack>
      <Box h="20">
        <IconButton aria-label="delete item" icon={<CloseIcon />} />
      </Box>
    </HStack>
  );
}
