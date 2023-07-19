import api from '@/utils/request'
enum API {
    BASE_URL = 'http://localhost:3000',
    FOLDER_URL = BASE_URL+'/folder/getFolder',
    FILE_URL = BASE_URL + '/file/getFile',
    ADD_URL = BASE_URL + '/folder/addFolder',
    ADDCOLLECT_URL = BASE_URL + '/folder/collectFolder',
    DEL_URL = BASE_URL + '/folder/delFolder',
    REFOLDER_URL = BASE_URL + '/folder/recoverFolder'
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

// 删除文件夹
export async function delFolder(data:any){
    const response = await api.get(API.DEL_URL, data)
    return response.data
}

// 恢复回收站文件夹
export async function REFolder(data:any){
    const response = await api.get(API.REFOLDER_URL,data)
    return response
}