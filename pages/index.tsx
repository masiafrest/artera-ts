import {
  Image,
  Box,
  Text,
  Heading,
  SimpleGrid,
  Container,
  Stack,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import ProductCardList from "components/products/ProductCartList";
import ImageCarousel from "components/sections/ImageCarousel";
import { getAllProducts } from "lib/services/products-api";
import { ProductDetailInterface } from "lib/types";
import { supabase } from "lib/utils/supabaseClient";
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import React, { useEffect, useState } from "react";

type Props = { products: ProductDetailInterface[] };

const Home: NextPage<Props> = () => {
  const [products, setproducts] = useState<ProductDetailInterface[]>([]);

  useEffect(() => {
    const getProduts = async () => {
      const data = await getAllProducts();
      setproducts(data);
    };

    getProduts();
  }, []);

  return (
    <>
      <Head>
        <title>Arterra</title>
        <meta name="description" content="Arterra" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ImageCarousel />
      <ProductCardList products={products} setProducts={setproducts} />
    </>
  );
};

//this page need to fetch the info its better that way
// export const getStaticProps: GetStaticProps = async () => {
//   const products = await getAllProducts();

//   return {
//     props: {
//       products,
//     },
//   };
// };

export default Home;
