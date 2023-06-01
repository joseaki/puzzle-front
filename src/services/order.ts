import axiosClient from "@/config/axiosClient";
import { IOrder } from "@/types/orders.types";
import { IProduct } from "@/types/products.types";

export const addProductToCart = async (product: IProduct) => {
  const resp = await axiosClient.post("/api/orders/addToCart", {
    id: product.id,
  });
  return resp.data;
};

export const getAllOrders = async () => {
  const resp = await axiosClient.get("/api/orders");
  return resp.data;
};

export const payCart = async () => {
  const resp = await axiosClient.post("/api/orders/payCart");
  return resp.data;
};

export const removeProductFromOrder = async (product: IProduct) => {
  const resp = await axiosClient.delete(`/api/orders/${product.id}/removeItem`);
  return resp.data;
};

export const deleteShoppingCart = async () => {
  const resp = await axiosClient.delete(`/api/orders/deleteShoppingCart`);
  return resp.data;
};

export const rateOrder = async (order: IOrder, rate: number) => {
  const resp = await axiosClient.patch(`/api/orders/${order._id}/rate`, {
    rate,
  });
  return resp.data;
};
