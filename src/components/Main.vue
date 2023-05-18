<script lang='ts' setup>
import LeftBar from './LeftBar.vue';
</script>
<template>
    <div class="container">
        <LeftBar></LeftBar>
        <div class="rightBar">
            <router-view></router-view>
        </div>
    </div>
</template>
<style scoped lang='less'>
.container {
    width: 100%;
    // 高度待定
    height: 90vh;
    display: flex;
    background-color: @bgColorBase;
}

.rightBar {
    width: calc(~"100% - @{leftBar-size}");
    // height: calc(~"100% - @{topBar-size}");
    height: 100%;
    margin-right: 40px;
    background-color: #fff;
    border-radius: 8px 8px 0 0;
    box-shadow: 0 1px 4px rgba(13, 13, 13, .1);
}
</style>