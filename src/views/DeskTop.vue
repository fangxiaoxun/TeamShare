<script lang='ts' setup>
import frame from '@/components/common/frame.vue';
</script>
<template>
    <!-- 传入文件显示类型 -->
<frame :fileCount="100" :position="`我的文档`" :author="`我`" :time="`1天前`" :operate="`分享`">
    <template v-slot:title>最近</template>
    <template v-slot:item1>文件位置</template>
    <template v-slot:item2>创建者</template>
    <template v-slot:item3>最后修改</template>
    <template v-slot:file>
    </template>

    
</frame>
</template>
<style lang='less' scope>

</style>