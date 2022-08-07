import {
  Box,
  Container,
  Heading,
  IconButton,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect } from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";
import Slider from "react-slick";

type Props = { images?: string[] };
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 5000,
  slidesToShow: 1,
  slidesToScroll: 1,
};
// This list contains all the data for carousels
// This can be static or loaded from a server
const cards = [
  {
    title: "Design Projects 1",
    text: "The project board is an exclusive resource for contract work. It's perfect for freelancers, agencies, and moonlighters.",
    image: "https://drive.google.com/uc?id=1Sn8wxQ2ZFGy6Pb7PFnQuLinmedk9f1DF",
  },
  {
    title: "Design Projects 2",
    text: "The project board is an exclusive resource for contract work. It's perfect for freelancers, agencies, and moonlighters.",
    image: "https://drive.google.com/uc?id=1LdFrBZrhrBXF8iRNTzrGktvphs2kEgcr",
  },
  {
    title: "Design Projects 3",
    text: "The project board is an exclusive resource for contract work. It's perfect for freelancers, agencies, and moonlighters.",
    image: "https://drive.google.com/uc?id=1XTnsW9scs7Ogu2FT59zzsJ_jNhwAQUN1",
  },
  {
    title: "Design Projects 3",
    text: "The project board is an exclusive resource for contract work. It's perfect for freelancers, agencies, and moonlighters.",
    image: "https://drive.google.com/uc?id=1Y8UVfLt3lZrkKQszHcOIRMmVOaGdZU32",
  },
  {
    title: "Design Projects 3",
    text: "The project board is an exclusive resource for contract work. It's perfect for freelancers, agencies, and moonlighters.",
    image: "https://drive.google.com/uc?id=1MAvX4S59cNZ4HBA2bj6NiNOXzXm8JR8A",
  },
];

export default function ImageCarousel({ images }: Props) {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = React.useState<Slider | null>(null);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "40px" });

  return (
    <>
      {/* <Box height='80vh' width='100%' position='relative' >
        <Image src='/images/vasijas_hero.webp' alt='vasijas_hero' height='100%' width='100%'
          objectFit={'cover'}
        />
        <Box position={'absolute'} top='50%' left='50%' transform='translate(-50%, -50%)' >
          <Heading size={'4xl'} >
            Arterra
          </Heading>
        </Box>
      </Box> */}
      <Box
        position={"relative"}
        height={{ base: "max-content" }}
        width={"100%"}
        overflow={"hidden"}
      >
        {/* CSS files for react-slick */}
        <link
          rel="stylesheet"
          type="text/css"
          charSet="UTF-8"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
        />
        <link
          rel="stylesheet"
          type="text/css"
          href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
        />
        {/* Left Icon */}
        <IconButton
          aria-label="left-arrow"
          variant="ghost"
          position="absolute"
          left={side}
          top={top}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => slider?.slickPrev()}
        >
          <BiLeftArrowAlt size="40px" />
        </IconButton>
        {/* Right Icon */}
        <IconButton
          aria-label="right-arrow"
          variant="ghost"
          position="absolute"
          right={side}
          top={top}
          transform={"translate(0%, -50%)"}
          zIndex={2}
          onClick={() => slider?.slickNext()}
        >
          <BiRightArrowAlt size="40px" />
        </IconButton>
        {/* Slider */}
        <Slider {...settings} ref={(slider) => setSlider(slider)}>
          {cards.map((card) => (
            <Box
              key={card.image}
              height={{ base: "56", sm: "80" }}
              position="relative"
              backgroundPosition="center"
              backgroundSize="cover"
              backgroundImage={`url(${card.image})`}
            >
              {/* This is the block you need to change, to customize the caption */}
              {/* <Container size="container.lg" position="relative" w="full">
                <Stack
                  spacing={6}
                  w={"full"}
                  position="absolute"
                  top={{ base: "24", sm: "36", md: "48" }}
                >
                  <Heading fontSize={{ base: "medium", sm: "large" }}>
                    {card.title}
                  </Heading>
                  <Text fontSize={{ base: "sm", sm: "md" }} color="GrayText">
                    {card.text}
                  </Text>
                </Stack>
              </Container> */}
            </Box>
          ))}
        </Slider>
      </Box>
    </>
  );
}
