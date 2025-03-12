<!--
 * @Author: fangxiaoxun 1272449367@qq.com
 * @Date: 2025-03-02 21:21:18
 * @LastEditors: fangxiaoxun 1272449367@qq.com
 * @LastEditTime: 2025-03-07 22:38:21
 * 
-->
<script lang="ts" setup>
import { reactive } from 'vue'
// import ToolItem from './ToolItem.vue'
import { ElDivider } from 'element-plus'
import ToolItem from './ToolItem.vue';
const props = defineProps(['editor'])
const { editor } = props

export interface IConfigItem {
    icon: string,
    title: string,
    action?: () => void,
    isActive?: () => boolean,
    childrenList?: IConfigItem[],
    isDivider?: boolean
}


const items = reactive<IConfigItem[]>([
    {
        icon: 'bold',
        title: 'Bold',
        action: () => editor.chain().focus().toggleBold().run(),
        isActive: () => editor.isActive('bold')
    },
    {
        icon: 'italic',
        title: 'Italic',
        action: () => editor.chain().focus().toggleItalic().run(),
        isActive: () => editor.isActive('italic')
    },
    {
        icon: 'strikethrough',
        title: 'Strike',
        action: () => editor.chain().focus().toggleStrike().run(),
        isActive: () => editor.isActive('strike'),
    },
    {
        icon: 'mark-pen-line',
        title: 'Highlight',
        action: () => editor.chain().focus().toggleHighlight().run(),
        isActive: () => editor.isActive('highlight')
    },
    {
        icon: 'heading',
        title: 'Heading',
        childrenList: [{
            icon: 'h-1',
            title: 'H1',
            action: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
            isActive: () => editor.isActive('heading', { level: 1 }),
        },
        {
            icon: 'h-2',
            title: 'H2',
            action: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
            isActive: () => editor.isActive('heading', { level: 2 })
        },
        {
            icon: 'h-3',
            title: 'H3',
            action: () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
            isActive: () => editor.isActive('heading', { level: 3 })
        },
        {
            icon: 'h-4',
            title: 'H4',
            action: () => editor.chain().focus().toggleHeading({ level: 4 }).run(),
            isActive: () => editor.isActive('heading', { level: 4 })
        },
        {
            icon: 'h-5',
            title: 'H5',
            action: () => editor.chain().focus().toggleHeading({ level: 5 }).run(),
            isActive: () => editor.isActive('heading', { level: 5 })
        }, {
            icon: 'h-6',
            title: 'H6',
            action: () => editor.chain().focus().toggleHeading({ level: 6 }).run(),
            isActive: () => editor.isActive('heading', { level: 6 })
        }]
    },
    {
        icon: 'align-justify',
        title: 'align-justify', 
        childrenList: [
            {
                icon: 'align-center',
                title: 'align-center',
                action: () => editor.chain().focus().setTextAlign('center').run(),
                isActive: () => editor.isActive({ textAlign: 'center' }),
            },
            {
                icon: 'align-left',
                title: 'align-left',
                action: () => editor.chain().focus().setTextAlign('left').run(),
                isActive: () => editor.isActive({ textAlign: 'left' }),
            },
            {
                icon: 'align-right',
                title: 'align-right',
                action: () => editor.chain().focus().setTextAlign('right').run(),
                isActive: () => editor.isActive({ textAlign: 'right' }),
            },
            {
                icon: 'align-justify',
                title: 'align-justify',
                action: () => editor.chain().focus().setTextAlign('justify').run(),
                isActive: () => editor.isActive({ textAlign: 'justify' }),
            },
        ]
    },
    {
        icon: 'list-unordered',
        title: 'list-unordered',
        action: () => editor.chain().focus().toggleBulletList().run(),
        isActive: () => editor.isActive('bulletList')
    },
    {
        icon: 'list-ordered',
        title: 'list-ordered',
        action: () => editor.chain().focus().toggleOrderedList().run(),
        isActive: () => editor.isActive('orderedList')
    },
    {
        icon: 'code-s-slash-fill',
        title: '代码块',
        action: () => editor.chain().focus().toggleCodeBlock().run(),
        isActive: () => editor.isActive('codeBlock')
    },
    {
        icon: 'quote-text',
        title: '引用',
        action: () => editor.chain().focus().toggleBlockquote().run(),
        isActive: () => editor.isActive('blockquote')
    }

])

</script>
<template>
    <div class="flex items-center justify-center">
        <template v-for="item in items" :key="item.title">
            <ToolItem v-bind="item"></ToolItem>
        </template>

    </div>
</template>
