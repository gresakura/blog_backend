import request from '@/utils/request'

/**
 * 用户登录函数
 *
 * @param {Object} data 登录数据对象，包含登录所需参数
 * @returns {Promise} 返回一个 Promise 对象，解析为登录结果
 */
export function login(data) {
  return request({
    url: '/login',
    method: 'post',
    data
  })
}


/**
 * 登出用户
 *
 * @returns {Promise<void>} 返回一个Promise，成功登出后返回undefined
 */
export function logout() {
  return request({
    url: '/logout',
    method: 'post'
  })
}

/**
 * 获取用户信息
 *
 * @param {Object} params 查询参数对象，包含用户ID等信息
 * @returns {Promise<Object>} 返回一个Promise，解析为用户信息对象
 */
export function getInfo(params) {
  return request({
    url: '/user-info',
    method: 'get',
    params
  })
}

export function updataUserInfo(id,data) {
  return request({
    url: `/update-user-info/${id}`,
    method: 'put',
    data
  })
}