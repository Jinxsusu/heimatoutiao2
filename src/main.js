import Vue from 'vue'
import App from './App.vue'
import router from './permission'// 引入导航卫士
import Component from './components' // 自定义组件
import ElementUI from 'element-ui'// 引入element-ui
import 'element-ui/lib/theme-chalk/index.css'// 引入 element-ui的样式
import './style/index.less'// 引入初始样式
import axios from './utils/axios.config'// 引入 统一处理后的axios

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Component)// 全局注册自定义组件
Vue.use(axios)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
