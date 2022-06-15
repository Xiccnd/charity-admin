import request from "@/utils/request.js";

export const tableData = async (teamid) => {
  return request({
    url: "/volunteerProgramDetails/end/selectByTeamIdANDName",
    method: "post",
    data: {
      teamid: teamid
    },
    baseURL: "http://192.168.1.147:8088"
  });
};
export const search = async (teamid, pid, pname) => {
  return request({
    url: "/volunteerProgramDetails/end/selectByTeamIdANDName",
    method: "post",
    data: {
      teamid: teamid,
      pid: pid,
      pname: pname
    },
    baseURL: "http://192.168.1.147:8088"
  });
};
