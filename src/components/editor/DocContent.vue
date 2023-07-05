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

onMounted(async () => {
    await nextTick();
    editor.value.focus();
})


// 解决Dom结果不一致

interface TNode {
    type: string;
    attrs: Record<string, any>;
    content?: string;
    marks?: TNode[];
    children?: TNode[];
}
// 文段
const paragraph: TNode = {
    type: 'p',
    attrs: {}
};
// 文字
const textNode: TNode = {
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
        { ...textNode, content: 'text ' },
        { ...textNode, marks: [strong], content: 'strong' },
        { ...textNode, marks: [strong, em], content: 'italic text' },
    ]
}];
console.log(state)

// 渲染文档内容
const renderNodeTree = (nodes: TNode[]) => {
    let html = '';
    for (const node of nodes) {
        if (node.type === 'textNode') {
            let content = node.content;
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
    // const rootNode = parseInput(userInput);
    // 存储根节点或进行其他操作
    // console.log(rootNode)
}

// 转换输入
function parseInput(input: string): TNode {
    const rootNode: TNode = { type: 'root', attrs: {}, children: [] };
    // 根据输入内容解析并构建树形结构
    const lines = input.split('\n');
    console.log(lines)
    for (const line of lines) {
        const trimmedLine = line.trim();
        if (trimmedLine.startsWith('<p')) {
            // 获取p标签中的内容
            let content = trimmedLine.substring(trimmedLine.indexOf('>') + 1, trimmedLine.length - 4);
            const paragraphNode: TNode = { type: 'p', attrs: {}, content: '', children: [] };

            if (content.includes('<b>')) {
                // 匹配加粗的文字,数组形式
                const boldMatches = content.match(/<b>(.*?)<\/b>/g);
                // boldMatches?.forEach((substr => {
                //     // 匹配文字段
                //     console.log(substr)
                // }))
                // console.log(boldMatches)
                // 加粗处理
                if (boldMatches) {
                    // 开始进行text子串push
                    for (let i = 0; i < boldMatches.length; i++) {
                        let str = content.substring(0, content.indexOf(boldMatches[i]))

                        content = content.replace(boldMatches[i], '')//删除b标签
                        //  push text标签
                        if (str) {
                            const textNode: TNode = { type: 'text', attrs: {}, content: str };
                            paragraphNode.children?.push(textNode)
                        }
                        content = content.replace(str, '')

                        const Btext = boldMatches[i].substring(boldMatches[i].indexOf('<b>') + 3, boldMatches[i].indexOf('</b>'))
                        const boldText: TNode = { type: 'b', attrs: {}, children: [], content: Btext }
                        // push进children数组
                        console.log(Btext)
                        paragraphNode.children?.push(boldText)
                        console.log(paragraphNode)
                    }
                }

                // for (let i = 0; i < contentParts.length; i++) {
                //     const contentPart = contentParts[i]
                //     // 跳过第一个
                //     if (contentPart) {
                //         const [boldText, text] = content.split('</b>');
                //         console.log(boldText, text)
                //     }
                //     if (i !== 0) {
                //         // 添加文本节点
                //         const textNode: TNode = { type: 'text', attrs: {}, content: contentParts[i].split('</b>')[0] };
                //         boldNode.children?.push(textNode);
                //     }
                //     console.log(boldNode.children)
                //     // 添加粗体节点
                //     const bTagContent = contentParts[i].substring(contentParts[i].indexOf('</b>') + 4);
                //     if (bTagContent) {
                //         const newBoldNode: TNode = { ...boldNode };
                //         paragraphNode.children?.push(newBoldNode);
                //         // console.log(paragraphNode.children)
                //     }
                // }
                // if (boldNode.children && boldNode.children.length > 0) {
                //     paragraphNode.children?.push(boldNode);
                // }
            } else {
                // 加粗
                // 添加文本节点
                // const paragraphNode: TNode = { type: 'p', attrs: {}, content: content, children: [] };
                paragraphNode.content = content
                const textNode: TNode = { type: 'text', attrs: {}, content: content };
                console.log(content)
                // paragraphNode.children?.push(textNode);
                // rootNode.children?.push(paragraphNode);
            }
            rootNode.children?.push(paragraphNode);
            console.log(rootNode)


        }
        // 可以添加其他处理不同类型节点的逻辑
    }
    return rootNode;
}

function BoldText() {
    // 需要判断一下有无选中文字
    const selection: Selection = window.getSelection()!;
    const range: Range = selection.getRangeAt(0);
    const selectedText: string = range.toString();
    // // 选中文本的节点标签
    // const startNode: Node | null = range.startContainer.parentNode
    // const endNode: Node | null = range.endContainer.parentNode
    // if (startNode?.nodeName !== 'B' ) {
    const boldText: string = `<b>${selectedText}</b>`;
    range.deleteContents();
    range.insertNode(document.createRange().createContextualFragment(boldText));
    // }
    selection.removeAllRanges();
    handleInput
}
function save() {
    const saveContent = editor.value.innerHTML;
    console.log(parseInput(saveContent))
}

</script>
<template>
    <div class="page">
        <button @click="BoldText">加粗</button>
        <button @click="save">保存</button>
        <div class="content" ref="editor" contenteditable="true" @input="handleInput">
            <p><br /></p>
        </div>
        <div class="testboc" v-html="renderNodeTree(state)"></div>
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