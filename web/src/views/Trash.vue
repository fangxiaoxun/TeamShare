<!--
 * @Author: fangxiaoxun 1272449367@qq.com
 * @Date: 2023-07-13 02:49:58
 * @LastEditors: fangxiaoxun 1272449367@qq.com
 * @LastEditTime: 2025-02-21 21:28:00
 * 
-->
<script lang='ts' setup>
import frame from '@/components/common/Frame.vue';
import { useFileStore } from '@/store/files';
import { useFolderStore } from '@/store/folder';
import { ref, provide } from 'vue';
const fileStore = useFileStore();
const folderStore = useFolderStore()
fileStore.setDeleteList()
// 恢复文件夹
function RECOVER(id:string, type:string):void{
    console.log(id)
    fileStore.recoverData(id, type)
}
// 恢复文件
provide('operate',{RECOVER})

fileStore.$onAction(({
    name,
    after,
    store
}) => {
    after(() => {
        console.log(name)
        if(name === 'recoverData'){
            fileStore.setDeleteList()
        }
    })
})

</script>
<template>
    <!-- 传入文件显示类型 -->
    <!-- 传入文件显示类型 -->
    <Frame :fileList="fileStore.deleteList" operate="恢复" :start="0" :isEmpty="fileStore.deleteList.length === 0? true: false">
        <template v-slot:title>回收站</template>
        <template v-slot:item1>文件位置</template>
        <template v-slot:item2>创建者</template>
        <template v-slot:item3>删除时间</template>
        <template v-slot:file>
        </template>
    </Frame>
</template>
<style lang='less' scope></style>