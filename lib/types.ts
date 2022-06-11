export interface ProductDetailInterface {
  Imagen: string;
  Descripcion: string;
  Precio: number;
  OldPrice?: number;
  SKU: string;
}

export interface CartProductDetailInterface extends ProductDetailInterface {
  qty: number;
}
