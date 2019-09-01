import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Component from './components' // 自定义组件
import ElementUI from 'element-ui'// 引入element-ui
import 'element-ui/lib/theme-chalk/index.css'// 引入 element-ui的样式
import './style/index.less'// 引入初始样式
import axios from 'axios' // 引入 axios
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios// axios赋值给全局属性

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Component)// 全局注册自定义组件
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
