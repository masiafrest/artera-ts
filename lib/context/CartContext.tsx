import { createContext, useContext, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

import type {
  CartProductDetailInterface,
  ProductDetailInterface,
} from "lib/types";
import { useToast } from "@chakra-ui/react";
import { toCurrency } from "lib/utils";

interface CartProviderProps {
  children: ReactNode;
}
interface CartContextProps {
  cart: CartProductDetailInterface[];
  setCart: Dispatch<SetStateAction<CartProductDetailInterface[]>>;
  addToCart: (product: ProductDetailInterface) => void;
  resetCart: () => void;
  getCartTotal: () => string;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartProductDetailInterface[]>([]);
  const toast = useToast();

  const addToCart = (product: ProductDetailInterface) => {
    setCart((prevCart) => {
      const hasProduct = prevCart.some((e) => e.sku === product.sku);
      if (hasProduct) {
        return prevCart.map((e) => {
          if (e.sku === product.sku) {
            return { ...product, qty: e.qty + 1 };
          }
          return { ...product, qty: 1 };
        });
      } else {
        return [...prevCart, { ...product, qty: 1 }];
      }
    });

    toast({
      title: "Agregado",
      description: product.descripcion,
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };

  const resetCart = (): void => {
    setCart([]);
  };

  const getCartTotal = (): string => {
    return toCurrency(
      cart.reduce((a, v) => {
        return a + Number(v.precio) * v.qty;
      }, 0)
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, setCart, addToCart, resetCart, getCartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart debe ser usado en un CartProvider");
  }
  return context;
}

export { CartProvider, useCart };
