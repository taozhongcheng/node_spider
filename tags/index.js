const { DB, querydb } = require('../db')
// 查询每条数据标签
async function select(i){
   const sql = 'select tag from book where bid =?'
   const res =await querydb(sql,[i]);
   if(res.length){
     let tags = res[0].tag.split(' ');
     let j =0;
     while(j<tags.length){
       const sql2 = "select * from booktags where tag = ?"
       const res1 =  await querydb(sql2, [tags[j]]);
       if(!res1.length){
         const sql1 = 'insert into booktags (tag) values (?)';
         await querydb(sql1, [tags[j]]);
       }
       j++
     }
   }
}

// 创建标签
async function run(){
  const count = (await querydb('select count(*) as count from book'))[0].count;
  console.log(count)
  let i =1;
  while(i<=count){
    await select(i)
    console.log('查询完成'+i+'条\n')
    i++
  }
}
//run()

// querydb('update booktags set count = 0').then(res =>{
//   console.log(res)
// })

// 设置标签数量
async function setTagNum(i){
  const sql1 = "select tag from book where bid=?";
  let tags = await querydb(sql1,[i])
  if(!tags.length) return
   tags = tags[0].tag.split(' ')
  let tagStr = ''
  tags.forEach((item,index) => {
    tagStr += `'${item}'`
    if (index < tags.length-1)
    tagStr += ','
  });
  const sql2 = `update booktags set count = count+1 where tag in (${tagStr})`;
  const res = await querydb(sql2)
}

// 统计book 标签个数
async function getTagNum() {
  const count = (await querydb('select count(*) as count from book'))[0].count;
  console.log(count)
  let i = 1;
  while (i <= count) {
    await setTagNum(i)
    console.log('查询完成' + i + '条\n')
    i++
  }
}

getTagNum()