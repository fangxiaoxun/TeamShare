<template>
    <div class="filewrap" @click="hanldSelected()" :class="{selected: isCheck}" ref="FILE" :collectType=collectType>
        <div class="filename">
            <div class="checkBox">
                <div class="border" v-show="isCheck">
                    <div class="label"></div>
                </div>
            </div>
            <div class="fileicon"> <svg-icon name="doc" width="24px" height="24px"></svg-icon></div>
            <span><span @click="hanldeEnter">
                    <slot name="fileName"></slot>
                </span></span>
            <div class="star" v-show="props.isCollect" @click="handleCollect" v-if="collectType"><svg-icon
                    name="collect"></svg-icon></div>
            <div class="star" @click="handleCollect" v-show="props.isCollect" v-if="!collectType"><svg-icon
                    name="star"></svg-icon></div>
        </div>
        <div class="position"><span>
                <slot name="li1"></slot>
            </span></div>
        <div class="author"><span>
                <slot name="li2"></slot>
            </span></div>
        <div class="latest"><span>
                <slot name="li3"></slot>
            </span></div>
        <div class="button-box">
            <div class="operate btn" @click="handleRecover"><span>
                    <slot name="operate"></slot>
                </span></div>
            <div class="delete btn" @click="handleDelete"><span><svg-icon name="delete" width="24px"
                        height="24px"></svg-icon></span></div>
        </div>
    </div>
</template>
<script lang='ts' setup>
import { ref, inject } from 'vue';
import router from '@/router/index';
let isCheck = ref<boolean>(false);
const FILE = ref<HTMLElement>(document.createElement('div'));
import { useFileStore } from '@/store/files1';
import { useInfo } from '@/store/user'
const userInfo = useInfo()
const fileStore = useFileStore()
const props = defineProps(['isCollect', 'collectType'])
const collectType = ref<boolean>(props.collectType)
const hanldSelected = (): void => {
    isCheck.value = !isCheck.value
}

const hanldeEnter = () => {
    fileStore.setFileInfo(FILE.value.getAttribute('folderid')!,FILE.value.getAttribute('fileid')!, FILE.value.getAttribute('filename')!)
    const content = fileStore.getFileContent(FILE.value.getAttribute('fileid')!);
    // if(content?.length){
        userInfo.setCurrConten(content)
    // }
    router.push('/docView')
}


interface injectData {
    RECOVER: (id: string | null, type: string) => void;
    SHARE: () => void;
    DELETE: (fileId: string, folderId?: string) => void
}

// 接收来自父组件的 recover 对象
const OPERATE: injectData | undefined = inject('operate')
const handleRecover = (): void => {
    const id = FILE.value.getAttribute('fileId') ? FILE.value.getAttribute('fileId') : FILE.value.getAttribute('folderId')
    const type = FILE.value.getAttribute('fileId') ? 'file' : 'folder'
    if (OPERATE?.RECOVER) {
        OPERATE.RECOVER(id, type)
    } else if (OPERATE?.SHARE) {
        OPERATE.SHARE()
    }
}

const handleDelete = (): void => {
    const fileId = FILE.value.getAttribute('fileId')!;
    const folderId = FILE.value.getAttribute('folderId')!;
    if (OPERATE?.DELETE) {
        OPERATE.DELETE(fileId, folderId)
    }
}
const handleCollect = (e: MouseEvent): void => {
    collectType.value = !collectType.value
    const fileId = FILE.value.getAttribute('fileId')!
    if (FILE.value.getAttribute('collectType') === 'false' || FILE.value.getAttribute('collectType') === '0') {
        fileStore.addCollect(fileId)
    } else {
        fileStore.deleteCollect(fileId)
    }
}
// 监听

</script>
<style scope lang='less' scoped>
span {
    font-size: 14px;
    cursor: pointer;
    color: rgba(13, 13, 13, .9);
}

.filewrap:hover {
    background-color: rgba(13, 13, 13, .06);
}

.filewrap:hover .star,
.filewrap:hover .button-box {
    opacity: 1;
}

.filewrap::after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    width: calc(100% - 13px);
    height: 0.8px;
    margin: 0 auto;
    background-color: #e7e9eb;
    ;
}

.filewrap {
    position: relative;
    display: flex;
    align-items: center;
    height: 56px;
    padding: 10px 10px;
    padding-right: 30px;
    // padding-bottom: 10px;
    margin-right: 36px;
    border-radius: 8px;

}

.filewrap.selected {
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
    background-color: rgba(13, 13, 13, .06);
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

.fileicon {
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
    border: 1px solid @button-color;

}

.checkBox:hover {
    border-color: @button-color;
}

.checkBox .label {
    position: relative;
    left: 6px;
    top: 2px;
    width: 3px;
    height: 8px;
    border: 2px solid @button-color;
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
        // line-height: 20px;
    }
}

.btn {
    padding: 8px 15px;
    background-color: @button-color;
    border-radius: 6px;

}

.delete {
    padding: 8px 10px;
    background-color: transparent;
}

.delete:hover,
.delete:active {
    background-color: @primaryLight;
}

.operate:hover,
.operate:active {
    background-color: @button-hover-color;
}
</style>