import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
import Layout from '@/layout'
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'Панель приборов', icon: 'panel', affix: true }
      }
    ]
  },
  {
    path: '/shops',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/shops/index'),
        name: 'shops',
        meta: { title: 'Интернет-магазины', icon: 'magazin', affix: true }
      }
    ]
  },
  {
    path: '/settins',
    component: Layout,
    redirect: '/profile/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/profile/index'),
        name: 'Guide',
        meta: { title: 'Настройки', icon: 'settings', noCache: true }
      }
    ]
  },
  {
    path: '/blogs',
    component: Layout,
    redirect: '/blogs/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/blogs/index'),
        name: 'Blog',
        meta: { title: 'Блоги', icon: 'blog', noCache: true }
      }
    ]
  }
]

export const asyncRoutes = [
  {
    path: '/admins',
    component: Layout,
    name: 'Admins',
    meta: {
      icon: 'people',
      roles: ['superadmin'] // you can set roles in root nav
    },
    children: [
      {
        path: 'role',
        component: () => import('@/views/admins/role'),
        name: 'Roleadmin',
        meta: {
          title: 'Админы',
          roles: ['superadmin']
        }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
