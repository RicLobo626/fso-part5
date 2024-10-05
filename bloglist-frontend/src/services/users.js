import axiosInstance from "../axiosInstance";

const baseUrl = "/api/users";

export const getUsers = async () => {
  const { data } = await axiosInstance.get(baseUrl);
  return data;
};
