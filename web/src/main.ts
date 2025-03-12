/*
 * @Author: fangxiaoxun 1272449367@qq.com
 * @Date: 2023-07-13 02:49:58
 * @LastEditors: fangxiaoxun 1272449367@qq.com
 * @LastEditTime: 2025-02-19 19:20:40
 * 
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './index.css'
// import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
import App from './App.vue'
import router from './router/index'
import './styles/commons.less'
// import './styles/element-ui-reset.less'
import { vClickOutside } from './hooks/clickOutside'

// 引入 element-plus 插件和样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import '../node_modules/element-plus/theme-chalk/index.css'
import './styles/element-ui-reset.css'
//  @ts-expect-error   注释 ts 忽略，跳过类型检测
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 引入 svg插件
import 'virtual:svg-icons-register'

import EventBus from './hooks/eventBus'

const app = createApp(App)

const $bus = new EventBus()
// 注入方
app.provide('$bus',$bus)

// 挂载
app.config.globalProperties.$bus = $bus

// 应用插件
app.use(ElementPlus, {
    locale: zhCn,
})
app.use(router)
import piniaPluginPersistedState from 'pinia-plugin-persistedstate'
const pinia = createPinia()
pinia.use(piniaPluginPersistedState)
app.use(pinia)

// 安装自定义插件
import gloablComponent from './components/SvgIcon/index'
app.use(gloablComponent)
// 全局自定义指令
app.directive('click-outside', vClickOutside)

app.mount('#app')
