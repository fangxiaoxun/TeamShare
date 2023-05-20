<template>
    <header>
        <div class="logo">
            <img src="../assets/yksg.svg">
            <h3>共享文档</h3>
        </div>
        <div class="search" v-click-outside="onClickOutside">
            <svg t="1683549413993" class="icon search-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2751" width="200" height="200"><path d="M888.6 851.9L669.1 632.5c44.9-53.3 72-122.1 72-197 0-169-137.5-306.6-306.5-306.6S128 266.4 128 435.4 265.5 742 434.5 742c75.9 0 145.3-27.8 198.9-73.6l219.3 219.3c4.9 4.9 11.4 7.4 17.9 7.4 6.5 0 13-2.5 17.9-7.4 10-9.9 10-25.9 0.1-35.8z m-710-416.5c0-141.1 114.8-255.9 255.9-255.9s255.9 114.8 255.9 255.9c0 141.1-114.8 255.9-255.9 255.9S178.6 576.6 178.6 435.4z" p-id="2752" fill="#3b73f0"></path></svg>
            <input type="text" class="search-input" placeholder="搜索文件名">
            <!-- 二级导航 -->
            <div class="search-menu">

            </div>
        </div>
        <div class="user"></div>
    </header>
</template>
          
<script lang="ts" setup>
import { onClickOutside } from '../../hooks/clickOutside'
   
</script>
          
<style lang="less" scoped>
header {
    width: 100%;
    height: 70px;
    background-color: @bgColorBase;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .logo {
        display: flex;
        align-items: center;
        // background-color: aquamarine;

        h3 {
            font-size: 20px;
            padding-left: 10px;
            font-weight: 600;
        }
    }

    .search {
        position: relative;
        height: 40px;
        width: 483px;
        border-radius: 12px;
        padding: 0 40px 0 12px;
        background-color: #fff;
        border: 1.5px solid transparent;

        &:hover,&.active {
            border: 1.5px solid @button-color;
        }

        .search-icon{
            height: 24px;
            width:24px;
            position: absolute;
            left: 10px;
            top: 7.5px;
        }

        .search-input{
            font-size: 15px;
            margin-left: 13px;
            padding: 0 13px;
            width: 100%;
            height: 100%;
            // background-color: aquamarine;
            border: none;
            border-top-right-radius: 12px;
            border-bottom-right-radius: 12px;
        }

        .search-menu{
            display: none;
            position: absolute;
            left: 0;
            top: 48px;
            width: 100%;
            height: 650px;
            border: 1px solid rgba(8,14,23,.12);
            box-shadow: 0px 12px 32px rgba(13,13,13,0.08);
            border-radius: 8px;
            background-color: rgb(255,255,255);
        }
        &.active .search-menu{
            display: block;
        }

    }
}</style>