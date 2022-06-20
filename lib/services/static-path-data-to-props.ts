import { promises as fs } from "fs";
import path from "path";
import { ProductDetailInterface } from "../types";

const PRODUCTS: ProductDetailInterface[] = [
  {
    sku: "mug",
    imagen: "Vercel Mug",
    descripcion: "Limited edition",
    precio: 15,
  },
  {
    sku: "hoodie",
    imagen: "Vercel Hoodie",
    descripcion: "Limited edition",
    precio: 35,
  },
];

const staticPathDataToProps = {
  list: async () => {
    return PRODUCTS;
  },
  fetch: async (sku: ProductDetailInterface["sku"]) => {
    return PRODUCTS.find((product) => product.sku === sku);
  },
  cache: {
    get: async (
      sku: string
    ): Promise<ProductDetailInterface | null | undefined> => {
      const data = await fs.readFile(path.join(process.cwd(), "products.db"));
      const products: ProductDetailInterface[] = JSON.parse(
        data as unknown as string
      );

      return products.find((product) => product.sku === sku);
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
