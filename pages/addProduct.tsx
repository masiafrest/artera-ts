import React from "react";
import { useToast } from "@chakra-ui/react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { supabase } from "lib/utils/supabaseClient";
import { NextAppPageServerSideProps, ProductDetailInterface } from "lib/types";
import { uploadImgs, uploadProduct } from "lib/services/products-api";
import ProductForm from "components/Forms/ProductForm";

const defaultValues: ProductDetailInterface = {
  descripcion: "",
  precio: "1.00",
  sku: "",
  fileImgs: [],
  caracteristica: "",
};

export default function AddProduct(
  props: InferGetServerSidePropsType<typeof getServerSideProps>
): JSX.Element {
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
      throw error;
      // throw new Error(error.message);
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
        destination: "/signin",
        permanent: false,
      },
    };
  }

  return {
    props: {
      user,
    },
  };
};
