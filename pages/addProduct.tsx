import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { supabase } from "lib/utils/supabaseClient";
import { NextAppPageServerSideProps, ProductDetailInterface } from "lib/types";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import DropZoneInput from "components/DropZoneInput";
import { uploadImgs, uploadProduct } from "lib/services/products-api";
import { PostgrestError } from "@supabase/supabase-js";

export default function UserProfileEdit({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>): JSX.Element {
  const methods = useForm<ProductDetailInterface>({
    defaultValues: {
      descripcion: "",
      imagen: "",
      precio: "1.00",
      sku: "",
      imagenes: [],
    },
  });
  const { handleSubmit, control, register, formState } = methods;
  const toast = useToast({
    duration: 5000,
    isClosable: true,
    position: "top",
  });

  const onSubmit = async (product: ProductDetailInterface) => {
    const { descripcion, precio, sku, imagen, imagenes } = product;
    try {
      const imgPaths = await uploadImgs({ sku, imagenes });
      await uploadProduct({ product, imgPaths });
      toast({
        description: `${descripcion}, added`,
        status: "success",
      });
    } catch (error: any) {
      toast({
        description: error.message,
        status: "error",
      });
      console.log("error", error);
    }
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack
        as="form"
        onSubmit={handleSubmit(onSubmit)}
        spacing={4}
        w={"full"}
        maxW={"md"}
        bg={useColorModeValue("white", "gray.700")}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
          Add a Product
        </Heading>
        <FormProvider {...methods}>
          <DropZoneInput />
          <FormControl id="descripcion" isRequired>
            <FormLabel>Descripcion</FormLabel>
            <Input
              placeholder="descripcion"
              _placeholder={{ color: "gray.500" }}
              type="text"
              {...register("descripcion")}
            />
          </FormControl>
          <FormControl id="sku" isRequired>
            <FormLabel>Sku</FormLabel>
            <Input
              placeholder="sku"
              _placeholder={{ color: "gray.500" }}
              type="text"
              {...register("sku")}
            />
          </FormControl>
          <FormControl id="precio" isRequired>
            <FormLabel>Precio</FormLabel>
            <Controller
              control={control}
              name="precio"
              render={({ field: { ref, ...restField } }) => (
                <NumberInput {...restField} precision={2} step={0.01} min={1.0}>
                  <NumberInputField
                    ref={ref}
                    name={restField.name}
                    placeholder="precio"
                    _placeholder={{ color: "gray.500" }}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              )}
            />
          </FormControl>
          <Stack spacing={6} direction={["column", "row"]}>
            <Button
              type="submit"
              bg={"blue.400"}
              color={"white"}
              w="full"
              _hover={{
                bg: "blue.500",
              }}
            >
              Submit
            </Button>
          </Stack>
        </FormProvider>
        <DevTool control={control} />
      </Stack>
    </Flex>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
}): Promise<NextAppPageServerSideProps> => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return {
      redirect: {
        destination: "/signIn",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user,
      loggedIn: !!user,
    },
  };
};
