<!--
 * @Author: fangxiaoxun 1272449367@qq.com
 * @Date: 2025-02-23 11:19:24
 * @LastEditors: fangxiaoxun 1272449367@qq.com
 * @LastEditTime: 2025-03-10 20:24:24
 * 
-->
<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { ElBreadcrumb } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
// 查询对应文件夹下的文件/文件夹
import { getFolderByParentId, getFileList } from '@/api/folder/index.ts'
import { getFileListBySpaceId } from '@/api/files/index'
import { ref, computed } from 'vue'

import FileList from '@/components/directory/FileList.vue'




const route = useRoute()
const router = useRouter()


const { spaceId } = route.params
const { title } = route.query
const { name } = route

const breadcrumbs = ref([
    {
        title: '我的空间',
        name: 'myDoc',
        path: '/myDoc'
    },
    {
        title,
        name,
    }
])

const dataList = ref([])

console.log(spaceId, 'spaceId')

const handleGetFileList = async (spaceId = '') => {
    const res = await getFileListBySpaceId(spaceId)
    dataList.value = res
}
handleGetFileList(spaceId as string)
const config = {
    tableItem: [
        // '文件位置',
        '创建者',
        '最后修改',
    ],
    isShowShare: true,
    isShowDelete: true,
    isShowRecycle: false,
}





</script>
<template>
    <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="(breadcrumb, name) in breadcrumbs" :key="name" :to="{ path: breadcrumb?.path }">
            {{ breadcrumb.title }}
        </el-breadcrumb-item>
    </el-breadcrumb>
    <FileList :fileList="dataList" :config="config" :space-id="spaceId as string" @updateTableList="handleGetFileList">
    </FileList>

</template>
<style lang="less" scoped></style>