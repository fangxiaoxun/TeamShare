/*
 * Author: fangxiaoxun 1272449367@qq.com
 * Date: 2023-07-13 02:49:58
 * LastEditors: fangxiaoxun 1272449367@qq.com
 * LastEditTime: 2025-03-03 20:24:11
 * 
 */
const mysql = require('mysql')
// 连接数据库的配置信息
const db_config = {
    host:'127.0.0.1',
    user:'root',
    password:'123456',
    port:'3306',
    database:'CollaborativeDoc',
}


function conMysql(...sqlOption){
    // 创建数据库连接池
    let MyConnect = mysql.createConnection(db_config)
    // 开始连接数据库
    MyConnect.connect(function (err){
        if(err){
            console.log(`mysql连接失败：${err}`);
        }else{
            console.log('mysql连接成功');
        }
    })

    // query查询是一个异步操作，所以用promise来操作
    return new Promise((resolve,reject)=>{
        // query()函数用于mysql语句查询
        MyConnect.query(...sqlOption,(err,result)=>{
            if(err){
                reject(err)
            }else{
                let res = JSON.parse(JSON.stringify(result))
				closeMysql(MyConnect)  //调用函数关闭mysql连接
				resolve(res)
            }
        })
    })
}


//关闭mysql数据库的函数
function closeMysql(MyConnect) {
	MyConnect.end((err) => {
		if (err) {
			console.log(`mysql关闭失败:${err}!`)
		} else {
			console.log('mysql关闭成功')
		}
	})
}

//导出conMysql函数
exports.conMysql = conMysql

