
import { setting } from '@/config/setting';
const { tokenTableName, teamidName} = setting;
import Cookies from 'js-cookie';

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
  return Cookies.set(teamidName,teamid);
}

export function getTeamid() {
  return Cookies.get(teamidName);
}

