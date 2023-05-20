<template>
    <h1>测试axios二次封装</h1>
    <el-button type="primary" size="default">主要按钮</el-button>
    <ul v-infinite-scroll="load" infinite-scroll-distance=1 class="infinite-list" style="overflow: auto">
        <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>
    </ul>
</template>
<script lang='ts' setup>
import request from '@/utils/request';
import { onMounted } from 'vue';
import { ref } from 'vue';
const count = ref<number>(0)
const load = (): void => {
    console.log('执行了load函数')
    count.value += 2
}
// 发送请求
onMounted(() => {
    // request({
    //     url: 'https://mock.apifox.cn/m1/2733445-0-default/user/info',
    //     method: 'post',
    //     data:{
    //         userId: '111111'
    //     }
    // }).then((res) => {
    //     console.log(res)
    // })

    request({
        url: 'https://mock.apifox.cn/m1/2733445-0-default/directory/latest',
        method: 'get',

    }).then((res) => {
        console.log(res)
    })
})
</script>
<style scope lang='less' scoped>
.infinite-list {
    height: 300px;
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

.infinite-list .infinite-list-item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    background: var(--el-color-primary-light-9);
    margin: 10px;
    color: var(--el-color-primary);
}

.infinite-list .infinite-list-item+.list-item {
    margin-top: 10px;
}</style>