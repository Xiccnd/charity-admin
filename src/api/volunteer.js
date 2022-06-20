import request from "@/utils/request.js";
import { link } from "@/utils/link.js";
const { baseURL} =link;
export const tableData = async (teamid) => {
  return request({
    url: "/personalData/end/getAllMessages",
    method: "get",
    params: {
      teamid: teamid
    },
    baseURL: baseURL
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
    baseURL: baseURL
  });
};
export const del = async (id) => {
  return request({
    url: "/personalData/end/deleteById",
    method: "post",
    data: {
      id: id
    },
    baseURL: baseURL
  });
};
export const cencortableData = async (teamid) => {
  return request({
    url: "/personalData/end/getAllJoinMessages",
    method: "get",
    params: {
      teamid: teamid
    },
    baseURL: baseURL
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
    baseURL: baseURL
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
    baseURL: baseURL
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
    baseURL: baseURL
  });
};
export const refusequit = async (id, teamid) => {
  return request({
    url: "/personalData/end/refusequit",
    method: "post",
    data: {
      id: id,
      teamid: teamid
    },
    baseURL: baseURL
  });
};
export const agreequit = async (id, teamid) => {
  return request({
    url: "/personalData/end/agreequit",
    method: "post",
    data: {
      id: id,
      teamid: teamid
    },
    baseURL: baseURL
  });
};
export const getAllUser = async (id, name) => {
  return request({
    url: "/user/usersUpData",
    method: "post",
    baseURL: baseURL,
    data: {
      id,
      name
    }
  });
};

export const getAllTeam = async (teamid, teamName) => {
  return request({
    url: "/volunteerTeam/end/queryAll",
    method: "get",
    baseURL: baseURL,
    params: {
      teamid,
      teamName
    }
  });
};

export const getAllProject = async (pid, pname) => {
  return request({
    url: "/volunteerProgramDetails/end/selectAll",
    method: "get",
    baseURL: baseURL,
    params: {
      pid,
      pname
    }
  });
};

export const getVerifyTeam = async (teamid, teamName) => {
  return request({
    url: "volunteerTeamcensor/queryAll",
    method: "get",
    baseURL: baseURL,
    params: {
      teamid,
      teamName
    }
  });
};

export const getDetail = async (id) => {
  return request({
    url: "personalData/selectOne",
    method: "get",
    baseURL: baseURL,
    params: {
      id
    }
  });
};

export const deleteUser = async (id, perName) => {
  return request({
    url: "user/deleteUser",
    method: "post",
    baseURL: baseURL,
    data: {
      id,
      perName
    }
  });
};

export const deleteTeam = async (teamid) => {
  return request({
    url: "/volunteerTeam/delateByTeamID",
    method: "get",
    baseURL: baseURL,
    params: {
      teamid,
    }
  });
};

export const deleteProject = async (pid) => {
  return request({
    url: "volunteerProgramDetails/end/DeleteProject",
    method: "get",
    baseURL: baseURL,
    params: {
      pid,
    }
  });
};

export const teamPass = async (teamid) => {
  return request({
    url: "/volunteerTeamcensor/update",
    method: "get",
    baseURL: baseURL,
    params: {
      teamid,
    }
  });
};

export const teamNotPass = async (teamid) => {
  return request({
    url: "volunteerTeamcensor/delete",
    method: "get",
    baseURL: baseURL,
    params: {
      teamid,
    }
  });
};

export const addOneUser = async (name, password, telephone, perid) => {
  return request({
    url: "user/end/addUser",
    method: "post",
    baseURL: baseURL,
    data: {
      name,
      password,
      telephone,
      perid
    }
  });

};
export const indexinfo = async (teamid) => {
  return request({
    url: "volunteerTeam/selectOne",
    method: "get",
    params: {
      id: teamid
    },
    baseURL: baseURL
  });
};
export const reviewed = async (teamid) => {
  return request({
    url: "personalData/end/getJoinIn",
    method: "get",
    params: {
      teamid: teamid
    },
    baseURL: baseURL
  });
};
export const proejectinfo = async (teamid) => {
  return request({
    url: "volunteerProgramDetailscensor/getAll",
    method: "get",
    params: {
      teamid: teamid
    },
    baseURL: baseURL
  });
};

export const updateInfo = async (uid, id, name, password, telephone, mailbox, qq, weixin, area) => {
  return request({
    url: "personalData/end/upData",
    method: "post",
    data: {
      uid,
      id,
      name,
      password,
      telephone,
      mailbox,
      qq,
      weixin,
      area
    },
    baseURL: baseURL
  });
};

export const datasubmit = async (
  teamid, pname, location, releaseDate, projectDate, recruitDate, serviceObject,
  volunteerUpport, serviceDescription, projectDetails, postDesc, postCondition, postName, targetNum, type) => {
  return request({
    url: "volunteerProgramDetailscensor/addTeamProject",
    method: "post",
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
      mark:type
    },
    baseURL: baseURL
  });
};

export const countnumber = async (pid) => {
  return request({
    url: "volunteersProject/countNunber",
    method: "get",
    params: {
     pid
    },
    baseURL: baseURL
  });
};
export const deleteprojectNum = async (pid,id) => {
  return request({
    url: "volunteersProject/deleteProjectNum",
    method: "get",
    params: {
      pid,
      id
    },
    baseURL: baseURL
  });
};
