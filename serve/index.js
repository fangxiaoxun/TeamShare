const express = require('express')
const app = express()

// 解决跨域问题
const cors = require('cors')
app.use(cors())

const bodyParser = require('body-parser')
const multiparty = require('connect-multiparty')
// 处理 x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}))
// 处理 mutipart/form-data
app.use(multiparty())
// 处理application/json
app.use(bodyParser.json())

const {conMysql} = require('./lib/db')


app.get('/getUser',(req,res)=>{
    let sql = 'select * from user'
    conMysql(sql).then(result => {
        res.send({
			code:200,
			data:result
		})
    })
   
})

// 监听node服务器的端口号
app.listen(3000,()=>{
    console.log('服务器已启动！！');
})