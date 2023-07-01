<template>
  <section>
    <header>
        <button class="more">
            <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 24 24" class="" fill="none" stroke-width="2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><g stroke-width="1.5"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="18" x2="20" y2="18"></line></g></svg>
        </button>
        
        <ToolBar></ToolBar>

        <button class="collaborate" title="实时协作">
            <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 24 24" class="" fill="none" stroke-width="2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><g stroke-width="1.5"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><circle cx="9" cy="7" r="4"></circle><path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path><path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path></g></svg>
        </button>
    </header>
    <BaseBoard></BaseBoard>
  </section>        
</template>
          
<script lang="ts" setup>
    import {ref, onMounted, onUnmounted, watch} from "vue"
    import ToolBar from '../components/draw/ToolBar.vue'    
    import BaseBoard from '@/components/draw/BaseBoard.vue';

    // type shapeType = "rect" | "circle | "line";

    // interface IBaseShapeProp {
    //     type: shapeType
    //     key: string
    //     style: any
    // }

   

    
</script>
          
<style lang="less" scoped>
    section{
        width: 100%;
        height: 100%;
        // padding: 16px;
        box-sizing: border-box;
        background-color: @bgPrimary;

        header{
            height: 60px;
            width: 100%;
            padding: 16px;
            background-color: palegoldenrod;
            display: flex;
            justify-content: space-between;
            box-sizing: border-box;
            .more{
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 36px;
                height: 36px;
                border-radius: 8px;
                background-color: rgba(255, 255, 255, 0.96);
                border:1px solid rgb(214, 214, 214);
                z-index: 5;

                svg{
                    height: 0.9rem;
                    width: 0.9rem;
                    stroke: rgb(61,61,61);
                    
                }

                &:hover{
                    background-color: #f5f5f5;
                    cursor: pointer;
                }
            }

            .collaborate{
                position: relative;
                display: flex;
                justify-content: center;
                align-items: center;
                width: 36px;
                height: 36px;
                margin-right: 90px;
                background-color: @button-color;
                border-radius: 8px;
                z-index: 5;
                svg{
                    height: 1rem;
                    width: 1rem;
                    color: #fff;
                }

                &:hover{
                    background-color: @button-hover-color;
                    cursor: pointer;
                }

            }
        }
    }         
</style>