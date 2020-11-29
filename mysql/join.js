const {querydb}  = require('../db')


// inner join 查询 A表和B表交集关联数据
// const sql1 = `select student.id,student.name,score.cate,score.score
// from student inner join score on student.id = score.studentid`
// querydb(sql1).then(res=>{
//     console.log(res)
// }) 

// left join 查询 A表所有数据，和B表有关联则显示关联，不关联则显示null
// const sql1 = `select student.id,student.name,score.cate,score.score
// from student left join score on student.id = score.studentid`
// querydb(sql1).then(res=>{
//     console.log(res)
// }) 

//as 用法
// const sql1 = `select a.id,a.name,b.cate,b.score
// from student as a inner join score as b on a.id = b.studentid`
// querydb(sql1).then(res=>{
//     console.log(res)
// }) 


// 分数大于 120 的同学成绩

// const sql1 = `select student.name,student.id,score.cate,score.score from student inner join  score on student.id = score.studentid where score.score >120`
// querydb(sql1).then(res =>{
//     console.log(res)
// })

// 子查询 ，一个查询结果作为另外一个查询的条件



// 语文成绩大于120 的同学成绩

const sql1 = `select student.name,student.id,score.cate,score.score from student inner join  score on student.id = score.studentid where score.score >120 and score.cate='语文'`
querydb(sql1).then(res =>{
    console.log(res)
})