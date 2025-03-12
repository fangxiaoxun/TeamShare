// 导入数据模型
const {SuccessModel,ErrorModel} = require("../model/resModel")
const { getSpacesList, updateSpace, createSpace, getSpaceMembers } = require("../controller/space.controller")

const spaceRouterHandler = async (req, res) => {
    // const method = req.method
    const {method, path} = req
    const { userId} = req.auth

    if(method === 'GET' && path === '/getSpaceList'){
        try {
            const data = await getSpacesList(userId)
            return res.send(new SuccessModel({data}))    
        } catch (error) {
            return res.send(new ErrorModel({msg:'查询失败',data:error}))
        }
    }
    if(method === 'GET' && path === '/getMembers'){
        try {
            const { spaceId } = req.query
            const data = await getSpaceMembers(spaceId)
            return res.send(new SuccessModel({data}))
        } catch (error) {
            return res.send(new ErrorModel({msg:'查询失败', data:error}))
        }
    }

    if(method === 'POST' && path === '/addSpace'){
        const { name, description } = req.body
        try {
            await createSpace( userId, name, description)
            return res.send(new SuccessModel({msg: '新建成功'}))
        } catch (error) {
            return res.send(new ErrorModel({msg:'新建失败', data:error}))
        }
    }
    if(method === 'POST' && path === '/updateSpace'){
        try {
            const { spaceId, name, description } = req.body
            await updateSpace(userId, spaceId, name, description)
            return res.send(new SuccessModel({msg:'更新成功', data}))
        } catch (error) {
            return res.send(new ErrorModel({msg:'更新失败', data:error}))
        }
    }





}


module.exports = spaceRouterHandler