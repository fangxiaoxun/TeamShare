<script lang="ts" setup>
import { ref } from 'vue'
import Word from './Word.vue'
const editor = ref<HTMLElement>(document.createElement('div'))

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
    if(userInput == ''){
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
        console.log(childNodes)

        if (childNode.nodeType === Node.TEXT_NODE) {
            if (childNode.textContent?.trim()) {
                nodes.push({ type: 'text', content: childNode.textContent.trim(), attrs: {} });
            }
        } else if (childNode.nodeType === Node.ELEMENT_NODE) {
            console.log(Node.ELEMENT_NODE)
            console.log(childNode)
            const childElement = childNode as Element;
            const node: TNode = { type: childElement.tagName.toLowerCase(), attrs: {} };

            if (childElement.tagName.toLowerCase() === 'b') {
                node.marks = [strong];
            } else if (childElement.tagName.toLowerCase() === 'i') {
                node.marks = [em];
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
    console.log(state)
    return state
}


console.log(save())

</script>
<template>
    <div class="page">
        <div class="content" ref="editor" contenteditable="true" @input="handleInput">
            <p><br /></p>
            <Word></Word>
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

.content{
    p{
        .underline{
            text-decoration: underline;
        }
    }
}
</style>