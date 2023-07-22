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
        const access_token = jWT.sign({
            userId: result[0].userId,
            username: result[0].username,
            headPortrait: result[0].headPortrait
        },
            secret,//密钥进行加密
            { expiresIn: "8h" } //token有效时间
        )

        const refresh_token = jWT.sign({
            userId: result[0].userId,
            username: result[0].username,
            headPortrait: result[0].headPortrait
        },
            secret,//密钥进行加密
            { expiresIn: "3d" } //token有效时间
        )

        return {
            access_token: 'Bearer ' + access_token,
            refresh_token: 'Bearer ' + refresh_token
        }
    }).catch(_ => result = undefined)
}

// 更新token
const refreshToken = (userId, username, headPortrait) => {
    // 生成token
    const access_token = jWT.sign({
        userId,
        username,
        headPortrait,
    },
        secret,//密钥进行加密
        { expiresIn: "8h" } //token有效时间
    )

    return {
        access_token: 'Bearer ' + access_token,
    }
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
                let sql = `insert into folder set folderName = '我的云文档',userId = ${result.insertId}`
                // 默认新建我的云文档文件夹
                return conMysql(sql).then(_ => {
                    return { msg: '成功' }
                })

            })
        }
    })

}



module.exports = { createToken, regUser, refreshToken }