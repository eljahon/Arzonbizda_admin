import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/admin/admin-login',
    method: 'post',
    data
  })
}


export function logout() {
  return request({
    url: '/vue-element-admin/user/logout',
    method: 'post'
  })
}
