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
  Flex,
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
import { MdLocalShipping } from "react-icons/md";
import React from "react";
import { useCart } from "lib/context/CartContext";
import Carousel from "components/Carousels";
import { getUrlSlides, toCurrency } from "lib/utils";

interface Query extends ParsedUrlQuery {
  sku: string;
}

type Props = { product: ProductDetailInterface };

export default function Product({ product }: Props) {
  const toast = useToast();
  const { setCart, addToCart } = useCart();

  const {
    descripcion,
    imagen,
    sku,
    precio,
    oldprice,
    imagenes,
    caracteristica,
  } = product;
  const parseCaracteristica = caracteristica
    ?.split(";")
    .map((c) => c.trim().split(":"));

  console.log({ parseCaracteristica, caracteristica });

  let slides = getUrlSlides(imagenes);

  return (
    <Container
      maxW={{
        base: "container.lg",
        lg: "container.lg",
        md: "container.md",
        sm: "container.sm",
      }}
    >
      <SimpleGrid
        columns={{ base: 1, lg: 2, md: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Carousel slides={slides} />
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
              {toCurrency(precio)}
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
            {caracteristica && (
              <Box>
                <Text
                  fontSize={{ base: "16px", lg: "18px" }}
                  color={useColorModeValue("yellow.500", "yellow.300")}
                  fontWeight={"500"}
                  textTransform={"uppercase"}
                  mb={"4"}
                >
                  Detalles del producto
                </Text>
                {parseCaracteristica?.map((c) => (
                  <List key={c[0] + c[1]} spacing={2}>
                    <ListItem>
                      <Text as={"span"} fontWeight={"bold"}>
                        {c[0]}:
                      </Text>
                      {c[1]}
                    </ListItem>
                  </List>
                ))}
              </Box>
            )}
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
            onClick={() => addToCart(product)}
          >
            Agregar al carrito
          </Button>

          <Stack direction="row" alignItems="center" justifyContent={"center"}>
            <MdLocalShipping />
            <Text>Entrega aproximada en 7 días</Text>
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
    fallback: "blocking",
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
