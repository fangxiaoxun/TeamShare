<script lang='ts' setup>
import frame from '@/components/common/frame.vue';
import { useFileStore } from '@/store/files';
import { ref, provide } from 'vue';
const fileStore = useFileStore()
// 恢复文件夹
const RECOVER = (folderId:string, type:string):void=>{
    fileStore.recover(folderId, type)
}
// 恢复文件
const refile=(fileId:string):void =>{
    fileStore.reFile(fileId)
}

// 恢复文件
provide('recover',{RECOVER})

type ATTR = {
    fileCount: number,
    position: string,
    author: string,
    time: string,
    operate: string
}
const attribute: ATTR = {
    fileCount: 100,
    position: '我的文档',
    author: '',
    time: '1天前',
    operate: '还原'
}

</script>
<template>
    <!-- 传入文件显示类型 -->
    <!-- 传入文件显示类型 -->
    <frame :fileList="fileStore.getDeleteFiles" operate="恢复" :start="0" :isEmpty="fileStore.getDeleteFiles.length === 0? true: false">
        <template v-slot:title>回收站</template>
        <template v-slot:item1>文件位置</template>
        <template v-slot:item2>创建者</template>
        <template v-slot:item3>删除时间</template>
        <template v-slot:file>
        </template>
    </frame>
</template>
<style lang='less' scope></style>