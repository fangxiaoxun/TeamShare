const { conMysql } = require('../lib/db')
// 生成token的包
const jWT = require('jsonwebtoken')
// 定义Secret密钥
const secret = 'login2023'

// 生成token
const createToken = (account, password) => {
    let sql = `select * from user where account = '${account}' and password = '${password}'`
    return conMysql(sql).then(result => {
        // 生成token
        const token = jWT.sign({
            userId: result[0].userId,
            username: result[0].username,
            headPortrait: result[0].headPortrait
        },
            secret,//密钥进行加密
            { expiresIn: "24h" } //token有效时间
        )

        return {
            token: 'Bearer ' + token
        }
    }).catch(_ => result = undefined)
}

// 用户注册
const regUser = (username, account, password) => {
    let sql = `select * from user where username = '${username}' or account = '${account}'`
   
    return conMysql(sql).then(result => {
        // 有返回结果说明改用户已存在
        if (result.length > 0) {
            return result = undefined
        } else {
            // 无返回结果才可以注册
            console.log('catch', result);
            let sql = `insert into user set ?`
            return conMysql(sql, { username, account, password }).then(result => {
                console.log('111', result);
                return { msg: '成功' }
            })
        }
    })

}



module.exports = { createToken, regUser }