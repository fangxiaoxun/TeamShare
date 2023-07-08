<script lang="ts" setup>
import { el } from 'element-plus/es/locale';
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

// const state: TNode[] = [{
//     ...paragraph,
//     children: [
//         { ...text, content: 'text ' },
//         { ...text, marks: [strong], content: 'strong' },
//         { ...text, marks: [strong, em], content: 'italic text' },
//     ]
// }];
// console.log(state)

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

}

function addTag(element: any) {
    if (element.childNode <= 1) {
        return element.textContent
    }
    // return addTag(element)
}



// 转换输入 存储
function parseInput(input: string): TNode {
    const rootNode: TNode = { type: 'root', attrs: {}, marks: [], children: [] };
    // 根据输入内容解析并构建树形结构
    // const regex = /<(?:p|div)[^>]*>(.*?)<\/(?:p|div)>/g;
    // const matches = input.matchAll(regex);
    // const paragraphs = Array.from(matches, match => match[1]);
    // console.log(paragraphs);

    // for (const line of paragraphs) {
    //     const paragraphNode: TNode = { ...paragraph, marks: [], children: [] };
    //     const html = line;
    //     const parser = new DOMParser();
    //     const doc = parser.parseFromString(html, 'text/html');

    //     const elements = doc.body.getElementsByTagName('*');
    //     console.log(elements)
    //     for (let i = 0; i < elements.length; i++) {
    //         const element = elements[i];
    //         const tagName = element.tagName.toLowerCase();
    //         const textContent = element.textContent!;
    //         const textNode: TNode = { ...text, marks: [], content: textContent }
    //         // textNode.marks.push(tagName)
    //         if (tagName == 'b') {
    //             textNode.marks?.push(strong)
    //         } else if (tagName == 'i') {
    //             textNode.marks?.push(em)
    //         }
    //         // 递归？从里层开始加 tag
    //         // 递归条件  element.childNodes<=1 
    //         console.log(element.tagName)
    //         paragraphNode.children?.push(textNode)
    //     }


    //     rootNode.children?.push(paragraphNode)

    // 获取p标签中的内容
    // p节点
    // const paragraphNode: TNode = { ...paragraph, children: [] };
    // 存在 b 标签
    // if (content.includes('<b>')) {
    //     // 匹配加粗的文字,数组形式
    //     const regex = /<b>(.*?)<\/b>/g;
    //     // const boldMatches = content.match(/<b>(.*?)<\/b>/g);
    //     const matches = content.matchAll(regex);
    //     const boldContent = Array.from(matches, match => match[1]);

    //     console.log(boldContent)
    //     // 加粗处理
    //     boldContent.forEach((Btext, index) => {
    //         // console.log(content.indexOf('<b>'))
    //         let str = content.substring(0, content.indexOf('<b>'))
    //         console.log(str)
    //         content = content.replace(`<b>${Btext}</b>`, '')//删除b标签
    //         //  push text标签
    //         if (str) {
    //             const textNode: TNode = { ...text, content: str };
    //             paragraphNode.children?.push(textNode)
    //         }
    //         content = content.replace(str, '')
    //         const boldText: TNode = { ...strong, children: [], content: Btext }
    //         console.log(boldText)
    //         paragraphNode.children?.push(boldText)

    //         if (index >= boldContent.length - 1) {
    //             console.log(content)
    //             const textNode: TNode = { ...text, content: content };
    //             paragraphNode.children?.push(textNode)
    //         }
    //     })
    //     rootNode.children?.push(paragraphNode)





    //     // if (boldMatches) {
    //     //     // 开始进行text子串push
    //     //     for (let i = 0; i < boldMatches.length; i++) {
    //     //         let str = content.substring(0, content.indexOf(boldMatches[i]))
    //     //         content = content.replace(boldMatches[i], '')//删除b标签
    //     //         //  push text标签
    //     //         if (str) {
    //     //             const textNode: TNode = { ...text, content: str };
    //     //             paragraphNode.children?.push(textNode)
    //     //         }
    //     //         content = content.replace(str, '')
    //     //         // console.log(boldMatches)
    //     //         const Btext = boldMatches[i].substring(boldMatches[i].indexOf('<b>') + 3, boldMatches[i].indexOf('</b>'))
    //     //         const boldText: TNode = { ...strong, children: [], content: Btext }
    //     //         // push进children数组
    //     //         paragraphNode.children?.push(boldText)

    //     //         if (i >= boldMatches.length - 1) {
    //     //             const textNode: TNode = { ...text, content: content };
    //     //             paragraphNode.children?.push(textNode)
    //     //         }
    //     //     }
    //     //     rootNode.children?.push(paragraphNode)

    //     // }
    // } else {
    //     // 添加文本节点
    //     const textNode: TNode = { ...text, content: content };
    //     paragraphNode.children?.push(textNode);
    //     rootNode.children?.push(paragraphNode);
    // }
    // 添加其他处理不同类型节点的逻辑
    return rootNode;
}
// console.log(rootNode)
// return rootNode;
// }
// interface TNode {
//     type: string;
//     content?: string | null;
//     marks?: string[];
//     children?: TNode[];
// }

