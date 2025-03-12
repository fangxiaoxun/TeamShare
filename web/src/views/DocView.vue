<template>
    <section>
        <header>
            <TopBar>
                <div class="editor" v-if="editor">
                    <ToolsBar :editor="editor"></ToolsBar>
                </div>
            </TopBar>
            <div class="menu">
                <button class="share">
                    <svg width="1.2em" height="1.2em" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
                        data-icon="GroupOutlined">
                        <path
                            d="M8.5 5a2.5 2.5 0 1 0 .001 5.001A2.5 2.5 0 0 0 8.5 5ZM4 7.5a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM5.835 15C4.015 15 2.5 16.498 2.5 18.4V20h12v-1.6c0-1.901-1.515-3.4-3.335-3.4h-5.33ZM.5 18.4c0-2.982 2.39-5.4 5.335-5.4h5.33c2.945 0 5.335 2.418 5.335 5.4V20c0 1.1-.9 2-2 2h-12c-1.1 0-2-.9-2-2v-1.6Zm22 2.6h-4.135v-2H21.5v-.6c0-1.002-.845-1.9-2-1.9h-1.31a5.46 5.46 0 0 0-.985-2H19.5c2.21 0 4 1.746 4 3.9V20c.025.535-.49 1.02-1 1Zm-6-11a1.001 1.001 0 1 1 1 1c-.55 0-1-.447-1-1Zm1-3a3.001 3.001 0 0 0 0 6 3.001 3.001 0 0 0 0-6Z"
                            fill="currentColor"></path>
                    </svg>
                    分享
                </button>
                <!-- <button class="import">
                    <svg t="1688317675419" class="icon" viewBox="0 0 1000 1000" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="9579" data-spm-anchor-id="a313x.7781069.0.i10"
                        width="200" height="200">
                        <path
                            d="M259.774 362.57v364.149c0 28.44 23.051 51.491 51.491 51.491h364.149c28.44 0 51.491-23.051 51.491-51.491s-23.051-51.491-51.491-51.491h-239.829l349.073-349.073c20.119-20.119 20.119-52.711 0-72.831s-52.711-20.119-72.831 0l-349.073 349.073v-239.829c0.001-14.202-5.754-27.093-15.076-36.415s-22.195-15.094-36.415-15.076c-28.44 0-51.491 23.051-51.491 51.491z"
                            p-id="9580" fill="#8a8a8a" data-spm-anchor-id="a313x.7781069.0.i7" class="selected"></path>
                    </svg>
                </button>
                <button class="paging">
                    <svg t="1688318498705" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="13275" id="mx_n_1688318498705" width="200"
                        height="200">
                        <path
                            d="M787.692308 157.538462a78.769231 78.769231 0 0 1 78.76923 78.76923v551.384616a78.769231 78.769231 0 0 1-78.76923 78.76923H236.307692a78.769231 78.769231 0 0 1-78.76923-78.76923V236.307692a78.769231 78.769231 0 0 1 78.76923-78.76923h551.384616z m-295.384616 39.384615H236.307692a39.384615 39.384615 0 0 0-39.108923 34.776615L196.923077 236.307692v551.384616a39.384615 39.384615 0 0 0 34.776615 39.108923L236.307692 827.076923h256V196.923077zM787.692308 196.923077h-256v630.153846H787.692308a39.384615 39.384615 0 0 0 39.108923-34.776615L827.076923 787.692308V236.307692a39.384615 39.384615 0 0 0-34.776615-39.108923L787.692308 196.923077z m-381.952 223.547077a19.692308 19.692308 0 0 1 2.284307 25.127384l-2.284307 2.756924-62.818462 62.739692 64.708923 64.748308a19.692308 19.692308 0 0 1 2.244923 25.127384l-2.244923 2.717539a19.692308 19.692308 0 0 1-25.127384 2.284307l-2.756923-2.284307-78.611693-78.611693a19.692308 19.692308 0 0 1-2.244923-25.127384l2.244923-2.756923 76.760616-76.721231a19.692308 19.692308 0 0 1 27.844923 0z m212.676923 0a19.692308 19.692308 0 0 1 27.884307 0l76.721231 76.760615 2.284308 2.717539a19.692308 19.692308 0 0 1-2.284308 25.127384l-78.611692 78.611693-2.756923 2.284307a19.692308 19.692308 0 0 1-25.088-2.284307l-2.284308-2.756923a19.692308 19.692308 0 0 1 2.284308-25.088l64.669538-64.748308-62.818461-62.739692-2.244923-2.756924a19.692308 19.692308 0 0 1 2.244923-25.127384z"
                            fill="#515151" p-id="13276"></path>
                    </svg>
                </button> -->
                <button class="save">
                    <svg t="1691250279228" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="2318" width="200" height="200">
                        <path
                            d="M218.843 208.468c-4.55 2.434-7.941 5.825-10.375 10.375-3.3 6.171-4.468 12.218-4.468 32.074v522.166c0 19.856 1.168 25.903 4.468 32.074 2.434 4.55 5.825 7.941 10.375 10.375 6.171 3.3 12.218 4.468 32.074 4.468h522.166c19.856 0 25.903-1.168 32.074-4.468 4.55-2.434 7.941-5.825 10.375-10.375 3.3-6.171 4.468-12.218 4.468-32.074V357.176c0-12.479-0.295-16.284-1.164-20.053-0.62-2.694-1.514-4.85-2.98-7.195-2.05-3.279-4.533-6.178-13.357-15.002L709.074 221.5c-8.824-8.824-11.723-11.307-15.002-13.358-2.344-1.465-4.5-2.359-7.195-2.98-3.769-0.868-7.574-1.163-20.053-1.163H250.917c-19.856 0-25.903 1.168-32.074 4.468zM250.917 144h415.907c16.624 0 24.466 0.608 33.529 2.696 9.186 2.117 17.54 5.578 25.533 10.576 7.885 4.932 13.86 10.047 25.615 21.802l93.425 93.425c11.755 11.756 16.87 17.73 21.802 25.615 4.998 7.993 8.459 16.347 10.576 25.533 2.088 9.063 2.696 16.905 2.696 33.53v415.906c0 28.914-2.975 44.318-11.56 60.37-8.025 15.006-19.98 26.962-34.987 34.987-16.052 8.585-31.456 11.56-60.37 11.56H250.917c-28.914 0-44.318-2.975-60.37-11.56-15.006-8.025-26.962-19.98-34.987-34.987-8.585-16.052-11.56-31.456-11.56-60.37V250.917c0-28.914 2.975-44.318 11.56-60.37 8.025-15.006 19.98-26.962 34.987-34.987 16.052-8.585 31.456-11.56 60.37-11.56zM674 203.475h60v199.686c0 30.316-3.854 46.832-14.731 63.661-9.743 15.074-23.834 26.734-41.15 34.397C659.975 509.25 642.757 512 608.723 512H415.277c-34.034 0-51.252-2.751-69.396-10.78-17.316-7.664-31.407-19.324-41.15-34.398C293.854 449.992 290 433.477 290 403.161V203.88h60v199.28c0 11.255 0.63 18.6 1.75 23.393 0.7 3.004 1.507 4.814 3.373 7.7 3.212 4.971 8.132 9.042 15.04 12.099 9.385 4.153 18.738 5.648 45.114 5.648h193.446c26.376 0 35.73-1.495 45.115-5.648 6.907-3.057 11.827-7.128 15.04-12.098 1.865-2.887 2.672-4.697 3.373-7.7 1.118-4.794 1.749-12.139 1.749-23.393V203.475z"
                            fill="#515151" p-id="2319"></path>
                    </svg>
                </button>
                <User></User>
            </div>

        </header>
        <main>
            <!-- <LeftBar></LeftBar> -->
            <div class="page" @keydown="handleSave">
                {{ editor?.storage.collaborationCursor.users }}
                <floating-menu :editor="editor" :tippy-options="{ duration: 100 }" v-if="editor" class="floating-menu">
                    <div class="floating-menu bg-[#bfa]">
                        <el-button @click="isShowMenu = true" :icon="Plus"></el-button>
                        <div class="but-group w-10 h-10 bg-[#f5f5f5] absolute left-0" v-if="isShowMenu"
                            @mouseleave="isShowMenu = false">
                            <el-upload v-model="upload" :show-file-list="false" :auto-upload="false"
                                @change="handlechange">
                                <template #trigger="file">
                                    <el-button>
                                        图片
                                    </el-button>

                                </template>
                                <template #file="{ file }">
                                    {{ file }}
                                </template>
                            </el-upload>
                            <!-- <ToolsBar :editor="editor"></ToolsBar> -->
                            <MenuItem :config-list="configList">
                            </MenuItem>

                        </div>
                    </div>
                </floating-menu>
                <div class="editor pt-16 px-10" v-if="editor">
                    <editor-content :editor="editor" ref="Editor" />
                </div>
            </div>
        </main>
    </section>
