import { defineStore } from "pinia";
// 定义数据类型
interface File {
    fileName: string;
    type: string;
    time:string;
    author:string
}

interface FileData{
    folderName:string,
    fileList:File[]
}

interface State {
    data: FileData[];
}

export const useFileStore = defineStore('files',{
    state:():State =>({
        data:[
            {
                folderName:'我收到的',
                fileList:[
                    {
                        fileName:'作业1',
                        type:'word',
                        time:'5天前',
                        author:'fxx'
                    },
                    {
                        fileName:'作业2',
                        type:'word',
                        time:'4天前',
                        author:'fxx'
                    },
                    {
                        fileName:'复习提纲1',
                        type:'doc',
                        time:'3天前',
                        author:'fxx'
                    },
                    {
                        fileName:'统计人数',
                        type:'excel',
                        time:'5天前',
                        author:'fxx'
                    },
                    
                ]
                
            },
            {
                folderName:'我发出的',
                fileList:[
                    {
                        fileName:'烦烦烦1',
                        type:'word',
                        time:'5天前',
                        author:'fxx'
                    },
                    {
                        fileName:'急急急急急急急急急急急急',
                        type:'word',
                        time:'4天前',
                        author:'fxx'
                    },
                    {
                        fileName:'哈哈哈哈哈',
                        type:'doc',
                        time:'3天前',
                        author:'fxx'
                    },
                    {
                        fileName:'wow',
                        type:'excel',
                        time:'5天前',
                        author:'fxx'
                    },
                    
                ]
                
            },
            {
                folderName:'期末真题',
                fileList:[
                    {
                        fileName:'真题1',
                        type:'word',
                        time:'5天前',
                        author:'fxx'
                    },
                    {
                        fileName:'真题2',
                        type:'word',
                        time:'4天前',
                        author:'fxx'
                    },
                    {
                        fileName:'真题3',
                        type:'doc',
                        time:'3天前',
                        author:'fxx'
                    },
                    {
                        fileName:'考试安排',
                        type:'excel',
                        time:'5天前',
                        author:'fxx'
                    },
                    
                ]
                
            },
            {
                folderName:'考试大纲',
                fileList:[
                    {
                        fileName:'数据库',
                        type:'word',
                        time:'5天前',
                        author:'fxx'
                    },
                    {
                        fileName:'金融学',
                        type:'word',
                        time:'4天前',
                        author:'fxx'
                    },
                    {
                        fileName:'javaee',
                        type:'doc',
                        time:'3天前',
                        author:'fxx'
                    },
                    {
                        fileName:'各科安排',
                        type:'excel',
                        time:'5天前',
                        author:'fxx'
                    },
                    
                ]
                
            },
        ]
    }),
    getters:{
        // 获取最近所有文件
        

    },
    actions:{

    }
})