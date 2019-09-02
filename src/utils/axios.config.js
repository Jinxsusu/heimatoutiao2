// 处理axios拦截器 请求拦截器 响应拦截器
import axios from 'axios'
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
}, function () { })
export default {
  install: function (Vue) {
    Vue.prototype.$axios = axios// axios赋值给全局属性
  }
}// 抛出router
