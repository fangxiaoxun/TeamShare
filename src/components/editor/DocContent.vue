<script lang="ts" setup>
import {ref, onMounted, nextTick} from 'vue'
const editor = ref<HTMLElement>(document.createElement('div'))
const docContent = ref<string>('')
const handleInput = (event:Event) => {
    docContent.value = (event.target as HTMLElement).innerHTML!
}
onMounted(async () => {
    await nextTick();
    console.log(editor)
    editor.value.focus();
})
</script>
<template>
    <div class="page">
        <div 
        class="content"
        ref="editor"
        @input="handleInput"
        :innerHTML="docContent"
        contenteditable="true"></div>
    </div>
</template>
<style scoped lang="less">
.page{
    margin-bottom: 25px;
    width: 793.667px;
    margin: 0 auto;
    height: 100%;
    overflow: visible;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.06) 0px 0px 10px 0px, rgba(0, 0, 0, 0.04) 0px 0px 0px 1px;
    
    .content{
        width: 100%;
        height: 100%;
        padding: 40px;
    }
}
</style>