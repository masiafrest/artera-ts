import {
  Tooltip,
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  LinkBox,
  LinkOverlay,
  Flex,
  Circle,
  Badge,
  chakra,
  Icon,
  IconButton,
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";
import NextLink from "next/link";
import { ProductDetailInterface } from "lib/types";
import Carousel from "components/Carousels";
import { getUrlSlides } from "lib/utils";
import DeleteIcon from "components/DeleteIconBtn";
import EditIcon from "components/EditIconBtn";
import { useRouter } from "next/router";
import { useCart } from "lib/context/CartContext";

interface Props {
  product: ProductDetailInterface;
}

export default function ProductCard({ product }: Props) {
  console.log({ product });
  const { sku, imagen, descripcion, precio, oldprice, imagenes, id } = product;
  const { addToCart } = useCart();
  const router = useRouter();
  const slides = getUrlSlides(imagenes);
  return (
    <LinkBox>
      <Center py={12}>
        <Flex p={50} w="full" alignItems="center" justifyContent="center">
          <Box
            bg={useColorModeValue("white", "gray.800")}
            maxW="sm"
            borderWidth="1px"
            rounded="lg"
            shadow="lg"
            position="relative"
          >
            <DeleteIcon
              aria-label="remove-product"
              size="md"
              top="-1"
              right="-5"
              onClick={(e) => console.log(e)}
            />
            <EditIcon
              aria-label="edit-product"
              size="md"
              top="12"
              right="-5"
              onClick={(e) => router.push(`/editProduct/${id}`)}
            />
            {/* {data.isNew && (
              <Circle
                size="10px"
                position="absolute"
                top={2}
                right={2}
                bg="red.200"
              />
            )} */}{" "}
            <NextLink href={`/products/${sku}`} passHref>
              <LinkOverlay>
                <Image
                  rounded={"lg"}
                  height={230}
                  width={282}
                  objectFit={"cover"}
                  src={slides ? slides[0] : "/images/vasija_card.webp"}
                  alt="img"
                  roundedTop="lg"
                />
              </LinkOverlay>
            </NextLink>
            <Box p="6">
              <Box display="flex" alignItems="baseline">
                {/* {data.isNew && (
                  <Badge
                    rounded="full"
                    px="2"
                    fontSize="0.8em"
                    colorScheme="red"
                  >
                    New
                  </Badge>
                )} */}
              </Box>
              <Flex mt="1" justifyContent="space-between" alignContent="center">
                <Box
                  fontSize="2xl"
                  fontWeight="semibold"
                  as="h4"
                  lineHeight="tight"
                  // isTruncated
                >
                  {descripcion}
                </Box>
                <Tooltip
                  label="Add to cart"
                  bg="white"
                  placement={"top"}
                  color={"gray.800"}
                  fontSize={"1.2em"}
                >
                  <IconButton
                    aria-label="cart-icon"
                    backgroundColor="transparent"
                    display={"flex"}
                    _hover={{
                      bg: useColorModeValue("gray.200", "gray.700"),
                    }}
                    onClick={(e) => addToCart(product)}
                  >
                    <Icon
                      as={FiShoppingCart}
                      h={7}
                      w={7}
                      alignSelf={"center"}
                    />
                  </IconButton>
                </Tooltip>
              </Flex>

              <Flex justifyContent="space-between" alignContent="center">
                {/* {oldprice && (
                    <Text textDecoration={"line-through"} color={"gray.600"}>
                      {oldprice}
                    </Text>
                  )} */}
                <Text>{sku}</Text>
                <Box
                  fontSize="2xl"
                  color={useColorModeValue("gray.800", "white")}
                >
                  <Box as="span" color={"gray.600"} fontSize="lg">
                    $
                  </Box>
                  {precio}
                </Box>
              </Flex>
            </Box>
          </Box>
        </Flex>
      </Center>
    </LinkBox>
  );
}
