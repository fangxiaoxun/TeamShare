<template>
    <section>
        <header>
            <button class="more">
                <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 24 24" class="" fill="none"
                    stroke-width="2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                    <g stroke-width="1.5">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <line x1="4" y1="6" x2="20" y2="6"></line>
                        <line x1="4" y1="12" x2="20" y2="12"></line>
                        <line x1="4" y1="18" x2="20" y2="18"></line>
                    </g>
                </svg>
            </button>

            <ToolBar>
                <div class="toolList">
                    <label title="绘制后保持所选工具栏状态">
                        <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 20 20" class="" fill="none"
                            stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                            <g>
                                <path
                                    d="M13.542 8.542H6.458a2.5 2.5 0 0 0-2.5 2.5v3.75a2.5 2.5 0 0 0 2.5 2.5h7.084a2.5 2.5 0 0 0 2.5-2.5v-3.75a2.5 2.5 0 0 0-2.5-2.5Z"
                                    stroke="currentColor" stroke-width="1.25"></path>
                                <path d="M10 13.958a1.042 1.042 0 1 0 0-2.083 1.042 1.042 0 0 0 0 2.083Z"
                                    stroke="currentColor" stroke-width="1.25"></path>
                                <mask id="UnlockedIcon" maskUnits="userSpaceOnUse" x="6" y="1" width="9" height="9"
                                    style="mask-type: alpha;">
                                    <path stroke="none"
                                        d="M6.399 9.561V5.175c0-.93.401-1.823 1.116-2.48a3.981 3.981 0 0 1 2.693-1.028c1.01 0 1.98.37 2.694 1.027.715.658 1.116 1.55 1.116 2.481"
                                        fill="#fff"></path>
                                </mask>
                                <g mask="url(#UnlockedIcon)">
                                    <path stroke="none"
                                        d="M5.149 9.561v1.25h2.5v-1.25h-2.5Zm5.06-7.894V.417v1.25Zm2.559 3.508v1.25h2.5v-1.25h-2.5ZM7.648 8.51V5.175h-2.5V8.51h2.5Zm0-3.334c0-.564.243-1.128.713-1.561L6.668 1.775c-.959.883-1.52 2.104-1.52 3.4h2.5Zm.713-1.561a2.732 2.732 0 0 1 1.847-.697v-2.5c-1.31 0-2.585.478-3.54 1.358L8.36 3.614Zm1.847-.697c.71 0 1.374.26 1.847.697l1.694-1.839a5.231 5.231 0 0 0-3.54-1.358v2.5Zm1.847.697c.47.433.713.997.713 1.561h2.5c0-1.296-.56-2.517-1.52-3.4l-1.693 1.839Z"
                                        fill="currentColor"></path>
                                </g>
                            </g>
                        </svg>
                    </label>
                    <!-- 分割线 -->
                    <div class="divide"></div>
                    <label class="ToolIcon Shape fillable" title="选择 — V 或 1"><svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 22 22" class="" fill="none" stroke-width="1.25"><g stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M6 6l4.153 11.793a0.365 .365 0 0 0 .331 .207a0.366 .366 0 0 0 .332 -.207l2.184 -4.793l4.787 -1.994a0.355 .355 0 0 0 .213 -.323a0.355 .355 0 0 0 -.213 -.323l-11.787 -4.36z"></path><path d="M13.5 13.5l4.5 4.5"></path></g></svg></label>
                    <label title="矩形" ref="tool">
                        <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 24 24" class="" fill="none"
                            stroke-width="2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                            <g stroke-width="1.5">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <rect x="4" y="4" width="16" height="16" rx="2"></rect>
                            </g>
                        </svg>
                    </label>
                    <label class="ToolIcon Shape fillable" title="菱形 — D 或 3"><svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 24 24" class="" fill="none" stroke-width="2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><g stroke-width="1.5"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M10.5 20.4l-6.9 -6.9c-.781 -.781 -.781 -2.219 0 -3l6.9 -6.9c.781 -.781 2.219 -.781 3 0l6.9 6.9c.781 .781 .781 2.219 0 3l-6.9 6.9c-.781 .781 -2.219 .781 -3 0z"></path></g></svg></label>
                    <label class="ToolIcon Shape fillable" title="椭圆 — O 或 4"><svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 24 24" class="" fill="none" stroke-width="2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><g stroke-width="1.5"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><circle cx="12" cy="12" r="9"></circle></g></svg></label>
                    <label class="ToolIcon Shape fillable" title="箭头 — A 或 5"><svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 24 24" class="" fill="none" stroke-width="2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><g stroke-width="1.5"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><line x1="5" y1="12" x2="19" y2="12"></line><line x1="15" y1="16" x2="19" y2="12"></line><line x1="15" y1="8" x2="19" y2="12"></line></g></svg></label>
                    <label class="ToolIcon Shape fillable" title="线条 — L 或 6"><svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 20 20" class="" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M4.167 10h11.666" stroke-width="1.5"></path></svg></label>
                    <label class="ToolIcon Shape" title="自由书写 — P 或 7"><svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 20 20" class="" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><g stroke-width="1.25"><path clip-rule="evenodd" d="m7.643 15.69 7.774-7.773a2.357 2.357 0 1 0-3.334-3.334L4.31 12.357a3.333 3.333 0 0 0-.977 2.357v1.953h1.953c.884 0 1.732-.352 2.357-.977Z"></path><path d="m11.25 5.417 3.333 3.333"></path></g></svg></label>
                    <label class="ToolIcon Shape" title="文字 — T 或 8"><svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 24 24" class="" fill="none" stroke-width="2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><g stroke-width="1.5"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><line x1="4" y1="20" x2="7" y2="20"></line><line x1="14" y1="20" x2="21" y2="20"></line><line x1="6.9" y1="15" x2="13.8" y2="15"></line><line x1="10.2" y1="6.3" x2="16" y2="20"></line><polyline points="5 20 11 4 13 4 20 20"></polyline></g></svg></label>
                    <label class="ToolIcon Shape" title="插入图像 — 9"><svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 20 20" class="" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><g stroke-width="1.25"><path d="M12.5 6.667h.01"></path><path d="M4.91 2.625h10.18a2.284 2.284 0 0 1 2.285 2.284v10.182a2.284 2.284 0 0 1-2.284 2.284H4.909a2.284 2.284 0 0 1-2.284-2.284V4.909a2.284 2.284 0 0 1 2.284-2.284Z"></path><path d="m3.333 12.5 3.334-3.333c.773-.745 1.726-.745 2.5 0l4.166 4.166"></path><path d="m11.667 11.667.833-.834c.774-.744 1.726-.744 2.5 0l1.667 1.667"></path></g></svg></label>
                    <!-- 分割线 -->
                    <div class="divide"></div>
                    <label class="ToolIcon Shape" title="橡皮 — E 或 0"><svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 24 24" class="" fill="none" stroke-width="2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><g stroke-width="1.5"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><path d="M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9.2 9.3"></path><path d="M18 13.3l-6.3 -6.3"></path></g></svg></label>
                </div>
            </ToolBar>

            <button class="collaborate" title="实时协作">
                <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 24 24" class="" fill="none"
                    stroke-width="2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                    <g stroke-width="1.5">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                        <circle cx="9" cy="7" r="4"></circle>
                        <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"></path>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                        <path d="M21 21v-2a4 4 0 0 0 -3 -3.85"></path>
                    </g>
                </svg>
            </button>
        </header>
        <BaseBoard></BaseBoard>
    </section>
