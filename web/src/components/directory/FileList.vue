<template>

    <div class="table w-full pr-[55px]">
        <div class="table-header w-full flex">
            <div class="flex-4">
                <div class="type">
                    <span v-click-outside="showType" ref="TYPE">
                        <i class="icon"><svg-icon :name="iconName"></svg-icon></i>
                        <span id="keyword" ref="typeContent">全部</span>
                        <i class="icon"><svg-icon name="arrowdown" width="12px" height="12px"></svg-icon></i>
                        <div class="option">
                            <h4>文件类型</h4>
                            <div class="typeList" ref="CHECK">
                                <div class="item active" id="default" @click="TypeSelect($event)">
                                    <div class="icon selected"><svg-icon name="selected" width="16px" height="16px"
                                            color="#0A6CFF"></svg-icon></div>
                                    <div class="icon"><svg-icon name="doc" width="16px" height="16px"></svg-icon></div>
                                    <span>全部</span>
                                </div>
                                <div class="item" id="doc" @click="TypeSelect($event)">
                                    <div class="icon selected"><svg-icon name="selected" width="16px" height="16px"
                                            color="#0A6CFF"></svg-icon></div>
                                    <div class="icon"><svg-icon name="doc" width="16px" height="16px"></svg-icon></div>
                                    <span>轻文档</span>
                                </div>
                                <div class="item" id="word" @click="TypeSelect($event)">
                                    <div class="icon selected"><svg-icon name="selected" width="16px" height="16px"
                                            color="#0A6CFF"></svg-icon></div>
                                    <div class="icon"><svg-icon name="word" width="16px" height="16px"></svg-icon></div>
                                    <span>word</span>
                                </div>
                                <div class="item" id="map" @click="TypeSelect($event)">
                                    <div class="icon selected"><svg-icon name="selected" width="16px" height="16px"
                                            color="#0A6CFF"></svg-icon></div>
                                    <div class="icon"><svg-icon name="map" width="16px" height="16px"></svg-icon></div>
                                    <span>map</span>
                                </div>
                            </div>
                        </div>
                    </span>
                </div>

            </div>
            <div v-for="item in props.config.tableItem" class="table-item flex-1">
                <span>{{ item }}</span>
            </div>
            <div class="table-item flex-1" v-show="props.config.isShowShare"></div>
            <div class="table-item flex-1" v-show="props.config.isShowDelete"></div>
            <div class="table-item flex-1" v-show="props.config.isShowRecycle"></div>
        </div>
        <div class="data-list list overflow-auto " v-infinite-scroll="load" infinite-scroll-distance=1>
            <el-empty description="文件夹是空的" v-if="props.fileList.length === 0"></el-empty>
            <div class="filepart" @click="handleSelected" :class="{ selected: isCheck }" ref="FILE"
                :collectType="collectType" v-for="file in props.fileList" :key="file.fileId">
                <div class="filename flex-4">
                    <div class="checkBox">
                        <div class="border" v-show="isCheck">
                            <div class="label"></div>
                        </div>
                    </div>
                    <div class="file-icon">
                        <svg-icon name="doc" width="24px" height="24px"></svg-icon>
                    </div>
                    <span>
                        <span @click="handleEnter">
                            {{ file.fileName }}
                        </span>
                    </span>
                    <div class="star" v-show="true" @click.stop ="handleCollect" v-if="collectType">
                        <svg-icon name="collect"></svg-icon>
                    </div>
                    <div class="star" @click.stop="handleCollect" v-show="true" v-if="!collectType">
                        <svg-icon name="star"></svg-icon>
                    </div>
                </div>

                <!-- 需要传一个配置项 -->
                <div class="flex-1">
                    <span>
                        nnjdslja
                    </span>
                </div>
                <div class="flex-1">
                    <span>
                        udsjkldsa
                    </span>
                </div>
                <div class="flex-1">
                    <span>
                        ndjksandklal;k
                    </span>
                </div>

                <div class="flex-1" v-if="props.config.isShowShare">
                    <div class="operate btn w-[60px] text-center h-[36px] rounded-md text-[#fff] opacity-0	hover:opacity-100 transition cursor-pointer ml-[20px]" @click="handleRecover">
                        <span class="text-[#fff] leading-9	">分享
                        </span>
                    </div>

                </div>
                <div class="flex-1 " v-if="props.config.isShowDelete">
                    <div class="delete btn w-[36px] text-center h-[36px] rounded-md text-[#fff] opacity-0	hover:opacity-100 transition cursor-pointer ml-[10px]" @click="handleDelete">
                        <!-- <span> -->
                            <svg-icon name="delete" width="24px" height="24px"></svg-icon>
                        <!-- </span> -->
                    </div>
                </div>
            </div>
        </div>

    </div>

    <ul v-infinite-scroll="load" infinite-scroll-distance=1 class="list" style="overflow: auto">
    </ul>



