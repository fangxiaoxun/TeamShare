<!--
 * @Author: fangxiaoxun 1272449367@qq.com
 * @Date: 2023-07-13 02:49:58
 * @LastEditors: fangxiaoxun 1272449367@qq.com
 * @LastEditTime: 2025-02-24 17:22:44
 * 
-->
<script lang='ts' setup>
import Frame from '@/components/common/Frame.vue';
import FileList from '@/components/directory/FileList.vue';

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
// 在这里使用获取到的最新文件列表数据

fileStore.$onAction(({
    name,
    after,
    store
}) => {
    after(() => {
        console.log(name)
        if (name === 'delete') {
            // fileStore.setLatesList()
        }
    })
})

// 分享文件
function SHARE(id: string, type: string): void {
    console.log(id)
    console.log('分享文件')
}
function DELETE(fileId: string): void {
    fileStore.delete(fileId)
}
// 恢复文件
provide('operate', {
    SHARE,
    DELETE
})

// const config = [
//     {
//         title: '最近',
//         item1: '文件位置',
//         item2: '创建者',
//         item3: '最后修改',
//     }
// ]

const config = {
    tableItem: [
        '文件位置',
        '创建者',
        '最后修改',
    ],
    isShowShare: true,
    isShowDelete: true,
    isShowRecycle: false,
}


</script>
<template  @click="{leftMenu = false; rightMenu = false}">
    <!-- <Frame :file-list="fileStore.latestList" :config="config"></Frame> -->
    <FileList :fileList="fileStore.latestList" :config="config"></FileList>

    <!-- 传入文件显示类型 -->
    <!-- <Frame :fileList="fileStore.latestList" :config="config">
    </Frame> -->
</template>
<style lang='less' scope></style>