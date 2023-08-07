// 存储文件夹数据
import { defineStore } from "pinia";
import { getCollectFiles,getFiles,recoverFile, collectFile, cancelCollectFile } from '@/api/files/files'
import { getFolder, collectFolder, delFolder, addFolder, addCollectFolder, deleteCollectFolder, rename} from '@/api/files/folder'

interface Folder {
    folderId: string;
    folderName:string;
    collectType:number|boolean
}
interface Data {
    fileList:File[];
    folderList:Folder[]
}
interface State {
    myDoc:Data;
    collect:Data;
}

export const useFolderStore = defineStore('folder', {
    state: ():State => ({
        myDoc:{
            fileList:[],
            folderList:[]
        },
        collect:{
            fileList:[],
            folderList:[]
        }
    }),
    getters: {
        getAllFolder: (state) => {
            return state.myDoc.folderList
        },
        getCollectFolder:(state) =>{
            return state.collect.folderList
        },
        getMyDocFiles:(state) =>{
            return state.myDoc.fileList
        },
        getCollectFiles:(state) => {
            return state.collect.fileList
        }
    }, 
    actions: {
        // 展示所有文件夹
        async setAllFolder(){
            const response = await getFolder()
            this.myDoc.folderList = response
        },

        // 显示收藏文件夹
        async setCollectFolder(){
            const response = await collectFolder()
            this.collect.folderList = response
        },
        // 显示我的文档文件
        async setMyDocFiles(){
            const response = await getFiles({params:{folderId: 1}})
            this.myDoc.fileList = response
        },
        // 删除文件夹
        async deleteFolder(folderId:string){
            console.log(folderId)
            await delFolder({params:{folderId:folderId}})
        },
        // 添加文件夹
        async addFolder(folderName:string){
            await addFolder({params:{folderName:folderName}})
        },
        // 收藏文件夹
        async addCollect(folderId:string){
            await addCollectFolder({params:{folderId:folderId}})
        },
        // 取消收藏文件夹
        async deleteCollect(folderId:string){
            await deleteCollectFolder({params:{folderId:folderId}})
        },
        // 重命名文件夹
        async renameFolder(folderId:string, folderName:string){
            const response= await rename({params:{folderId:folderId,newFolderName:folderName}})
            console.log(response)
        }
    }
})

// export default useFolderStore;