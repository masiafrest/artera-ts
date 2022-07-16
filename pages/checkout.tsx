import React from "react";
import {
  Image,
  Text,
  Stack,
  useToast,
  Box,
  useColorModeValue,
  Table,
  TableContainer,
  TableCaption,
  Thead,
  Th,
  Tr,
  Tbody,
  Td,
  Tfoot,
} from "@chakra-ui/react";
import axios from "axios";
import { CartProductDetailInterface } from "lib/types";
import { useCart } from "lib/context/CartContext";
import { toCurrency } from "lib/utils";
import TableProductDetails from "components/TableProductDetails";

type Props = {};

export default function checkout({}: Props) {
  const toast = useToast({ duration: 5000, isClosable: true, position: "top" });
  const { cart, resetCart, getCartTotal } = useCart();
  const onCheckOut = () => {
    axios
      .post<CartProductDetailInterface[]>("/api/sendEmail", cart)
      .then((data) => {
        console.log({ data });
        resetCart();
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
    <Stack borderWidth="1px" borderRadius="lg">
      {/* shooping card card */}
      <Box bg={useColorModeValue("gray.200", "gray.700")}>content</Box>
      <TableProductDetails />
      {/* register card card */}
      <Text>card</Text>
    </Stack>
  );
}
