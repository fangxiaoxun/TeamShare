import { defineStore } from "pinia";
import { getFolder, addFolder, delFolder,  } from "@/api/files/folder";


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
        data: [
            {
                name: "我的云文档",
                list: [],
                tag: "1"
            },
            {
                name: "我的收藏",
                list: [],
                tag: "2"
            }
        ]
    }),
    getters: {
        getAllFolder(): Folder[] {
            return this.data;
        }
    },
    actions: {
        // 删除文件夹
        async deleteFolder(index: number, folderId: any) {
            console.log(index, folderId)
            // 需要调用删除新建文件接口，使用返回的响应信息
            const response = await delFolder(folderId)
            console.log(response)
            // this.data[index].list = this.data[index].list.filter(item => item.folderId !== folderId)
            // this.data[index].list = this.data[index].list.filter(item => item != folderName)
        },
        // 添加文件夹
        async addFolder(folderName: string) {
            const response = await addFolder(folderName)
            // 需要调用新建文件接口，使用返回的响应信息
            // this.data[0].list.push({folderName:folderName})
        },

        async initMyDocData() {  //初始化文件夹数据
            try {
                const response = await getFolder();
                for (const folder of response) {
                    const folderInfo = {
                        folderName: folder.foldername,
                        folderId: folder.folderId
                    }
                    this.data[0].list.push(folderInfo)
                    
                }
            } catch (error) {
                console.error("Error:", error);
            }
        },
    },

})