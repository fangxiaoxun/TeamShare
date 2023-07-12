// 统一管理用户相关接口
import request from '@/utils/request'
import axios from 'axios'

enum API {
  LOGIN_URL = '',
  USERINFO_URL = '',
}

// 暴露请求函数
// 登录请求
export const reqLogin = (data: any) => request.post(API.LOGIN_URL, data)
// 用户信息请求
export const reqUserInfo = () => request.get(API.USERINFO_URL)


