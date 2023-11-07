import { Product } from "src/app/shared/models/product";

export interface ItemResponse {
    product: Product;
    amount: number;
    itemId: number;
  }