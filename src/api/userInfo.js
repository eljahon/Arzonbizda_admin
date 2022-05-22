import request from '@/utils/request'
export function userPersolnData() {
  return request({
    url: '/admin',
    method: 'get'
  })
}

export function getAdminAll() {
  return request({
    url: '/admin/all',
    method: 'get'
  })
}

// export function addRole(data) {
//   return request({
//     url: '/vue-element-admin/role',
//     method: 'post',
//     data
//   })
// }
//
// export function updateRole(id, data) {
//   return request({
//     url: `/vue-element-admin/role/${id}`,
//     method: 'put',
//     data
//   })
// }
//
// export function deleteRole(id) {
//   return request({
//     url: `/vue-element-admin/role/${id}`,
//     method: 'delete'
//   })
// }