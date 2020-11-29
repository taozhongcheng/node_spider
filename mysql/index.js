const {querydb}  = require('../db')

// 添加数据
// const sqlstr1 = "insert into student (name,age) values ('小米','20')"
 //querydb(sqlstr1)

//修改数据
 const sqlstr2 = "update student set name='小敏' where id='000003'"
 //querydb(sqlstr2)

 // 查询数据,范围
 const sql3 = "select name,age from student where age between 30 and 60"
//  querydb(sql3).then(res=>{
//     console.log(res)
// })

 // 删除数据
// const sql4 = "delete from student where id = 000006"
//querydb(sql4)

// like 模糊查询,有则找出
// const sql5 = "select * from student where name like '%a%'"
// querydb(sql5).then(res=>{
//     console.log(res)
// })

// like查找以a结尾
// const sql7 = "select * from student where name like '%a'"
// querydb(sql7).then(res=>{
//     console.log(res)
// })

// like查找以a开头
// const sql8 = "select * from student where name like 'a%'"
// querydb(sql8).then(res=>{
//     console.log(res)
// })

// _ 查询， _只匹配一个字符
// const sql6 = "select * from student where name like '_a__'"
// querydb(sql6).then(res=>{
//     console.log(res)
// })

// in 在指定的值以内
// const sql9 = "select * from student where age in (32,49)"
// querydb(sql9).then(res =>{
//     console.log(res)
// })

// 查询为null

const sql10 = "select * from student where age is not null"
querydb(sql10).then(res=>{
    console.log(res)
})