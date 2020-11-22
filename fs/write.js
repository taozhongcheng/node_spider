    const fs = require('fs')

    // write => w 写入,会覆盖之前的内容,可以直接创建文件
    // read => r 读取文件
    // append =>a 添加，再之前基础上添加，也可以直接创建文件
    fs.writeFile('book1.txt','你好啊\n',{flag:'w',conding:'utf-8'},function(err){
        if(err){
            console.log('写入失败')
        }else{
            console.log('写入成功！')
        }
    })

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

    // 写入调试
    (async function(){
        await fsWrite('coco.html','<h1>大家好，我是cocotao</h1>\n');
        await fsWrite('coco.html','<h1>今年28岁</h1>\n');
        await fsWrite('coco.html','<h1>是一名前端工程师</h1>\n');
    })()
