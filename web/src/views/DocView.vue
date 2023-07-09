
<template>
    <section>
        <header>
            <TopBar>
                <div class="toolList">
                    <label title="绘制后保持所选工具栏状态">
                        <svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 20 20" class="" fill="none"
                            stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                            <g>
                                <path
                                    d="M13.542 8.542H6.458a2.5 2.5 0 0 0-2.5 2.5v3.75a2.5 2.5 0 0 0 2.5 2.5h7.084a2.5 2.5 0 0 0 2.5-2.5v-3.75a2.5 2.5 0 0 0-2.5-2.5Z"
                                    stroke="currentColor" stroke-width="1.25"></path>
                                <path d="M10 13.958a1.042 1.042 0 1 0 0-2.083 1.042 1.042 0 0 0 0 2.083Z"
                                    stroke="currentColor" stroke-width="1.25"></path>
                                <mask id="UnlockedIcon" maskUnits="userSpaceOnUse" x="6" y="1" width="9" height="9"
                                    style="mask-type: alpha;">
                                    <path stroke="none"
                                        d="M6.399 9.561V5.175c0-.93.401-1.823 1.116-2.48a3.981 3.981 0 0 1 2.693-1.028c1.01 0 1.98.37 2.694 1.027.715.658 1.116 1.55 1.116 2.481"
                                        fill="#fff"></path>
                                </mask>
                                <g mask="url(#UnlockedIcon)">
                                    <path stroke="none"
                                        d="M5.149 9.561v1.25h2.5v-1.25h-2.5Zm5.06-7.894V.417v1.25Zm2.559 3.508v1.25h2.5v-1.25h-2.5ZM7.648 8.51V5.175h-2.5V8.51h2.5Zm0-3.334c0-.564.243-1.128.713-1.561L6.668 1.775c-.959.883-1.52 2.104-1.52 3.4h2.5Zm.713-1.561a2.732 2.732 0 0 1 1.847-.697v-2.5c-1.31 0-2.585.478-3.54 1.358L8.36 3.614Zm1.847-.697c.71 0 1.374.26 1.847.697l1.694-1.839a5.231 5.231 0 0 0-3.54-1.358v2.5Zm1.847.697c.47.433.713.997.713 1.561h2.5c0-1.296-.56-2.517-1.52-3.4l-1.693 1.839Z"
                                        fill="currentColor"></path>
                                </g>
                            </g>
                        </svg>
                    </label>
                    <!-- 分割线 -->
                    <div class="divide"></div>
                    <label title="增大字号 ctrl+]">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M11.895 5h-1.789L5 19h1.493l1.459-4h6.098l1.459 4h1.493L11.895 5zm1.68 8.7l-2.574-7.06-2.575 7.06h5.15z"
                                fill="#454D5A"></path>
                            <path d="M17.351 5.35h1.3v2.5h2.35v1.3h-2.35v2.2h-1.3v-2.2h-2.35v-1.3h2.35v-2.5z"
                                fill="#454D5A"></path>
                        </svg>
                    </label>
                    <label title="减小字号 ctrl+[" ref="tool">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M11.895 5h-1.789L5 19h1.493l1.459-4h6.098l1.459 4h1.493L11.895 5zm1.68 8.7l-2.574-7.06-2.575 7.06h5.15z"
                                fill="#454D5A"></path>
                            <path d="M21.001 7.85h-6v1.3h6v-1.3z" fill="#454D5A"></path>
                        </svg>
                    </label>
                    <label title="加粗 ctrl+B" @click="addTag('b')">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M8.3 6.8h4.2a2.2 2.2 0 010 4.4H8.3V6.8zM7 5.5h5.5a3.5 3.5 0 012.34 6.103 3.75 3.75 0 01-1.59 7.147H7V5.5zm1.3 7.05h4.95a2.45 2.45 0 110 4.9H8.3v-4.9z"
                                fill="#454D5A"></path>
                        </svg>
                    </label>
                    <label title="斜体 ctrl+I" @click="addTag('i')">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M10 6.375c0-.345.28-.625.625-.625h5.25a.625.625 0 110 1.25h-1.708l-3.334 10h2.042a.625.625 0 110 1.25h-5.75a.625.625 0 110-1.25h2.208l3.334-10h-2.042A.625.625 0 0110 6.375z"
                                fill="#454D5A"></path>
                        </svg>
                    </label>
                    <label title="下划线 ctrl+U" @click="addTag('u', 'underline')">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M18 18.3v1.3H5v-1.3h13zM8.4 5v7.5a3.1 3.1 0 002.924 3.095l.176.005a3.1 3.1 0 003.095-2.924l.005-.176V5H16v7.5a4.5 4.5 0 11-9 0V5h1.4z"
                                fill="#454D5A"></path>
                        </svg>
                    </label>
                    <!-- 高亮 -->
                    <label title="突出显示" @click="addTag('mark')">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M19.454 8.666L11.48 4.062a.46.46 0 00-.63.168l-4.603 7.975a.46.46 0 00.168.629l1.963 1.133L6 18.086h5.774l.934-1.619 1.682.971a.46.46 0 00.629-.168l4.604-7.975a.46.46 0 00-.169-.629zm-11.73 3.48l3.814-6.607 6.607 3.814-3.814 6.607-6.607-3.814z"
                                fill="#454D5A"></path>
                        </svg>
                        <div class="high-light"></div>
                    </label>
                    <label title="字体颜色">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M11.106 4h1.789l5.107 14h-1.493l-1.46-4H8.953l-1.459 4H6l5.106-14zm.895 1.64l2.575 7.06h-5.15l2.575-7.06z"
                                fill="#454D5A"></path>
                        </svg>
                        <div class="current-color"></div>
                    </label>
                    <label title="对齐" v-click-outside="onClickOutside">
                        <svg v-if="duiMenu[0].isSelected" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M5 6h14v1.4H5V6zM5 11.3h8v1.4H5v-1.4z"
                                fill="#454D5A"></path>
                            <path d="M5 16.6h14V18H5v-1.4z" fill="#454D5A"></path>
                        </svg>
                        <svg v-else-if="duiMenu[1].isSelected" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M5 6h14v1.4H5V6zM8 11.3h8v1.4H8v-1.4zM19 16.6H5V18h14v-1.4z" fill="#454D5A"></path>
                        </svg>
                        <svg v-else-if="duiMenu[2].isSelected" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M5 6h14v1.4H5V6zm6 5.3h8v1.4h-8v-1.4zm8 5.3H5V18h14v-1.4z" fill="#454D5A"></path>
                        </svg>
                        <svg v-else-if="duiMenu[3].isSelected" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M5 6h14v1.4H5V6zm0 5.3h14v1.4H5v-1.4zm14 5.3H5V18h14v-1.4z" fill="#454D5A"></path>
                        </svg>
                        <div class="arrow-contain">
                            <div class="arrow"></div>
                        </div>
                        <ul class="dui-menu" ref="duiNode">
                            <li :class="duiMenu[0].isSelected ? 'dui-selected' : ''" @click="changeDui(0o1)">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M5 6h14v1.4H5V6zM5 11.3h8v1.4H5v-1.4z"
                                        fill="#454D5A"></path>
                                    <path d="M5 16.6h14V18H5v-1.4z" fill="#454D5A"></path>
                                </svg>
                            </li>
                            <li :class="duiMenu[1].isSelected ? 'dui-selected' : ''" @click="changeDui(0o2)">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 6h14v1.4H5V6zM8 11.3h8v1.4H8v-1.4zM19 16.6H5V18h14v-1.4z" fill="#454D5A">
                                    </path>
                                </svg>
                            </li>
                            <li :class="duiMenu[2].isSelected ? 'dui-selected' : ''" @click="changeDui(0o3)">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M5 6h14v1.4H5V6zm6 5.3h8v1.4h-8v-1.4zm8 5.3H5V18h14v-1.4z" fill="#454D5A"></path>
                                </svg>
                            </li>
                            <li :class="duiMenu[3].isSelected ? 'dui-selected' : ''" @click="changeDui(0o4)">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd"
                                        d="M5 6h14v1.4H5V6zm0 5.3h14v1.4H5v-1.4zm14 5.3H5V18h14v-1.4z" fill="#454D5A">
                                    </path>
                                </svg>
                            </li>
                        </ul>
                    </label>
                    <label title="插入图像"><svg aria-hidden="true" focusable="false" role="img" viewBox="0 0 20 20" class=""
                            fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round">
                            <g stroke-width="1.25">
                                <path d="M12.5 6.667h.01"></path>
                                <path
                                    d="M4.91 2.625h10.18a2.284 2.284 0 0 1 2.285 2.284v10.182a2.284 2.284 0 0 1-2.284 2.284H4.909a2.284 2.284 0 0 1-2.284-2.284V4.909a2.284 2.284 0 0 1 2.284-2.284Z">
                                </path>
                                <path d="m3.333 12.5 3.334-3.333c.773-.745 1.726-.745 2.5 0l4.166 4.166"></path>
                                <path d="m11.667 11.667.833-.834c.774-.744 1.726-.744 2.5 0l1.667 1.667"></path>
                            </g>
                        </svg></label>
                    <!-- 分割线 -->
                    <div class="divide"></div>
                    <label class="ToolIcon Shape" title="导出">
                        <svg t="1688386024642" class="icon" viewBox="0 0 1000 1000" version="1.1"
                            xmlns="http://www.w3.org/2000/svg" p-id="2312" width="200" height="200">
                            <path
                                d="M362.57 764.226h364.149c28.44 0 51.491-23.051 51.491-51.491v-364.149c0-28.44-23.051-51.491-51.491-51.491s-51.491 23.051-51.491 51.491v239.829l-349.073-349.073c-20.119-20.119-52.711-20.119-72.831 0s-20.119 52.711 0 72.831l349.073 349.073h-239.829c-14.202-0.001-27.093 5.754-36.415 15.076s-15.094 22.195-15.076 36.415c0 28.44 23.051 51.491 51.491 51.491z"
                                p-id="2313" fill="#707070"></path>
                        </svg>
                    </label>
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
                <button class="import">
                    <svg t="1688317675419" class="icon" viewBox="0 0 1000 1000" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="9579" data-spm-anchor-id="a313x.7781069.0.i10" width="200"
                        height="200">
                        <path
                            d="M259.774 362.57v364.149c0 28.44 23.051 51.491 51.491 51.491h364.149c28.44 0 51.491-23.051 51.491-51.491s-23.051-51.491-51.491-51.491h-239.829l349.073-349.073c20.119-20.119 20.119-52.711 0-72.831s-52.711-20.119-72.831 0l-349.073 349.073v-239.829c0.001-14.202-5.754-27.093-15.076-36.415s-22.195-15.094-36.415-15.076c-28.44 0-51.491 23.051-51.491 51.491z"
                            p-id="9580" fill="#8a8a8a" data-spm-anchor-id="a313x.7781069.0.i7" class="selected"></path>
                    </svg>
                </button>
                <button class="paging">
                    <svg t="1688318498705" class="icon" viewBox="0 0 1024 1024" version="1.1"
                        xmlns="http://www.w3.org/2000/svg" p-id="13275" id="mx_n_1688318498705" width="200" height="200">
                        <path
                            d="M787.692308 157.538462a78.769231 78.769231 0 0 1 78.76923 78.76923v551.384616a78.769231 78.769231 0 0 1-78.76923 78.76923H236.307692a78.769231 78.769231 0 0 1-78.76923-78.76923V236.307692a78.769231 78.769231 0 0 1 78.76923-78.76923h551.384616z m-295.384616 39.384615H236.307692a39.384615 39.384615 0 0 0-39.108923 34.776615L196.923077 236.307692v551.384616a39.384615 39.384615 0 0 0 34.776615 39.108923L236.307692 827.076923h256V196.923077zM787.692308 196.923077h-256v630.153846H787.692308a39.384615 39.384615 0 0 0 39.108923-34.776615L827.076923 787.692308V236.307692a39.384615 39.384615 0 0 0-34.776615-39.108923L787.692308 196.923077z m-381.952 223.547077a19.692308 19.692308 0 0 1 2.284307 25.127384l-2.284307 2.756924-62.818462 62.739692 64.708923 64.748308a19.692308 19.692308 0 0 1 2.244923 25.127384l-2.244923 2.717539a19.692308 19.692308 0 0 1-25.127384 2.284307l-2.756923-2.284307-78.611693-78.611693a19.692308 19.692308 0 0 1-2.244923-25.127384l2.244923-2.756923 76.760616-76.721231a19.692308 19.692308 0 0 1 27.844923 0z m212.676923 0a19.692308 19.692308 0 0 1 27.884307 0l76.721231 76.760615 2.284308 2.717539a19.692308 19.692308 0 0 1-2.284308 25.127384l-78.611692 78.611693-2.756923 2.284307a19.692308 19.692308 0 0 1-25.088-2.284307l-2.284308-2.756923a19.692308 19.692308 0 0 1 2.284308-25.088l64.669538-64.748308-62.818461-62.739692-2.244923-2.756924a19.692308 19.692308 0 0 1 2.244923-25.127384z"
                            fill="#515151" p-id="13276"></path>
                    </svg>
                </button>
                <!-- 用户 -->
                <User></User>
            </div>

        </header>
        <main>
            <LeftBar></LeftBar>
            <DocContent></DocContent>

        </main>
    </section>
