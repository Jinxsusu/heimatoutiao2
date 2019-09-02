// 这里引入所有的路由 进入主页的时候都要经过这个页面
// 判断是否存在token值 不然就将强制跳转到登录页面进行登录
import router from './router'// 引入所有的路由
// 给router 路由实例注册事件 如果地址是以 /home开始的
// 就说明需要判断当前缓存中是否存在token
router.beforeEach(function (to, from, next) {
  if (to.path.startsWith('/home')) {
    // 获取缓存中的token
    let token = window.localStorage.getItem('user-token')
    if (token) {
      // 放行
      next()
    } else {
      next('/login')
    }
  } else {
    // 如果地址不是以 /home开始的也认为安全放行
    next()
  }
})
export default router// 抛出router
