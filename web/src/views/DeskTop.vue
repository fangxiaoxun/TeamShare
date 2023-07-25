<script lang='ts' setup>
import frame from '@/components/common/frame.vue';
import { useFileStore } from '@/store/files1';
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
fileStore.setLatesList()
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
            fileStore.setLatesList()
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

</script>
<template>
    <!-- 传入文件显示类型 -->
    <frame :fileList="fileStore.latestList" operate="分享" :fileCount="fileStore.latestList.length"
        :isEmpty="fileStore.latestList.length === 0" :isCollect="true">
        <template v-slot:title>最近</template>
        <template v-slot:item1>文件位置</template>
        <template v-slot:item2>创建者</template>
        <template v-slot:item3>最后修改</template>
        <template v-slot:file>
        </template>


    </frame>
</template>
<style lang='less' scope></style>