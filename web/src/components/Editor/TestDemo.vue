<!--
 * @Author: fangxiaoxun 1272449367@qq.com
 * @Date: 2025-02-24 21:13:07
 * @LastEditors: fangxiaoxun 1272449367@qq.com
 * @LastEditTime: 2025-03-01 12:10:41
 * 
-->
<script lang="ts" setup>
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import { onMounted,reactive, ref } from 'vue'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import Cursor from '../common/Cursor.vue'
import { useInfo } from '@/store/user'
const userStore = useInfo()
const userId = userStore.userId
import { debounce } from 'lodash'

const editorRef = ref<HTMLButtonElement | null>(null)
const remoteCursors = reactive({})


const ydoc = new Y.Doc()
const provider = new WebsocketProvider('ws://localhost:3000', 'test-room', ydoc)
const yText = ydoc.getText('content')
const awareness = provider.awareness

const editor = new EditorJS({
  holder: 'editors',
  tools: {
    header: {
      class: Header,
      inlineToolbar: true,
    },

  },
  autofocus: true,
  placeholder: 'Let`s write an awesome story!',
  onReady: () => {
    console.log('Editor.js is ready to work!')
  },
  onChange: () => {
    console.log(editor.blocks.getBlockByIndex(0));
    
    console.log(editor.blocks.getBlockByIndex(editor.blocks.getCurrentBlockIndex()), 'onChange event')
  },
})
const editorContainer = ref()


onMounted(() => {
    const handleSelectionChange = () => {
        const textNode = editor.blocks.getBlockByIndex(editor.blocks.getCurrentBlockIndex())?.holder.firstChild;
        const selection = window.getSelection()!
        const outer = editorContainer.value.getBoundingClientRect()

        if(selection.rangeCount > 0) {
            const range = selection.getRangeAt(0)
            const top = textNode?.getBoundingClientRect().y - outer.top
            const left = range.getBoundingClientRect().x - outer.left
            const cursorPosition = {left, top}
            // debounce(() => {
                awareness.setLocalStateField('cursor', {userId, cursorPosition})
            // })
        }
    } 
    document.addEventListener('selectionchange', handleSelectionChange)
    awareness.on('change', () => {
        const states = awareness.getStates()
        states.forEach((state) => {
            const {cursor} = state
            remoteCursors[cursor.userId] = {position: cursor.cursorPosition, userId: cursor.userId}
        })
    })
      // 清理当前客户端的 awareness 状态
  const cleanupAwareness = () => {
    awareness.setLocalState(null); // 清除当前客户端的状态
  };
    // 监听页面刷新或关闭事件
    window.addEventListener('beforeunload', cleanupAwareness);

})

</script>
<template>
  <div>
  </div>
  <div id="editors" class="relative" ref="editorContainer">
      
      <Cursor v-for="(cursor) in remoteCursors" :user-name="cursor.userId" :color="'#bfa'" :position="cursor.position" :visible="true">
          <!-- {{ cursor }} -->
        </Cursor>
        <!-- {{ remoteCursors }} -->
  </div>
</template>
<style lang="less" scoped></style>
