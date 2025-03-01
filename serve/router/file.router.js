// 导入数据模型
const {SuccessModel,ErrorModel} = require("../model/resModel")
const {getLatest,getFile,addFile,updateFile,getLatestType,getFileType,delFile,collectFile,cancelCollectFile,getCollectFile,getCollectFileType,getTrash,recoverFile,searchFile} = require('../controller/file.controller')
const upload = require('../utils/upload');
const Date = require('../utils/format')
const fileRouterHandler = async(req,res) => {
    console.log('fileRouterHandler');
    const method = req.method
    const path = req.path
    const userId = req.auth.userId

    // 上传图片并获取图片路径
    if(method === 'POST' && path === '/uploadImage'){
        upload(req,res,'img')
    }

    // 上传文件并获取文件路径
    if(method === 'POST' && path === '/uploadFile'){
        upload(req,res,'word')
    }

    // 获取最近文件列表
    if(method === 'GET' && path === '/getLatest'){
        const data = await getLatest(userId)
        return res.send(new SuccessModel({msg:'OK',data}))
    }

    // 最近根据文件类型分类的文件
    if(method === 'GET' && path === '/getLatestType'){
        const fileType = req.query.fileType
        const $data = await getLatestType(userId,fileType)
        return res.send(new SuccessModel({msg:'OK',data:$data}))
    }

    // 根据文件夹查询对应文件
    if(method === 'GET' && path === '/getFile'){
        const folderId = req.query.folderId
        const data = await getFile(userId,folderId)
        return res.send(new SuccessModel({msg:'OK',data}))
    }


    // 新建文件
    if(method === 'POST' && path === '/addFile'){
        console.log('新建文件', req.body, req.auth)
        const {fileName,folderName,folderId,content} = req.body
        const {userName, userId} = req.auth
        const owner = req.auth.userId
        let fileOption = {fileName,content,ownerId: owner, currentFolderId:folderId, currentFolderName:folderName,  path:null, ownerId:userId, ownerName:userName}
        const data = await addFile(fileOption)
        if(data){
            return res.send(new SuccessModel({msg:'OK,添加成功',data}))
        }else{
            return res.send(new ErrorModel({msg:'添加失败，检查是否缺少参数'}))
        }   
    }

    // 修改文件
    if(method === 'POST' && path === '/updateFile'){
        const {fileId,fileName,content} = req.body
        updateFile(fileId,fileName,userId,content)
        return res.send(new SuccessModel({msg:'OK，修改成功'}))
    }

    // 删除文件
    if(method === 'GET' && path === '/delFile'){
        const fileId = req.query.fileId
        delFile(fileId,userId)
        return res.send(new SuccessModel({msg:'OK，删除成功'}))
    }

    // 收藏文件
    if(method === 'GET' && path === '/collectFile'){
        const fileId = req.query.fileId
        const collectDate = new Date().Format("yyyy-MM-dd hh:mm:ss")
        collectFile(fileId,collectDate)
        return res.send(new SuccessModel({msg:'OK，收藏成功'}))
    }
    // 取消收藏文件
    if(method === 'GET' && path === '/cancelCollectFile'){
        const fileId = req.query.fileId
        const collectDate = new Date().Format("yyyy-MM-dd hh:mm:ss")
        cancelCollectFile(fileId)
        return res.send(new SuccessModel({msg:'OK，取消收藏成功'}))
    }

    // 获取收藏文件列表
     if(method === 'GET' && path === '/getCollectFile'){
        const creator = req.auth.username
        const $data = await getCollectFile(creator)
        return res.send(new SuccessModel({msg:'OK',data:$data}))
    }

    
    // 根据文件类型获取收藏文件列表
    if(method === 'GET' && path === '/getCollectFileType'){
        const creator = req.auth.username
        const fileType = req.query.fileType
        const $data = await getCollectFileType(creator,fileType)
        return res.send(new SuccessModel({msg:'OK',data:$data}))
    }

    // 获取回收站列表
    if(method === 'GET' && path === '/getTrash'){
        const {userId,username} = req.auth
        const nowDate = new Date().Format("yyyy-MM-dd hh:mm:ss")
        const $data = await getTrash(nowDate,userId,username)
        return res.send(new SuccessModel({msg:'OK',data:$data}))
    }

    // 恢复删除文件
    if(method === 'GET' && path === '/recoverFile'){
        const fileId = req.query.fileId
        const lastDate = new Date().Format("yyyy-MM-dd hh:mm:ss")
        recoverFile(fileId,lastDate)
        res.send(new SuccessModel({msg:'恢复成功'}))
    }

    // 通过文件名搜索文件
    if(method === 'GET' && path === '/searchFile'){
        const keyword = req.query.keyword
        const data = await searchFile(keyword,userId)
        res.send(new SuccessModel({msg:'OK',data}))
    }

  
}


module.exports = fileRouterHandler