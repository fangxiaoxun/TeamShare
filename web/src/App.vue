<template >
    <router-view></router-view>
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