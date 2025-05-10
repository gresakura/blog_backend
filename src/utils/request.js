import axios from 'axios'
import { Message, Notification } from 'element-ui'
import store from '@/store'


// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api 的 base_url
  timeout: 5000 // 请求超时时间
})

console.log('API_BASE:', service);


// request 拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么

    // 如果有 token，可以在这里设置
    config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json'

    // 认证令牌处理
    const token = localStorage.getItem('token') || {}
    if (token) {
      config.headers.Authorization = `Bearer ${token}`

      // 添加请求时间戳（防重放）
      config.headers['X-Timestamp'] = Date.now()
    }

    // 开发环境日志
    if (process.env.NODE_ENV === 'development') {
      console.log('请求配置:', config)
    }

    return config

  },
  error => {
    // 对请求错误做些什么
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data

    // 这里可以根据自己的需求对响应数据进行处理
    if (res.code !== 200) {
      /* Message({
        message: res.message,
        type: 'success',
        duration: 5 * 1000
      }) */
      Notification.err({
        title: res.message,          // 通知标题
        message: '登入失败',    // 通知内容
        duration: 2000,        // 显示时间，单位为毫秒，默认4500
        position: 'top-right'  // 位置，可选 top-right, top-left, bottom-right, bottom-left
      });

      // 50008: 非法的 token; 50012: 其他客户端登录了; 50014: Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // 可以在这里处理登出逻辑
        // MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
        //   confirmButtonText: '重新登录',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //   store.dispatch('user/resetToken').then(() => {
        //     location.reload()
        //   })
        // })
      }
      return Promise.reject(new Error(res.message || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('errss' + error) // for debug

    if (error.response) {
      switch (error.response.status) {
        case 400:
          
          break;
        case 404:
          // 处理404错误
          break;
        default:
          // 处理其他错误
          break;
      }
    }
    return Promise.reject(error)
  }
)

export default service