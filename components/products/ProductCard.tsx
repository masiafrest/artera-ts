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

interface Props {
  productDetails: ProductDetailInterface;
}

export default function ProductCard({
  productDetails: { SKU, Imagen, Descripcion, Precio, OldPrice },
}: Props) {
  return (
    <LinkBox>
      <Center py={12}>
        <Box
          role={"group"}
          p={6}
          maxW={"330px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.800")}
          boxShadow={"2xl"}
          rounded={"lg"}
          pos={"relative"}
          zIndex={1}
        >
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
              backgroundImage: `url(${Imagen || "/images/vasija_card.webp"})`,
              filter: "blur(15px)",
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: "blur(20px)",
              },
            }}
          >
            <Image
              rounded={"lg"}
              height={230}
              width={282}
              objectFit={"cover"}
              src={Imagen || "/images/vasija_card.webp"}
              alt="img"
            />
          </Box>
          <Stack pt={10} align={"center"}>
            <NextLink href={`/products/${SKU}`} passHref>
              <LinkOverlay />
            </NextLink>
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
              {Descripcion}
            </Heading>
            <Stack direction={"row"} align={"center"}>
              <Text fontWeight={800} fontSize={"xl"}>
                {Precio}
              </Text>
              {OldPrice && (
                <Text textDecoration={"line-through"} color={"gray.600"}>
                  {OldPrice}
                </Text>
              )}
            </Stack>
          </Stack>
        </Box>
      </Center>
    </LinkBox>
  );
}
