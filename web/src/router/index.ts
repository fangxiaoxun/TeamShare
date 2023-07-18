// 按需引入，如果全部引入的话是引入VueRouter
import { createRouter, createWebHashHistory, RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
// 引入路由组件
import DocIndex from '../views/DocIndex.vue'
import Draw from '../views/Draw.vue'
import Login from '../views/login.vue'

import Directory from '../views/Directory.vue'
import DocView from '../views/DocView.vue'

import DeskTop from '../views/DeskTop.vue'
import Mydoc from '../views/MyDoc.vue'
import Trash from '../views/Trash.vue'
import App from '../App.vue'
import path from 'path'

import { setCookie, getCookie, delCookie } from '../hooks/cookie'




// 创建router实例对象，去管理路由规则
const router = createRouter({
    history: createWebHashHistory(),
    routes: [ // 首页路由
        {
            path: '/',
            name: 'index',
            component: DocIndex
        },
        // 登录页路由
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        // 画板路由
        {
            path: '/draw',
            name: 'draw',
            component: Draw
        },
        // 功能页路由
        {
            path: '/directory',
            name: 'directory',
            component: Directory,
            redirect: '/desktop',
            meta: { requiresAuth: true }, // 添加 meta 字段表示需要验证登录
            children: [
                {
                    path: '/desktop',
                    name: 'desktop',
                    component: DeskTop,
                },
                {
                    path: '/mydoc',
                    name: 'mydoc',
                    component: Mydoc,
                },
                {
                    path: '/trash',
                    name: 'trash',
                    component: Trash,
                },

            ]
        },
        // 编辑器页面路由
        {
            path: '/docView',
            name: 'docView',
            component: DocView,
        }
    ]
})

// 不需要鉴权的白名单
const whiteList: string[] = ['/', '/login']
// 路由鉴权
router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => { 
    if (whiteList.indexOf(to.path) !== -1 || localStorage.getItem('token')) {
        // 如果存在，则跳转对应路由
        next()
    } else {
        // 如果未登录状态，则跳转登录页
        next('/login')
    }
})
// 暴露router
export default router
