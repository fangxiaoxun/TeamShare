<script lang='ts' setup>
import { defineComponent } from 'vue';

        const message = '这是父组件';
        const method =() => {
            console.log("这是我的父组件")
        }
</script>
<template>
    <h1 @click="method">{{ message }}</h1>
</template>
<style lang='less' scope>

</style>