//axios 二次封装
import axios from 'axios'
import { ElMessage } from 'element-plus'
import { setCookie, getCookie, delCookie } from '../hooks/cookie'
const request = axios.create({
    // 基础路径
    baseURL: import.meta.env.VITE_APP_BASE_API,
    // 请求超时时间
    timeout: 5000,
})
// request 实例添加请求与响应拦截器
request.interceptors.request.use((config) => {
    console.log('config')
    if (getCookie('token')) {
        config.headers.Authorization = getCookie('token') // 发送本地token
    }
    return config
})
// 响应拦截器
request.interceptors.response.use(
    (response) => {
        return response.data
    },
    (err) => {
        // 处理 http 网络错误
        let message = ''
        // 状态码处理
        const status = err.response.status
        switch (status) {
            case 401:
                message = 'TOKEN过期'
                break
            case 403:
                message = '无权访问'
                break
            case 404:
                message = '请求地址错误'
                break
            case 500:
                message = '服务器出现问题'
                break
            default:
                message = '网络出现问题'
                break
        }
        ElMessage({
            type: 'error',
            message,
        })
        return Promise.reject(err)
    },
)

export default request
