import request from '@/utils/request'
import axios from 'axios'
import Cookies from "js-cookie";
const token = Cookies.get('token');
console.log('token---', token)
// export function login(data) {
//   return request({
//     url: '/vue-admin-template/user/login',
//     method: 'post',
//     data
//   })
// }

//登录
export function login(data) {
  const result = axios({
    method: 'post',
    url: 'http://192.168.2.139:9528/api/index/login',
    data
  }).catch(e => {
    console.log('error', e)
  })
  return result
}
//根据手机号或者用户id查询用户信息
export function getInfo(data) {
  const result = axios({
    method: 'post',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    url: 'http://192.168.2.139:9528/api/users/user-info',
    data
  }).catch(e => {
    console.log('error', e)
  })
  return result
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
