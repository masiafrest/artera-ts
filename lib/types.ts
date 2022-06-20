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