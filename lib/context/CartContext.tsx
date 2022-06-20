import { createContext, useContext, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

import type { CartProductDetailInterface } from "lib/types";

interface CartProviderProps {
  children: ReactNode;
}
interface CartContextProps {
  cart: CartProductDetailInterface[];
  setCart: Dispatch<SetStateAction<CartProductDetailInterface[]>>;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<CartProductDetailInterface[]>([]);

  return (
    <CartContext.Provider value={{ cart, setCart }}>
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