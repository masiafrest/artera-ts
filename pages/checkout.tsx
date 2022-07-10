import React from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { CartProductDetailInterface } from "lib/types";
import { useCart } from "lib/context/CartContext";

type Props = {};

export default function checkout({}: Props) {
  const toast = useToast({ duration: 5000, isClosable: true, position: "top" });
  const { cart, resetCart } = useCart();
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
  return <div>checkout</div>;
}
