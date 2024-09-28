import axios from "axios";

export const login = async (body) => {
  const { data } = await axios.post("/api/login", body);

  return data;
};
