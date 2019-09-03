// 这里放所有 自定义插件
// 首先要引入所有的自定义组件
import layoutAside from './home/layout-aside.vue'
import layoutHeader from './home/layout-header.vue'
import breadcrumb from './comment/bread-crumb.vue'
// 定义对象 =>install方法=>全局注册组件
export default {
  install: function (Vue) {
    // 全局注册组件
    Vue.component('layout-aside', layoutAside)
    Vue.component('layout-header', layoutHeader)
    Vue.component('bread-crumb', breadcrumb)
  }
}
