/*
 * @Author: fangxiaoxun 1272449367@qq.com
 * @Date: 2025-02-23 15:19:40
 * @LastEditors: fangxiaoxun 1272449367@qq.com
 * @LastEditTime: 2025-03-12 14:11:42
 * 
 */

import moment from 'moment'
import api from '@/utils/request'
enum API {
    BASE_URL = 'http://localhost:3000',
    LATEST_URL = BASE_URL+'/file/getLatest',
    GETFILES = BASE_URL+'/file/getFile',
    FILE_URL = BASE_URL + '/file/getFileType',
    DELETE_URL = BASE_URL + '/file/getTrash',
    REFILE_URL = BASE_URL + '/file/recoverFile',
    UPLOADIMG_URL = BASE_URL + '/file/uploadImage',
    UPLOADFILE_URL = BASE_URL + '/file/uploadFile',
    COLLECT_URL = BASE_URL + '/file/getCollectFile',
    DEL_URL = BASE_URL + '/file/delFile',
    ADD_COLLECT_URL = BASE_URL + '/file/collectFile',
    CANCEL_COLLECT_URL = BASE_URL +'/file/cancelCollectFile',
    UPDATE_URL = BASE_URL + '/file/updateFile',
    NEWSET_URL = BASE_URL + '/file/addFile',
    FILE_BY_SPACE_ID = BASE_URL + '/file/getFileListBySpaceId',
    INVITE_URL = BASE_URL + '/file/invitation'
}
// 最近文件列表
export async function LatestFiles() {
    const response = await api.get(API.LATEST_URL)
    return response.data
}

// 我的文档
export async function myDocFiles(data:any) {
    const response = await api.get(API.GETFILES,data)
    return response.data
}

// 获取回收站文件
export async function getDeleteFiles(){
    const response = await api.get(API.DELETE_URL)
    return response.data.map((item:any) => {
        return {
            ...item,
            delete_at: item.delete_at ? moment(item.delete_at).format('YYYY-MM-DD HH:mm:ss') : item.delete_at
        }
    })
}
// 恢复回收站文件
export async function recoverFile(fileId:string){
    const response = await api.get(API.REFILE_URL, {params: {fileId}})
    return response
}

// 上传图片
export async function uploadImg(data:any) {
    const response = await api.post(API.UPLOADIMG_URL,date)
    return response
}

// 上传文件
export async function uploadFile(data:any) {
    const response = await api.post(API.UPLOADFile_URL,date)
    return response
}



// 指定文件夹获取文件
export async function getFiles(data:any){
    const response = await api.get(API.GETFILES,data)
    return response.data
}

// 获取收藏文件列表
export async function getCollectFiles() {
    const response = await api.get(API.COLLECT_URL)
    console.log(response)
    return response.data
}
// 删除文件
export async function deleteFile(fileId: string) {
    await api.get(API.DEL_URL, {params:{fileId}})
}
// 添加收藏文件
export async function collectFile(fileId:string) {
    await api.get(API.ADD_COLLECT_URL, {params:{fileId}})
}
// 取消收藏文件
export async function cancelCollectFile(fileId:string) {
    await api.get(API.CANCEL_COLLECT_URL,{params:{fileId}})
}
// 修改文件
export async function updateFile(data:any) {
    console.log(data)
   const response = await api.post(API.UPDATE_URL, data)
   console.log(response)
}
// 新建文件
export async function newsetFile(data:any) {
    const response = await api.post(API.NEWSET_URL, data)
    // console.log(response)
    return response.data

}


// 获取指定空间下的文件列表
export async function getFileListBySpaceId(spaceId: string) {
    const response = await api.get(API.FILE_BY_SPACE_ID, {params:{spaceId}})
    return response.data
}


// 邀请协作
export async function invitedCollaborator(data: any) {
    const response = await api.post(API.INVITE_URL, data)
    
}