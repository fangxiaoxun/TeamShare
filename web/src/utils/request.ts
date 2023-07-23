//axios 二次封装
import axios from 'axios'
import { AxiosRequestHeaders } from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router/index';
const api = axios.create({
    // 基础路径
    baseURL: 'http://localhost:3000',
    // 请求超时时间
    timeout: 5000,
})
// request 实例添加请求与响应拦截器
api.interceptors.request.use((config) => {
    if (localStorage.getItem('access_token')) {
        const headers = {
            ...config.headers,
            Authorization: localStorage.getItem('access_token')
        }
        config.headers = headers as AxiosRequestHeaders;

    }

    return config
})
// 响应拦截器
api.interceptors.response.use(
    (response) => {
        if (response.data.code === 401) {
            // console.log()   // token过期
            console.log(response)
            // localStorage.setItem('access_token', localStorage.getItem('refresh_token')!)
            return axios.get('http://localhost:3000/user/refreshToken', { headers: { Authorization: localStorage.getItem('refresh_token') } }).then(res => {
                console.log(res)
                if (res.data.code === 401) {
                    // message = 'TOKEN无效，请重新登录！'
                    setTimeout(() => {
                        localStorage.clear()
                        router.push('/login')
                    }, 1000)
                } else {
                    localStorage.setItem('access_token', res.data.access_token)
                    console.log('更换token')
                    const newConfig = response.config
                    newConfig.headers.Authorization = localStorage.getItem('access_token')
                    axios(newConfig)
                }


            }).then(res => {

            })
        }
        return response.data
    },
    (err) => {
        // 处理 http 网络错误
        let message = ''
        // 状态码处理
        const status = err.response.status

        switch (status) {
            case 401: {
                // 处理过期,重新登录
                message = 'TOKEN无效，请重新登录！'
                setTimeout(() => {
                    localStorage.clear()
                    router.push('/login')
                }, 1000)
            }
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
        ElMessage.error(message)
        return Promise.reject(err)
    },
)
export default api
