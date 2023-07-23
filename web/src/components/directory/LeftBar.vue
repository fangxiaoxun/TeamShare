<script lang='ts' setup>
import Button from '../common/Button.vue';
import { ref, getCurrentInstance } from 'vue';
import { useFolderStore } from '@/store/folder1';
import { useFileStore } from '@/store/files1'
// 未确认
import { ElMessage, ElMessageBox } from 'element-plus'
// 待更改
// 文件夹操作
const folderStore = useFolderStore();
const fileStore = useFileStore();
folderStore.setAllFolder()
folderStore.setCollectFolder()

const activeNames = ref([''])
const showFolder = ref<boolean>(false);

// 点击文件夹
const handleChange = (val: string[]) => {
    if (val.length === 1) {


    } else {
        console.log('文件夹展开')
    }
}
// 获取新建文件夹的所在位置id

//新建文件夹
const addFolder = () => {
    ElMessageBox.prompt('请输入文件夹名称', '新建文件夹', {
        confirmButtonText: '完成',
        cancelButtonText: '取消',
    })
        .then(({ value }) => {
            ElMessage({
                type: 'success',
                message: `新建文件夹 ${value} 成功！`,
            })
            // 新建文件夹
            folderStore.addFolder(value);
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消新建文件夹',
            })
        })
}

// 获取Dom元素
const folderItem = ref<Array<HTMLHeadingElement | null>>([])
// 为每个文件夹设置id
import EventBus from '@/hooks/eventBus';
import { inject, reactive } from 'vue';

folderStore.$onAction(({
    name,
    after,
    store
}) => {
    after(() => {
        console.log(name)
        if (name === 'addFolder' || name === 'deleteFolder') {
            folderStore.setAllFolder()

        }
        // fileStore.setLatesList()
    })
})

// 定义点击显示事件

const $bus = inject('$bus') as EventBus;
// 点击文件夹
// 更新接口返回数据
interface FileData {
    folderName: string;
    folderId: string;
    isCollect: boolean;

}
// 默认显示我都云文档
let fileData: FileData = reactive({
    folderName: '我的云文档',
    folderId: '1',
    isCollect: true
});
$bus.emit('fileData', fileData) //发送数据 应该发送响应式数据
// 修改当前展示的文件夹
const handleClick = (e: MouseEvent) => {
    console.log(e.target as HTMLElement)
    folderItem.value.forEach(item => {
        item?.classList.remove('current')
    })
    if ((e.target as HTMLElement).classList.contains('folder')) {
        fileData.folderName = (e.target as HTMLElement).innerText;
        console.log(fileData.folderName)
        fileData.folderId = (e.target as HTMLElement).id;
        fileData.isCollect = true;
        (e.target as HTMLElement).classList.add('current');
        // 匹配位置
        $bus.emit('fileData', fileData) //发送数据 应该发送响应式数据
    }
}

const myDoc = ref<HTMLElement | null>(null)
const clickEvent = () => {
    showFolder.value = !showFolder.value
    fileData.folderName = '我的云文档'
    fileData.folderId = '1'
    fileData.isCollect = true;
    $bus.emit('fileData', fileData) //发送数据 应该发送响应式数据
}

