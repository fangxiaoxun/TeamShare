// 存储文件信息
import { defineStore } from "pinia";
import { LatestFiles, getFiles, getDeleteFiles, recoverFile, deleteFile, getCollectFiles, collectFile, cancelCollectFile } from "@/api/files/index.ts";
import { recoverFolder } from '@/api/folder/index.ts'
import moment from 'moment'


interface File {
    fileId: string;
    fileName: string;
    fileType: string;
    createDate: string;
    lastDate: string;
    folderId: string;
    creator: string;
    content: string | null;
    deleteType: string;
    collectType: string;
}
interface deleteData {
    fileId?: string;
    fileName?: string;
    fileType?: string;
    creator?: string;
    lastDate: string;
    content?: string | null;
    deleteType: string;
    collectType: string;
    userId?: string;
    createDate?: string;
    collectDate: string;
    folderDelete?: string;

}
interface State {
    latestList: File[],
    filesList: File[],
    deleteList: deleteData[],
    currFile: {
        folderId:string;
        fileId: string;
        fileName: string
    },
    keyword: string
}

export const useFileStore = defineStore('files', {
    state: (): State => ({
        // 最近文件列表
        latestList: [],
        // 文件列表, todo 改为文件夹列表
        filesList: [],
        // 回收站文件列表
        deleteList: [],
        currFile: {
            folderId:'',
            fileId: '',
            fileName: ''
        },
        keyword: ''
    }),
    getters: {
        getLastList: (state) => {
            return state.latestList
        },
        getFileList: (state) => {
            return state.filesList
        },
        getDeleteList: (state) => {
            return state.deleteList
        },
        getCurrFile: (state) => {
            return state.currFile
        }
    },
    actions: {
        // 获取最近文件列表
        async setLateList() {
            try {
                const response = await LatestFiles()
                const res = response.map((item:any) => ({
                    ...item,
                    updated_at: moment(item.updated_at).format('YYYY-MM-DD HH:mm:ss')
                }))
                this.latestList = res

            } catch (err) {
                console.log(err)
            }
        },
        // 获取指定文件列表
        async setFileList(folderId: string) {
            try {
                const response = await getFiles({ params: { folderId: folderId } })
                this.filesList = response
            } catch (err) {
                console.log(err)
            }
        },
        // 回收站文件
        async setDeleteList() {
            const response = await getDeleteFiles()
            console.log(response)
            this.deleteList = response
        },
        // 回收站恢复
        async recoverData(id: string, type: string) {
            if (type === 'file') {
                console.log('恢复文件')
                await recoverFile({ params: { fileId: id } })
            }
            if (type === 'folder') {
                console.log("恢复文件夹")
                await recoverFolder({ params: { folderId: id } })
            }
        },
        async delete(fileId: string) {
            await deleteFile({ params: { fileId: fileId } })
        },
        // 显示收藏文件
        async setCollect() {
            // this.filesList = await getCollectFiles
            const response = await getCollectFiles();
            this.filesList = response
        },
        // 收藏文件
        async addCollect(fileId: string) {
            await collectFile({ params: { fileId: fileId } })
        },
        // 取消收藏文件
        async deleteCollect(fileId: string) {
            await cancelCollectFile({ params: { fileId: fileId } })
        },
        // 显示当前文件信息
        setFileInfo(folderId:string,fileId: string, fileName: string) {
            this.currFile.folderId = folderId
            this.currFile.fileId = fileId
            this.currFile.fileName = fileName
        },
        getFileContent(fileId: string) {
            return this.latestList.filter(item => item.fileId == fileId).length ? this.latestList.filter(item => item.fileId == fileId)[0].content : this.filesList.filter(item => item.fileId == fileId)[0].content
        },
    }
})

// export default useFileStore;