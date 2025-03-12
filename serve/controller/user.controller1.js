/*
 * Author: fangxiaoxun 1272449367@qq.com
 * Date: 2023-08-07 16:08:56
 * LastEditors: fangxiaoxun 1272449367@qq.com
 * LastEditTime: 2025-02-17 18:07:53
 * 
 */
const { conMysql } = require('../lib/db')
// 生成token的包
const jWT = require('jsonwebtoken')

// 定义Secret密钥
const secret = 'login2023'
const bcrypt = require('bcrypt')


// 生成token
const createToken = async (userId, password) => {
    try {
        let sql = `SELECT * FROM user WHERE userId = ?`
        const result = await conMysql(sql, [userId])
        if (!result.length) {
            throw new Error('用户不存在')
        }


        const user = result[0]
        const isPasswordValid = await bcrypt.compare(password, user.password)
        console.log(user, 'user 登录信息')
        if (!isPasswordValid) {
            throw new Error('密码错误')
        }

        const access_token = jWT.sign(
            {
                userId: user.userId,
                userName: user.userName,
            },
            secret,
            { expiresIn: '8h' }
        )

        const refresh_token = jWT.sign(
            {
                userId: user.userId,
                userName: user.userName,
            },
            secret,
            { expiresIn: '3d' }
        )

        return {
            access_token: 'Bearer ' + access_token,
            refresh_token: 'Bearer ' + refresh_token
        }
    } catch (error) {
        console.error('token 生成失败', error)
        return result = undefined
    }
}

// 更新token
const refreshToken = (userId, userName, headPortrait) => {
    // 生成token
    const access_token = jWT.sign({
        userId,
        userName,
    },
        secret,//密钥进行加密
        { expiresIn: "8h" } //token有效时间
    )

    return {
        access_token: 'Bearer ' + access_token,
    }
}

// 用户注册
const regUser = async (userName, password, email = null) => {
    try {
        const saltRounds = 10;
        password = await bcrypt.hash(password, saltRounds);
        let sql = `INSERT INTO user (userName, password, email) VALUES (?, ?, ?)`
        const result = await conMysql(sql, [userName, password, email])
        const userId = result.insertId
        return {userId}
    } catch (error) {
        console.error('用户注册失败', error)
        return undefined
    }
}

module.exports = { createToken, regUser, refreshToken }