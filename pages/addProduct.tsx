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
  Textarea,
  Tooltip,
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
import { QuestionOutlineIcon } from "@chakra-ui/icons";
import ProductForm from "components/ProductForm";

const defaultValues: ProductDetailInterface = {
  descripcion: "",
  imagen: "",
  precio: "1.00",
  sku: "",
  fileImgs: [],
  caracteristica: "",
};

export default function AddProduct({}: InferGetServerSidePropsType<
  typeof getServerSideProps
>): JSX.Element {
  const toast = useToast({
    duration: 5000,
    isClosable: true,
    position: "top",
  });

  const onSubmit = async (product: ProductDetailInterface) => {
    const { descripcion, sku, fileImgs } = product;
    try {
      const imgPaths = await uploadImgs({ fileImgs });
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

  return <ProductForm defaultValues={defaultValues} onSubmit={onSubmit} />;
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
}): Promise<NextAppPageServerSideProps> => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user?.user_metadata.isadmin) {
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
