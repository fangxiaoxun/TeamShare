/*
 * @Author: fangxiaoxun 1272449367@qq.com
 * @Date: 2025-03-09 11:09:42
 * @LastEditors: fangxiaoxun 1272449367@qq.com
 * @LastEditTime: 2025-03-09 11:28:03
 * 
 */
import api from '@/utils/request.ts'
enum API {
    BASE_URL = 'http://localhost:3000',
    SPACE_LIST = BASE_URL + '/space/getSpaceList',
    MEMBER_LIST = BASE_URL + '/space/getMembers',
    ADD_SPACE = BASE_URL +'/space/addSpace',
    UPDATE_SPACE = BASE_URL + '/space/updateSpace'
}

export async function getSpaceList() {
    const response = await api.get(API.SPACE_LIST)
    return response.data
}

export async function getMembers(spaceId: number) {
    const response = await api.get(API.MEMBER_LIST, {params:{spaceId}})
    return response.data
}

export async function addSpace(data: any) {
    const response = await api.post(API.ADD_SPACE, data)
    return response.data
}

export async function updateSpace(data:any) {
    const response = await api.post(API.UPDATE_SPACE, data)
    return response.data
}