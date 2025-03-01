/*
 * Author: fangxiaoxun 1272449367@qq.com
 * Date: 2023-08-07 16:08:56
 * LastEditors: fangxiaoxun 1272449367@qq.com
 * LastEditTime: 2025-02-23 15:18:06
 * 
 */
// 导入数据模型
const {SuccessModel,ErrorModel} = require("../model/resModel")
const {getFolder,delFolder,addFolder,updateFolder,collectFolder,getCollectFolder, recoverFolder, cancelCollectFolder} = require("../controller/folder.controller")
const Date = require('../utils/format')

const folderRouterHandler = async(req,res) =>{
    const method = req.method
    const path = req.path
    const {userId, userName} = req.auth

    // 查询文件夹列表
    if(method === 'GET' && path === '/getFolder'){
        const data = await getFolder(userId)
        return res.send(new SuccessModel({msg:'OK',data}))
    }
    // 根据parentId查询文件夹列表
    if(method === 'GET' && path === '/getFolderByParentId'){
        const { parentId } = req.query
        const data = await getFolderByParentId(parentId)
        return res.send(new SuccessModel({msg:'OK',data}))
    }

    // 删除指定文件夹
    if(method === 'GET' && path === '/delFolder'){
        const {folderId} = req.query
        const lastDate = new Date().Format("yyyy-MM-dd hh:mm:ss")
        delFolder(folderId,lastDate)
        return res.send(new SuccessModel({msg:'删除成功'}))
    }

    // 添加文件夹
    if(method === 'GET' && path === '/addFolder'){
        const {folderName, parentId} = req.query
        const data = await addFolder(folderName,userId, parentId, userName)
        return res.send(new SuccessModel({msg:'OK，添加成功',data}))
    }

    // 修改文件夹名字
    if(method === 'GET' && path === '/updateFolderName'){
        const {folderId,newFolderName} = req.query
        updateFolder(folderId,newFolderName)
        return res.send(new SuccessModel({msg:'OK，修改成功'}))
    }

    // 收藏文件夹
    if(method === 'GET' && path === '/collectFolder'){
        const {folderId} = req.query
        const collectDate = new Date().Format("yyyy-MM-dd hh:mm:ss")
        collectFolder(folderId,collectDate)
        return res.send(new SuccessModel({msg:'OK，收藏成功'}))
    }

    // 取消收藏文件夹
    if(method === 'GET' && path === '/cancelCollectFolder'){
        const {folderId} = req.query
        const collectDate = new Date().Format("yyyy-MM-dd hh:mm:ss")
        cancelCollectFolder(folderId,collectDate)
        return res.send(new SuccessModel({msg:'OK，取消收藏成功'}))
    }

    // 获取收藏文件夹列表
    if(method === 'GET' && path === '/getCollectFolder'){
        const data = await getCollectFolder(userId)
        return res.send(new SuccessModel({msg:'OK',data}))
    }

    // 恢复删除文件夹
    if(method === 'GET' && path === '/recoverFolder'){
        const folderId = req.query.folderId
        const lastDate = new Date().Format("yyyy-MM-dd hh:mm:ss")
        recoverFolder(folderId,lastDate)
        return res.send(new SuccessModel({msg:'OK，恢复成功'}))
    }
}

module.exports = folderRouterHandler