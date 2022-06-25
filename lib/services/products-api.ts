import axios from "axios";
import { supabase } from "lib/utils/supabaseClient";
import Papa from "papaparse";

import { ProductDetailInterface } from "../types";

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

const getImgForCarousel = async (): Promise<ProductDetailInterface[]> =>
  axios
    .get(process.env.SPREADSHEET_LINK_CAROUSEL as string, {
      responseType: "blob",
    })
    .then(
      (response) =>
        new Promise<ProductDetailInterface[]>((resolve, reject) => {
          Papa.parse(response.data, {
            header: true,
            complete: (result) =>
              resolve(result.data as ProductDetailInterface[]),
            error: (error) => reject(error.message),
          });
        })
    );

const uploadImgs = async ({
  imagenes,
  sku,
}: {
  imagenes: ProductDetailInterface["imagenes"];
  sku: string;
}) => {
  const imgPaths: string[] = [];
  for (let img of imagenes) {
    const imgPath = await supabase.storage
      .from("products")
      .upload(`${sku}/${img.name}`, img, {
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
