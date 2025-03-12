/*
 * @Author: fangxiaoxun 1272449367@qq.com
 * @Date: 2023-07-24 23:17:50
 * @LastEditors: fangxiaoxun 1272449367@qq.com
 * @LastEditTime: 2025-02-22 21:54:47
 * 
 */
import { defineStore } from "pinia";
import { getFolderList, addFolder, delFolder } from "@/api/folder/index.ts";


// 定义 store 的 state 类型
interface State {
    data: Folder[];
}

// 定义文件夹类型
interface Folder {
    name: string;
    list: folder[];
    tag: string;
}
interface folder {
    folderName:string,
    folderId: string
}



export const useFolderStore = defineStore("folders", {
    state: (): State => ({
        data: []
    }),
    getters: {
        getAllFolder(): Folder[] {
            return this.data;
        }
    },
    actions: {
        // 删除文件夹
        async deleteFolder( folderId: any) {
            // 需要调用删除新建文件接口，使用返回的响应信息
            const response = await delFolder(folderId)
            
        },
        // 添加文件夹

        async getFolderInfo() {  //初始化文件夹数据
            try {
                const response = await getFolderList();
                this.data = response
            } catch (error) {
                console.error("Error:", error);
            }
        },
        
    },

})