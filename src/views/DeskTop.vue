<script lang='ts' setup>

import frame from '@/components/common/frame.vue';
import { useFileStore } from '@/store/files';
const fileStore = useFileStore()
fileStore.setLatestFiles()
let latest = fileStore.getLatestFiles


</script>
<template>
    <!-- 传入文件显示类型 -->
<frame :fileList="latest.list" operate="分享" :fileCount="latest.list.length">
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