<script lang="ts" setup>
import { ref, onMounted, nextTick } from 'vue'
const editor = ref<HTMLElement>(document.createElement('div'))
const docContent = ref<string>('hhhhh')
// 判断是否进行中文输入
const composing = ref<boolean>(false);
const title = ref<string>('')
const handleCompositionStart = () => {
    composing.value = true;
    console.log('开始输入中文')
}

// 中文输入的时候触发函数
const handleCompositionUpdate = (event: Event): void => {
    if (composing.value) {
        docContent.value = (event.target as HTMLElement).innerText
    }
    console.log((event.target as HTMLElement).innerText)
    console.log('update触发')
}

const handleCompositionEnd = (event: CompositionEvent): void => {
    console.log("结束输入")
    if (composing.value) {
        composing.value = false
        docContent.value = (event.target as HTMLElement).innerText
    }
}

const handleInput = (): void => {
    if (!composing.value) {
        console.log('触发input事件')

        docContent.value = editor.value.innerText;
        console.log(editor.value)
        console.log(docContent.value)
    }
}

onMounted(async () => {
    await nextTick();
    console.log(editor)
    editor.value.focus();
})
</script>
<!-- 使用v-html和v-text来实现文本输入 -->
<template>
    <div class="page">
        <!-- <div class="content" ref="editor"  @compositionstart="handleCompositionStart"
            @compositionupdate="handleCompositionUpdate" @compositionend="handleCompositionEnd" :innerHTML="docContent"
            contenteditable="true">
        </div> -->
        <!-- <div class="content" ref="editor" @input="handleInput" @compositionstart="handleCompositionStart"
            @compositionend="handleCompositionEnd" :innerHTML="docContent" contenteditable="true" v-html="docContent"
            placeholder="输入正文">
        </div> -->
        <div class="content" ref="editor" contenteditable="true" @input="handleInput" ></div>
    </div>
</template>
<style scoped lang="less">
.page {
    margin-bottom: 25px;
    width: 793.667px;
    margin: 0 auto;
    height: calc(100vh - 76px);
    overflow: visible;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.06) 0px 0px 10px 0px, rgba(0, 0, 0, 0.04) 0px 0px 0px 1px;

    .content {
        width: 100%;
        height: 100%;
        padding: 40px;
    }

    .content:empty::before {
        content: attr(placeholder);
    }
}
</style>