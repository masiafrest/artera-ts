import { promises as fs } from "fs";
import path from "path";
import { ProductDetailInterface } from "../types";

const PRODUCTS: ProductDetailInterface[] = [
  {
    SKU: "mug",
    Imagen: "Vercel Mug",
    Descripcion: "Limited edition",
    Precio: 15,
  },
  {
    SKU: "hoodie",
    Imagen: "Vercel Hoodie",
    Descripcion: "Limited edition",
    Precio: 35,
  },
];

const staticPathDataToProps = {
  list: async () => {
    return PRODUCTS;
  },
  fetch: async (SKU: ProductDetailInterface["SKU"]) => {
    return PRODUCTS.find((product) => product.SKU === SKU);
  },
  cache: {
    get: async (
      SKU: string
    ): Promise<ProductDetailInterface | null | undefined> => {
      const data = await fs.readFile(path.join(process.cwd(), "products.db"));
      const products: ProductDetailInterface[] = JSON.parse(
        data as unknown as string
      );

      return products.find((product) => product.SKU === SKU);
    },
    set: async (products: ProductDetailInterface[]) => {
      return await fs.writeFile(
        path.join(process.cwd(), "products.db"),
        JSON.stringify(products)
      );
    },
  },
};

export default staticPathDataToProps;
