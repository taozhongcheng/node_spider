const readline = require('readline')
const {fsWrite} = require('../utils')
const rl = readline.createInterface({
    input:process.stdin,
    output:process.stdout
})


// 用户写入内容
// rl.question('hello',function(answer){
//   //  console.log('答复:'+answer)
//     rl.close()
// })


rl.on('close',function(){
    // 结束进程
    console.log('结束进程！')
    process.exit(0);
   
})

function readlineQuestion(title){
    return new Promise(function(resolve,reject){
        rl.question(title,function(answer){
             resolve(answer)
        })
    })
}

async function creatPackge(){
    let name = await readlineQuestion('项目名称是：');
    let version = await readlineQuestion('项目版本号：');
    let description = await readlineQuestion('项目描述：');
    let author = await readlineQuestion('作者姓名：');
    const option = `{
        "name": "${name}",
        "version": "${version}",
        "description": "${description}",
        "main": "index.js",
        "scripts": {
          "test": "echo Error: no test specified && exit 1"c
        },
        "keywords": [],
        "author": "${author}"
    }`
    await fsWrite('package.json',option)
     console.log("package.json 创建成功！")
    rl.close()
}
creatPackge()
