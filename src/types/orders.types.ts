import { IProduct } from "./products.types";

export interface IOrder {
  _id: string;
  rate?: number;
  products: IProduct[];
  state: string;
}
