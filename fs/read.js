const fs = require('fs')

// 同步读取文件
const book = fs.readFileSync('book.txt',{flag:'r',encoding:'utf-8'});
//sssconsole.log(book);

// 异步读取文件
fs.readFile('book.txt',{flag:'r',encoding:'utf-8'},(err,data)=>{
    if(err){
        console.log(err)
    }else{
        console.log(data)
    }
})

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

fsRead('book.txt').then(function(res){
    console.log(res)
})
//console.log(book1)
//const content = fdssssssssss