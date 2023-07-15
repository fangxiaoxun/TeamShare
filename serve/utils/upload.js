// 处理 mutipart/form-data
const fs = require('fs');
const multiparty = require('multiparty');
const { resolve } = require('path');
const path = require('path')
const {SuccessModel,ErrorModel} = require('../model/resModel')
/* 
*   上传文件解析路径的函数
    @params req  请求处理的文件 
            res  返回值
            fileType 文件类型

*/
const upload = (req,res,fileType) =>{
    console.log('upload');
    let form = new multiparty.Form()
    // 设置文件存储路径
    form.uploadDir = fileType === 'img' ? path.join(__dirname,'.././upload/img') : path.join(__dirname,'.././upload/word')
  
    // 解析前端传输的文件
    form.parse(req,(err,fields,files)=>{
        if(err){
            res.send(new ErrorModel({msg:'上传失败,'+ err}))
        }else{
           const oldPath = files.asset[0].path 
           const newPath = form.uploadDir + '/' + files.asset[0].originalFilename 
           // 修改存到静态资源文件夹下的图片路径，与返回用户的路径一致
           fs.renameSync(oldPath,newPath)
           const $data = files.asset[0].originalFilename 
           res.send(new SuccessModel({msg:'上传成功',data:$data}))
       
        }
    })
}

module.exports = upload