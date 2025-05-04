import request from '@/utils/request'

/**
 * 获取菜单列表
 *
 * @returns 返回包含菜单列表信息的Promise对象
 */
export function getMenu(params) {
  return request({
    url: '/menuList',
    method: 'get',
    params
  })
}

/**
 * 添加菜单的数据
 *
 * @param {Object} data - 菜单数据对象
 * @returns {Promise<any>} 请求结果
 */
export function getAddMenu(data) {
  return request({
    url: '/getAddMenu',
    method: 'post',
    data
  })
}

/**
 * 将信息菜单保存到指定ID的菜单项
 *
 * @param {number} id - 菜单项的ID
 * @param {Object} data - 需要保存的信息菜单数据
 * @returns {Promise<any>} - 返回一个Promise对象，解析后包含请求的结果
 */
export function putInfoMenu(id,data) {
  return request({
    url: `/menu/${id}`,
    method: 'put',
    data
  })
}

/**
 * 删除菜单
 *
 * @param id 菜单ID
 * @param data 请求数据
 * @returns Promise 包含删除结果的 Promise 对象
 */
export function deleteMenu(id,data) {
  return request({
    url: `/menu/${id}`,
    method: 'delete',
  })
}