</template>
    
<script lang="ts" setup>
import { ref, reactive } from 'vue';
import TopBar from '../components/common/ToolBar.vue';
import LeftBar from '../components/editor/LeftBar.vue';
import DocContent from '../components/editor/DocContent.vue';
import User from '../components/common/User.vue'
import { onClickOutside } from '../hooks/clickOutside'


let duiMenu = reactive([
    {
        id: 0o1,
        name: '左对齐',
        isSelected: true
    }, {
        id: 0o2,
        name: '居中对齐',
        isSelected: false
    },
    {
        id: 0o3,
        name: '右对齐',
        isSelected: false
    }, {

        id: 0o4,
        name: '两端对齐',
        isSelected: false

    }
])

let duiNode = ref()

function changeDui(key: number): void {
    for (let i in duiMenu) {
        if (key === duiMenu[i].id) {
            duiMenu[i].isSelected = true
        } else {
            duiMenu[i].isSelected = false
        }
    }
}


function createRangeFromNodes(startNode: Node, endNode: Node): Range {
    const range = document.createRange();
    range.setStart(startNode, 0);
    range.setEnd(endNode, (endNode.textContent || '').length);
    return range;
}

function getTextNodesInRange(commonAncestor: Node, startContainer: Node, endContainer: Node): Node[] {
    const textNodes: Node[] = [];

    // 检查是否为同一行
    if (isSameLine(startContainer, endContainer)) {
        return [startContainer];
    }

    // 获取首行的文本节点
    const startLineNodes = getTextNodesInLine(commonAncestor, startContainer);
    textNodes.push(...startLineNodes);

    // 获取中间行的文本节点
    const middleLines = getMiddleLines(startContainer, endContainer);
    for (const line of middleLines) {
        const lineNodes = getTextNodesInLine(commonAncestor, line);
        textNodes.push(...lineNodes);
    }

    // 获取末行的文本节点
    const endLineNodes = getTextNodesInLine(commonAncestor, endContainer);
    textNodes.push(...endLineNodes);

    return textNodes;
}

