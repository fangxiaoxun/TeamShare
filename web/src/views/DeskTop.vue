<!--
 * @Author: fangxiaoxun 1272449367@qq.com
 * @Date: 2023-07-13 02:49:58
 * @LastEditors: fangxiaoxun 1272449367@qq.com
 * @LastEditTime: 2025-03-11 16:04:42
 * 
-->
<script lang='ts' setup>
import Frame from '@/components/common/Frame.vue';
import FileList from '@/components/directory/FileList.vue';
import { LatestFiles } from '@/api/files/index'
import moment from 'moment'
import { useFileStore } from '@/store/files';
import { ref, provide } from 'vue';

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

const fileStore = useFileStore()
fileStore.setLateList()
const latest = ref<any[]>([]);
// fileStore.setLatesList();
latest.value = fileStore.latestList;
console.log(fileStore.latestList)
// 在这里使用获取到的最新文件列表数据


const dataList = ref([])
const getLatestList = async () => {
    try {
        const response = await LatestFiles()
        dataList.value = response.map((item: any) => ({
            ...item,
            updated_at: moment(item.updated_at).format('YYYY-MM-DD HH:mm:ss')
        }))

    } catch (err) {
        console.log(err)
    }

}

getLatestList()





</script>
<template @click="{leftMenu = false; rightMenu = false}">
    <FileList :fileList="dataList" @updateTableList="getLatestList"></FileList>
</template>
<style lang='less' scope></style>