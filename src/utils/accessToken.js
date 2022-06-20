import { setting } from "@/config/setting";

const { tokenTableName, teamidName, Uname } = setting;
import Cookies from "js-cookie";


export function getAccessToken() {
  return Cookies.get(tokenTableName);
}

export function setAccessToken(accessToken) {
  return Cookies.set(tokenTableName, accessToken);
}

export function removeAccessToken() {
  return Cookies.remove(tokenTableName);
}

export function setTeamid(teamid) {
  return Cookies.set(teamidName, teamid);
}

export function getTeamid() {
  return Cookies.get(teamidName);
}

export function setUname(uname) {
  return Cookies.set(Uname, uname);
}

export function getUname() {
  return Cookies.get(Uname);
}

export function removeUname() {
  return Cookies.remove(Uname);
}
