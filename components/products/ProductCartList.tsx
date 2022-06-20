import { SimpleGrid } from "@chakra-ui/react";
import { ProductDetailInterface } from "lib/types";
import React from "react";
import ProductCard from "./ProductCard";

type Props = { products: ProductDetailInterface[] };

export default function ProductCardList({ products }: Props) {
  return (
    <SimpleGrid minChildWidth={"400px"} spacing="1em" marginTop={10}>
      {products.map((product) => {
        const { imagen, descripcion, precio, oldprice, sku } = product;
        return (
          <ProductCard
            key={`${sku}-${descripcion}`}
            productDetails={{
              sku,
              imagen,
              descripcion,
              precio,
              oldprice,
            }}
          />
        );
      })}
    </SimpleGrid>
  );
}
