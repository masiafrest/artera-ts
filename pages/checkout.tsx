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
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";

import axios from "axios";
import { CartProductDetailInterface } from "lib/types";
import { useCart } from "lib/context/CartContext";
import TableProductDetails from "components/TableProductDetails";
import { useAuth } from "lib/context/AuthContext";
import { useRouter } from "next/router";

type Props = {};

export default function Checkout({}: Props) {
  const router = useRouter();
  const toast = useToast({ duration: 5000, isClosable: true, position: "top" });
  const { cart, resetCart, getCartTotal } = useCart();
  const { loggedIn, user } = useAuth();

  const onCheckOut = () => {
    axios
      .post<CartProductDetailInterface[]>("/api/sendEmail", {
        cart,
        user: user?.user_metadata,
      })
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
    <Container maxWidth="7xl" mt="3">
      <Flex gap="3" wrap="wrap" alignContent="center" justifyContent="center">
        <Stack
          borderWidth="1px"
          borderRadius="lg"
          minW="-webkit-fill-available"
        >
          <Box bg={useColorModeValue("gray.200", "gray.700")}>
            <HStack margin="3">
              <Icon as={FiShoppingCart} alignSelf="center" />
              <Text>Carrito de compras</Text>
            </HStack>
          </Box>
          <TableProductDetails />
        </Stack>
        <Stack
          borderWidth="1px"
          borderRadius="lg"
          minW="-webkit-fill-available"
        >
          <Box bg={useColorModeValue("gray.200", "gray.700")}>
            <HStack margin="3">
              <Icon as={FiShoppingCart} alignSelf="center" />
              <Text>Ultimo paso</Text>
            </HStack>
          </Box>
          {loggedIn ? (
            <>
              <Container centerContent>
                <Text>
                  al dar aceptar y revisar el carrito de compras nos pondremos
                  en contacto con usted.
                </Text>
              </Container>
              <HStack>
                <Button onClick={onCheckOut}>Aceptar</Button>
                <Button>Cancelar</Button>
              </HStack>
            </>
          ) : (
            <Container centerContent p="3">
              <Text>
                Para poder contactarlo necesitamo su informacion, puedes
                ingresar o registrarte si no tienes cuenta todavia!.
              </Text>
              <HStack>
                <Button
                  onClick={() => {
                    router.push("/signin");
                  }}
                >
                  Ingresar
                </Button>
                <Button
                  onClick={() => {
                    router.push("/signup");
                  }}
                >
                  Registrar
                </Button>
              </HStack>
            </Container>
          )}
        </Stack>
      </Flex>
    </Container>
  );
}
