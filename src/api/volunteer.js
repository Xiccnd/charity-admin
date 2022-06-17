
import request from "@/utils/request.js";

export const tableData = async (teamid) => {
  return request({
    url: "/personalData/end/getAllMessages",
    method: "get",
    params: {
      teamid: teamid
    },
    baseURL: "http://192.168.1.142:8282"
  });
};
export const search = async (teamid, id, name) => {
  return request({
    url: "/personalData/end/getMyMessages",
    method: "post",
    data: {
      teamid: teamid,
      id: id,
      name: name
    },
    baseURL: "http://192.168.1.142:8282"
  });
};
export const del = async (id) => {
  return request({
    url: "/personalData/end/deleteById",
    method: "post",
    data: {
      id: id
    },
    baseURL: "http://192.168.1.142:8282"
  });
};
export const cencortableData = async (teamid) => {
  return request({
    url: "/personalData/end/getAllJoinMessages",
    method: "get",
    params: {
      teamid: teamid
    },
    baseURL: "http://192.168.1.142:8282"
  });
};
export const censorsearch = async (teamid, id, name) => {
  return request({
    url: "/personalData/end/getMyJoinMessages",
    method: "post",
    data: {
      teamid: teamid,
      id: id,
      name: name  
    },
    baseURL: "http://192.168.1.142:8282"
  });
};
export const refuse = async (id, teamid) => {
  return request({
    url: "/personalData/end/refuseById",
    method: "post",
    data: {
      id: id,
      teamid: teamid
    },
    baseURL: "http://192.168.1.142:8282"
  });
};
export const agree = async (id, teamid) => {
  return request({
    url: "/personalData/end/agreeById",
    method: "post",
    data: {
      id: id,
      teamid: teamid
    },
    baseURL: "http://192.168.1.142:8282"
  });
};
export const getAllUser = async (id, name) => {
  return request({
    url: "/user/usersUpData",
    method: "post",
    baseURL: "http://192.168.1.147:8088",
    data: {
      id,
      name,
    }
  });
};

export const getDetail = async (id) => {
  return request({
    url: "personalData/selectOne",
    method: "get",
    baseURL: "http://192.168.1.147:8088",
    params: {
      id,
    }
  });
};

export const deleteUser= async (id, perName) => {
  return request({
    url: "user/deleteUser",
    method: "post",
    baseURL: "http://192.168.1.147:8088",
    data: {
      id,
      perName,
    }
  });
};

export const addOneUser= async (name, password, telephone, perid) => {
  return request({
    url: "user/end/addUser",
    method: "post",
    baseURL: "http://192.168.1.147:8088",
    data: {
      name,
      password,
      telephone,
      perid,
    }
  });
  
};
export const indexinfo = async (teamid) => {
  return request({
    url: 'volunteerTeam/selectOne',
    method: 'get',
    params: {
      id: teamid
    },
    baseURL: 'http://192.168.1.147:8088',
  });
};
export const reviewed = async (teamid) => {
  return request({
    url: 'personalData/end/getJoinIn',
    method: 'get',
    params: {
      teamid: teamid
    },
    baseURL: 'http://192.168.1.147:8088',
  });
};
export const proejectinfo = async (teamid) => {
  return request({
    url: 'volunteerProgramDetailscensor/getAll',
    method: 'get',
    params: {
      teamid: teamid
    },
    baseURL: 'http://192.168.1.147:8088',
  });
};
export const datasubmit = async (
  teamid, pname, location, releaseDate, projectDate, recruitDate, serviceObject,
  volunteerUpport, serviceDescription, projectDetails, postDesc, postCondition, postName, targetNum, type) => {
  return request({
    url: 'volunteerProgramDetailscensor/addTeamProject',
    method: 'post',
    data: {
      teamid,
      pname,
      location,
      releaseDate,
      projectDate,
      recruitDate,
      serviceObject,
      volunteerUpport,
      serviceDescription,
      projectDetails,
      postDesc,
      postCondition,
      postName,
      targetNum,
      type
    },
    baseURL: 'http://192.168.1.147:8088',
  });
};
