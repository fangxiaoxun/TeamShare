// 导入数据模型
const {SuccessModel,ErrorModel} = require("../model/resModel")
const {createToken,regUser,refreshToken} = require('../controller/user.controller')
const upload = require('../utils/upload')

const userRouterHandler = async(req,res) =>{
    const method = req.method
    const path = req.path

    // 用户登录
    if(method === 'POST' && path === '/login'){
        const {userId,password} = req.body
        console.log(req.body, 'req.body')
        const data = await createToken(userId,password)
        if(data){
            return res.send(new SuccessModel({msg:'登录成功', data}))
        }else{
            return res.send(new ErrorModel({msg:'用户名或密码错误'}))
        }
    }

    // 用户注册
    if(method === 'POST' && path === '/register'){
        const {userName, password, email} = req.body
        const data = await regUser(userName,password, email)
        if(data){
            return res.send(new SuccessModel({msg:'用户注册成功', data}))
        }else{
            return res.send(new ErrorModel({msg:'用户注册失败'}))
        }
    }

    // 获取用户信息
    if(method === 'GET' && path === '/getUser'){
        console.log(req.auth, 'req.auth')
        return res.send(new SuccessModel({msg:'成功',data:req.auth}))
    }

    // 上传用户头像
    if(method === 'POST' && path === '/uploadHeadPortrait'){
        upload(req,res,'headPortrait')
    }

    // 更新Token
    if(method === 'GET' && path === '/refreshToken'){
        const {userId,username,headPortrait} = req.auth
        console.log(headPortrait)
        const data = refreshToken(userId,username,headPortrait)
        return res.send(new SuccessModel({msg:'OK',data}))
    }
}


module.exports = userRouterHandler

