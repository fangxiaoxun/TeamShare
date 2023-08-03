// 统一管理用户相关接口
import api from '@/utils/request'
import axios from 'axios'

enum API {
    BASE_URL = 'http://localhost:3000',
    LOGIN_URL = BASE_URL + '/user/login',
    USERINFO_URL = BASE_URL + '/user/getUser',
    REGISTER_URL = BASE_URL + '/user/register'
}
interface LoginResponse {
    code: number;
    data: any;
    msg: string;
}
// 暴露请求函数
// 登录请求
export async function reqLogin(data:any){
    console.log(data)
    const response = await axios.post(API.LOGIN_URL,data)
    console.log(response)
    return response.data
} 
// export const reqLogin = (data: any) => axios.post(API.LOGIN_URL, data)
// 用户信息请求
export async function reqUserInfo(){
    const response = await api.get(API.USERINFO_URL)
    return response.data
}
// 用户注册请求
export const reqRegister = (data: any) => axios.post(API.REGISTER_URL, data)


