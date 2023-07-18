//axios 二次封装
import axios from 'axios'
import { AxiosRequestHeaders } from 'axios'
import { ElMessage } from 'element-plus'
const api = axios.create({
    // 基础路径
    // baseURL: import.meta.env.VITE_APP_BASE_API,
    baseURL: 'http://localhost:3000',
    // 请求超时时间
    timeout: 5000,
})
// request 实例添加请求与响应拦截器
api.interceptors.request.use((config) => {
    // console.log(config)
    if (localStorage.getItem('token')) {
        const headers = {
            ...config.headers,
            Authorization: localStorage.getItem('token')
        }
        config.headers = headers as AxiosRequestHeaders;
    
    }

    return config
})
// 响应拦截器
api.interceptors.response.use(
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
export default api
