<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, onMounted } from 'vue'
const editor = ref<HTMLElement>(document.createElement('div'))
import { updateFile, newsetFile } from '@/api/files/index'
import { useFileStore } from '@/store/files'
import { useInfo } from '@/store/user'
import { diffChars } from 'diff'
import * as awarenessProtocol from 'y-protocols/awareness.js'

const fileStore = useFileStore()

interface TNode {
  type: string
  attrs: Record<string, any> //节点标签样式
  content?: string //节点存储内容
  marks?: TNode[] | null //标签类型
  children?: TNode[]
}
// 文段
const paragraph: TNode = {
  type: 'p',
  attrs: {},
}
// 文字
const text: TNode = {
  type: 'text',
  attrs: {},
}

// 加粗
const strong: TNode = {
  type: 'strong',
  attrs: {},
}

// 斜体
const em: TNode = {
  type: 'em',
  attrs: {},
}

const state: TNode[] = [
  {
    ...paragraph,
    children: [
      { ...text, content: 'text ' },
      { ...text, marks: [strong], content: 'strong' },
      { ...text, marks: [strong, em], content: 'italic text' },
    ],
  },
]
// 渲染文档内容
const renderNodeTree = (nodes: TNode[]) => {
  let html = ''

  for (const node of nodes) {
    if (node.type === 'text') {
      let content = node.content
      if (node.marks && node.marks.length > 0) {
        // 标记类型
        for (const mark of node.marks) {
          content = `<${mark.type}>${content}</${mark.type}>`
        }
      }
      html += content
    } else {
      const childrenHtml = renderNodeTree(node.children || [])
      html += `<${node.type}>${childrenHtml}</${node.type}>`
    }
  }
  return html
}

function parseNodes(element: Element): TNode[] {
  const childNodes = element.childNodes
  const nodes: TNode[] = []

  for (let i = 0; i < childNodes.length; i++) {
    const childNode = childNodes[i]

    if (childNode.nodeType === Node.TEXT_NODE) {
      // 文字节点
      if (childNode.textContent?.trim()) {
        nodes.push({
          type: 'text',
          content: childNode.textContent.trim(),
          attrs: {},
        })
      }
    } else if (childNode.nodeType === Node.ELEMENT_NODE) {
      const childElement = childNode as Element
      const node: TNode = {
        type: childElement.tagName.toLowerCase(),
        attrs: {},
      }

      if (childElement.tagName.toLowerCase() === 'b') {
        node.marks = [{ type: 'strong', attrs: {} }]
      } else if (childElement.tagName.toLowerCase() === 'i') {
        node.marks = [{ type: 'em', attrs: {} }]
      }

      node.children = parseNodes(childElement)
      nodes.push(node)
    }
  }

  return nodes
}

function save() {
  const saveContent = editor.value.innerHTML
  const html = saveContent
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const body = doc.querySelector('body')!
  const state: TNode[] = parseNodes(body)
  return state
}

