const { conMysql } = require('../lib/db')


// 获取最近文件列表
const getLatest = async (creator) => {
    let sql = `select * from file where creator = '${creator}' and deleteType = 0 order by lastDate desc`
    return conMysql(sql)
}

// 最近根据文件类型分类的文件
const getLatestType = async (creator,fileType) => {
    let sql = `select * from file where creator = '${creator}' and fileType = ${fileType} and deleteType = 0 order by lastDate desc`
    return conMysql(sql)
}

// 根据文件夹查询对应文件
const getFile = async (folderId) => {
    let sql = `select * from file where folderId = ${folderId} and deleteType = 0 order by lastDate desc`
    return conMysql(sql)
}

// 指定文件夹下根据文件类型查询对应文件
const getFileType = async (folderId,fileType) => {
    let sql = `select * from file where folderId = ${folderId} and fileType = ${fileType} and deleteType = 0 order by lastDate desc`
    return conMysql(sql)
}

// 新建文件
const addFile = async (fileOption) => {
    let sql = `insert into file set ?`
    return conMysql(sql, fileOption)
}

// 修改文件
const updateFile = async (fileId,fileName,lastDate,content) => {
    let sql = `update file set fileName = '${fileName}',content = '${content}',lastDate = '${lastDate}' where fileId = ${fileId}`
    return conMysql(sql)
}

// 删除文件
const delFile = (fileId,lastDate) => {
    let sql = `update file set deleteType = 1,lastDate = '${lastDate}' where fileId = ${fileId}`
    return conMysql(sql)
}

// 收藏文件夹
const collectFile = (fileId,collectDate) => {
    let sql = `update file set collectType = 1,collectDate = '${collectDate}' where fileId = ${fileId}`
    return conMysql(sql)
}

// 获取收藏文件列表
const getCollectFile = async (creator) => {
    let sql = `select file.fileId,file.fileName,file.fileType,file.lastDate,file.content,folder.foldername from file,folder 
    where file.creator = '${creator}' and file.collectType = 1 and file.deleteType = 0 and file.folderId = folder.folderId order by file.collectDate desc`
    return conMysql(sql)
}

// 根据文件类型获取收藏文件列表
const getCollectFileType = async (creator,fileType) => {
    let sql = `select file.fileId,file.fileName,file.fileType,file.lastDate,file.content,folder.foldername from file,folder 
    where file.creator = '${creator}' and file.collectType = 1 and file.deleteType = 0 and file.fileType = ${fileType} and file.folderId = folder.folderId order by file.collectDate desc`
    return conMysql(sql)
}

module.exports = { getLatest, getFile, getFileType, getLatestType, addFile, updateFile, delFile, collectFile, getCollectFile, getCollectFileType }