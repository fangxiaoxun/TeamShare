import api from '@/utils/request'
enum API {
    BASE_URL = 'http://localhost:3000',
    LATEST_URL = BASE_URL+'/file/getLatest',
    MYDOC_URL = BASE_URL+'/file/getFile',
    FILE_URL = BASE_URL + '/file/getFileType',
    DELETE_URL = BASE_URL + '/file/getTrash',
    REFILE_URL = BASE_URL + '/file/recoverFile'
}
// 最近文件列表
export async function LatestFiles() {
    const response = await api.get(API.LATEST_URL)
    return response.data
}

// 我的文档
<<<<<<< HEAD

export async function myDocFiles() {
    const response = await axios.get(API.MYDOC_URL)
=======
export async function myDocFiles(data:any) {
    const response = await api.get(API.MYDOC_URL,data)
>>>>>>> 2cefde376ccda8c9eea3ce8e05822caf57dfb28c
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






