<template>
    <div class="toolbar">
        <div class="toolList">
            <label title="绘制后保持所选工具栏状态">
                <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 20 20" class="" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><g><path d="M13.542 8.542H6.458a2.5 2.5 0 0 0-2.5 2.5v3.75a2.5 2.5 0 0 0 2.5 2.5h7.084a2.5 2.5 0 0 0 2.5-2.5v-3.75a2.5 2.5 0 0 0-2.5-2.5Z" stroke="currentColor" stroke-width="1.25"></path><path d="M10 13.958a1.042 1.042 0 1 0 0-2.083 1.042 1.042 0 0 0 0 2.083Z" stroke="currentColor" stroke-width="1.25"></path><mask id="UnlockedIcon" maskUnits="userSpaceOnUse" x="6" y="1" width="9" height="9" style="mask-type: alpha;"><path stroke="none" d="M6.399 9.561V5.175c0-.93.401-1.823 1.116-2.48a3.981 3.981 0 0 1 2.693-1.028c1.01 0 1.98.37 2.694 1.027.715.658 1.116 1.55 1.116 2.481" fill="#fff"></path></mask><g mask="url(#UnlockedIcon)"><path stroke="none" d="M5.149 9.561v1.25h2.5v-1.25h-2.5Zm5.06-7.894V.417v1.25Zm2.559 3.508v1.25h2.5v-1.25h-2.5ZM7.648 8.51V5.175h-2.5V8.51h2.5Zm0-3.334c0-.564.243-1.128.713-1.561L6.668 1.775c-.959.883-1.52 2.104-1.52 3.4h2.5Zm.713-1.561a2.732 2.732 0 0 1 1.847-.697v-2.5c-1.31 0-2.585.478-3.54 1.358L8.36 3.614Zm1.847-.697c.71 0 1.374.26 1.847.697l1.694-1.839a5.231 5.231 0 0 0-3.54-1.358v2.5Zm1.847.697c.47.433.713.997.713 1.561h2.5c0-1.296-.56-2.517-1.52-3.4l-1.693 1.839Z" fill="currentColor"></path></g></g></svg>
            </label>
            <!-- 分割线 -->
            <div class="divide"></div>
            <label title="矩形" ref="tool">
                <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 24 24" class="" fill="none" stroke-width="2" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><g stroke-width="1.5"><path stroke="none" d="M0 0h24v24H0z" fill="none"></path><rect x="4" y="4" width="16" height="16" rx="2"></rect></g></svg>
            </label>
        </div>
    </div>     
</template>
          
<script lang="ts" setup>
          
</script>
          
<style lang="less" scoped>
    .toolbar{
        position: relative;
        width: 505px;
        height: 44px;
        display: flex;
        justify-content: space-between;
        padding: 4px;
        border-radius: 8px;
        box-sizing: border-box;
        background-color: #fffffff5;
        box-shadow: 0px 7px 14px rgba(0,0,0,.05),0px 0px 3.12708px rgba(0,0,0,.08),0px 0px 0.931014px rgba(0,0,0,.17);;
        z-index: 5;
        .toolList{
            display: flex;
            label{
                width: 36px;
                height: 36px;
                border-radius: 0.5rem;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;

                &:hover{
                    background-color: #f5f5f5;
                }

                &:active{
                    background-color: @primaryLight;
                }

                svg{
                    width: 1rem;
                    height: 1rem;
                    color: #3d3d3d;
                
                }
            }
            .divide{
                align-self: center;
                background-color: #d6d6d6;
                width: 0.5px;
                height: 24px;
                margin: 0 0.5rem;
            }
        }
    }      
</style>