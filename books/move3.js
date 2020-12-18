const fs = require('fs');
const { fchown } = require('fs/promises');
const path = require('path');
const { querydb } = require('../_db.js')
const transliteration = require('transliteration');
//读取文件夹目录封装
function fsReadDir(path) {
  return new Promise(function (resolve, reject) {
    fs.readdir(path, function (err, files) {
      if (err) {
        reject(err)
      } else {
        resolve(files)
      }
    })
  })
}
// 移动文件
async function fsRename(oldFile, newPath){
  return new Promise(function(resolve,reject){
    fs.rename(oldFile,newPath,function(err){
      if(err) {
        console.log(err)
        reject(err)
      }else{
        resolve()
      }
    })
  })
}
// 创建文件夹
async function fsMrdir(dir){
  return new Promise(function (resolve, reject){
     fs.mkdir(dir,err=>{
       if(err) {
         console.log(err)
         reject(err)
       }else{
         resolve()
       }
     })
  })
}

// 检查文件是否存在于当前目录中。 
async function fsAccess(dir) {
  return new Promise(function (resolve, reject) {
    fs.access(dir, fs.constants.F_OK, (err) => {
      if (err) {
        resolve(false)
      } else {
        resolve(true)
      }
    })
  })
}


// 查找数据库里存在电子书，移动文件夹
// async function move(dir, newDir) {
//   const files = await fsReadDir(dir);
//   let n=0;
//   while(n<files.length){
//     const filename = files[n]
//     const sql1 = 'select bid from book where name=?'
//     const res = await querydb(sql1, [filename])
//     if (res.length) {
//       await fsMrdir(`${newDir}/${filename}`);
//       var oldFile = `${dir}/${filename}`;
//       var newPath = `${newDir}/${filename}`;
//       await fsRename(oldFile, newPath)
//       console.log(filename + '---' + n + 1)
//     }
//     n++
//   }
// }
//move('/Users/coco/Documents/book/book-test', '/Users/coco/Documents/book/hasbook')



// 每50个移到一个文件件
async function move(dir) {
  const files = await fsReadDir(dir);
  let n=0,page=1;
  await fsMrdir(`${dir}/${page}`);
  while(n<files.length){
    const filename = files[n]
    var oldFile = `${dir}/${filename}`;
    var newPath = `${dir}/${page}/${filename}`;
    await fsRename(oldFile, newPath)
    console.log(filename + '---' + n + 1)
    n++
    if(n%50===0){
      page++
      await fsMrdir(`${dir}/${page}`);
    }
  }
}
move('/Users/coco/Documents/book/hasbook')
// 数据库有的
// async function move(dir, newDir) {
//   const files = await fsReadDir(dir);
//   let n = 0;
//   while (n < files.length) {
//     const filename = files[n]
//     const sql1 = 'select name from book where name like "%"?"%"'
//     const res = await querydb(sql1, [filename])
//     if (res.length) {
//       console.log(filename)
//     }
//     n++
//   }
// }
//move('/Users/coco/Documents/book/book-test')
async function getNum(dir) {
   const files = await fsReadDir(dir);
   console.log(files.length)
}
//getNum('/Users/coco/Documents/book/hasbook')
