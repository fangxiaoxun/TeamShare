// 导入数据模型
const {SuccessModel,ErrorModel} = require("../model/resModel")
const {createToken,regUser,refreshToken} = require('../controller/user.controller')
const upload = require('../utils/upload')

const userRouterHandler = async(req,res) =>{
    console.log('userRouterHandler')
    const method = req.method
    const path = req.path
    // const url = req.url
    // const params = url.split('?')[1]
   
    // 解析query
    // req.query = querystring.parse(url.split('?')[1])

    // 用户登录
    if(method === 'POST' && path === '/login'){
        const {account,password} = req.body
        const $data = await createToken(account,password)
        if($data){
            return res.send(new SuccessModel({msg:'登录成功',data:$data}))
        }else{
            return res.send(new ErrorModel({msg:'用户名或密码错误'}))
        }
       
    }

    // 用户注册
    if(method === 'POST' && path === '/register'){
        const {username,account,password} = req.body
        console.log(username,account,password);
        const $data = await regUser(username,account,password)
        if($data){
            return res.send(new SuccessModel({msg:'OK,注册成功'}))
        }else{
            return res.send(new ErrorModel({msg:'注册失败，该用户已存在'}))
        }
    }

    // 获取用户信息
    if(method === 'GET' && path === '/getUser'){
       return res.send(new SuccessModel({msg:'成功',data:req.auth}))
    }

    // 上传用户头像
    if(method === 'POST' && path === '/uploadHeadPortrait'){
        upload(req,res,'headPortrait')
    }

    // 更新Token
    if(method === 'GET' && path === '/refreshToken'){
        const {userId,username,headPortrait} = req.auth
        const $data = refreshToken(userId,username,headPortrait)
        return res.send(new SuccessModel({msg:'OK',data:$data}))
    }
}


module.exports = userRouterHandler

