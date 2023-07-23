import api from '@/utils/request'
enum API {
    BASE_URL = 'http://localhost:3000',
    LATEST_URL = BASE_URL+'/file/getLatest',
    GETFILES = BASE_URL+'/file/getFile',
    FILE_URL = BASE_URL + '/file/getFileType',
    DELETE_URL = BASE_URL + '/file/getTrash',
    REFILE_URL = BASE_URL + '/file/recoverFile',
    COLLECT_URL = BASE_URL + '/file/getCollectFile',
    DEL_URL = BASE_URL + '/file/delFile',
    ADDCOLLECT_URL = BASE_URL + '/file/collectFile',
    CANCELCOLLECT_URL = BASE_URL +'/file/cancelCollectFile'
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
    return response.data
}
// 恢复回收站文件
export async function recoverFile(data:any){
    const response = await api.get(API.REFILE_URL,data)
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
export async function deleteFile(data:any) {
    await api.get(API.DEL_URL, data)
}
// 添加收藏文件
export async function collectFile(data:any) {
    console.log(api)
    await api.get(API.ADDCOLLECT_URL, data)
}
// 取消收藏文件
export async function cancelCollectFile(data:any) {
    console.log(api)
    await api.get(API.CANCELCOLLECT_URL,data)
}



