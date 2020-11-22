const fs = require('fs')
const { fsRead,fsWrite } = require('../utils')

// 读取文件夹目录
fs.readdir('./dome',function(err,files){
    if(err){
        console.log('读取文件夹失败')
    }else{
        console.log(files)
    }
})

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

(async function move(){
    const files = await fsReadDir('./dome');
    files.forEach(async (filename) => {
        const content = await fsRead('./dome/'+filename);
        await fsWrite('domeAll.txt',content+'\n')
        console.log(filename+'移动完毕！')
    });
})()