</template>
<script lang="ts" setup>
import { ref, inject } from 'vue'
import router from '@/router/index'
import { ElEmpty } from 'element-plus'
let isCheck = ref<boolean>(false)
const FILE = ref<HTMLElement>(document.createElement('div'))
import { useFileStore } from '@/store/files'
import { useInfo } from '@/store/user'
const userInfo = useInfo()
const fileStore = useFileStore()
// const props = defineProps(['isCollect', 'collectType'])
const collectType = ref<boolean>()
const handleSelected = (): void => {
    isCheck.value = !isCheck.value
}

interface FileItem {
    folderId: string
    fileId: string
    fileName: string
    folderName?: string
    owner: string
}

const props = defineProps<{
    fileList: any[],
    config: any,
}>()

const handleEnter = () => {
    fileStore.setFileInfo(
        FILE.value.getAttribute('folderid')!,
        FILE.value.getAttribute('fileid')!,
        FILE.value.getAttribute('filename')!,
    )
    const content = fileStore.getFileContent(FILE.value.getAttribute('fileid')!)
    // if(content?.length){
    // userInfo.setCurrConten(content)
    // }
    // todo:需要获取文件id进行内容查询
    router.push('/docView')
}

interface injectData {
    RECOVER: (id: string | null, type: string) => void
    SHARE: () => void
    DELETE: (fileId: string, folderId?: string) => void
}

// 接收来自父组件的 recover 对象
const OPERATE: injectData | undefined = inject('operate')
const handleRecover = (): void => {
    const id = FILE.value.getAttribute('fileId')
        ? FILE.value.getAttribute('fileId')
        : FILE.value.getAttribute('folderId')
    const type = FILE.value.getAttribute('fileId') ? 'file' : 'folder'
    if (OPERATE?.RECOVER) {
        OPERATE.RECOVER(id, type)
    } else if (OPERATE?.SHARE) {
        OPERATE.SHARE()
    }
}

const handleDelete = (): void => {
    const fileId = FILE.value.getAttribute('fileId')!
    const folderId = FILE.value.getAttribute('folderId')!
    if (OPERATE?.DELETE) {
        OPERATE.DELETE(fileId, folderId)
    }
}
// todo:文件收藏逻辑需要修改
const handleCollect = (e: MouseEvent): void => {
    collectType.value = !collectType.value
    const fileId = FILE.value.getAttribute('fileId')!
    if (
        FILE.value.getAttribute('collectType') === 'false' ||
        FILE.value.getAttribute('collectType') === '0'
    ) {
        fileStore.addCollect(fileId)
    } else {
        fileStore.deleteCollect(fileId)
    }
}




const count = ref<number>(0)
const load = (): void => {
    if (count.value >= props.fileList.length) {
        count.value = props.fileList.length;
        return
    } else {
        count.value += 2
    }
}

const showType = (element: HTMLElement) => {
    element.classList.contains('active') && element.classList.remove('active')
}
// 类型变化
interface Type {
    [key: string]: {
        iconName: string,
        type: string
    }
}

const typeObj: Type = {
    default: {
        iconName: 'doc',
        type: "全部"
    },
    doc: {
        iconName: 'doc',
        type: '轻文档'
    },
    word: {
        iconName: 'word',
        type: 'word'
    },
    map: {
        iconName: 'map',
        type: 'map'
    }

}
const TYPE = ref<HTMLElement>(document.createElement('span'))
const CHECK = ref<HTMLElement>(document.createElement('div'))

const typeContent = ref<HTMLElement>(document.createElement('span'))
const iconName = ref<string>('doc');


function TypeSelect(e: MouseEvent) {
    let type: string = (<HTMLElement>e.target).id;
    // 变化背景色
    if (typeObj[type] != typeObj['default']) {
        TYPE.value.style.backgroundColor = "rgba(50,100,252,.1)"
    } else {
        TYPE.value.style.backgroundColor = ""
    }
    TYPE.value.classList.remove('active')


    // 更新内容
    typeContent.value.innerHTML = typeObj[type].type
    iconName.value = typeObj[type].iconName;

    handleClick(type)
}
// 实现点击切换类名
function handleClick(id: string): void {
    const LIST = CHECK.value.querySelectorAll('.item');
    LIST.forEach(item => {
        item.classList.remove('active')
        if (item.id == id) {
            item.classList.add('active')
        }
    })
}




</script>
<style scope lang="less" scoped>
@list-top: 185px;
@top-offset: 60px;

span{
    font-size: 14px;
}


.filepart:hover {
    background-color: rgba(13, 13, 13, 0.06);
}

.filepart:hover .star,
.filepart:hover .button-box {
    opacity: 1;
}

.filepart:hover{
    .delete{
        opacity: 1;
    }
    .operate{
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
    opacity: 0;
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
    div{
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
                margin: 2px 2px 2px 2px;
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
</style>
