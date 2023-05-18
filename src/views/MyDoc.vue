<template>
    <div>
        <el-button type="primary" size="default" :icon="Plus">主要按钮</el-button>
        <el-button type="success" size="default" :icon="Edit">主要按钮</el-button>
        <svg-icon name="phone"></svg-icon>
    </div>
</template>
<script lang='ts' setup>
import { Edit, Plus } from '@element-plus/icons-vue';

</script>
<style scope lang='less' scoped>

</style>