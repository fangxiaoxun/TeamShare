import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index'
import './styles/commons.less'
import './styles/element-ui-reset.less'
import { vClickOutside } from './hooks/clickOutside'

// 引入 element-plus 插件和样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
//  @ts-expect-error   注释 ts 忽略，跳过类型检测
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
// 引入 svg插件
import 'virtual:svg-icons-register'

import EventBus from './hooks/eventBus'

// 接口测试
import axios from 'axios'
axios({
    url: 'https://mock.apifox.cn/m1/2733445-0-default/user/info',
    method: 'post',
    data: {
        userId: '111111',
    },
})

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
app.use(createPinia())

// 安装自定义插件
import gloablComponent from './components/SvgIcon/index'
app.use(gloablComponent)
// 全局自定义指令
app.directive('click-outside', vClickOutside)

app.mount('#app')
