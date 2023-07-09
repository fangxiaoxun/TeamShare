import { defineStore } from "pinia";
import { LatestFiles, myDocFiles } from "@/api/files/files";
// 定义数据类型
interface File {
    fileName: string;
    type: string;
    time: string;
    author: string;
    location: string
}
type FileData = {
    folderName: string,
    list: File[]
}

type State = {
    latestFiles: FileData;
    myDocFiles: FileData;
}

export const useFileStore = defineStore('files', {
    state: (): State => ({
        latestFiles: {
            folderName: '最近',
            list: [
                {
                    "time": "2023-06-04 00:00:00",
                    "author": "贺桂英",
                    "location": "我的云文档",
                    "type": 'doc',
                    "fileName": "求米史运干"
                },
                {
                    "time": "2023-06-04 00:00:00",
                    "author": "乔芳",
                    "type": "doc",
                    "location": "我的云文档",
                    "fileName": "并据民得最代流"
                }
            ]
        },
        myDocFiles: {
            folderName: '我的云文档',
            list: [{
                fileName: '作业1',
                type: 'word',
                time: '5天前',
                author: 'fxx',
                location: '我的云文档'
            },
            {
                fileName: '作业2',
                type: 'word',
                time: '4天前',
                author: 'fxx',
                location: '我收到的'
            },
            {
                fileName: '作业2',
                type: 'word',
                time: '4天前',
                author: 'fxx',
                location: '我收到的'
            },
            {
                fileName: '作业2',
                type: 'word',
                time: '4天前',
                author: 'fxx',
                location: '我收到的'
            },
            {
                fileName: '作业2',
                type: 'word',
                time: '4天前',
                author: 'fxx',
                location: '我收到的'
            },
            {
                fileName: '作业2',
                type: 'word',
                time: '4天前',
                author: 'fxx',
                location: '我收到的'
            },
            {
                fileName: '作业2',
                type: 'word',
                time: '4天前',
                author: 'fxx',
                location: '我收到的'
            },
            {
                fileName: '作业2',
                type: 'word',
                time: '4天前',
                author: 'fxx',
                location: '我收到的'
            },
            {
                fileName: '作业2',
                type: 'word',
                time: '4天前',
                author: 'fxx',
                location: '我收到的'
            },
            {
                fileName: '作业2',
                type: 'word',
                time: '4天前',
                author: 'fxx',
                location: '我收到的'
            },
            {
                fileName: '复习提纲1',
                type: 'doc',
                time: '3天前',
                author: 'fxx',
                location: '我发出的'
            },
            {
                fileName: '统计人数',
                type: 'excel',
                time: '5天前',
                author: 'fxx',
                location: '期末真题'
            },
            {
                fileName: '统计人数',
                type: 'excel',
                time: '5天前',
                author: 'fxx',
                location: '期末真题'
            },
            {
                fileName: '统计人数',
                type: 'excel',
                time: '5天前',
                author: 'fxx',
                location: '期末真题'
            },
            {
                fileName: '统计人数',
                type: 'excel',
                time: '5天前',
                author: 'fxx',
                location: '期末真题'
            },
            {
                fileName: '统计人数',
                type: 'excel',
                time: '5天前',
                author: 'fxx',
                location: '考试大纲'
            },
        {
                fileName: '统计人数',
                type: 'excel',
                time: '5天前',
                author: 'fxx',
                location: '考试大纲'
            }]
        }
    }),
    getters: {
        // 获取最近所有文件

        // 显示当前文件夹的所有文件
        getFiles: (state) => (id: number) => {
            // return state.data[id]
        },
        getMydocFiles: (state): FileData => {
            return state.myDocFiles
        },
        getLatestFiles: (state): FileData => {
            return state.latestFiles
        }

    },
    actions: {
        // 接口请求最近文件
        async setLatestFiles() {
            try {
                const response = await LatestFiles()
                this.latestFiles = response.data
            } catch (err) {
                console.log(err)
            }
        },
        // 接口请求我的云文档
        async setMyDocFiles() {
            try {
                console.log("test")
                const response = await myDocFiles()
                this.myDocFiles = response.data
            } catch (err) {
                console.log(err)
            }
        }
        // 获取某种类型文件
    }
})