// 导入数据模型
const { SuccessModel, ErrorModel } = require("../model/resModel")
const { getLatest, getFile, addFile, updateFile, getLatestType, delFile, getCollectFile, getCollectFileType, getTrashList, recoverFile, searchFile, getFileListBySpaceId, addFileCollection,cancelCollectFile, inviteCollaborator} = require('../controller/file.controller')
const upload = require('../utils/upload');
const Date = require('../utils/format')
const fileRouterHandler = async (req, res) => {
    const method = req.method
    const path = req.path
    const userId = req.auth.userId

    // 上传图片并获取图片路径
    if (method === 'POST' && path === '/uploadImage') {
        upload(req, res, 'img')
    }

    // 上传文件并获取文件路径
    if (method === 'POST' && path === '/uploadFile') {
        upload(req, res, 'word')
    }

    // 获取最近文件列表
    if (method === 'GET' && path === '/getLatest') {
        const data = await getLatest(userId)
        console.log(data, '获取文件列表')
        return res.send(new SuccessModel({ msg: 'OK', data }))
    }

    // 最近根据文件类型分类的文件
    if (method === 'GET' && path === '/getLatestType') {
        const fileType = req.query.fileType
        const $data = await getLatestType(userId, fileType)
        return res.send(new SuccessModel({ msg: 'OK', data: $data }))
    }

    // 根据文件夹查询对应文件
    if (method === 'GET' && path === '/getFile') {
        const folderId = req.query.folderId
        const data = await getFile(userId, folderId)
        return res.send(new SuccessModel({ msg: 'OK', data }))
    }


    // 新建文件
    if (method === 'POST' && path === '/addFile') {
        console.log('新建文件', req.body, req.auth)
        const { fileName, spaceId, content } = req.body
        const { userName, userId } = req.auth
        let fileOption = { name: fileName, content, space_id: spaceId, path: null, owner_id: userId }
        const data = await addFile(fileOption)
        if (data) {
            return res.send(new SuccessModel({ msg: 'OK,添加成功', data }))
        } else {
            return res.send(new ErrorModel({ msg: '添加失败，检查是否缺少参数' }))
        }
    }

    // 修改文件
    if (method === 'POST' && path === '/updateFile') {
        const { fileId, fileName, content } = req.body
        updateFile(fileId, fileName, userId, content)
        return res.send(new SuccessModel({ msg: 'OK，修改成功' }))
    }

    // 删除文件
    if (method === 'GET' && path === '/delFile') {
        const fileId = req.query.fileId
        delFile(fileId, userId)
        return res.send(new SuccessModel({ msg: 'OK，删除成功' }))
    }

    // 收藏文件
    if (method === 'GET' && path === '/collectFile') {
        const {fileId} = req.query
        await addFileCollection(userId, fileId)
        return res.send(new SuccessModel({ msg: 'OK，收藏成功' }))
    }
    // 取消收藏文件
    if (method === 'GET' && path === '/cancelCollectFile') {
        const {fileId} = req.query
        await cancelCollectFile(userId, fileId)
        return res.send(new SuccessModel({ msg: 'OK，取消收藏成功' }))
    }

    // 获取收藏文件列表
    if (method === 'GET' && path === '/getCollectFile') {
        const data = await getCollectFile(userId)
        return res.send(new SuccessModel({ data }))
    }



    // 获取回收站列表
    if (method === 'GET' && path === '/getTrash') {
        const { userId } = req.auth
        const data = await getTrashList( userId)
        return res.send(new SuccessModel({ msg: 'OK', data }))
    }

    // 恢复删除文件
    if (method === 'GET' && path === '/recoverFile') {
        const { fileId } = req.query
        const result = recoverFile(fileId)
        console.log(result)
        res.send(new SuccessModel({ msg: '恢复成功' }))
    }

    // 通过文件名搜索文件
    if (method === 'GET' && path === '/searchFile') {
        const keyword = req.query.keyword
        const data = await searchFile(keyword, userId)
        res.send(new SuccessModel({ msg: 'OK', data }))
    }

    if (method === 'GET' && path === '/getFileListBySpaceId') {
        try {
            const { spaceId } = req.query
            const data = await getFileListBySpaceId(spaceId)
            res.send(new SuccessModel({ data }))
        } catch (error) {
            res.send(new ErrorModel({ msg: '获取失败', data: error }))
            throw error
        }
    }


    if(method === 'POST' && path === '/invitation') {
        try {
            const { fileId, collaboratorEmail } = req.body
            console.log(fileId, collaboratorEmail)
            const result = await inviteCollaborator(fileId, collaboratorEmail, userId)
            console.log(result)
            res.send(new SuccessModel({msg: '邀请成功'}))
        } catch (error) {
            res.send(new ErrorModel({msg: '邀请失败', data: error}))
        }
    }

}


module.exports = fileRouterHandler