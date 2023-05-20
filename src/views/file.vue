<template>
    <div class="filewrap">
        <div class="filename">
            <div class="checkBox" @click="isCheck = !isCheck">
                <!-- <input type="checkbox" id="checked" @click=" isCheck = !isCheck"> -->
                <div class="border" v-show="isCheck"><div class="label"></div></div>
            </div>
            <div class="fileicon"> <svg-icon name="doc" width="24px" height="24px"></svg-icon></div>
            <span>文件名</span>
            <div class="star"><svg-icon name="star"></svg-icon></div>
        </div>
        <div class="position"><span>我的文档</span></div>
        <div class="author"><span>我</span></div>
        <div class="latest"><span>1天前</span></div>
    </div>
</template>
<script lang='ts' setup>
import { ref } from 'vue';
const isCheck = ref<boolean>(false);
</script>
<style scope lang='less' scoped>
span {
    font-size: 14px;
    cursor: pointer;
    color: rgba(13, 13, 13, .9);
}
.filewrap:hover{
    background-color: rgba(13,13,13,.06);
}
.filewrap {
    display: flex;
    align-items: center;
    height: 56px;
    padding: 0 10px;
    margin-bottom: 10px;
    border-radius: 8px;
}

.filename {
    flex: 4;
    display: flex;
    transform: translateY(2px);
}
.star{
    margin-left: 10px;
}
.position,
.author {
    flex: 1;
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
.border{
    border-radius: 2px;
    left: -1px;
    top: -1px;
    position: absolute;
    width: 16px;
    height: 16px;
    border: 1px solid @button-color;

}
.checkBox:hover{
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
</style>