// 统一管理用户相关接口
import request from '@/utils/request'
import axios from 'axios'

enum API {
    BASE_URL = 'http://localhost:3000',
    LOGIN_URL = BASE_URL + '/user/login',
    USERINFO_URL = BASE_URL + '',
    REGISTER_URL = BASE_URL + '/user/register'
}
interface LoginResponse {
    code: number;
    data: any;
    msg: string;
}
// 暴露请求函数
// 登录请求
export const reqLogin = (data: any) => request.post(API.LOGIN_URL, data)
// 用户信息请求
export const reqUserInfo = () => request.get(API.USERINFO_URL)
// 用户注册请求
export const reqRegister = (data: any) => request.post(API.REGISTER_URL, data)


