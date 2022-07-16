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
import { useCart } from "lib/context/CartContext";
import { toCurrency } from "lib/utils";

type Props = {};

export default function TableProductDetails({}: Props) {
  const { cart, getCartTotal } = useCart();
  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Imagenes</Th>
            <Th>Descripcion</Th>
            <Th>Qty</Th>
            <Th>Precio Unitario</Th>
            <Th>Total</Th>
          </Tr>
        </Thead>
        <Tbody>
          {cart.map((item) => {
            return (
              <Tr>
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
                <Td>{item.descripcion}</Td>
                <Td>{item.qty}</Td>
                <Td isNumeric>{toCurrency(item.precio)}</Td>
                <Td isNumeric>{toCurrency(Number(item.precio) * item.qty)}</Td>
              </Tr>
            );
          })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th></Th>
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
