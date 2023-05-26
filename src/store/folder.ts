import { defineStore } from "pinia";

interface Folder {
    name: string;
    list: string[];
    tag: string
}
interface State {
    data: Folder[];
}

export const useFolderStore = defineStore("folders", {
    state: (): State => ({
        data: [
            {
                name: "我的云文档",
                list: [
                    '我收到的',
                    '我发出的'
                ],
                tag: "1"
            },
            {
                name: "我的收藏",
                list: [
                    "期末真题",
                    "考试大纲"
                ], 
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
        deleteFolder(index: number, folderName: string) {
            this.data[index].list = this.data[index].list.filter((item) => { item != folderName })
        },
        // 添加文件夹
        addFolder(index: number, folderName: string) {
            this.data[index].list.push(folderName)
        }
    }
})