// 判断起始节点和结束节点是否在同一行
function isSameLine(startNode: Node, endNode: Node): boolean {
    const startLine = getLineNode(startNode);
    const endLine = getLineNode(endNode);
    return startLine === endLine;
}

// 获取节点所在的行节点
function getLineNode(node: Node): Node | null {
    let currentNode: Node | null = node;
    while (currentNode && currentNode.nodeName !== 'DIV' && currentNode.nodeName !== 'P' && currentNode.nodeName !== 'BR') {
        currentNode = currentNode.parentNode;
    }
    return currentNode;
}

// 获取两个节点之间的所有行节点（不包括起始和结束节点所在的行）
function getMiddleLines(startNode: Node, endNode: Node): Node[] {
    const middleLines: Node[] = [];

    const startLine = getLineNode(startNode);
    const endLine = getLineNode(endNode);

    if (!startLine || !endLine) {
        return middleLines;
    }

    let currentNode: Node | null = startLine.nextSibling;
    while (currentNode && currentNode !== endLine) {
        middleLines.push(currentNode);
        currentNode = currentNode.nextSibling;
    }

    return middleLines;
}

// 获取行节点上的文本节点function getTextNodesInLine(lineNode: Node, excludeNode?: Node): Node[] {
function getTextNodesInLine(lineNode: Node, excludeNode?: Node): Node[] {
    const textNodes: Node[] = [];

    traverseNodes(lineNode);

    function traverseNodes(node: Node) {
        if (node.nodeType === Node.TEXT_NODE) {
            if (!excludeNode || !excludeNode.contains(node)) {
                textNodes.push(node);
            }
        } else {
            for (let i = 0; i < node.childNodes.length; i++) {
                traverseNodes(node.childNodes[i]);
            }
        }
    }

    return textNodes;
}
// 选中文本添加标签
function addTag(tagName: string, className: string = '') {
    const selection = window.getSelection()!;
    const range = selection.getRangeAt(0);

    let startContainer = range.startContainer;
    let endContainer = range.endContainer;
    let newRangeStartOffset = range.startOffset;
    let newRangeEndOffset = range.endOffset;
    const commonAncestor = range.commonAncestorContainer;

    const textNodes = getTextNodesInRange(commonAncestor, startContainer, endContainer);

    for (const node of textNodes) {
        const nodeRange = createRangeFromNodes(node, node);
        const nodeText = nodeRange.toString();

        if (node === startContainer && node === endContainer) {
            // 选中的文本在同一个节点内
            const selectedText = nodeText.substring(range.startOffset, range.endOffset);

            if (selectedText.length < nodeText.length) {
                // 需要对起始节点和结束节点进行拆分处理
                const element = document.createElement(tagName);
                if (className) {
                    element.classList.add(className);
                }
                element.textContent = selectedText;

                // 将新标签插入到选中文本首尾两端的文本节点之间
                const beforeText = nodeText.substring(0, range.startOffset);
                const afterText = nodeText.substring(range.endOffset);

                const beforeTextNode = document.createTextNode(beforeText);
                const afterTextNode = document.createTextNode(afterText);

                const parent = node.parentNode;
                if (parent) {
                    parent.insertBefore(beforeTextNode, node);
                    parent.insertBefore(element, node);
                    parent.insertBefore(afterTextNode, node);

                    // 移除原始文本节点
                    parent.removeChild(node);
                }

                newRangeStartOffset = 0;
                newRangeEndOffset = selectedText.length;
            }
        } else if (node === startContainer) {
            // 选中的文本在起始节点中，需要对起始节点进行拆分处理
            const selectedText = nodeText.substring(range.startOffset);

            if (selectedText.length < nodeText.length) {
                const element = document.createElement(tagName);
                if (className) {
                    element.classList.add(className);
                }
                element.textContent = selectedText;

                nodeRange.setEnd(node, range.startOffset);
                nodeRange.deleteContents();
                nodeRange.insertNode(element);

                newRangeStartOffset = 0;
                newRangeEndOffset = selectedText.length;
            }
        } else if (node === endContainer) {
            // 选中的文本在结束节点中，需要对结束节点进行拆分处理
            const selectedText = nodeText.substring(0, range.endOffset);

            if (selectedText.length < nodeText.length) {
                const element = document.createElement(tagName);
                if (className) {
                    element.classList.add(className);
                }
                element.textContent = selectedText;

                nodeRange.setStart(node, range.endOffset);
                nodeRange.deleteContents();
                nodeRange.insertNode(element);

                const restText = nodeText.substring(range.endOffset);
                if (restText.length > 0) {
                    const restElement = document.createTextNode(restText);
                    nodeRange.insertNode(restElement);
                }

                newRangeStartOffset = 0;
                newRangeEndOffset = selectedText.length;

                // 使用新节点替换旧节点
                // 如果节点有父节点，才进行替换
                if (node.parentNode) {
                    node.parentNode.replaceChild(element, node);
                }
            }
        } else {
            // 选中的文本跨越多个节点，在中间节点处进行拆分处理
            const element = document.createElement(tagName);
            if (className) {
                element.classList.add(className);
            }
            element.textContent = nodeText;
            // console.log(' // 选中的文本跨越多个节点，在中间节点处进行拆分处理')
            // 获取选中范围的起始和结束节点
            const startContainer = nodeRange.startContainer as ChildNode;
            const endContainer = nodeRange.endContainer as ChildNode;
            // 创建一个临时父节点
            const parent = document.createElement(tagName);

            // 在临时父节点中插入新创建的元素
            parent.appendChild(element);

            if (startContainer.parentNode === endContainer.parentNode && startContainer.parentNode) {
                // 如果起始和结束节点的父节点相同，则直接替换选中范围的内容
                startContainer.parentNode.replaceChild(parent, startContainer);
            } else {
                // 如果起始和结束节点的父节点不同，需要分别处理起始和结束节点的父节点
                const startParent = startContainer.parentNode;
                const endParent = endContainer.parentNode;

                if (startParent && endParent) {
                    // 查找起始和结束节点在父节点中的位置
                    let startIndex = Array.from(startParent.childNodes).indexOf(startContainer);
                    let endIndex = Array.from(endParent.childNodes).indexOf(endContainer);

                    // 分别在起始和结束节点的父节点中进行替换操作
                    startParent.replaceChild(parent, startContainer);
                    endParent.replaceChild(parent.cloneNode(true), endContainer);

                    // 处理每个父节点中位于起始和结束节点之间的节点
                    for (let i = startIndex + 1; i < endIndex; i++) {
                        parent.appendChild(startParent.childNodes[startIndex + 1]);
                    }
                }

            }
        }

    }
}

</script>


<style lang="less" scoped>
section {
    box-sizing: border-box;
    background-color: @bgPrimary;

    header {
        display: flex;
        position: relative;
        padding: 16px;
        // background-color: palegoldenrod;

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
                    background-color: @button-color;
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
            width: 280px;
            height: 44px;

            button.share {
                width: 78px;
                background-color: @button-color;
                height: 36px;
                line-height: 36px;
                text-align: center;
                margin-left: 22px;
                color: #fff;
                border-radius: 8px;
                cursor: pointer;

                svg {
                    position: relative;
                    top: 2px;
                }
            }

            button.import,
            button.paging {
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


        }


    }

    main {
        display: flex;
        width: 100%;
        height: 100%;
        background-color: @bgPrimary;
    }
}
</style>