const handleFolder = (name: string): void => {
    if (name === '我的收藏') {
        fileStore.setCollect()
        fileData.folderName = '我的收藏'
        fileData.isCollect = false
        $bus.emit('fileData', fileData)
    }
    if (name === '我的云文档') {
        fileStore.setFileList('1')
        fileData.folderName = '我的云文档'
        fileData.isCollect = true
        $bus.emit('fileData', fileData)
    }

}
// 收藏文件夹
async function deleteCollect(folderId: string) {
    await folderStore.deleteCollect(folderId)
    await folderStore.setCollectFolder()
    await folderStore.setAllFolder()
}
// 右击菜单
const menuList = ['重命名']
const showMenu = ref<boolean>(false)
const activeIndex = ref<number>(-1)
const menuTop = ref<number>(0)
const menuLeft = ref<number>(0)
const currFolder = ref<string>('')
const handleMenu = (e: MouseEvent): void => {
    console.log(e.target as HTMLElement)
    currFolder.value = (e.target as HTMLElement).id!
    console.log(currFolder.value)
    showMenu.value = true
    menuTop.value = e.clientY + 30
    menuLeft.value = e.clientX + 10
}
const 
const renameFolder = () => {
    ElMessageBox.prompt('重命名', {
        confirmButtonText: '完成',
        cancelButtonText: '取消',
    })
        .then(({ value }) => {
            ElMessage({
                type: 'success',
                message: `重命名文件夹 ${value} 成功！`,
            })
            // 新建文件夹
            console.log(currFolder.value, value)
            folderStore.renameFolder(currFolder.value, value)
            folderStore.setAllFolder()
            folderStore.setCollectFolder()
            // return value
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: '取消重命名',
            })
        })
}


