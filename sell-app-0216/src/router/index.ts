import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

//静态加载
import Home from '@/views/home/index.vue'

//配置路由地址和页面级别组件的一一对应关系
const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: '/home',
  },
  /* 首页 */
  {
    path: '/home',
    component: Home,
    redirect: '/home/goods',
    children: [
      {
        path: '/home/goods',
        component: () => import('@/views/goods/index.vue'),
      },
      {
        path: '/home/comment',
        component: () => import('@/views/comment/index.vue'),
      },
      {
        path: '/home/shop',
        component: () => import('@/views/shop/index.vue'),
      },
    ],
  },
  /* 详情 */
  {
    path: '/detail',
    component: () => import('@/views/detail/index.vue'),
  },
  /* 404 */
  {
    path: '*',
    redirect: '/error404',
  },
  {
    path: '/error404',
    component: () => import('@/views/error-404/index.vue'),
  },
]

const router = new VueRouter({
  routes,
})

export default router
