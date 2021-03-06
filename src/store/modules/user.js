import { getUserInfo, login } from "@/api/user";
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
  setTeamid,
  setUname,
  getUname,
  removeUname
} from "@/utils/accessToken";

import { setting } from "@/config/setting";

const { title, tokenName } = setting;
import { resetRouter } from "@/router";

import i18n from "@/locales";

const { global } = i18n;

import { ElMessage, ElNotification } from "element-plus";

const state = {
  accessToken: getAccessToken(),
  username: "",
  avatar: "",
  permissions: [],
  uname: getUname()
};

const getters = {
  accessToken: (state) => state.accessToken,
  username: (state) => state.username,
  avatar: (state) => state.avatar,
  permissions: (state) => state.permissions,
  uname: (state) => state.uname
};
const mutations = {
  setAccessToken(state, accessToken) {
    state.accessToken = accessToken;
    setAccessToken(accessToken);
  },
  setTeamid(state, teamid) {
    setTeamid(teamid);
  },
  setUname(state, uname) {
    state.uname = uname;
    setUname(uname);
  },
  setUsername(state, username) {
    state.username = username;
  },
  setAvatar(state, avatar) {
    state.avatar = avatar;
  },
  setPermissions(state, permissions) {
    state.permissions = permissions;
  }
};
const actions = {
  setPermissions({ commit }, permissions) {
    commit("setPermissions", permissions);
  },
  async setAccessToken({ commit }, accessToken) {
    commit("setAccessToken", accessToken);
  },
  async setTeamid({ commit }, teamid) {
    commit("setTeamid", teamid);
  },
  async setUname({ commit }, uname) {
    commit("setUname", uname);
  },
  async login({ commit }, userInfo) {
    const { data } = await login(userInfo);
    const accessToken = data[tokenName];
    if (accessToken) {
      commit("setAccessToken", accessToken);
      const hour = new Date().getHours();
      const thisTime =
        hour < 8
          ? global.t("sayHi.early")
          : hour <= 11
            ? global.t("sayHi.morning")
            : hour <= 13
              ? global.t("sayHi.noon")
              : hour < 18
                ? global.t("sayHi.afternoon")
                : global.t("sayHi.evening");
      ElNotification({
        title: `${thisTime}???`,
        message: `${global.t("notice.msg")}${title}!`,
        type: "success"
      });
    } else {
      ElMessage.error(`????????????????????????????????????${tokenName}...`);
    }
  },
  async getUserInfo({ commit, state }) {
    console.log("state.accessToken:" + state.accessToken);
    const { data } = await getUserInfo(state.accessToken);
    if (!data) {
      ElMessage.error("??????????????????????????????...");
      return false;
    }
    let { permissions, username, avatar } = data;
    if (permissions && username && Array.isArray(permissions)) {
      commit("setPermissions", permissions);
      commit("setUsername", username);
      commit("setAvatar", avatar);
      return permissions;
    } else {
      ElMessage.error("????????????????????????");
      return false;
    }
  },
  async logout({ dispatch }) {
    // await logout(state.accessToken);
    await dispatch("resetAccessToken");
    await resetRouter();
  },
  resetAccessToken({ commit }) {
    commit("setPermissions", []);
    commit("setAccessToken", "");
    commit("setUname", "");
    removeAccessToken();
    removeUname();
  }
};
export default { state, getters, mutations, actions };
