import { Item } from "./item";
import { User } from "./user";

export interface Invoice {
    id: number;
    userId: number;
    state: number;
    items: Item[];
  }