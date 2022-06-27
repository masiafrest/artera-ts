import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Image,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/react";
import NextLink from "next/link";
import { ProductDetailInterface } from "lib/types";
import Carousel from "components/Carousels";
import { getUrlSlides } from "lib/utils";
import DeleteIcon from "components/DeleteIconBtn";
import EditIcon from "components/EditIconBtn";
import { useRouter } from "next/router";

interface Props {
  productDetails: ProductDetailInterface;
}

export default function ProductCard({
  productDetails: { sku, imagen, descripcion, precio, oldprice, imagenes, id },
}: Props) {
  const router = useRouter();
  const slides = getUrlSlides(imagenes);
  return (
    <LinkBox>
      <Center py={12}>
        <Box
          role={"group"}
          p={6}
          maxW={"330px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"2xl"}
          rounded={"lg"}
          pos={"relative"}
          zIndex={1}
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
          <Box
            rounded={"lg"}
            mt={-12}
            pos={"relative"}
            height={"230px"}
            _after={{
              transition: "all .3s ease",
              content: '""',
              w: "full",
              h: "full",
              pos: "absolute",
              top: 5,
              left: 0,
              backgroundImage: `url(${imagen || "/images/vasija_card.webp"})`,
              filter: "blur(15px)",
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: "blur(20px)",
              },
            }}
          >
            {/* <Carousel slides={slides} /> */}
            <Image
              rounded={"lg"}
              height={230}
              width={282}
              objectFit={"cover"}
              src={slides ? slides[0] : "/images/vasija_card.webp"}
              alt="img"
            />
          </Box>
          <NextLink href={`/products/${sku}`} passHref>
            <LinkOverlay>
              <Stack pt={10} align={"center"}>
                <Text
                  color={"gray.500"}
                  fontSize={"sm"}
                  textTransform={"uppercase"}
                >
                  Arterra
                </Text>
                <Heading
                  fontSize={"2xl"}
                  fontFamily={"body"}
                  style={{
                    width: "200px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    textAlign: "center",
                  }}
                >
                  {descripcion}
                </Heading>
                <Stack direction={"row"} align={"center"}>
                  <Text fontWeight={800} fontSize={"xl"}>
                    {precio}
                  </Text>
                  {oldprice && (
                    <Text textDecoration={"line-through"} color={"gray.600"}>
                      {oldprice}
                    </Text>
                  )}
                </Stack>
              </Stack>
            </LinkOverlay>
          </NextLink>
        </Box>
      </Center>
    </LinkBox>
  );
}
