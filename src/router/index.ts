import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../components/Home.vue'
import NotFound from '../views/404.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: { path: '/dashboard/main' }
  },
  {
    path: '/login',
    // route level code-splitting                     //注意 vue cli应用默认配置会为所有chunk.js设置预加载属性 对后台应用是合适的配置
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    name: 'login'
  },
  {
    path: '/dashboard',
    component: Home,
    meta:{title:'Dashboard'},
    redirect: { path: '/dashboard/main' },
    children: [    //凡是使用Home作为一级路由view的二级路由，都默认使用tab页方式打开，keepAlive显示指定为true的tab页，将会被缓存在内存中；除非关闭这个tab页触发销毁
      { path: 'main', component: () => import(/* webpackChunkName: "main" */ '../views/Main.vue'), meta:{title:'主控台',keepAlive:true} },
      { path: 'workplace', component: () => import(/* webpackChunkName: "workplace" */ '../views/WorkPlace.vue'), meta:{title:'工作台',keepAlive:true}  },
    ]
  },
  {
    path: '/users',
    component: Home,
    meta:{title:'用户管理'},
    redirect: { path: '/users/new-users' },
    children: [
      { path: 'new-users', component: () => import(/* webpackChunkName: "new-users" */ '../views/NewUsers.vue'), meta:{title:'新增用户',keepAlive:true} },
      { path: 'user-detail', component: () => import(/* webpackChunkName: "user-detail" */ '../views/UserDetail.vue'), meta:{title:'用户信息',keepAlive:true} },
      { path: 'active-users', component: () => import(/* webpackChunkName: "active-users" */ '../views/ActiveUsers.vue'),meta:{title:'活跃用户',keepAlive:false} },
    ]
  },
  {
    path: '/404',
    component: NotFound,
    name: '404'
  },
  {
    path: '*',
    redirect: { path: '/404' }
  }
]

const router = new VueRouter({
//  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
