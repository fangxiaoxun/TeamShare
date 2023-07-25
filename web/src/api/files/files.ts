import api from '@/utils/request'
enum API {
    BASE_URL = 'http://localhost:3000',
    LATEST_URL = BASE_URL+'/file/getLatest',
    MYDOC_URL = BASE_URL+'/file/getFile',
    FILE_URL = BASE_URL + '/file/getFileType',
    DELETE_URL = BASE_URL + '/file/getTrash',
    REFILE_URL = BASE_URL + '/file/recoverFile',
    UPLOADIMG_URL = BASE_URL + '/file/uploadImage',
    UPLOADFILE_URL = BASE_URL + '/file/uploadFile'
}
// 最近文件列表
export async function LatestFiles() {
    const response = await api.get(API.LATEST_URL)
    return response.data
}

// 我的文档
export async function myDocFiles(data:any) {
    const response = await api.get(API.MYDOC_URL,data)
    return response.data
}

export async function getFiles(data:any){
    const response = await api.get(API.BASE_URL,data)
    return response
}
// 获取回收站文件
export async function getDeleteFiles(){
    const response = await api.get(API.DELETE_URL)
    return response.data
}
// 恢复回收站文件
export async function REFile(data:any){
    const response = await api.get(API.REFILE_URL,data)
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






