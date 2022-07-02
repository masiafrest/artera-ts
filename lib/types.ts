import { User } from "@supabase/supabase-js";

export interface ProductDetailInterface {
  id?: number;
  imagen: string | null;
  imagenes?: string[] | null;
  fileImgs?: FileWithPreview[];
  descripcion: string;
  precio: number | string;
  oldprice?: number;
  sku: string;
}

export interface FileWithPreview extends File {
  preview: string;
}

export interface CartProductDetailInterface extends ProductDetailInterface {
  qty: number;
}

export interface SupabaseAuthPayload {
  email: string;
  password: string;
}

export interface NextAppPageUserProps {
  props: {
    product: ProductDetailInterface | null;
    user: User;
    loggedIn: boolean;
  };
}

export interface NextAppPageRedirProps {
  redirect: {
    destination: string;
    permanent: boolean;
  };
}

export type NextAppPageServerSideProps =
  | NextAppPageUserProps
  | NextAppPageRedirProps;
