<script lang="ts" setup>
import { ref } from 'vue';
import { vClickOutside } from '@/hooks/clickOutside';
import file from '@/views/file.vue';
// import { isEmpty } from 'element-plus/es/utils';
const props = defineProps(["fileList", "operate","isEmpty"]);
console.log(props.isEmpty)
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
        type: 'wrod'
    },
    excel: {
        iconName: 'excel',
        type: 'excel'
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
    // load()
}
</script>
<template>
    <div class="wrapper">
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
                                <div class="item" id="excel" @click="TypeSelect($event)">
                                    <div class="icon selected"><svg-icon name="selected" width="16px" height="16px"
                                            color="#0A6CFF"></svg-icon></div>
                                    <div class="icon"><svg-icon name="excel" width="16px" height="16px"></svg-icon></div>
                                    <span>excel</span>
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
                        <el-empty  description="描述文字" v-if="props.isEmpty"></el-empty>
                        <file v-else v-for="i in props.fileList.length" :key="i">
                            <template v-slot:li1>{{ props.fileList[i - 1].location }}</template>
                            <template v-slot:fileName>{{ props.fileList[i - 1].fileName }}</template>
                            <template v-slot:li2>{{ props.fileList[i - 1].author }}</template>
                            <template v-slot:li3>{{ props.fileList[i - 1].time }}</template>
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
    // padding: 0 10 10px 10px;
    margin-right: 55px;
    // padding-bottom: 10px;
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

            // background-color: rgba(10, 108, 255, 0.1);
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
    padding: 4px 8px 0 20px;
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