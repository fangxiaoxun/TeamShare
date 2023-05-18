// 按需引入，如果全部引入的话是引入VueRouter
import { createRouter, createWebHashHistory } from 'vue-router'
// 引入路由组件
import Directory from '../components/Directory.vue'
import DeskTop from '../views/DeskTop.vue'
import Mydoc from '../views/MyDoc.vue'
import Trash from '../views/Trash.vue'
import App from '../App.vue'
import path from 'path'
// 创建router实例对象，去管理路由规则
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
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
  ],
})
// 暴露router
export default router
