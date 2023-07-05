<script lang="ts" setup>
import { ref } from 'vue'
const editor = ref<HTMLElement>(document.createElement('div'))

// onMounted(async () => {
//     await nextTick();
//     editor.value.focus();
// })

interface TNode {
    type: string;
    attrs: Record<string, any>;     //节点标签样式
    content?: string;   //节点存储内容
    marks?: TNode[];    //标签类型
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
    type: 'b',
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
    console.log(input)
    const regex = /<(?:p|div)[^>]*>(.*?)<\/(?:p|div)>/g;
    const matches = input.matchAll(regex);

    const paragraphs = Array.from(matches, match => match[1]);
    console.log(paragraphs)
    for (const line of paragraphs) {
            // 获取p标签中的内容
            let content = line
            // p节点
            const paragraphNode: TNode = { ...paragraph, children: [] };
            // 存在 b 标签
            if (content.includes('<b>')) {
                // 匹配加粗的文字,数组形式
                const boldMatches = content.match(/<b>(.*?)<\/b>/g);
                // 加粗处理
                if (boldMatches) {
                    // 开始进行text子串push
                    for (let i = 0; i < boldMatches.length; i++) {
                        let str = content.substring(0, content.indexOf(boldMatches[i]))
                        content = content.replace(boldMatches[i], '')//删除b标签
                        //  push text标签
                        if (str) {
                            const textNode: TNode = { ...text, content: str };
                            paragraphNode.children?.push(textNode)
                        }
                        content = content.replace(str, '')
                        const Btext = boldMatches[i].substring(boldMatches[i].indexOf('<b>') + 3, boldMatches[i].indexOf('</b>'))
                        const boldText: TNode = { ...strong, children: [], content: Btext }
                        // push进children数组
                        paragraphNode.children?.push(boldText)

                        if (i >= boldMatches.length - 1) {
                            const textNode: TNode = { ...text, content: content };
                            paragraphNode.children?.push(textNode)
                        }
                    }
                    rootNode.children?.push(paragraphNode)

                }
            } else {
                // 添加文本节点
                // paragraphNode.content = content
                const textNode: TNode = { ...text, content: content };
                paragraphNode.children?.push(textNode);
                rootNode.children?.push(paragraphNode);
            }
            console.log(rootNode)
        // 添加其他处理不同类型节点的逻辑
    }
    return rootNode;
}

function BoldText() {
    // 需要判断一下有无选中文字
    const selection: Selection = window.getSelection()!;
    const range: Range = selection.getRangeAt(0);
    const selectedText: string = range.toString();
    // // 选中文本的节点标签
    const boldText: string = `<b>${selectedText}</b>`;
    range.deleteContents();
    range.insertNode(document.createRange().createContextualFragment(boldText));
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
        <!-- <div class="testbox" v-html="renderNodeTree(state)"></div> -->
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