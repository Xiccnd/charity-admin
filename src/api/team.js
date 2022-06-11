import request from '@/utils/request.js';
export const getTeamInformation = async () => {
  return request({
    url: '/volunteerTeam/selectOneByUserId?id=1',
    method: 'get',
    baseURL: 'http://192.168.1.147:8088',
  });
};
