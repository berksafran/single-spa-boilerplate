import axios from "axios";

export const getSingleUser = (id) => {
  return axios.get(`https://dummyjson.com/users/${id}`);
};
