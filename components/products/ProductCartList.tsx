import { SimpleGrid, LinkBox, LinkOverlay } from "@chakra-ui/react";
import { ProductDetailInterface } from "lib/types";
import React from "react";
import ProductCard from "./ProductCard";

type Props = { products: ProductDetailInterface[] };

export default function ProductCardList({ products }: Props) {
  return (
    <SimpleGrid minChildWidth={"400px"} spacing="1em" marginTop={10}>
      {products.map((product) => {
        const { Imagen, Descripcion, Precio, OldPrice, SKU } = product;
        return (
          <ProductCard
            key={`${SKU}-${Descripcion}`}
            productDetails={{
              SKU,
              Imagen,
              Descripcion,
              Precio,
              OldPrice,
            }}
          />
        );
      })}
    </SimpleGrid>
  );
}
