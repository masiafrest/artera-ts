import { HStack, Image, Flex, Box, Text } from "@chakra-ui/react";
import React, { useState } from "react";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

type Props = { slides: string[] };

const arrowStyles = {
  cursor: "pointer",
  top: "50%",
  w: "auto",
  mt: "-22px",
  p: "16px",
  color: "white",
  fontWeight: "bold",
  fontSize: "18px",
  transition: "0.6s ease",
  borderRadius: "0 3px 3px 0",
  _hover: {
    opacity: 0.8,
    bg: "black",
  },
};

export default function Carousel({ slides }: Props) {
  console.log({ slides });

  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesCount = slides.length;

  const prevSlide = () => {
    setCurrentSlide((s) => (s === 0 ? slidesCount - 1 : s - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((s) => (s === slidesCount - 1 ? 0 : s + 1));
  };

  const setSlide = (slide: number) => {
    setCurrentSlide(slide);
  };

  const carouselStyle = {
    transition: "all .5s",
    ml: `-${currentSlide * 100}%`,
  };
  const moreThanOneImg = slidesCount > 1;

  return (
    <Flex w="full" h="full" overflow="hidden" pos="relative">
      <Flex w="full" {...carouselStyle}>
        {slides.map((slide, sid) => (
          <Box key={`slide-${sid}`} boxSize="full" shadow="md" flex="none">
            <Text
              color="white"
              fontSize="xs"
              p="8px 12px"
              pos="absolute"
              top="0"
            >
              {sid + 1} / {slidesCount}
            </Text>
            <Image
              src={slide}
              rounded="md"
              fit={"cover"}
              alt="carousel image"
              boxSize="full"
              backgroundSize="cover"
            />
          </Box>
        ))}
      </Flex>
      {moreThanOneImg && (
        <>
          <Text
            {...arrowStyles}
            userSelect="none"
            pos="absolute"
            left="0"
            onClick={prevSlide}
          >
            &#10094;
          </Text>
          <Text
            {...arrowStyles}
            userSelect="none"
            pos="absolute"
            right="0"
            onClick={nextSlide}
          >
            &#10095;
          </Text>
          <HStack justify="center" pos="absolute" bottom="8px" w="full">
            {Array.from({
              length: slidesCount,
            }).map((_, slide) => (
              <Box
                key={`dots-${slide}`}
                cursor="pointer"
                boxSize={["7px", null, "15px"]}
                m="0 2px"
                bg={
                  currentSlide === slide ? "blackAlpha.800" : "blackAlpha.500"
                }
                rounded="50%"
                display="inline-block"
                transition="background-color 0.6s ease"
                _hover={{
                  bg: "blackAlpha.800",
                }}
                onClick={() => setSlide(slide)}
              ></Box>
            ))}
          </HStack>
        </>
      )}
    </Flex>
  );
}
