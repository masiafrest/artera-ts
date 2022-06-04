import { createContext, useContext, useState } from "react";
import type { Dispatch, ReactNode, SetStateAction } from "react";

import type { ProductDetailInterface } from "lib/types";

type CartProviderProps = { children: ReactNode };

const CartContext = createContext<
  | {
      cart: ProductDetailInterface[];
      setCart: Dispatch<SetStateAction<ProductDetailInterface[]>>;
    }
  | undefined
>(undefined);

function CartProvider({ children }: CartProviderProps) {
  const [cart, setCart] = useState<ProductDetailInterface[]>([]);

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
