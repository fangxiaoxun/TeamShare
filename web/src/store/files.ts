import { defineStore } from "pinia";
import { LatestFiles, myDocFiles, getDeleteFiles, REFile } from "@/api/files/files";
import { getFolder, getFileList, addFolder, addCollectFolder, delFolder, REFolder } from '@/api/files/folder'
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

type DelData = {
    fileId?: string;
    folderId?: string;
    fileName?: string;
    folderName?: string;
    type: number;    //type 0 为文件夹，1 为文件
    lastDate: string;
    position: string;
    creator: string;
}
type DELETE = {
    folderName: string;
    list: DelData[]
}

type State = {
    latestFiles: FileData;
    myDocFiles: FileData;
    collect: FileData;
    delete: DELETE;
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
        },
        collect: {
            folderName: '收藏',
            list: []
        },
        delete: {
            folderName: '回收站',
            list: []
        }
    }),
    getters: {
        // 获取最近所有文件

        // 显示当前文件夹的所有文件
        getFiles: (state) => (id: string) => {
            return state.myDocFiles.list.filter(item => item.folderId == id).length ? state.myDocFiles.list.filter(item => item.folderId == id) : state.collect.list.filter(item => item.folderId == id)
        },
        // 获取我的文档列表
        getMydocFiles: (state): FileData => {
            return state.myDocFiles
        },
        // 获取最近文件列表
        getLatestFiles: (state): FileData => {
            return state.latestFiles
        },
        // 获取回收站文件列表
        getDeleteFiles: (state): DelData[] => {
            return state.delete.list
        },
        // 获取文件夹名称
        getFolderName: (state) => (folderId: string): any => {
            if (state.myDocFiles.list.filter(item => item.folderId == folderId).length > 0) {
                return state.myDocFiles.list.filter(item => item.folderId == folderId)[0].foldername
            }
        },
        // 获取文件夹列表
        getAllFolder: (state) => (isCollect: boolean): any => {
            if (isCollect) {
                return state.collect.list  //返回收藏的文件夹
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
        // 接口请求回收站文件
        async setDeleteFiles() {
            try {
                await getDeleteFiles()
            } catch (err) {
                console.log(err)
            }
        },
        //初始化文件数据
        async initFileData() {
            try {
                // 初始化我的文档
                const response = await getFolder();
                for (const folder of response) {
                    const folderInfo = {
                        folderId: folder.folderId,
                        foldername: folder.foldername,
                        fileList: await getFileList({ params: { folderId: folder.folderId } })
                    }
                    if (folder.collectType) {
                        this.collect.list.push(folderInfo)
                    } else {
                        this.myDocFiles.list.push(folderInfo)
                    }
                }

                // 初始化回收站
                // 接口请求回收站文件
                const delFileList = await getDeleteFiles()
                for (const file of delFileList) {
                    const fileInfo = {
                        fileId: file.folderId ? file.folderId : file.fileId,
                        fileName: file.folderName ? file.folderName : file.fileName,
                        type: file.folderId ? 0 : 1,
                        lastDate: file.lastDate,
                        creator: file.creator,
                        position: file.creator ? file.folderName : '我的云文档',
                    }
                    this.delete.list.push(fileInfo)
                }


            } catch (error) {
                console.error("Error:", error);
            }
        },
        // 删除文件夹
        async deleteFolder(folderId: any, isCollect: boolean) {
            // 需要调用删除新建文件接口，使用返回的响应信息
            await delFolder({ params: { folderId: folderId } })
            if (isCollect) {
                this.collect.list = this.collect.list.filter(item => item.folderId !== folderId)

            } else {
                this.myDocFiles.list = this.myDocFiles.list.filter(item => item.folderId !== folderId)
            }
        },

        // 添加文件夹
        async addFolder(folderName: string, isCollect: boolean) {
            const response = await addFolder({ params: { folderName: folderName } })

            if (isCollect) {
                const data = await addCollectFolder({ params: { folderId: response.folderId } })
                console.log(data)
                this.collect.list.push({ folderId: response.folderId, foldername: folderName, fileList: [] })
                console.log(this.collect.list)
            } else {
                this.myDocFiles.list.push({ folderId: response.folderId, foldername: folderName, fileList: [] })
            }
            // this.myDocFiles.list.push({folderId: response.folderId,foldername:folderName,fileList:[]})
            // 需要调用新建文件接口，使用返回的响应信息
            // this.data[0].list.push({folderName:folderName})
        },
        // 恢复文件夹
        async recover(folderId: string, type: string) {
            if (type == '0') {
                // 恢复文件夹
                await REFolder({ params: { folderId: folderId } })
                this.delete.list = this.delete.list.filter(item => item.folderId !== folderId)
                // 调用删除文件
            } else {
                // 恢复文件
                await REFile({ params: { fileId: folderId } })
                this.delete.list = this.delete.list.filter(item => item.fileId !== folderId)
            }
            // const response = await REFolder({params:{folderId:folderId}})


            // this.delete.list = this.delete.list.filter(item => item.folderId)
        },
        // 恢复文件
        async reFile(fileId: string) {
            console.log('恢复文件')
            // const response = await REFile({params:{fileId:fileId}})
        }

        // 恢复回收站
    }
})

