// 处理axios拦截器 请求拦截器 响应拦截器
import axios from 'axios'
import router from '../permission'
import { Message } from 'element-ui'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 请求拦截器
axios.interceptors.request.use(function (config) {
  // config 是axios的默认请求配置和传入配置
  // return config 之前要统一注入 token
  let token = window.localStorage.getItem('user-token')
  config.headers['Authorization'] = `Bearer ${token}`
  // 接口文档中有写 请求参数保存在headers中 参数名称为Authorization
  // 请求头中携带的token，格式为"Bearer "拼接上token，注意Bearer后有一个空格
  // config 必须return
  return config
}, function () { })
// 响应拦截器
axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}
}, function (err) {
  // 获取状态码
  let status = err.response.status
  let message = ''
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      message = '用户非实名认证用户,无权限登录'
      break
    case 507:
      message = '服务器或者数据库异常'
      break
    case 404:
      message = '手机号不正确'
      break
    case 401:
      window.localStorage.clear() // 因为token有可能过期 清除垃圾token
      router.push('/login')
      break
    default:
      message = '未知错误'
      break
  }
  Message({ type: 'warning', message })
  return new Promise(function () { })
  // 直接返回一个promise 表示错误已经被处理掉 相当于强行截止错误
})
export default {
  install: function (Vue) {
    Vue.prototype.$axios = axios// axios赋值给全局属性
  }
}
