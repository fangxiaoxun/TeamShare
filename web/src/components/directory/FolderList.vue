<!--
 * @Author: fangxiaoxun 1272449367@qq.com
 * @Date: 2025-02-23 15:56:13
 * @LastEditors: fangxiaoxun 1272449367@qq.com
 * @LastEditTime: 2025-02-23 22:12:21
 * 
-->
<script setup lang="ts">
// import { DefineProps } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const props = defineProps<{
    folderList: Array<{
        folderId: string;
        folderName: string;
        isFavorite: boolean;
    }>;
}>();


const handleFolderClick = (folderId: string, folderName:string) => {
    router.push({ name: 'folder', params: { folderId }, query: { title: folderName } })
}

</script>
<template>

<div class="folder-list w-full grid gap-3 grid-cols-[repeat(auto-fill,_minmax(268px,_360px))] auto-rows-auto py-1">
        <div class="folder-item bg-white p-[18px]  rounded-md border-1 border-sold border-[#dcdfe6] hover:border-[#6965db] cursor-pointer"
            v-for="folder in props.folderList" :key="folder.folderId" @click="handleFolderClick(folder.folderId, folder.folderName)">
            <div class="folder-icon"></div>
            <div class="folder-name text- align-middle" > {{ folder.folderName }}</div>
            <div class="folder-detail"></div>
        </div>
    </div>
</template>
<style lang="less" scoped></style>