</template>

<script lang="ts" setup>
import TopBar from '../components/common/ToolBar.vue';
import LeftBar from '../components/Editor/LeftBar.vue';
import User from '../components/common/User.vue'

import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import Typography from '@tiptap/extension-typography'
import TextAlign from '@tiptap/extension-text-align'
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'
import Placeholder from '@tiptap/extension-placeholder'
import Focus from '@tiptap/extension-focus'
import Image from '@tiptap/extension-image'
import Dropcursor from '@tiptap/extension-dropcursor'
import Document from '@tiptap/extension-document'
// import BubbleMenu from ' @tiptap/extension-bubble-menu'
import Link from '@tiptap/extension-link'
import ToolsBar from '../components/Editor/ToolsBar.vue'
import { useInfo } from '@/store/user';
import Collaboration from '@tiptap/extension-collaboration'
import { TiptapCollabProvider, HocuspocusProvider } from '@hocuspocus/provider'
import { CollaborationCursor } from '@tiptap/extension-collaboration-cursor'
import { ElUpload, ElButton, ElMessage, ElMessageBox } from 'element-plus';
import type { UploadFile, UploadUserFile} from 'element-plus'

import { Plus } from '@element-plus/icons-vue'
import { debounce } from 'lodash';
import { updateFile, newsetFile } from '@/api/files/index'
import { useFileStore } from '@/store/files'

