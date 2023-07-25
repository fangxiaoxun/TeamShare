<script lang="ts" setup>
import { ref } from 'vue';
import { vClickOutside } from '@/hooks/clickOutside';
import file from '../directory/file.vue'
import { useFileStore } from '@/store/files1'
// import { isEmpty } from 'element-plus/es/utils';
const props = defineProps(["fileList", "operate", "isEmpty", "folderName", "fileCount", "start", "isCollect"]);
console.log(props.fileList)
const FileStore = useFileStore()
const count = ref<number>(0)
const showType = (element: HTMLElement) => {
    element.classList.contains('active') && element.classList.remove('active')
}
// 定义类型
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
const typeContent = ref<HTMLElement>(document.createElement('span'))
const iconName = ref<string>('doc');
const TYPE = ref<HTMLElement>(document.createElement('span'))
const CHECK = ref<HTMLElement>(document.createElement('div'))
// 自定义文件类型选择事件
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
const isShow: boolean = true

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

const load = (): void => {
    if (count.value >= props.fileList.length) {
        count.value = props.fileList.length;
        return
    } else {
        count.value += 2
    }
}

// 右击菜单
const wrapper = ref<HTMLElement | null>(null)
const menuLeft = ref<number>(0);
const menuTop = ref<number>(0)
const showMenu = ref<boolean>(false)
const rightClickHandler = (e: MouseEvent) => {
    if (e.clientX >= wrapper.value?.offsetWidth! + 100 && e.clientY >= wrapper.value?.offsetHeight! - 100) {
        menuLeft.value = wrapper.value?.offsetWidth! + 100
        menuTop.value = wrapper.value?.offsetHeight! - 100
    } else if (e.clientX >= wrapper.value?.offsetWidth! && e.clientY <= wrapper.value?.offsetHeight!) {
        menuLeft.value = wrapper.value?.offsetWidth! + 100
        menuTop.value = e.clientY + 40
    } else if (e.clientY >= wrapper.value?.offsetHeight! - 100 && e.clientX <= wrapper.value?.offsetWidth!) {
        menuTop.value = wrapper.value?.offsetHeight! - 40
        menuLeft.value = e.clientX + 20
    } else {
        menuTop.value = e.clientY + 20
        menuLeft.value = e.clientX
    }
    showMenu.value = true
    // 做边界判断
}

const menuItem = ['新建文件', '上传本地文件','刷新']
let activeIndex = ref<number>(-1)
const handleMenu = (key:number) =>{
    console.log(key)
    switch(key){
        case 0:{    //新建文件
            break;
        }
        case 1: {
            break;
        }
        case 2:{
            break
        }
        default: break
    }

}
</script>
<template>
    <div class="menu" :style="{ top: menuTop + 'px', left: menuLeft + 'px' }" v-show="showMenu">
        <ul>
            <li v-for="(item, index) in menuItem" :key="index" :class="{ active: activeIndex === index }"
            @mouseover="activeIndex = index" @mouseout="activeIndex = -1" @click="handleMenu(index)">{{ item }}</li>
        </ul>
    </div>
    <div class="wrapper" ref="wrapper" @contextmenu.prevent="rightClickHandler" @click="showMenu = false">
        <div class="title">
            <h3>
                <slot name="title"></slot>
            </h3><i class="icon"></i>
        </div>
        <div class="file-list">
            <div class="desc">
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
                <div class="position"><span>
                        <slot name="item1"></slot>
                    </span></div>
                <div class="author"><span>
                        <slot name="item2"></slot>
                    </span></div>
                <div class="latest"><span>
                        <slot name="item3"></slot>
                    </span></div>
            </div>
            <!-- 动态渲染 -->
            <ul v-infinite-scroll="load" infinite-scroll-distance=1 class="list" style="overflow: auto">
                <div class="inner">

                    <el-empty description="文件夹是空的" v-if="props.isEmpty"></el-empty>
                    <file v-else v-for="item in props.fileList" :folderId="item.folderId" :fileId="item.fileId"
                        :isCollect="props.isCollect" :collectType="item.collectType" v-model="item.collectType">
                        <!-- <template v-slot:li1>{{ FileStore.getFolderName(item.folderId) ?
                            FileStore.getFolderName(item.folderId) : '我的云文档' }}</template> -->
                        <template v-slot:fileName>{{ item.fileName ? item.fileName : item.folderName }}</template>
                        <template v-slot:li2>{{ item.creator }}</template>
                        <template v-slot:li3>{{ item.lastDate.slice(0, 16) }}</template>
                        <template v-slot:operate>{{ props.operate }}</template>


                    </file>
                </div>
            </ul>


        </div>
    </div>
</template>
<style lang="less" scoped>
@list-top: 185px;
@top-offset: 60px;

.menu {
    cursor: pointer;
    position: absolute;
    z-index: 100;
    left: 50%;
    top: 40%;
    width: 150px;
    border-radius: 6px;
    padding: 6px;
    background-color: #fff;
    border: 1px solid rgba(13, 13, 13, .12);
    box-shadow: 0px 12px 32px rgba(13, 13, 13, 0.08);

    li {
        padding-left: 20px;
        line-height: 30px;
        border-radius: 3px;
    }

    li.active {
        background-color: @bgColorBase;
    }
}


span {
    font-size: 14px;
    color: rgba(13, 13, 13, .9);
}

.wrapper {
    padding: 24px 2px 0 48px;
}

.title {
    padding-bottom: 18px;

    h3 {
        line-height: 32px;
    }
}

.desc {
    cursor: pointer;
    position: relative;
    display: flex;
    margin-right: 55px;
    border-bottom: 2px solid rgba(13, 13, 13, .06);

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

    .position,
    .author {
        flex: 1;
        margin-left: -10px;
    }

    .latest {
        flex: 2;
        margin-left: -10px;

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
</style>