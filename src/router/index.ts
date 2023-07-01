// 按需引入，如果全部引入的话是引入VueRouter
import { createRouter, createWebHashHistory } from 'vue-router'
// 引入路由组件
import DocIndex from '../views/DocIndex.vue'
import Draw from '../views/Draw.vue'
import Login from '../components/login/login.vue'

import Directory from '../views/Directory.vue'

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
            path:'/draw',
            name:'draw',
            component:Draw
        },
        // 功能页路由
        {
            path: '/directory',
            name: 'directory',
            component: Directory,
            redirect: '/desktop',
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
        }
    ]
})

// router.beforeEach((to, from, next) => {
//     if(getCookie('token')){
//         // 如果存在，则跳转对应路由
//         next()
//     }else{
//         // 如果未登录状态，则跳转登录页
//         next('/login')
//     }
// })
// 暴露router
export default router