const handleMenuList = (key: number): void => {
    console.log(key)
    switch (key) {
        case 0: {    //新建文件
            renameFolder()
            break;
        }
        case 1: {
            break;
        }
        case 2: {
            break
        }
        default: break
    }
}
</script>
<template>
    <div class="menu" :style="{ top: menuTop + 'px', left: menuLeft + 'px' }" v-show="showMenu">
        <ul>
            <li v-for="(item, index) in menuList" :key="index" :class="{ active: activeIndex === index }"
                @mouseover="activeIndex = index" @mouseout="activeIndex = -1" @click="handleMenuList(index)">{{ item }}</li>
        </ul>
    </div>
    <div class="leftBar" @click="showMenu = false">
        <!-- 新建按钮 -->
        <div class="btn-box">
            <Button class="blue-btn btn" id="newsetBtn">
                <span>
                    <svg t="1683629730582" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="11333" width="128" height="128">
                        <path
                            d="M962.56 180.992H236.544c-30.72 0-55.808 25.088-55.808 55.808v726.016c0 30.72 25.088 55.808 55.808 55.808H962.56c30.72 0 55.808-25.088 55.808-55.808V237.056c0-30.72-25.088-56.064-55.808-56.064z m-139.52 474.88H655.36v167.424h-111.616v-167.424H376.32v-111.616h167.424v-167.424H655.36v167.424h167.424v111.616z"
                            fill="#ffffff" p-id="11334"></path>
                        <path
                            d="M739.84 5.12H69.888C34.304 5.12 5.632 34.048 5.632 69.376v669.952c0 35.328 28.928 64.256 64.256 64.256h49.92c1.536 0.256 3.072 0.256 4.352 0.256 20.224 0 36.352-16.384 36.352-36.352 0-16.128-11.008-30.72-26.368-35.072v-1.536H78.336V77.824h653.312v42.24c-0.256 1.28-0.256 2.56-0.256 3.84 0 20.224 16.384 36.352 36.352 36.352 16.384 0 30.72-11.008 35.072-26.624h1.28V69.376C804.096 34.048 775.424 5.12 739.84 5.12z"
                            fill="#ffffff" p-id="11335"></path>
                    </svg>
                    新建
                </span>
            </Button>
            <Button class="white-btn btn" id="addBtn">
                <span>
                    <svg t="1683629445618" class="icon" viewBox="0 0 1097 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="1502" width="128" height="128">
                        <path
                            d="M1024 438.857143H542.72l18.285714-18.285714a73.142857 73.142857 0 1 0-103.862857-103.131429L365.714286 408.137143a146.285714 146.285714 0 0 0 0 204.8l91.428571 90.697143a73.142857 73.142857 0 0 0 51.931429 21.942857 73.142857 73.142857 0 0 0 51.931428-124.342857L545.645714 585.142857H1024a73.142857 73.142857 0 0 0 0-146.285714z"
                            fill="#6965db" p-id="1503"></path>
                        <path
                            d="M804.571429 653.897143a73.142857 73.142857 0 0 0-73.142858 73.142857V804.571429a73.142857 73.142857 0 0 1-73.142857 73.142857H219.428571a73.142857 73.142857 0 0 1-73.142857-73.142857V219.428571a73.142857 73.142857 0 0 1 73.142857-73.142857h438.857143a73.142857 73.142857 0 0 1 73.142857 73.142857v73.142858a73.142857 73.142857 0 0 0 146.285715 0V219.428571a219.428571 219.428571 0 0 0-219.428572-219.428571H219.428571a219.428571 219.428571 0 0 0-219.428571 219.428571v585.142858a219.428571 219.428571 0 0 0 219.428571 219.428571h438.857143a219.428571 219.428571 0 0 0 219.428572-219.428571V727.04a73.142857 73.142857 0 0 0-73.142857-73.142857z"
                            fill="#6965db" p-id="1504"></path>
                    </svg>
                    导入
                </span>
            </Button>
        </div>
        <!-- 引入路由导航 -->

        <div class="router-list">
            <router-link class="deskTop item" active-class="active" to="/desktop" @click="showFolder = false">
                <i class="icon"><svg-icon class="tab-icon" name="desktop" width="20px" height="20px"></svg-icon></i>
                <span>桌面</span>
            </router-link>
            <router-link ref="myDoc" class="myDoc item" active-class="active" to="/mydoc">
                <div class="wrap " @click="clickEvent" id="1">
                    <i class="icon"><svg-icon class="tab-icon" name="mydoc" width="20px" height="20px"></svg-icon></i>
                    <span>我的文档</span>
                </div>
                <!-- 折叠面板 -->
                <div class="demo-collapse" v-show="showFolder">
                    <el-collapse v-model="activeNames" @change="handleChange">
                        <div class="li">
                            <span class="addFolder" @click="addFolder" :key="0" id="0"><svg-icon name="add" width="12px"
                                    height="12px" color="#6965db"></svg-icon></span>
                            <el-collapse-item class="item current" title="我的云文档" name="我的云文档"
                                @click="handleFolder($event.target.innerText)">
                                <div class="folder" v-for="(item, index) in folderStore.getAllFolder" :key="index"
                                    :id="item.folderId" @click.native="handleClick" @contextmenu.prevent="handleMenu">
                                    <u class="folder" ref="folderItem" :id="item.folderId">{{ item.foldername }}</u>
                                    <!-- 删除文件夹 -->
                                    <div class="delete-btn">
                                        <a title="删除">
                                            <div class="delete" @click="folderStore.deleteFolder(item.folderId)"><svg-icon
                                                    class="icon" name="delete"></svg-icon></div>
                                        </a>
                                        <a title="收藏">
                                            <div class="delete" v-if="!item.collectType"
                                                @click=" (item.collectType = !item.collectType, folderStore.addCollect(item.folderId), folderStore.setCollectFolder())">
                                                <svg-icon class="icon" name="star"></svg-icon>
                                            </div>
                                        </a>
                                        <a title="取消收藏">
                                            <div class="delete" v-if="item.collectType"
                                                @click=" (item.collectType = !item.collectType, folderStore.addCollect(item.folderId), folderStore.setCollectFolder())">
                                                <svg-icon class="icon" name="collect"></svg-icon>
                                            </div>
                                        </a>


                                    </div>
                                </div>


                            </el-collapse-item>
                        </div>
                        <div class="li">
                            <el-collapse-item class="item" title="我的收藏" name="我的收藏"
                                @click="handleFolder($event.target.innerText)">
                                <div class="folder " v-for="(item, index) in folderStore.collect.folderList" :key="index"
                                    :id="item.folderId" @click.native="handleClick" @contextmenu.prevent="handleMenu"> <u
                                        class="folder" ref="folderItem" :id="item.folderId">{{ item.foldername }}</u>
                                    <!-- 取消收藏文件夹 -->
                                    <div class="delete-btn">
                                        <a title="取消收藏">
                                            <div class="delete" @click="deleteCollect(item.folderId)">
                                                <svg-icon class="icon" name="collect"></svg-icon>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </el-collapse-item>
                        </div>
                    </el-collapse>
                </div>

            </router-link>
            <router-link class="trash item" active-class="active" to="/trash" @click="showFolder = false">
                <i class="icon"><svg-icon class="tab-icon" name="trash" width="20px" height="20px"></svg-icon></i>
                <span>回收站</span>
            </router-link>
        </div>
    </div>
