import request from '@/utils/request'
const baseUrl = {
  url: '/admin/admin-create',
  admin: '/admin'
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
}export function blogCreate(data) {
  const sendData  = new FormData();
  data.forEach(el => {
    sendData.append(el)
    }
  )

  return request({
    url: baseUrl.url,
    method: 'post',
    sendData
  })
}

export function adminDataUpadate(data, id) {
  return request({
    url: baseUrl.admin+'/'+id,
    method: 'put',
    data
  })
}export function adminPasswordUpadate(data, id) {
  return request({
    url: baseUrl.admin+'/'+id,
    method: 'put',
    data
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

