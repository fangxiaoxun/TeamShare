/*
 * Author: fangxiaoxun 1272449367@qq.com
 * Date: 2023-08-07 16:08:56
 * LastEditors: fangxiaoxun 1272449367@qq.com
 * LastEditTime: 2025-02-23 15:18:17
 * 
 */
const { conMysql } = require("../lib/db")

// 查询文件夹列表
const getFolder =async (userId) => {
    let sql = `SELECT * FROM folders WHERE ownerId = ? AND deleteType = '0'`
    return await conMysql(sql, userId)
}
// 根据parentId查询文件夹列表
const getFolderByParentId = async (parentId) => {
    let sql = `SELECT * FROM folders WHERE parentId = ? AND deleteType = '0'`
    return await conMysql(sql, parentId)
}


// 删除指定文件夹
const delFolder = async (folderId) => {
    let delFolderSql = `UPDATE folders SET deleteType = 1 WHERE folderId = ${folderId}`
    await conMysql(delFolderSql)
    // 将文件夹下的文件也删除
    const delFileSql = `UPDATE files SET deleteType = 1 WHERE folderId = ${folderId}`
    return await conMysql(delFileSql)
}

// 增加文件夹, todo: 需要确认修改
const addFolder = async (folderName, ownerId, parentId, userName) => {
    const sql = `INSERT INTO folders SET ?`
    const folderData = {
        folderName,
        ownerId,
        parentId,
        ownerName: userName
    }
    try {
        const result = await conMysql(sql, folderData)
        console.log(result)
        return { folderId: result.insertId }
    } catch (error) {
        console.error('新增文件夹失败', error)
        throw error
    }
}

// 修改文件夹名字，需要修改更新字段
const updateFolder = (folderId, folderName) => {
    let sql = `update folders set foldername = '${folderName}' where folder_id = ${folderId}`
    return conMysql(sql)
}

// 收藏文件夹
const collectFolder = (folderId, collectDate) => {
    let sql = `update folders set collectType = 1,collectDate = '${collectDate}' where folderId = ${folderId}`
    return conMysql(sql)
}

// 取消收藏文件夹
const cancelCollectFolder = (folderId, collectDate) => {
    let sql = `update folders set collectType = 0,collectDate = '${collectDate}' where folderId = ${folderId}`
    return conMysql(sql)
}


// 获取收藏文件夹列表
const getCollectFolder = async (userId) => {
    const SQL = `SELECT * FROM folders WHERE collectBy = ? AND deleteType = 0`
    // let sql = `select folderId,foldername,userId,collectDate from folder where userId = ${userId} and collectType = 1 and deleteType = 0 order by collectDate asc`
    return conMysql(SQL, [userId])
}

// 恢复删除文件夹
const recoverFolder = async (folderId, lastDate) => {
    let sql = `update folders set deleteType = 0,lastDate = '${lastDate}' where folder_id = ${folderId}`
    const _ = await conMysql(sql)
    // 将文件夹下的文件也恢复
    let sql_1 = `update files set deleteType = 0,folderDelete = 0,lastDate = '${lastDate}' where folderId = ${folderId} and deleteType = 1 and folderDelete = 1`
    return await conMysql(sql_1)
}


module.exports = { getFolder, delFolder, addFolder, updateFolder, collectFolder, cancelCollectFolder, getCollectFolder, recoverFolder, getFolderByParentId}