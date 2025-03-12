<template>
    <div>
        <el-empty v-if="props.fileList.length === 0"></el-empty>
        <el-table :data="props.fileList" row-key="id" style="width: 100%;" class="table-height" v-else>
            <el-table-column fixed type="selection" width="55"></el-table-column>
            <el-table-column label="文件名" width="220">
                <template #default="scope">
                    <div class="flex">
                        <div class="cursor-pointer" @click="() => handleEnterFile(scope.row.id)">{{ scope.row.name }}
                        </div>
                        <div class="star flex items-center" v-show="true" @click.stop="handleCancelCollect(scope.row.id)"
                            v-if="scope.row?.is_collected">
                            <svg-icon name="collect"></svg-icon>
                        </div>
                        <div class="star flex items-center" @click.stop="() => handleCollect(scope.row.id)"
                            v-show="true" v-if="!scope.row?.is_collected">
                            <svg-icon name="star">

                            </svg-icon>
                        </div>
                    </div>

                </template>
            </el-table-column>
            <el-table-column label="创建者" width="80">
                <template #default="scope">{{ scope.row.userName }}</template>
            </el-table-column>
            <el-table-column label="最后修改">
                <template #default="scope">{{ scope.row.updated_at }}</template>
            </el-table-column>
            <el-table-column label="文件位置">
                <template #default="scope">{{ scope.row.path }}</template>
            </el-table-column>
            <el-table-column width="100">
                <div
                    class="operate btn w-[60px] text-center h-[36px] rounded-md text-[#fff] opacity-0	hover:opacity-100 transition cursor-pointer ml-[20px]">
                    <span class="text-[#fff] leading-9	">分享
                    </span>
                </div>
            </el-table-column>
            <el-table-column width="100">
                <template #default="scope">

                    <div class="delete btn w-[36px] text-center h-[36px] rounded-md text-[#fff] opacity-0	hover:opacity-100 transition cursor-pointer ml-[10px]"
                        @click="handleDelFile(scope.row.id)">
                        <svg-icon name="delete" width="24px" height="24px"></svg-icon>
                    </div>

                </template>
            </el-table-column>
        </el-table>
    </div>


</template>
<script lang="ts" setup>
import { ref } from 'vue'
import router from '@/router/index'
import { ElEmpty, ElTable, ElTableColumn, ElMessage, ElMessageBox } from 'element-plus'
import { collectFile, getCollectFiles, cancelCollectFile, deleteFile } from '@/api/files/index'
// const collectType = ref<boolean>()
const currentAddId = ref(null)
const currentCancelId = ref(null)


const props = defineProps({
    fileList: {
        type: Array,
        default: [],
    },
    spaceId: {
        type: String,
        required: false,
        default: ''
    }

})


const emits = defineEmits(['updateTableList'])
const handleEnterFile = (fileId: string) => {
    router.push({ name: 'docView', params: { fileId }, query: { spaceId: props.spaceId } })
}

const handleDelFile = async (fileId: string) => {
    ElMessageBox.confirm(
        '确定删除文件？',
        'Warning', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }
    ).then(async () => {
        await deleteFile(fileId)
        emits('updateTableList', props.spaceId)
        ElMessage.success('删除成功！')
    }).catch(() => {
        ElMessage.info('取消操作')
    })

}


// todo:文件收藏逻辑需要修改
const handleCollect = async (fileId: string): Promise<void> => {
    try {
        await collectFile(fileId)
        ElMessage.success('收藏成功')
        emits('updateTableList', '')

    } catch (error) {
        ElMessage.error('操作失败')
    }

}

const handleCancelCollect = async (fileId: string) => {
    try {
        await cancelCollectFile(fileId)
        emits('updateTableList', '')
    } catch (error) {
        ElMessage.error('操作失败')
    }
}





</script>
<style lang="less" scoped>
@list-top: 185px;
@top-offset: 60px;

.table-height {
    height: calc(100vh - 180px);
}


span {
    font-size: 14px;
}


.filepart:hover {
    background-color: rgba(13, 13, 13, 0.06);
}

.filepart:hover .star,
.filepart:hover .button-box {
    opacity: 1;
}

.filepart:hover {
    .delete {
        opacity: 1;
    }

    .operate {
        opacity: 1;
    }
}

.filepart::after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    width: calc(100% - 13px);
    height: 0.8px;
    margin: 0 auto;
    background-color: #e7e9eb;
}

.filepart {
    position: relative;
    display: flex;
    align-items: center;
    height: 56px;
    padding: 10px 10px;
    border-radius: 8px;
}

.filepart.selected {
    background-color: @bgColorBase;
}

.filename {
    flex: 4;
    display: flex;
    transform: translateY(2px);
}

.star {
    cursor: pointer;
    width: 24px;
    height: 24px;
    border-radius: 6px;
    opacity: 1;
    margin-left: 12px;
    padding: 2px 4px;
    box-sizing: border-box;
    transform: translateY(-2px);
}