import { useRouter } from 'vue-router';
const router = useRouter()
const { spaceId } = router.currentRoute.value?.query
const { fileId } = router.currentRoute.value?.params
// console.log(router.currentRoute.value)




const fileStore = useFileStore()

import ToolItem from '@/components/Editor/ToolItem.vue';




const upload = ref<UploadUserFile>()
// 配置预览图片
const imgUrl = ref()


import { ref, watch } from 'vue'
import * as Y from 'yjs'
const userInfo = useInfo()

console.log(router.currentRoute.value, 'userInfo')
const appId = (fileId ? fileId : userInfo.getUserId) as string

const doc = new Y.Doc()
const provider = new TiptapCollabProvider({
    name: appId,
    appId: 'v91xn02m',
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

const isShowMenu = ref<boolean>(false)


const editor = useEditor({
    content: '<p>I’m running Tiptap with vue-next. 🎉</p>',
    extensions: [
        Highlight,
        Typography,
        Text,
        TextStyle,
        Document,
        Image.configure({
            inline: true,
            allowBase64: true,
        }),
        Dropcursor,
        TextAlign.configure({
            types: ['heading', 'paragraph'],
        }),
        StarterKit.configure({
            history: false
        }),
        Focus.configure({
            className: 'has-focus',
            mode: 'all',
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
    // autofocus: 'end',
    onUpdate: ({ editor }) => {
        // console.log(editor, 'update')
        const json = editor.getJSON()
        console.log(json)
    }
})

const handlechange = (files: UploadFile) => {
    const reader = new FileReader();
    reader.readAsDataURL(files.raw!);
    reader.onload = (e) => {
        imgUrl.value = e.target?.result
        console.log('添加图片')
        console.log(editor.value)
        editor.value && editor.value.chain().focus().setImage({ src: imgUrl.value }).run()
    };

};


const Editor = ref()


const handleSave = async (event: KeyboardEvent) => {
    if (event.ctrlKey && event.code === 'KeyS') {
        event.preventDefault()
        // let content = editor.getJson()
        // userInfo.setCurrConten(save())
        console.log(editor.value?.getJSON())
        const content = editor.value?.getJSON()

        const fileInfo = fileStore.getCurrFile
        console.log(fileInfo, 'fileInfo')
        // 修改文件
        if (fileId) {
            console.log('修改文件')
            const reqParams = {
                fileId,
                content: content,
            }
            updateFile(reqParams)
        } else {
            //新建文件
            console.log('新建文件', spaceId)
            ElMessageBox.prompt('请输入文件名称', '新建文件', {
                confirmButtonText: '完成',
                cancelButtonText: '取消',
            })
                .then(async ({ value }) => {
                    ElMessage({
                        type: 'success',
                        message: `新建文件 ${value} 成功！`,
                    })
                    // 新建文件
                    //   todo:需要获取文件夹id
                    const reqParams = {
                        fileName: value,
                        spaceId,
                        content: content,
                    }
                    await newsetFile(reqParams)
                    router.back()

                })
                .catch(() => {
                    ElMessage({
                        type: 'info',
                        message: '取消新建文件',
                    })
                })
        }
    }
}
// 保存文档内容



import MenuItem from '@/components/Editor/MenuItem.vue';

const configList = ref([
    {
        icon: 'image',
        title: '图片'
    },
    {
        icon: 'image',
        title: '图片'
    },
    {
        icon: 'image',
        title: '图片'
    },
    {
        icon: 'image',
        title: '图片'
    }
])





</script>


<style lang="less" scoped>
section {
    box-sizing: border-box;
    background-color: @bgPrimary;

    header {
        display: flex;
        position: relative;
        padding: 16px;

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

                .current-color,
                .high-light {
                    position: absolute;
                    bottom: 7px;
                    height: 3px;
                    width: 14px;
                    background-color: @primary-color;
                }

                .high-light {
                    bottom: 6;
                    background-color: rgb(255, 255, 0);
                    border: 1px solid rgba(0, 0, 0, 0.12)
                }

                .arrow-contain {
                    vertical-align: middle;
                    float: right;
                    padding: 0 3px;
                    text-align: center;
                    height: 24px;
                    margin: auto;

                    .arrow {
                        background-image: url(../assets//arrow.svg);
                        float: right;
                        vertical-align: middle;
                        width: 6px;
                        height: 4px;
                        pointer-events: none;
                        margin: 10px 0 0 0;
                    }

                }

                ul.dui-menu {
                    opacity: 0;
                    position: absolute;
                    bottom: -127px;
                    max-height: 340px;
                    border-radius: 4px;
                    width: 70px;
                    padding: 6px 0;
                    border: 1px solid rgba(0, 0, 0, .12);

                    box-shadow: 0 2px 12px 2px rgba(68, 73, 77, .16);
                    background-color: hsla(0, 0%, 100%, .92);
                    backdrop-filter: blur(16px);
                    list-style: none;
                    box-shadow: 0 2px 12px 2px rgba(68, 73, 77, .16);
                    transition: all .24s cubic-bezier(.4, 0, .2, 1);

                    li {
                        font-size: 12px;
                        width: 100%;
                        height: 12px;
                        padding: 8px 0;
                        transition: background-color .1s linear;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        cursor: pointer;
                        box-sizing: content-box;

                        svg {
                            pointer-events: none;
                            width: 20px;
                            height: 20px;
                        }
                    }

                    li:hover {
                        background-color: rgba(51, 77, 102, .06);
                    }

                    li.dui-selected {
                        position: relative;
                    }

                    li.dui-selected::before {
                        content: "";
                        position: absolute;
                        display: inline-block;
                        width: 16px;
                        height: 16px;
                        left: 8px;
                        top: 50%;
                        transform: translateY(-50%);
                        background-repeat: no-repeat;
                        background-image: url(../assets/current.svg);
                        background-size: contain;
                        background-position: 50%;
                    }
                }

                &.active ul.dui-menu {
                    opacity: 1;
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

        .menu {
            display: flex;
            justify-content: space-around;
            position: absolute;
            right: 0;
            z-index: 2;
            width: 395px;
            height: 44px;

            button.share {
                width: 78px;
                background-color: @primary-color;
                height: 36px;
                line-height: 36px;
                text-align: center;
                ;
                margin-left: 22px;
                color: #fff;
                border-radius: 8px;
                cursor: pointer;
                display: flex;
                align-items: center;
                justify-content: center;

                svg {
                    position: relative;
                    margin-right: 6px;
                }
            }

            button.import,
            button.paging,
            button.save {
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
                    height: 1rem;
                    width: 1rem;
                }

                &:hover {
                    background-color: #f5f5f5;
                    cursor: pointer;
                }
            }

            .user {
                margin-left: 20px;
                margin-right: 30px;
            }


        }


    }

    main {
        display: flex;
        width: 100%;
        height: 100%;
        background-color: @bgPrimary;
    }
}


.page {
    margin-bottom: 25px;
    width: 60vw;
    margin: 0 auto;
    height: calc(100vh - 76px);
    overflow: auto;
    background-color: #fff;
    box-shadow: rgba(0, 0, 0, 0.06) 0px 0px 10px 0px,
        rgba(0, 0, 0, 0.04) 0px 0px 0px 1px;


    /* 隐藏滚动条（WebKit/Blink 浏览器） */
    -webkit-scrollbar: none;
    -webkit-scrollbar-track: none;
    -webkit-scrollbar-thumb: none;

    /* 隐藏滚动条（Firefox） */
    scrollbar-width: none;
    scrollbar-color: transparent;

    .content {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 40px;
    }

    .content:empty::before {
        content: attr(placeholder);
    }
}

.content {
    p {
        .underline {
            text-decoration: underline;
        }
    }
}
</style>
<style>
/* Basic editor styles */
.tiptap {
    :first-child {
        margin-top: 0;
    }

    img {
        display: block;
        height: auto;
        margin: 1.5rem 0;
        max-width: 100%;

        &.ProseMirror-selectednode {
            outline: 3px solid var(--el-color-primary);
        }
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

.tiptap p.is-editor-empty:first-child::before {
    color: #adb5bd;
    content: attr(data-placeholder);
    float: left;
    height: 0;
    pointer-events: none;
}

#tippy-1 {
    /* top: -100px!important; */
    left: -70px !important;
    top: 0 !important;
}
</style>
