const { select, insert, update } = require('../lib/db')
const jWT = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const secret = 'login2023'

const createToken = async (userId, password) => {
    try {
        const [user] = await select('*').from('users').where('userId', userId)

        if (!user) {
            throw new Error('用户不存在')
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            throw new Error('用户密码错误')
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

const regUser = async (userName, password, email = null) => {
    try {
        const hashPassword = await bcrypt.hash(password, 10)
        
        const [result] = await insert('user').values({
            userName,
            password: hashPassword,
            email
        })
        return { userId: result.insertId}
        
    } catch (error) {
        console.error('用户注册失败', error)
        return undefined
    }
}

module.exports = { createToken, regUser, refreshToken}