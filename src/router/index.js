import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login.vue'
import store from '@/store';

import { fetchMenu } from '@/store/modules/menu'

import Home from '../views/home.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登录'
    }
  },
  {
    path: '/',
    name: 'Layout',
    component: Home,
    redirect: '/welcome',
    meta: {
      title: '首页',
      requiresAuth: true
    },
    children: []
  }
]






const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: routes
  
})



// 全局前置守卫
router.beforeEach(async  (to, from, next) => {
  // 设置页面标题
  if (to.meta.title) {
    document.title = to.meta.title
  }

  // 检查是否需要认证
  if (to.matched.some(record => record.meta.requiresAuth)) {
    const isAuthenticated = store.state.user.token
    if (!isAuthenticated) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {

    next()
  }
})

export default router