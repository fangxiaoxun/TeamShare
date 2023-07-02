<template>
    <div class="toolbar">
        <slot></slot>
    </div>
</template>
          
<script lang="ts" setup>

</script>
          
<style lang="less" scoped>
.toolbar {
    position: relative;
    margin: 0 auto;
    width: 488px;
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px;
    border-radius: 8px;
    box-sizing: border-box;
    background-color: #fffffff5;
    box-shadow: 0px 7px 14px rgba(0, 0, 0, .05), 0px 0px 3.12708px rgba(0, 0, 0, .08), 0px 0px 0.931014px rgba(0, 0, 0, .17);
    ;
    z-index: 5;

    
}
</style>