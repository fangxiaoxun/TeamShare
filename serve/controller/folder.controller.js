const { conMysql } = require("../lib/db")

// 查询文件夹列表
const getFolder = (userId) => {
    console.log('getFolder');
    let sql = `select folderId,foldername from folder where userId = ${userId} and deleteType = 0`

    return conMysql(sql).then(result => result)
}


// 删除指定文件夹
const delFolder = (folderId) => {
    console.log('delFolder');
    let sql = `update folder set deleteType = 1 where folderId = ${folderId}`
    return conMysql(sql)
}

// 增加文件夹
const addFolder = (foldername,userId) => {
    console.log('addFolder');
    let sql = `insert into folder set ?`
    return conMysql(sql,{foldername, userId})
}

// 修改文件夹名字
const updateFolder = (folderId,newFolderName) => {
    let sql = `update folder set folderName = '${newFolderName}' where folderId = ${folderId}`
    return conMysql(sql)
}


module.exports = { getFolder,delFolder,addFolder,updateFolder }