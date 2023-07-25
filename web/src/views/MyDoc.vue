<script lang='ts' setup>
import frame from '@/components/common/frame.vue';
import { useFileStore } from '@/store/files1';
import { useFolderStore } from '@/store/folder1';
import { provide } from 'vue'

const fileStore = useFileStore()
const folderStore = useFolderStore()
fileStore.setFileList('1')
// 初始化文件数据

// 接收数据
import EventBus from '@/hooks/eventBus';
import { inject, ref, reactive } from 'vue'
type File = {
    fileName: string,
    type: string,
    time: string,
    author: string
}
const $bus = inject('$bus') as EventBus;
let title = ref<string>('我的云文档')
const isCollect = ref<boolean>(true)
// //打印参数
const fileData = (...args: any) => {
    // 可实现响应式
    title.value = args[0].folderName
    isCollect.value = args[0].isCollect
    fileStore.setFileList(args[0].folderId)
}
$bus.on('fileData', fileData) //接收数据


// 分享文件
function SHARE(id: string, type: string): void {
    console.log(id)
    console.log('分享文件')
}
function DELETE(fileId: string, folderId:string): void {
    console.log(fileId)
    console.log(folderId)
    fileStore.delete(fileId)
    fileStore.setFileList(folderId)
}
// 恢复文件
provide('operate', {
    SHARE,
    DELETE
})

fileStore.$onAction(({
    name,
    after,
    store
}) => {
    after(() => {
        console.log(name)
        if (name === 'delete') {
        }
    })
})

</script>
<template>
    <!-- 传入文件显示类型 -->
    <frame :fileList="fileStore.filesList" operate="分享" :start="0"
        :isEmpty="fileStore.filesList.length === 0 ? true : false" :isCollect="isCollect">
        <template v-slot:title>{{ title }}</template>
        <template v-slot:item1>文件位置</template>
        <template v-slot:item2>创建者</template>
        <template v-slot:item3>最后修改</template>
        <template v-slot:file>
        </template>
    </frame>
</template>
<style lang='less' scope></style>