import React from "react";
import {
  Text,
  Stack,
  useToast,
  Box,
  useColorModeValue,
  Container,
  Icon,
  HStack,
  Flex,
  Button,
  Center,
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";

import axios from "axios";
import { CartProductDetailInterface } from "lib/types";
import { useCart } from "lib/context/CartContext";
import TableProductDetails from "components/TableProductDetails";
import { useAuth } from "lib/context/AuthContext";
import { useRouter } from "next/router";
import { toCurrency } from "lib/utils";

type Props = {};

export default function Checkout({}: Props) {
  const router = useRouter();
  const toast = useToast({ duration: 5000, isClosable: true, position: "top" });
  const { cart, resetCart, getCartTotal } = useCart();
  const { loggedIn, user } = useAuth();

  const onCheckOut = () => {
    const service_id = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const template_id = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const user_id = process.env.NEXT_PUBLIC_EMAILJS_PK;

    if (service_id && template_id && user_id) {
      const table = `
      <table>
        <thead>
          <tr>
            <th>Descripcion</th>
            <th>qty</th>
            <th>precio</th>
            <th>total</th>
          </tr>
        </thead>
        <tbody>
            ${cart.map(
              (e) => `
                <tr>
                  <td>
                    ${e.descripcion}
                  </td>
                  <td>
                    ${e.qty}
                  </td>
                  <td>
                    ${toCurrency(e.precio)}
                  </td>
                  <td>
                    ${toCurrency(Number(e.precio) * e.qty)}
                  </td>
                </tr>
              `
            )}
        </tbody>
        <tfoot>
            <tr>
              <td></td>
              <td></td>
              <td> Total: </td>
              <td> ${getCartTotal()}</td>
            </tr>
        </tfoot>
      </table>
  `;
      const template_params = {
        from_name: user?.user_metadata.username,
        client_phone: user?.user_metadata.tel,
        client_email: user?.email,
        message: "user data: " + JSON.stringify(user?.user_metadata),
        table,
      };

      var data = {
        service_id,
        template_id,
        user_id,
        template_params,
      };

      axios
        .post("https://api.emailjs.com/api/v1.0/email/send", data, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res: any) => {
          console.log("res", res);
          //     // resetCart();
          toast({
            title: "Mensaje enviado con exito",
            description: "Te vamos a contactar pronto",
            status: "success",
          });
        })
        .catch((err) => {
          console.log("err", err);

          toast({
            title: "Hubo un problema en la conexion",
            description: "Intentelo mas tarde",
            status: "error",
          });
        });
    }
  };
  return (
    <Container maxWidth="7xl" mt="3">
      <Flex gap="3" wrap="wrap" alignContent="center" justifyContent="center">
        <Stack borderWidth="1px" borderRadius="lg" maxW="600px" flex="1">
          <Box bg={useColorModeValue("gray.200", "gray.700")}>
            <HStack margin="3">
              <Icon as={FiShoppingCart} alignSelf="center" />
              <Text>Carrito de compras</Text>
            </HStack>
          </Box>
          <TableProductDetails />
        </Stack>
        <Stack borderWidth="1px" borderRadius="lg" maxW="600px">
          <Box bg={useColorModeValue("gray.200", "gray.700")}>
            <HStack margin="3">
              <Text>Ultimo paso</Text>
            </HStack>
          </Box>
          <Stack alignItems="center" p="3" justifyContent="center">
            <Text>
              {loggedIn
                ? "Al dar aceptar y revisar el carrito de compras nos pondremos en contacto con usted."
                : "Para poder contactarlo necesitamo su informacion, puedes ingresar o registrarte si no tienes cuenta todavia!."}
            </Text>
            <HStack>
              <Button
                onClick={() => {
                  loggedIn ? onCheckOut() : router.push("/signin");
                }}
              >
                {loggedIn ? "Aceptar" : "Ingresar"}
              </Button>
              {!loggedIn && (
                <Button
                  onClick={() => {
                    router.push("/signup");
                  }}
                >
                  Registrar
                </Button>
              )}
            </HStack>
          </Stack>
        </Stack>
      </Flex>
    </Container>
  );
}
