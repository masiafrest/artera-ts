import { delFile } from "lib/services/products-api";
import { ProductDetailInterface } from "lib/types";

export const getUrlSlides = (imagenes: ProductDetailInterface["imagenes"]) => {
  let slides = ["/images/vasija_card.webp"];
  if (imagenes && imagenes?.length !== 0) {
    slides = imagenes?.map(
      (s) => `${process.env.NEXT_PUBLIC_SUPABASE_URL_IMG_PRODUCT}/${s}`
    );
  }
  return slides;
};

export const delImgsFromStorage = async (
  oldArr: string[] = [],
  newArr: string[] = []
): Promise<string[]> => {
  const imgsToDel: string[] = [];

  oldArr.forEach((img, idx) => {
    const hasImg = newArr.includes(img);
    if (!hasImg) {
      imgsToDel.push(img);
    }
  });
  if (imgsToDel.length > 0) {
    await delFile(imgsToDel);
  }
  return imgsToDel;
};

export const toCurrency = (
  precio: string | number,
  currency: string = "USD"
): string => {
  return Number(precio).toLocaleString("us-US", {
    style: "currency",
    currency,
  });
};
