<!--
 * @Author: fangxiaoxun 1272449367@qq.com
 * @Date: 2025-02-23 11:35:10
 * @LastEditors: fangxiaoxun 1272449367@qq.com
 * @LastEditTime: 2025-03-10 14:07:36
 * 
-->
<script setup lang="ts">
import { ref, h, reactive } from 'vue'
import { ArrowDownBold as ArrowDownBoldIcon } from '@element-plus/icons-vue'
import {
    ElDropdown,
    ElDropdownItem,
    ElDropdownMenu,
    ElIcon,
    ElMessageBox,
    ElMessage,
    ElInput,
    ElDialog
} from 'element-plus'
import FileList from '@/components/directory/FileList.vue'
import { onMounted } from 'vue'

import { getSpaceList, addSpace } from '@/api/space/index'
import { getFolderList } from '@/api/folder/index'
import { useFolderStore } from '@/store/folder'
import { useRouter } from 'vue-router'
import FolderList from '@/components/directory/FolderList.vue'
const folderStore = useFolderStore()
const router = useRouter()

const currentType = ref('全部空间')
const typeMap = {
    'all': '全部空间',
    'personal': '个人空间',
    'onlyShared': '共享空间'
}
const handleCommand = (command: keyof typeof typeMap) => {
    currentType.value = typeMap[command]
}


const isActive = ref(false)
const folderList = ref([])
const getAllFolderList = async () => {
    const res = await getFolderList()
    console.log(res)
    folderList.value = res
}

const spaceList = ref([])

const getAllSpaceList = async () => {
    getSpaceList()
    .then((res) => {
        spaceList.value = res
    }).catch((error) => {
        ElMessage.error('加载失败：', error)
    }).finally(() => {
        tableLoading.value = false
    })
}

const formData = reactive({
    spaceName: '',
    spaceDesc: ''
})
const tableLoading = ref<boolean>(false)

// 对话框可见性控制
const dialogFormVisible = ref(false);

const handleConfirm = async() => {
    try {
        const params = {
            name: formData.spaceName,
            description: formData.spaceDesc
        }
        await addSpace(params)
        dialogFormVisible.value = false
        getAllSpaceList()
        formData.spaceName = ''
        formData.spaceDesc = ''
    } catch (error) {
        console.log('新建失败', error)
    }
}


const handleFolderClick = (folderId: string, folderName: string) => {
    router.push({ name: 'folder', params: { folderId }, query: { title: folderName } })
}

onMounted(() => {
    getAllSpaceList()
})
</script>
<template>
    <div class="flex">
        <el-dropdown trigger="click" class="cursor-pointer h-8" @command="handleCommand"
            @visible-change="isActive = $event">
            <span class="el-dropdown-link pointer leading-8 px-3 rounded font-bold"
                :class="{ 'bg-[#e3e2fe]': isActive }">
                {{ currentType }}
                <el-icon class="el-icon--right">
                    <ArrowDownBoldIcon />
                </el-icon>
            </span>
            <template #dropdown>
                <el-dropdown-menu class="w-[200px] px-[100px]">
                    <el-dropdown-item command="all" >
                        <div>
                            <div>全部文件夹</div>
                            <div class="text-xs">展示关于我的全部文件夹</div>
                        </div>
                    </el-dropdown-item>
                    <el-dropdown-item divided command="personal">
                        <div>
                            <div>个人文件夹</div>
                            <div class="text-xs">不展示共享文件夹</div>
                        </div>
                    </el-dropdown-item>
                    <el-dropdown-item divided command="onlyShared">
                        <div>
                            <div>共享文件夹</div>
                            <div class="text-xs">展示共享文件夹</div>
                        </div>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <div @click="dialogFormVisible = true"
            class="cursor-pointer w-[80px] h-8 rounded ml-6 border border-transparent bg-[#6965db] shadow-sm transition-all duration-100 hover:border-gray-700 hover:shadow-none hover:bg-[#5b57d1] text-center font-medium	">
            <span class="leading-8 text-white text-sm">新建空间</span>
        </div>
    </div>
    <FolderList :space-list="spaceList"></FolderList>
    <el-dialog v-model="dialogFormVisible" title="新建空间" width="500">
        <el-form :model="formData">
            <el-form-item label="空间名称">
                <el-input v-model="formData.spaceName" autocomplete="off" placeholder="请输入空间名称" />
            </el-form-item>
            <el-form-item label="空间描述">
                <el-input v-model="formData.spaceDesc" autocomplete="off" placeholder="请输入空间描述" />

            </el-form-item>
        </el-form>
        <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button type="primary" @click="handleConfirm">
                    确认
                </el-button>
            </div>
        </template>
    </el-dialog>

</template>
<style lang="less" scoped></style>
