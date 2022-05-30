import axios from "axios";
import Papa from "papaparse";

import { ProductDetailInterface } from "./types";

const getAllProducts = async (): Promise<ProductDetailInterface[]> =>
  axios
    .get(process.env.SPREADSHEET_LINK as string, { responseType: "blob" })
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
export { getAllProducts };
