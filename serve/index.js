const express = require('express')
const app = express()

const path = require('path')

// 解决跨域问题
const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')
const multiparty = require('connect-multiparty')

// 导入校验token的模块，解析JWT字符串，还原成JSON对象的模块
const {expressjwt:jwt} = require('express-jwt')
// 生成token的密钥
const secret = 'login2023'

const {ErrorModel} = require("./model/resModel")
// 处理 x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// 处理 mutipart/form-data
app.use(multiparty())
// 处理application/json
app.use(bodyParser.json())

// 部署上线时读取静态文件
app.use(express.static(path.join(__dirname, './dist')))

// 无需校验token的白名单
const whiteList = ['/user/login','/user/register']
// 解析token
app.use(
    jwt({
        secret,
        algorithms:['HS256'],//使用何种加密算法解析
    })
    .unless({path: whiteList})//登陆注册页无需校验
)


app.use('/user', require('./router/user.router.js'))
app.use('/folder',require('./router/folder.router.js'))


// token过期或不合法
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError'){
        res.send(new ErrorModel({msg:'invalid token'}))
    } 
})


// 监听node服务器的端口号
app.listen(3000, () => {
    console.log('服务器已启动！！');
})