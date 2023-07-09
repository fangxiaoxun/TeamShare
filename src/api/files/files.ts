import request from '@/utils/request'
import axios from 'axios'
enum API {
    LATEST_URL = 'https://mock.apifox.cn/m1/2733445-0-default/directory/latest',
    MYDOC_URL = 'https://mock.apifox.cn/m1/2733445-0-default/directory/mydoc'
}
// 最近文件列表
export async function LatestFiles() {
    const response = await axios.get(API.LATEST_URL)
    return response.data
}
// 我的文档
export async function myDocFiles() {
    const response = await axios.get(API.MYDOC_URL)
    return response.data
}


