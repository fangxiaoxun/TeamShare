<template>
    <div class="part-1">
        <header>
            <div class="logo">
                <img src="../assets/yksg.svg">
                <h3>共享文档</h3>
            </div>
        </header>
        <section class="banner">
            <h1>使用 共享文档
                <!-- 不定标题 -->
                <span class="typed-text">{{ text }}</span>
                <span class="cursor"></span>
            </h1>

            <router-link to="/directory">立刻使用</router-link>
        
        </section>
    </div>
</template>
          
<script lang="ts" setup>

import { ref } from 'vue'
let title: string[] = ['思考与创作', '团队协作', '高效工作']
let text = ref<string>('')
let index: number = 0
let i: number = 0
let timer: NodeJS.Timeout | null = null
let popTimer: NodeJS.Timeout | null = null
function type(): void {
    if (text.value === title[i]) {
        // console.log('yimer', i);
        clearInterval(Number(timer))
        popTimer = setInterval(popText, 250)

    } else {
        // console.log('title', i);
        text.value = title[i].substring(0, index++)
    }
    // console.log(text.value);
}
function popText(): void {
    if (text.value === '') {
        clearInterval(Number(popTimer))
        // console.log('i', i);
        i++
        i = i >= title.length ? i % title.length : i
        timer = setInterval(type, 250)
    } else {
        text.value = title[i].substring(0, index--)
    }
}
timer = setInterval(type, 250)
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
        // justify-content: space-around;
        align-items: center;
        z-index: 3000;

        .logo {
            display: flex;
            align-items: center;
            margin-left: 100px;

            h3 {
                font-size: 20px;
                padding-left: 10px;
                font-weight: 600;
            }
        }
    }

    .banner h1 {
        margin: 250px auto 0;
        width: fit-content;
        color: rgb(0, 0, 0);
        font-weight: 700;
        font-size: 72px;
        font-family: -apple-system, 'Open Sans', 'Helvetica Neue', sans-serif;

        .typed-text {
            color: #565dff;
        }

        .cursor {
            display: inline-block;
            background-color: #565dff;
            margin-left: 1rem;
            width: 1px;
            height: 69px;
            animation: blink 1s infinite;
            position: relative;
            top: 10px;
        }
    }
}

@keyframes blink {
    0% {
        background-color: #565dff;
    }

    49% {
        background-color: #565dff;
    }

    50% {
        background-color: transparent;
    }

    99% {
        background-color: transparent;
    }

    100% {
        background-color: #565dff;
    }
}
</style>