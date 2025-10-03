import { ProductStatus, ProductType } from "../enums";
import { ProductSize } from "./product-size";

export interface Product {
  ProductID: string;
  ProductSizeID: string[] | null;
  Type: ProductType;
  Description: string;
  Name: string;
  Status: ProductStatus;
  Images: string[];
}
