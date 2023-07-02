<template>
    <section>
        <header>
            <TopBar>
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
                    <label title="增大字号 ctrl+]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M11.895 5h-1.789L5 19h1.493l1.459-4h6.098l1.459 4h1.493L11.895 5zm1.68 8.7l-2.574-7.06-2.575 7.06h5.15z"
                                fill="#454D5A"></path>
                            <path d="M17.351 5.35h1.3v2.5h2.35v1.3h-2.35v2.2h-1.3v-2.2h-2.35v-1.3h2.35v-2.5z"
                                fill="#454D5A"></path>
                        </svg>
                    </label>
                    <label title="减小字号 ctrl+[" ref="tool">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M11.895 5h-1.789L5 19h1.493l1.459-4h6.098l1.459 4h1.493L11.895 5zm1.68 8.7l-2.574-7.06-2.575 7.06h5.15z"
                                fill="#454D5A"></path>
                            <path d="M21.001 7.85h-6v1.3h6v-1.3z" fill="#454D5A"></path>
                        </svg>
                    </label>
                    <label title="加粗 ctrl+B">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M8.3 6.8h4.2a2.2 2.2 0 010 4.4H8.3V6.8zM7 5.5h5.5a3.5 3.5 0 012.34 6.103 3.75 3.75 0 01-1.59 7.147H7V5.5zm1.3 7.05h4.95a2.45 2.45 0 110 4.9H8.3v-4.9z"
                                fill="#454D5A"></path>
                        </svg>
                    </label>
                    <label title="斜体 ctrl+I">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M10 6.375c0-.345.28-.625.625-.625h5.25a.625.625 0 110 1.25h-1.708l-3.334 10h2.042a.625.625 0 110 1.25h-5.75a.625.625 0 110-1.25h2.208l3.334-10h-2.042A.625.625 0 0110 6.375z"
                                fill="#454D5A"></path>
                        </svg>
                    </label>
                    <label title="下划线 ctrl+U">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M18 18.3v1.3H5v-1.3h13zM8.4 5v7.5a3.1 3.1 0 002.924 3.095l.176.005a3.1 3.1 0 003.095-2.924l.005-.176V5H16v7.5a4.5 4.5 0 11-9 0V5h1.4z"
                                fill="#454D5A"></path>
                        </svg>
                    </label>
                    <label title="突出显示">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M19.454 8.666L11.48 4.062a.46.46 0 00-.63.168l-4.603 7.975a.46.46 0 00.168.629l1.963 1.133L6 18.086h5.774l.934-1.619 1.682.971a.46.46 0 00.629-.168l4.604-7.975a.46.46 0 00-.169-.629zm-11.73 3.48l3.814-6.607 6.607 3.814-3.814 6.607-6.607-3.814z"
                                fill="#454D5A"></path>
                        </svg>
                        <div class="high-light"></div>
                    </label>
                    <label title="字体颜色">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M11.106 4h1.789l5.107 14h-1.493l-1.46-4H8.953l-1.459 4H6l5.106-14zm.895 1.64l2.575 7.06h-5.15l2.575-7.06z"
                                fill="#454D5A"></path>
                        </svg>
                        <div class="current-color"></div>
                    </label>
                    <label title="文字 — T 或 8"><svg aria-hidden="true" focusable="false" role="img"
                            viewBox="0 0 24 24" class="" fill="none" stroke-width="2" stroke="currentColor"
                            stroke-linecap="round" stroke-linejoin="round">
                            <g stroke-width="1.5">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <line x1="4" y1="20" x2="7" y2="20"></line>
                                <line x1="14" y1="20" x2="21" y2="20"></line>
                                <line x1="6.9" y1="15" x2="13.8" y2="15"></line>
                                <line x1="10.2" y1="6.3" x2="16" y2="20"></line>
                                <polyline points="5 20 11 4 13 4 20 20"></polyline>
                            </g>
                        </svg></label>
                    <label title="插入图像 — 9"><svg aria-hidden="true" focusable="false" role="img"
                            viewBox="0 0 20 20" class="" fill="none" stroke="currentColor" stroke-linecap="round"
                            stroke-linejoin="round">
                            <g stroke-width="1.25">
                                <path d="M12.5 6.667h.01"></path>
                                <path
                                    d="M4.91 2.625h10.18a2.284 2.284 0 0 1 2.285 2.284v10.182a2.284 2.284 0 0 1-2.284 2.284H4.909a2.284 2.284 0 0 1-2.284-2.284V4.909a2.284 2.284 0 0 1 2.284-2.284Z">
                                </path>
                                <path d="m3.333 12.5 3.334-3.333c.773-.745 1.726-.745 2.5 0l4.166 4.166"></path>
                                <path d="m11.667 11.667.833-.834c.774-.744 1.726-.744 2.5 0l1.667 1.667"></path>
                            </g>
                        </svg></label>
                    <!-- 分割线 -->
                    <div class="divide"></div>
                    <label class="ToolIcon Shape" title="橡皮 — E 或 0"><svg aria-hidden="true" focusable="false" role="img"
                            viewBox="0 0 24 24" class="" fill="none" stroke-width="2" stroke="currentColor"
                            stroke-linecap="round" stroke-linejoin="round">
                            <g stroke-width="1.5">
                                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                                <path
                                    d="M19 20h-10.5l-4.21 -4.3a1 1 0 0 1 0 -1.41l10 -10a1 1 0 0 1 1.41 0l5 5a1 1 0 0 1 0 1.41l-9.2 9.3">
                                </path>
                                <path d="M18 13.3l-6.3 -6.3"></path>
                            </g>
                        </svg></label>
                </div>
            </TopBar>
        </header>
    </section>
</template>
          
<script lang="ts" setup>
import TopBar from '../components/common/ToolBar.vue'    
</script>
          
<style lang="less" scoped>
section {
    box-sizing: border-box;
    background-color: @bgPrimary;

    header {
        padding: 16px;
        background-color: palegoldenrod;

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
                    width: 1.3rem;
                    height: 1.3rem;
                    color: #3d3d3d;
                }

                .current-color,.high-light {
                    position: absolute;
                    bottom: 7px;
                    height: 3px;
                    width: 14px;
                    background-color: @button-color;
                }

                .high-light{
                    bottom: 6;
                    background-color: rgb(255, 255, 0);
                    border: 1px solid rgba(0, 0, 0, 0.12)
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