</template>
<style scope lang='less' scoped>
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

.leftBar {
    width: 260px;
    height: 100%;
    overflow-y: scroll;

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

svg {
    width: 20px;
    height: 20px;
    transform: translateY(2px);
}

.btn-box {
    margin-bottom: 30px;
}

.btn {
    span {
        pointer-events: none;
        color: #fff;
    }
}

.white-btn {
    margin-top: 12px;

    span {
        color: @button-color;
    }
}

// 路由
.item {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    width: @button-size;
    margin: 10px auto;
    padding: 0 10px 0 25px;
    text-decoration: none;
    border-radius: 6px;

    span {
        display: block;
        line-height: 50px;
        color: #9195a1;
        font-size: 14px;
        font-weight: 700;
    }

    ;
}

.myDoc .wrap {
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
    width: 100%;

}

.wrap {
    i> {
        pointer-events: none;
    }

    >span {
        pointer-events: none;
    }
}

.myDoc {
    display: block;
}

// 折叠面板样式
.demo-collapse {
    width: 100%;
    box-sizing: border-box;
    background-color: transparent;
}

.demo-collapse {
    padding-bottom: 10px;

    .item {
        display: block;
        position: relative;
        width: 100%;
        color: #9195a1;
        margin: 0;
    }
}

.item .li {
    position: relative;

    .folder {
        // 省略号
        display: flex;
        justify-content: space-between;
        padding: 0 6px;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        transition: all .1s;

        >u {
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            display: inline-block;
            line-height: 23px;
        }

        .delete-btn {
            display: flex;

            .delete {
                opacity: 0;
                width: 20px;
                height: 20px;
                margin-left: 4px;
                border-radius: 4px;
                text-align: center;
                transition: .1s all;

                // background-color: #fff;
                .icon {
                    transform: translate(-.5px, 1.5px)
                }
            }
        }

        .delete:hover {
            background-color: rgba(13, 13, 13, 0.06);
        }
    }

    .folder:hover .delete {
        opacity: 1;
    }
}

.item .addFolder {
    display: flex;
    justify-content: center;
    line-height: 18px;
    width: 18px;
    height: 18px;
    border-radius: 4px;
    position: absolute;
    z-index: 3;
    right: 6px;
    top: 6px;
    transition: .1s all;
}

.item .addFolder:hover {
    background-color: rgba(13, 13, 13, 0.06);
}

.current {
    color: @button-color;
}
</style>
<!-- 修改icon样式 -->
<style lang="less">
// 显示白色
.router-list {
    .active {
        background-color: @primaryLight;

        i.icon {
            background-color: @button-color;

            .tab-icon {
                svg {
                    transform: translateY(-22px);
                }
            }
        }

        span {
            color: @button-color;
        }

    }
}

// 显示灰色
.item {
    i.icon {
        overflow: hidden;
        display: flex;
        justify-content: space-around;
        align-content: space-around;
        flex-wrap: wrap;
        width: 28px;
        height: 28px;
        margin-right: 16px;
        border-radius: 10px;
        background-color: #ebebeb;

        .tab-icon {
            .svg {
                transform: translateY(2px);
                width: 16px;
                height: 16px;
                filter: drop-shadow(0px 24px 0 #fff);

            }
        }
    }
}

// 修改elementplus组件样式
.demo-collapse {
    .item {
        div {
            background-color: transparent;
        }
    }
}

.addFolder * {
    pointer-events: none;
}
</style>