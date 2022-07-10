import { SimpleGrid, useToast } from "@chakra-ui/react";
import { ProductDetailInterface } from "lib/types";
import React, { Dispatch, SetStateAction } from "react";
import ProductCard from "./ProductCard";
import { delProduct } from "lib/services/products-api";

type Props = {
  products: ProductDetailInterface[];
  setProducts: Dispatch<SetStateAction<ProductDetailInterface[]>>;
};

export default function ProductCardList({ products, setProducts }: Props) {
  const toast = useToast();
  const onDelete = async (product: ProductDetailInterface) => {
    await delProduct(product);
    toast({ title: `${product.sku}, has been deleted`, status: "success" });
    setProducts((prevProduct) => {
      return prevProduct.filter((p) => p.id !== product.id);
    });
  };
  return (
    <SimpleGrid mt={50} minChildWidth={"375px"} spacing="1em">
      {products.map((product) => {
        const { descripcion, sku } = product;
        return (
          <ProductCard
            key={`${sku}-${descripcion}`}
            product={product}
            onDelete={onDelete}
          />
        );
      })}
    </SimpleGrid>
  );
}
