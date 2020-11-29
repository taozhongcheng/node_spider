const mysql = require('mysql')

const mysqlOption={
    host:'localhost',
    port:'3306',
    user:'root',
    password:"123456",
    database:'books'
}

// 创建配置
const DB = mysql.createConnection(mysqlOption)

// 连接数据库
DB.connect((err)=>{
    if(err){
        console.log(err)
    }else{
        console.log('数据库连接成功！')
    }
}) 

async function querydb(sql){
    return new Promise((resolve,rejece) =>{
        DB.query(sql,(err,res)=>{
            if(err){
                console.log(err)
            }else{
                resolve(res)
            }
        })
    })
}
module.exports = {
    DB,
    querydb
}