import { ItemResponse } from "./ItemResponse";

export interface InvoiceResponse {
    lastInvoiceId: number;
    products: ItemResponse[]
  }