</template>
          
<script lang="ts" setup>
import { ref, onMounted, onUnmounted, watch } from "vue"
import ToolBar from '../components/common/ToolBar.vue'
import BaseBoard from '@/components/draw/BaseBoard.vue';

    // type shapeType = "rect" | "circle | "line";

    // interface IBaseShapeProp {
    //     type: shapeType
    //     key: string
    //     style: any
    // }




</script>
          
<style lang="less" scoped>
section {
    width: 100%;
    height: 100%;
    // padding: 16px;
    box-sizing: border-box;
    background-color: @bgPrimary;

    header {
        height: 60px;
        width: 100%;
        padding: 16px;
        background-color: palegoldenrod;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;

        .more {
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 36px;
            height: 36px;
            border-radius: 8px;
            background-color: rgba(255, 255, 255, 0.96);
            border: 1px solid rgb(214, 214, 214);
            z-index: 5;

            svg {
                height: 0.9rem;
                width: 0.9rem;
                stroke: rgb(61, 61, 61);

            }

            &:hover {
                background-color: #f5f5f5;
                cursor: pointer;
            }
        }

        .collaborate {
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 36px;
            height: 36px;
            margin-right: 90px;
            background-color: @primary-color;
            border-radius: 8px;
            z-index: 5;

            svg {
                height: 1rem;
                width: 1rem;
                color: #fff;
            }

            &:hover {
                background-color: @button-hover-color;
                cursor: pointer;
            }

        }

        .toolList {
            display: flex;
            font-family: Assistant, system-ui, BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif;

            label {
                position: relative;
                width: 36px;
                height: 36px;
                margin-right: 5px;
                border-radius: 0.5rem;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;

                &:hover {
                    background-color: #f5f5f5;
                }

                &:active {
                    background-color: @primaryLight;
                }

                svg {
                    width: 1rem;
                    height: 1rem;
                    color: #3d3d3d;
                }
            }

            .divide {
                align-self: center;
                background-color: #d6d6d6;
                width: 0.5px;
                height: 24px;
                margin: 0 0.5rem;
            }
        }
    }
}</style>