import request from "@/utils/request.js";
import { setting } from "@/config/setting";

const { tokenName } = setting;
export const login = async (data) => {
  return request({
    url: "/login",
    method: "post",
    data
  });
};

export const getUserInfo = (accessToken) => {
  return request({
    url: "/userInfo",
    method: "post",
    data: {
      [tokenName]: accessToken
    }
  });
};

export const logout = () => {
  return request({
    url: "/logout",
    method: "post"
  });
};

export const register = async () => {
  return request({
    url: "/register",
    method: "post"
  });
};
export const LoginTeam = async () => {
  return request({

    url: "/user/LoginTeam",
    method: "get",
    baseURL: "http://192.168.1.142:8282"

  });
};
