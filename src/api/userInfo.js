import request from '@/utils/request'
export function userPersolnData() {
  return request({
    url: '/admin',
    method: 'get'
  })
}
export function userPersolnUpdate(data, id) {
  return request({
    url: '/admin/'+ id,
    method: 'put',
    data: data
  })
}


export function getAdminAll() {
  return request({
    url: '/admin/all',
    method: 'get'
  })
}

export function getAdminBlogAll(params) {
  return request({
    url: '/admin/blog/posts',
    method: 'get',
    params: {
      ...params
    }
  })
}
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
