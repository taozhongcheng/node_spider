const fs = require('fs');
const { fchown } = require('fs/promises');
const path = require('path');
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


// 电子书移动文件
async function move(dir, newDir) {
  const files = await fsReadDir(dir);
  files.forEach(async (filename, i) => {
   const extname = path.extname(filename);
   const name = path.basename(filename, extname);
   const fileType = extname.replace('.','');
   // 判断父文件夹是否存在，不存在就创建
    const haved = await fsAccess(`${newDir}/${name}`)
   if(!haved) {
     await fsMrdir(`${newDir}/${name}`);
   }
    var oldFile = `${dir}/${filename}`;
    let enname = name.replace('《','').replace('》','')
    enname = transliteration.transliterate(enname)
    var newPath = `${newDir}/${name}/(${fileType})-${enname}-cocotao${extname}`;
   await fsRename(oldFile, newPath)
   console.log(name+'---'+enname+'---'+i)
  });
}
//move('/Users/coco/Documents/book/azw3-test', '/Users/coco/Documents/book/book-test')
//move('/Users/coco/Documents/book/epub-test', '/Users/coco/Documents/book/book-test')
//move('/Users/coco/Documents/book/mobi-test', '/Users/coco/Documents/book/book-test')
async function getNum(dir) {
   const files = await fsReadDir(dir);
   console.log(files.length)
}
getNum('/Users/coco/Documents/book/book-test')

