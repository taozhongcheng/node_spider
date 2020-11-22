const fs = require('fs')

// 创建读取流
const rs = fs.createReadStream('a.MP4',{flag:'r'});
//创建写人流
const rw = fs.createWriteStream('writeStream.txt',{flag:'w',encoding:'utf-8'});


// 监听写入流打开
rw.on('open',function(){
    console.log('写入流打开')
})

// 监听写入流整备好
rw.on('ready',function(){
    console.log('写入流已经整备就绪')
})

// 监听流关闭
rw.on('close',function(){
    console.log('流写入关闭')
})



//写入流
rw.write('1111\n',function(err){
    if(err){
        console.log('流写入失败')
    }else{
        console.log('流1写入成功')
    }
})
rw.write('2222\n',function(err){
    if(err){
        console.log('流写入失败')
    }else{
        console.log('流2写入成功')
    }
})
rw.write('33333\n',function(err){
    if(err){
        console.log('流写入失败')
    }else{
        console.log('流3写入成功')
    }
})
rw.write('4444\n',function(err){
    if(err){
        console.log('流写入失败')
    }else{
        console.log('流4写入成功')
    }
})
// 流结束
rw.end(function(){
    console.log('流写完了,end，关闭')
})
