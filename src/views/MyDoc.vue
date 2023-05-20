<script lang='ts' setup>
import frame from '@/components/common/frame.vue';
import file from './file.vue';
</script>
<template>
<frame :fileCount="100">
    <template v-slot:title>最近</template>
    <template v-slot:item1>文件位置</template>
    <template v-slot:item2>创建者</template>
    <template v-slot:item3>最后修改</template>
    <template v-slot:file>
        <file v-for="index in 100"></file>
    </template>

    
</frame>
</template>
<style lang='less' scope>

</style>