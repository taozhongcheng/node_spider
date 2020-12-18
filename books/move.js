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
async function fsRename(oldFile, newPath) {
  return new Promise(function (resolve, reject) {
    fs.rename(oldFile, newPath, function (err) {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        resolve()
      }
    })
  })
}
// 创建文件夹
async function fsMrdir(dir) {
  return new Promise(function (resolve, reject) {
    fs.mkdir(dir, err => {
      if (err) {
        console.log(err)
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

async function move(dir, newDir) {
  const files = await fsReadDir(dir);
  files.forEach(async (filename, i) => {
    const extname = path.extname(filename);
    const name = path.basename(filename, extname);
    await fsMrdir(`${newDir}/${name}`);
    var oldFile = `${dir}/${filename}`;
    const enname = transliteration.transliterate(name)
    var newPath = `${newDir}/${name}/${enname}--cocotao.azw3`;
    await fsRename(oldFile, newPath)
    console.log(name + '---' + enname)
  });
}
//move('/Users/coco/Documents/book/sobook-test', '/Users/coco/Documents/book/book-test')

//move('./a','./dome')

async function getNum(dir) {
  const files = await fsReadDir(dir);
  console.log(files.length)
}
getNum('/Users/coco/Documents/book/azw3')

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
