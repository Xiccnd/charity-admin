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
export const UpdateSubmit = async (teamid,contact,telephone,detailedAddress,teamProfile) => {
  return request({
    url: "/volunteerTeam/updateTeamInfomation",
    method: "get",
    params: {
      teamid: teamid,
      contact: contact,
      telephone: telephone,
      detailedAddress: detailedAddress,
      teamProfile: teamProfile,
    },
    baseURL: "http://192.168.1.142:8282"
  });
}