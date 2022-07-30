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
  Center,
  useBreakpoint,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useCart } from "lib/context/CartContext";
import { toCurrency } from "lib/utils";

type Props = {};

export default function TableProductDetails({}: Props) {
  const isSmallScreen = useBreakpointValue({
    base: true,
    sx: true,
    sm: false,
    md: false,
  });

  const { cart, getCartTotal } = useCart();
  return (
    <TableContainer>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Imagenes</Th>
            {!isSmallScreen && <Th>Descripcion</Th>}
            <Th>Qty</Th>
            <Th>Precio</Th>
            <Th>Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {cart.map((item) => {
            return (
              <Tr key={item.id}>
                <Td>
                  <Image
                    src={
                      (item.imagenes && item.imagenes[0]) ||
                      "/images/vasija_card.webp"
                    }
                    width="100px"
                    objectFit={"cover"}
                    alt={item.descripcion}
                  />
                </Td>

                {!isSmallScreen && (
                  <Td>
                    <Center>{item.descripcion}</Center>
                  </Td>
                )}
                <Td>
                  <Center>{item.qty}</Center>
                </Td>
                <Td isNumeric>{toCurrency(item.precio)}</Td>
                <Td isNumeric>{toCurrency(Number(item.precio) * item.qty)}</Td>
              </Tr>
            );
          })}
        </Tbody>
        <Tfoot>
          <Tr>
            {!isSmallScreen && <Th></Th>}
            <Th></Th>
            <Th></Th>
            <Th isNumeric>Total:</Th>
            <Th isNumeric>{getCartTotal()}</Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
}
