<!--
 * @Author: fangxiaoxun 1272449367@qq.com
 * @Date: 2025-02-23 11:19:24
 * @LastEditors: fangxiaoxun 1272449367@qq.com
 * @LastEditTime: 2025-02-23 17:43:47
 * 
-->
<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { ElBreadcrumb } from 'element-plus'
import { useRoute, useRouter } from 'vue-router'
// 查询对应文件夹下的文件/文件夹
import { getFolderByParentId, getFileList } from '@/api/folder/index.ts'
import { ref, computed } from 'vue'

const route = useRoute()
const router = useRouter()

const { folderId } = route.params
const { title } = route.query
const { name } = route

const breadcrumbs = ref([
    {
        title:'我的空间',
        name: 'myDoc'
    },
    {
        title,
        name,
    }
])






</script>
<template>
    <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="(breadcrumb, name) in breadcrumbs" :key="name" :to="{ path: breadcrumb.path }">
            {{ breadcrumb.title }}
        </el-breadcrumb-item>
    </el-breadcrumb>

</template>
<style lang="less" scoped></style>