/*
 * @Author: fangxiaoxun 1272449367@qq.com
 * @Date: 2023-07-13 02:49:58
 * @LastEditors: fangxiaoxun 1272449367@qq.com
 * @LastEditTime: 2025-02-17 17:50:46
 * 
 */
// 统一管理用户相关接口
import api from '@/utils/request'
import axios from 'axios'

enum API {
    BASE_URL = 'http://localhost:3000',
    LOGIN_URL = BASE_URL + '/user/login',
    USERINFO_URL = BASE_URL + '/user/getUser',
    REGISTER_URL = BASE_URL + '/user/register'
}

// 暴露请求函数
// 登录请求
export async function reqLogin(userData:{user_id:string, password:string}){
    const response = await axios.post(API.LOGIN_URL,userData)
    return response.data
} 
// 用户信息请求
export async function reqUserInfo(){
    const response = await api.get(API.USERINFO_URL)
    console.log(response, 'response');
    
    return response.data
}
// 用户注册请求
export const reqRegister = async (userInfo: {userName:string, password:string, email:string}) => {
    const response = await axios.post(API.REGISTER_URL, userInfo)
    return response.data
}


