import { User } from "@supabase/supabase-js";

export interface ProductDetailInterface {
  id?: number;
  imagen: string | null;
  imagenes?: FileWithPreview[],
  descripcion: string;
  precio: number | string;
  oldprice?: number;
  sku: string;
}

interface FileWithPreview extends File {
  preview: string
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
