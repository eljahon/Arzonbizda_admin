import request from '@/utils/request'
const baseUrl = {
  url: '/admin/admin-create',
  admin: '/admin',
  blog: '/admin/blog/post',
  pass: '/admin/admin-pass/'
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
export function blogUpdate(data, id) {
  const sendData  = new FormData();
  sendData.append('image', data.avatar)
  sendData.append('title', data.title)
  sendData.append('body', data.description)
  return request({
    url: baseUrl.blog+'/'+id,
    method: 'put',
    data: sendData
  })
}

export function adminDataUpadate(data, id) {
  console.log(data)
  const sendData  = new FormData();
  sendData.append('image', data.avatar)
  sendData.append('title', data.title)
  sendData.append('body', data.description)
  return request({
    url: baseUrl.blog+'/'+id,
    method: 'put',
    data: sendData
  })
}
// export function adminDataUpadate(data, id) {
//   const sendData  = new FormData();
//   sendData.append('image', data.avatar)
//   sendData.append('title', data.title)
//   sendData.append('body', data.description)
//   return request({
//     url: baseUrl.blog+'/'+id,
//     method: 'put',
//     data: sendData
//   })
// }
export function avatarUpload(data) {
  const sendData  = new FormData();
  sendData.append('avatar',data)
  return request({
    url: '/admin/admin-avatar',
    method: 'patch',
    data: sendData
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
export function adminPasswordUpadate(data, id) {
  return request({
    url: `${baseUrl.pass}${id}`,
    method: 'put',
    data
  })
}

export function adminSingil(id) {
  return request({
    url: `${baseUrl.admin}/${id}`,
    method: 'get'
  })
}