const handleSave = (event: KeyboardEvent) => {
  if (event.ctrlKey && event.code === 'KeyS') {
    event.preventDefault()
    let content = JSON.stringify(save())
    // userInfo.setCurrConten(save())
    const fileInfo = fileStore.getCurrFile
    // 修改文件
    if (fileInfo.fileId) {
      const reqParams = {
        fileId: fileInfo.fileId,
        fileName: fileInfo.fileName,
        content: content,
      }
      updateFile(reqParams)
    } else {
      //新建文件
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
        //   todo:需要获取文件夹id
          const reqParams = {
            fileName: value,
            folderId: null,
            folderName: null,
            content: content,
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
//   if (userInfo.currContent?.length) {
    // const content = JSON.parse(userInfo.currContent)
    // const res = renderNodeTree(content)
    // editor.value.innerHTML += res
//   }
}
onMounted(() => {
  handleEnter()
})

// 定义socket服务器
// import io from 'socket.io-client';


// const socket = io('http://docserver.com:80');
// // 处理 WebSocket 连接和消息
// socket.on('connect', () => {
//   console.log('WebSocket 连接已建立');
// });
// socket.on('message', (data) => {
//   console.log('收到消息:', data);
// });
// socket.on('disconnect', () => {
//   console.log('WebSocket 连接已关闭');
// });
// socket.on('error', (error) => {
//   console.error('WebSocket 错误:', error);
// });








// 协同操作
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'

// 创建 Y.Doc 对象，并指定文档名称
const ydoc = new Y.Doc()
const roomName = 'room5' // 房间名称

// 使用 WebsocketProvider 连接到协同编辑房间
// const provider = new WebsocketProvider('wss://demos.yjs.dev',roomName, ydoc)
const provider = new WebsocketProvider('w`      s://localhost:8080', roomName, ydoc)

provider.on('sync', (isSynced:any) => {
  if (isSynced) {
    console.log('Connected to the Yjs room!')
  }
})

const awareness = provider.awareness
awareness.on('change', (changes: any) => {
  console.log(awareness.getStates(), 'info')
  console.log(Array.from(awareness.getStates().values()), 'info value')
})
const userInfo = useInfo()                                                  
awareness.setLocalStateField('user', {
  name: userInfo.username,
  color: '#bfa',
})

// 获取共享状态对象（在这个示例中，我们使用 Y.Text）
const sharedText = ydoc.getText('shared-text')
const yxmlFragment = ydoc.getXmlFragment('my xml fragment')
// 监听共享状态的变化事件
yxmlFragment.observe((event) => {
  // console.log(event.currentTarget)
  // console.log(provider)
})

// 监听文档更新事件     监听其他客户端的操作
ydoc.on('update', (update) => {
  // 将更新应用到文档对象
  Y.applyUpdate(ydoc, update)


  // 获取修改后的文本内容
  const modifiedContent = sharedText.toString()
  yxmlFragment.delete(0, yxmlFragment.length)
  // 进行编辑操作}
})




// 获得 yjs 中的某个数组类型的实例
const yarray = ydoc.getArray('my-array')
yarray.observeDeep((event) => {
  console.log('The array was changed:', event)
})





// // 获取增量更新
let previousContent = editor.value.innerText
// 获取输入的内容
const yxmlNested = new Y.XmlElement('p')

let modifiedContent = ''
const handleInput = (event: Event): any => {
  const userInput = (event.target as HTMLElement).innerText
  if (userInput == '') {
    ;(event.target as HTMLElement).innerHTML = `<p><br></p>`
  }
  const diff = diffChars(previousContent, userInput)
  for (const part of diff) {
    if (part.added) {
      modifiedContent += part.value
    } else if (part.removed) {
      modifiedContent = modifiedContent.replace(part.value, '')
    }
  }

  // 创建一个 Y.XmlText 对象并设置文本内容
  const textContent = new Y.XmlText()
  textContent.insert(0, modifiedContent)
  yxmlFragment.insert(yxmlFragment.length, [textContent])

  previousContent = userInput // 更新保存的内容
}

function getCursorPosition() {
  const selection = window.getSelection()
  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0)
    const { startOffset, endOffset } = range
    return { start: startOffset, end: endOffset }
  }
  return null
}
function getContentIndex() {
  const selection = window.getSelection()!
  const range = selection.getRangeAt(0)
  const clonedRange = range?.cloneRange()
  clonedRange?.selectNodeContents(editor.value)
  clonedRange?.setEnd(range.startContainer, range.startOffset)
  const content = clonedRange?.toString()

  return content?.length
}
function calculateCursorPosition(index: number) {
  const selection = window.getSelection()!
  const range = selection.getRangeAt(0)
  const clonedRange = range.cloneRange()
  clonedRange.collapse(true)
  const cursorElement = document.createElement('span')
  cursorElement.appendChild(document.createTextNode('|')) // 在光标位置添加一个临时的占位符

  clonedRange.insertNode(cursorElement)
  // range.setStart
}
</script>
<template>
  <div class="page" @keydown="handleSave">
    <p><br /></p>
    <div
      class="content"
      ref="editor"
      contenteditable="true"
      @input="handleInput"
    >
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
  box-shadow: rgba(0, 0, 0, 0.06) 0px 0px 10px 0px,
    rgba(0, 0, 0, 0.04) 0px 0px 0px 1px;

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
