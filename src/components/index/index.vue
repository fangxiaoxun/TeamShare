<template>
    <div class="part-1">
        <header>
            <div class="logo">
                <img src="../../assets/yksg.svg">
                <h3>共享文档</h3>
            </div>
        </header>
    </div>
</template>
          
<script lang="ts" setup>

</script>
          
<style lang="less" scoped>
div.part-1 {
    width: 100vw;
    height: 100vh;
    background-color: #f5faff;

    header {
        width: 100%;
        height: 70px;
        // background-color: @bgColorBase;
        display: flex;
        justify-content: space-around;
        align-items: center;
        z-index: 3000;

        .logo {
            display: flex;
            align-items: center;

            h3 {
                font-size: 20px;
                padding-left: 10px;
                font-weight: 600;
            }
        }
    }
}
</style>