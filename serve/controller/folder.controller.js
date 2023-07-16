const { conMysql } = require("../lib/db")

// 查询文件夹列表
const getFolder = (userId) => {
    console.log('getFolder');
    let sql = `select folderId,foldername,collectType from folder where userId = ${userId} and deleteType = 0`

    return conMysql(sql)
}


// 删除指定文件夹
const delFolder = (folderId, lastDate) => {
    let sql = `update folder set deleteType = 1,lastDate = '${lastDate}' where folderId = ${folderId}`
    return conMysql(sql).then(_ => {
        // 将文件夹下的文件也删除
        let sql = `update file set deleteType = 1,folderDelete = 1 where folderId = ${folderId}`
        conMysql(sql)
    })
}

// 增加文件夹
const addFolder = (foldername, userId) => {
    console.log('addFolder');
    let sql = `insert into folder set ?`
    return conMysql(sql, { foldername, userId })
}

// 修改文件夹名字
const updateFolder = (folderId, newFolderName) => {
    let sql = `update folder set folderName = '${newFolderName}' where folderId = ${folderId}`
    return conMysql(sql)
}

// 收藏文件夹
const collectFolder = (folderId, collectDate) => {
    let sql = `update folder set collectType = 1,collectDate = '${collectDate}' where folderId = ${folderId}`
    return conMysql(sql)
}

// 获取收藏文件夹列表
const getCollectFolder = async (userId) => {
    let sql = `select folderId,folderName,userId,collectDate from folder where userId = ${userId} and collectType = 1 and deleteType = 0 order by collectDate asc`
    return conMysql(sql)
}

// 恢复删除文件夹
const recoverFolder = (folderId, lastDate) => {
    let sql = `update folder set deleteType = 0,lastDate = '${lastDate}' where folderId = ${folderId}`
    return conMysql(sql).then(_ => {
        // 将文件夹下的文件也恢复
        let sql = `update file set deleteType = 0,folderDelete = 0,lastDate = '${lastDate}' where folderId = ${folderId} and deleteType = 1 and folderDelete = 1`
        return conMysql(sql)
    })
}


module.exports = { getFolder, delFolder, addFolder, updateFolder, collectFolder, getCollectFolder, recoverFolder }