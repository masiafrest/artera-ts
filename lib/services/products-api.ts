import axios from "axios";
import { supabase } from "lib/utils/supabaseClient";
import Papa from "papaparse";
import Resizer from "react-image-file-resizer";

import { FileWithPreview, ProductDetailInterface } from "../types";

const getAllProducts = async (): Promise<ProductDetailInterface[]> => {
  const { data } = await supabase
    .from<ProductDetailInterface>("products")
    .select("*");

  return data as unknown as ProductDetailInterface[];
};

const getProductBySku = async (
  sku: string | undefined
): Promise<ProductDetailInterface[] | undefined> => {
  if (sku) {
    const { data } = await supabase
      .from<ProductDetailInterface>("products")
      .select()
      .eq("sku", sku)
      .limit(1);
    return data as unknown as ProductDetailInterface[];
  }
  return undefined;
};

const resizeImg = (img: FileWithPreview) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      img,
      1000,
      1000,
      "",
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      "file",
      500,
      500
    );
  });

const uploadImgs = async ({
  fileImgs = [],
  sku,
}: {
  fileImgs: ProductDetailInterface["fileImgs"];
  sku: string;
}) => {
  const imgPaths: string[] = [];
  for (let img of fileImgs) {
    const resizedImg = await resizeImg(img);
    console.log({ resizedImg });
    const imgPath = await supabase.storage
      .from("products")
      .upload(`${sku}/${img.name}`, resizedImg as File, {
        cacheControl: "3600",
        upsert: true,
      });
    if (imgPath.data) {
      const cleanPath = imgPath.data.Key.split("/").slice(1).join("/");
      imgPaths.push(cleanPath);
    }
    if (imgPath.error) {
      throw new Error(imgPath.error.message);
    }
  }
  return imgPaths;
};

const uploadProduct = async ({
  product,
  imgPaths,
}: {
  product: ProductDetailInterface;
  imgPaths: string[];
}) => {
  const { descripcion, precio, sku, imagen } = product;
  const { error } = await supabase
    .from("products")
    .insert({ descripcion, precio, sku, imagen, imagenes: imgPaths });
  if (error) {
    throw new Error(JSON.stringify(error));
  }
};
export { getAllProducts, getProductBySku, uploadImgs, uploadProduct };
