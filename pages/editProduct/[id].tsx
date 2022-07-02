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
  Spinner,
  Stack,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import { supabase } from "lib/utils/supabaseClient";
import {
  FileWithPreview,
  NextAppPageServerSideProps,
  ProductDetailInterface,
} from "lib/types";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import DropZoneInput from "components/DropZoneInput";
import {
  editProdut,
  uploadImgs,
  uploadProduct,
} from "lib/services/products-api";
import axios from "axios";
import { delImgsFromStorage } from "lib/utils";

const defaultValues: ProductDetailInterface = {
  descripcion: "",
  imagen: "",
  precio: "1.00",
  sku: "",
  fileImgs: [],
};

export default function EditProduct({
  product,
}: {
  product: ProductDetailInterface;
}): JSX.Element {
  const [imgFiles, setImgFiles] = useState<string[]>([]);
  const [oldFileImgs, setOldFileImgs] = useState<string[]>([]);
  const methods = useForm<ProductDetailInterface>({
    defaultValues,
  });
  const { handleSubmit, control, register, formState, reset } = methods;
  const toast = useToast({
    duration: 5000,
    isClosable: true,
    position: "top",
  });
  //work pero si no edita imagenes se manda mal el File
  useEffect(() => {
    if (product?.imagenes) {
      const fileImgs = product?.imagenes.map(
        (i) =>
          ({
            name: i,
            preview: `${process.env.NEXT_PUBLIC_SUPABASE_URL_IMG_PRODUCT}/${i}`,
          } as unknown as FileWithPreview)
      );
      setOldFileImgs(product.imagenes);
      reset({ ...product, fileImgs });
    }
  }, []);

  const onSubmit = async (product: ProductDetailInterface) => {
    const { descripcion, sku, fileImgs } = product;
    try {
      // sacar las imagenes agregadas
      const trueImgFile = fileImgs?.filter((e) => !!e?.size);
      // sacar las imagenes default del servidor, no es tipe Blob o File
      const previewImgsOnly = fileImgs?.filter((e) => !!!e?.size);

      let imgPaths: string[] = [];
      if (trueImgFile && trueImgFile?.length > 0) {
        imgPaths = await uploadImgs({ fileImgs: trueImgFile });
      }
      await delImgsFromStorage(
        oldFileImgs,
        previewImgsOnly?.map((e) => e.name)
      );
      const newImgPaths = [
        ...previewImgsOnly!.map((e) => e.name),
        ...imgPaths!,
      ];

      await editProdut({ product, imgPaths: newImgPaths });

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

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      // reset(defaultValues);
    }
  }, [formState.isSubmitSuccessful]);

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
          Edit a Product
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
              disabled={formState.isSubmitting}
            >
              Submit
              {formState.isSubmitting && <Spinner />}
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
  query,
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

  //get router parameter product id
  const { id } = query;
  //search on supabase the product id
  const { data } = await supabase
    .from<ProductDetailInterface>("products")
    .select("*")
    .eq("id", id)
    .limit(1);

  //get image array and ??

  //send the product detail to props for editing
  return {
    props: {
      product: !!data ? data[0] : undefined,
      user,
      loggedIn: !!user,
    },
  };
};
