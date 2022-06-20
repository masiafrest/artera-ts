import { getAllProducts, getProductBySku } from "lib/services/products-api";
// import staticPathDataToProps from "lib/services/static-path-data-to-props";
import { ProductDetailInterface } from "lib/types";
import type { GetStaticProps, GetStaticPaths } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";
import { ParsedUrlQuery } from "querystring";
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  VisuallyHidden,
  List,
  ListItem,
  useToast,
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { MdLocalShipping } from "react-icons/md";
import React from "react";
import { useCart } from "lib/context/CartContext";
import { supabase } from "lib/utils/supabaseClient";

interface Query extends ParsedUrlQuery {
  sku: string;
}

type Props = { product: ProductDetailInterface };

export default function Product({ product }: Props) {
  const toast = useToast();
  const { setCart } = useCart();

  const { descripcion, imagen, sku, precio, oldprice } = product;
  const addProductToCart = (): void => {
    //TODO: when add check how many of the same has, maybe use a reducer
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
      description: descripcion,
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <Container maxW={"container.md"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={"md"}
            alt={"product image"}
            src={`${imagen || "/images/vasija_card.webp"}`}
            fit={"cover"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "550px" }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "xl", sm: "4xl", lg: "5xl" }}
            >
              {descripcion}
            </Heading>
            <Text
              color={useColorModeValue("gray.900", "gray.400")}
              fontWeight={300}
              fontSize={"2xl"}
            >
              {precio}
            </Text>
            <Text
              color={useColorModeValue("gray.500", "gray.400")}
              fontSize={"md"}
              fontWeight={"300"}
            >
              sku: {sku}
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.200", "gray.600")}
              />
            }
          >
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Product Details
              </Text>

              <List spacing={2}>
                <ListItem>
                  <Text as={"span"} fontWeight={"bold"}>
                    Medidas:
                  </Text>{" "}
                  20 mm
                </ListItem>
              </List>
            </Box>
            <Box>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={useColorModeValue("yellow.500", "yellow.300")}
                fontWeight={"500"}
                textTransform={"uppercase"}
                mb={"4"}
              >
                Cuidados a cosiderar
              </Text>
              <Text fontSize={"lg"}>{descripcion}</Text>
            </Box>
          </Stack>

          <Button
            rounded={"none"}
            w={"full"}
            mt={8}
            size={"lg"}
            py={"7"}
            bg={useColorModeValue("gray.900", "gray.50")}
            color={useColorModeValue("white", "gray.900")}
            textTransform={"uppercase"}
            _hover={{
              transform: "translateY(2px)",
              boxShadow: "lg",
            }}
            onClick={addProductToCart}
          >
            Add to cart
          </Button>

          <Stack direction="row" alignItems="center" justifyContent={"center"}>
            <MdLocalShipping />
            <Text>7 business days delivery</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}

export const getStaticPaths: GetStaticPaths<Query> = async () => {
  const products = await getAllProducts();

  return {
    paths: products.map((product) => ({
      params: {
        sku: product.sku,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<Props, Query> = async ({
  params,
}) => {
  const products = await getProductBySku(params?.sku);

  const product = products![0];

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
};
