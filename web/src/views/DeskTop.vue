<script lang='ts' setup>
import frame from '@/components/common/frame.vue';
import { useFileStore } from '@/store/files';
import { ref } from 'vue';

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
const latest = ref<any[]>([]);

fileStore.setLatestFiles();
latest.value = fileStore.getLatestFiles.list;

// 在这里使用获取到的最新文件列表数据

</script>
<template>
    <!-- 传入文件显示类型 -->
    <frame :fileList="fileStore.getLatestFiles.list" operate="分享" :fileCount="fileStore.getLatestFiles.list.length"
        :isEmpty="fileStore.getLatestFiles.list.length === 0" >
        <template v-slot:title>最近</template>
        <template v-slot:item1>文件位置</template>
        <template v-slot:item2>创建者</template>
        <template v-slot:item3>最后修改</template>
        <template v-slot:file>
        </template>


    </frame>
</template>
<style lang='less' scope></style>