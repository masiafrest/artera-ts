import { User } from "@supabase/supabase-js";

export interface ProductDetailInterface {
  id?: number;
  imagen: string | null;
  imagenes?: string[];
  fileImgs?: FileWithPreview[];
  descripcion: string;
  precio: string;
  oldprice?: number;
  sku: string;
  caracteristica?: string;
}

interface Caracteristica {
  name: string;
  value: string;
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
  phone?: string;
  username?: string;
  lastname?: string;
  isadmin?: boolean;
}

export interface NextAppPageUserProps {
  props: {
    product?: ProductDetailInterface;
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
