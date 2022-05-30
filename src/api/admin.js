import request from '@/utils/request'
const baseUrl = {
  url: '/admin/admin-create',
  admin: '/admin',
  blog: '/admin/blog/post'
}
export function getRoutes() {
  // request({
  //   url: '/vue-element-admin/routes',
  //   method: 'get'
  // })
}

export function adminCreate(data) {
  return request({
    url: baseUrl.url,
    method: 'post',
    data
  })
}
export function blogCreate(data) {
  const sendData  = new FormData();
  sendData.append('image', data.avatar)
  sendData.append('title', data.title)
  sendData.append('body', data.description)
  return request({
    url: baseUrl.blog,
    method: 'post',
    data: sendData
  })
}

export function adminDataUpadate(data, id) {
  return request({
    url: baseUrl.admin+'/'+id,
    method: 'put',
    data
  })
}
export function adminSilginBlog(id) {
  return request({
    url: baseUrl.blog+'/'+id,
    method: 'get',
  })
}
export function adminBlogDelete(id) {
  return request({
    url: baseUrl.blog+'/'+id,
    method: 'delete',
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

