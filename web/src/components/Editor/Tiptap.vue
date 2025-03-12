<script lang="ts" setup>
import { useEditor, EditorContent, } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import TextAlign from '@tiptap/extension-text-align'
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'
import ToolsBar from '../Editor/ToolsBar.vue'
import { useInfo } from '@/store/user';
import Collaboration from '@tiptap/extension-collaboration'
import { TiptapCollabProvider, HocuspocusProvider } from '@hocuspocus/provider'
import { CollaborationCursor } from '@tiptap/extension-collaboration-cursor'
import * as Y from 'yjs'
const userInfo = useInfo()

const doc = new Y.Doc()
const provider = new TiptapCollabProvider({
    name: 'docName',
    appId: '7j9y6m10',
    document: doc
})

const generateRandomColor = () => {
    const colors = [
        '#958DF1',
        '#F98181',
        '#FBBC88',
        '#FAF594',
        '#70CFF8',
        '#94FADB',
        '#B9F18D',
        '#C3E2C2',
        '#EAECCC',
        '#AFC8AD',
        '#EEC759',
        '#9BB8CD',
        '#FF90BC',
        '#FFC0D9',
        '#DC8686',
        '#7ED7C1',
        '#F3EEEA',
        '#89B9AD',
        '#D0BFFF',
        '#FFF8C9',
        '#CBFFA9',
        '#9BABB8',
        '#E3F4F4',
    ]
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
}


const editor = useEditor({
    content: '<p>I’m running Tiptap with vue-next. 🎉</p>',
    extensions: [
        Highlight,
        Typography,
        Text,
        TextStyle,
        TextAlign.configure({
            types: ['heading', 'paragraph'],
        }),
        StarterKit.configure({
            history: false
        }),
        Collaboration.extend().configure({ document: doc }),
        CollaborationCursor.extend().configure({
            provider,
            user: {
                name: userInfo.userName,
                color: generateRandomColor()
            }
        })
    ],
    editorProps: {
        attributes: {
            spellcheck: 'false',
        },
    },
})

</script>
<template>
    <div class="editor" v-if="editor">
        <input type="color" @input="editor.chain().focus().setColor($event.target.value).run()"
            :value="editor.getAttributes('textStyle').color" />
        <ToolsBar :editor="editor"></ToolsBar>
        <!-- <div class="control-group">
            <div class="button-group">
                <button @click="editor?.chain().focus().toggleBold().run()"
                    :disabled="!editor?.can().chain().focus().toggleBold().run()"
                    :class="{ 'is-active': editor?.isActive('bold') }">
                    Bold
                </button>
            </div>
        </div> -->
        <editor-content :editor="editor" @keydown="handleSave"/>
    </div>
</template>
<style>
/* Basic editor styles */
.tiptap {
    :first-child {
        margin-top: 0;
    }

    /* Placeholder (at the top) */
    p.is-editor-empty:first-child::before {
        color: var(--gray-4);
        content: attr(data-placeholder);
        float: left;
        height: 0;
        pointer-events: none;
    }

    p {
        word-break: break-all;
    }

    /* Give a remote user a caret */
    .collaboration-cursor__caret {
        border-left: 1px solid #0d0d0d;
        border-right: 1px solid #0d0d0d;
        margin-left: -1px;
        margin-right: -1px;
        pointer-events: none;
        position: relative;
        word-break: normal;
    }

    /* Render the username above the caret */
    .collaboration-cursor__label {
        border-radius: 3px 3px 3px 0;
        color: #0d0d0d;
        font-size: 12px;
        font-style: normal;
        font-weight: 600;
        left: -1px;
        line-height: normal;
        padding: 0.1rem 0.3rem;
        position: absolute;
        top: -1.4em;
        user-select: none;
        white-space: nowrap;
    }
    /* List styles */
    ul {
        list-style-type: disc;
    }
    
    ol {
        list-style-type: decimal;
    }
    
    ul,
    ol {
        padding: 0 1rem;
        margin: 1.25rem 1rem 1.25rem 0.4rem;
    
        li p {
            margin-top: 0.25em;
            margin-bottom: 0.25em;
        }
    }
    
    /* Code and preformatted text styles */
    code {
        background-color: var(--el-color-primary-light-9);
        border-radius: 0.4rem;
        color: var(--black);
        font-size: 0.85rem;
        padding: 0.25em 0.3em;
    }
    
    pre {
        background: var(--black);
        border-radius: 0.5rem;
        color: #FFF;
        font-family: 'JetBrainsMono', monospace;
        margin: 1.5rem 0;
        padding: 0.75rem 1rem;
    
        code {
            background: none;
            color: inherit;
            font-size: 0.8rem;
            padding: 0;
        }
    }
    
    mark {
        background-color: #FAF594;
        border-radius: 0.4rem;
        box-decoration-break: clone;
        padding: 0.1rem 0.3rem;
    }
    
    blockquote {
        border-left: 3px solid var(--gray-3);
        margin: 1.5rem 0;
        padding-left: 1rem;
    }
    
    hr {
        border: none;
        border-top: 1px solid var(--gray-2);
        margin: 2rem 0;
    }
}




.tiptap {
    :first-child {
        margin-top: 0;
    }

    /* Heading styles */
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        line-height: 1.1;
        margin-top: 2.5rem;
        text-wrap: pretty;
        font-weight: bold
    }

    h1,
    h2 {
        margin-top: 3.5rem;
        margin-bottom: 1.5rem;
    }

    h1 {
        font-size: 1.4rem;
    }

    h2 {
        font-size: 1.2rem;
    }

    h3 {
        font-size: 1.1rem;
    }

    h4,
    h5,
    h6 {
        font-size: 1rem;
    }
}
</style>
