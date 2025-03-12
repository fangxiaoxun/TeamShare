<!--
 * @Author: fangxiaoxun 1272449367@qq.com
 * @Date: 2025-02-24 21:13:07
 * @LastEditors: fangxiaoxun 1272449367@qq.com
 * @LastEditTime: 2025-03-01 21:49:39
 * 
-->
<script lang="ts" setup>
import EditorJS from '@editorjs/editorjs'
import Header from '@editorjs/header'
import List from '@editorjs/list'
import { onMounted, reactive, ref } from 'vue'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import Cursor from '../common/Cursor.vue'
import { useInfo } from '@/store/user'
const userStore = useInfo()
const userId = userStore.userId
import { debounce, isEqual } from 'lodash'
import { da } from 'element-plus/es/locale/index.mjs'

const editorRef = ref<HTMLButtonElement | null>(null)
const remoteCursors = reactive({})


const ydoc = new Y.Doc()
const provider = new WebsocketProvider('ws://localhost:3000', 'test-room', ydoc)
const yText = ydoc.getText('content')
const yMap = ydoc.getMap('blocks')

const awareness = provider.awareness


// 将 Yjs 的更新应用到 Editor.js
const applyYjsUpdateToEditor = async () => {

    if (!origin) return
    const remoteBlocks = Array.from(yMap.values())
    const savedData = await editor.save()
    const localBlocks = savedData.blocks
    
    // 删除本地存在但远程不存在的块
    localBlocks.forEach((localBlock) => {
        if (!remoteBlocks.some(remoteBlock => remoteBlock.id === localBlock.id)) {
            // 通过遍历 blocks.items 获取索引
            console.log(editor.blocks)
            const index = localBlocks.findIndex((block) => block.id === localBlock.id);

            if (index !== -1) {
                editor.blocks.delete(index);
            }
        }
    });
    // 2. 插入或更新远程块
    remoteBlocks.forEach((remoteBlock, index) => {
        const localBlock = localBlocks.find(b => b.id === remoteBlock.id as string)
        if (!localBlock) {
            editor.blocks.insert(remoteBlock.type, remoteBlock.data, {}, index, false)
        } else if (!isEqual(localBlock.data, remoteBlock.data)) {
            editor.blocks.update(localBlock.id as string, remoteBlock.data)
        }
    })
}

// 将 Editor.js 的更新同步到 Yjs
const syncEditorUpdateToYjs = async () => {
    const savedData = await editor.save()
    const blocks = savedData.blocks

    // 获取当前所有块的唯一ID
    const currentBlockIds = blocks.map(block => block.id)
    yMap.doc?.transact(() => {
        blocks.forEach((block: any) => {
            const blockKey = `block-${block.id}`
            if (!yMap.has(blockKey)) {
                yMap.set(blockKey, block)
            } else if (isEqual(yMap.get(blockKey), block)) {
                yMap.set(blockKey, block)
            }
        })

        // 删除多余的块
        const currentBlockKeys = Array.from(yMap.keys())
        currentBlockKeys.forEach((key) => {
            if (!currentBlockKeys.includes(key.replace('block-', ''))) {
                yMap.delete(key)
            }
        })
        // currentBlockKeys.forEach((key) => {
        //   if (!blocks.some((block: any, index: number) => key === `block-${index}`)) {
        //     yMap.delete(key)
        //   }
        // })
    })
}

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
        // 初始化数据内容
        // const initialContent = yText.toString()
        // console.log(initialContent)
        // if(initialContent){
        //     const content = JSON.parse(initialContent)
        //     editor.blocks.render(content)
        // }
    },
    onChange: async (api, event) => {
        console.log(api, event, 'change event')
        console.log(editor.blocks)
        await syncEditorUpdateToYjs()
    }
})
const editorContainer = ref()

yMap.observe(({ transaction, changes }) => {
    if (!transaction.origin) return
    applyYjsUpdateToEditor()
})




onMounted(() => {


    const handleSelectionChange = () => {
        const textNode = editor.blocks.getBlockByIndex(editor.blocks.getCurrentBlockIndex())?.holder.firstChild;
        const selection = window.getSelection()!
        const outer = editorContainer.value.getBoundingClientRect()

        if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0)
            const top = textNode?.getBoundingClientRect().y - outer.top
            const left = range.getBoundingClientRect().x - outer.left
            const cursorPosition = { left, top }
            // debounce(() => {
            awareness.setLocalStateField('cursor', { userId, cursorPosition })
            // })
        }
    }
    document.addEventListener('selectionchange', handleSelectionChange)

})
// document.addEventListener('selectionchange', recordCursorPosition)
awareness.on('change', () => {
    const states = awareness.getStates()
    states.forEach((state) => {
        const { cursor } = state
        remoteCursors[cursor.userId] = { position: cursor.cursorPosition, userId: cursor.userId }
        // if (cursor && cursor.reactivePosition) {
        //     // console.log('change')
        //     restoreCursorPosition(cursor.reactivePosition)
        //     // 更新远程光标的位置显示
        //     const absolutePosition = Y.createAbsolutePositionFromRelativePosition(cursor.reactivePosition, ydoc)
        //     if (absolutePosition) {
        //         const { index } = absolutePosition
        //         remoteCursors[cursor.userId] = { position: { left: index, top: 0 }, userId: cursor.userId }
        //     }
        // }
    })
})
// 清理当前客户端的 awareness 状态
const cleanupAwareness = () => {
    awareness.setLocalState(null); // 清除当前客户端的状态
};
// 监听页面刷新或关闭事件
window.addEventListener('beforeunload', cleanupAwareness);

</script>
<template>
    <div>
    </div>
    <div id="editors" class="relative" ref="editorContainer">

        <Cursor v-for="(cursor) in remoteCursors" :user-name="cursor.userId" :color="'#bfa'" :position="cursor.position"
            :visible="true">
            <!-- {{ cursor }} -->
        </Cursor>
        {{ remoteCursors }}
    </div>
</template>
<style lang="less" scoped></style>
