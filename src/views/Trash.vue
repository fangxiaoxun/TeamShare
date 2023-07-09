<script lang='ts' setup>
import frame from '@/components/common/frame.vue';
type ATTR = {
    fileCount:number,
    position:string,
    author:string,
    time:string,
    operate:string
}

const attribute:ATTR ={
    fileCount:100,
    position:'我的文档',
    author:'',
    time:'1天前',
    operate:'还原'
}
</script>
<template>
    <!-- 传入文件显示类型 -->
<!-- <frame :attribute="attribute">
    <template v-slot:title>回收站</template>
    <template v-slot:item2>文件位置</template>
    <template v-slot:item3>删除时间</template>
    

    
</frame> -->
</template>
<style lang='less' scope>

</style>