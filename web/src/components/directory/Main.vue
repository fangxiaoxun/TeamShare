<!--
 * @Author: fangxiaoxun 1272449367@qq.com
 * @Date: 2023-07-13 02:49:58
 * @LastEditors: fangxiaoxun 1272449367@qq.com
 * @LastEditTime: 2025-02-23 11:48:32
 * 
-->
<script lang="ts" setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import LeftBar from './LeftBar.vue'
const route = useRoute()
</script>
<template>
    <div class="outer">
        <LeftBar></LeftBar>
        <div class="page container h-full max-h-full pt-[24px] pl-[50px] mr-[40px]">
            <h3 class="font-bold text-[24px] text-slate-800 mb-[30px]">
                {{ route.meta.title }}
            </h3>
            <router-view></router-view>
        </div>
    </div>
</template>
<style scoped lang="less">
.outer {
    width: 100%;
    // 高度待定
    height: 90vh;
    display: flex;
}

.page {
    width: calc(~'100% - @{leftBar-size}');
    background-color: #fff;
    border-radius: 8px 8px 0 0;
    box-shadow: 0 1px 4px rgba(13, 13, 13, 0.1);
}
</style>
