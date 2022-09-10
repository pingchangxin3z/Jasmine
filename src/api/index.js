import request from '@/utils/request.js';

export const reqActivateUser = (code) => request({
    url: '/wx/live',
    method: 'post',
    data: {
        code,
    }
})

export const reqGetUserInfo = () => request({
    url: '/wx/getUser',
    method: 'get',
})