import request from "@/utils/request.js";

export const getTeamInformation = async (teamid) => {
  return request({
    url: "/volunteerTeam/selectOne",
    method: "get",
    params: {
      id: teamid
    },
    baseURL: "http://192.168.1.142:8282"
  });
};
