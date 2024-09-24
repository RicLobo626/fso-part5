import axios from "axios";

const baseUrl = "/api/blogs";

export const getBlogs = async () => {
  const { data } = await axios.get(baseUrl);

  return data;
};
