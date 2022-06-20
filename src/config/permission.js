/**
 * @author hujiangjun 1217437592@qq.com
 * @description 路由控制
 */

import router from "@/router";
import store from "@/store";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getPageTitle } from "@/utils/index";
import { setting } from "@/config/setting";
import { LoginTeam } from "@/api/user";
import Cookies from "js-cookie";
import { getUname } from "@/utils/accessToken";

const { authentication, loginInterception, progressBar, routesWhiteList, recordRoute } = setting;

NProgress.configure({
  easing: "ease",
  speed: 500,
  trickleSpeed: 200,
  showSpinner: false
});
router.beforeEach(async (to, from, next) => {
  if (progressBar) NProgress.start();
  // alert(localStorage.getItem('oldName'))
  // let oldname = localStorage.getItem('oldName')
  // console.log("oldname"+oldname)
  let hasToken = store.getters["user/accessToken"];
  let uname = store.getters["user/uname"];
  console.log("to.path:" + to.path);
  if (to.path === "/") {
    console.log("即将执行LoginTeam");
    const { data } = await LoginTeam();
    uname = data.uname;
    hasToken = data.accessToken;
    console.log("uname:" + uname);
    console.log("hasToken:" + hasToken);
    if (hasToken != 999) {
      await store.dispatch("user/setUname", uname);
      await store.dispatch("user/setTeamid", hasToken);
      await store.dispatch("user/setAccessToken", "user-accessToken");
    } else {
      await store.dispatch("user/setUname", "admin");
      await store.dispatch("user/setTeamid", hasToken);
      await store.dispatch("user/setAccessToken", "admin-accessToken");
    }
  } else {
    if (sessionStorage.getItem("uuname") == null) {
    } else if (sessionStorage.getItem("uuname") == getUname()) {
    } else {
      alert("登陆信息失效");
      sessionStorage.clear();
      let url = "http://localhost:8082/volunteer_login2";
      window.location.href = url;
    }
  }
  // if (!hasToken) {
  // }
  console.log("local:" + sessionStorage.getItem("uuname"));

  console.log("getUname:" + getUname());
  console.log("hasToken======:" + hasToken);
  console.log("uname===========:" + uname);

  if (!loginInterception) hasToken = true;
  if (hasToken) {
    if (to.path === "/login") {
      next({ path: "/" });
      if (progressBar) NProgress.done();
    } else {
      const hasPermissions =
        store.getters["user/permissions"] && store.getters["user/permissions"].length > 0;
      if (hasPermissions) {
        next();
      } else {
        try {
          let permissions;
          if (!loginInterception) {
            //settings.js loginInterception为false时，创建虚拟权限
            await store.dispatch("user/setPermissions", ["admin"]);
            permissions = ["admin"];
          } else {
            permissions = await store.dispatch("user/getUserInfo");
            console.log("执行完getUserInfo后的permissions:" + permissions);
          }

          let accessRoutes = [];
          if (authentication === "intelligence") {
            accessRoutes = await store.dispatch("routes/setRoutes", permissions);
          } else if (authentication === "all") {
            accessRoutes = await store.dispatch("routes/setAllRoutes");
          }
          accessRoutes.forEach((item) => {
            router.addRoute(item);
          });
          next({ ...to, replace: true });
        } catch {
          await store.dispatch("user/resetAccessToken");
          if (progressBar) NProgress.done();
        }
      }
    }
  } else {
    // 免登录路由
    if (routesWhiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      if (recordRoute) {
        let url = "http://localhost:8082/volunteer_login2";
        window.location.href = url;
        // next(`/login?redirect=${to.path}`);
      } else {
        let url = "http://localhost:8082/volunteer_login2";
        window.location.href = url;
        // next("/login");
      }
      if (progressBar) NProgress.done();
    }
  }
  document.title = getPageTitle(to.meta.title);
});
router.afterEach(() => {
  if (progressBar) NProgress.done();
});
