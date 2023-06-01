import axiosClient from "@/config/axiosClient";

export const signup = async (username: string, password: string) => {
  const resp = await axiosClient.post("/api/users/signup", {
    username,
    password,
  });
  return resp.data;
};

export const login = async (username: string, password: string) => {
  const resp = await axiosClient.post("/api/users/login", {
    username,
    password,
  });
  return resp.data;
};
