<template >
    <!-- <Directory></Directory> -->
    <router-view @click="{leftMenu = false; rightMenu = false}"></router-view>
</template>
<script lang="ts" setup>
import { provide } from 'vue';
import { ref } from 'vue';
const leftMenu = ref<boolean>(false)
const rightMenu = ref<boolean>(false)

provide('showMenu', {
    leftMenu:leftMenu,
    rightMenu:rightMenu
})

</script>

<style lang="less" scoped>
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    color: #333;
}
</style>
