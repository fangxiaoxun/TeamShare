// import * as Y from 'yjs'
// // import { WebrtcProvider } from 'y-webrtc';
// import { WebsocketProvider } from 'y-websocket';

// // 创建 Y.Doc 对象，并指定文档名称
// const ydoc = new Y.Doc();
// const roomName = 'my-room'; // 房间名称


// // 使用 WebsocketProvider 连接到协同编辑房间
// const provider = new WebsocketProvider('ws://localhost:5173', roomName, ydoc);

// // 获取共享状态对象（在这个示例中，我们使用 Y.Text）
// const sharedText = ydoc.getText('shared-text');

// // 监听共享状态的变化事件
// sharedText.observe(event => {
//     console.log('Shared text updated:', sharedText.toString());
// });

// // 应用用户操作
// function applyUserOperation(operation: any) {
//     Y.applyUpdate(ydoc, operation);
// }

// // 同步用户操作
// function syncUserOperation(operation: any) {
//     provider.awareness.setLocalStateField('user', 'Alice'); // 设置当前用户的标识符
//     provider.awareness.setLocalStateField('cursor', null); // 设置光标位置（可选）

//     // 将用户操作发送给其他用户
//     provider.awareness.setLocalState(null);
//     provider.awareness.setLocalState(operation);

//     // 等待其他用户的操作被应用到本地
//     provider.synced;
//     console.log('Operations synced');
// }

// // 示例操作
// applyUserOperation([{
//     retain: sharedText.toString().length, // 保留已有文本长度
//     insert: 'Hello, World!', // 插入新文本
// }]);

// syncUserOperation(provider.awareness.getLocalState());

