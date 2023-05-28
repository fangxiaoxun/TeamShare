<script lang='ts' setup>
import frame from '@/components/common/frame.vue';
</script>
<template>
    <!-- 传入文件显示类型 -->
<frame :fileCount="100" :position="``" :author="`我的文档`" :time="`1天前`" :operate="`还原`">
    <template v-slot:title>回收站</template>
    <!-- <template v-slot:item1>文件位置</template> -->
    <template v-slot:item2>文件位置</template>
    <template v-slot:item3>删除时间</template>
    

    
</frame>
</template>
<style lang='less' scope>

</style>