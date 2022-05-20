import request from '@/utils/request'
// import axios from 'axios'
// import { getToken } from '@/utils/auth'
export function newProductsAddRequest(url) {
  return request({
    url: url,
    method: 'post'
  })
}

// export function getInfo(token) {
//   return request({
//     url: '/vue-element-admin/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

export function shopsList() {
  return request({
    url: '/admin/shops',
    method: 'get'
  })
}
