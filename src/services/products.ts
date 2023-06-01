import axiosClient from "@/config/axiosClient";

export const getProducts = async (
  query?: string,
  category?: string,
  price?: string
) => {
  const data = await axiosClient.get("/api/products", {
    params: {
      query,
      category,
      price,
    },
  });
  return data.data;
};
