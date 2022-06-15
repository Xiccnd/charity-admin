import request from '@/utils/request.js';
export const tableData = async(teamid) => {
    return request({
      url: '/personalData/end/getAllMessages',
      method: 'get',
      params:{
        teamid:teamid
      },
      baseURL: 'http://192.168.1.142:8282',
    });
  };
export const search = async(teamid,id,name) => {
    return request({
      url: '/personalData/end/getMyMessages',
      method: 'post',
      data:{
        teamid:teamid,
        id:id,
        name:name
      },
      baseURL: 'http://192.168.1.147:8088',
    });
  };
export const del = async(id) => {
    return request({
      url: '/personalData/end/deleteById',
      method: 'post',
      data:{
        id:id
      },
      baseURL: 'http://192.168.1.147:8088',
    });
  };
  export const cencortableData = async(teamid) => {
    return request({
      url: '/personalData/end/getAllJoinMessages',
      method: 'get',
      params:{
        teamid:teamid
      },
      baseURL: 'http://192.168.1.147:8088',
    });
  };
export const censorsearch = async(teamid,id,name) => {
    return request({
      url: '/personalData/end/getMyJoinMessages',
      method: 'post',
      data:{
        teamid:teamid,
        id:id,
        name:name
      },
      baseURL: 'http://192.168.1.147:8088',
    });
  };
  export const refuse = async(id,teamid) => {
    return request({
      url: '/personalData/end/refuseById',
      method: 'post',
      data:{
        id:id,
        teamid:teamid
      },
      baseURL: 'http://192.168.1.147:8088',
    });
  };
  export const agree = async(id,teamid) => {
    return request({
      url: '/personalData/end/agreeById',
      method: 'post',
      data:{
        id:id,
        teamid:teamid
      },
      baseURL: 'http://192.168.1.147:8088',
    });
  };