const  urlList = require('./urlList')
const { querydb} = require('../db.js')
// 设置下载地址
async function setDownurl(){
  const lists = urlList.split('\n')
  let  i=0;
  while(i<lists.length){
    const item = lists[i]
    const key = item.slice(0, item.indexOf(':'))
    const val = item.slice(item.indexOf(': ') + 2)
    const sql1 = 'update book set ctdownurl=? where name=?'
    const res =  await querydb(sql1, [val,key])
    console.log('更新完' + i + '条')
    i++
  }
}

// 检测没匹配到数据库数据
async function setDownurl1() {
  const lists = urlList.split('\n')
  let i = 0,j=0;
  while (i < lists.length) {
    const item = lists[i]
    const key = item.slice(0, item.indexOf(':'))
    const val = item.slice(item.indexOf(': ') + 2)
    const sql1 = 'select * from book where name=?'
    const res = await querydb(sql1, [key])
    if (!res.length) {
      console.log(key)
      j++
    }
    i++
  }
  console.log(j)
}

//setDownurl()

querydb('select count(*) from book where ctdownurl is not null').then(res =>{
  console.log(urlList.split('\n').length)
  console.log(res)
})

// querydb('update book set ctdownurl = null').then(res => {
//   console.log(urlList.split('\n').length)
//   console.log(res)
// })