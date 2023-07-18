<script lang='ts' setup>
import frame from '@/components/common/frame.vue';
import { useFileStore } from '@/store/files';
import { useFolderStore } from '@/store/folder';

const fileStore = useFileStore()
// 初始化文件数据
// fileStore.initFileData()
// fileStore.setMyDocFiles()
const isEmpty = ref<boolean>(true)
// 接收数据
import EventBus from '@/hooks/eventBus';
import { inject, ref, reactive } from 'vue'
type File = {
    fileName: string,
    type: string,
    time: string,
    author: string
}
// 初始化 需要更改
let list: File[] = [];
// 空数组
let fileList = reactive({ list })
const $bus = inject('$bus') as EventBus;
let title = ref<string>('我的云文档')

// //打印参数
const fileData = (...args: any[]) => {
    // 可实现响应式
    title.value = args[0].title
    if (args[0].list.length) {
        isEmpty.value = false
        fileList.list = args[0].list
    }else{
        isEmpty.value = true
    }
}

$bus.on('fileData', fileData) //接收数据
</script>
<template>
    <!-- 传入文件显示类型 -->
    <frame :foderName="title" :fileList="fileList.list" operate="分享" :start="0" :isEmpty="isEmpty">
        <template v-slot:title>{{ title }}</template>
        <template v-slot:item1>文件位置</template>
        <template v-slot:item2>创建者</template>
        <template v-slot:item3>最后修改</template>
        <template v-slot:file>
        </template>
    </frame>
</template>
<style lang='less' scope></style>