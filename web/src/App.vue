<template>
    <!-- <Directory></Directory> -->
    <router-view></router-view>
</template>
<script lang="ts" setup>
// import Directory from './components/index/Directory.vue';
// 初始化数据
import { useFileStore } from './store/files'
import { useFolderStore } from './store/folder'
const fileStore = useFileStore()
const FolderStore = useFolderStore()
fileStore.initFileData()
FolderStore.initMyDocData()
fileStore.setMyDocFiles()
</script>

<style lang="less" scoped>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    color: #333;
}
</style>
