// 导入数据模型
const {SuccessModel,ErrorModel} = require("../model/resModel")
const {getFolder,delFolder,addFolder,updateFolder} = require("../controller/folder.controller")

const folderRouterHandler = async(req,res) =>{
    console.log('folderRouterHandler');
    const method = req.method
    const path = req.path

    // 查询文件夹列表
    if(method === 'GET' && path === '/getFolder'){
        const userId = req.auth.userId
        const $data = await getFolder(userId)
        return res.send(new SuccessModel({msg:'OK',data:$data}))
    }

    // 删除指定文件夹
    if(method === 'GET' && path === '/delFolder'){
        console.log('folderId');
        const {folderId} = req.query
        delFolder(folderId)
        return res.send(new SuccessModel({msg:'删除成功'}))
    }

    // 添加文件夹
    if(method === 'GET' && path === '/addFolder'){
        const userId = req.auth.userId
        const {folderName} = req.query
        addFolder(folderName,userId)
        return res.send(new SuccessModel({msg:'OK，添加成功'}))
    }

    // 修改文件夹名字
    if(method === 'GET' && path === '/updateFolderName'){
        const {folderId,newFolderName} = req.query
        updateFolder(folderId,newFolderName)
        return res.send(new SuccessModel({msg:'OK，修改成功'}))
    }
}

module.exports = folderRouterHandler