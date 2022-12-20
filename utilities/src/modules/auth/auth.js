/* eslint-disable no-console */
import { getSingleUser } from "../../services/auth";

const AUTH_TOKEN_KEY = "refresh_token";

export const initAuth = async (resolve, reject) => {
  // If you want, you can get token from cookie
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  if (token) {
    try {
      const resp = await getSingleUser(1);
      if (resp.status === 200) {
        return resp.data;
      }
    } catch (error) {
      console.log("error while api fetching for single user:", error);
      return {};
    }
  }
};

export const testLog = () => {
  console.log("testlog..");
};
