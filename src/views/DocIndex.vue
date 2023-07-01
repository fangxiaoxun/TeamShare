<template>
    <section class="part-1">
        <header>
            <div class="logo">
                <img src="../assets/yksg.svg">
                <h3>共享文档</h3>
            </div>
        </header>
        <div class="banner">
            <h1>使用 共享文档
                <!-- 不定标题 -->
                <span class="typed-text">{{ text }}</span>
                <span class="cursor"></span>
            </h1>
            <div class="banner-body">
                <Button class="enterBtn"></Button>
                <Button class="messageBtn"></Button>
            </div>
            
        
        </div>
    </section>
    <section class="part-2">
        <div class="container">
            <h3>在共享文档，搭建你自己的工作流</h3>
            <ul class="tab-list" >
                <li v-for="item in tabArr">
                    <span>{{ item.name }}</span>
                    <img :src="item.url">
                </li>
            </ul>
        </div>
    </section>
</template>
          
<script lang="ts" setup>

import { ref } from 'vue'
import Button from '../components/Index/Button.vue'
let title: string[] = ['思考与创作', '团队协作', '高效工作']
let text = ref<string>('')
let index: number = 0
let i: number = 0
let timer: NodeJS.Timeout | null = null
let popTimer: NodeJS.Timeout | null = null
function type(): void {
    if (text.value === title[i]) {
        console.log('yimer', i);
        clearInterval(Number(timer))
        popTimer = setInterval(popText, 250)

    } else {
        console.log('title', i);
        text.value = title[i].substring(0, index++)
    }
    console.log(text.value);
}
function popText(): void {
    if (text.value === '') {
        clearInterval(Number(popTimer))
        console.log('i', i);
        i++
        i = i >= title.length ? i % title.length : i
        timer = setInterval(type, 250)
    } else {
        text.value = title[i].substring(0, index--)
    }
}
timer = setInterval(type, 250)

let tabArr:{
    url:string,
    name:string
}[]= [
    {url:"src/assets/switch-table-1.svg",name:'自由画板'},
    {url:"src/assets/switch-table-2.svg",name:'轻文档'},
    {url:"src/assets/switch-table-3.svg",name:'留言墙'}
]




function changeTab():void {

}
</script>
          
<style lang="less" scoped>
section.part-1 {
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
            background-color: #832fff;
            margin-left: 1rem;
            width: 3px;
            height: 69px;
            animation: blink 1s infinite;
            position: relative;
            top: 10px;
        }
    }

   .banner-body{
        display: flex;
        justify-content: space-between;
        width: 450px;
        height: 100px;
        margin: 150px auto;
   }
}


@keyframes blink {
    0% {
        background-color: #832fff;
    }

    49% {
        background-color: #832fff;
    }

    50% {
        background-color: transparent;
    }

    99% {
        background-color: transparent;
    }

    100% {
        background-color: #832fff;
    }
}

section.part-2{
    width: 100%;
    height: 773px;
    padding: 120px 0;
    background: #1e192c;
    border-radius: 40px;
    .container{
        width: 1200px;
        margin: 0 auto;
        h3{
            font-size: 50px;
            color: #fff;
            font-weight: 600;
            line-height: 50px;
            text-align: center;
        }
        ul.tab-list{
            min-height: 44px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 60px 0 51px;
            li{
                color: rgba(255,255,255,.6);
                margin: 0 60px;
                cursor: pointer;
                position: relative;
                transition: all .2s;
                white-space: nowrap;
                span{
                    font-size: 16px;
                    position: relative;
                    z-index: 1;
                }

                &:hover span{
                    color: #fff;
                }
                img{
                    opacity: 0;
                    position: absolute;
                    right: -7px;
                    top: -10px;
                    z-index: 0;
                    transition: all .2s;
                }
                &:hover img{
                    opacity: 1;
                }
            }
            li.active{
                color: #fff;
                img{
                    opacity: 1;
                }
            }

           

    
        }
    }
}

</style>