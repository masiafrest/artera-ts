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
import { GetServerSideProps } from "next";
import { supabase } from "lib/utils/supabaseClient";
import {
  FileWithPreview,
  NextAppPageServerSideProps,
  ProductDetailInterface,
} from "lib/types";
import {
  editProdut,
  uploadImgs,
  uploadProduct,
} from "lib/services/products-api";
import { delImgsFromStorage } from "lib/utils";
import ProductForm from "components/Forms/ProductForm";

export default function EditProduct({
  product,
}: {
  product: ProductDetailInterface;
}): JSX.Element {
  const [oldFileImgs, setOldFileImgs] = useState<string[]>([]);
  const toast = useToast({
    duration: 5000,
    isClosable: true,
    position: "top",
  });
  //work pero si no edita imagenes se manda mal el File
  useEffect(() => {
    setOldFileImgs(product.imagenes ?? []);
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
  return (
    <ProductForm
      defaultValues={{
        ...product,
      }}
      onSubmit={onSubmit}
    />
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
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
