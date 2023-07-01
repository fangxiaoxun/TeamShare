<template>
    <div class="board">
        <slot></slot>
        <div style="user-select: none;"></div>
    </div> 
        
</template>
          
<script lang="ts" setup>
     import {ref,onMounted,onUnmounted,toRefs} from 'vue'
    //  import {useMouse} from '../hooks/mouse'
</script>
          
<style lang="less">
    .board{
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        box-sizing: border-box;
        z-index: 1;
        background-color: @bgPrimary;
    }    
</style>