const { conMysql } = require('../lib/db')


// 获取最近文件列表
const getLatest = async (ownerId) => {
    const sql = `SELECT * FROM files WHERE ownerId = ? AND deleteType = '0' ORDER BY latestTime DESC`
    try {
        const res = await conMysql(sql, [ownerId])
        return res
    } catch (error) {
        console.error('获取最近文件列表失败', error)
        return []
    }
}

// 根据文件夹查询对应文件
const getFile = async (folderId) => {
    let SQL = `SELECT * FROM files WHERE folderId = ? AND deleteType = 0 `
    const result = await conMysql(SQL, [folderId])
    return result
}


// 新建文件
const addFile = async (fileOption) => {
    let SQL = `INSERT INTO files set ?`
    const result = await conMysql(SQL ,fileOption)
    return {fileId:result.insertId}
}

// 修改文件
const updateFile = async (fileId,fileName,content) => {
    let SQL = `UPDATE file SET fileName = ? , content = ? WHERE fileId = ?`
    return conMysql(SQL, [fileName, content, fileId])
}

// 删除文件
const delFile = (fileId) => {
    let SQL = `UPDATE files SET deleteType = 1 WHERE fileId = ? `
    return conMysql(SQL, [fileId])
}

// 收藏文件
const collectFile = (fileId, userId) => {
    const SQL = `UPDATE file SET collectType = 1 WHERE fileId = ? AND owner = ?`
    return conMysql(SQL, [fileId, userId])
}

// 取消收藏文件 
const cancelCollectFile = (fileId) => {
    const SQL = `UPDATE file SEY collectType = 0 WHERE fileId = ?`
    return conMysql(SQL, [fileId])
}

// 获取收藏文件列表
const getCollectFile = async (userId) => {
    const SQL = `SELECT * FROM files WHERE collectBy = ? AND deleteType = 0`
    return conMysql(SQL, [userId])
}

// 判断是否超七天
const deleteForever = async (nowDate,userId,username) =>{
    let sql = `update folder set deleteType = 2 where datediff('${nowDate}',lastDate) > 7 and deleteType = 1 and userId = ${userId}`
    return conMysql(sql).then(_ => {
        let sql = `update file set deleteType = 2 where datediff('${nowDate}',lastDate) > 7 and deleteType = 1 and creator = '${username}'`
        return conMysql(sql)
    })
}

// 获取回收站列表
const getTrash = async (nowDate,userId,username) => {
    // 删除超过七天的文件
    deleteForever(nowDate,userId,username)
    let sql = `select * from folders where deleteType = 1 and userId = ${userId}`
    return conMysql(sql).then(folderArr =>{
        let sql = `select * from file where deleteType = 1 and folderDelete = 0 and creator = '${username}'`
        return conMysql(sql).then(fileArr => {
            let result = [...folderArr,...fileArr]
            return result.sort((a,b) => {
                return b.lastDate > a.lastDate ? 1:-1
            })
        })
    })
}

// 恢复删除文件
const recoverFile = (fileId) => {
    const SQL = `UPDATE files set deleteType = 0 WHERE fileId = ?`
    return conMysql(SQL, [fileId])
}

// 通过文件名搜索文件
const searchFile = async (keyword,creator) => {
    let sql = `select * from file where fileName like '%${keyword}%' and creator = '${creator}' and deleteType = 0`
    return conMysql(sql)
}


module.exports = { getLatest, getFile, addFile, updateFile, delFile, collectFile,cancelCollectFile, getCollectFile, getTrash, recoverFile,searchFile }