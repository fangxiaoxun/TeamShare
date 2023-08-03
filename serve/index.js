const express = require('express')
const app = express()

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
        algorithms: ['HS256'],//使用何种加密算法解析
    })
        .unless({ path: whiteList })//登陆注册页无需校验
)


app.use('/user', require('./router/user.router.js'))
app.use('/folder', require('./router/folder.router.js'))
app.use('/file', require('./router/file.router.js'))


// token过期或不合法
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError'){
        res.send(new ErrorModel({code:401,msg:'invalid token'}))
    } 
    // if (err.name === 'UnauthorizedError') {
    //     if (err.expiredAt) {
    //         const now = new Date().getTime();
    //         if (now > err.expiredAt) {
    //             return res.send(new ErrorModel({ code: 401, msg: 'token expired' }));   //超时前端自动处理
    //         }
    //     }
    //     // 检查 Token 是否可用
    //     if (!err.user) {
    //         return res.status(401).json({ code: 401, msg: 'invalid token' });   //报错重新登录
    //     }
    // }
    // next(err);
})


// 监听node服务器的端口号
app.listen(3000, () => {
    console.log('服务器已启动！！');
})


// 监听 ws 连接
// const websocket = require('ws')
// const wss = new websocket.Server({port:  5173})
// // 监听连接事件
// wss.on('connection', function connection(ws) {
//     // 监听接收消息事件
//     console.log('连接到websocket')
//     ws.on('message', function incoming(message) {
//       console.log('received:', message);
  
//       // 处理客户端发送的消息并进行相应的转发或同步操作
//       // ...
//     });
  
//     // 监听关闭连接事件
//     ws.on('close', function close() {
//       console.log('disconnected');
//     });
//   });