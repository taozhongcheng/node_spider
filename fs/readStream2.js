const fs = require('fs')

// 管道写入流
// 创建读取流
const rs = fs.createReadStream('a.MP4',{flag:'r'});
//创建写人流
const rw = fs.createWriteStream('a_cope.mp4',{flag:'w'});


//监听流打开
rs.on('open',function(){
    console.log('流打开')
})

// 监听流关闭,读取完成
rs.on('close',function(){
    console.log('流读取完成！')
})

// 监听流分批读取
rs.on('data',function(item){
   console.log(item)
})

rs.pipe(rw)