.star:hover {
    background-color: rgba(13, 13, 13, 0.06);
}

.position {
    flex: 1;
}

.author {
    flex: 0.9;
}

.latest {
    flex: 2;
}

.file-icon {
    transform: translateY(-4px);
    width: 24px;
    height: 24px;
    margin: 0 15px;
}

.checkBox {
    cursor: pointer;
    position: relative;
    width: 16px;
    height: 16px;
    border: 1px solid #c2c2c2;
    border-radius: 2px;
    background-color: #fff;
}

.border {
    border-radius: 2px;
    left: -1px;
    top: -1px;
    position: absolute;
    width: 16px;
    height: 16px;
    border: 1px solid @primary-color;
}

.checkBox:hover {
    border-color: @primary-color;
}

.checkBox .label {
    position: relative;
    left: 6px;
    top: 2px;
    width: 3px;
    height: 8px;
    border: 2px solid @primary-color;
    border-top: none;
    border-left: none;

    background: transparent;
    transform: rotate(45deg) scaleY(1);
}

.checkBox label:hover {
    opacity: 1;
}

.button-box {
    opacity: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    right: 0px;
    transform: translateX(35px);
    position: absolute;
    width: 180px;
    height: 100%;
    padding-right: 45px;
    box-sizing: border-box;

    span {
        color: #fff;
        font-size: 16px;
    }
}

.btn {
    background-color: @primary-color;
    opacity: 0;
}

.btn:hover {
    opacity: 1;
}

.delete {
    padding: 8px 10px;
    background-color: transparent;

    div {
        transform: translate(-4px, -2px);
    }
}

.delete:hover,
.delete:active {
    background-color: @primaryLight;
}

.operate:hover,
.operate:active {
    background-color: @button-hover-color;
}




.list {
    height: calc(~"100vh - @{list-top}");
    overflow-y: scroll;
    // height: 300px;//不是这个高度导致溢出
    padding: 0;
    margin: 0;
    list-style: none;

    // 滚动条整体部分
    &::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }

    // 滚动条的轨道的两端按钮，允许通过点击微调小方块的位置。
    &::-webkit-scrollbar-button {
        display: none;
    }

    // 滚动条的轨道（里面装有Thumb）
    &::-webkit-scrollbar-track {
        background: transparent;
    }

    // 滚动条的轨道（里面装有Thumb）
    &::-webkit-scrollbar-track-piece {
        background-color: transparent;
    }

    // 滚动条里面的小方块，能向上向下移动（或往左往右移动，取决于是垂直滚动条还是水平滚动条）
    &::-webkit-scrollbar-thumb {
        background: rgba(144, 147, 153, 0.3);
        cursor: pointer;
        border-radius: 4px;
    }

    // 边角，即两个滚动条的交汇处
    &::-webkit-scrollbar-corner {
        display: none;
    }

    // 两个滚动条的交汇处上用于通过拖动调整元素大小的小控件
    &::-webkit-resizer {
        display: none;
    }
}




#keyword {
    margin: 0 5px;
}

.type {
    cursor: pointer;
    position: relative;
    flex: 4;

    >span {
        position: relative;
        transition: .1s all;
        height: 28px;
        display: flex;
        flex-wrap: nowrap;
        border-radius: 6px;
        width: 110px;
        box-sizing: border-box;
        padding-left: 12px;
        line-height: 28px;
        white-space: nowrap;

        .icon {
            margin: 8px 2px 2px 2px;
        }
    }

    >span:hover {
        background-color: rgba(13, 13, 13, .06);
    }
}





.option {
    display: none;
    position: absolute;
    top: 32px;
    left: 0;
    z-index: 5;
    background-color: #fff;
    min-width: 150px;
    width: 150px;
    border: 1px solid rgba(13, 13, 13, .12);
    padding: 20px;
    box-shadow: 0px 12px 32px rgba(13, 13, 13, .08);
    border-radius: 8px;
    transform-origin: center top;
}

.type>span.active>.option {
    display: block;
}

.typeList {
    margin-top: 20px;
}

.item {
    display: flex;
    transition: all 0.3s;
    box-sizing: border-box;
    cursor: pointer;
    padding: 4px 8px 0 0px;
    margin: 4px 0;
    border-radius: 6px;

    span {
        pointer-events: none;
        line-height: 24px;
        color: rgba(13, 13, 13, .9);

    }

    .icon {
        pointer-events: none;
        margin: 3px 8px 0 0;
    }
}

.item.active .selected {
    opacity: 1;
}

.item .selected {
    opacity: 0;
}

.item:hover {
    background-color: rgba(13, 13, 13, .06);
}



.el-table__row:hover {
    .operate {
        opacity: 1;
    }

    .delete {
        opacity: 1;
    }
}
</style>
