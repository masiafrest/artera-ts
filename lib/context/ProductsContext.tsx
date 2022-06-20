import { getAllProducts } from "lib/services/products-api";
import { ProductDetailInterface } from "lib/types";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface ProductsProviderProps {
  children: ReactNode;
}

interface ProductsContextProps {
  products: ProductDetailInterface[];
}

const ProductsContext = createContext<ProductsContextProps | undefined>(
  undefined
);

function ProductsProvider({ children }: ProductsProviderProps) {
  const [products, setProducts] = useState<ProductDetailInterface[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const products = await getAllProducts();
      setProducts(products);
    };
    getProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products }}>
      {children}
    </ProductsContext.Provider>
  );
}

function useProducts() {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error("useProduct debe ser usado en un ProductProvider");
  }
  return context;
}

export { ProductsProvider, useProducts };
