import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/index.vue' // 引入首页
import Login from './views/login/index.vue' // 引入登录页
import Main from './views/home/main.vue' // 引入mian页面
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/login',
    component: Login
  }, // 设置登录页
  {
    path: '/',
    redirect: '/home'
  }, // 强制跳转到首页
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [{
      path: '', // 默认的二级路由的地址 path为空
      component: Main
    },
    {
      path: 'comment',
      component: () => import('./views/comment/index.vue')
    },
    {
      path: 'material',
      component: () => import('./views/material/index.vue')
    },
    {
      path: 'articles',
      component: () => import('./views/articles/index.vue')
    }
    ]
  }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
