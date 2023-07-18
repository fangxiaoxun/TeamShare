import { defineStore } from "pinia";
import { LatestFiles, myDocFiles } from "@/api/files/files";
import { getFolder, getFileList, addFolder } from '@/api/files/folder'
// import {}
// 定义数据类型
interface docContent {
    [key: string]: any;
}
interface File {
    collectDate: string | null;
    collectType: number;
    content: docContent[];
    createDate: string;
    creator: string;
    deleteType: number;
    fileId: number;
    fileName: string;
    fileType: string;
    folderDelete: string;
    folderId: string;
    lastDate: string;
}

interface Folder {
    folderId: string;
    foldername: string;
    fileList?: File[]
}


type FileData = {
    folderName: string,
    list: Folder[]
}

type State = {
    latestFiles: FileData;
    myDocFiles: FileData;
}

export const useFileStore = defineStore('files', {
    state: (): State => ({
        latestFiles: {
            folderName: '最近',
            list: []
        },
        myDocFiles: {
            folderName: '我的云文档',
            list: []
        }
    }),
    getters: {
        // 获取最近所有文件

        // 显示当前文件夹的所有文件
        getFiles: (state) => (id: string) => {
            return state.myDocFiles.list.filter(item => item.folderId == id)
        },
        // 获取我的文档列表
        getMydocFiles: (state): FileData => {
            return state.myDocFiles
        },
        // 获取最近文件列表
        getLatestFiles: (state): FileData => {
            return state.latestFiles
        },
        // 获取文件夹名称
        getFolderName: (state) => (folderId: string): any => {
            if (state.myDocFiles.list.filter(item => item.folderId == folderId).length > 0) {
                return state.myDocFiles.list.filter(item => item.folderId == folderId)[0].foldername
            }
        },
        // 获取文件夹列表
        getAllFolder: (state) => (isCollect: boolean): any => {
            // return state.myDocFiles.list
            if (isCollect) {
                return //返回收藏的文件夹
            }
            return state.myDocFiles.list.filter(item => item.foldername !== undefined)
        }

    },
    actions: {
        // 接口请求最近文件
        async setLatestFiles() {
            try {
                const response = await LatestFiles()
                this.latestFiles.list = response
            } catch (err) {
                console.log(err)
            }
        },
        // 接口请求我的云文档
        async setMyDocFiles() {
            try {
                const response = await myDocFiles({ params: { folderId: 1 } })
                this.myDocFiles.list = response
            } catch (err) {
                console.log(err)
            }
        },
        // 获取某种类型文件
        async initFileData() {  //初始化文件数据
            try {
                // 初始化我的文档
                const response = await getFolder();
                for (const folder of response) {
                    const folderInfo = {
                        folderId: folder.folderId,
                        foldername: folder.foldername,
                        fileList: await getFileList({ params: { folderId: folder.folderId } })
                    }
                    this.myDocFiles.list.push(folderInfo)
                }
            } catch (error) {
                console.error("Error:", error);
            }
        },
        // 删除文件夹

        // 添加文件夹
        async addFolder(folderName: string, isCollect:boolean) {
            console.log(folderName)
            const response = await addFolder({ params: { folderName: folderName } })
            console.log(response)
            // 需要调用新建文件接口，使用返回的响应信息
            // this.data[0].list.push({folderName:folderName})
        },
    }
})

