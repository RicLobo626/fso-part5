import axiosInstance from "../axiosInstance";

const baseUrl = "/api/blogs";

export const getBlogs = async () => {
  const { data } = await axiosInstance.get(baseUrl);

  return data;
};

export const createBlog = async (body) => {
  const { data } = await axiosInstance.post(baseUrl, body);

  return data;
};

export const likeBlog = async (id) => {
  const { data } = await axiosInstance.put(`${baseUrl}/${id}`);

  return data;
};
