/*
 * Author: fangxiaoxun 1272449367@qq.com
 * Date: 2023-07-13 02:49:58
 * LastEditors: fangxiaoxun 1272449367@qq.com
 * LastEditTime: 2025-03-06 16:48:15
 * 
 */
/*
 * Author: fangxiaoxun 1272449367@qq.com
 * Date: 2023-07-13 02:49:58
 * LastEditors: fangxiaoxun 1272449367@qq.com
 * LastEditTime: 2025-03-03 21:05:38
 * 
 */
const express = require('express')
const app = express()
const Y = require('yjs')
// console.log(Y)
const sharedDoc = new Y.Doc('shared-document')
const  Hocuspocus  = require('@hocuspocus/server')
// const hocuspocus = Hocuspocus.Hocuspocus.createServer({
//     appId: 'my-app',
//     wsPort: 3000,
//     cors: true,
//     documentStore: (name) => {
//         return name === 'shared-document' ? sharedDoc: new Y.Doc(name)
//     },
//     userJoin: (connection, userInfo ) => {
//         console.log('user join room')
//     }
// })
// hocuspocus.on('connection', (connection) => {
//     connection.join('shared-doc') // 加入文档房间
// })

// hocuspocus.listen(3001, () => {
//     console.log('ws server running')
// })



const path = require('path')

// 解决跨域问题
const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')

// 导入校验token的模块，解析JWT字符串，还原成JSON对象的模块
const { expressjwt: jwt } = require('express-jwt')
// 生成token的密钥
const secret = 'login2023'

const { ErrorModel } = require("./model/resModel")
// 处理 x-www-form-urlencoded

app.use(bodyParser.urlencoded({ extended: true }))


// 处理application/json
app.use(bodyParser.json())

// 部署上线时读取静态文件
app.use(express.static(path.join(__dirname, './dist')))
app.use(express.static(path.join(__dirname, './upload')))
// 无需校验token的白名单
const whiteList = ['/user/login', '/user/register']
// 解析token
app.use(
    jwt({
        secret,
        algorithms: ['HS256'],
    })
        .unless({ path: whiteList })//登陆注册页无需校验
)


app.use('/user', require('./router/user.router.js'))

app.use('/folder', require('./router/folder.router.js'))
app.use('/file', require('./router/file.router.js'))
app.use('/space', require('./router/space.router.js'))


// token过期或不合法
app.use((err, req, res, next) => {
    console.log(err, 'token err', err.name === 'UnauthorizedError')
    if (err.name === 'UnauthorizedError') {
        res.send(new ErrorModel({ code: 401, msg: 'invalid token' }))
    } else {
        next()
    }
})


// 监听node服务器的端口号
const expressServer = app.listen(3000, () => {
    console.log('服务器已启动！！');
})


// 导入websocket服务
const WebSocket = require('ws')
const { connect } = require('http2')
const { userInfo } = require('os')
const wss = new WebSocket.Server({ server: expressServer })

// wss.on('connection', (ws) => {
//     console.log('启动 ws 连接');

//     ws.send(sharedDoc.toJSON())
//     // 监听连接事件
//     ws.on('message', (message) => {
//         sharedDoc.apply(message)
//         wss.clients.forEach(client => client.send(message))
//     })
//     ws.on('close', () => {
//         console.log('disconnected');
//     })
// })

