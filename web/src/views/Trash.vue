<script lang='ts' setup>
import { ref, onMounted } from 'vue'
import { ElEmpty, ElTable, ElTableColumn, ElMessage } from 'element-plus'
import { getDeleteFiles, recoverFile } from '@/api/files/index'

const tableLoading = ref<boolean>(false)
const dataList = ref([])

const getList = async () => {
    getDeleteFiles()
        .then(res => dataList.value = res )
        .catch(error => ElMessage.error('获取列表失败：', error))
        .finally(() => tableLoading.value = false)
}


onMounted(() => {
    getList()
})

const handleRecoverFile = async(fileId:string) => {
    try {
        await recoverFile(fileId)
        await getList()
        ElMessage.success('恢复文件成功')

    } catch (error) {
        ElMessage.error('操作失败')
    }
}

</script>
<template>
    <div>
        <el-table v-loading="tableLoading" :data="dataList">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="文件名" width="120">
                <template #default="scope">{{ scope.row.name }}</template>
            </el-table-column>
            <el-table-column label="删除时间">
                <template #default="scope">{{ scope.row.delete_at }}</template>
            </el-table-column>
            <el-table-column label="恢复文件">
                <template #default="scope">
                    <div>
                        <div
                        class="delete btn w-[36px] text-center h-[36px] rounded-md text-[#fff] transition cursor-pointer ml-[10px] hover:bg-[#e3e2fe] flex justify-center items-center cursor-pointer"
                        @click="handleRecoverFile(scope.row.id)">
                        <svg-icon name="delete" width="24px" height="24px"></svg-icon>
                    </div>
                    </div>
                </template>
            </el-table-column>


        </el-table>
    </div>
</template>
<style lang='less' scope></style>