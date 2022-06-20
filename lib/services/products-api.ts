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
export { getAllProducts, getProductBySku };
