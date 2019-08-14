import request from '@/utils/request'

// 新增用户
export function addUser(data) {
  return request({
    url: '/user',
    method: 'post',
    data: data
  })
}

// 获取用户列表
export function getUserList(parms) {
  return request({
    url: '/sys/user/queryPage.json',
    method: 'post',
    params: parms
  })
}
// 编辑用户
export function editUser(data) {
  return request({
    url: '/user',
    method: 'put',
    data: data
  })
}
// 重置密码
export function restPass(id) {
  return request({
    url: '/user/' + id,
    method: 'put'
  })
}
// 删除用户
export function deleteUser(id) {
  return request({
    url: '/user/' + id,
    method: 'delete'
  })
}

// 获取用户个人信息
export function getUserInfo() {
  return request({
    url: '/info',
    method: 'get'
  })
}

// 修改密码
export function updatePass(parms) {
  return request({
    url: '/changepass',
    method: 'post',
    params: parms
  })
}

