<script setup lang="ts">
import { ref } from 'vue'
import { ArrowDownBold as ArrowDownBoldIcon } from '@element-plus/icons-vue'
import {
    ElDropdown,
    ElDropdownItem,
    ElDropdownMenu,
    ElIcon,
} from 'element-plus'
import { onMounted } from 'vue'

import { getFolderList } from '@/api/folder/index'
import { useFolderStore } from '@/store/folder'
import { useRouter } from 'vue-router'
import FolderList from '@/components/directory/FolderList.vue'
const folderStore = useFolderStore()
const router = useRouter()

const currentType = ref('全部文件夹')
const handleCommand = (command: string) => {
    currentType.value = command
}


const isActive = ref(false)
const folderList = ref([])
const getAllFolderList = async () => {
    const res = await getFolderList()
    console.log(res)
    folderList.value = res
}
const handleFolderClick = (folderId: string, folderName:string) => {
    router.push({ name: 'folder', params: { folderId }, query: { title: folderName } })
}

onMounted(() => {
    getAllFolderList()
    folderStore.getFolderInfo()
})
</script>
<template>
    <el-dropdown trigger="click" class="cursor-pointer" @command="handleCommand" @visible-change="isActive = $event">
        <span class="el-dropdown-link pointer leading-8 px-3 rounded font-bold" :class="{ 'bg-[#e3e2fe]': isActive }">
            {{ currentType }}
            <el-icon class="el-icon--right">
                <ArrowDownBoldIcon />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu class="w-[200px] px-[100px]">
                <el-dropdown-item command="全部文件夹">
                    <div>
                        <div>全部文件夹</div>
                        <div class="text-xs">展示关于我的全部文件夹</div>
                    </div>
                </el-dropdown-item>
                <el-dropdown-item divided command="个人文件夹">
                    <div>
                        <div>个人文件夹</div>
                        <div class="text-xs">不展示共享文件夹</div>
                    </div>
                </el-dropdown-item>
                <el-dropdown-item divided command="共享文件夹">
                    <div>
                        <div>共享文件夹</div>
                        <div class="text-xs">展示共享文件夹</div>
                    </div>
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
    <FolderList :folder-list="folderStore.data"></FolderList>
</template>
<style lang="less" scoped></style>
