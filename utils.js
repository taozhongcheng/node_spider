const fs = require('fs')

// 异步读取文件内容封装成同步
function fsRead(url){
    return new Promise(function(resolve,reject){
        fs.readFile(url,{flag:'r',encoding:'utf-8'},function(err,data){
            if(err){
                reject(err)
            }else{
                resolve(data)
            }
        })
    })
}

// 写入文件内容封装
function fsWrite(path,content){
    return new Promise(function(resolve,reject){
        fs.writeFile(path,content,{flag:'a',conding:'utf-8'},function(err){
            if(err){
                reject(err)
            }else{
                resolve(err)
            }
        })
    })
}
       
//读取文件夹目录封装
function fsReadDir(path){
    return new Promise(function(resolve,reject){
        fs.readdir(path,function(err,files){
            if(err){
                reject(err)
            }else{
                resolve(files)
            }
        })
    })
}

//延时等待
function timedelay(time) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve();
      }, time);
    });
  }
module.exports ={
    fsRead,
    fsWrite,
    fsReadDir,
    timedelay
}
