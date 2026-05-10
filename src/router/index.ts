import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import Home from '@/components/Home.vue'
import NotFound from '@/views/404.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { path: '/dashboard/main' }
  },
  {
    path: '/login',
    component: () => import('@/views/Login.vue'),
    name: 'login'
  },
  {
    path: '/dashboard',
    component: Home,
    meta: { title: 'Dashboard' },
    redirect: { path: '/dashboard/main' },
    // 凡是使用 Home 作为一级路由 view 的二级路由，都默认使用 tab 页方式打开；
    // keepAlive 显示指定为 true 的 tab 页将被缓存在内存中；除非关闭这个 tab 页触发销毁
    children: [
      { path: 'main', component: () => import('@/views/Main.vue'), meta: { title: '主控台', keepAlive: true } },
      { path: 'workplace', component: () => import('@/views/WorkPlace.vue'), meta: { title: '工作台', keepAlive: true } }
    ]
  },
  {
    path: '/users',
    component: Home,
    meta: { title: '用户管理' },
    redirect: { path: '/users/new-users' },
    children: [
      { path: 'new-users', component: () => import('@/views/NewUsers.vue'), meta: { title: '新增用户', keepAlive: true } },
      { path: 'user-detail', component: () => import('@/views/UserDetail.vue'), meta: { title: '用户信息', keepAlive: true } },
      { path: 'active-users', component: () => import('@/views/ActiveUsers.vue'), meta: { title: '活跃用户', keepAlive: false } }
    ]
  },
  {
    path: '/404',
    component: NotFound,
    name: '404'
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { path: '/404' }
  }
]

const router = createRouter({
  // 使用 hash 模式以便 github pages 子目录预览正常；正式环境建议替换为 createWebHistory
  history: createWebHashHistory(),
  routes
})

export default router
