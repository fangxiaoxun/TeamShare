<template>
    <div class="wrapper">
        <div class="title"><h3>最近</h3><i class="icon"></i></div>
        <div class="file-list">
            <div class="desc">
                <div class="type">类型</div>
                <div class="position"><span>文件位置</span></div>
                <div class="author"><span>创建者</span></div>
                <div class="latest"><span>最后修改</span></div>
            </div>
            <file></file>
            <file></file>
        </div>
    </div>
</template>
<script lang="ts" setup>
import file from './file.vue';
</script>
<style lang="less" scoped>
span{
    font-size: 14px;
    color: rgba(13,13,13,.9);
}
.wrapper{
    padding: 24px 48px 0 48px;
}
.title{
    padding-bottom: 18px;
    h3{
        line-height: 32px;
    }
}
.desc{
    position: relative;
    display: flex;
    padding-bottom: 10px;
    border-bottom: 2px solid rgba(13,13,13,.06);
    .type{
        // width: 50%;
        flex: 4;
    }
    .position,.author{
        // width: 12.5%;
        flex: 1;
    }
    .latest{
        // width: 25%;
        flex: 2;
    }
    
}
</style>