import { User } from "@supabase/supabase-js";

export interface ProductDetailInterface {
  Imagen: string;
  Descripcion: string;
  Precio: number | string;
  OldPrice?: number;
  SKU: string;
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
