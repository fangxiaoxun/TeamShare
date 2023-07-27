<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, computed, onMounted } from 'vue'
const editor = ref<HTMLElement>(document.createElement('div'))
import { updateFile, newsetFile } from '@/api/files/files'
import { useFileStore } from '@/store/files1';
import { useInfo } from '@/store/user';
const userInfo = useInfo()
const fileSotre = useFileStore()

interface TNode {
    type: string;
    attrs: Record<string, any>;     //节点标签样式
    content?: string;   //节点存储内容
    marks?: TNode[] | null;    //标签类型
    children?: TNode[];
}
// 文段
const paragraph: TNode = {
    type: 'p',
    attrs: {}
};
// 文字
const text: TNode = {
    type: 'text',
    attrs: {}
};

// 加粗
const strong: TNode = {
    type: 'strong',
    attrs: {}
};

// 斜体
const em: TNode = {
    type: 'em',
    attrs: {}
};

const state: TNode[] = [{
    ...paragraph,
    children: [
        { ...text, content: 'text ' },
        { ...text, marks: [strong], content: 'strong' },
        { ...text, marks: [strong, em], content: 'italic text' },
    ]
}];
// 渲染文档内容
const renderNodeTree = (nodes: TNode[]) => {
    let html = '';

    for (const node of nodes) {
        if (node.type === 'text') {
            let content = node.content;
            console.log(content)
            if (node.marks && node.marks.length > 0) {
                // 标记类型
                for (const mark of node.marks) {
                    content = `<${mark.type}>${content}</${mark.type}>`;
                }
            }
            html += content;
        } else {
            const childrenHtml = renderNodeTree(node.children || []);
            html += `<${node.type}>${childrenHtml}</${node.type}>`;
        }
    }
    return html
}

// 获取输入的内容
const handleInput = (event: Event): any => {

    console.log('触发input事件')
    const userInput = (event.target as HTMLElement).innerHTML;
    if (userInput == '') {
        (event.target as HTMLElement).innerHTML = `<p><br></p>`
    }
}

// const str:string = '<div data-v-43706c3a="" class="content" contenteditable="true"><p><b>111</b>1111</p><p>2222<b>222</b></p><p><b>3333333</b></p><p><b>444</b>4414</p></div>'
// 转换输入 存储

function parseNodes(element: Element): TNode[] {
    const childNodes = element.childNodes;
    const nodes: TNode[] = [];

    for (let i = 0; i < childNodes.length; i++) {
        const childNode = childNodes[i];

        if (childNode.nodeType === Node.TEXT_NODE) {
            // 文字节点
            if (childNode.textContent?.trim()) {
                nodes.push({ type: 'text', content: childNode.textContent.trim(), attrs: {} });
            }
        } else if (childNode.nodeType === Node.ELEMENT_NODE) {
            const childElement = childNode as Element;
            const node: TNode = { type: childElement.tagName.toLowerCase(), attrs: {} };

            if (childElement.tagName.toLowerCase() === 'b') {
                node.marks = [{ type: 'strong', attrs: {} }];
            } else if (childElement.tagName.toLowerCase() === 'i') {
                node.marks = [{ type: 'em', attrs: {} }];
            }

            node.children = parseNodes(childElement);
            nodes.push(node);
        }
    }

    return nodes;
}

function save() {
    const saveContent = editor.value.innerHTML;
    const html = saveContent;
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const body = doc.querySelector('body')!;
    const state: TNode[] = parseNodes(body);
    return state
}

const handleSave = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.code === 'KeyS') {
        event.preventDefault()
        let content = JSON.stringify(save())
        userInfo.setCurrConten(save())
        const fileInfo = fileSotre.getCurrFile
        // 修改文件
        if (fileInfo.fileId) {
            const reqParams = {
                fileId: fileInfo.fileId,
                fileName: fileInfo.fileName,
                content: content
            }
            updateFile(reqParams)
        } else {     //新建文件
            ElMessageBox.prompt('请输入文件名称', '新建文件', {
                confirmButtonText: '完成',
                cancelButtonText: '取消',
            })
                .then(({ value }) => {
                    ElMessage({
                        type: 'success',
                        message: `新建文件 ${value} 成功！`,
                    })
                    // 新建文件
                    const reqParams = {
                        fileName: value,
                        fileType: 0,
                        folderId: fileSotre.currFile.folderId,
                        content:content
                    }
                    newsetFile(reqParams)

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
const handleEnter = () => {
    // 存在内容即渲染
    if (userInfo.currContent?.length) {
        console.log(userInfo.currContent)
        const content = JSON.parse(userInfo.currContent)
        const res = renderNodeTree(content)
        editor.value.innerHTML += res
    }
}
onMounted(() => {
    handleEnter()
})



</script>
<template>
    <div class="page" @keydown="handleSave">
        <div class="content" ref="editor" contenteditable="true" @input="handleInput">
            <p><br /></p>

        </div>
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