function parseNodes(element: Element): TNode[] {
    const childNodes = element.childNodes;
    const nodes: TNode[] = [];

    for (let i = 0; i < childNodes.length; i++) {
        const childNode = childNodes[i];

        if (childNode.nodeType === Node.TEXT_NODE) {
            if (childNode.textContent?.trim()) {
                nodes.push({ type: 'text', content: childNode.textContent.trim() ,attrs:{}});
            }
        } else if (childNode.nodeType === Node.ELEMENT_NODE) {
            const childElement = childNode as Element;
            const node: TNode = { type: childElement.tagName.toLowerCase() ,attrs:{}};

            if (childElement.tagName.toLowerCase() === 'strong') {
                node.marks = [strong];
            } else if (childElement.tagName.toLowerCase() === 'em') {
                node.marks = [em];
            }

            node.children = parseNodes(childElement);
            nodes.push(node);
        }
    }

    return nodes;
}

const html = '<p>text <strong>strong</strong><em><strong>italic text</strong></em></p>';
const parser = new DOMParser();
const doc = parser.parseFromString(html, 'text/html');
const body = doc.querySelector('body')!;
const state: TNode[] = parseNodes(body);

console.log(state);




function BoldText() {
    // 需要判断一下有无选中文字
    const selection: Selection = window.getSelection()!;
    if (selection.rangeCount > 0) {
        const range: Range = selection.getRangeAt(0);
        const selectedText: string = range.toString();

        // // 选中文本的节点标签
        const boldText: string = `<b>${selectedText}</b>`;
        // console.log(document.createRange().createContextualFragment(boldText))
        range.deleteContents();
        range.insertNode(document.createRange().createContextualFragment(boldText));
        selection.removeAllRanges();

    }
}
function save() {
    const saveContent = editor.value.innerHTML;
    // console.log(parseInput(saveContent))
    // 识别标签文本

    // traverse()


    interface TNode {
        type: string;
        content?: string;
        marks?: string[];
        children?: TNode[];
    }

    function traverse(element: Element): TNode {
        const tagName = element.tagName.toLowerCase();
        const textContent = element.textContent?.trim();
        const childNodes = element.childNodes;

        if (childNodes.length === 1 && childNodes[0].nodeType === Node.TEXT_NODE) {
            // 如果只有一个文本节点，则直接返回文本内容
            return { type: 'text', marks: [tagName], content: textContent };
        }

        const children: TNode[] = [];
        for (let i = 0; i < childNodes.length; i++) {
            const childNode = childNodes[i];
            if (childNode.nodeType === Node.ELEMENT_NODE) {
                const child = traverse(childNode as Element); // 递归处理子节点
                children.push(child);
            }
        }

        const node: TNode = { type: tagName, content: textContent, children };
        console.log(tagName)
        switch (tagName) {
            case 'b':
                node.marks = ['b'];
                break;
            case 'i':
                node.marks = ['em'];
                break;
            default:
                break;
        }

        return node;
    }

    const html = saveContent;
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const body = doc.querySelector('body')!;
    console.log(doc)
    console.log(body)

    const result: TNode = traverse(body);
    console.log(result);
}





console.log(renderNodeTree(state))


</script>
<template>
    <div class="page">
        <div class="testbox" v-html="renderNodeTree(state)"> </div>
        <button @click="BoldText">加粗</button>
        <button @click="save">保存</button>
        <div class="content" ref="editor" contenteditable="true" @input="handleInput">
            <p><br /></p>
        </div>
        <p class="test">哈哈哈哈哈<b><span><i>嘿嘿嘿</i></span></b>嘻嘻嘻嘻嘻嘻嘻</p>
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