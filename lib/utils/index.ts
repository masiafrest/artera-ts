import { ProductDetailInterface } from "lib/types";

export const getUrlSlides = (imagenes: ProductDetailInterface["imagenes"]) => {
  let slides = ["/images/vasija_card.webp"];
  if (imagenes && imagenes?.length !== 0) {
    slides = imagenes?.map(
      (s) => `${process.env.NEXT_PUBLIC_SUPABASE_URL_IMG}/${s}`
    );
  }
  return slides;
};
