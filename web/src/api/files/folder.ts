import api from '@/utils/request'
enum API {
    BASE_URL = 'http://localhost:3000',
    FOLDER_URL = BASE_URL+'/folder/getFolder',
    FILE_URL = BASE_URL + '/file/getFile',
    ADD_URL = BASE_URL + '/folder/addFolder',
    ADDCOLLECT_URL = BASE_URL + '/folder/collectFolder',
    DELETECOLLECT_URL = BASE_URL + '/folder/cancelCollectFolder',
    DEL_URL = BASE_URL + '/folder/delFolder',
    REFOLDER_URL = BASE_URL + '/folder/recoverFolder',
    COLLECT_URL = BASE_URL + '/folder/getCollectFolder',
    RENAME_URL = BASE_URL + '/folder/updateFolderName'
    
}

export async function getFolder() {
    const response = await api.get(API.FOLDER_URL)
    return response.data
}

// 获取指定文件夹的文件
export async function getFileList(data:any) {
    const response = await api.get(API.FILE_URL,data)
    return response.data
}

// 添加文件夹
export async function addFolder(data:any){
    const response = await api.get(API.ADD_URL,data)
    return response.data
}

// 添加收藏文件夹
export async function addCollectFolder(data:any){
    const response = await api.get(API.ADDCOLLECT_URL,data)
    return response.data
}

// 取消收藏文件夹
export async function deleteCollectFolder(data:any) {
    const response = await api.get(API.DELETECOLLECT_URL,data)
    console.log(response)
}

// 删除文件夹
export async function delFolder(data:any){
    const response = await api.get(API.DEL_URL,data)
    return response.data
}

// 恢复回收站文件夹
export async function recoverFolder(data:any){
    const response = await api.get(API.REFOLDER_URL,data)
    return response
}

// 获取收藏文件夹
export async function collectFolder() {
    const response = await api.get(API.COLLECT_URL)
    return response.data
}

// 重命名文件夹
export async function rename(data:any) {
    const response =  await api.get(API.RENAME_URL, data)
    console.log(response)

}