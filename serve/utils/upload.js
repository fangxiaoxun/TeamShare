// 处理 mutipart/form-data
const fs = require('fs');
const multiparty = require('multiparty');
const path = require('path');
const { conMysql } = require('../lib/db');
const { SuccessModel, ErrorModel } = require('../model/resModel')
const Date = require('./format')

/* 
*   上传文件解析路径的函数
    @params req  请求处理的文件 
            res  返回值
            fileType 文件类型

*/
const upload = (req, res, fileType) => {
    console.log('upload');
    console.log(fileType);
    let form = new multiparty.Form()
    // 设置文件存储路径
    form.uploadDir = ['img', 'headPortrait'].indexOf(fileType) > -1 ? path.join(__dirname, '.././upload/img') : path.join(__dirname, '.././upload/word')

    // 解析前端传输的文件
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.send(new ErrorModel({ msg: '上传失败,' + err }))
        } else {
            console.log('fields', fields);
            const oldPath = files.asset[0].path
            const newPath = form.uploadDir + '/' + new Date().Format('yyyy-MM-dd-hh-mm-ss') + files.asset[0].originalFilename
            // 修改存到静态资源文件夹下的图片路径，与返回用户的路径一致
            fs.renameSync(oldPath, newPath)
            const formUrl = new Date().Format('yyyy-MM-dd-hh-mm-ss') + files.asset[0].originalFilename
            if (fileType === 'img') {
                let sql = `insert into img set imgUrl = '${formUrl}',fileId = ${parseInt(fields.fileId[0])}`
                conMysql(sql)
            }else if(fileType === 'headPortrait'){
                let sql =  `update user set headPortrait = '${formUrl}' where userId = ${parseInt(fields.userId[0])}`
                conMysql(sql)
            }

            res.send(new SuccessModel({ msg: '上传成功', data: {formUrl}}))
        }
    })
}

module.exports = upload