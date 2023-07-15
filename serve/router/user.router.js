// 导入数据模型
const {SuccessModel,ErrorModel} = require("../model/resModel")
const {createToken,regUser} = require('../controller/user.controller')


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
}


module.exports = userRouterHandler

