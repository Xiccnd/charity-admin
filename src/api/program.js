import request from "@/utils/request.js";
import { link } from "@/utils/link.js";
const { baseURL} =link;
export const tableData = async (teamid) => {
  return request({
    url: "/volunteerProgramDetails/end/selectByTeamIdANDName",
    method: "post",
    data: {
      teamid: teamid
    },
    baseURL: baseURL
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
    baseURL: baseURL
  });
};
export const cencorsearch = async (teamid, pid, pname) => {
  return request({
    url: "/volunteerProgramDetails/end/selectAllJoinProjiect",
    method: "post",
    data: {
      teamid: teamid,
      pid: pid,
      pname: pname
    },
    baseURL: baseURL
});
};
export const cencortableData = async (teamid) => {
  return request({
    url: "/volunteerProgramDetails/end/selectJoinProjiect",
    method: "get",
    params: {
      teamid: teamid
    },
     baseURL: baseURL
  });
};
export const refusejoin = async (id,pid,postid) => {
  return request({
    url: "/volunteersProject/rufuseProjectNum",
    method: "post",
    data: {
      id: id,
      pid: pid,
      postid: postid
    },
    baseURL: baseURL
  });
};
export const agreejoin = async (id,pid,postid) => {
  return request({
    url: "/volunteersProject/rufuseProjectNum",
    method: "post",
    data: {
      id: id,
      pid: pid,
      postid: postid
    },
    baseURL: baseURL
  });
};